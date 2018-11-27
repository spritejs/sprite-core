'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty4 = require('babel-runtime/core-js/object/define-property');

var _defineProperty5 = _interopRequireDefault(_defineProperty4);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _desc, _value, _class, _class2, _temp;

var _spriteMath = require('sprite-math');

var _spriteAnimator = require('sprite-animator');

var _utils = require('./utils');

var _attr20 = require('./attr');

var _attr21 = _interopRequireDefault(_attr20);

var _basenode = require('./basenode');

var _basenode2 = _interopRequireDefault(_basenode);

var _animation2 = require('./animation');

var _animation3 = _interopRequireDefault(_animation2);

var _nodetype = require('./nodetype');

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _render = require('./helpers/render');

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = require('babel-decorators-runtime');

var _attr = (0, _symbol2.default)('attr'),
    _animations = (0, _symbol2.default)('animations'),
    _cachePriority = (0, _symbol2.default)('cachePriority'),
    _effects = (0, _symbol2.default)('effects'),
    _flow = (0, _symbol2.default)('flow'),
    _changeStateAction = (0, _symbol2.default)('changeStateAction'),
    _resolveState = (0, _symbol2.default)('resolveState'),
    _show = (0, _symbol2.default)('show'),
    _hide = (0, _symbol2.default)('hide'),
    _enter = (0, _symbol2.default)('enter'),
    _releaseKeys = (0, _symbol2.default)('releaseKeys'),
    _style = (0, _symbol2.default)('style');

var CACHE_PRIORITY_THRESHOLDS = 0; // disable cache_priority, for canvas drawing bug...

var BaseSprite = (_dec = (0, _utils.deprecate)('Instead use sprite.cache = null'), (_class = (_temp = _class2 = function (_BaseNode) {
  (0, _inherits3.default)(BaseSprite, _BaseNode);

  /**
    new Sprite({
      attr: {
        ...
      }
    })
   */
  function BaseSprite(attr) {
    (0, _classCallCheck3.default)(this, BaseSprite);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BaseSprite.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite)).call(this));

    _this[_attr] = new _this.constructor.Attr(_this);
    _this[_animations] = new _set2.default();
    _this[_cachePriority] = 0;
    _this[_flow] = {};
    _this[_releaseKeys] = new _set2.default();
    _this[_style] = {};

    if (attr) {
      _this.attr(attr);
    }
    return _this;
  }

  (0, _createClass3.default)(BaseSprite, [{
    key: 'setReleaseKey',
    value: function setReleaseKey(key) {
      this[_releaseKeys].add(key);
    }
  }, {
    key: 'reflow',
    value: function reflow() {
      this[_flow] = {};
      // let parent = this.parent
      // while(parent) {
      //   if(parent.reflow) parent.reflow()
      //   parent = parent.parent
      // }
    }
  }, {
    key: 'flow',
    value: function flow(prop, value) {
      if (value === undefined) {
        return this[_flow][prop];
      }
      this[_flow][prop] = value;
    }
  }, {
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
    key: 'attr',
    value: function attr(props, val) {
      var _this2 = this;

      var setVal = function setVal(key, value) {
        if (!_this2[_attr].__attributeNames.has(key) && !(key in _this2[_attr])) {
          (0, _defineProperty5.default)(_this2[_attr], key, {
            // enumerable: true,
            configurable: true,
            set: function set(value) {
              var subject = this.subject;
              var owner = subject.__owner || subject;
              this.quietSet(key, value);
              // fixed color inherit
              if (key === 'color' && !this.__attributeNames.has('fillColor')) {
                subject.attr('fillColor', value);
              }
              // fixed font inherit
              if ((key === 'fontSize' || key === 'fontFamily' || key === 'fontStyle' || key === 'fontVariant' || key === 'fontWeight') && !this.__attributeNames.has('font')) {
                var parseFont = require('./helpers/parse-font');
                var font = this.get('font') || 'normal normal normal 16px Arial';
                var parsed = parseFont(font);
                parsed.fontSize = parsed.size + parsed.unit;
                if (key === 'fontSize' && (typeof value === 'number' || /[\d.]$/.test(value))) {
                  value += 'px';
                }
                parsed[key] = value;

                var _parseFont = parseFont(font),
                    style = _parseFont.style,
                    variant = _parseFont.variant,
                    weight = _parseFont.weight,
                    family = _parseFont.family,
                    fontSize = _parseFont.fontSize;

                subject.attr('font', style + ' ' + variant + ' ' + weight + ' ' + fontSize + ' ' + family);
              }
              if (key === 'font' || key === 'lineHeight' || key === 'lineBreak' || key === 'wordBreak' || key === 'letterSpacing' || key === 'textIndent') {
                var children = owner.querySelectorAll('*');
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
        _this2[_attr][key] = value;
        if (_stylesheet2.default.relatedAttributes.has(key)) {
          _this2.updateStyles();
        }
      };
      if ((typeof props === 'undefined' ? 'undefined' : (0, _typeof3.default)(props)) === 'object') {
        (0, _entries2.default)(props).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
              prop = _ref2[0],
              value = _ref2[1];

          _this2.attr(prop, value);
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

              _this2.attr(prop, value);
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

              _this2.style[prop] = value;
            });
            return this;
          }
          if (typeof val === 'function') {
            val = val(this[_attr][props]);
          }
          if (val && typeof val.then === 'function') {
            return val.then(function (res) {
              setVal(props, res);
            });
          }
          setVal(props, val);
          return this;
        }
        return this[_attr][props];
      }

      return this[_attr].attrs;
    }
  }, {
    key: 'isVisible',
    value: function isVisible() {
      if (!this.parent) return false;

      var display = this.attr('display');
      if (display === 'none') {
        return false;
      }

      var opacity = this.attr('opacity');
      if (opacity <= 0) {
        return false;
      }

      if (this.isVirtual) return true;

      var _offsetSize = (0, _slicedToArray3.default)(this.offsetSize, 2),
          width = _offsetSize[0],
          height = _offsetSize[1];

      if (width <= 0 || height <= 0) {
        return false;
      }

      if (this.parent.isVisible) {
        return this.parent.isVisible();
      }
      return true;
    }
  }, {
    key: 'transition',
    value: function transition(sec) {
      var _ref9;

      var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'linear';
      var isStyleAnim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var that = this,
          _animation = (0, _symbol2.default)('animation');

      easing = easing || 'linear';

      var delay = 0;
      if ((typeof sec === 'undefined' ? 'undefined' : (0, _typeof3.default)(sec)) === 'object') {
        delay = sec.delay || 0;
        sec = sec.duration;
      }

      return _ref9 = {}, (0, _defineProperty3.default)(_ref9, _animation, null), (0, _defineProperty3.default)(_ref9, 'cancel', function cancel() {
        var preserveState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var animation = this[_animation];
        if (animation) {
          animation.cancel(preserveState);
        }
      }), (0, _defineProperty3.default)(_ref9, 'end', function end() {
        var animation = this[_animation];
        if (animation && (animation.playState === 'running' || animation.playState === 'pending')) {
          animation.finish();
        }
      }), (0, _defineProperty3.default)(_ref9, 'reverse', function reverse() {
        var animation = this[_animation];
        if (animation) {
          if (animation.playState === 'running' || animation.playState === 'pending') {
            animation.playbackRate = -animation.playbackRate;
          } else {
            var direction = animation.timing.direction;
            animation.timing.direction = direction === 'reverse' ? 'normal' : 'reverse';
            animation.play();
          }
        }
        return animation.finished;
      }), (0, _defineProperty3.default)(_ref9, 'attr', function attr(prop, val) {
        this.end();
        if (typeof prop === 'string') {
          prop = (0, _defineProperty3.default)({}, prop, val);
        }
        (0, _entries2.default)(prop).forEach(function (_ref7) {
          var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
              key = _ref8[0],
              value = _ref8[1];

          if (typeof value === 'function') {
            prop[key] = value(that.attr(key));
          }
        });
        this[_animation] = that.animate([prop], {
          duration: sec * 1000,
          delay: delay * 1000,
          fill: 'forwards',
          easing: easing
        }, isStyleAnim);
        return this[_animation].finished;
      }), _ref9;
    }
  }, {
    key: 'animate',
    value: function animate(frames, timing) {
      var _this3 = this;

      var isStyleAnim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var setter = null;
      if (isStyleAnim) {
        setter = function setter(frame, target) {
          target.attributes.__styleTag = true;
          target.attr(frame);
          target.attributes.__styleTag = false;
        };
      }
      var animation = new _animation3.default(this, frames, timing, setter);
      if (this[_effects]) animation.applyEffects(this[_effects]);
      if (this.layer) {
        animation.baseTimeline = this.layer.timeline;
        animation.play();
        animation.finished.then(function () {
          _this3[_animations].delete(animation);
        });
      }
      this[_animations].add(animation);
      return animation;
    }
  }, {
    key: 'changeState',
    value: function changeState(fromState, toState, action) {
      var _this4 = this;

      var animation = void 0;
      if (this[_changeStateAction]) {
        var currentAnim = this[_changeStateAction].animation;
        if (this[_changeStateAction].reversable && (currentAnim.playState === 'running' || currentAnim.playState === 'pending') && this[_changeStateAction].fromState === toState && this[_changeStateAction].toState === fromState) {
          currentAnim.playbackRate = -currentAnim.playbackRate;
          animation = currentAnim;
          animation.__reversed = this[_changeStateAction].action;
        } else {
          currentAnim.finish();
        }
      }
      if (!animation) {
        // const [_fromState, _toState] = [Object.assign({}, fromState), Object.assign({}, toState)];
        // delete _fromState.__default;
        // delete _toState.__default;
        var _fromState = {},
            _toState = {};
        (0, _entries2.default)(fromState || {}).forEach(function (_ref10) {
          var _ref11 = (0, _slicedToArray3.default)(_ref10, 2),
              key = _ref11[0],
              value = _ref11[1];

          if (key !== '__default') {
            if (typeof value === 'function') {
              _fromState[key] = _this4.attr(key);
            } else {
              _fromState[key] = value;
            }
          }
        });
        (0, _entries2.default)(toState || {}).forEach(function (_ref12) {
          var _ref13 = (0, _slicedToArray3.default)(_ref12, 2),
              key = _ref13[0],
              value = _ref13[1];

          if (key !== '__default') {
            if (typeof value === 'function') {
              _toState[key] = value(_this4.attr(key));
            } else {
              _toState[key] = value;
            }
          }
        });
        animation = this.animate([_fromState, _toState], (0, _assign2.default)({ fill: 'forwards' }, action));
        animation.finished.then(function () {
          if (_this4[_changeStateAction] && _this4[_changeStateAction].animation === animation) delete _this4[_changeStateAction];
        });
      }
      this[_changeStateAction] = { animation: animation, fromState: fromState, toState: toState, action: action, reversable: action.reversable !== false };
      return animation;
    }
  }, {
    key: 'connect',
    value: function connect(parent) {
      var _this5 = this;

      var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (parent && !(parent instanceof _basenode2.default)) {
        var node = new _basenode2.default();
        node.context = parent;
        node.timeline = new _spriteAnimator.Timeline();
        node.update = function () {
          var currentTime = this.timeline.currentTime;
          node.dispatchEvent('update', { target: this, timeline: this.timeline, renderTime: currentTime }, true, true);
        };
        parent = node;
      }
      var ret = (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'connect', this).call(this, parent, zOrder);
      Object.defineProperty(this, 'context', {
        get: function get() {
          return parent.cache || parent.context;
        },
        configurable: true
      });
      this[_animations].forEach(function (animation) {
        if (parent.layer) {
          animation.baseTimeline = parent.layer.timeline;
        }
        animation.play();
        animation.finished.then(function () {
          _this5[_animations].delete(animation);
        });
      });
      if (this.hasLayout) parent.clearLayout();
      this.reflow();
      return ret;
    }
  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      var _this6 = this;

      this[_animations].forEach(function (animation) {
        return animation.cancel();
      });
      if (this.cache) {
        this.cache = null;
      }
      if (this.hasLayout) parent.clearLayout();
      this.reflow();
      var ret = (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'disconnect', this).call(this, parent);
      delete this.context;
      [].concat((0, _toConsumableArray3.default)(this[_releaseKeys])).forEach(function (key) {
        return delete _this6[key];
      });
      return ret;
    }
  }, {
    key: 'getParentXY',
    value: function getParentXY() {
      var lx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var ly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var layer = this.layer;
      if (!layer) return [0, 0];
      var parents = [];
      var target = this.parent;
      while (target && target !== layer) {
        parents.push(target);
        target = target.parent;
      }
      parents.reverse();

      var parentX = lx,
          parentY = ly;

      parents.forEach(function (node) {
        var scrollLeft = node.attr('scrollLeft'),
            scrollTop = node.attr('scrollTop'),
            borderWidth = node.attr('border').width,
            padding = node.attr('padding');

        var _node$pointToOffset = node.pointToOffset(parentX, parentY);

        var _node$pointToOffset2 = (0, _slicedToArray3.default)(_node$pointToOffset, 2);

        parentX = _node$pointToOffset2[0];
        parentY = _node$pointToOffset2[1];

        parentX = parentX - node.originalRect[0] - borderWidth - padding[3] + scrollLeft;
        parentY = parentY - node.originalRect[1] - borderWidth - padding[0] + scrollTop;
      });
      return [parentX, parentY];
    }
  }, {
    key: 'getLayerXY',
    value: function getLayerXY() {
      var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var layer = this.layer;
      if (!layer) return [0, 0];
      var target = this;
      var x = dx,
          y = dy;

      while (target && target !== layer) {
        var _target$offsetToPoint = target.offsetToPoint(x, y);

        var _target$offsetToPoint2 = (0, _slicedToArray3.default)(_target$offsetToPoint, 2);

        x = _target$offsetToPoint2[0];
        y = _target$offsetToPoint2[1];

        var parent = target.parent;

        if (parent !== layer) {
          var borderWidth = parent.attr('border').width;
          var padding = parent.attr('padding'),
              scrollLeft = parent.attr('scrollLeft') || 0,
              scrollTop = parent.attr('scrollTop') || 0;

          // const parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft
          // const parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop

          x = x + parent.originalRect[0] + borderWidth + padding[3] - scrollLeft;
          y = y + parent.originalRect[1] + borderWidth + padding[0] - scrollTop;
        }
        target = parent;
      }
      return [x, y];
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this.cache = null;
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parent) {
      parent.appendChild(this);
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate() {
      var clearCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (clearCache) {
        this.cache = null;
      }
      var parent = this.parent;
      if (parent) {
        this.parent.update(this);
      }
    }

    // layer position to sprite offset

  }, {
    key: 'pointToOffset',
    value: function pointToOffset(x, y) {
      var _xy = (0, _slicedToArray3.default)(this.xy, 2),
          x0 = _xy[0],
          y0 = _xy[1];

      var dx = x - x0,
          dy = y - y0;

      var transform = this.transform;
      return transform.inverse().transformPoint(dx, dy);
    }
  }, {
    key: 'offsetToPoint',
    value: function offsetToPoint(dx, dy) {
      var transform = this.transform;

      var _xy2 = (0, _slicedToArray3.default)(this.xy, 2),
          x0 = _xy2[0],
          y0 = _xy2[1];

      var _transform$transformP = transform.transformPoint(dx, dy),
          _transform$transformP2 = (0, _slicedToArray3.default)(_transform$transformP, 2),
          x = _transform$transformP2[0],
          y = _transform$transformP2[1];

      return [x + x0, y + y0];
    }
  }, {
    key: 'getOffsetXY',
    value: function getOffsetXY(evt) {
      var parentX = void 0,
          parentY = void 0;

      if (evt.parentX != null) {
        // group
        parentX = evt.parentX;
        parentY = evt.parentY;
      } else {
        parentX = evt.layerX;
        parentY = evt.layerY;
      }
      if (parentX != null && parentY != null) {
        return this.pointToOffset(parentX, parentY);
      }
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (collisionState) {
        var offsetXY = this.getOffsetXY(evt);
        if (offsetXY) {
          evt.offsetX = offsetXY[0];
          evt.offsetY = offsetXY[1];
        }
      }

      return (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'dispatchEvent', this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      /* istanbul ignore if */
      if (!this.isVisible()) {
        return false;
      }
      var offsetXY = this.getOffsetXY(evt);
      if (!offsetXY) return true;

      var _offsetXY = (0, _slicedToArray3.default)(offsetXY, 2),
          nx = _offsetXY[0],
          ny = _offsetXY[1];

      evt.offsetX = nx;
      evt.offsetY = ny;

      var _originalRect = (0, _slicedToArray3.default)(this.originalRect, 4),
          ox = _originalRect[0],
          oy = _originalRect[1],
          ow = _originalRect[2],
          oh = _originalRect[3];

      if (nx >= ox && nx - ox < ow && ny >= oy && ny - oy < oh) {
        if (this.context && this.context.isPointInPath) {
          var borderWidth = this.attr('border').width,
              borderRadius = this.attr('borderRadius');
          if (borderWidth || borderRadius) {
            var _outerSize = (0, _slicedToArray3.default)(this.outerSize, 2),
                width = _outerSize[0],
                height = _outerSize[1];

            var _ref14 = [0, 0, width, height, Math.max(0, borderRadius + borderWidth / 2)],
                x = _ref14[0],
                y = _ref14[1],
                w = _ref14[2],
                h = _ref14[3],
                r = _ref14[4];

            (0, _render.drawRadiusBox)(this.context, { x: x, y: y, w: w, h: h, r: r });
            if (this.layer && this.layer.offset) {
              nx += this.layer.offset[0];
              ny += this.layer.offset[1];
            }
            return this.context.isPointInPath(nx - ox, ny - oy);
          }
        }
        return true;
      }
    }

    // OBB: http://blog.csdn.net/silangquan/article/details/50812425

  }, {
    key: 'OBBCollision',
    value: function OBBCollision(sprite) {
      // vertices: [p1, p2, p3, p4]
      var _vertices = (0, _slicedToArray3.default)(this.vertices, 3),
          p11 = _vertices[0],
          p12 = _vertices[1],
          p13 = _vertices[2],
          _sprite$vertices = (0, _slicedToArray3.default)(sprite.vertices, 3),
          p21 = _sprite$vertices[0],
          p22 = _sprite$vertices[1],
          p23 = _sprite$vertices[2];

      var a1 = new _spriteMath.Vector(p12, p11).unit(),
          a2 = new _spriteMath.Vector(p13, p12).unit(),
          a3 = new _spriteMath.Vector(p22, p21).unit(),
          a4 = new _spriteMath.Vector(p23, p22).unit();

      // The projection of the axis of a vertex in a certain direction
      function verticesProjection(vertices, axis) {
        var _vertices$map = vertices.map(function (v) {
          return axis.dot(new _spriteMath.Vector(v));
        }),
            _vertices$map2 = (0, _slicedToArray3.default)(_vertices$map, 4),
            p1 = _vertices$map2[0],
            p2 = _vertices$map2[1],
            p3 = _vertices$map2[2],
            p4 = _vertices$map2[3];

        return [Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4)];
      }

      function projectionIntersect(p1, p2) {
        var m1 = (p1[0] + p1[1]) / 2,
            l1 = Math.abs(p1[1] - p1[0]),
            m2 = (p2[0] + p2[1]) / 2,
            l2 = Math.abs(p2[1] - p2[0]);

        return Math.abs(m2 - m1) <= (l1 + l2) / 2;
      }

      return projectionIntersect(verticesProjection(this.vertices, a1), verticesProjection(sprite.vertices, a1)) && projectionIntersect(verticesProjection(this.vertices, a2), verticesProjection(sprite.vertices, a2)) && projectionIntersect(verticesProjection(this.vertices, a3), verticesProjection(sprite.vertices, a3)) && projectionIntersect(verticesProjection(this.vertices, a4), verticesProjection(sprite.vertices, a4));
    }
  }, {
    key: 'relayout',
    value: function relayout() {}
  }, {
    key: 'draw',
    value: function draw(t) {
      var drawingContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;

      var bound = this.originalRect;
      var cachableContext = !this.isVirtual && this.cache;

      var filter = this.attr('filter'),
          shadow = this.attr('shadow'),
          enableCache = this.attr('enableCache') || shadow || filter;

      var ratio = this.layer ? this.layer.displayRatio || 1.0 : 1.0;

      if (enableCache && (shadow || filter || cachableContext !== false) && !cachableContext) {
        cachableContext = _render.cacheContextPool.get(drawingContext);
        if (cachableContext) {
          // +2 to solve 1px problem
          cachableContext.canvas.width = Math.ceil(bound[2] * ratio) + 2;
          cachableContext.canvas.height = Math.ceil(bound[3] * ratio) + 2;
        }
      }

      var evtArgs = { context: drawingContext, cacheContext: cachableContext, target: this, renderTime: t, fromCache: !!this.cache };

      drawingContext.save();
      drawingContext.translate.apply(drawingContext, (0, _toConsumableArray3.default)(this.xy));
      drawingContext.transform.apply(drawingContext, (0, _toConsumableArray3.default)(this.transform.m));

      // fix for wxapp
      var alpha = drawingContext.globalAlpha != null ? drawingContext.globalAlpha : 1;
      drawingContext.globalAlpha = alpha * this.attr('opacity');

      if (!cachableContext) {
        drawingContext.translate(bound[0], bound[1]);
      } else {
        cachableContext.save();
        // solve 1px problem
        cachableContext.translate(bound[0] - Math.floor(bound[0]) + 1, bound[1] - Math.floor(bound[1]) + 1);
        if (ratio !== 1.0) {
          cachableContext.scale(ratio, ratio);
        }
      }

      this.dispatchEvent('beforedraw', evtArgs, true, true);

      if (cachableContext) {
        // set cache before render for group
        if (!this.cache) {
          this.cache = cachableContext;
          this.render(t, cachableContext);
        }
      } else {
        this.render(t, drawingContext);
      }

      if ((shadow || filter) && !cachableContext) {
        console.warn('No cachable context. Shadows and filters have been ignored.');
      }

      if (cachableContext && cachableContext.canvas.width > 0 && cachableContext.canvas.height > 0) {
        if (filter) {
          drawingContext.filter = _filters2.default.compile(filter);
        }
        if (shadow) {
          var blur = shadow.blur,
              color = shadow.color,
              offset = shadow.offset;

          blur = blur || 1;
          color = color || 'rgba(0,0,0,1)';
          drawingContext.shadowBlur = blur;
          drawingContext.shadowColor = color;
          if (offset) {
            drawingContext.shadowOffsetX = offset[0];
            drawingContext.shadowOffsetY = offset[1];
          }
        }
        drawingContext.drawImage(cachableContext.canvas, Math.floor(bound[0]) - 1, Math.floor(bound[1]) - 1, bound[2] + 2, bound[3] + 2);
      }

      this.dispatchEvent('afterdraw', evtArgs, true, true);

      if (cachableContext) {
        cachableContext.restore();
      }
      drawingContext.restore();

      this[_cachePriority]++;

      return drawingContext;
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var border = this.attr('border'),
          borderRadius = this.attr('borderRadius'),
          padding = this.attr('padding'),
          _offsetSize2 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          offsetWidth = _offsetSize2[0],
          offsetHeight = _offsetSize2[1],
          _clientSize = (0, _slicedToArray3.default)(this.clientSize, 2),
          clientWidth = _clientSize[0],
          clientHeight = _clientSize[1];


      if (!this.needRender) {
        return false;
      }

      var borderWidth = border.width;
      var borderStyle = border.style;

      // draw border
      if (borderWidth) {
        drawingContext.lineWidth = borderWidth;

        var x = borderWidth / 2,
            y = borderWidth / 2,
            w = offsetWidth - borderWidth,
            h = offsetHeight - borderWidth,
            r = borderRadius;


        (0, _render.drawRadiusBox)(drawingContext, { x: x, y: y, w: w, h: h, r: r });

        if (borderStyle && borderStyle !== 'solid') {
          var dashOffset = this.attr('dashOffset');
          drawingContext.lineDashOffset = dashOffset;
          if (borderStyle === 'dashed') {
            borderStyle = [borderWidth * 3, borderWidth * 3];
          }
          drawingContext.setLineDash(borderStyle);
        }
        drawingContext.strokeStyle = (0, _render.findColor)(drawingContext, this, 'border');
        drawingContext.stroke();
      }

      // draw bgcolor
      var bgcolor = (0, _render.findColor)(drawingContext, this, 'bgcolor');
      var bgimage = this.attr('bgimage');

      if (this.cache == null || borderWidth || borderRadius || bgcolor || bgimage && bgimage.display !== 'none') {
        var _ref15 = [borderWidth, borderWidth, clientWidth, clientHeight, Math.max(0, borderRadius - borderWidth / 2)],
            _x14 = _ref15[0],
            _y = _ref15[1],
            _w = _ref15[2],
            _h = _ref15[3],
            _r = _ref15[4];


        (0, _render.drawRadiusBox)(drawingContext, { x: _x14, y: _y, w: _w, h: _h, r: _r });

        if (bgcolor) {
          drawingContext.fillStyle = bgcolor;
          drawingContext.fill();
        }

        // clip is expensive, we should only perform clip when it has to.
        if (bgimage && bgimage.display !== 'none' || borderRadius && (this.nodeType !== 'sprite' || this.textures && this.textures.length)) {
          drawingContext.clip();
        }

        if (bgimage && bgimage.image && bgimage.display !== 'none') {
          drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
        }
      }

      drawingContext.translate(borderWidth + padding[3], borderWidth + padding[0]);

      return true;
    }
  }, {
    key: 'resolveStates',
    value: function resolveStates(states, before, after) {
      var _this7 = this;

      var currentAnimation = null,
          resolved = false;

      var _states = [];
      var prev = null;
      for (var i = 0; i < states.length; i++) {
        var s = states[i];
        if (prev !== s) {
          prev = s;
          _states.push(s);
        }
      }
      states = _states;

      var _resolveStates = function _resolveStates() {
        _this7.__ignoreAction = false;
        var fromState = _this7.attr('state');
        if (fromState === states[0]) {
          states.shift();
        }

        var len = states.length;
        var resolveState = function resolveState(state, i) {
          var promise = new _promise2.default(function (resolve) {
            _this7.once('state-to-' + state, function () {
              fromState = state;
              if (i === len - 1) {
                // lastState
                delete _this7[_resolveState];
              }
              if (after) after.call(_this7, states);
              resolve(_this7);
            });
            _this7.once('state-from-' + fromState, function (_ref16) {
              var animation = _ref16.animation;

              if (animation && resolved) animation.finish();else currentAnimation = animation;
            });
            _this7.attr('state', state);
          });
          return promise;
        };

        var promise = _promise2.default.resolve();
        states.forEach(function (state, i) {
          promise = promise.then(function () {
            return resolveState(state, i);
          });
        });

        var ret = {
          get animation() {
            return currentAnimation;
          },
          states: states,
          resolve: function resolve() {
            resolved = true;
            if (currentAnimation) currentAnimation.finish();
            return promise;
          },

          promise: promise
        };
        _this7[_resolveState] = ret;
        return ret;
      };
      var rs = this[_resolveState];
      if (rs) {
        rs.resolve();
        this.__ignoreAction = true;
        var promise = rs.promise.then(function () {
          if (before) before.call(_this7, states);
          return _resolveStates().promise;
        });
        return {
          promise: promise,
          resolve: function resolve() {
            resolved = true;
            if (currentAnimation) currentAnimation.finish();
            return promise;
          }
        };
      }
      if (before) before.call(this, states);
      return _resolveStates();
    }

    // state: original -> show -> hide -> show -> original

  }, {
    key: 'show',
    value: function show() {
      var _this8 = this;

      if (this[_show]) return this[_show];

      var originalDisplay = this.attr('__originalDisplay') || '';
      var originalState = this.attr('__originalState') || 'default';

      var states = this.attr('states');

      if (states.show) {
        var _st = ['show', originalState];
        if (states.beforeShow) {
          _st.unshift('beforeShow');
        }
        var deferred = this.resolveStates(_st, function () {
          var state = _this8.attr('state');
          if (state === 'hide') {
            _this8.once('state-from-hide', function () {
              _this8.attr('display', originalDisplay);
            });
          }
        });
        deferred.promise = deferred.promise.then(function () {
          if (!_this8[_hide]) {
            delete _this8[_attr].__originalDisplay;
            delete _this8[_attr].__originalState;
            if (states.show.__default) {
              delete states.show;
              _this8.attr('states', states);
            }
          }
          delete _this8[_show];
        });
        this[_show] = deferred;
        return deferred;
      }

      var rs = this[_resolveState];
      if (rs) {
        rs.resolve();
        rs.promise.then(function () {
          _this8.attr('state', originalState);
          _this8.attr('display', originalDisplay);
        });
        return rs;
      }

      this.attr('state', originalState);
      this.attr('display', originalDisplay);
      return this;
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this9 = this;

      var state = this.attr('state');
      if (this[_hide] || state === 'hide' || state === 'afterExit' || state === 'beforeExit') return this[_hide];
      var __originalDisplay = this.attr('__originalDisplay');
      if (__originalDisplay == null) {
        var display = this.attr('display');

        this.attr({
          __originalDisplay: display !== 'none' ? display : '',
          __originalState: state !== 'hide' ? state : 'default'
        });
      }

      var states = this.attr('states');

      if (states.hide) {
        var deferred = this.resolveStates(['show', 'hide'], function () {
          if (!states.show) {
            var beforeHide = { __default: true };
            if (states.beforeShow) {
              (0, _keys2.default)(states.beforeShow).forEach(function (key) {
                beforeHide[key] = _this9.attr(key);
              });
            }
            (0, _keys2.default)(states.hide).forEach(function (key) {
              beforeHide[key] = _this9.attr(key);
            });
            states.show = beforeHide;
            _this9.attr('states', states);
          }
        });
        deferred.promise = deferred.promise.then(function () {
          _this9.attr('display', 'none');
          delete _this9[_hide];
          return _this9;
        });
        this[_hide] = deferred;
        return deferred;
      }

      var rs = this[_resolveState];
      if (rs) {
        rs.resolve();
        rs.promise.then(function () {
          _this9.attr('state', 'hide');
          _this9.attr('display', 'none');
        });
        return rs;
      }

      this.attr('state', 'hide');
      this.attr('display', 'none');
      return this;
    }
  }, {
    key: 'enter',
    value: function enter(toState) {
      var _this10 = this;

      var states = this.attr('states');
      var ret = void 0;
      if (states && (states.beforeEnter || states.afterEnter)) {
        var deferred = this.resolveStates(['beforeEnter', 'afterEnter'], function (_states) {
          var state = _this10.attr('state');
          _states.push(toState || state);
          if (state !== 'beforeEnter' && state !== 'afterEnter' && (!states.afterEnter || states.afterEnter.__default)) {
            var afterEnter = { __default: true };
            (0, _keys2.default)(states.beforeEnter).forEach(function (key) {
              afterEnter[key] = _this10.attr(key);
            });
            states.afterEnter = afterEnter;
            _this10.attr('states', states);
          }
        });
        ret = deferred;
      } else {
        ret = (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'enter', this).call(this);
      }

      this[_enter] = ret;
      if (this.children) {
        var enterMode = this.attr('enterMode');
        if (enterMode === 'onebyone' || enterMode === 'onebyone-reverse') {
          var promise = null;
          var resolved = false;
          if (ret.promise) {
            promise = ret.promise;
          } else {
            promise = _promise2.default.resolve(this);
          }

          var children = this.children;
          if (enterMode === 'onebyone-reverse') {
            children = [].concat((0, _toConsumableArray3.default)(children)).reverse();
          }

          var currentTask = ret;
          children.forEach(function (c) {
            var states = c.attr('states');
            if (states && (states.beforeEnter || states.afterEnter)) {
              if (!states.afterEnter || states.afterEnter.__default) {
                var afterEnter = { __default: true };
                (0, _keys2.default)(states.beforeEnter).forEach(function (key) {
                  afterEnter[key] = c.attr(key);
                });
                states.afterEnter = afterEnter;
                c.attr('states', states);
              }
            }
            var toState = c.attr('state');
            c.attr('state', 'beforeEnter');
            promise = promise.then(function () {
              var d = c.enter(toState);
              if (d.promise) {
                currentTask = d;
                if (resolved && d.resolve) {
                  d.resolve();
                }
                return d.promise;
              }
              return d;
            });
          });

          this[_enter] = {
            promise: promise,
            resolve: function resolve() {
              if (currentTask && currentTask.resolve) currentTask.resolve();
              resolved = true;
            }
          };
        } else {
          var entries = this.children.map(function (c) {
            return c.enter();
          }).filter(function (d) {
            return d.promise;
          });
          if (ret.promise) {
            entries.unshift(ret);
          }
          if (entries.length) {
            var _deferred = {
              promise: _promise2.default.all(entries.map(function (d) {
                return d.promise;
              })),
              resolve: function resolve() {
                entries.forEach(function (d) {
                  return d.resolve();
                });
                return _this10.promise;
              }
            };
            this[_enter] = _deferred;
          }
        }
      }

      return this[_enter];
    }
  }, {
    key: 'exit',
    value: function exit(toState) {
      var _this11 = this;

      var onbyone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _exit = function _exit() {
        var states = _this11.attr('states');
        var ret = void 0;
        var afterEnter = states.afterEnter || {};
        if (states && (states.beforeExit || states.afterExit)) {
          var state = void 0;
          var deferred = _this11.resolveStates(['beforeExit', 'afterExit'], function () {
            state = _this11.attr('state');
            if (state !== 'beforeExit' && state !== 'afterExit' && (!states.beforeExit || states.beforeExit.__default)) {
              states.beforeExit = (0, _assign2.default)({}, afterEnter);
              states.beforeExit.__default = true;
              _this11.attr('states', states);
            }
          });
          deferred.promise.then(function () {
            if (!onbyone) {
              _this11.attr(afterEnter);
              _this11[_attr].quietSet('state', toState || state);
            }
            return _this11;
          });
          ret = deferred;
        } else {
          var rs = _this11[_resolveState];
          if (rs) {
            rs.resolve();
            rs.promise.then(function () {
              _this11.attr(afterEnter);
              return (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'exit', _this11).call(_this11);
            });
            ret = rs;
          } else {
            ret = (0, _get3.default)(BaseSprite.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseSprite.prototype), 'exit', _this11).call(_this11);
            _this11.attr(afterEnter);
          }
        }

        if (_this11.children) {
          var exitMode = _this11.attr('exitMode');
          if (exitMode === 'onebyone' || exitMode === 'onebyone-reverse') {
            var promise = _promise2.default.resolve(_this11);
            var resolved = false;

            var children = _this11.children;
            if (exitMode === 'onebyone-reverse') {
              children = [].concat((0, _toConsumableArray3.default)(children)).reverse();
            }

            var currentTask = null;
            children.forEach(function (c) {
              var states = c.attr('states');
              if (states && (states.beforeExit || states.afterExit)) {
                if (!states.beforeExit || states.beforeExit.__default) {
                  states.beforeExit = (0, _assign2.default)({}, afterEnter);
                  states.beforeExit.__default = true;
                  c.attr('states', states);
                }
              }
              var toState = c.attr('state');
              c.attr('state', 'beforeExit');
              promise = promise.then(function () {
                var d = c.exit(toState, true);
                if (d.promise) {
                  currentTask = d;
                  if (resolved && d.resolve) d.resolve();
                  return d.promise;
                }
                return d;
              });
              c.__toState = toState;
            });

            promise = promise.then(function () {
              var p = ret.promise || _promise2.default.resolve(_this11);
              currentTask = ret;
              return p.then(function () {
                _this11.children.forEach(function (c) {
                  var states = c.attr('states');
                  c.attr(states.afterEnter);
                  c[_attr].quietSet('state', c.__toState);
                  delete c.__toState;
                });
              });
            });

            return {
              promise: promise,
              resolve: function resolve() {
                if (currentTask && currentTask.resolve) currentTask.resolve();
                resolved = true;
              }
            };
          }

          var exites = _this11.children.map(function (c) {
            return c.exit();
          }).filter(function (d) {
            return d.promise;
          });
          if (ret.promise) {
            exites.unshift(ret);
          }
          if (exites.length) {
            var _deferred2 = {
              promise: _promise2.default.all(exites.map(function (d) {
                return d.promise;
              })),
              resolve: function resolve() {
                exites.forEach(function (d) {
                  return d.resolve();
                });
                return _this11.promise;
              }
            };
            return _deferred2;
          }
        }

        return ret;
      };

      if (this[_enter] && this[_enter].promise) {
        var resolved = false;
        this[_enter].resolve();
        var promise = this[_enter].promise.then(function () {
          var deferred = _exit();
          if (resolved && deferred.resolve) {
            deferred.resolve();
          }
          return deferred.promise;
        });
        return {
          promise: promise,
          resolve: function resolve() {
            resolved = true;
          }
        };
      }
      return _exit();
    }
  }, {
    key: 'layer',
    get: function get() {
      return this.parent && this.parent.layer;
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
  }, {
    key: 'hasLayout',
    get: function get() {
      if (this.attr('position') === 'absolute') return false;
      if (this.parent && this.parent.relayout) {
        var display = this.parent.attr('display');
        return display !== '' && display !== 'static';
      }
      return false;
    }
  }, {
    key: 'zIndex',
    set: function set(val) {
      this.attr('zIndex', val);
    },
    get: function get() {
      return this.attr('zIndex');
    }
  }, {
    key: 'attributes',
    get: function get() {
      if (typeof Proxy === 'function') {
        try {
          return new Proxy(this[_attr], {
            get: function get(target, prop) {
              return target[prop];
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
    key: 'isVirtual',
    get: function get() {
      return false;
    }
  }, {
    key: 'transform',
    get: function get() {
      var transform = new _spriteMath.Matrix(this[_attr].get('transformMatrix'));
      var transformOrigin = this.attr('transformOrigin');
      if (transformOrigin) {
        var t = new _spriteMath.Matrix();
        t.translate.apply(t, (0, _toConsumableArray3.default)(transformOrigin));
        t.multiply(transform);
        t.translate.apply(t, (0, _toConsumableArray3.default)(transformOrigin.map(function (v) {
          return -v;
        })));
        return t;
      }
      return transform;
    }
  }, {
    key: 'animations',
    get: function get() {
      return this[_animations];
    }
  }, {
    key: 'xy',
    get: function get() {
      var x = void 0,
          y = void 0;
      if (this.hasLayout) {
        x = this.attr('layoutX');
        y = this.attr('layoutY');
      } else {
        var _attr2 = this.attr('pos');

        var _attr3 = (0, _slicedToArray3.default)(_attr2, 2);

        x = _attr3[0];
        y = _attr3[1];
      }
      return [x, y];
    }
  }, {
    key: 'attrSize',
    get: function get() {
      var _attr4 = this.attr('size'),
          _attr5 = (0, _slicedToArray3.default)(_attr4, 2),
          width = _attr5[0],
          height = _attr5[1];

      var isBorderBox = this.attr('boxSizing') === 'border-box';

      if (this.hasLayout) {
        var layoutWidth = this.attr('layoutWidth'),
            layoutHeight = this.attr('layoutHeight');var _ref17 = [layoutWidth !== '' ? layoutWidth : width, layoutHeight !== '' ? layoutHeight : height];
        width = _ref17[0];
        height = _ref17[1];
      }
      if (isBorderBox) {
        var borderWidth = this.attr('border').width,
            _attr6 = this.attr('padding'),
            _attr7 = (0, _slicedToArray3.default)(_attr6, 4),
            paddingTop = _attr7[0],
            paddingRight = _attr7[1],
            paddingBottom = _attr7[2],
            paddingLeft = _attr7[3];


        if (width !== '') {
          width = Math.max(0, width - 2 * borderWidth - paddingLeft - paddingRight);
        }
        if (height !== '') {
          height = Math.max(0, height - 2 * borderWidth - paddingTop - paddingBottom);
        }
      }
      return [width, height];
    }
  }, {
    key: 'boxOffsetSize',
    get: function get() {
      // get original boxSize, without layout
      if (this.isVirtual) return [0, 0];

      var _attr8 = this.attr('size'),
          _attr9 = (0, _slicedToArray3.default)(_attr8, 2),
          width = _attr9[0],
          height = _attr9[1];

      var _attr10 = this.attr('padding'),
          _attr11 = (0, _slicedToArray3.default)(_attr10, 4),
          top = _attr11[0],
          right = _attr11[1],
          bottom = _attr11[2],
          left = _attr11[3];

      var _attr12 = this.attr('border'),
          borderWidth = _attr12.width,
          lw = borderWidth * 2;

      return [left + (width | 0) + right + lw, top + (height | 0) + bottom + lw];
    }

    // content width / height

  }, {
    key: 'contentSize',
    get: function get() {
      if (this.isVirtual) return [0, 0];

      var _attrSize = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize[0],
          height = _attrSize[1];

      return [width | 0, height | 0];
    }

    // content + padding

  }, {
    key: 'clientSize',
    get: function get() {
      var _attr13 = this.attr('padding'),
          _attr14 = (0, _slicedToArray3.default)(_attr13, 4),
          top = _attr14[0],
          right = _attr14[1],
          bottom = _attr14[2],
          left = _attr14[3],
          _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
          width = _contentSize[0],
          height = _contentSize[1];

      return [left + width + right, top + height + bottom];
    }

    // content + padding + border

  }, {
    key: 'offsetSize',
    get: function get() {
      var _attr15 = this.attr('border'),
          borderWidth = _attr15.width,
          _clientSize2 = (0, _slicedToArray3.default)(this.clientSize, 2),
          width = _clientSize2[0],
          height = _clientSize2[1];

      return [width + 2 * borderWidth, height + 2 * borderWidth];
    }
  }, {
    key: 'layoutSize',
    get: function get() {
      var size = this.offsetSize;

      var _attr16 = this.attr('margin'),
          _attr17 = (0, _slicedToArray3.default)(_attr16, 4),
          top = _attr17[0],
          right = _attr17[1],
          bottom = _attr17[2],
          left = _attr17[3];

      return [left + size[0] + right, top + size[1] + bottom];
    }
  }, {
    key: 'innerSize',
    get: function get() {
      return this.contentSize;
    }
  }, {
    key: 'outerSize',
    get: function get() {
      return this.offsetSize;
    }
  }, {
    key: 'boundingRect',
    get: function get() {
      var transform = this.transform;

      var _originalRect2 = (0, _slicedToArray3.default)(this.originalRect, 4),
          ox = _originalRect2[0],
          oy = _originalRect2[1],
          width = _originalRect2[2],
          height = _originalRect2[3];

      if (this.hasLayout) {
        var margin = this.attr('margin');
        width += margin[1];
        height += margin[2];
      }

      var vertexs = [[ox, oy], [width + ox, oy], [ox, height + oy], [width + ox, height + oy]];

      var transformed = vertexs.map(function (v) {
        return transform.transformPoint(v[0], v[1]);
      });

      var vx = transformed.map(function (v) {
        return v[0];
      }),
          vy = transformed.map(function (v) {
        return v[1];
      });

      var minX = Math.min.apply(Math, (0, _toConsumableArray3.default)(vx)),
          minY = Math.min.apply(Math, (0, _toConsumableArray3.default)(vy)),
          maxX = Math.max.apply(Math, (0, _toConsumableArray3.default)(vx)),
          maxY = Math.max.apply(Math, (0, _toConsumableArray3.default)(vy));

      return [minX, minY].concat([maxX - minX, maxY - minY]);
    }

    // rect before transform

  }, {
    key: 'originalRect',
    get: function get() {
      var _offsetSize3 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          width = _offsetSize3[0],
          height = _offsetSize3[1],
          _attr18 = this.attr('anchor'),
          _attr19 = (0, _slicedToArray3.default)(_attr18, 2),
          anchorX = _attr19[0],
          anchorY = _attr19[1];

      var rect = [-anchorX * width, -anchorY * height, width, height];

      if (this.hasLayout) {
        var margin = this.attr('margin');
        rect[0] += margin[3];
        rect[1] += margin[0];
      }
      return rect;
    }
  }, {
    key: 'originalRenderRect',
    get: function get() {
      var bound = this.originalRect,
          pos = this.xy;

      return [pos[0] + bound[0], pos[1] + bound[1], bound[2], bound[3]];
    }
  }, {
    key: 'renderBox',
    get: function get() {
      var bound = this.boundingRect,
          pos = this.xy;

      return [Math.floor(pos[0] + bound[0]), Math.floor(pos[1] + bound[1]), Math.ceil(pos[0] + bound[0] + bound[2]), Math.ceil(pos[1] + bound[1] + bound[3])];
    }
  }, {
    key: 'renderRect',
    get: function get() {
      return (0, _utils.boxToRect)(this.renderBox);
    }
  }, {
    key: 'vertices',
    get: function get() {
      var vertices = (0, _utils.rectVertices)(this.originalRect),
          transform = this.transform,
          _xy3 = (0, _slicedToArray3.default)(this.xy, 2),
          x0 = _xy3[0],
          y0 = _xy3[1];


      return vertices.map(function (v) {
        var _transform$transformP3 = transform.transformPoint(v[0], v[1]),
            _transform$transformP4 = (0, _slicedToArray3.default)(_transform$transformP3, 2),
            x = _transform$transformP4[0],
            y = _transform$transformP4[1];

        return [x0 + x, y0 + y];
      });
    }
  }, {
    key: 'cache',
    set: function set(context) {
      if (context == null) {
        this[_cachePriority] = 0;
        if (this.parent && this.parent.cache) {
          this.parent.cache = null;
        }
      }
      if (this.cacheContext && context !== this.cacheContext) {
        _render.cacheContextPool.put(this.cacheContext);
      }
      this.cacheContext = context;
    },
    get: function get() {
      if (this[_cachePriority] >= CACHE_PRIORITY_THRESHOLDS) {
        return this.cacheContext;
      }
      if (this.cacheContext) {
        this.cache = null;
      }
      return false;
    }
  }, {
    key: 'needRender',
    get: function get() {
      if (this.isVirtual) return false;

      var _offsetSize4 = (0, _slicedToArray3.default)(this.offsetSize, 2),
          offsetWidth = _offsetSize4[0],
          offsetHeight = _offsetSize4[1];

      if (offsetWidth <= 0 || offsetHeight <= 0) return false;

      var border = this.attr('border');

      if (border.width <= 0 && this.attr('borderRadius') <= 0 && !this.attr('bgcolor') && !this.attr('gradients').bgcolor && !this.attr('bgimage')) {
        return false; // don't need to render
      }

      return true;
    }
  }], [{
    key: 'setAttributeEffects',
    value: function setAttributeEffects() {
      var effects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.prototype[_effects] == null) {
        this.prototype[_effects] = effects;
      }
      (0, _assign2.default)(this.prototype[_effects], effects);
    }
  }, {
    key: 'addAttributes',
    value: function addAttributes() {
      var _this12 = this;

      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _entries2.default)(attrs).forEach(function (_ref18) {
        var _ref19 = (0, _slicedToArray3.default)(_ref18, 2),
            prop = _ref19[0],
            handler = _ref19[1];

        var getter = function getter() {
          return this.get(prop);
        };
        if (typeof handler !== 'function' && handler.set) {
          getter = handler.get || getter;
          handler = handler.set;
        }
        if (prop !== 'init') {
          _this12.Attr.prototype.__attributeNames.add(prop);
          (0, _defineProperty5.default)(_this12.Attr.prototype, prop, {
            set: function set(val) {
              this.__updateTag = false;
              this.__reflowTag = false;
              handler(this, val);
              if (this.subject && this.subject.hasLayout) {
                var offsetSize = this.subject.offsetSize,
                    layoutSize = this.subject.__layoutSize;

                if (!layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1]) {
                  this.subject.parent.clearLayout();
                }
                this.subject.__lastLayout = offsetSize;
              }
              if (this.subject && this.__updateTag) {
                this.subject.forceUpdate(true);
                if (this.__reflowTag) {
                  this.subject.reflow();
                }
              }
              // delete this.__reflowTag;
              // delete this.__updateTag;
            },

            get: getter
          });
        }
      });
    }
  }, {
    key: 'defineAttributes',
    value: function defineAttributes(attrs, effects) {
      this.Attr = function (_Attr) {
        (0, _inherits3.default)(_class3, _Attr);

        function _class3(subject) {
          (0, _classCallCheck3.default)(this, _class3);

          var _this13 = (0, _possibleConstructorReturn3.default)(this, (_class3.__proto__ || (0, _getPrototypeOf2.default)(_class3)).call(this, subject));

          if (attrs.init) attrs.init(_this13, subject);
          return _this13;
        }

        return _class3;
      }(this.Attr);
      if (attrs) this.addAttributes(attrs);
      if (effects) this.setAttributeEffects(effects);
      return this.Attr;
    }
  }]);
  return BaseSprite;
}(_basenode2.default), _class2.Attr = _attr21.default, _class2.inheritAttributes = _utils.inheritAttributes, _temp), (_applyDecoratedDescriptor(_class.prototype, 'xy', [_utils.absolute], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'xy'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'attrSize', [_utils.absolute, _utils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'attrSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'boxOffsetSize', [_utils.absolute, _utils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'boxOffsetSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'contentSize', [_utils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'contentSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clientSize', [_utils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clientSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offsetSize', [_utils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offsetSize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'originalRect', [_utils.flow], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'originalRect'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearCache', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clearCache'), _class.prototype)), _class));
exports.default = BaseSprite;


function drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  var w = image.width,
      h = image.height;

  var _ref20 = clip9 || [16, 16, 16, 16],
      _ref21 = (0, _slicedToArray3.default)(_ref20, 4),
      top = _ref21[0],
      right = _ref21[1],
      bottom = _ref21[2],
      left = _ref21[3];

  var leftTop = [0, 0, left, top],
      rightTop = [w - right, 0, right, top],
      rightBottom = [w - right, h - bottom, right, bottom],
      leftBottom = [0, h - bottom, left, bottom];

  var boxRight = offsetWidth - right - borderWidth,
      boxBottom = offsetHeight - borderWidth - bottom;

  // draw .9 cross
  var midWidth = w - left - right,
      midHeight = h - top - bottom;

  if (midWidth > 0) {
    var midBoxWidth = clientWidth - left - right + 2;
    var leftOffset = borderWidth + left - 1;
    while (midBoxWidth > 0) {
      var ww = Math.min(midBoxWidth, midWidth) + 1;
      var topPiece = [left - 1, 0, ww, top],
          bottomPiece = [left - 1, h - bottom, ww, bottom];

      drawingContext.drawImage.apply(drawingContext, [image].concat(topPiece, [leftOffset, borderWidth, ww, top]));
      drawingContext.drawImage.apply(drawingContext, [image].concat(bottomPiece, [leftOffset, boxBottom, ww, bottom]));
      midBoxWidth -= midWidth;
      if (midBoxWidth > 0) {
        leftOffset += midWidth;
      }
    }
  }

  if (midHeight > 0) {
    var midBoxHeight = clientHeight - top - bottom + 2;
    var topOffset = borderWidth + top - 1;
    while (midBoxHeight > 0) {
      var hh = Math.min(midBoxHeight, midHeight) + 1;
      var leftPiece = [0, top - 1, left, hh],
          rightPiece = [w - right, top - 1, right, hh];

      drawingContext.drawImage.apply(drawingContext, [image].concat(leftPiece, [borderWidth, topOffset, left, hh]));
      drawingContext.drawImage.apply(drawingContext, [image].concat(rightPiece, [boxRight, topOffset, right, hh]));
      midBoxHeight -= midHeight;
      if (midBoxHeight > 0) {
        topOffset += midHeight;
      }
    }
  }

  if (midHeight && midWidth > 0) {
    var _midBoxWidth = clientWidth - left - right + 2;
    var _leftOffset = borderWidth + left - 1;

    while (_midBoxWidth > 0) {
      var _midBoxHeight = clientHeight - top - bottom + 2;
      var _topOffset = borderWidth + top - 1;
      while (_midBoxHeight > 0) {
        var _ww = Math.min(_midBoxWidth, midWidth) + 1,
            _hh = Math.min(_midBoxHeight, midHeight) + 1;
        var midPiece = [left - 1, top - 1, _ww, _hh];
        drawingContext.drawImage.apply(drawingContext, [image].concat(midPiece, [_leftOffset, _topOffset, _ww, _hh]));
        _midBoxHeight -= midWidth;
        if (_midBoxHeight > 0) {
          _topOffset += midHeight;
        }
      }
      _midBoxWidth -= midWidth;
      if (_midBoxWidth > 0) {
        _leftOffset += midWidth;
      }
    }
  }

  // draw four corners
  drawingContext.drawImage.apply(drawingContext, [image].concat(leftTop, [borderWidth, borderWidth, left, top]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(rightTop, [boxRight, borderWidth, right, top]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(rightBottom, [boxRight, boxBottom, left, bottom]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(leftBottom, [borderWidth, boxBottom, left, bottom]));
}

function drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  var image = bgimage.image,
      display = bgimage.display,
      clip9 = bgimage.clip9;


  if (display === '.9') {
    drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
  } else {
    var offset = bgimage.offset || [0, 0],
        w = image.width,
        h = image.height;

    if (display === 'center') {
      offset = [(clientWidth - w) * 0.5, (clientHeight - h) * 0.5];
    } else if (display === 'stretch') {
      w = clientWidth - offset[0];
      h = clientHeight - offset[1];
    }
    drawingContext.drawImage(image, borderWidth + offset[0], borderWidth + offset[1], w, h);

    if (w > 0 && (display === 'repeat' || display === 'repeatX')) {
      var cw = clientWidth - borderWidth - offset[0] - w;
      while (cw > borderWidth) {
        drawingContext.drawImage(image, clientWidth - cw, borderWidth + offset[1], w, h);
        if (h > 0 && display === 'repeat') {
          var ch = clientHeight - borderWidth - offset[1] - h;
          while (ch > borderWidth) {
            drawingContext.drawImage(image, clientWidth - cw, clientHeight - ch, w, h);
            ch -= h;
          }
        }
        cw -= w;
      }
    }

    if (h > 0 && (display === 'repeat' || display === 'repeatY')) {
      var _ch = clientHeight - borderWidth - offset[1] - h;
      while (_ch > borderWidth) {
        drawingContext.drawImage(image, borderWidth + offset[0], clientHeight - _ch, w, h);
        _ch -= h;
      }
    }
  }
}

(0, _nodetype.registerNodeType)('basesprite', BaseSprite);