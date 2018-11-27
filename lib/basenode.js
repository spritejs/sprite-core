'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _symbol2 = require('babel-runtime/core-js/symbol');

var _symbol3 = _interopRequireDefault(_symbol2);

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _eventHandlers = (0, _symbol3.default)('eventHandlers'),
    _collisionState = (0, _symbol3.default)('collisionState'),
    _data = (0, _symbol3.default)('data'),
    _mouseCapture = (0, _symbol3.default)('mouseCapture');

function createGetterSetter(_symbol, attrPrefix) {
  return function (props, val) {
    var _this = this;

    var setVal = function setVal(key, value) {
      _this[_symbol][key] = value;
      if (_this.attr) {
        var attrKey = attrPrefix + '-' + key;
        _this.attr(attrKey, value);
        if (_stylesheet2.default.relatedAttributes.has(attrKey)) {
          _this.updateStyles();
        }
      }
      if (value == null) {
        delete _this[_symbol][key];
      }
    };
    if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) === 'object') {
      (0, _entries2.default)(props).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            prop = _ref2[0],
            value = _ref2[1];

        _this.data(prop, value);
      });
      return this;
    }if (typeof props === 'string') {
      if (val !== undefined) {
        if (typeof val === 'function') {
          val = val(this[_symbol][props]);
        }
        if (val && typeof val.then === 'function') {
          return val.then(function (res) {
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

var BaseNode = function () {
  function BaseNode() {
    (0, _classCallCheck3.default)(this, BaseNode);

    this[_eventHandlers] = {};
    this[_data] = {};
    this.data = createGetterSetter(_data, 'data');
  }

  (0, _createClass3.default)(BaseNode, [{
    key: 'updateStyles',
    value: function updateStyles() {
      // append to parent & reset name or class or id auto updateStyles
      if (this.layer) {
        this.layer.__updateStyleTag = true;
        this.forceUpdate();
      }
    }
  }, {
    key: 'getEventHandlers',
    value: function getEventHandlers(type) {
      return type != null ? this[_eventHandlers][type] || [] : this[_eventHandlers];
    }
  }, {
    key: 'on',
    value: function on(type, handler) {
      var _this2 = this;

      if (Array.isArray(type)) {
        type.forEach(function (t) {
          return _this2.on(t, handler);
        });
      } else {
        this[_eventHandlers][type] = this[_eventHandlers][type] || [];
        this[_eventHandlers][type].push(handler);
      }
      return this;
    }
  }, {
    key: 'once',
    value: function once(type, handler) {
      var _this3 = this;

      if (Array.isArray(type)) {
        type.forEach(function (t) {
          return _this3.once(t, handler);
        });
      } else {
        this.on(type, function f() {
          this.off(type, f);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return handler.apply(this, args);
        });
      }
      return this;
    }
  }, {
    key: 'off',
    value: function off(type, handler) {
      var _this4 = this;

      if (Array.isArray(type)) {
        type.forEach(function (t) {
          return _this4.off(t, handler);
        });
      } else if (handler && this[_eventHandlers][type]) {
        var idx = this[_eventHandlers][type].indexOf(handler);

        if (idx >= 0) {
          this[_eventHandlers][type].splice(idx, 1);
        }
      } else {
        delete this[_eventHandlers][type];
      }
      return this;
    }

    // d3-friendly

  }, {
    key: 'addEventListener',
    value: function addEventListener(type, handler) {
      return this.on(type, handler);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, handler) {
      return this.off(type, handler);
    }
  }, {
    key: 'remove',
    value: function remove() {
      var exit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!this.parent) return null;
      return this.parent.removeChild(this, exit);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      throw Error('you mast override this method');
    }
  }, {
    key: 'setMouseCapture',
    value: function setMouseCapture() {
      this[_mouseCapture] = true;
    }
  }, {
    key: 'releaseMouseCapture',
    value: function releaseMouseCapture() {
      this[_mouseCapture] = false;
    }
  }, {
    key: 'isCaptured',
    value: function isCaptured(evt) {
      return (evt.type === 'mousemove' || evt.type === 'mousedown' || evt.type === 'mouseup') && this[_mouseCapture];
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var _this5 = this;

      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      // eslint-disable-line complexity
      var handlers = this.getEventHandlers(type);
      evt.returnValue = true;
      if (swallow && handlers.length === 0) {
        return;
      }
      if (!evt.stopDispatch) {
        evt.stopDispatch = function () {
          evt.terminated = true;
        };
      }
      if (!evt.stopPropagation) {
        evt.stopPropagation = function () {
          evt.cancelBubble = true;
        };
      }
      if (!evt.preventDefault) {
        evt.preventDefault = function () {
          evt.returnValue = false;
        };
      }
      if (evt.type !== type) {
        if (evt.type) {
          evt.originalType = evt.type;
        }
        evt.type = type;
      }

      var isCollision = collisionState || this.pointCollision(evt);
      var captured = this.isCaptured(evt);

      if (this[_collisionState] && type === 'mouseleave') {
        // dispatched from group
        evt.target = this;
        this[_collisionState] = false;
        isCollision = true;
      }

      if (!evt.terminated && (isCollision || captured)) {
        if (!evt.target) evt.target = this;

        var changedTouches = evt.originalEvent && evt.originalEvent.changedTouches;
        if (changedTouches) {
          if (type === 'touchstart') {
            var touch = changedTouches[0],
                layer = this.layer;
            if (touch && touch.identifier != null) {
              layer.touchedTargets[touch.identifier] = layer.touchedTargets[touch.identifier] || [];
              layer.touchedTargets[touch.identifier].push(this);
            }
          }
          if (/^touch/.test(type)) {
            var touches = (0, _from2.default)(evt.originalEvent.touches),
                _layer = this.layer;
            evt.targetTouches = [];

            touches.forEach(function (touch) {
              var identifier = touch.identifier;
              if (_layer.touchedTargets[identifier] && _layer.touchedTargets[identifier].indexOf(_this5) >= 0) {
                evt.targetTouches.push(touch);
              }
            });
            evt.touches = touches;
            evt.changedTouches = (0, _from2.default)(changedTouches);
          }
        }

        [].concat((0, _toConsumableArray3.default)(handlers)).forEach(function (handler) {
          return handler.call(_this5, evt);
        });

        if (!this[_collisionState] && isCollision && type === 'mousemove') {
          var _evt = (0, _assign2.default)({}, evt);
          _evt.type = 'mouseenter';
          delete _evt.target;
          _evt.terminated = false;
          this.dispatchEvent('mouseenter', _evt, true, true);
          this[_collisionState] = true;
        }
      }

      if (this[_collisionState] && !isCollision && type === 'mousemove') {
        var _evt2 = (0, _assign2.default)({}, evt);
        _evt2.type = 'mouseleave';
        delete _evt2.target;
        _evt2.terminated = false;
        this.dispatchEvent('mouseleave', _evt2);
        // this[_collisionState] = false;
      }

      return isCollision;
    }
  }, {
    key: 'contains',
    value: function contains(node) {
      while (node && this !== node) {
        node = node.parent;
      }
      return !!node;
    }

    // called when layer appendChild

  }, {
    key: 'connect',
    value: function connect(parent) {
      var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.parent) {
        // throw new Error('This node belongs to another parent node! Remove it first...')
        this.remove();
      }

      Object.defineProperty(this, 'zOrder', {
        value: zOrder,
        writable: false,
        configurable: true
      });

      Object.defineProperty(this, 'parent', {
        get: function get() {
          return parent;
        },
        configurable: true
      });

      this.dispatchEvent('append', {
        parent: parent,
        zOrder: zOrder
      }, true, true);

      return this;
    }

    // override to recycling resources

  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      if (!this.parent || parent !== this.parent) {
        throw new Error('Invalid node to disconnect');
      }

      var zOrder = this.zOrder;
      delete this.zOrder;
      delete this.parent;
      delete this.isDirty;

      this.dispatchEvent('remove', {
        parent: parent,
        zOrder: zOrder
      }, true, true);

      return this;
    }
  }, {
    key: 'enter',
    value: function enter() {
      // override to do atction after connection, can return a promise
      return this;
    }
  }, {
    key: 'exit',
    value: function exit() {
      // override to do atction before disconnection, can return a promise
      return this;
    }
  }, {
    key: 'dataset',
    get: function get() {
      return this[_data];
    }
  }, {
    key: 'parentNode',
    get: function get() {
      return this.parent;
    }
  }]);
  return BaseNode;
}();

exports.default = BaseNode;