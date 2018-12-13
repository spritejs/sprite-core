import {querySelector, querySelectorAll} from './selector';
import {registerNodeType, createNode, createElement, isValidNodeType} from './nodetype';
import BaseNode from '../../basenode';
import BaseSprite from '../../basesprite';
import Sprite from '../../sprite';
import Label from '../../label';
import Path from '../../path';
import Group from '../../group';
import Layer from '../../layer';

registerNodeType('node', BaseNode);
registerNodeType('basesprite', BaseSprite);
registerNodeType('sprite', Sprite);
registerNodeType('label', Label);
registerNodeType('path', Path);
registerNodeType('group', Group, true);
registerNodeType('layer', Layer, true);

Object.defineProperties(BaseNode.prototype, {
  attributes: {
    get() {
      if(typeof Proxy === 'function') {
        try {
          return new Proxy(this.__attr, {
            get(target, prop) {
              return prop in target ? target[prop] : target.get(prop);
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
          return this.__attr;
        }
      }
      return this.__attr;
    },
  },
  style: {
    get() {
      if(typeof Proxy === 'function') {
        try {
          return new Proxy(this.__attr, {
            get(target, prop) {
              if(prop !== 'id' && prop !== 'name' && prop !== 'class') {
                return target[prop];
              }
              return null;
            },
            set(target, prop, value) {
              if(prop !== 'id' && prop !== 'name' && prop !== 'class') {
                target.subject.attr(prop, value);
              }
              return true;
            },
            deleteProperty(target, prop) {
              if(prop !== 'id' && prop !== 'name' && prop !== 'class') {
                target.subject.attr(prop, null);
                return true;
              }
              return false;
            },
          });
        } catch (ex) {
          return this.__attr;
        }
      }
      return this.__attr;
    },
  },
  parentNode: {
    get() {
      return this.parent;
    },
  },
  nextSibling: {
    get() {
      return this.getNodeNearBy(1);
    },
  },
  previousSibling: {
    get() {
      return this.getNodeNearBy(-1);
    },
  },
  nextElementSibling: {
    get() {
      return this.getNodeNearBy(1, true);
    },
  },
  previousElementSibling: {
    get() {
      return this.getNodeNearBy(-1, true);
    },
  },
});

Object.assign(BaseNode.prototype, {
  addEventListener(type, handler) {
    return this.on(type, handler);
  },
  removeEventListener(type, handler) {
    return this.off(type, handler);
  },
  getNodeNearBy(distance = 1, isElement = false) {
    if(!this.parent) return null;
    if(distance === 0) return this;
    const children = isElement ? this.parent.children : this.parent.childNodes;
    const idx = children.indexOf(this);
    return children[idx + distance];
  },
  getAttribute(prop) {
    /* istanbul ignore next */
    return this.attr(prop);
  },
  setAttribute(prop, val) {
    /* istanbul ignore next */
    return this.attr(prop, val);
  },
  removeAttribute(prop) {
    /* istanbul ignore next */
    return this.attr(prop, null);
  },
  contains(node) {
    while(node && this !== node) {
      node = node.parent;
    }
    return !!node;
  },
});

export {
  querySelector,
  querySelectorAll,
  registerNodeType,
  createNode,
  createElement,
  isValidNodeType,
};
