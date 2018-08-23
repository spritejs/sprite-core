import {parseValue, attr, flow} from 'sprite-utils';
import BaseSprite from './basesprite';
import {registerNodeType} from './nodetype';
import {createSvgPath} from './helpers/path';
import * as layout from './layout';

import groupApi from './helpers/group';

const _children = Symbol('children'),
  _zOrder = Symbol('zOrder'),
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
    this.clearCache();
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
  set width(value) {
    this.subject.clearLayout();
    super.width = value;
  }

  @attr
  set height(value) {
    this.subject.clearLayout();
    super.height = value;
  }

  @attr
  set layoutWidth(value) {
    this.subject.clearLayout();
    super.layoutWidth = value;
  }

  @attr
  set layoutHeight(value) {
    this.subject.clearLayout();
    super.layoutHeight = value;
  }

  @attr
  set display(value) {
    this.subject.clearLayout();
    super.display = value;
  }

  @parseValue(parseFloat)
  @attr
  set scrollLeft(value) {
    this.clearCache();
    this.set('scrollLeft', value);
  }

  @parseValue(parseFloat)
  @attr
  set scrollTop(value) {
    this.clearCache();
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
    this[_children] = [];
    this[_zOrder] = 0;
    this[_layoutTag] = false;
  }

  get isVirtual() {
    const display = this.attr('display');
    if(display !== '') return false;
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
      const children = this.children;
      children.forEach((child) => {
        const subNode = child.cloneNode(deepCopy);
        node.append(subNode);
      });
    }
    return node;
  }

  get children() {
    return this[_children];
  }

  get childNodes() {
    return this[_children];
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
        this[_children].forEach((sprite) => {
          const renderBox = sprite.renderBox;
          right = Math.max(right, renderBox[2]);
          bottom = Math.max(bottom, renderBox[3]);
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
    if(!swallow && !evt.terminated && type !== 'mouseenter' && type !== 'mouseleave') {
      const isCollision = collisionState || this.pointCollision(evt);
      if(isCollision) {
        const scrollLeft = this.attr('scrollLeft'),
          scrollTop = this.attr('scrollTop'),
          borderWidth = this.attr('border').width,
          padding = this.attr('padding');

        const parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft;
        const parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop;
        // console.log(evt.parentX, evt.parentY)

        const _evt = Object.assign({}, evt);
        _evt.parentX = parentX;
        _evt.parentY = parentY;

        const sprites = this[_children].slice(0).reverse();

        const targetSprites = [];

        for(let i = 0; i < sprites.length && evt.isInClip !== false; i++) {
          const sprite = sprites[i];
          const hit = sprite.dispatchEvent(type, _evt, collisionState, swallow);
          if(hit) {
            targetSprites.push(sprite);
          }
          if(evt.terminated && !type.startsWith('mouse')) {
            break;
          }
        }

        evt.targetSprites = targetSprites;
        // stopDispatch can only terminate event in the same level
        evt.terminated = false;
        return super.dispatchEvent(type, evt, isCollision, swallow);
      }
    }
    evt.targetSprites = evt.targetSprites || [];
    return super.dispatchEvent(type, evt, collisionState, swallow);
  }

  relayout() {
    const items = this.children.filter((child) => {
      if(child.hasLayout) {
        child.attr('layoutWidth', null);
        child.attr('layoutHeight', null);
      }
      if(child.relayout) {
        const display = child.attr('display');
        if(display !== '' && display !== 'static') {
          child.relayout();
        }
      }
      return child.hasLayout;
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
      const [w, h] = this.attrSize;
      if(w !== '' || h !== '') {
        drawingContext.beginPath();
        drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
        drawingContext.clip();
      }
    }

    drawingContext.save();
    const scrollLeft = this.attr('scrollLeft'),
      scrollTop = this.attr('scrollTop');

    drawingContext.translate(-scrollLeft, -scrollTop);
    const sprites = this[_children];

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

registerNodeType('group', Group, true);
