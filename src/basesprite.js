import {Matrix, Vector} from 'sprite-math';
import {flow, rectVertices, boxToRect} from 'sprite-utils';
import {Timeline} from 'sprite-animator';
import SpriteAttr from './attr';
import BaseNode from './basenode';
import Animation from './animation';
import {registerNodeType} from './nodetype';

import {drawRadiusBox, findColor, cacheContextPool} from './helpers/render';
import filters from './filters';

const _attr = Symbol('attr'),
  _animations = Symbol('animations'),
  _cachePriority = Symbol('cachePriority'),
  _effects = Symbol('effects'),
  _flow = Symbol('flow');

export default class BaseSprite extends BaseNode {
  static Attr = SpriteAttr;

  /**
    new Sprite({
      attr: {
        ...
      }
    })
   */
  constructor(attr) {
    super();

    this[_attr] = new this.constructor.Attr(this);
    this[_animations] = new Set();
    this[_cachePriority] = 0;
    this[_flow] = {};
    this.__cachePolicyThreshold = 6;

    if(attr) {
      this.attr(attr);
    }
  }

  get cachePriority() {
    if(this.isVirtual) return -1;
    return this[_cachePriority];
  }

  set cachePriority(priority) {
    this[_cachePriority] = priority;
  }

  static setAttributeEffects(effects = {}) {
    if(this.prototype[_effects] == null) {
      this.prototype[_effects] = effects;
    }
    Object.assign(this.prototype[_effects], effects);
  }

  static addAttributes(attrs = {}) {
    Object.entries(attrs).forEach(([prop, handler]) => {
      let getter = function () {
        return this.get(prop);
      };
      if(typeof handler !== 'function' && handler.set) {
        getter = handler.get || getter;
        handler = handler.set;
      }
      if(prop !== 'init') {
        this.Attr.prototype.__attributeNames.push(prop);
        Object.defineProperty(this.Attr.prototype, prop, {
          set(val) {
            this.__clearCacheTag = false;
            this.__updateTag = false;
            this.__reflowTag = false;
            handler(this, val);
            if(this.subject && this.subject.hasLayout) {
              const offsetSize = this.subject.offsetSize,
                layoutSize = this.subject.__layoutSize;

              if(!layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1]) {
                this.subject.parent.clearLayout();
              }
              this.subject.__lastLayout = offsetSize;
            }
            if(this.subject && this.__updateTag) {
              this.subject.forceUpdate(this.__clearCacheTag);
              if(this.__reflowTag) {
                this.subject.reflow();
              }
            }
            delete this.__reflowTag;
            delete this.__updateTag;
            delete this.__clearCacheTag;
          },
          get: getter,
        });
      }
    });
  }

  static defineAttributes(attrs, effects) {
    this.Attr = class extends this.Attr {
      constructor(subject) {
        super(subject);
        if(attrs.init) attrs.init(this, subject);
      }
    };
    if(attrs) this.addAttributes(attrs);
    if(effects) this.setAttributeEffects(effects);
    return this.Attr;
  }

  get layer() {
    return this.parent && this.parent.layer;
  }

  reflow() {
    this[_flow] = {};
    // let parent = this.parent
    // while(parent) {
    //   if(parent.reflow) parent.reflow()
    //   parent = parent.parent
    // }
  }

  flow(prop, value) {
    if(value === undefined) {
      return this[_flow][prop];
    }
    this[_flow][prop] = value;
  }

  serialize() {
    const nodeType = this.nodeType,
      attrs = this[_attr].serialize(),
      dataset = JSON.stringify(this.dataset),
      id = this.id;

    return {
      nodeType,
      attrs,
      dataset,
      id,
    };
  }

  merge(attrs) {
    this[_attr].merge(attrs);
  }

  cloneNode() {
    const node = new this.constructor();
    node.merge(this[_attr].serialize());
    node.data(this.dataset);
    const bgimage = this.attr('bgimage');
    if(bgimage && bgimage.image) {
      node.attr('bgimage', null);
      node.attr('bgimage', Object.assign({}, bgimage));
    }
    return node;
  }

  set id(val) {
    this.attr('id', val);
  }

  get id() {
    return this.attr('id');
  }

  set name(val) {
    this.attr('name', val);
  }

  get name() {
    return this.attr('name');
  }

  get hasLayout() {
    if(this.attr('position') === 'absolute') return false;
    if(this.parent && this.parent.relayout) {
      const display = this.parent.attr('display');
      return display !== '' && display !== 'static';
    }
    return false;
  }

  set zIndex(val) {
    this.attr('zIndex', val);
  }

  get zIndex() {
    return this.attr('zIndex');
  }

  getAttribute(prop) {
    /* istanbul ignore next */
    return this.attr(prop);
  }

  setAttribute(prop, val) {
    /* istanbul ignore next */
    return this.attr(prop, val);
  }

  removeAttribute(prop) {
    /* istanbul ignore next */
    return this.attr(prop, null);
  }

  attr(props, val) {
    const setVal = (key, value) => {
      this[_attr][key] = value;
      if(key === 'zIndex' && this.parent) {
        this.parent.children.sort((a, b) => {
          if(a.zIndex === b.zIndex) {
            return a.zOrder - b.zOrder;
          }
          return a.zIndex - b.zIndex;
        });
      }
    };
    if(typeof props === 'object') {
      Object.entries(props).forEach(([prop, value]) => {
        this.attr(prop, value);
      });
      return this;
    } if(typeof props === 'string') {
      if(val !== undefined) {
        if(typeof val === 'function') {
          val = val(this[_attr][props]);
        }
        if(val && typeof val.then === 'function') {
          return val.then((res) => {
            setVal(props, res);
          });
        }
        setVal(props, val);
        return this;
      }
      return this[_attr][props];
    }

    return this[_attr].attrs;
  }

  get attributes() {
    return this[_attr];
  }

  get isVirtual() {
    return false;
  }

  isVisible() {
    if(!this.parent) return false;

    const display = this.attr('display');
    if(display === 'none') {
      return false;
    }

    const opacity = this.attr('opacity');
    if(opacity <= 0) {
      return false;
    }

    if(this.isVirtual) return true;

    const [width, height] = this.offsetSize;
    if(width <= 0 || height <= 0) {
      return false;
    }

    if(this.parent.isVisible) {
      return this.parent.isVisible();
    }
    return true;
  }

  get transform() {
    const transform = new Matrix(this[_attr].get('transformMatrix'));
    const transformOrigin = this.attr('transformOrigin');
    if(transformOrigin) {
      const t = new Matrix();
      t.translate(...transformOrigin);
      t.multiply(transform);
      t.translate(...transformOrigin.map(v => -v));
      return t;
    }
    return transform;
  }

  transition(sec, easing = 'linear') {
    const that = this,
      _animation = Symbol('animation');

    return {
      [_animation]: null,
      end() {
        const animation = this[_animation];
        if(animation && (animation.playState === 'running' || animation.playState === 'pending')) {
          animation.finish();
        }
      },
      reverse() {
        const animation = this[_animation];
        if(animation) {
          if(animation.playState === 'running' || animation.playState === 'pending') {
            animation.playbackRate = -animation.playbackRate;
          } else {
            const direction = animation.timing.direction;
            animation.timing.direction = direction === 'reverse' ? 'normal' : 'reverse';
            animation.play();
          }
        }
        return animation.finished;
      },
      attr(prop, val) {
        this.end();
        if(typeof prop === 'string') {
          prop = {[prop]: val};
        }
        Object.entries(prop).forEach(([key, value]) => {
          if(typeof value === 'function') {
            prop[key] = value(that.attr(key));
          }
        });
        this[_animation] = that.animate([prop], {
          duration: sec * 1000,
          fill: 'forwards',
          easing,
        });
        return this[_animation].finished;
      },
    };
  }

  animate(frames, timing) {
    const animation = new Animation(this, frames, timing);
    if(this[_effects]) animation.applyEffects(this[_effects]);
    if(this.layer) {
      animation.baseTimeline = this.layer.timeline;
      animation.play();
      animation.finished.then(() => {
        this[_animations].delete(animation);
      });
    }
    this[_animations].add(animation);
    return animation;
  }

  connect(parent, zOrder = 0) {
    if(parent && !(parent instanceof BaseNode)) {
      const node = new BaseNode();
      node.context = parent;
      node.timeline = new Timeline();
      node.update = function () {
        const currentTime = this.timeline.currentTime;
        node.dispatchEvent('update', {target: this, timeline: this.timeline, renderTime: currentTime}, true, true);
      };
      parent = node;
    }
    const ret = super.connect(parent, zOrder);
    Object.defineProperty(this, 'context', {
      get: () => parent.cache || parent.context,
      configurable: true,
    });
    this[_animations].forEach((animation) => {
      if(parent.layer) {
        animation.baseTimeline = parent.layer.timeline;
      }
      animation.play();
      animation.finished.then(() => {
        this[_animations].delete(animation);
      });
    });
    if(this.hasLayout) parent.clearLayout();
    this.reflow();
    return ret;
  }

  disconnect(parent) {
    this[_animations].forEach(animation => animation.cancel());
    if(this.cache) {
      this.cache = null;
    }
    if(this.hasLayout) parent.clearLayout();
    this.reflow();
    const ret = super.disconnect(parent);
    delete this.context;
    return ret;
  }

  @flow
  get attrSize() {
    let [width, height] = this.attr('size');
    const isBorderBox = this.attr('boxSizing') === 'border-box';

    if(this.hasLayout) {
      const layoutWidth = this.attr('layoutWidth'),
        layoutHeight = this.attr('layoutHeight')
      ;[width, height] = [layoutWidth !== '' ? layoutWidth : width, layoutHeight !== '' ? layoutHeight : height];
    }
    if(isBorderBox) {
      const borderWidth = this.attr('border').width,
        [paddingTop, paddingRight, paddingBottom, paddingLeft] = this.attr('padding');

      if(width !== '') {
        width = Math.max(0, width - 2 * borderWidth - paddingLeft - paddingRight);
      } if(width !== '') {
        height = Math.max(0, height - 2 * borderWidth - paddingTop - paddingBottom);
      }
    }

    return [width, height];
  }

  // content width / height
  @flow
  get contentSize() {
    if(this.isVirtual) return [0, 0];
    const [width, height] = this.attrSize;
    return [width | 0, height | 0];
  }

  // content + padding
  @flow
  get clientSize() {
    const [top, right, bottom, left] = this.attr('padding'),
      [width, height] = this.contentSize;

    return [left + width + right, top + height + bottom];
  }

  // content + padding + border
  @flow
  get offsetSize() {
    const {width: borderWidth} = this.attr('border'),
      [width, height] = this.clientSize;

    return [width + 2 * borderWidth,
      height + 2 * borderWidth];
  }

  get layoutSize() {
    const size = this.offsetSize;
    const [top, right, bottom, left] = this.attr('margin');
    return [left + size[0] + right, top + size[1] + bottom];
  }

  get innerSize() {
    return this.contentSize;
  }

  get outerSize() {
    return this.offsetSize;
  }

  getLayerXY(dx = 0, dy = 0) {
    const layer = this.layer;
    if(!layer) return [0, 0];
    let target = this;
    let [x, y] = [dx, dy];
    while(target && target !== layer) {
      [x, y] = target.offsetToPoint(x, y);
      const parent = target.parent;

      if(parent !== layer) {
        const borderWidth = parent.attr('border').width;
        const padding = parent.attr('padding'),
          scrollLeft = parent.attr('scrollLeft') || 0,
          scrollTop = parent.attr('scrollTop') || 0;

        // const parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft
        // const parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop

        x = x + parent.originalRect[0] + borderWidth + padding[3] - scrollLeft;
        y = y + parent.originalRect[1] + borderWidth + padding[0] - scrollTop;
      }
      target = parent;
    }
    return [x, y];
  }

  get boundingRect() {
    const transform = this.transform;
    let [ox, oy, width, height] = this.originalRect;

    if(this.hasLayout) {
      const margin = this.attr('margin');
      width += margin[1];
      height += margin[2];
    }

    const vertexs = [[ox, oy],
      [width + ox, oy],
      [ox, height + oy],
      [width + ox, height + oy]];

    const transformed = vertexs.map((v) => {
      return transform.transformPoint(v[0], v[1]);
    });

    const vx = transformed.map(v => v[0]),
      vy = transformed.map(v => v[1]);

    const minX = Math.min(...vx),
      minY = Math.min(...vy),
      maxX = Math.max(...vx),
      maxY = Math.max(...vy);

    return [...[minX, minY], ...[maxX - minX, maxY - minY]];
  }

  // rect before transform
  @flow
  get originalRect() {
    const [width, height] = this.offsetSize,
      [anchorX, anchorY] = this.attr('anchor');

    const rect = [-anchorX * width,
      -anchorY * height,
      width, height];

    if(this.hasLayout) {
      const margin = this.attr('margin');
      rect[0] += margin[3];
      rect[1] += margin[0];
    }
    return rect;
  }

  get originalRenderRect() {
    const bound = this.originalRect,
      pos = this.attr('pos');

    return [pos[0] + bound[0],
      pos[1] + bound[1],
      bound[2],
      bound[3]];
  }

  get renderBox() {
    const bound = this.boundingRect,
      pos = this.attr('pos');

    return [Math.floor(pos[0] + bound[0]),
      Math.floor(pos[1] + bound[1]),
      Math.ceil(pos[0] + bound[0] + bound[2]),
      Math.ceil(pos[1] + bound[1] + bound[3])];
  }

  get renderRect() {
    return boxToRect(this.renderBox);
  }

  get vertices() {
    const vertices = rectVertices(this.originalRect),
      transform = this.transform,
      [x0, y0] = this.attr('pos');

    return vertices.map((v) => {
      const [x, y] = transform.transformPoint(v[0], v[1]);
      return [x0 + x, y0 + y];
    });
  }

  set cache(context) {
    if(this.cacheContext && context !== this.cacheContext) {
      cacheContextPool.put(this.cacheContext);
    }
    this.cacheContext = context;
  }

  get cache() {
    return this.cacheContext;
  }

  clearCache() {
    this[_cachePriority] = 0;
    this.cache = null;
    if(this.parent && this.parent.cache) {
      this.parent[_cachePriority] = 0;
      this.parent.cache = null;
    }
  }

  remove() {
    if(!this.parent) return false;
    this.parent.removeChild(this);
    return true;
  }

  appendTo(parent) {
    parent.appendChild(this);
  }

  forceUpdate(clearCache = false) {
    if(clearCache) {
      this.clearCache();
    }
    const parent = this.parent;
    if(parent) {
      this.parent.update(this);
    }
  }

  // layer position to sprite offset
  pointToOffset(x, y) {
    const [x0, y0] = this.attr('pos');
    const [dx, dy] = [x - x0, y - y0];
    const transform = this.transform;
    return transform.inverse().transformPoint(dx, dy);
  }

  offsetToPoint(dx, dy) {
    const transform = this.transform;
    const [x0, y0] = this.attr('pos');
    const [x, y] = transform.transformPoint(dx, dy);
    return [x + x0, y + y0];
  }

  pointCollision(evt) {
    /* istanbul ignore if */
    if(!this.isVisible()) {
      return false;
    }

    let parentX,
      parentY;

    if(evt.parentX != null) {
      // group
      parentX = evt.parentX;
      parentY = evt.parentY;
    } else {
      parentX = evt.layerX;
      parentY = evt.layerY;
    }

    let [nx, ny] = this.pointToOffset(parentX, parentY);
    evt.offsetX = nx;
    evt.offsetY = ny;

    const [ox, oy, ow, oh] = this.originalRect;

    if(nx >= ox && nx - ox < ow
      && ny >= oy && ny - oy < oh) {
      if(this.context && this.context.isPointInPath) {
        const borderWidth = this.attr('border').width,
          borderRadius = this.attr('borderRadius');
        if(borderWidth || borderRadius) {
          const [width, height] = this.outerSize;
          const [x, y, w, h, r] = [0, 0,
            width, height,
            Math.max(0, borderRadius + borderWidth / 2)];
          drawRadiusBox(this.context, {x, y, w, h, r});
          if(this.layer && this.layer.offset) {
            nx += this.layer.offset[0];
            ny += this.layer.offset[1];
          }
          return this.context.isPointInPath(nx - ox, ny - oy);
        }
      }
      return true;
    }
  }

  // OBB: http://blog.csdn.net/silangquan/article/details/50812425
  OBBCollision(sprite) {
    // vertices: [p1, p2, p3, p4]
    const [p11, p12, p13] = this.vertices,
      [p21, p22, p23] = sprite.vertices;

    const a1 = (new Vector(p12, p11)).unit(),
      a2 = (new Vector(p13, p12)).unit(),
      a3 = (new Vector(p22, p21)).unit(),
      a4 = (new Vector(p23, p22)).unit();

    // The projection of the axis of a vertex in a certain direction
    function verticesProjection(vertices, axis) {
      const [p1, p2, p3, p4] = vertices.map(v => axis.dot(new Vector(v)));

      return [Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4)];
    }

    function projectionIntersect(p1, p2) {
      const m1 = (p1[0] + p1[1]) / 2,
        l1 = Math.abs(p1[1] - p1[0]),
        m2 = (p2[0] + p2[1]) / 2,
        l2 = Math.abs(p2[1] - p2[0]);

      return Math.abs(m2 - m1) <= (l1 + l2) / 2;
    }

    return projectionIntersect(
      verticesProjection(this.vertices, a1),
      verticesProjection(sprite.vertices, a1)
    ) && projectionIntersect(
      verticesProjection(this.vertices, a2),
      verticesProjection(sprite.vertices, a2)
    ) && projectionIntersect(
      verticesProjection(this.vertices, a3),
      verticesProjection(sprite.vertices, a3)
    ) && projectionIntersect(
      verticesProjection(this.vertices, a4),
      verticesProjection(sprite.vertices, a4)
    );
  }

  relayout() {

  }

  draw(t, drawingContext = this.context) {
    const bound = this.originalRect;
    let cachableContext = this.cache;

    const filter = this.attr('filter'),
      shadow = this.attr('shadow');

    // filter & shadow require cachableContext
    if(!cachableContext && (filter || shadow || this.cachePriority > this.__cachePolicyThreshold)) {
      cachableContext = cacheContextPool.get(drawingContext);
      if(cachableContext) {
        // +2 to solve 1px problem
        cachableContext.canvas.width = Math.ceil(bound[2]) + 2;
        cachableContext.canvas.height = Math.ceil(bound[3]) + 2;
      } else {
        this.__cachePolicyThreshold = Infinity;
      }
    }

    this[_cachePriority] = Math.min(this[_cachePriority] + 1, 10);
    const evtArgs = {context: drawingContext, cacheContext: cachableContext, target: this, renderTime: t, fromCache: !!this.cache};

    drawingContext.save();
    drawingContext.translate(...this.attr('pos'));
    drawingContext.transform(...this.transform.m);

    // fix for wxapp
    const alpha = drawingContext.globalAlpha != null ? drawingContext.globalAlpha : 1;
    drawingContext.globalAlpha = alpha * this.attr('opacity');

    if(!cachableContext) {
      drawingContext.translate(bound[0], bound[1]);
    } else {
      // solve 1px problem
      cachableContext.translate(bound[0] - Math.floor(bound[0]) + 1, bound[1] - Math.floor(bound[1]) + 1);
    }

    this.dispatchEvent('beforedraw', evtArgs, true, true);

    if(cachableContext) {
      // set cache before render for group
      if(!this.cache) {
        this.cache = cachableContext;
        this.render(t, cachableContext);
      }
    } else {
      this.render(t, drawingContext);
    }

    if(cachableContext && cachableContext.canvas.width > 0 && cachableContext.canvas.height > 0) {
      if(filter) {
        drawingContext.filter = filters.compile(filter);
      }
      if(shadow) {
        let {blur, color, offset} = shadow;
        blur = blur || 1;
        color = color || 'rgba(0,0,0,1)';
        drawingContext.shadowBlur = blur;
        drawingContext.shadowColor = color;
        if(offset) {
          drawingContext.shadowOffsetX = offset[0];
          drawingContext.shadowOffsetY = offset[1];
        }
      }
      drawingContext.drawImage(cachableContext.canvas, Math.floor(bound[0]) - 1, Math.floor(bound[1]) - 1);
    }

    this.dispatchEvent('afterdraw', evtArgs, true, true);

    drawingContext.restore();

    return drawingContext;
  }

  get needRender() {
    if(this.isVirtual) return false;

    const [offsetWidth, offsetHeight] = this.offsetSize;
    if(offsetWidth <= 0 || offsetHeight <= 0) return false;

    const border = this.attr('border');

    if(border.width <= 0
      && this.attr('borderRadius') <= 0
      && !this.attr('bgcolor')
      && !this.attr('gradients').bgcolor
      && !this.attr('bgimage')) {
      return false; // don't need to render
    }

    return true;
  }

  render(t, drawingContext) {
    const border = this.attr('border'),
      borderRadius = this.attr('borderRadius'),
      padding = this.attr('padding'),
      [offsetWidth, offsetHeight] = this.offsetSize,
      [clientWidth, clientHeight] = this.clientSize;

    if(!this.needRender) {
      return false;
    }

    const borderWidth = border.width;
    let borderStyle = border.style;

    // draw border
    if(borderWidth) {
      drawingContext.lineWidth = borderWidth;

      const [x, y, w, h, r] = [borderWidth / 2, borderWidth / 2,
        offsetWidth - borderWidth, offsetHeight - borderWidth,
        borderRadius];

      drawRadiusBox(drawingContext, {x, y, w, h, r});

      if(borderStyle && borderStyle !== 'solid') {
        const dashOffset = this.attr('dashOffset');
        drawingContext.lineDashOffset = dashOffset;
        if(borderStyle === 'dashed') {
          borderStyle = [borderWidth * 3, borderWidth * 3];
        }
        drawingContext.setLineDash(borderStyle);
      }
      drawingContext.strokeStyle = findColor(drawingContext, this, 'border');
      drawingContext.stroke();
    }

    // draw bgcolor
    const bgcolor = findColor(drawingContext, this, 'bgcolor');
    const bgimage = this.attr('bgimage');

    if(this.cache == null || borderWidth || borderRadius || bgcolor || bgimage && bgimage.display !== 'none') {
      const [x, y, w, h, r] = [borderWidth, borderWidth,
        clientWidth, clientHeight,
        Math.max(0, borderRadius - borderWidth / 2)];

      drawRadiusBox(drawingContext, {x, y, w, h, r});

      if(bgcolor) {
        drawingContext.fillStyle = bgcolor;
        drawingContext.fill();
      }

      // clip is expensive, we should only perform clip when it has to.
      if(bgimage && bgimage.display !== 'none' || borderRadius && (this.nodeType !== 'sprite' || this.textures && this.textures.length)) {
        drawingContext.clip();
      }

      if(bgimage && bgimage.image && bgimage.display !== 'none') {
        drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
      }
    }

    drawingContext.translate(borderWidth + padding[3], borderWidth + padding[0]);

    return true;
  }
}

function drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  const w = image.width,
    h = image.height;

  const [top, right, bottom, left] = clip9 || [16, 16, 16, 16];
  const leftTop = [0, 0, left, top],
    rightTop = [w - right, 0, right, top],
    rightBottom = [w - right, h - bottom, right, bottom],
    leftBottom = [0, h - bottom, left, bottom];

  const boxRight = offsetWidth - right - borderWidth,
    boxBottom = offsetHeight - borderWidth - bottom;

  // draw four corners
  drawingContext.drawImage(image, ...leftTop, borderWidth, borderWidth, left, top);
  drawingContext.drawImage(image, ...rightTop, boxRight, borderWidth, right, top);
  drawingContext.drawImage(image, ...rightBottom, boxRight, boxBottom, left, bottom);
  drawingContext.drawImage(image, ...leftBottom, borderWidth, boxBottom, left, bottom);

  // draw .9 cross
  const midWidth = w - left - right,
    midHeight = h - top - bottom;

  if(midWidth > 0) {
    let midBoxWidth = clientWidth - left - right;
    let leftOffset = borderWidth + left;
    while(midBoxWidth > 0) {
      const ww = Math.min(midBoxWidth, midWidth);
      const topPiece = [left, 0, ww, top],
        bottomPiece = [left, h - bottom, ww, bottom];

      drawingContext.drawImage(image, ...topPiece, leftOffset, borderWidth, ww, top);
      drawingContext.drawImage(image, ...bottomPiece, leftOffset, boxBottom, ww, bottom);
      midBoxWidth -= midWidth;
      if(midBoxWidth > 0) {
        leftOffset += midWidth;
      }
    }
  }

  if(midHeight > 0) {
    let midBoxHeight = clientHeight - top - bottom;
    let topOffset = borderWidth + top;
    while(midBoxHeight > 0) {
      const hh = Math.min(midBoxHeight, midHeight);
      const leftPiece = [0, top, left, hh],
        rightPiece = [w - right, top, right, hh];

      drawingContext.drawImage(image, ...leftPiece, borderWidth, topOffset, left, hh);
      drawingContext.drawImage(image, ...rightPiece, boxRight, topOffset, right, hh);
      midBoxHeight -= midHeight;
      if(midBoxHeight > 0) {
        topOffset += midHeight;
      }
    }
  }

  if(midHeight && midWidth > 0) {
    let midBoxWidth = clientWidth - left - right;
    let leftOffset = borderWidth + left;

    while(midBoxWidth > 0) {
      let midBoxHeight = clientHeight - top - bottom;
      let topOffset = borderWidth + top;
      while(midBoxHeight > 0) {
        const ww = Math.min(midBoxWidth, midWidth),
          hh = Math.min(midBoxHeight, midHeight);
        const midPiece = [left, top, ww, hh];
        drawingContext.drawImage(image, ...midPiece, leftOffset, topOffset, ww, hh);
        midBoxHeight -= midWidth;
        if(midBoxHeight > 0) {
          topOffset += midHeight;
        }
      }
      midBoxWidth -= midWidth;
      if(midBoxWidth > 0) {
        leftOffset += midWidth;
      }
    }
  }
}

function drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  const {image, display, clip9} = bgimage;

  if(display === '.9') {
    drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
  } else {
    let offset = bgimage.offset || [0, 0],
      w = image.width,
      h = image.height;

    if(display === 'center') {
      offset = [(clientWidth - w) * 0.5, (clientHeight - h) * 0.5];
    } else if(display === 'stretch') {
      w = clientWidth - offset[0];
      h = clientHeight - offset[1];
    }
    drawingContext.drawImage(image, borderWidth + offset[0], borderWidth + offset[1], w, h);

    if(w > 0 && (display === 'repeat' || display === 'repeatX')) {
      let cw = clientWidth - borderWidth - offset[0] - w;
      while(cw > borderWidth) {
        drawingContext.drawImage(image, clientWidth - cw, borderWidth + offset[1], w, h);
        if(h > 0 && display === 'repeat') {
          let ch = clientHeight - borderWidth - offset[1] - h;
          while(ch > borderWidth) {
            drawingContext.drawImage(image, clientWidth - cw, clientHeight - ch, w, h);
            ch -= h;
          }
        }
        cw -= w;
      }
    }

    if(h > 0 && (display === 'repeat' || display === 'repeatY')) {
      let ch = clientHeight - borderWidth - offset[1] - h;
      while(ch > borderWidth) {
        drawingContext.drawImage(image, borderWidth + offset[0], clientHeight - ch, w, h);
        ch -= h;
      }
    }
  }
}

registerNodeType('basesprite', BaseSprite);
