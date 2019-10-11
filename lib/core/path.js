"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _utils = require("../utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var reflow = true,
    quiet = true;
var PathSpriteAttr = (0, _decorate2.default)(null, function (_initialize, _BaseSprite$Attr) {
  var PathSpriteAttr =
  /*#__PURE__*/
  function (_BaseSprite$Attr2) {
    (0, _inherits2.default)(PathSpriteAttr, _BaseSprite$Attr2);

    function PathSpriteAttr() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, PathSpriteAttr);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PathSpriteAttr)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      return _this;
    }

    return PathSpriteAttr;
  }(_BaseSprite$Attr);

  return {
    F: PathSpriteAttr,
    d: [{
      kind: "set",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "path",
      value: function value(val) {
        if (val) {
          val = typeof val === 'string' ? {
            d: val
          } : val;
          this.subject.svg = (0, _utils.createSvgPath)(val);
          this.set('path', val);
        } else {
          this.subject.svg = null;
          this.set('path', null);
        }
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "d",
      value: function value(val) {
        if (val) {
          var path = this.path;

          if (!path) {
            this.path = {
              d: val
            };
          } else {
            this.path = Object.assign(path, {
              d: val
            });
          }
        } else {
          this.path = null;
        }
      }
    }, {
      kind: "get",
      key: "d",
      value: function value() {
        return this.path ? this.path.d : null;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      }), (0, _utils.inherit)(1)],
      key: "lineWidth",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat, function (val) {
        return typeof val === 'number' ? [val] : val;
      }), _utils.attr],
      key: "lineDash",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "lineDashOffset",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [_utils.attr, (0, _utils.inherit)('butt')],
      key: "lineCap",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [_utils.attr, (0, _utils.inherit)('miter')],
      key: "lineJoin",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr, (0, _utils.inherit)('')],
      key: "strokeColor",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr, (0, _utils.inherit)('')],
      key: "fillColor",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "flexible",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        quiet: quiet
      }), (0, _utils.inherit)('auto')],
      key: "bounding",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [_utils.attr, (0, _utils.composit)('strokeColor')],
      key: "color",
      value: void 0
    }]
  };
}, _basesprite.default.Attr);
var Path = (0, _decorate2.default)(null, function (_initialize2, _BaseSprite) {
  var Path =
  /*#__PURE__*/
  function (_BaseSprite2) {
    (0, _inherits2.default)(Path, _BaseSprite2);

    function Path(attr) {
      var _this2;

      (0, _classCallCheck2.default)(this, Path);

      if (typeof attr === 'string') {
        attr = {
          d: attr
        };
      }

      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(Path).call(this, attr));

      _initialize2((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));

      return _this2;
    }

    return Path;
  }(_BaseSprite);

  return {
    F: Path,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",
      value: function value() {
        return PathSpriteAttr;
      }
    }, {
      kind: "set",
      key: "path",
      value: function value(val) {
        this.attr('path', val);
      }
    }, {
      kind: "get",
      key: "path",
      value: function value() {
        return this.attr('path');
      }
    }, {
      kind: "method",
      key: "getPointAtLength",
      value: function value(length) {
        if (this.svg) {
          return this.svg.getPointAtLength(length);
        }

        return [0, 0];
      }
    }, {
      kind: "method",
      key: "getPathLength",
      value: function value() {
        if (this.svg) {
          return this.svg.getTotalLength();
        }

        return 0;
      }
    }, {
      kind: "method",
      key: "isClosed",
      value: function value() {
        var d = this.attr('d');

        if (d) {
          return /z$/img.test(d);
        }

        return false;
      }
    }, {
      kind: "method",
      key: "findPath",
      value: function value(offsetX, offsetY) {
        var rect = this.originalRect;
        var pathOffset = this.pathOffset;
        var svg = this.svg;

        if (svg) {
          var x = offsetX - rect[0] - pathOffset[0],
              y = offsetY - rect[1] - pathOffset[1];
          var collision = false;

          if (this.isClosed()) {
            collision = svg.isPointInPath(x, y);
          }

          if (!collision) {
            var lineWidth = this.attr('lineWidth') + (parseFloat(this.attr('bounding')) || 0),
                lineCap = this.attr('lineCap'),
                lineJoin = this.attr('lineJoin');
            collision = svg.isPointInStroke(x, y, {
              lineWidth: lineWidth,
              lineCap: lineCap,
              lineJoin: lineJoin
            });
          }

          if (collision) {
            return [svg];
          }
        }

        return [];
      }
    }, {
      kind: "get",
      key: "lineWidth",
      value: function value() {
        var lineWidth = this.attr('lineWidth'),
            gradients = this.attr('gradients'),
            fillColor = this.attr('fillColor'),
            strokeColor = this.attr('strokeColor');
        var hasStrokeColor = strokeColor || gradients && gradients.strokeColor,
            hasFillColor = fillColor || gradients && gradients.fillColor;

        if (!hasStrokeColor && hasFillColor) {
          // fill: ignore stroke
          return 0;
        }

        return lineWidth;
      }
    }, {
      kind: "get",
      key: "pathOffset",
      value: function value() {
        var lw = Math.round(this.lineWidth);
        return [lw, lw];
      }
    }, {
      kind: "get",
      key: "pathSize",
      value: function value() {
        return this.svg ? this.svg.size : [0, 0];
      }
    }, {
      kind: "get",
      decorators: [_utils.flow],
      key: "contentSize",
      value: function value() {
        if (!this.svg) return (0, _get2.default)((0, _getPrototypeOf3.default)(Path.prototype), "contentSize", this);
        var bounds = this.svg.bounds;

        var _this$attrSize = (0, _slicedToArray2.default)(this.attrSize, 2),
            width = _this$attrSize[0],
            height = _this$attrSize[1];

        var pathOffset = this.pathOffset;

        if (width === '') {
          width = bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0];
        }

        if (height === '') {
          height = bounds[3] - Math.min(0, bounds[1]) + 2 * pathOffset[1];
        }

        if (this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
          height = Math.ceil(height * width / (bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0]));
        }

        return [width, height].map(Math.ceil);
      }
    }, {
      kind: "get",
      decorators: [_utils.flow],
      key: "originalRect",
      value: function value() {
        var svg = this.svg;

        if (svg) {
          var bounds = svg.bounds,
              offset = this.pathOffset;

          var _this$offsetSize = (0, _slicedToArray2.default)(this.offsetSize, 2),
              width = _this$offsetSize[0],
              height = _this$offsetSize[1],
              _this$attr = this.attr('anchor'),
              _this$attr2 = (0, _slicedToArray2.default)(_this$attr, 2),
              anchorX = _this$attr2[0],
              anchorY = _this$attr2[1];

          var rect = [0, 0, width, height],
              offsetX = Math.min(0, bounds[0]),
              offsetY = Math.min(0, bounds[1]);
          rect[0] = offsetX - offset[0] - anchorX * (width + offsetX - 2 * offset[0]);
          rect[1] = offsetY - offset[1] - anchorY * (height + offsetY - 2 * offset[1]);
          return rect;
        }

        return (0, _get2.default)((0, _getPrototypeOf3.default)(Path.prototype), "originalRect", this);
      }
    }, {
      kind: "method",
      key: "pointCollision",
      value: function value(evt) {
        var bounding = this.attr('bounding');

        if ((0, _get2.default)((0, _getPrototypeOf3.default)(Path.prototype), "pointCollision", this).call(this, evt) || bounding !== 'auto' && bounding !== 'box' && bounding !== 'path' && bounding !== 0) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;
          if (offsetX == null && offsetY == null) return true;
          var svg = this.svg;

          if (svg) {
            var bounds = svg.bounds;
            offsetX += Math.min(0, bounds[0]);
            offsetY += Math.min(0, bounds[1]);
          }

          evt.targetPaths = this.findPath(offsetX, offsetY);

          if (bounding !== 'box' && !(bounding === 'auto' && (this.attr('borderWidth') > 0 || this.attr('bgcolor') || this.attr('gradients').bgcolor))) {
            return evt.targetPaths.length > 0;
          }

          return true;
        }

        return false;
      }
    }, {
      kind: "method",
      key: "render",
      value: function value(t, drawingContext) {
        (0, _get2.default)((0, _getPrototypeOf3.default)(Path.prototype), "render", this).call(this, t, drawingContext);
        var d = this.attr('d'),
            lineWidth = this.attr('lineWidth'),
            lineCap = this.attr('lineCap'),
            lineJoin = this.attr('lineJoin'),
            lineDash = this.attr('lineDash'),
            flexible = this.attr('flexible');

        if (d) {
          var svg = this.svg;

          var _svg$bounds = (0, _slicedToArray2.default)(svg.bounds, 4),
              ox = _svg$bounds[0],
              oy = _svg$bounds[1],
              ow = _svg$bounds[2],
              oh = _svg$bounds[3];

          var _this$pathOffset = (0, _slicedToArray2.default)(this.pathOffset, 2),
              px = _this$pathOffset[0],
              py = _this$pathOffset[1];

          var _this$contentSize = (0, _slicedToArray2.default)(this.contentSize, 2),
              w = _this$contentSize[0],
              h = _this$contentSize[1];

          if ((w < ow || h < oh) && this.attr('clipOverflow')) {
            drawingContext.beginPath();
            drawingContext.rect(0, 0, w, h);
            drawingContext.clip();
          }

          if (flexible) {
            svg.save();
            var sw = w / (ow - Math.min(0, ox) + 2 * px);
            svg.scale(sw, sw);
            ox *= sw;
            oy *= sw;
            px *= sw;
            py *= sw;
          }

          if (ox < 0 || oy < 0) {
            drawingContext.translate(-Math.min(0, ox), -Math.min(0, oy));
          }

          drawingContext.translate(px, py);
          svg.beginPath().to(drawingContext);

          if (flexible) {
            svg.restore();
          }

          drawingContext.lineWidth = lineWidth;
          drawingContext.lineCap = lineCap;
          drawingContext.lineJoin = lineJoin;

          if (lineDash != null) {
            drawingContext.setLineDash(lineDash);
            var lineDashOffset = this.attr('lineDashOffset');
            drawingContext.lineDashOffset = lineDashOffset;
          }

          var fillColor = (0, _utils.findColor)(drawingContext, this, 'fillColor');

          if (fillColor) {
            drawingContext.fillStyle = fillColor;
          }

          var strokeColor = (0, _utils.findColor)(drawingContext, this, 'strokeColor');

          if (!strokeColor && !fillColor) {
            strokeColor = (0, _utils.parseColorString)('black');
          }

          if (strokeColor) {
            drawingContext.strokeStyle = strokeColor;
          }

          if (fillColor) {
            drawingContext.fill();
          }

          if (strokeColor) {
            drawingContext.stroke();
          }
        }
      }
    }]
  };
}, _basesprite.default);
exports.default = Path;