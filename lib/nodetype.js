'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.registerNodeType = registerNodeType;
exports.createNode = createNode;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeTypes = new _map2.default();

function registerNodeType(type, Class) {
  var isQuerable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  Object.defineProperty(Class.prototype, 'nodeType', {
    get: function get() {
      return type;
    }
  });
  nodeTypes.set(type, Class);
  if (isQuerable && !Class.prototype.ownerDocument) {
    Object.defineProperty(Class.prototype, 'ownerDocument', {
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
    });
    (0, _assign2.default)(Class.prototype, {
      namespaceURI: 'http://spritejs.org/' + type,
      getElementById: function getElementById(id) {
        var children = this.children;
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.id === id) {
            return child;
          }
        }
        return null;
      },
      getElementsByName: function getElementsByName(name) {
        return this.children.filter(function (c) {
          return c.name === name;
        });
      },

      /*
        d3-friendly
        *, nodeType, checker
      */
      querySelector: function querySelector(selector) {
        var children = this.children;

        if (!selector || selector === '*') {
          return children[0];
        } else if (typeof selector === 'string') {
          // querySelector('nodeType')
          // querySelector('#id')
          // querySelector(':name')

          if (selector.startsWith('#')) {
            return this.getElementById(selector.slice(1));
          }
          if (selector.startsWith(':')) {
            var name = selector.slice(1);

            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              if (child.name === name) {
                return child;
              }
            }
            return null;
          }
          var nodeType = getNodeType(selector);
          if (nodeType) {
            for (var _i = 0; _i < children.length; _i++) {
              var _child = children[_i];
              if (_child instanceof nodeType) {
                return _child;
              }
            }
            return null;
          }
          return null;
        }
        for (var _i2 = 0; _i2 < children.length; _i2++) {
          var _child2 = children[_i2];
          var sel = (0, _entries2.default)(selector);
          for (var j = 0; j < sel.length; j++) {
            var _sel$j = (0, _slicedToArray3.default)(sel[j], 2),
                _type = _sel$j[0],
                checker = _sel$j[1];

            var _nodeType = getNodeType(_type);
            if (_nodeType && _child2 instanceof _nodeType && checker.call(this, _child2)) {
              return _child2;
            }
          }
        }
        return null;
      },
      querySelectorAll: function querySelectorAll(selector) {
        var _this = this;

        if (!selector || selector === '*') {
          return this.children;
        } else if (typeof selector === 'string') {
          if (selector.startsWith('#')) {
            var sprite = this.getElementById(selector.slice(1));
            return sprite ? [sprite] : [];
          }
          if (selector.startsWith(':')) {
            return this.getElementsByName(selector.slice(1));
          }
          var nodeType = getNodeType(selector);
          if (nodeType) {
            return this.children.filter(function (child) {
              return child instanceof nodeType;
            });
          }
          return null;
        }
        return this.children.filter(function (child) {
          var sel = (0, _entries2.default)(selector);
          for (var i = 0; i < sel.length; i++) {
            var _sel$i = (0, _slicedToArray3.default)(sel[i], 2),
                _type2 = _sel$i[0],
                checker = _sel$i[1];

            var _nodeType2 = getNodeType(_type2);
            if (!_nodeType2 || !(child instanceof _nodeType2)) {
              return false;
            }
            if (!checker.call(_this, child)) {
              return false;
            }
          }
          return true;
        });
      }
    });
  }
}

function createNode(type) {
  var Class = nodeTypes.get(type);
  if (Class) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Class, [null].concat(args)))();
  }
  return null;
}

function getNodeType(type) {
  return nodeTypes.get(type);
}