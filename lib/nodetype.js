'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.registerNodeType = registerNodeType;
exports.createNode = createNode;
exports.createElement = createElement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeTypes = new _map2.default();

/* istanbul ignore next  */
var ownerDocumentDescriptor = {
  get: function get() {
    var that = this;
    return {
      createElementNS: function createElementNS(uri, name) {
        var sprite = createNode(name);
        if (sprite) {
          return that.appendChild(sprite);
        }
        return null;
      }
    };
  }
};

function getAllSubNodes(parent) {
  var children = parent.children;
  return children.reduce(function (list, child) {
    if (child.children) {
      return [].concat((0, _toConsumableArray3.default)(list), [child], (0, _toConsumableArray3.default)(getAllSubNodes(child)));
    }
    return [].concat((0, _toConsumableArray3.default)(list), [child]);
  }, []);
}

function querySelectorLimits(node, functor) {
  var limits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

  var nodeList = [];
  var elements = getAllSubNodes(node);
  for (var i = 0; i < elements.length; i++) {
    var _node = elements[i];
    if (functor(_node)) {
      nodeList.push(_node);
      if (limits === nodeList.length) {
        break;
      }
    }
  }
  return nodeList;
}

var elementProto = {
  getElementById: function getElementById(id) {
    var children = getAllSubNodes(this);
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child.id === id) {
        return child;
      }
    }
    return null;
  },
  getElementsByName: function getElementsByName(name) {
    return getAllSubNodes(this).filter(function (c) {
      return c.name === name;
    });
  },

  /*
    d3-friendly
    *, nodeType, #id, :name, {nodeType: checker}
  */
  querySelector: function querySelector(selector) {
    var _this = this;

    var ret = null;

    if (!selector || selector === '*') {
      ret = this.children[0];
    } else if (typeof selector === 'string') {
      // querySelector('nodeType')
      // querySelector('#id')
      // querySelector(':name')
      if (selector.startsWith('#')) {
        ret = this.getElementById(selector.slice(1));
      } else if (selector.startsWith(':')) {
        var name = selector.slice(1);
        var nodeList = querySelectorLimits(this, function (c) {
          return c.name === name;
        }, 1);
        if (nodeList.length) ret = nodeList[0];
      } else {
        var nodeType = getNodeType(selector);
        if (nodeType) {
          var _nodeList = querySelectorLimits(this, function (c) {
            return c instanceof nodeType;
          }, 1);
          if (_nodeList.length) ret = _nodeList[0];
        }
      }
    } else {
      /*
        {
          nodeType: () => {...},   //checker
        }
      */
      var _nodeList2 = querySelectorLimits(this, function (child) {
        return (0, _entries2.default)(selector).some(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
              type = _ref2[0],
              checker = _ref2[1];

          var nodeType = getNodeType(type);
          return nodeType && child instanceof nodeType && checker.call(_this, child);
        });
      }, 1);
      if (_nodeList2.length) ret = _nodeList2[0];
    }
    return ret;
  },
  querySelectorAll: function querySelectorAll(selector) {
    var _this2 = this;

    var ret = [];

    if (!selector || selector === '*') {
      ret = getAllSubNodes(this);
    } else if (typeof selector === 'string') {
      if (selector.startsWith('#')) {
        var sprite = this.getElementById(selector.slice(1));
        ret = sprite ? [sprite] : [];
      }
      if (selector.startsWith(':')) {
        ret = this.getElementsByName(selector.slice(1));
      }
      var nodeType = getNodeType(selector);
      if (nodeType) {
        ret = querySelectorLimits(this, function (c) {
          return c instanceof nodeType;
        });
      }
    } else {
      ret = querySelectorLimits(this, function (child) {
        return (0, _entries2.default)(selector).some(function (_ref3) {
          var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
              type = _ref4[0],
              checker = _ref4[1];

          var nodeType = getNodeType(type);
          if (!nodeType || !(child instanceof nodeType)) {
            return false;
          }
          return checker.call(_this2, child);
        });
      });
    }
    return ret;
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
  });
  // friendly to snabbdom
  Object.defineProperty(Class.prototype, 'tagName', {
    get: function get() {
      return tagName;
    }
  });
  nodeTypes.set(nodeType, Class);
  if (isQuerable && !Class.prototype.ownerDocument) {
    Object.defineProperty(Class.prototype, 'ownerDocument', ownerDocumentDescriptor);
    Class.prototype.namespaceURI = 'http://spritejs.org/' + type;
    (0, _assign2.default)(Class.prototype, elementProto);
  }
}

function createNode(type) {
  var Class = getNodeType(type);
  if (Class) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Class, [null].concat(args)))();
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

  if ((typeof content === 'undefined' ? 'undefined' : (0, _typeof3.default)(content)) === 'object' && sprite.append) {
    if (content instanceof Array) {
      sprite.append.apply(sprite, (0, _toConsumableArray3.default)(content));
    } else {
      sprite.append(content);
    }
  }
  return sprite;
}

function getNodeType(type) {
  return nodeTypes.get(type.toLowerCase());
}