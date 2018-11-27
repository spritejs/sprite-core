import stylesheet from './stylesheet';

const _eventHandlers = Symbol('eventHandlers'),
  _collisionState = Symbol('collisionState'),
  _data = Symbol('data'),
  _mouseCapture = Symbol('mouseCapture');

function createGetterSetter(_symbol, attrPrefix) {
  return function (props, val) {
    const setVal = (key, value) => {
      this[_symbol][key] = value;
      if(this.attr) {
        const attrKey = `${attrPrefix}-${key}`;
        this.attr(attrKey, value);
        if(stylesheet.relatedAttributes.has(attrKey)) {
          this.updateStyles();
        }
      }
      if(value == null) {
        delete this[_symbol][key];
      }
    };
    if(typeof props === 'object') {
      Object.entries(props).forEach(([prop, value]) => {
        this.data(prop, value);
      });
      return this;
    } if(typeof props === 'string') {
      if(val !== undefined) {
        if(typeof val === 'function') {
          val = val(this[_symbol][props]);
        }
        if(val && typeof val.then === 'function') {
          return val.then((res) => {
            setVal(props, res);
          });
        }
        setVal(props, val);
        return this;
      }
      return this[_symbol][props];
    }
    return this[_symbol];
  };
}

export default class BaseNode {
  constructor() {
    this[_eventHandlers] = {};
    this[_data] = {};
    this.data = createGetterSetter(_data, 'data');
  }

  updateStyles() {
    // append to parent & reset name or class or id auto updateStyles
    if(this.layer) {
      this.layer.__updateStyleTag = true;
      this.forceUpdate();
    }
  }

  get dataset() {
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

  once(type, handler) {
    if(Array.isArray(type)) {
      type.forEach(t => this.once(t, handler));
    } else {
      this.on(type, function f(...args) {
        this.off(type, f);
        return handler.apply(this, args);
      });
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

  remove(exit = true) {
    if(!this.parent) return null;
    return this.parent.removeChild(this, exit);
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

  dispatchEvent(type, evt, collisionState = false, swallow = false) { // eslint-disable-line complexity
    const handlers = this.getEventHandlers(type);
    evt.returnValue = true;
    if(swallow && handlers.length === 0) {
      return;
    }
    if(!evt.stopDispatch) {
      evt.stopDispatch = () => {
        evt.terminated = true;
      };
    }
    if(!evt.stopPropagation) {
      evt.stopPropagation = () => {
        evt.cancelBubble = true;
      };
    }
    if(!evt.preventDefault) {
      evt.preventDefault = () => {
        evt.returnValue = false;
      };
    }
    if(evt.type !== type) {
      if(evt.type) {
        evt.originalType = evt.type;
      }
      evt.type = type;
    }

    let isCollision = collisionState || this.pointCollision(evt);
    const captured = this.isCaptured(evt);

    if(this[_collisionState] && type === 'mouseleave') {
      // dispatched from group
      evt.target = this;
      this[_collisionState] = false;
      isCollision = true;
    }

    if(!evt.terminated && (isCollision || captured)) {
      if(!evt.target) evt.target = this;

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
        if(/^touch/.test(type)) {
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

      [...handlers].forEach(handler => handler.call(this, evt));

      if(!this[_collisionState] && isCollision && type === 'mousemove') {
        const _evt = Object.assign({}, evt);
        _evt.type = 'mouseenter';
        delete _evt.target;
        _evt.terminated = false;
        this.dispatchEvent('mouseenter', _evt, true, true);
        this[_collisionState] = true;
      }
    }

    if(this[_collisionState] && !isCollision && type === 'mousemove') {
      const _evt = Object.assign({}, evt);
      _evt.type = 'mouseleave';
      delete _evt.target;
      _evt.terminated = false;
      this.dispatchEvent('mouseleave', _evt);
      // this[_collisionState] = false;
    }

    return isCollision;
  }

  get parentNode() {
    return this.parent;
  }

  contains(node) {
    while(node && this !== node) {
      node = node.parent;
    }
    return !!node;
  }

  // called when layer appendChild
  connect(parent, zOrder = 0) {
    if(this.parent) {
      // throw new Error('This node belongs to another parent node! Remove it first...')
      this.remove();
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

    this.dispatchEvent('append', {
      parent,
      zOrder,
    }, true, true);

    return this;
  }

  // override to recycling resources
  disconnect(parent) {
    if(!this.parent || parent !== this.parent) {
      throw new Error('Invalid node to disconnect');
    }

    const zOrder = this.zOrder;
    delete this.zOrder;
    delete this.parent;
    delete this.isDirty;

    this.dispatchEvent('remove', {
      parent,
      zOrder,
    }, true, true);

    return this;
  }

  enter() {
    // override to do atction after connection, can return a promise
    return this;
  }

  exit() {
    // override to do atction before disconnection, can return a promise
    return this;
  }
}
