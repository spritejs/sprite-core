import {parseValue, attr, flow, relative, createSvgPath} from '../utils';
import BaseSprite from './basesprite';

import groupApi from '../helpers/group';

const _zOrder = Symbol('zOrder'),
  _layoutTag = Symbol('layoutTag');

const reflow = true,
  relayout = true;

class GroupAttr extends BaseSprite.Attr {
  static inits = [];

  constructor(subject) {
    super(subject);
    GroupAttr.inits.forEach((init) => {
      init(this, subject);
    });
  }

  @attr
  enableCache = 'auto';

  @attr({reflow, value: null})
  set clip(val) {
    if(val) {
      val = typeof val === 'string' ? {d: val} : val;
      this.subject.svg = createSvgPath(val);
      this.set('clip', val);
    } else {
      this.subject.svg = null;
      this.set('clip', null);
    }
  }

  @attr({reflow, relayout})
  @relative('width')
  layoutWidth = '';

  @attr({reflow, relayout})
  @relative('height')
  layoutHeight = '';

  @attr({reflow, relayout})
  @relative('width')
  width = '';

  @attr({reflow, relayout})
  @relative('height')
  height = '';

  @attr({relayout})
  display = '';

  @parseValue(parseFloat)
  @attr
  scrollLeft = 0;

  @parseValue(parseFloat)
  @attr
  scrollTop = 0;
}

const _layout = Symbol('layout');

export default class Group extends BaseSprite {
  static Attr = GroupAttr;

  static applyLayout(name, layout) {
    this[_layout] = this[_layout] || {};
    const {attrs, relayout} = layout;
    if(attrs.init) {
      GroupAttr.inits.push(attrs.init);
    }
    Group.addAttributes(attrs);
    this[_layout][name] = relayout;
  }

  constructor(attr = {}) {
    super(attr);
    this.childNodes = [];
    this.sortedChildNodes = [];
    this[_zOrder] = 0;
    this[_layoutTag] = false;
    this.__labelCount = 0;
  }

  get isVirtual() {
    const display = this.attr('display');
    if(display !== '' && display !== 'none') return false;

    const parent = this.parent;
    if(parent && parent instanceof Group && !parent.isVirtual) return false;

    const {width: borderWidth} = this.attr('border'),
      borderRadius = this.attr('borderRadius'),
      bgcolor = this.attr('bgcolor'),
      {bgcolor: bgGradient} = this.attr('gradients'),
      [width, height] = this.attrSize,
      [anchorX, anchorY] = this.attr('anchor'),
      bgimage = this.attr('bgimage'),
      [paddingTop, paddingRight, paddingBottom, paddingLeft] = this.attr('padding');

    return !anchorX && !anchorY && !width && !height && !borderRadius
      && !borderWidth && !bgcolor && !bgGradient && !bgimage
      && !paddingTop && !paddingRight && !paddingBottom && !paddingLeft;
  }

  connect(parent, zOrder = 0) {
    const ret = super.connect(parent, zOrder);
    const labelCount = this.__labelCount;
    let _p = parent;
    while(_p && _p.__labelCount != null) {
      _p.__labelCount += labelCount;
      _p = _p.parent;
    }
    return ret;
  }

  disconnect(parent) {
    const ret = super.disconnect(parent);
    const labelCount = this.__labelCount;
    let _p = parent;
    while(_p && _p.__labelCount != null) {
      _p.__labelCount -= labelCount;
      _p = _p.parent;
    }
    return ret;
  }

  scrollTo(x, y) {
    this.attr('scrollLeft', x);
    this.attr('scrollTop', y);
  }

  scrollBy(dx, dy) {
    const x = this.attr('scrollLeft'),
      y = this.attr('scrollTop');

    this.scrollTo(x + dx, y + dy);
  }

  cloneNode(deepCopy) {
    const node = super.cloneNode();
    if(deepCopy) {
      const children = this.childNodes;
      children.forEach((child) => {
        const subNode = child.cloneNode(deepCopy);
        node.append(subNode);
      });
    }
    return node;
  }

  get children() {
    const children = this.childNodes || [];
    return children.filter(child => child instanceof BaseSprite);
  }

  update(child) {
    child.isDirty = true;
    const attrSize = this.attrSize;
    if(attrSize[0] === '' || attrSize[1] === '') {
      this.reflow();
    }
    this.forceUpdate(true);
  }

  pointCollision(evt) {
    if(super.pointCollision(evt) || this.isVirtual) {
      if(this.svg) {
        const {offsetX, offsetY} = evt;
        if(offsetX == null && offsetY == null) return true;
        const rect = this.originalRect;
        evt.isInClip = this.svg.isPointInPath(offsetX - rect[0], offsetY - rect[1]);
      }
      return true;
    }
    return false;
  }

  @flow
  get contentSize() {
    if(this.isVirtual) return [0, 0];
    let [width, height] = this.attrSize;

    if(width === '' || height === '') {
      if(this.attr('clip')) {
        const svg = this.svg;
        const bounds = svg.bounds;
        width = width || bounds[2];
        height = height || bounds[3];
      } else {
        let right,
          bottom;

        right = 0;
        bottom = 0;
        this.childNodes.forEach((sprite) => {
          if(sprite.attr('display') !== 'none') {
            const renderBox = sprite.renderBox;
            if(renderBox) {
              right = Math.max(right, renderBox[2]);
              bottom = Math.max(bottom, renderBox[3]);
            }
          }
        });
        width = width || right;
        height = height || bottom;
      }
    }
    return [width, height];
  }

  dispatchEvent(type, evt, collisionState = false, swallow = false, useCapturePhase = null) {
    const handlers = this.getEventHandlers(type);
    if(swallow && handlers.length === 0) {
      return;
    }
    let hasCapturePhase = false;
    if(!swallow && !evt.terminated && type !== 'mouseenter') {
      const isCollision = collisionState || this.pointCollision(evt);
      if(isCollision || type === 'mouseleave' || !this.attr('clipOverflow')) {
        const scrollLeft = this.attr('scrollLeft'),
          scrollTop = this.attr('scrollTop'),
          borderWidth = this.attr('border').width,
          padding = this.attr('padding');

        let parentX,
          parentY;

        if('offsetX' in evt) parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft;
        if('offsetY' in evt) parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop;

        const _parentX = evt.parentX,
          _parentY = evt.parentY;

        evt.parentX = parentX;
        evt.parentY = parentY;

        if(isCollision && handlers.length && handlers.some(handler => handler.useCapture)) {
          hasCapturePhase = true;
          if(!evt.target) evt.target = this.getTargetFromXY(parentX, parentY);
          super.dispatchEvent(type, evt, isCollision, swallow, true);
        }

        const targetSprites = [];
        if(!hasCapturePhase || !evt.cancelBubble) {
          const sprites = this.sortedChildNodes.slice(0).reverse();

          for(let i = 0; i < sprites.length && evt.isInClip !== false; i++) {
            const sprite = sprites[i];
            const hit = sprite.dispatchEvent(type, evt, collisionState, swallow, useCapturePhase);
            if(hit) {
              if(evt.targetSprites) {
                targetSprites.push(...evt.targetSprites);
                delete evt.targetSprites;
              }
              targetSprites.push(sprite);
            }
            if(evt.terminated && type !== 'mousemove') {
              break;
            }
          }
        }

        evt.targetSprites = targetSprites;
        // stopDispatch can only terminate event in the same level
        evt.terminated = false;
        evt.parentX = _parentX;
        evt.parentY = _parentY;
        collisionState = isCollision;
      }
    }
    evt.targetSprites = evt.targetSprites || [];
    if(evt.cancelBubble) {
      // stop bubbling
      return false;
    }
    if(hasCapturePhase) {
      return super.dispatchEvent(type, evt, collisionState, swallow, false);
    }
    if(evt.targetSprites.length > 0) {
      // bubbling
      collisionState = true;
    }
    return super.dispatchEvent(type, evt, collisionState, swallow, useCapturePhase);
  }

  relayout() {
    const items = this.childNodes.filter((child) => {
      if(child.hasLayout) {
        child.attr('layoutWidth', null);
        child.attr('layoutHeight', null);
        child.attr('layoutX', null);
        child.attr('layoutY', null);
      }
      if(child.relayout) {
        const display = child.attr('display');
        if(display !== '' && display !== 'static') {
          child.relayout();
        }
      }
      return child.hasLayout && child.attr('display') !== 'none';
    });

    const display = this.attr('display');
    const doLayout = Group[_layout][display];
    if(doLayout) {
      doLayout(this, items);
    }
  }

  clearLayout() {
    this[_layoutTag] = false;
    if(this.hasLayout) this.parent.clearLayout();
  }

  draw(t, drawingContext = this.context) {
    // must relayout before draw
    // prevent originalRect changing when rendering.
    const display = this.attr('display');
    if(display !== '' && display !== 'static' && !this[_layoutTag]) {
      this.relayout();
      this[_layoutTag] = true;
    }
    return super.draw(t, drawingContext);
  }

  render(t, drawingContext) {
    const clipPath = this.attr('clip');
    if(clipPath) {
      this.svg.beginPath().to(drawingContext);
      drawingContext.clip();
    }

    if(!this.isVirtual) {
      super.render(t, drawingContext);
      if(this.attr('clipOverflow')) {
        drawingContext.beginPath();
        drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
        drawingContext.clip();
      }
    }

    drawingContext.save();
    const scrollLeft = this.attr('scrollLeft'),
      scrollTop = this.attr('scrollTop');

    drawingContext.translate(-scrollLeft, -scrollTop);
    const sprites = this.sortedChildNodes;

    for(let i = 0; i < sprites.length; i++) {
      const child = sprites[i],
        isDirty = child.isDirty;
      child.isDirty = false;

      child.draw(t, drawingContext);
      if(isDirty) {
        child.dispatchEvent('update', {target: child, renderTime: t}, true, true);
      }
    }
    drawingContext.restore();
  }
}
Object.assign(Group.prototype, groupApi);
