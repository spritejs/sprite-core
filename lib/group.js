"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _utils = require("./utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _path = require("./helpers/path");

var _group = _interopRequireDefault(require("./helpers/group"));

var _dec, _dec2, _dec3, _dec4, _class, _class2, _temp, _class3, _class4, _temp2;

var _zOrder = Symbol('zOrder'),
    _layoutTag = Symbol('layoutTag');

var GroupAttr = (_dec = (0, _utils.relative)('width'), _dec2 = (0, _utils.relative)('height'), _dec3 = (0, _utils.parseValue)(parseFloat), _dec4 = (0, _utils.parseValue)(parseFloat), (_class = (_temp = _class2 =
/*#__PURE__*/
function (_BaseSprite$Attr) {
  (0, _inherits2.default)(GroupAttr, _BaseSprite$Attr);

  function GroupAttr(subject) {
    var _this;

    (0, _classCallCheck2.default)(this, GroupAttr);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GroupAttr).call(this, subject));

    _this.setDefault({
      clip: null,
      scrollTop: 0,
      scrollLeft: 0
    });

    GroupAttr.inits.forEach(function (init) {
      init((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), subject);
    });
    return _this;
  }

  (0, _createClass2.default)(GroupAttr, [{
    key: "clip",
    set: function set(val) {
      this.clearFlow();

      if (val) {
        val = typeof val === 'string' ? {
          d: val
        } : val;
        this.subject.svg = (0, _path.createSvgPath)(val);
        this.set('clip', val);
      } else {
        this.subject.svg = null;
        this.set('clip', null);
      }
    } // @attr
    // @relative('width')
    // set width(value) {
    //   this.clearLayout();
    //   this.set('width', value);
    // }
    // @attr
    // @relative('height')
    // set height(value) {
    //   this.clearLayout();
    //   this.set('height', value);
    // }

  }, {
    key: "layoutWidth",
    set: function set(value) {
      this.clearLayout();
      this.set('layoutWidth', value);
    }
  }, {
    key: "layoutHeight",
    set: function set(value) {
      this.clearLayout();
      this.set('layoutHeight', value);
    }
  }, {
    key: "display",
    set: function set(value) {
      this.clearLayout();
      this.set('display', value);
    }
  }, {
    key: "scrollLeft",
    set: function set(value) {
      this.set('scrollLeft', value);
    }
  }, {
    key: "scrollTop",
    set: function set(value) {
      this.set('scrollTop', value);
    }
  }]);
  return GroupAttr;
}(_basesprite.default.Attr), (0, _defineProperty2.default)(_class2, "inits", []), _temp), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "clip", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "clip"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutWidth", [_utils.attr, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "layoutWidth"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutHeight", [_utils.attr, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, "layoutHeight"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "display", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "display"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "scrollLeft", [_dec3, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "scrollLeft"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "scrollTop", [_dec4, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "scrollTop"), _class.prototype)), _class));

var _layout = Symbol('layout');

var Group = (_class3 = (_temp2 = _class4 =
/*#__PURE__*/
function (_BaseSprite) {
  (0, _inherits2.default)(Group, _BaseSprite);
  (0, _createClass2.default)(Group, null, [{
    key: "applyLayout",
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
    var _this2;

    var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Group);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Group).call(this, attr));
    _this2.childNodes = [];
    _this2.sortedChildNodes = [];
    _this2[_zOrder] = 0;
    _this2[_layoutTag] = false;
    return _this2;
  }

  (0, _createClass2.default)(Group, [{
    key: "scrollTo",
    value: function scrollTo(x, y) {
      this.attr('scrollLeft', x);
      this.attr('scrollTop', y);
    }
  }, {
    key: "scrollBy",
    value: function scrollBy(dx, dy) {
      var x = this.attr('scrollLeft'),
          y = this.attr('scrollTop');
      this.scrollTo(x + dx, y + dy);
    }
  }, {
    key: "cloneNode",
    value: function cloneNode(deepCopy) {
      var node = (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "cloneNode", this).call(this);

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
    key: "update",
    value: function update(child) {
      child.isDirty = true;
      var attrSize = this.attrSize;

      if (attrSize[0] === '' || attrSize[1] === '') {
        this.reflow();
      }

      this.forceUpdate(true);
    }
  }, {
    key: "pointCollision",
    value: function pointCollision(evt) {
      if ((0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "pointCollision", this).call(this, evt) || this.isVirtual) {
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
    key: "dispatchEvent",
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
          var parentX, parentY;
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
                targetSprites.push.apply(targetSprites, (0, _toConsumableArray2.default)(evt.targetSprites));
                delete evt.targetSprites;
              }

              targetSprites.push(sprite);
            }

            if (evt.terminated && type !== 'mousemove') {
              break;
            }
          }

          evt.targetSprites = targetSprites; // stopDispatch can only terminate event in the same level

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

      return (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: "relayout",
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
    key: "clearLayout",
    value: function clearLayout() {
      this[_layoutTag] = false;
      if (this.hasLayout) this.parent.clearLayout();
    }
  }, {
    key: "draw",
    value: function draw(t) {
      var drawingContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;
      // must relayout before draw
      // prevent originalRect changing when rendering.
      var display = this.attr('display');

      if (display !== '' && display !== 'static' && !this[_layoutTag]) {
        this.relayout();
        this[_layoutTag] = true;
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "draw", this).call(this, t, drawingContext);
    }
  }, {
    key: "render",
    value: function render(t, drawingContext) {
      var clipPath = this.attr('clip');

      if (clipPath) {
        this.svg.beginPath().to(drawingContext);
        drawingContext.clip();
      }

      if (!this.isVirtual) {
        (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "render", this).call(this, t, drawingContext);

        if (this.attr('clipOverflow')) {
          drawingContext.beginPath();
          drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
          drawingContext.clip();
        }
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
        child.draw(t, drawingContext);

        if (isDirty) {
          child.dispatchEvent('update', {
            target: child,
            renderTime: t
          }, true, true);
        }
      }

      drawingContext.restore();
    }
  }, {
    key: "isVirtual",
    get: function get() {
      var display = this.attr('display');
      if (display !== '' && display !== 'none') return false;

      var _this$attr = this.attr('border'),
          borderWidth = _this$attr.width,
          borderRadius = this.attr('borderRadius'),
          bgcolor = this.attr('bgcolor'),
          _this$attr2 = this.attr('gradients'),
          bgGradient = _this$attr2.bgcolor,
          _this$attrSize = (0, _slicedToArray2.default)(this.attrSize, 2),
          width = _this$attrSize[0],
          height = _this$attrSize[1],
          _this$attr3 = this.attr('anchor'),
          _this$attr4 = (0, _slicedToArray2.default)(_this$attr3, 2),
          anchorX = _this$attr4[0],
          anchorY = _this$attr4[1],
          bgimage = this.attr('bgimage'),
          _this$attr5 = this.attr('padding'),
          _this$attr6 = (0, _slicedToArray2.default)(_this$attr5, 4),
          paddingTop = _this$attr6[0],
          paddingRight = _this$attr6[1],
          paddingBottom = _this$attr6[2],
          paddingLeft = _this$attr6[3];

      return !anchorX && !anchorY && !width && !height && !borderRadius && !borderWidth && !bgcolor && !bgGradient && !bgimage && !paddingTop && !paddingRight && !paddingBottom && !paddingLeft;
    }
  }, {
    key: "children",
    get: function get() {
      var children = this.childNodes || [];
      return children.filter(function (child) {
        return child instanceof _basesprite.default;
      });
    }
  }, {
    key: "contentSize",
    get: function get() {
      if (this.isVirtual) return [0, 0];

      var _this$attrSize2 = (0, _slicedToArray2.default)(this.attrSize, 2),
          width = _this$attrSize2[0],
          height = _this$attrSize2[1];

      if (width === '' || height === '') {
        if (this.attr('clip')) {
          var svg = this.svg;
          var bounds = svg.bounds;
          width = width || bounds[2];
          height = height || bounds[3];
        } else {
          var right, bottom;
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
}(_basesprite.default), (0, _defineProperty2.default)(_class4, "Attr", GroupAttr), _temp2), ((0, _applyDecoratedDescriptor2.default)(_class3.prototype, "contentSize", [_utils.flow], Object.getOwnPropertyDescriptor(_class3.prototype, "contentSize"), _class3.prototype)), _class3);
exports.default = Group;
Object.assign(Group.prototype, _group.default);
Group.setAttributeEffects({
  clip: function clip(clip1, clip2, p, start, end) {
    clip1 = (0, _path.createSvgPath)(clip1);
    clip2 = (0, _path.createSvgPath)(clip2);
    return (0, _path.pathEffect)(clip1.d, clip2.d, p, start, end);
  }
});