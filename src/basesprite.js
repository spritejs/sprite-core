import {Matrix, Vector} from 'sprite-math';
import {Timeline} from 'sprite-animator';
import {flow, absolute, rectVertices, boxToRect, deprecate, inheritAttributes} from './utils';
import SpriteAttr from './attr';
import BaseNode from './basenode';
import Animation from './animation';
import {registerNodeType} from './nodetype';
import stylesheet from './stylesheet';

import {drawRadiusBox, findColor, cacheContextPool} from './helpers/render';
import filters from './filters';

const _attr = Symbol('attr'),
  _animations = Symbol('animations'),
  _cachePriority = Symbol('cachePriority'),
  _effects = Symbol('effects'),
  _flow = Symbol('flow'),
  _changeStateAction = Symbol('changeStateAction'),
  _resolveState = Symbol('resolveState'),
  _show = Symbol('show'),
  _hide = Symbol('hide'),
  _enter = Symbol('enter'),
  _releaseKeys = Symbol('releaseKeys'),
  _style = Symbol('style');

const CACHE_PRIORITY_THRESHOLDS = 0; // disable cache_priority, for canvas drawing bug...

export default class BaseSprite extends BaseNode {
  static Attr = SpriteAttr;

  static inheritAttributes = inheritAttributes;

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
    this[_releaseKeys] = new Set();
    this[_style] = {};

    if(attr) {
      this.attr(attr);
    }
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
        this.Attr.prototype.__attributeNames.add(prop);
        Object.defineProperty(this.Attr.prototype, prop, {
          set(val) {
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
              this.subject.forceUpdate(true);
              if(this.__reflowTag) {
                this.subject.reflow();
              }
            }
            // delete this.__reflowTag;
            // delete this.__updateTag;
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

  setReleaseKey(key) {
    this[_releaseKeys].add(key);
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

  set className(val) {
    this.attr('class', val);
  }

  get className() {
    return this.attr('class');
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
      if(!this[_attr].__attributeNames.has(key) && !(key in this[_attr])) {
        Object.defineProperty(this[_attr], key, {
          // enumerable: true,
          configurable: true,
          set(value) {
            const subject = this.subject;
            const owner = subject.__owner || subject;
            this.quietSet(key, value);
            // fixed color inherit
            if(key === 'color' && !this.__attributeNames.has('fillColor')) {
              subject.attr('fillColor', value);
            }
            // fixed font inherit
            if((key === 'fontSize'
              || key === 'fontFamily'
              || key === 'fontStyle'
              || key === 'fontVariant'
              || key === 'fontWeight') && !this.__attributeNames.has('font')) {
              const parseFont = require('./helpers/parse-font');
              const font = this.get('font') || 'normal normal normal 16px Arial';
              const parsed = parseFont(font);
              parsed.fontSize = parsed.size + parsed.unit;
              if(key === 'fontSize' && (typeof value === 'number' || /[\d.]$/.test(value))) {
                value += 'px';
              }
              parsed[key] = value;
              const {style, variant, weight, family, fontSize} = parseFont(font);
              subject.attr('font', `${style} ${variant} ${weight} ${fontSize} ${family}`);
            }
            if(key === 'font'
              || key === 'lineHeight'
              || key === 'lineBreak'
              || key === 'wordBreak'
              || key === 'letterSpacing'
              || key === 'textIndent') {
              const children = owner.querySelectorAll('*');
              children.forEach((node) => {
                if(node.retypesetting) node.retypesetting();
              });
            }
            if(inheritAttributes.has(key)) {
              subject.forceUpdate();
            }
          },
          get() {
            return this.get(key);
          },
        });
      }
      this[_attr][key] = value;
      if(stylesheet.relatedAttributes.has(key)) {
        this.updateStyles();
      }
    };
    if(typeof props === 'object') {
      Object.entries(props).forEach(([prop, value]) => {
        this.attr(prop, value);
      });
      return this;
    } if(typeof props === 'string') {
      if(val !== undefined) {
        if(props === 'attrs') {
          if(Array.isArray(val)) {
            val = Object.assign({}, ...val);
          }
          Object.entries(val).forEach(([prop, value]) => {
            this.attr(prop, value);
          });
          return this;
        }
        if(props === 'style') {
          if(Array.isArray(val)) {
            val = Object.assign({}, ...val);
          }
          Object.entries(val).forEach(([prop, value]) => {
            this.style[prop] = value;
          });
          return this;
        }
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
    if(typeof Proxy === 'function') {
      try {
        return new Proxy(this[_attr], {
          get(target, prop) {
            return target[prop];
          },
          set(target, prop, value) {
            if(typeof prop !== 'string' || /^__/.test(prop)) target[prop] = value;
            else target.subject.attr(prop, value);
            return true;
          },
          deleteProperty(target, prop) {
            if(typeof prop !== 'string' || /^__/.test(prop)) delete target[prop];
            else target.subject.attr(prop, null);
            return true;
          },
        });
      } catch (ex) {
        return this[_attr];
      }
    }
    return this[_attr];
  }

  get style() {
    if(typeof Proxy === 'function') {
      try {
        return new Proxy(this[_attr], {
          get(target, prop) {
            if(prop !== 'id' && prop !== 'name' && prop !== 'class'
              && target.__attributeNames.has(prop)
              || inheritAttributes.has(prop)) {
              return target[prop];
            }
            return target.subject[_style][prop];
          },
          set(target, prop, value) {
            if(prop !== 'id' && prop !== 'name' && prop !== 'class'
              && target.__attributeNames.has(prop)
              || inheritAttributes.has(prop)) {
              target.subject.attr(prop, value);
            } else {
              target.subject[_style][prop] = value;
            }
            return true;
          },
          deleteProperty(target, prop) {
            if(prop !== 'id' && prop !== 'name' && prop !== 'class'
              && target.__attributeNames.has(prop)
              || inheritAttributes.has(prop)) {
              target.subject.attr(prop, null);
            } else {
              delete target.subject[_style][prop];
            }
            return true;
          },
        });
      } catch (ex) {
        return this[_attr];
      }
    }
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

  transition(sec, easing = 'linear', isStyleAnim = false) {
    const that = this,
      _animation = Symbol('animation');

    easing = easing || 'linear';

    let delay = 0;
    if(typeof sec === 'object') {
      delay = sec.delay || 0;
      sec = sec.duration;
    }

    return {
      [_animation]: null,
      cancel(preserveState = false) {
        const animation = this[_animation];
        if(animation) {
          animation.cancel(preserveState);
        }
      },
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
          delay: delay * 1000,
          fill: 'forwards',
          easing,
        }, isStyleAnim);
        return this[_animation].finished;
      },
    };
  }

  animate(frames, timing, isStyleAnim = false) {
    let setter = null;
    if(isStyleAnim) {
      setter = (frame, target) => {
        target.attributes.__styleTag = true;
        target.attr(frame);
        target.attributes.__styleTag = false;
      };
    }
    const animation = new Animation(this, frames, timing, setter);
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

  get animations() {
    return this[_animations];
  }

  changeState(fromState, toState, action) {
    let animation;
    if(this[_changeStateAction]) {
      const currentAnim = this[_changeStateAction].animation;
      if(this[_changeStateAction].reversable && (currentAnim.playState === 'running' || currentAnim.playState === 'pending')
        && this[_changeStateAction].fromState === toState && this[_changeStateAction].toState === fromState) {
        currentAnim.playbackRate = -currentAnim.playbackRate;
        animation = currentAnim;
        animation.__reversed = this[_changeStateAction].action;
      } else {
        currentAnim.finish();
      }
    }
    if(!animation) {
      // const [_fromState, _toState] = [Object.assign({}, fromState), Object.assign({}, toState)];
      // delete _fromState.__default;
      // delete _toState.__default;
      const _fromState = {},
        _toState = {};
      Object.entries(fromState || {}).forEach(([key, value]) => {
        if(key !== '__default') {
          if(typeof value === 'function') {
            _fromState[key] = this.attr(key);
          } else {
            _fromState[key] = value;
          }
        }
      });
      Object.entries(toState || {}).forEach(([key, value]) => {
        if(key !== '__default') {
          if(typeof value === 'function') {
            _toState[key] = value(this.attr(key));
          } else {
            _toState[key] = value;
          }
        }
      });
      animation = this.animate([_fromState, _toState], Object.assign({fill: 'forwards'}, action));
      animation.finished.then(() => {
        if(this[_changeStateAction] && this[_changeStateAction].animation === animation) delete this[_changeStateAction];
      });
    }
    this[_changeStateAction] = {animation, fromState, toState, action, reversable: action.reversable !== false};
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
    [...this[_releaseKeys]].forEach(key => delete this[key]);
    return ret;
  }

  @absolute
  get xy() {
    let x,
      y;
    if(this.hasLayout) {
      x = this.attr('layoutX');
      y = this.attr('layoutY');
    } else {
      [x, y] = this.attr('pos');
    }
    return [x, y];
  }

  @absolute
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
      }
      if(height !== '') {
        height = Math.max(0, height - 2 * borderWidth - paddingTop - paddingBottom);
      }
    }
    return [width, height];
  }

  @absolute
  @flow
  get boxOffsetSize() { // get original boxSize, without layout
    if(this.isVirtual) return [0, 0];
    const [width, height] = this.attr('size');
    const [top, right, bottom, left] = this.attr('padding');
    const {width: borderWidth} = this.attr('border'),
      lw = borderWidth * 2;

    return [left + (width | 0) + right + lw, top + (height | 0) + bottom + lw];
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

  getParentXY(lx = 0, ly = 0) {
    const layer = this.layer;
    if(!layer) return [0, 0];
    const parents = [];
    let target = this.parent;
    while(target && target !== layer) {
      parents.push(target);
      target = target.parent;
    }
    parents.reverse();

    let parentX = lx,
      parentY = ly;

    parents.forEach((node) => {
      const scrollLeft = node.attr('scrollLeft'),
        scrollTop = node.attr('scrollTop'),
        borderWidth = node.attr('border').width,
        padding = node.attr('padding');

      [parentX, parentY] = node.pointToOffset(parentX, parentY);
      parentX = parentX - node.originalRect[0] - borderWidth - padding[3] + scrollLeft;
      parentY = parentY - node.originalRect[1] - borderWidth - padding[0] + scrollTop;
    });
    return [parentX, parentY];
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
      pos = this.xy;

    return [pos[0] + bound[0],
      pos[1] + bound[1],
      bound[2],
      bound[3]];
  }

  get renderBox() {
    const bound = this.boundingRect,
      pos = this.xy;

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
      [x0, y0] = this.xy;

    return vertices.map((v) => {
      const [x, y] = transform.transformPoint(v[0], v[1]);
      return [x0 + x, y0 + y];
    });
  }

  set cache(context) {
    if(context == null) {
      this[_cachePriority] = 0;
      if(this.parent && this.parent.cache) {
        this.parent.cache = null;
      }
    }
    if(this.cacheContext && context !== this.cacheContext) {
      cacheContextPool.put(this.cacheContext);
    }
    this.cacheContext = context;
  }

  get cache() {
    if(this[_cachePriority] >= CACHE_PRIORITY_THRESHOLDS) {
      return this.cacheContext;
    }
    if(this.cacheContext) {
      this.cache = null;
    }
    return false;
  }

  @deprecate('Instead use sprite.cache = null')
  clearCache() {
    this.cache = null;
  }

  appendTo(parent) {
    parent.appendChild(this);
  }

  forceUpdate(clearCache = false) {
    if(clearCache) {
      this.cache = null;
    }
    const parent = this.parent;
    if(parent) {
      this.parent.update(this);
    }
  }

  // layer position to sprite offset
  pointToOffset(x, y) {
    const [x0, y0] = this.xy;
    const [dx, dy] = [x - x0, y - y0];
    const transform = this.transform;
    return transform.inverse().transformPoint(dx, dy);
  }

  offsetToPoint(dx, dy) {
    const transform = this.transform;
    const [x0, y0] = this.xy;
    const [x, y] = transform.transformPoint(dx, dy);
    return [x + x0, y + y0];
  }

  getOffsetXY(evt) {
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
    if(parentX != null && parentY != null) {
      return this.pointToOffset(parentX, parentY);
    }
  }

  dispatchEvent(type, evt, collisionState = false, swallow = false) {
    if(collisionState) {
      const offsetXY = this.getOffsetXY(evt);
      if(offsetXY) {
        evt.offsetX = offsetXY[0];
        evt.offsetY = offsetXY[1];
      }
    }

    return super.dispatchEvent(type, evt, collisionState, swallow);
  }

  pointCollision(evt) {
    /* istanbul ignore if */
    if(!this.isVisible()) {
      return false;
    }
    const offsetXY = this.getOffsetXY(evt);
    if(!offsetXY) return true;

    let [nx, ny] = offsetXY;
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
    let cachableContext = !this.isVirtual && this.cache;

    const filter = this.attr('filter'),
      shadow = this.attr('shadow'),
      enableCache = this.attr('enableCache') || shadow || filter;

    const ratio = this.layer ? (this.layer.displayRatio || 1.0) : 1.0;

    if(enableCache && (shadow || filter || cachableContext !== false) && !cachableContext) {
      cachableContext = cacheContextPool.get(drawingContext);
      if(cachableContext) {
        // +2 to solve 1px problem
        cachableContext.canvas.width = Math.ceil(bound[2] * ratio) + 2;
        cachableContext.canvas.height = Math.ceil(bound[3] * ratio) + 2;
      }
    }

    const evtArgs = {context: drawingContext, cacheContext: cachableContext, target: this, renderTime: t, fromCache: !!this.cache};

    drawingContext.save();
    drawingContext.translate(...this.xy);
    drawingContext.transform(...this.transform.m);

    // fix for wxapp
    const alpha = drawingContext.globalAlpha != null ? drawingContext.globalAlpha : 1;
    drawingContext.globalAlpha = alpha * this.attr('opacity');

    if(!cachableContext) {
      drawingContext.translate(bound[0], bound[1]);
    } else {
      cachableContext.save();
      // solve 1px problem
      cachableContext.translate(bound[0] - Math.floor(bound[0]) + 1, bound[1] - Math.floor(bound[1]) + 1);
      if(ratio !== 1.0) {
        cachableContext.scale(ratio, ratio);
      }
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

    if((shadow || filter) && !cachableContext) {
      console.warn('No cachable context. Shadows and filters have been ignored.');
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
      drawingContext.drawImage(cachableContext.canvas, Math.floor(bound[0]) - 1, Math.floor(bound[1]) - 1,
        bound[2] + 2, bound[3] + 2);
    }

    this.dispatchEvent('afterdraw', evtArgs, true, true);

    if(cachableContext) {
      cachableContext.restore();
    }
    drawingContext.restore();

    this[_cachePriority]++;

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

  resolveStates(states, before, after) {
    let currentAnimation = null,
      resolved = false;

    const _states = [];
    let prev = null;
    for(let i = 0; i < states.length; i++) {
      const s = states[i];
      if(prev !== s) {
        prev = s;
        _states.push(s);
      }
    }
    states = _states;

    const _resolveStates = () => {
      this.__ignoreAction = false;
      let fromState = this.attr('state');
      if(fromState === states[0]) {
        states.shift();
      }

      const len = states.length;
      const resolveState = (state, i) => {
        const promise = new Promise((resolve) => {
          this.once(`state-to-${state}`, () => {
            fromState = state;
            if(i === len - 1) { // lastState
              delete this[_resolveState];
            }
            if(after) after.call(this, states);
            resolve(this);
          });
          this.once(`state-from-${fromState}`, ({animation}) => {
            if(animation && resolved) animation.finish();
            else currentAnimation = animation;
          });
          this.attr('state', state);
        });
        return promise;
      };

      let promise = Promise.resolve();
      states.forEach((state, i) => {
        promise = promise.then(() => {
          return resolveState(state, i);
        });
      });

      const ret = {
        get animation() {
          return currentAnimation;
        },
        states,
        resolve() {
          resolved = true;
          if(currentAnimation) currentAnimation.finish();
          return promise;
        },
        promise,
      };
      this[_resolveState] = ret;
      return ret;
    };
    const rs = this[_resolveState];
    if(rs) {
      rs.resolve();
      this.__ignoreAction = true;
      const promise = rs.promise.then(() => {
        if(before) before.call(this, states);
        return _resolveStates().promise;
      });
      return {
        promise,
        resolve() {
          resolved = true;
          if(currentAnimation) currentAnimation.finish();
          return promise;
        },
      };
    }
    if(before) before.call(this, states);
    return _resolveStates();
  }

  // state: original -> show -> hide -> show -> original
  show() {
    if(this[_show]) return this[_show];

    const originalDisplay = this.attr('__originalDisplay') || '';
    const originalState = this.attr('__originalState') || 'default';

    const states = this.attr('states');

    if(states.show) {
      const _st = ['show', originalState];
      if(states.beforeShow) {
        _st.unshift('beforeShow');
      }
      const deferred = this.resolveStates(_st, () => {
        const state = this.attr('state');
        if(state === 'hide') {
          this.once('state-from-hide', () => {
            this.attr('display', originalDisplay);
          });
        }
      });
      deferred.promise = deferred.promise.then(() => {
        if(!this[_hide]) {
          delete this[_attr].__originalDisplay;
          delete this[_attr].__originalState;
          if(states.show.__default) {
            delete states.show;
            this.attr('states', states);
          }
        }
        delete this[_show];
      });
      this[_show] = deferred;
      return deferred;
    }

    const rs = this[_resolveState];
    if(rs) {
      rs.resolve();
      rs.promise.then(() => {
        this.attr('state', originalState);
        this.attr('display', originalDisplay);
      });
      return rs;
    }

    this.attr('state', originalState);
    this.attr('display', originalDisplay);
    return this;
  }

  hide() {
    const state = this.attr('state');
    if(this[_hide] || state === 'hide' || state === 'afterExit' || state === 'beforeExit') return this[_hide];
    const __originalDisplay = this.attr('__originalDisplay');
    if(__originalDisplay == null) {
      const display = this.attr('display');

      this.attr({
        __originalDisplay: display !== 'none' ? display : '',
        __originalState: state !== 'hide' ? state : 'default',
      });
    }

    const states = this.attr('states');

    if(states.hide) {
      const deferred = this.resolveStates(['show', 'hide'], () => {
        if(!states.show) {
          const beforeHide = {__default: true};
          if(states.beforeShow) {
            Object.keys(states.beforeShow).forEach((key) => {
              beforeHide[key] = this.attr(key);
            });
          }
          Object.keys(states.hide).forEach((key) => {
            beforeHide[key] = this.attr(key);
          });
          states.show = beforeHide;
          this.attr('states', states);
        }
      });
      deferred.promise = deferred.promise.then(() => {
        this.attr('display', 'none');
        delete this[_hide];
        return this;
      });
      this[_hide] = deferred;
      return deferred;
    }

    const rs = this[_resolveState];
    if(rs) {
      rs.resolve();
      rs.promise.then(() => {
        this.attr('state', 'hide');
        this.attr('display', 'none');
      });
      return rs;
    }

    this.attr('state', 'hide');
    this.attr('display', 'none');
    return this;
  }

  enter(toState) {
    const states = this.attr('states');
    let ret;
    if(states && (states.beforeEnter || states.afterEnter)) {
      const deferred = this.resolveStates(['beforeEnter', 'afterEnter'], (_states) => {
        const state = this.attr('state');
        _states.push(toState || state);
        if(state !== 'beforeEnter' && state !== 'afterEnter' && (!states.afterEnter || states.afterEnter.__default)) {
          const afterEnter = {__default: true};
          Object.keys(states.beforeEnter).forEach((key) => {
            afterEnter[key] = this.attr(key);
          });
          states.afterEnter = afterEnter;
          this.attr('states', states);
        }
      });
      ret = deferred;
    } else {
      ret = super.enter();
    }

    this[_enter] = ret;
    if(this.children) {
      const enterMode = this.attr('enterMode');
      if(enterMode === 'onebyone' || enterMode === 'onebyone-reverse') {
        let promise = null;
        let resolved = false;
        if(ret.promise) {
          promise = ret.promise;
        } else {
          promise = Promise.resolve(this);
        }

        let children = this.children;
        if(enterMode === 'onebyone-reverse') {
          children = [...children].reverse();
        }

        let currentTask = ret;
        children.forEach((c) => {
          const states = c.attr('states');
          if(states && (states.beforeEnter || states.afterEnter)) {
            if(!states.afterEnter || states.afterEnter.__default) {
              const afterEnter = {__default: true};
              Object.keys(states.beforeEnter).forEach((key) => {
                afterEnter[key] = c.attr(key);
              });
              states.afterEnter = afterEnter;
              c.attr('states', states);
            }
          }
          const toState = c.attr('state');
          c.attr('state', 'beforeEnter');
          promise = promise.then(() => {
            const d = c.enter(toState);
            if(d.promise) {
              currentTask = d;
              if(resolved && d.resolve) {
                d.resolve();
              }
              return d.promise;
            }
            return d;
          });
        });

        this[_enter] = {
          promise,
          resolve() {
            if(currentTask && currentTask.resolve) currentTask.resolve();
            resolved = true;
          },
        };
      } else {
        const entries = this.children.map(c => c.enter()).filter(d => d.promise);
        if(ret.promise) {
          entries.unshift(ret);
        }
        if(entries.length) {
          const deferred = {
            promise: Promise.all(entries.map(d => d.promise)),
            resolve: () => {
              entries.forEach(d => d.resolve());
              return this.promise;
            },
          };
          this[_enter] = deferred;
        }
      }
    }

    return this[_enter];
  }

  exit(toState, onbyone = false) {
    const _exit = () => {
      const states = this.attr('states');
      let ret;
      const afterEnter = states.afterEnter || {};
      if(states && (states.beforeExit || states.afterExit)) {
        let state;
        const deferred = this.resolveStates(['beforeExit', 'afterExit'], () => {
          state = this.attr('state');
          if(state !== 'beforeExit' && state !== 'afterExit' && (!states.beforeExit || states.beforeExit.__default)) {
            states.beforeExit = Object.assign({}, afterEnter);
            states.beforeExit.__default = true;
            this.attr('states', states);
          }
        });
        deferred.promise.then(() => {
          if(!onbyone) {
            this.attr(afterEnter);
            this[_attr].quietSet('state', toState || state);
          }
          return this;
        });
        ret = deferred;
      } else {
        const rs = this[_resolveState];
        if(rs) {
          rs.resolve();
          rs.promise.then(() => {
            this.attr(afterEnter);
            return super.exit();
          });
          ret = rs;
        } else {
          ret = super.exit();
          this.attr(afterEnter);
        }
      }

      if(this.children) {
        const exitMode = this.attr('exitMode');
        if(exitMode === 'onebyone' || exitMode === 'onebyone-reverse') {
          let promise = Promise.resolve(this);
          let resolved = false;

          let children = this.children;
          if(exitMode === 'onebyone-reverse') {
            children = [...children].reverse();
          }

          let currentTask = null;
          children.forEach((c) => {
            const states = c.attr('states');
            if(states && (states.beforeExit || states.afterExit)) {
              if(!states.beforeExit || states.beforeExit.__default) {
                states.beforeExit = Object.assign({}, afterEnter);
                states.beforeExit.__default = true;
                c.attr('states', states);
              }
            }
            const toState = c.attr('state');
            c.attr('state', 'beforeExit');
            promise = promise.then(() => {
              const d = c.exit(toState, true);
              if(d.promise) {
                currentTask = d;
                if(resolved && d.resolve) d.resolve();
                return d.promise;
              }
              return d;
            });
            c.__toState = toState;
          });

          promise = promise.then(() => {
            const p = ret.promise || Promise.resolve(this);
            currentTask = ret;
            return p.then(() => {
              this.children.forEach((c) => {
                const states = c.attr('states');
                c.attr(states.afterEnter);
                c[_attr].quietSet('state', c.__toState);
                delete c.__toState;
              });
            });
          });

          return {
            promise,
            resolve() {
              if(currentTask && currentTask.resolve) currentTask.resolve();
              resolved = true;
            },
          };
        }

        const exites = this.children.map(c => c.exit()).filter(d => d.promise);
        if(ret.promise) {
          exites.unshift(ret);
        }
        if(exites.length) {
          const deferred = {
            promise: Promise.all(exites.map(d => d.promise)),
            resolve: () => {
              exites.forEach(d => d.resolve());
              return this.promise;
            },
          };
          return deferred;
        }
      }

      return ret;
    };

    if(this[_enter] && this[_enter].promise) {
      let resolved = false;
      this[_enter].resolve();
      const promise = this[_enter].promise.then(() => {
        const deferred = _exit();
        if(resolved && deferred.resolve) {
          deferred.resolve();
        }
        return deferred.promise;
      });
      return {
        promise,
        resolve() {
          resolved = true;
        },
      };
    }
    return _exit();
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

  // draw .9 cross
  const midWidth = w - left - right,
    midHeight = h - top - bottom;

  if(midWidth > 0) {
    let midBoxWidth = clientWidth - left - right + 2;
    let leftOffset = borderWidth + left - 1;
    while(midBoxWidth > 0) {
      const ww = Math.min(midBoxWidth, midWidth) + 1;
      const topPiece = [left - 1, 0, ww, top],
        bottomPiece = [left - 1, h - bottom, ww, bottom];

      drawingContext.drawImage(image, ...topPiece, leftOffset, borderWidth, ww, top);
      drawingContext.drawImage(image, ...bottomPiece, leftOffset, boxBottom, ww, bottom);
      midBoxWidth -= midWidth;
      if(midBoxWidth > 0) {
        leftOffset += midWidth;
      }
    }
  }

  if(midHeight > 0) {
    let midBoxHeight = clientHeight - top - bottom + 2;
    let topOffset = borderWidth + top - 1;
    while(midBoxHeight > 0) {
      const hh = Math.min(midBoxHeight, midHeight) + 1;
      const leftPiece = [0, top - 1, left, hh],
        rightPiece = [w - right, top - 1, right, hh];

      drawingContext.drawImage(image, ...leftPiece, borderWidth, topOffset, left, hh);
      drawingContext.drawImage(image, ...rightPiece, boxRight, topOffset, right, hh);
      midBoxHeight -= midHeight;
      if(midBoxHeight > 0) {
        topOffset += midHeight;
      }
    }
  }

  if(midHeight && midWidth > 0) {
    let midBoxWidth = clientWidth - left - right + 2;
    let leftOffset = borderWidth + left - 1;

    while(midBoxWidth > 0) {
      let midBoxHeight = clientHeight - top - bottom + 2;
      let topOffset = borderWidth + top - 1;
      while(midBoxHeight > 0) {
        const ww = Math.min(midBoxWidth, midWidth) + 1,
          hh = Math.min(midBoxHeight, midHeight) + 1;
        const midPiece = [left - 1, top - 1, ww, hh];
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

  // draw four corners
  drawingContext.drawImage(image, ...leftTop, borderWidth, borderWidth, left, top);
  drawingContext.drawImage(image, ...rightTop, boxRight, borderWidth, right, top);
  drawingContext.drawImage(image, ...rightBottom, boxRight, boxBottom, left, bottom);
  drawingContext.drawImage(image, ...leftBottom, borderWidth, boxBottom, left, bottom);
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
