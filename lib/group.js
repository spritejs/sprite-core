'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _svgPathToCanvas = require('svg-path-to-canvas');

var _svgPathToCanvas2 = _interopRequireDefault(_svgPathToCanvas);

var _pathHelper = require('./path-helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = require('babel-decorators-runtime');

var _children = (0, _symbol2.default)('children'),
    _zOrder = (0, _symbol2.default)('zOrder');

function sortChildren(children) {
  children.sort(function (a, b) {
    var a_zidx = a.attr('zIndex'),
        b_zidx = b.attr('zIndex');
    if (a_zidx === b_zidx) {
      return a.zOrder - b.zOrder;
    }
    return a_zidx - b_zidx;
  });
}

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
        if (typeof val === 'string') {
          this.subject.svg = new _svgPathToCanvas2.default(val);
          this.set('clip', { d: val });
        } else {
          this.subject.svg = (0, _pathHelper.pathTransform)(val);
          this.set('clip', val);
        }
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
    return _this2;
  }

  (0, _createClass3.default)(Group, [{
    key: 'appendChild',
    value: function appendChild(sprite) {
      var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this[_children].push(sprite);
      sprite.connect(this, this[_zOrder]++);
      if (sort) sortChildren(this[_children]);
    }
  }, {
    key: 'append',
    value: function append() {
      var _this3 = this;

      for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      sprites.forEach(function (sprite) {
        return _this3.appendChild(sprite, false);
      });
      sortChildren(this[_children]);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(sprite) {
      var idx = this[_children].indexOf(sprite);
      if (idx === -1) {
        return null;
      }
      this[_children].splice(idx, 1);
      sprite.disconnect(this);
      return sprite;
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this4 = this;

      for (var _len2 = arguments.length, sprites = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sprites[_key2] = arguments[_key2];
      }

      if (sprites.length === 0) {
        sprites = this[_children].slice(0);
      }
      sprites.forEach(function (sprite) {
        return _this4.removeChild(sprite);
      });
    }
  }, {
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
    key: 'findPath',
    value: function findPath(offsetX, offsetY) {
      if (this.svg && this.svg.isPointInPath(offsetX, offsetY)) {
        return [this.svg];
      }
      return [];
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if ((0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'pointCollision', this).call(this, evt)) {
        if (this.attr('clip')) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;

          var rect = this.originRect;
          var pathOffset = this.pathOffset;
          var paths = this.findPath(offsetX - rect[0] - pathOffset[0], offsetY - rect[1] - pathOffset[1]);
          evt.isInClip = !!paths.length;
        }
        return true;
      }
      return false;
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var forceTrigger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!evt.terminated && (forceTrigger || this.pointCollision(evt))) {
        var parentX = evt.offsetX - this.originRect[0];
        var parentY = evt.offsetY - this.originRect[1];
        // console.log(evt.parentX, evt.parentY)

        var _evt = (0, _assign2.default)({}, evt);
        _evt.parentX = parentX;
        _evt.parentY = parentY;

        var targetSprites = [];

        for (var i = 0; i < this[_children].length && evt.isInClip !== false; i++) {
          var sprite = this[_children][i];
          var hit = sprite.dispatchEvent(type, _evt, forceTrigger);
          if (hit) {
            targetSprites.push(sprite);
          }
          if (evt.terminated && !evt.type.startsWith('mouse')) {
            break;
          }
        }

        evt.targetSprites = targetSprites;
        (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'dispatchEvent', this).call(this, type, evt, forceTrigger);
      }
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var context = (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, drawingContext);

      var clipPath = this.attr('clip');
      if (clipPath) {
        context.save();
        context.translate.apply(context, (0, _toConsumableArray3.default)(this.pathOffset));
        this.svg.beginPath().to(context);
        context.restore();
        context.clip();
        context.clearRect(0, 0, this.originRect[2], this.originRect[3]);
      }

      var children = this[_children];

      /* eslint-disable no-await-in-loop */
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        child.draw(t);
      }
      /* eslint-enable no-await-in-loop */

      return context;
    }
  }, {
    key: 'children',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'pathOffset',
    get: function get() {
      var _attr = this.attr('border'),
          _attr2 = (0, _slicedToArray3.default)(_attr, 1),
          borderWidth = _attr2[0];

      var padding = this.attr('padding');

      var padLeft = borderWidth + padding[3],
          padTop = borderWidth + padding[0];

      return [padLeft, padTop];
    }
  }, {
    key: 'pathSize',
    get: function get() {
      if (!this.svg) return [0, 0];
      var bounds = this.svg.bounds;
      return [bounds[2] - bounds[0], bounds[3] - bounds[1]];
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


(0, _nodetype.registerNodeType)('group', Group, true);