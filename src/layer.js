import {Timeline} from 'sprite-animator';
import {requestAnimationFrame, cancelAnimationFrame} from 'fast-animation-frame';
import {setDeprecation} from 'sprite-utils';
import BaseNode from './basenode';
import Batch from './batch';
import Group from './group';
import {registerNodeType} from './nodetype';

import {clearDirtyRects} from './helpers/dirty-check';

import groupApi from './helpers/group';

const _children = Symbol('children'),
  _updateSet = Symbol('updateSet'),
  _zOrder = Symbol('zOrder'),
  _tRecord = Symbol('tRecord'),
  _timeline = Symbol('timeline'),
  _renderDeferer = Symbol('renderDeferrer'),
  _drawTask = Symbol('drawTask'),
  _autoRender = Symbol('autoRender'),
  _adjustTimer = Symbol('adjustTimer');

export default class Layer extends BaseNode {
  constructor({
    context,
    handleEvent = true,
    evaluateFPS = false,
    renderMode = 'repaintAll',
    autoRender = true,
  } = {}) {
    super();

    this.handleEvent = handleEvent;
    this.evaluateFPS = evaluateFPS;
    this[_autoRender] = autoRender;

    // renderMode: repaintAll | repaintDirty
    this.renderMode = renderMode;

    this.outputContext = context;

    // auto release
    /* istanbul ignore if  */
    if(context.canvas && context.canvas.addEventListener) {
      context.canvas.addEventListener('DOMNodeRemovedFromDocument', () => {
        this.timeline.clear();
        this.clear();
      });
    }

    this[_children] = [];
    this[_updateSet] = new Set();
    this[_zOrder] = 0;
    this[_tRecord] = []; // calculate FPS
    this[_timeline] = new Timeline();
    this[_renderDeferer] = null;

    this.touchedTargets = {};
  }

  set autoRender(value) {
    this[_autoRender] = value;
    if(value) {
      this.draw();
    }
  }

  get autoRender() {
    return this[_autoRender];
  }

  get layer() {
    return this;
  }

  get children() {
    return this[_children];
  }

  get timeline() {
    return this[_timeline];
  }

  get context() {
    return this.outputContext;
  }

  get canvas() {
    return this.outputContext.canvas;
  }

  get offset() {
    return [0, 0];
  }

  clearContext(context) {
    if(context.canvas) {
      const {width, height} = context.canvas;
      context.clearRect(0, 0, width, height);
    }
  }

  remove(...args) {
    if(args.length === 0) {
      setDeprecation('layer.remove()', 'Instead use layer.clear().');
      return this.clear();
    }
    return args.map(child => this.removeChild(child));
  }

  prepareRender() {
    if(!this[_renderDeferer]) {
      this[_renderDeferer] = {};
      this[_renderDeferer].promise = new Promise((resolve, reject) => {
        Object.assign(this[_renderDeferer], {resolve, reject});
        if(this.autoRender) {
          this[_drawTask] = requestAnimationFrame(() => {
            delete this[_drawTask];
            this.draw();
          });
        }
      });
      // .catch(ex => console.error(ex.message))
    }
    return this[_renderDeferer] ? this[_renderDeferer].promise : Promise.resolve();
  }

  draw(clearContext = true) {
    const renderDeferrer = this[_renderDeferer];
    this[_renderDeferer] = null;
    if(this[_drawTask]) {
      cancelAnimationFrame(this[_drawTask]);
      delete this[_drawTask];
    }
    /* istanbul ignore if  */
    if(this.evaluateFPS) {
      this[_tRecord].push(Date.now());
      this[_tRecord] = this[_tRecord].slice(-10);
    }

    let renderer;
    if(this.renderMode === 'repaintDirty') {
      renderer = this.renderRepaintDirty.bind(this);
    } else if(this.renderMode === 'repaintAll') {
      renderer = this.renderRepaintAll.bind(this);
    } else {
      /* istanbul ignore next  */
      throw new Error('unknown render mode!');
    }
    const currentTime = this.timeline.currentTime;
    renderer(currentTime, clearContext);

    super.dispatchEvent.call(
      this, 'update',
      {target: this, timeline: this.timeline, renderTime: currentTime}, true
    );

    if(renderDeferrer) {
      renderDeferrer.resolve();
    }
  }

  update(target) {
    if(target && target.isDirty) return;
    if(target) {
      this[_updateSet].add(target);
      target.isDirty = true;
    }
    this.prepareRender();
  }

  isVisible() {
    if(this.canvas) {
      return this.canvas.width > 0 && this.canvas.height > 0;
    }
    return true;
  }

  get fps() /* istanbul ignore next  */ {
    if(!this.evaluateFPS) {
      return NaN;
    }
    let sum = 0;
    const tr = this[_tRecord].slice(-10);
    const len = tr.length;

    if(len <= 5) {
      return NaN;
    }
    tr.reduceRight((a, b, i) => { sum += (a - b); return b });

    return Math.round(1000 * (len - 1) / sum);
  }

  drawSprites(renderEls, t) {
    this[_updateSet].clear();
    for(let i = 0; i < renderEls.length; i++) {
      const child = renderEls[i],
        isDirty = child.isDirty;
      child.isDirty = false;

      if(child.parent === this) {
        const isVisible = child.isVisible();
        if(isVisible) {
          child.draw(t);
          if(this.renderMode === 'repaintDirty') {
            child.lastRenderBox = child.renderBox;
          } else {
            child.lastRenderBox = 'no-calc';
          }
        } else {
          // invisible, only need to remove lastRenderBox
          delete child.lastRenderBox;
        }
        if(isDirty) {
          child.dispatchEvent('update', {target: child, renderTime: t, isVisible}, true, true);
        }
      }
    }
  }

  renderRepaintAll(t, clearContext = true) {
    const renderEls = this[_children];
    const outputContext = this.outputContext;
    if(clearContext) this.clearContext(outputContext);
    this.drawSprites(renderEls, t);
  }

  renderRepaintDirty(t, clearContext = true) {
    const updateEls = [...this[_updateSet]];
    if(updateEls.some(el => !!el.attr('filter') || el.isVirtual || el.lastRenderBox === 'no-calc')) {
      return this.renderRepaintAll(t, clearContext);
    }

    const outputContext = this.outputContext;

    const renderEls = this[_children];

    outputContext.save();
    outputContext.beginPath();

    clearDirtyRects(outputContext, updateEls, true);

    if(clearContext) this.clearContext(outputContext);

    this.drawSprites(renderEls, t);

    outputContext.restore();
  }

  pointCollision(evt) {
    if(this.outputContext.canvas) {
      const {layerX, layerY} = evt;
      const {width, height} = this.outputContext.canvas;

      if(layerX == null && layerY == null
        || layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
        return true;
      }
      return false;
    }
    /* istanbul ignore next  */
    return true;
  }

  dispatchEvent(type, evt, collisionState = false, swallow = false) {
    if(swallow && this.getEventHandlers(type).length === 0) {
      return;
    }
    if(!swallow && !evt.terminated && type !== 'mouseenter' && type !== 'mouseleave') {
      let isCollision = collisionState || this.pointCollision(evt);
      const changedTouches = evt.originalEvent && evt.originalEvent.changedTouches;
      if(changedTouches && type === 'touchend') {
        isCollision = true;
      }
      if(isCollision) {
        const sprites = this[_children].slice(0).reverse(),
          targetSprites = [];

        if(changedTouches && type === 'touchend') {
          const touch = changedTouches[0];
          if(touch && touch.identifier != null) {
            const targets = this.layer.touchedTargets[touch.identifier];
            if(targets) {
              targets.forEach((target) => {
                if(target !== this && target.layer === this) {
                  target.dispatchEvent(type, evt, true);
                }
              });
              delete this.layer.touchedTargets[touch.identifier];
            }
          }
        } else {
          for(let i = 0; i < sprites.length; i++) {
            const sprite = sprites[i];
            const hit = sprite.dispatchEvent(type, evt, collisionState, swallow);
            if(hit) {
              // detect mouseenter/mouseleave
              targetSprites.push(sprite);
            }
            if(evt.terminated && !type.startsWith('mouse')) {
              break;
            }
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

  connect(parent, zOrder, zIndex) /* istanbul ignore next  */ {
    super.connect(parent, zOrder);
    this.zIndex = zIndex;
    if(parent && parent.container) {
      parent.container.appendChild(this.outputContext.canvas);
    }
    return this;
  }

  disconnect(parent) /* istanbul ignore next  */ {
    if(this.canvas && this.canvas.remove) {
      this.canvas.remove();
    }
    return super.disconnect(parent);
  }

  group(...sprites) {
    const group = new Group();
    group.append(...sprites);
    this.appendChild(group);
    return group;
  }

  batch(...sprites) {
    sprites.forEach((sprite) => {
      if(sprite.layer !== this) {
        this.appendChild(sprite);
      }
    });
    const batch = new Batch(this);
    batch.add(...sprites);
    return batch;
  }

  adjust(handler, update = true) /* istanbul ignore next  */ {
    if(!update) return;
    const outputContext = this.outputContext;
    const shadowContext = this.adjustContext || outputContext.canvas.cloneNode().getContext('2d');

    if(!this[_adjustTimer]) {
      this.autoRender = false;
      shadowContext.clearRect(0, 0, shadowContext.canvas.width, shadowContext.canvas.height);
      shadowContext._clearTag = false;
      shadowContext.drawImage(outputContext.canvas, 0, 0);
      this.adjustContext = shadowContext;
    } else {
      clearTimeout(this[_adjustTimer]);
    }
    this[_adjustTimer] = setTimeout(() => {
      this.autoRender = true;
      delete this[_adjustTimer];
    }, 100);

    if(shadowContext.canvas.width > 0 && shadowContext.canvas.height > 0) {
      this.clearContext(outputContext);
      outputContext.save();
      handler.call(this, outputContext);
      outputContext.drawImage(shadowContext.canvas, 0, 0);
      outputContext.restore();
    }
  }

  clearUpdate() {
    /* istanbul ignore next  */
    this[_updateSet].clear();
  }
}

Object.assign(Layer.prototype, groupApi);

registerNodeType('layer', Layer, true);
