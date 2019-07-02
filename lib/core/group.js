"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _utils = require("../utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _group = _interopRequireDefault(require("../helpers/group"));

var _zOrder = Symbol('zOrder'),
    _layoutTag = Symbol('layoutTag');

var reflow = true,
    relayout = true;
var GroupAttr = (0, _decorate2.default)(null, function (_initialize, _BaseSprite$Attr) {
  var GroupAttr =
  /*#__PURE__*/
  function (_BaseSprite$Attr2) {
    (0, _inherits2.default)(GroupAttr, _BaseSprite$Attr2);

    function GroupAttr(subject) {
      var _this;

      (0, _classCallCheck2.default)(this, GroupAttr);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GroupAttr).call(this, subject));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      GroupAttr.inits.forEach(function (init) {
        init((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), subject);
      });
      return _this;
    }

    return GroupAttr;
  }(_BaseSprite$Attr);

  return {
    F: GroupAttr,
    d: [{
      kind: "field",
      static: true,
      key: "inits",
      value: function value() {
        return [];
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "enableCache",
      value: function value() {
        return 'auto';
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        value: null
      })],
      key: "clip",
      value: function value(val) {
        if (val) {
          val = typeof val === 'string' ? {
            d: val
          } : val;
          this.subject.svg = (0, _utils.createSvgPath)(val);
          this.set('clip', val);
        } else {
          this.subject.svg = null;
          this.set('clip', null);
        }
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        relayout: relayout
      }), (0, _utils.relative)('width')],
      key: "layoutWidth",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        relayout: relayout
      }), (0, _utils.relative)('height')],
      key: "layoutHeight",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        relayout: relayout
      }), (0, _utils.relative)('width')],
      key: "width",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        relayout: relayout
      }), (0, _utils.relative)('height')],
      key: "height",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        relayout: relayout
      })],
      key: "display",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "scrollLeft",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "scrollTop",
      value: function value() {
        return 0;
      }
    }]
  };
}, _basesprite.default.Attr);

var _layout = Symbol('layout');

var Group = (0, _decorate2.default)(null, function (_initialize2, _BaseSprite) {
  var Group =
  /*#__PURE__*/
  function (_BaseSprite2) {
    (0, _inherits2.default)(Group, _BaseSprite2);

    function Group() {
      var _this2;

      var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _classCallCheck2.default)(this, Group);
      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Group).call(this, attr));

      _initialize2((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));

      _this2.childNodes = [];
      _this2.sortedChildNodes = [];
      _this2[_zOrder] = 0;
      _this2[_layoutTag] = false;
      _this2.__labelCount = 0;
      return _this2;
    }

    return Group;
  }(_BaseSprite);

  return {
    F: Group,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",
      value: function value() {
        return GroupAttr;
      }
    }, {
      kind: "method",
      static: true,
      key: "applyLayout",
      value: function value(name, layout) {
        this[_layout] = this[_layout] || {};
        var attrs = layout.attrs,
            relayout = layout.relayout;

        if (attrs.init) {
          GroupAttr.inits.push(attrs.init);
        }

        Group.addAttributes(attrs);
        this[_layout][name] = relayout;
      }
    }, {
      kind: "get",
      key: "isVirtual",
      value: function value() {
        var display = this.attr('display');
        if (display !== '' && display !== 'none') return false;
        var parent = this.parent;
        if (parent && parent instanceof Group && !parent.isVirtual) return false;

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
      kind: "method",
      key: "connect",
      value: function value(parent) {
        var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var ret = (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "connect", this).call(this, parent, zOrder);
        var labelCount = this.__labelCount;
        var _p = parent;

        while (_p && _p.__labelCount != null) {
          _p.__labelCount += labelCount;
          _p = _p.parent;
        }

        return ret;
      }
    }, {
      kind: "method",
      key: "disconnect",
      value: function value(parent) {
        var ret = (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "disconnect", this).call(this, parent);
        var labelCount = this.__labelCount;
        var _p = parent;

        while (_p && _p.__labelCount != null) {
          _p.__labelCount -= labelCount;
          _p = _p.parent;
        }

        return ret;
      }
    }, {
      kind: "method",
      key: "scrollTo",
      value: function value(x, y) {
        this.attr('scrollLeft', x);
        this.attr('scrollTop', y);
      }
    }, {
      kind: "method",
      key: "scrollBy",
      value: function value(dx, dy) {
        var x = this.attr('scrollLeft'),
            y = this.attr('scrollTop');
        this.scrollTo(x + dx, y + dy);
      }
    }, {
      kind: "method",
      key: "cloneNode",
      value: function value(deepCopy) {
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
      kind: "get",
      key: "children",
      value: function value() {
        var children = this.childNodes || [];
        return children.filter(function (child) {
          return child instanceof _basesprite.default;
        });
      }
    }, {
      kind: "method",
      key: "update",
      value: function value(child) {
        child.isDirty = true;
        var attrSize = this.attrSize;

        if (attrSize[0] === '' || attrSize[1] === '') {
          this.reflow();
        }

        this.forceUpdate(true);
      }
    }, {
      kind: "method",
      key: "pointCollision",
      value: function value(evt) {
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
      kind: "get",
      decorators: [_utils.flow],
      key: "contentSize",
      value: function value() {
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
    }, {
      kind: "method",
      key: "dispatchEvent",
      value: function value(type, evt) {
        var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var useCapturePhase = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var handlers = this.getEventHandlers(type);

        if (swallow && handlers.length === 0) {
          return;
        }

        var hasCapturePhase = false;

        if (!swallow && !evt.terminated && type !== 'mouseenter') {
          var isCollision = collisionState || this.pointCollision(evt);

          if (isCollision || type === 'mouseleave' || !this.attr('clipOverflow')) {
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

            if (isCollision && handlers.length && handlers.some(function (handler) {
              return handler.useCapture;
            })) {
              hasCapturePhase = true;
              if (!evt.target) evt.target = this.getTargetFromXY(parentX, parentY);
              (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "dispatchEvent", this).call(this, type, evt, isCollision, swallow, true);
            }

            var targetSprites = [];

            if (!hasCapturePhase || !evt.cancelBubble) {
              var sprites = this.sortedChildNodes.slice(0).reverse();

              for (var i = 0; i < sprites.length && evt.isInClip !== false; i++) {
                var sprite = sprites[i];
                var hit = sprite.dispatchEvent(type, evt, collisionState, swallow, useCapturePhase);

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

        if (hasCapturePhase) {
          return (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow, false);
        }

        if (evt.targetSprites.length > 0) {
          // bubbling
          collisionState = true;
        }

        return (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow, useCapturePhase);
      }
    }, {
      kind: "method",
      key: "relayout",
      value: function value() {
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
      kind: "method",
      key: "clearLayout",
      value: function value() {
        this[_layoutTag] = false;
        if (this.hasLayout) this.parent.clearLayout();
      }
    }, {
      kind: "method",
      key: "draw",
      value: function value(t) {
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
      kind: "method",
      key: "render",
      value: function value(t, drawingContext) {
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
    }]
  };
}, _basesprite.default);
exports.default = Group;
Object.assign(Group.prototype, _group.default);