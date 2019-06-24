"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerNodeType = registerNodeType;
exports.createNode = createNode;
exports.createElement = createElement;
exports.isValidNodeType = isValidNodeType;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _selector = require("./selector");

var nodeTypes = new Map();
/* istanbul ignore next  */

var ownerDocumentDescriptor = {
  get: function get() {
    return {
      createElementNS: function createElementNS(uri, name) {
        return createNode(name);
      }
    };
  }
};
var elementProto = {
  getElementById: function getElementById(id) {
    return (0, _selector.querySelector)("#".concat(id), this);
  },
  getElementsByName: function getElementsByName(name) {
    return (0, _selector.querySelectorAll)("[name=\"".concat(name, "\"]"), this);
  },
  getElementsByClassName: function getElementsByClassName(className) {
    return (0, _selector.querySelectorAll)(".".concat(className), this);
  },
  getElementsByTagName: function getElementsByTagName(tagName) {
    return (0, _selector.querySelectorAll)(tagName, this);
  },
  querySelector: function querySelector(selector) {
    return (0, _selector.querySelector)(selector, this);
  },
  querySelectorAll: function querySelectorAll(selector) {
    return (0, _selector.querySelectorAll)(selector, this);
  }
};

function registerNodeType(type, Class) {
  var isQuerable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var nodeType = type.toLowerCase();
  var tagName = type.toUpperCase();
  Object.defineProperty(Class.prototype, 'nodeType', {
    get: function get() {
      return nodeType;
    }
  }); // friendly to snabbdom

  Object.defineProperty(Class.prototype, 'tagName', {
    get: function get() {
      return tagName;
    }
  });
  Object.defineProperty(Class.prototype, 'nodeName', {
    get: function get() {
      return tagName;
    }
  });
  nodeTypes.set(nodeType, Class);

  if (isQuerable && !Class.prototype.ownerDocument) {
    Object.defineProperty(Class.prototype, 'ownerDocument', ownerDocumentDescriptor);
    Class.prototype.namespaceURI = "http://spritejs.org/".concat(type);
    Object.assign(Class.prototype, elementProto);
  }
}

function createNode(type) {
  var Class = getNodeType(type);

  if (Class) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (0, _construct2.default)(Class, args);
  }

  return null;
}

function createElement(type, attrs, content) {
  var Node = typeof type === 'string' ? getNodeType(type) : type;
  if (!Node) return null;
  var sprite = new Node(typeof content === 'string' ? content : undefined);

  if (attrs !== null) {
    sprite.attr(attrs);
  }

  if ((0, _typeof2.default)(content) === 'object' && sprite.append) {
    if (content instanceof Array) {
      sprite.append.apply(sprite, (0, _toConsumableArray2.default)(content));
    } else {
      sprite.append(content);
    }
  }

  return sprite;
}

function getNodeType(type) {
  return nodeTypes.get(type.toLowerCase());
}

function isValidNodeType(type) {
  return !!getNodeType(type);
}