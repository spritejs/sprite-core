'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _desc, _value, _class, _class2, _temp, _desc2, _value2, _class3, _class4, _temp2;

var _utils = require('./utils');

var _basesprite = require('./basesprite');

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = require('./nodetype');

var _path = require('./helpers/path');

var _basenode = require('./basenode');

var _basenode2 = _interopRequireDefault(_basenode);

var _datanode = require('./datanode');

var _datanode2 = _interopRequireDefault(_datanode);

var _layout2 = require('./layout');

var layout = _interopRequireWildcard(_layout2);

var _group = require('./helpers/group');

var _group2 = _interopRequireDefault(_group);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = require('babel-decorators-runtime');

var _zOrder = (0, _symbol2.default)('zOrder'),
    _layoutTag = (0, _symbol2.default)('layoutTag');

var GroupAttr = (_dec = (0, _utils.relative)('width'), _dec2 = (0, _utils.relative)('height'), _dec3 = (0, _utils.relative)('width'), _dec4 = (0, _utils.relative)('height'), _dec5 = (0, _utils.parseValue)(parseFloat), _dec6 = (0, _utils.parseValue)(parseFloat), (_class = (_temp = _class2 = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(GroupAttr, _BaseSprite$Attr);

  function GroupAttr(subject) {
    (0, _classCallCheck3.default)(this, GroupAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupAttr.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr)).call(this, subject));

    _this.setDefault({
      clip: null,
      scrollTop: 0,
      scrollLeft: 0
    });

    GroupAttr.inits.forEach(function (init) {
      init(_this, subject);
    });
    return _this;
  }

  (0, _createClass3.default)(GroupAttr, [{
    key: 'clip',
    set: function set(val) {
      this.clearFlow();
      if (val) {
        val = typeof val === 'string' ? { d: val } : val;
        this.subject.svg = (0, _path.createSvgPath)(val);
        this.set('clip', val);
      } else {
        this.subject.svg = null;
        this.set('clip', null);
      }
    }
  }, {
    key: 'width',
    set: function set(value) {
      this.subject.clearLayout();
      this.set('width', value);
    }
  }, {
    key: 'height',
    set: function set(value) {
      this.subject.clearLayout();
      this.set('height', value);
    }
  }, {
    key: 'layoutWidth',
    set: function set(value) {
      this.subject.clearLayout();
      this.set('layoutWidth', value);
    }
  }, {
    key: 'layoutHeight',
    set: function set(value) {
      this.subject.clearLayout();
      this.set('layoutHeight', value);
    }
  }, {
    key: 'display',
    set: function set(value) {
      this.subject.clearLayout();
      this.set('display', value);
    }
  }, {
    key: 'scrollLeft',
    set: function set(value) {
      this.set('scrollLeft', value);
    }
  }, {
    key: 'scrollTop',
    set: function set(value) {
      this.set('scrollTop', value);
    }
  }]);
  return GroupAttr;
}(_basesprite2.default.Attr), _class2.inits = [], _temp), (_applyDecoratedDescriptor(_class.prototype, 'clip', [_utils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clip'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'width', [_utils.attr, _dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'width'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'height', [_utils.attr, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'height'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutWidth', [_utils.attr, _dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutHeight', [_utils.attr, _dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'display', [_utils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'display'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'scrollLeft', [_dec5, _utils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'scrollLeft'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'scrollTop', [_dec6, _utils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'scrollTop'), _class.prototype)), _class));


var _layout = (0, _symbol2.default)('layout');

var Group = (_class3 = (_temp2 = _class4 = function (_BaseSprite) {
  (0, _inherits3.default)(Group, _BaseSprite);
  (0, _createClass3.default)(Group, null, [{
    key: 'applyLayout',
    value: function applyLayout(name, layout) {
      this[_layout] = this[_layout] || {};
      var attrs = layout.attrs,
          relayout = layout.relayout;

      if (attrs.init) {
        GroupAttr.inits.push(attrs.init);
      }
      Group.addAttributes(attrs);
      this[_layout][name] = relayout;
    }
  }]);

  function Group() {
    var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Group);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Group.__proto__ || (0, _getPrototypeOf2.default)(Group)).call(this, attr));

    _this2.childNodes = [];
    _this2.sortedChildNodes = [];
    _this2[_zOrder] = 0;
    _this2[_layoutTag] = false;
    return _this2;
  }

  (0, _createClass3.default)(Group, [{
    key: 'scrollTo',
    value: function scrollTo(x, y) {
      this.attr('scrollLeft', x);
      this.attr('scrollTop', y);
    }
  }, {
    key: 'scrollBy',
    value: function scrollBy(dx, dy) {
      var x = this.attr('scrollLeft'),
          y = this.attr('scrollTop');

      this.scrollTo(x + dx, y + dy);
    }
  }, {
    key: 'cloneNode',
    value: function cloneNode(deepCopy) {
      var node = (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'cloneNode', this).call(this);
      if (deepCopy) {
        var children = this.childNodes;
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
      child.isDirty = true;
      var attrSize = this.attrSize;
      if (attrSize[0] === '' || attrSize[1] === '') {
        this.reflow();
      }
      this.forceUpdate(true);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if ((0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'pointCollision', this).call(this, evt) || this.isVirtual) {
        if (this.svg) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;

          if (offsetX == null && offsetY == null) return true;
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

      if (swallow && this.getEventHandlers(type).length === 0) {
        return;
      }
      if (!swallow && !evt.terminated && type !== 'mouseenter') {
        var isCollision = collisionState || this.pointCollision(evt);
        if (isCollision || type === 'mouseleave') {
          var scrollLeft = this.attr('scrollLeft'),
              scrollTop = this.attr('scrollTop'),
              borderWidth = this.attr('border').width,
              padding = this.attr('padding');

          var parentX = void 0,
              parentY = void 0;

          if ('offsetX' in evt) parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft;
          if ('offsetY' in evt) parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop;

          var _parentX = evt.parentX,
              _parentY = evt.parentY;

          evt.parentX = parentX;
          evt.parentY = parentY;

          var sprites = this.sortedChildNodes.slice(0).reverse();

          var targetSprites = [];

          for (var i = 0; i < sprites.length && evt.isInClip !== false; i++) {
            var sprite = sprites[i];
            var hit = sprite.dispatchEvent(type, evt, collisionState, swallow);
            if (hit) {
              if (evt.targetSprites) {
                targetSprites.push.apply(targetSprites, (0, _toConsumableArray3.default)(evt.targetSprites));
                delete evt.targetSprites;
              }
              targetSprites.push(sprite);
            }
            if (evt.terminated && type !== 'mousemove') {
              break;
            }
          }

          evt.targetSprites = targetSprites;
          // stopDispatch can only terminate event in the same level
          evt.terminated = false;
          evt.parentX = _parentX;
          evt.parentY = _parentY;
          collisionState = isCollision;
        }
      }
      evt.targetSprites = evt.targetSprites || [];
      if (evt.cancelBubble) {
        // stop bubbling
        return false;
      }
      if (evt.targetSprites.length > 0) {
        // bubbling
        collisionState = true;
      }
      return (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'dispatchEvent', this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: 'relayout',
    value: function relayout() {
      var items = this.childNodes.filter(function (child) {
        if (child.hasLayout) {
          child.attr('layoutWidth', null);
          child.attr('layoutHeight', null);
          child.attr('layoutX', null);
          child.attr('layoutY', null);
        }
        if (child.relayout) {
          var _display = child.attr('display');
          if (_display !== '' && _display !== 'static') {
            child.relayout();
          }
        }
        return child.hasLayout && child.attr('display') !== 'none';
      });

      var display = this.attr('display');
      var doLayout = Group[_layout][display];
      if (doLayout) {
        doLayout(this, items);
      }
    }
  }, {
    key: 'clearLayout',
    value: function clearLayout() {
      this[_layoutTag] = false;
      var parent = this.parent;
      while (parent) {
        if (parent[_layoutTag]) parent[_layoutTag] = false;
        parent = parent.parent;
      }
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var display = this.attr('display');
      if (display !== '' && display !== 'static' && !this[_layoutTag]) {
        this.relayout();
      }

      var clipPath = this.attr('clip');
      if (clipPath) {
        this.svg.beginPath().to(drawingContext);
        drawingContext.clip();
      }

      if (!this.isVirtual) {
        (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, drawingContext);
        drawingContext.beginPath();
        drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
        drawingContext.clip();
      }

      drawingContext.save();
      var scrollLeft = this.attr('scrollLeft'),
          scrollTop = this.attr('scrollTop');

      drawingContext.translate(-scrollLeft, -scrollTop);
      var sprites = this.sortedChildNodes;

      for (var i = 0; i < sprites.length; i++) {
        var child = sprites[i],
            isDirty = child.isDirty;
        child.isDirty = false;

        if (child.isVisible()) {
          child.draw(t, drawingContext);
        }
        if (isDirty) {
          child.dispatchEvent('update', { target: child, renderTime: t }, true, true);
        }
      }
      drawingContext.restore();

      if (display !== '' && display !== 'static') {
        this[_layoutTag] = true;
      }
    }
  }, {
    key: 'isVirtual',
    get: function get() {
      var display = this.attr('display');
      if (display !== '' && display !== 'none') return false;

      var _attr = this.attr('border'),
          borderWidth = _attr.width,
          borderRadius = this.attr('borderRadius'),
          bgcolor = this.attr('bgcolor'),
          _attr2 = this.attr('gradients'),
          bgGradient = _attr2.bgcolor,
          _attrSize = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize[0],
          height = _attrSize[1],
          _attr3 = this.attr('anchor'),
          _attr4 = (0, _slicedToArray3.default)(_attr3, 2),
          anchorX = _attr4[0],
          anchorY = _attr4[1],
          bgimage = this.attr('bgimage');

      return !anchorX && !anchorY && !width && !height && !borderRadius && !borderWidth && !bgcolor && !bgGradient && !bgimage;
    }
  }, {
    key: 'children',
    get: function get() {
      var children = this.childNodes || [];
      return children.filter(function (child) {
        return child instanceof _basenode2.default && !(child instanceof _datanode2.default);
      });
    }
  }, {
    key: 'contentSize',
    get: function get() {
      if (this.isVirtual) return [0, 0];

      var _attrSize2 = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize2[0],
          height = _attrSize2[1];

      if (width === '' || height === '') {
        if (this.attr('clip')) {
          var svg = this.svg;
          var bounds = svg.bounds;
          width = width || bounds[2];
          height = height || bounds[3];
        } else {
          var right = void 0,
              bottom = void 0;

          right = 0;
          bottom = 0;
          this.childNodes.forEach(function (sprite) {
            if (sprite.attr('display') !== 'none') {
              var renderBox = sprite.renderBox;
              if (renderBox) {
                right = Math.max(right, renderBox[2]);
                bottom = Math.max(bottom, renderBox[3]);
              }
            }
          });
          width = width || right;
          height = height || bottom;
        }
      }
      return [width, height];
    }
  }]);
  return Group;
}(_basesprite2.default), _class4.Attr = GroupAttr, _temp2), (_applyDecoratedDescriptor(_class3.prototype, 'contentSize', [_utils.flow], (0, _getOwnPropertyDescriptor2.default)(_class3.prototype, 'contentSize'), _class3.prototype)), _class3);
exports.default = Group;

(0, _assign2.default)(Group.prototype, _group2.default);
Group.applyLayout('flex', layout.flexLayout);

Group.setAttributeEffects({
  clip: function clip(clip1, clip2, p, start, end) {
    clip1 = (0, _path.createSvgPath)(clip1);
    clip2 = (0, _path.createSvgPath)(clip2);
    return (0, _path.pathEffect)(clip1.d, clip2.d, p, start, end);
  }
});

(0, _nodetype.registerNodeType)('group', Group, true);