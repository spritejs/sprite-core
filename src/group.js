import {parseValue, attr, flow, relative} from './utils';
import BaseSprite from './basesprite';
import {registerNodeType} from './nodetype';
import {createSvgPath, pathEffect} from './helpers/path';

import BaseNode from './basenode';
import DataNode from './datanode';

import * as layout from './layout';

import groupApi from './helpers/group';

const _zOrder = Symbol('zOrder'),
  _layoutTag = Symbol('layoutTag');

class GroupAttr extends BaseSprite.Attr {
  static inits = []

  constructor(subject) {
    super(subject);
    this.setDefault({
      clip: null,
      scrollTop: 0,
      scrollLeft: 0,
    });

    GroupAttr.inits.forEach((init) => {
      init(this, subject);
    });
  }

  @attr
  set clip(val) {
    this.clearFlow();
    if(val) {
      val = typeof val === 'string' ? {d: val} : val;
      this.subject.svg = createSvgPath(val);
      this.set('clip', val);
    } else {
      this.subject.svg = null;
      this.set('clip', null);
    }
  }

  @attr
  @relative('width')
  set width(value) {
    this.subject.clearLayout();
    this.set('width', value);
  }

  @attr
  @relative('height')
  set height(value) {
    this.subject.clearLayout();
    this.set('height', value);
  }

  @attr
  @relative('width')
  set layoutWidth(value) {
    this.subject.clearLayout();
    this.set('layoutWidth', value);
  }

  @attr
  @relative('height')
  set layoutHeight(value) {
    this.subject.clearLayout();
    this.set('layoutHeight', value);
  }

  @attr
  set display(value) {
    this.subject.clearLayout();
    this.set('display', value);
  }

  @parseValue(parseFloat)
  @attr
  set scrollLeft(value) {
    this.set('scrollLeft', value);
  }

  @parseValue(parseFloat)
  @attr
  set scrollTop(value) {
    this.set('scrollTop', value);
  }
}

const _layout = Symbol('layout');

export default class Group extends BaseSprite {
  static Attr = GroupAttr

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
  }

  get isVirtual() {
    const display = this.attr('display');
    if(display !== '' && display !== 'none') return false;
    const {width: borderWidth} = this.attr('border'),
      borderRadius = this.attr('borderRadius'),
      bgcolor = this.attr('bgcolor'),
      {bgcolor: bgGradient} = this.attr('gradients'),
      [width, height] = this.attrSize,
      [anchorX, anchorY] = this.attr('anchor'),
      bgimage = this.attr('bgimage');

    return !anchorX && !anchorY && !width && !height && !borderRadius
      && !borderWidth && !bgcolor && !bgGradient && !bgimage;
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
    return children.filter(child => child instanceof BaseNode && !(child instanceof DataNode));
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

  dispatchEvent(type, evt, collisionState = false, swallow = false) {
    if(swallow && this.getEventHandlers(type).length === 0) {
      return;
    }
    if(!swallow && !evt.terminated && type !== 'mouseenter') {
      const isCollision = collisionState || this.pointCollision(evt);
      if(isCollision || type === 'mouseleave') {
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

        const sprites = this.sortedChildNodes.slice(0).reverse();

        const targetSprites = [];

        for(let i = 0; i < sprites.length && evt.isInClip !== false; i++) {
          const sprite = sprites[i];
          const hit = sprite.dispatchEvent(type, evt, collisionState, swallow);
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
    if(evt.targetSprites.length > 0) {
      // bubbling
      collisionState = true;
    }
    return super.dispatchEvent(type, evt, collisionState, swallow);
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
    let parent = this.parent;
    while(parent) {
      if(parent[_layoutTag]) parent[_layoutTag] = false;
      parent = parent.parent;
    }
  }

  render(t, drawingContext) {
    const display = this.attr('display');
    if(display !== '' && display !== 'static' && !this[_layoutTag]) {
      this.relayout();
    }

    const clipPath = this.attr('clip');
    if(clipPath) {
      this.svg.beginPath().to(drawingContext);
      drawingContext.clip();
    }

    if(!this.isVirtual) {
      super.render(t, drawingContext);
      drawingContext.beginPath();
      drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
      drawingContext.clip();
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

      if(child.isVisible()) {
        child.draw(t, drawingContext);
      }
      if(isDirty) {
        child.dispatchEvent('update', {target: child, renderTime: t}, true, true);
      }
    }
    drawingContext.restore();

    if(display !== '' && display !== 'static') {
      this[_layoutTag] = true;
    }
  }
}
Object.assign(Group.prototype, groupApi);
Group.applyLayout('flex', layout.flexLayout);

Group.setAttributeEffects({
  clip(clip1, clip2, p, start, end) {
    clip1 = createSvgPath(clip1);
    clip2 = createSvgPath(clip2);
    return pathEffect(clip1.d, clip2.d, p, start, end);
  },
});

registerNodeType('group', Group, true);
