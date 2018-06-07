'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class, _class2, _temp;

var _basesprite = require('./basesprite');

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = require('./nodetype');

var _spriteUtils = require('sprite-utils');

var _path = require('./helpers/path');

var _render = require('./helpers/render');

var _group = require('./helpers/group');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = require('babel-decorators-runtime');

var _children = (0, _symbol2.default)('children'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _baseCachePriority = (0, _symbol2.default)('baseCachePriority');

var GroupAttr = (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(GroupAttr, _BaseSprite$Attr);

  function GroupAttr(subject) {
    (0, _classCallCheck3.default)(this, GroupAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupAttr.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr)).call(this, subject));

    _this.setDefault({
      clip: null
    });
    return _this;
  }

  (0, _createClass3.default)(GroupAttr, [{
    key: 'clip',
    set: function set(val) {
      this.clearCache();
      if (val) {
        val = typeof val === 'string' ? { d: val } : val;
        this.subject.svg = (0, _path.createSvgPath)(val);
        this.set('clip', val);
      } else {
        this.subject.svg = null;
        this.set('clip', null);
      }
    }
  }]);
  return GroupAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'clip', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clip'), _class.prototype)), _class);
var Group = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Group, _BaseSprite);

  function Group(attr) {
    (0, _classCallCheck3.default)(this, Group);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Group.__proto__ || (0, _getPrototypeOf2.default)(Group)).call(this, attr));

    _this2[_children] = [];
    _this2[_zOrder] = 0;
    _this2[_baseCachePriority] = 0;
    return _this2;
  }

  (0, _createClass3.default)(Group, [{
    key: 'cloneNode',
    value: function cloneNode(deepCopy) {
      var node = (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'cloneNode', this).call(this);
      if (deepCopy) {
        var children = this.children;
        children.forEach(function (child) {
          var subNode = child.cloneNode(deepCopy);
          node.append(subNode);
        });
      }
      return node;
    }
  }, {
    key: 'update',
    value: function update(child) {
      this.cache = null;
      this.forceUpdate();
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if ((0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'pointCollision', this).call(this, evt)) {
        if (this.svg) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;

          var rect = this.originalRect;
          evt.isInClip = this.svg.isPointInPath(offsetX - rect[0], offsetY - rect[1]);
        }
        return true;
      }
      return false;
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var isCollision = collisionState || this.pointCollision(evt);
      if (!evt.terminated && isCollision) {
        var parentX = evt.offsetX - this.originalRect[0];
        var parentY = evt.offsetY - this.originalRect[1];
        // console.log(evt.parentX, evt.parentY)

        var _evt = (0, _assign2.default)({}, evt);
        _evt.parentX = parentX;
        _evt.parentY = parentY;

        var sprites = this[_children].slice(0).reverse();

        var targetSprites = [];

        if (!swallow && type !== 'mouseenter' && type !== 'mouseleave') {
          for (var i = 0; i < sprites.length && evt.isInClip !== false; i++) {
            var sprite = sprites[i];
            var hit = sprite.dispatchEvent(type, _evt, collisionState, swallow);
            if (hit) {
              targetSprites.push(sprite);
            }
            if (evt.terminated && !evt.type.startsWith('mouse')) {
              break;
            }
          }
        }

        evt.targetSprites = targetSprites;
      }

      // stopDispatch can only terminate event in the same level
      evt.terminated = false;
      return (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'dispatchEvent', this).call(this, type, evt, collisionState);
    }
  }, {
    key: 'isNodeVisible',
    value: function isNodeVisible(sprite) {
      if (!sprite.isVisible()) return false;

      var _outerSize = (0, _slicedToArray3.default)(this.outerSize, 2),
          w = _outerSize[0],
          h = _outerSize[1];

      var box1 = sprite.renderBox,
          box2 = [0, 0, w, h];
      if ((0, _spriteUtils.boxIntersect)(box1, box2)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'clearCache', this).call(this);
      this[_baseCachePriority] = 0;
      if (this.baseCache) {
        _render.cacheContextPool.put(this.baseCache);
        this.baseCache = null;
      }
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var clipPath = this.attr('clip');
      if (clipPath) {
        drawingContext.save();
        this.svg.beginPath().to(drawingContext);
        drawingContext.restore();
        drawingContext.clip();
      }

      this[_baseCachePriority] = Math.min(this[_baseCachePriority] + 1, 10);
      var bound = this.originalRect,
          bw = Math.ceil(bound[2]) + 2,
          bh = Math.ceil(bound[3]) + 2;

      if (this.baseCache && bw === this.baseCache.canvas.width && bh === this.baseCache.canvas.height) {
        var _attr = this.attr('border'),
            borderWidth = _attr.width,
            padding = this.attr('padding');

        drawingContext.drawImage(this.baseCache.canvas, -1, -1);
        drawingContext.translate(borderWidth + padding[3], borderWidth + padding[0]);
      } else {
        if (this.baseCache) {
          this[_baseCachePriority] = 0;
          _render.cacheContextPool.put(this.baseCache);
          this.baseCache = null;
        }
        if (this[_baseCachePriority] > this.__cachePolicyThreshold) {
          var bgcolor = (0, _render.findColor)(drawingContext, this, 'bgcolor');
          if (bgcolor) {
            this.baseCache = _render.cacheContextPool.get(drawingContext);
            if (this.baseCache) {
              this.baseCache.canvas.width = bw;
              this.baseCache.canvas.height = bh;
              this.baseCache.save();
              this.baseCache.translate(1, 1);
              (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, this.baseCache);
              this.baseCache.restore();
              drawingContext.drawImage(this.baseCache.canvas, -1, -1);

              var _attr2 = this.attr('border'),
                  _borderWidth = _attr2.width,
                  _padding = this.attr('padding');

              drawingContext.translate(_borderWidth + _padding[3], _borderWidth + _padding[0]);
            } else {
              this.__cachePolicyThreshold = Infinity;
              (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, drawingContext);
            }
          } else {
            (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, drawingContext);
          }
        } else {
          (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, drawingContext);
        }
      }

      var sprites = this[_children];

      for (var i = 0; i < sprites.length; i++) {
        var child = sprites[i],
            isVisible = this.isNodeVisible(child);
        if (isVisible) {
          child.draw(t);
        }
        if (child.isDirty) {
          child.isDirty = false;
          child.dispatchEvent('update', { target: child, renderTime: t, isVisible: isVisible }, true, true);
        }
      }
    }
  }, {
    key: 'children',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'contentSize',
    get: function get() {
      var _attr3 = this.attr('size'),
          _attr4 = (0, _slicedToArray3.default)(_attr3, 2),
          width = _attr4[0],
          height = _attr4[1];

      if (width === '' || height === '') {
        if (this.attr('clip')) {
          var svg = this.svg;
          var bounds = svg.bounds;
          width = bounds[2];
          height = bounds[3];
        } else {
          var right = void 0,
              bottom = void 0;

          right = 0;
          bottom = 0;
          this[_children].forEach(function (sprite) {
            var renderBox = sprite.renderBox;
            right = Math.max(right, renderBox[2]);
            bottom = Math.max(bottom, renderBox[3]);
          });
          width = right;
          height = bottom;
        }
      }
      return [width, height];
    }
  }]);
  return Group;
}(_basesprite2.default), _class2.Attr = GroupAttr, _temp);
exports.default = Group;

(0, _assign2.default)(Group.prototype, _group2.default);

(0, _nodetype.registerNodeType)('group', Group, true);