import {Timeline} from 'sprite-animator';
import {requestAnimationFrame, cancelAnimationFrame, timeline} from '../helpers/fast-animation-frame';
import BaseNode from './basenode';
import BaseSprite from './basesprite';
import Batch from './batch';
import Group from './group';

import groupApi from '../helpers/group';

// import stylesheet from './stylesheet';

import {setDeprecation, parseValue, parseColorString, attr, cacheContextPool} from '../utils';

const _zOrder = Symbol('zOrder'),
  _timeline = Symbol('timeline'),
  _renderDeferer = Symbol('renderDeferrer'),
  _drawTask = Symbol('drawTask'),
  _autoRender = Symbol('autoRender'),
  _adjustTimer = Symbol('adjustTimer');

class LayerAttr extends BaseNode.Attr {
  constructor(subject) {
    super(subject);
    this.setDefault({
      bgcolor: '',
    });
  }

  @parseValue(parseColorString)
  @attr
  set bgcolor(val) {
    this.set('bgcolor', val);
    const subject = this.subject;
    if(subject.canvas && subject.canvas.style) {
      if(val != null) {
        this.quietSet('canvasBgColor', subject.canvas.style.backgroundColor);
        subject.canvas.style.backgroundColor = val;
      } else {
        subject.canvas.style.backgroundColor = this.get('canvasBgColor');
      }
    }
  }
}

export default class Layer extends BaseNode {
  static Attr = LayerAttr;

  constructor({
    context,
    /* deprecated */ evaluateFPS = false,
    /* deprecated */ renderMode = 'repaintAll',
    autoRender = true,
    useDocumentCSS = false,
  } = {}) {
    super();

    this[_autoRender] = autoRender;

    // renderMode: repaintAll | repaintDirty
    if(renderMode === 'repaintDirty') {
      setDeprecation('renderRepaintDirty');
    }
    if(evaluateFPS !== false) {
      setDeprecation('evaluateFPS');
    }

    this.outputContext = context;

    if(context.canvas) context.canvas.layer_ = this;

    this.childNodes = [];
    this.sortedChildNodes = [];
    this[_zOrder] = 0;
    this[_timeline] = new Timeline(timeline);
    this[_renderDeferer] = null;

    this.touchedTargets = {};

    // auto release
    /* istanbul ignore if  */
    if(context.canvas && context.canvas.addEventListener) {
      context.canvas.addEventListener('DOMNodeRemovedFromDocument', () => {
        this._savePlaybackRate = this.timeline.playbackRate;
        this._saveChildren = [...this.childNodes];
        this.remove(...this.childNodes);
        this.timeline.playbackRate = 0;
      });
      context.canvas.addEventListener('DOMNodeInsertedIntoDocument', () => {
        if(this._saveChildren) {
          this.timeline.playbackRate = this._savePlaybackRate;
          this.append(...this._saveChildren);
          delete this._saveChildren;
        }
      });
    }
    if(useDocumentCSS) {
      this.fromDocumentCSS();
    }
  }

  fromDocumentCSS() {
    // stylesheet.fromDocumentCSS();
  }

  get resolution() {
    return [this.canvas.width, this.canvas.height];
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
    return this.childNodes.filter(child => child instanceof BaseSprite);
  }

  get timeline() {
    return this[_timeline];
  }

  get context() {
    return this.outputContext;
  }

  get canvas() {
    return this.outputContext && this.outputContext.canvas;
  }

  get offset() {
    return [0, 0];
  }

  clearContext(context = this.outputContext) {
    if(context.canvas) {
      const {width, height} = context.canvas;
      context.clearRect(0, 0, width, height);
    }
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

  forceUpdate() {
    return this.prepareRender();
  }

  restyle() {
    const bgcolor = this.style.bgcolor;
    super.restyle();
    if(bgcolor) {
      const color = this.attr('bgcolor');
      if(color !== bgcolor && this.canvas && this.canvas.style) {
        this.canvas.style = color;
      }
    }
  }

  draw(clearContext = true) {
    // if(this.__styleNeedUpdate) {
    //   stylesheet.computeStyle(this);
    // }
    super.draw();
    const renderDeferrer = this[_renderDeferer];
    this[_renderDeferer] = null;
    if(this[_drawTask]) {
      cancelAnimationFrame(this[_drawTask]);
      delete this[_drawTask];
    }

    const currentTime = this.timeline.currentTime;
    this.repaint(currentTime, clearContext);

    super.dispatchEvent.call(
      this, 'update',
      {target: this, timeline: this.timeline, renderTime: currentTime}, true, true
    );

    if(renderDeferrer) {
      renderDeferrer.resolve();
    }
  }

  update(target) {
    if(target && target.isDirty) return;
    if(target) {
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

  drawSprites(renderEls, t) {
    cacheContextPool.flush();
    if(this.beforeDrawTransform) {
      this.outputContext.save();
      this.beforeDrawTransform();
    }
    for(let i = 0; i < renderEls.length; i++) {
      const child = renderEls[i],
        isDirty = child.isDirty;
      child.isDirty = false;

      if(child.parent === this) {
        child.draw(t);
        if(isDirty) {
          child.dispatchEvent('update', {target: child, renderTime: t}, true, true);
        }
      }
    }
    if(this.beforeDrawTransform) {
      this.outputContext.restore();
    }
  }

  repaint(t, clearContext = true) {
    const renderEls = this.sortedChildNodes;
    const outputContext = this.outputContext;
    if(clearContext) this.clearContext(outputContext);
    this.drawSprites(renderEls, t);
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

  dispatchEvent(type, evt, collisionState = false, swallow = false, useCapturePhase = null) { // eslint-disable-line complexity
    const handlers = this.getEventHandlers(type);
    if(swallow && handlers.length === 0) {
      return;
    }
    let hasCapturePhase = false;
    if(!swallow && !evt.terminated && type !== 'mouseenter') {
      let isCollision = collisionState || this.pointCollision(evt);
      const identifier = evt.identifier;
      if(identifier != null && (type === 'touchend' || type === 'touchmove')) {
        isCollision = true;
      }
      if(isCollision || type === 'mouseleave') {
        const sprites = this.sortedChildNodes.slice(0).reverse();
        const targetSprites = [];
        if(identifier != null && (type === 'touchend' || type === 'touchmove')) {
          const touches = evt.originalEvent.changedTouches;
          for(let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            if(touch.identifier === identifier) {
              const targets = this.layer.touchedTargets[identifier];
              if(targets) {
                targets.forEach((target) => {
                  if(target !== this && target.layer === this) {
                    const [parentX, parentY] = target.getParentXY(evt.layerX, evt.layerY);
                    const _parent = [evt.parentX, evt.parentY];
                    evt.parentX = parentX;
                    evt.parentY = parentY;
                    target.dispatchEvent(type, evt, true, true, useCapturePhase);
                    [evt.parentX, evt.parentY] = _parent;
                  }
                });
                if(type === 'touchend') delete this.layer.touchedTargets[identifier];
              }
            }
          }
        } else {
          evt.parentX = evt.layerX;
          evt.parentY = evt.layerY;
          if(isCollision && handlers.length && handlers.some(handler => handler.useCapture)) {
            hasCapturePhase = true;
            if(!evt.target) evt.target = this.getTargetFromXY(evt.parentX, evt.parentY);
            super.dispatchEvent(type, evt, isCollision, swallow, true);
          }
          if(!hasCapturePhase || !evt.cancelBubble) {
            for(let i = 0; i < sprites.length; i++) {
              const sprite = sprites[i];
              const hit = sprite.dispatchEvent(type, evt, collisionState, swallow, useCapturePhase);
              if(hit) {
                if(evt.targetSprites) {
                  targetSprites.push(...evt.targetSprites);
                  delete evt.targetSprites;
                }
                // detect mouseenter/mouseleave
                targetSprites.push(sprite);
              }
              if(evt.terminated && type !== 'mousemove') {
                break;
              }
            }
          }
          delete evt.parentX;
          delete evt.parentY;
        }
        evt.targetSprites = targetSprites;
        // stopDispatch can only terminate event in the same level
        evt.terminated = false;
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
    const {layerX, layerY} = evt;
    if(layerX != null && layerY != null) {
      evt.offsetX = layerX + this.offset[0];
      evt.offsetY = layerY + this.offset[1];
    }
    return super.dispatchEvent(type, evt, collisionState, swallow, useCapturePhase);
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
}

Object.assign(Layer.prototype, groupApi);
