const _eventHandlers = Symbol('eventHandlers'),
  _collisionState = Symbol('collisionState'),
  _data = Symbol('data'),
  _mouseCapture = Symbol('mouseCapture');

export default class BaseNode {
  constructor() {
    this[_eventHandlers] = {};
    this[_data] = {};
  }

  get dataset() {
    return this[_data];
  }

  data(props, val) {
    if(typeof props === 'object') {
      Object.entries(props).forEach(([prop, value]) => {
        this.data(prop, value);
      });
      return this;
    } if(typeof props === 'string') {
      if(val !== undefined) {
        if(typeof val === 'function') {
          val = val(this[_data][props]);
        }
        if(val && typeof val.then === 'function') {
          return val.then((res) => {
            this[_data][props] = res;
          });
        }
        this[_data][props] = val;
        return this;
      }
      return this[_data][props];
    }
    return this[_data];
  }

  getEventHandlers(type) {
    return type != null ? this[_eventHandlers][type] || [] : this[_eventHandlers];
  }

  on(type, handler) {
    if(Array.isArray(type)) {
      type.forEach(t => this.on(t, handler));
    } else {
      this[_eventHandlers][type] = this[_eventHandlers][type] || [];
      this[_eventHandlers][type].push(handler);
    }
    return this;
  }

  off(type, handler) {
    if(Array.isArray(type)) {
      type.forEach(t => this.off(t, handler));
    } else if(handler && this[_eventHandlers][type]) {
      const idx = this[_eventHandlers][type].indexOf(handler);

      if(idx >= 0) {
        this[_eventHandlers][type].splice(idx, 1);
      }
    } else {
      delete this[_eventHandlers][type];
    }
    return this;
  }

  // d3-friendly
  addEventListener(type, handler) {
    return this.on(type, handler);
  }

  removeEventListener(type, handler) {
    return this.off(type, handler);
  }

  pointCollision(evt) {
    throw Error('you mast override this method');
  }

  setMouseCapture() {
    this[_mouseCapture] = true;
  }

  releaseMouseCapture() {
    this[_mouseCapture] = false;
  }

  isCaptured(evt) {
    return (evt.type === 'mousemove' || evt.type === 'mousedown' || evt.type === 'mouseup') && this[_mouseCapture];
  }

  dispatchEvent(type, evt, collisionState = false, swallow = false) {
    const handlers = this.getEventHandlers(type);
    if(swallow && handlers.length === 0) {
      return;
    }
    if(!evt.stopDispatch) {
      evt.stopDispatch = () => {
        evt.terminated = true;
      };
    }
    if(evt.type !== type) {
      if(evt.type) {
        evt.originalType = evt.type;
      }
      evt.type = type;
    }

    const isCollision = collisionState || this.pointCollision(evt);
    const captured = this.isCaptured(evt);

    if(!evt.terminated && (isCollision || captured)) {
      evt.target = this;

      const changedTouches = evt.originalEvent && evt.originalEvent.changedTouches;
      if(changedTouches) {
        if(type === 'touchstart') {
          const touch = changedTouches[0],
            layer = this.layer;
          if(touch && touch.identifier != null) {
            layer.touchedTargets[touch.identifier] = layer.touchedTargets[touch.identifier] || [];
            layer.touchedTargets[touch.identifier].push(this);
          }
        }
        if(type.startsWith('touch')) {
          const touches = Array.from(evt.originalEvent.touches),
            layer = this.layer;
          evt.targetTouches = [];

          touches.forEach((touch) => {
            const identifier = touch.identifier;
            if(layer.touchedTargets[identifier] && layer.touchedTargets[identifier].indexOf(this) >= 0) {
              evt.targetTouches.push(touch);
            }
          });
          evt.touches = touches;
          evt.changedTouches = Array.from(changedTouches);
        }
      }

      handlers.forEach(handler => handler.call(this, evt));

      if(!this[_collisionState] && isCollision && type === 'mousemove') {
        const _evt = Object.assign({}, evt);
        _evt.type = 'mouseenter';
        _evt.terminated = false;
        this.dispatchEvent('mouseenter', _evt, true);
        this[_collisionState] = true;
      }
    }

    if(this[_collisionState] && !isCollision && type === 'mousemove') {
      const _evt = Object.assign({}, evt);
      _evt.type = 'mouseleave';
      _evt.target = this;
      _evt.terminated = false;
      this.dispatchEvent('mouseleave', _evt, true);
      this[_collisionState] = false;
    }

    return isCollision;
  }

  get parentNode() {
    return this.parent;
  }

  // called when layer appendChild
  connect(parent, zOrder = 0) {
    if(this.parent) {
      // throw new Error('This node belongs to another parent node! Remove it first...')
      this.disconnect(this.parent);
    }

    Object.defineProperty(this, 'zOrder', {
      value: zOrder,
      writable: false,
      configurable: true,
    });

    Object.defineProperty(this, 'parent', {
      get: () => parent,
      configurable: true,
    });

    const handlers = this[_eventHandlers].append;
    if(handlers && handlers.length) {
      this.dispatchEvent('append', {
        parent,
        zOrder,
      }, true, true);
    }

    return this;
  }

  // override to recycling resources
  disconnect(parent) {
    if(!this.parent || parent !== this.parent) {
      throw new Error('Invalid node to disconnect');
    }

    const zOrder = this.zOrder;
    delete this.zOrder;

    const handlers = this[_eventHandlers].remove;
    if(handlers && handlers.length) {
      this.dispatchEvent('remove', {
        parent,
        zOrder,
      }, true, true);
    }

    delete this.parent;
    delete this.isDirty;

    return this;
  }
}
