"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "querySelector", {
  enumerable: true,
  get: function get() {
    return _selector.querySelector;
  }
});
Object.defineProperty(exports, "querySelectorAll", {
  enumerable: true,
  get: function get() {
    return _selector.querySelectorAll;
  }
});
Object.defineProperty(exports, "registerNodeType", {
  enumerable: true,
  get: function get() {
    return _nodetype.registerNodeType;
  }
});
Object.defineProperty(exports, "createNode", {
  enumerable: true,
  get: function get() {
    return _nodetype.createNode;
  }
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function get() {
    return _nodetype.createElement;
  }
});
Object.defineProperty(exports, "isValidNodeType", {
  enumerable: true,
  get: function get() {
    return _nodetype.isValidNodeType;
  }
});

var _selector = require("./selector");

var _nodetype = require("./nodetype");

var _basenode = _interopRequireDefault(require("../../core/basenode"));

var _basesprite = _interopRequireDefault(require("../../core/basesprite"));

var _sprite = _interopRequireDefault(require("../../core/sprite"));

var _label = _interopRequireDefault(require("../../core/label"));

var _path = _interopRequireDefault(require("../../core/path"));

var _group = _interopRequireDefault(require("../../core/group"));

var _layer = _interopRequireDefault(require("../../core/layer"));

(0, _nodetype.registerNodeType)('node', _basenode.default);
(0, _nodetype.registerNodeType)('basesprite', _basesprite.default);
(0, _nodetype.registerNodeType)('sprite', _sprite.default);
(0, _nodetype.registerNodeType)('label', _label.default);
(0, _nodetype.registerNodeType)('path', _path.default);
(0, _nodetype.registerNodeType)('group', _group.default, true);
(0, _nodetype.registerNodeType)('layer', _layer.default, true);
Object.defineProperties(_basenode.default.prototype, {
  attributes: {
    get: function get() {
      if (typeof Proxy === 'function') {
        try {
          return new Proxy(this.__attr, {
            get: function get(target, prop) {
              if (prop in target) return target[prop];
              return target.subject.attr(prop);
            },
            set: function set(target, prop, value) {
              if (typeof prop !== 'string' || /^__/.test(prop)) target[prop] = value;else target.subject.attr(prop, value);
              return true;
            },
            deleteProperty: function deleteProperty(target, prop) {
              if (typeof prop !== 'string' || /^__/.test(prop)) delete target[prop];else target.subject.attr(prop, null);
              return true;
            }
          });
        } catch (ex) {
          return this.__attr;
        }
      }

      return this.__attr;
    }
  },
  style: {
    get: function get() {
      if (typeof Proxy === 'function') {
        try {
          return new Proxy(this.__attr, {
            get: function get(target, prop) {
              if (prop !== 'id' && prop !== 'name' && prop !== 'class') {
                return target[prop];
              }

              return null;
            },
            set: function set(target, prop, value) {
              if (prop !== 'id' && prop !== 'name' && prop !== 'class') {
                target.subject.attr(prop, value);
              }

              return true;
            },
            deleteProperty: function deleteProperty(target, prop) {
              if (prop !== 'id' && prop !== 'name' && prop !== 'class') {
                target.subject.attr(prop, null);
                return true;
              }

              return false;
            }
          });
        } catch (ex) {
          return this.__attr;
        }
      }

      return this.__attr;
    }
  },
  parentNode: {
    get: function get() {
      return this.parent;
    }
  },
  nextSibling: {
    get: function get() {
      return this.getNodeNearBy(1);
    }
  },
  previousSibling: {
    get: function get() {
      return this.getNodeNearBy(-1);
    }
  },
  nextElementSibling: {
    get: function get() {
      return this.getNodeNearBy(1, true);
    }
  },
  previousElementSibling: {
    get: function get() {
      return this.getNodeNearBy(-1, true);
    }
  }
});
Object.assign(_basenode.default.prototype, {
  addEventListener: function addEventListener(type, handler) {
    return this.on(type, handler);
  },
  removeEventListener: function removeEventListener(type, handler) {
    return this.off(type, handler);
  },
  getNodeNearBy: function getNodeNearBy() {
    var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var isElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!this.parent) return null;
    if (distance === 0) return this;
    var children = isElement ? this.parent.children : this.parent.childNodes;
    var idx = children.indexOf(this);
    return children[idx + distance];
  },
  getAttribute: function getAttribute(prop) {
    /* istanbul ignore next */
    return this.attr(prop);
  },
  setAttribute: function setAttribute(prop, val) {
    /* istanbul ignore next */
    return this.attr(prop, val);
  },
  removeAttribute: function removeAttribute(prop) {
    /* istanbul ignore next */
    return this.attr(prop, null);
  },
  contains: function contains(node) {
    while (node && this !== node) {
      node = node.parent;
    }

    return !!node;
  }
});