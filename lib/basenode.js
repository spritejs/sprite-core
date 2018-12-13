'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _class, _temp;

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _nodetype = require('./nodetype');

var _attr2 = require('./attr');

var _attr3 = _interopRequireDefault(_attr2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _eventHandlers = (0, _symbol2.default)('eventHandlers'),
    _collisionState = (0, _symbol2.default)('collisionState'),
    _data = (0, _symbol2.default)('data'),
    _mouseCapture = (0, _symbol2.default)('mouseCapture');

var _attr = (0, _symbol2.default)('attr'),
    _style = (0, _symbol2.default)('style');

var BaseNode = (_temp = _class = function () {
  function BaseNode(attrs) {
    (0, _classCallCheck3.default)(this, BaseNode);

    this[_eventHandlers] = {};
    this[_data] = {};
    this[_style] = {};
    this[_attr] = new this.constructor.Attr(this);
    if (attrs) {
      this.attr(attrs);
    }
  }

  (0, _createClass3.default)(BaseNode, [{
    key: 'serialize',
    value: function serialize() {
      var nodeType = this.nodeType,
          attrs = this[_attr].serialize(),
          dataset = (0, _stringify2.default)(this.dataset),
          id = this.id;

      return {
        nodeType: nodeType,
        attrs: attrs,
        dataset: dataset,
        id: id
      };
    }
  }, {
    key: 'clearLayout',
    value: function clearLayout() {
      if (this.hasLayout) {
        this.parent.clearLayout();
      }
    }
  }, {
    key: 'merge',
    value: function merge(attrs) {
      this[_attr].merge(attrs);
    }
  }, {
    key: 'cloneNode',
    value: function cloneNode() {
      var node = new this.constructor();
      node.merge(this[_attr].serialize());
      node.data(this.dataset);
      var bgimage = this.attr('bgimage');
      if (bgimage && bgimage.image) {
        node.attr('bgimage', null);
        node.attr('bgimage', (0, _assign2.default)({}, bgimage));
      }
      return node;
    }
  }, {
    key: 'attr',
    value: function attr(props, val) {
      var _this = this;

      var setVal = function setVal(key, value) {
        if (!_this[_attr].__attributeNames.has(key) && !(key in _this[_attr])) {
          (0, _defineProperty2.default)(_this[_attr], key, {
            // enumerable: true,
            configurable: true,
            set: function set(value) {
              var subject = this.subject;
              this.quietSet(key, value);
              // fixed color inherit
              if (key === 'color' && !this.__attributeNames.has('fillColor')) {
                subject.attr('fillColor', value);
              }
              // fixed font inherit
              if ((key === 'fontSize' || key === 'fontFamily' || key === 'fontStyle' || key === 'fontVariant' || key === 'fontWeight') && !this.__attributeNames.has('font')) {
                var font = this.get('font') || 'normal normal normal 16px Arial';
                var parsed = (0, _utils.parseFont)(font);
                parsed.fontSize = parsed.size + parsed.unit;
                if (key === 'fontSize' && (typeof value === 'number' || /[\d.]$/.test(value))) {
                  value += 'px';
                }
                parsed[key] = value;

                var _parseFont = (0, _utils.parseFont)(font),
                    style = _parseFont.style,
                    variant = _parseFont.variant,
                    weight = _parseFont.weight,
                    family = _parseFont.family,
                    fontSize = _parseFont.fontSize;

                subject.attr('font', style + ' ' + variant + ' ' + weight + ' ' + fontSize + ' ' + family);
              }
              if (key === 'font' || key === 'lineHeight' || key === 'lineBreak' || key === 'wordBreak' || key === 'letterSpacing' || key === 'textIndent') {
                var children = subject.querySelectorAll('*');
                children.forEach(function (node) {
                  if (node.retypesetting) node.retypesetting();
                });
              }
              if (_utils.inheritAttributes.has(key)) {
                subject.forceUpdate();
              }
            },
            get: function get() {
              return this.get(key);
            }
          });
        }
        _this[_attr][key] = value;
        // if(stylesheet.relatedAttributes.has(key)) {
        //   this.updateStyles();
        // }
      };
      if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) === 'object') {
        (0, _entries2.default)(props).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
              prop = _ref2[0],
              value = _ref2[1];

          _this.attr(prop, value);
        });
        return this;
      }if (typeof props === 'string') {
        if (val !== undefined) {
          if (props === 'attrs') {
            if (Array.isArray(val)) {
              val = _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(val)));
            }
            (0, _entries2.default)(val).forEach(function (_ref3) {
              var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
                  prop = _ref4[0],
                  value = _ref4[1];

              _this.attr(prop, value);
            });
            return this;
          }
          if (props === 'style') {
            if (Array.isArray(val)) {
              val = _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(val)));
            }
            (0, _entries2.default)(val).forEach(function (_ref5) {
              var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                  prop = _ref6[0],
                  value = _ref6[1];

              _this.style[prop] = value;
            });
            return this;
          }
          if (typeof val === 'function') {
            val = val(this.attr(props));
          }
          if (val && typeof val.then === 'function') {
            return val.then(function (res) {
              setVal(props, res);
            });
          }
          setVal(props, val);
          return this;
        }
        return props in this[_attr] ? this[_attr][props] : this[_attr].get(props);
      }

      return this[_attr].attrs;
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate() {
      var parent = this.parent;
      if (parent) {
        this.parent.update(this);
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      var styleNeedUpdate = this.__styleNeedUpdate;
      if (styleNeedUpdate) {
        _stylesheet2.default.computeStyle(this);
        if (this.querySelectorAll) {
          var children = this.querySelectorAll('*');
          children.forEach(function (child) {
            return _stylesheet2.default.computeStyle(child);
          });
        }
        if (styleNeedUpdate === 'siblings') {
          if (this.parent) {
            var _children = this.parent.children;
            var index = _children.indexOf(this);
            var len = _children.length;
            for (var i = index + 1; i < len; i++) {
              var node = _children[i];
              _stylesheet2.default.computeStyle(node);
              if (node.querySelectorAll) {
                var nodes = node.querySelectorAll('*');
                nodes.forEach(function (child) {
                  return _stylesheet2.default.computeStyle(child);
                });
              }
            }
          }
        }
      }
    }
  }, {
    key: 'data',
    value: function data(props, val) {
      var _this2 = this;

      var setVal = function setVal(key, value) {
        _this2[_data][key] = value;
        if (_this2.attr) {
          var attrKey = 'data-' + key;
          // this.attr(attrKey, value);
          if (_stylesheet2.default.relatedAttributes.has(attrKey)) {
            _this2.updateStyles();
          }
        }
        if (value == null) {
          delete _this2[_data][key];
        }
      };
      if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) === 'object') {
        (0, _entries2.default)(props).forEach(function (_ref7) {
          var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
              prop = _ref8[0],
              value = _ref8[1];

          _this2.data(prop, value);
        });
        return this;
      }if (typeof props === 'string') {
        if (val !== undefined) {
          if (typeof val === 'function') {
            val = val(this[_data][props]);
          }
          if (val && typeof val.then === 'function') {
            return val.then(function (res) {
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
  }, {
    key: 'updateStyles',
    value: function updateStyles() {
      var nextSibling = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // append to parent & reset name or class or id auto updateStyles
      this.__styleNeedUpdate = nextSibling ? 'siblings' : 'children';
      this.forceUpdate();
    }
  }, {
    key: 'getEventHandlers',
    value: function getEventHandlers(type) {
      return type != null ? this[_eventHandlers][type] || [] : this[_eventHandlers];
    }
  }, {
    key: 'on',
    value: function on(type, handler) {
      var _this3 = this;

      if (Array.isArray(type)) {
        type.forEach(function (t) {
          return _this3.on(t, handler);
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
      var _this4 = this;

      if (Array.isArray(type)) {
        type.forEach(function (t) {
          return _this4.once(t, handler);
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
      var _this5 = this;

      if (Array.isArray(type)) {
        type.forEach(function (t) {
          return _this5.off(t, handler);
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
      var _this6 = this;

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
        this.attr('__internal_state_hover_', null);
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
              if (_layer.touchedTargets[identifier] && _layer.touchedTargets[identifier].indexOf(_this6) >= 0) {
                evt.targetTouches.push(touch);
              }
            });
            evt.touches = touches;
            evt.changedTouches = (0, _from2.default)(changedTouches);
          }
        }

        if (type === 'mousedown' || type === 'touchstart') {
          this.attr('__internal_state_active_', 'active');
        } else if (type === 'mouseup' || type === 'touchend') {
          this.attr('__internal_state_active_', null);
        }

        [].concat((0, _toConsumableArray3.default)(handlers)).forEach(function (handler) {
          return handler.call(_this6, evt);
        });

        if (!this[_collisionState] && isCollision && type === 'mousemove') {
          var _evt = (0, _assign2.default)({}, evt);
          _evt.type = 'mouseenter';
          delete _evt.target;
          _evt.terminated = false;
          this.dispatchEvent('mouseenter', _evt, true, true);
          this.attr('__internal_state_hover_', 'hover');
          this[_collisionState] = true;
        }
      }

      if (this[_collisionState] && !isCollision && type === 'mousemove') {
        var _evt2 = (0, _assign2.default)({}, evt);
        _evt2.type = 'mouseleave';
        delete _evt2.target;
        _evt2.terminated = false;
        this.dispatchEvent('mouseleave', _evt2);
        this.attr('__internal_state_hover_', null);
        // this[_collisionState] = false;
      }

      return isCollision;
    }
  }, {
    key: 'getNodeNearBy',
    value: function getNodeNearBy() {
      var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var isElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!this.parent) return null;
      if (distance === 0) return this;
      var children = isElement ? this.parent.children : this.parent.childNodes;
      var idx = children.indexOf(this);
      return children[idx + distance];
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

      parent.dispatchEvent('appendChild', {
        child: this,
        zOrder: zOrder
      }, true, true);

      if (this.layer) {
        this.updateStyles(true);
      }

      return this;
    }

    // override to recycling resources

  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      if (!this.parent || parent !== this.parent) {
        throw new Error('Invalid node to disconnect');
      }

      if (this.layer) {
        var nextSibling = this.nextElementSilbing;
        if (nextSibling) nextSibling.updateStyles(true);
      }

      var zOrder = this.zOrder;
      delete this.zOrder;
      delete this.parent;
      delete this.isDirty;

      this.dispatchEvent('remove', {
        parent: parent,
        zOrder: zOrder
      }, true, true);

      parent.dispatchEvent('removeChild', {
        child: this,
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
    key: 'getAttribute',
    value: function getAttribute(prop) {
      /* istanbul ignore next */
      return this.attr(prop);
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(prop, val) {
      /* istanbul ignore next */
      return this.attr(prop, val);
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(prop) {
      /* istanbul ignore next */
      return this.attr(prop, null);
    }
  }, {
    key: '__attr',
    get: function get() {
      return this[_attr];
    }
  }, {
    key: 'attributes',
    get: function get() {
      if (typeof Proxy === 'function') {
        try {
          return new Proxy(this[_attr], {
            get: function get(target, prop) {
              return prop in target ? target[prop] : target.get(prop);
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
          return this[_attr];
        }
      }
      return this[_attr];
    }
  }, {
    key: 'style',
    get: function get() {
      if (typeof Proxy === 'function') {
        try {
          return new Proxy(this[_attr], {
            get: function get(target, prop) {
              if (prop !== 'id' && prop !== 'name' && prop !== 'class' && target.__attributeNames.has(prop) || _utils.inheritAttributes.has(prop)) {
                return target[prop];
              }
              return target.subject[_style][prop];
            },
            set: function set(target, prop, value) {
              if (prop !== 'id' && prop !== 'name' && prop !== 'class' && target.__attributeNames.has(prop) || _utils.inheritAttributes.has(prop)) {
                target.subject.attr(prop, value);
              } else {
                target.subject[_style][prop] = value;
              }
              return true;
            },
            deleteProperty: function deleteProperty(target, prop) {
              if (prop !== 'id' && prop !== 'name' && prop !== 'class' && target.__attributeNames.has(prop) || _utils.inheritAttributes.has(prop)) {
                target.subject.attr(prop, null);
              } else {
                delete target.subject[_style][prop];
              }
              return true;
            }
          });
        } catch (ex) {
          return this[_attr];
        }
      }
      return this[_attr];
    }
  }, {
    key: 'layer',
    get: function get() {
      return this.parent && this.parent.layer;
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
  }, {
    key: 'nextSibling',
    get: function get() {
      return this.getNodeNearBy(1);
    }
  }, {
    key: 'previousSibling',
    get: function get() {
      return this.getNodeNearBy(-1);
    }
  }, {
    key: 'nextElementSibling',
    get: function get() {
      return this.getNodeNearBy(1, true);
    }
  }, {
    key: 'previousElementSibling',
    get: function get() {
      return this.getNodeNearBy(-1, true);
    }
  }, {
    key: 'id',
    set: function set(val) {
      this.attr('id', val);
    },
    get: function get() {
      return this.attr('id');
    }
  }, {
    key: 'name',
    set: function set(val) {
      this.attr('name', val);
    },
    get: function get() {
      return this.attr('name');
    }
  }, {
    key: 'className',
    set: function set(val) {
      this.attr('class', val);
    },
    get: function get() {
      return this.attr('class');
    }
  }]);
  return BaseNode;
}(), _class.Attr = _attr3.default, _class.inheritAttributes = _utils.inheritAttributes, _temp);
exports.default = BaseNode;


(0, _nodetype.registerNodeType)('node', BaseNode, true);