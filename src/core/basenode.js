// import stylesheet from './stylesheet';
import NodeAttr from './attr';
import {inheritAttributes, parseFont} from '../utils';

function createAttribute(attr, key) {
  Object.defineProperty(attr, key, {
    enumerable: false,
    configurable: true,
    set(value) {
      if(!this.__styleTag && value != null) {
        this.__attributesSet.add(key);
      }
      if(!this.__styleTag && value == null) {
        if(this.__attributesSet.has(key)) {
          this.__attributesSet.delete(key);
        }
      }

      this.quietSet(key, value);
      const subject = this.subject;
      // fixed color inherit
      // if(key === 'color') {
      //   subject.attr('fillColor', value);
      // }
      // fixed font inherit
      if(key === 'fontSize'
        || key === 'fontFamily'
        || key === 'fontStyle'
        || key === 'fontVariant'
        || key === 'fontWeight') {
        const font = this.get('font') || 'normal normal normal 16px Arial';
        const parsed = parseFont(font);
        parsed.fontSize = parsed.size + parsed.unit;
        if(key === 'fontSize' && (typeof value === 'number' || /[\d.]$/.test(value))) {
          value += 'px';
        }
        parsed[key] = value;
        const {style, variant, weight, family, fontSize} = parsed;
        subject.attr('font', `${style} ${variant} ${weight} ${fontSize} ${family}`);
      }
      if((key === 'font'
        || key === 'lineHeight'
        || key === 'lineBreak'
        || key === 'wordBreak'
        || key === 'letterSpacing'
        || key === 'textIndent')
        && subject.querySelectorAll) {
        const children = subject.querySelectorAll('*');
        children.forEach((node) => {
          if(node.retypesetting) node.retypesetting();
        });
      }
      if(inheritAttributes.has(key)) {
        subject.forceUpdate();
      }
    },
    get() {
      const ret = this.get(key);
      return ret != null ? ret : this.getDefaultValue(key);
    },
  });
}

const _eventHandlers = Symbol('eventHandlers'),
  _collisionState = Symbol('collisionState'),
  _data = Symbol('data'),
  _mouseCapture = Symbol('mouseCapture');

const _attr = Symbol('attr');

export default class BaseNode {
  static Attr = NodeAttr;

  static inheritAttributes = inheritAttributes;

  constructor(attrs) {
    this[_eventHandlers] = {};
    this[_data] = {};
    this[_attr] = new this.constructor.Attr(this);
    if(attrs) {
      this.attr(attrs);
    }
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

  clearLayout() {
    if(this.hasLayout) {
      this.parent.clearLayout();
    }
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

  attr(props, val) {
    const setVal = (key, value) => {
      if(!(key in this[_attr])) {
        createAttribute(this[_attr], key);
      }
      this[_attr][key] = value;
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
          val = val(this.attr(props));
        }
        if(val && typeof val.then === 'function') {
          return val.then((res) => {
            setVal(props, res);
          });
        }
        setVal(props, val);
        return this;
      }
      if(!(props in this[_attr])) {
        createAttribute(this[_attr], props);
      }
      return this[_attr][props];
    }

    return this[_attr].attrs;
  }

  get __attr() {
    return this[_attr];
  }

  forceUpdate(clearCache) {
    const parent = this.parent;
    if(parent) {
      this.parent.update(this);
    }
  }

  restyle() {
    // stylesheet.computeStyle(this);
  }

  draw() {
    const styleNeedUpdate = this.__styleNeedUpdate;
    if(styleNeedUpdate) {
      this.restyle();
      if(this.querySelectorAll) {
        const children = this.querySelectorAll('*');
        children.forEach(child => child.restyle());
      }
      if(styleNeedUpdate === 'siblings') {
        if(this.parent) {
          const children = this.parent.children;
          const index = children.indexOf(this);
          const len = children.length;
          for(let i = index + 1; i < len; i++) {
            const node = children[i];
            node.restyle();
            if(node.querySelectorAll) {
              const nodes = node.querySelectorAll('*');
              nodes.forEach(child => child.restyle());
            }
          }
        }
      }
    }
  }

  get layer() {
    return this.parent && this.parent.layer;
  }

  data(props, val) {
    const setVal = (key, value) => {
      this[_data][key] = value;
      if(this.attr) {
        const attrKey = `data-${key}`;
        // this.attr(attrKey, value);
        if(NodeAttr.relatedAttributes.has(attrKey)) {
          this.updateStyles();
        }
      }
      if(value == null) {
        delete this[_data][key];
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
          val = val(this[_data][props]);
        }
        if(val && typeof val.then === 'function') {
          return val.then((res) => {
            setVal(props, res);
          });
        }
        setVal(props, val);
        return this;
      }
      return this[_data][props];
    }
    return this[_data];
  }

  updateStyles(nextSibling = false) {
    // append to parent & reset name or class or id auto updateStyles
    this.__styleNeedUpdate = nextSibling ? 'siblings' : 'children';
    this.forceUpdate(true);
  }

  get dataset() {
    return this[_data];
  }

  getEventHandlers(type) {
    return type != null ? this[_eventHandlers][type] || [] : this[_eventHandlers];
  }

  on(type, handler, useCapture = false) {
    if(Array.isArray(type)) {
      type.forEach(t => this.on(t, handler));
    } else {
      this[_eventHandlers][type] = this[_eventHandlers][type] || [];
      this[_eventHandlers][type].push({handler, useCapture});
    }
    return this;
  }

  once(type, handler, useCapture = false) {
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
      const handlers = this[_eventHandlers][type];
      if(handlers) {
        for(let i = 0; i < handlers.length; i++) {
          const {handler: _handler} = handlers[i];
          if(_handler === handler) {
            this[_eventHandlers][type].splice(i, 1);
            break;
          }
        }
      }
    } else {
      delete this[_eventHandlers][type];
    }
    return this;
  }

  remove(exit = true) {
    if(!this.parent) return null;
    return this.parent.removeChild(this, exit);
  }

  pointCollision(evt) {
    throw Error('you must override this method');
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

  dispatchEvent(type, evt, collisionState = false, swallow = false, useCapturePhase = null) { // eslint-disable-line complexity
    let handlers = this.getEventHandlers(type);
    if(this.children && useCapturePhase === true) handlers = handlers.filter(handler => handler.useCapture);
    if(this.children && useCapturePhase === false) handlers = handlers.filter(handler => !handler.useCapture);
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
      this.attr('__internal_state_hover_', null);
    }

    if(!evt.terminated && (isCollision || captured)) {
      if(!evt.target) evt.target = this;
      const identifier = evt.identifier;
      if(identifier != null) {
        if(type === 'touchstart') {
          const layer = this.layer;
          layer.touchedTargets[identifier] = layer.touchedTargets[identifier] || [];
          layer.touchedTargets[identifier].push(this);
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
        }
      }

      if(type === 'mousedown' || type === 'touchstart') {
        this.attr('__internal_state_active_', 'active');
      } else if(type === 'mouseup' || type === 'touchend') {
        this.attr('__internal_state_active_', null);
      }

      [...handlers].forEach(handler => handler.handler.call(this, evt));

      if(!this[_collisionState] && isCollision && type === 'mousemove') {
        const _evt = Object.assign({}, evt);
        _evt.type = 'mouseenter';
        delete _evt.target;
        _evt.terminated = false;
        this.dispatchEvent('mouseenter', _evt, true, true);
        this.attr('__internal_state_hover_', 'hover');
        this[_collisionState] = true;
      }
    }

    if(this[_collisionState] && !isCollision && type === 'mousemove') {
      const _evt = Object.assign({}, evt);
      _evt.type = 'mouseleave';
      delete _evt.target;
      _evt.terminated = false;
      this.dispatchEvent('mouseleave', _evt);
      this.attr('__internal_state_hover_', null);
      // this[_collisionState] = false;
    }

    return isCollision;
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

    parent.dispatchEvent('appendChild', {
      child: this,
      zOrder,
    }, true, true);

    if(this.layer) {
      this.updateStyles(true);
    }

    return this;
  }

  // override to recycling resources
  disconnect(parent) {
    if(!this.parent || parent !== this.parent) {
      throw new Error('Invalid node to disconnect');
    }

    if(this.layer) {
      const nextSibling = this.nextElementSilbing;
      if(nextSibling) nextSibling.updateStyles(true);
    }

    const zOrder = this.zOrder;
    delete this.zOrder;
    delete this.parent;
    delete this.isDirty;

    this.dispatchEvent('remove', {
      parent,
      zOrder,
    }, true, true);

    parent.dispatchEvent('removeChild', {
      child: this,
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
}
