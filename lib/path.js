"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _utils = require("./utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _render = require("./helpers/render");

var _path = require("./helpers/path");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _class3, _temp;

var PathSpriteAttr = (_dec = (0, _utils.inherit)(1), _dec2 = (0, _utils.parseValue)(_utils.parseStringFloat), _dec3 = (0, _utils.parseValue)(parseFloat), _dec4 = (0, _utils.inherit)('butt'), _dec5 = (0, _utils.inherit)('miter'), _dec6 = (0, _utils.inherit)(''), _dec7 = (0, _utils.inherit)(''), _dec8 = (0, _utils.inherit)('box'), (_class =
/*#__PURE__*/
function (_BaseSprite$Attr) {
  (0, _inherits2.default)(PathSpriteAttr, _BaseSprite$Attr);

  function PathSpriteAttr(subject) {
    var _this;

    (0, _classCallCheck2.default)(this, PathSpriteAttr);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PathSpriteAttr).call(this, subject));

    _this.setDefault({
      lineWidth: 'inherit',
      lineDash: null,
      lineDashOffset: 0,
      lineCap: 'inherit',
      lineJoin: 'inherit',
      strokeColor: 'inherit',
      fillColor: 'inherit',
      bounding: 'inherit'
    });

    return _this;
  }

  (0, _createClass2.default)(PathSpriteAttr, [{
    key: "path",
    set: function set(val) {
      this.clearFlow();

      if (val) {
        val = typeof val === 'string' ? {
          d: val
        } : val;
        this.subject.svg = (0, _path.createSvgPath)(val);
        this.set('path', val);
      } else {
        this.subject.svg = null;
        this.set('path', null);
      }
    }
  }, {
    key: "d",
    set: function set(val) {
      if (val) {
        var path = this.get('path');

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
    },
    get: function get() {
      return this.path ? this.path.d : null;
    }
  }, {
    key: "lineWidth",
    set: function set(val) {
      if (typeof val === 'string') val = parseFloat(val);
      this.clearFlow();
      this.set('lineWidth', Math.round(val));
    }
  }, {
    key: "lineDash",
    set: function set(val) {
      if (typeof val === 'number') val = [val];
      this.set('lineDash', val);
    }
  }, {
    key: "lineDashOffset",
    set: function set(val) {
      this.set('lineDashOffset', val);
    }
    /**
      lineCap: butt|round|square
     */

  }, {
    key: "lineCap",
    set: function set(val) {
      this.set('lineCap', val);
    }
    /**
      lineJoin: miter|round|bevel
     */

  }, {
    key: "lineJoin",
    set: function set(val) {
      this.set('lineJoin', val);
    }
  }, {
    key: "strokeColor",
    set: function set(val) {
      this.set('strokeColor', (0, _utils.parseColorString)(val));
    }
  }, {
    key: "fillColor",
    set: function set(val) {
      this.set('fillColor', (0, _utils.parseColorString)(val));
    }
  }, {
    key: "flexible",
    set: function set(val) {
      this.clearFlow();
      this.set('flexible', val);
    }
  }, {
    key: "bounding",
    set: function set(val) {
      // box | path
      this.quietSet('bounding', val);
    }
  }, {
    key: "color",
    set: function set(val) {
      this.strokeColor = val;
    },
    get: function get() {
      return this.strokeColor;
    }
  }]);
  return PathSpriteAttr;
}(_basesprite.default.Attr), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "path", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "path"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "d", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "d"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "lineWidth", [_utils.attr, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "lineWidth"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "lineDash", [_dec2, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "lineDash"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "lineDashOffset", [_dec3, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "lineDashOffset"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "lineCap", [_utils.attr, _dec4], Object.getOwnPropertyDescriptor(_class.prototype, "lineCap"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "lineJoin", [_utils.attr, _dec5], Object.getOwnPropertyDescriptor(_class.prototype, "lineJoin"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "strokeColor", [_utils.attr, _dec6], Object.getOwnPropertyDescriptor(_class.prototype, "strokeColor"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "fillColor", [_utils.attr, _dec7], Object.getOwnPropertyDescriptor(_class.prototype, "fillColor"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "flexible", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "flexible"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "bounding", [_utils.attr, _dec8], Object.getOwnPropertyDescriptor(_class.prototype, "bounding"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "color", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "color"), _class.prototype)), _class));
var Path = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_BaseSprite) {
  (0, _inherits2.default)(Path, _BaseSprite);

  function Path(attr) {
    (0, _classCallCheck2.default)(this, Path);

    if (typeof attr === 'string') {
      attr = {
        d: attr
      };
    }

    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Path).call(this, attr));
  }

  (0, _createClass2.default)(Path, [{
    key: "getPointAtLength",
    value: function getPointAtLength(length) {
      if (this.svg) {
        return this.svg.getPointAtLength(length);
      }

      return [0, 0];
    }
  }, {
    key: "getPathLength",
    value: function getPathLength() {
      if (this.svg) {
        return this.svg.getTotalLength();
      }

      return 0;
    }
  }, {
    key: "findPath",
    value: function findPath(offsetX, offsetY) {
      var rect = this.originalRect;
      var pathOffset = this.pathOffset;

      if (this.svg && this.svg.isPointInPath(offsetX - rect[0] - pathOffset[0], offsetY - rect[1] - pathOffset[1])) {
        return [this.svg];
      }

      return [];
    }
  }, {
    key: "pointCollision",
    value: function pointCollision(evt) {
      if ((0, _get2.default)((0, _getPrototypeOf2.default)(Path.prototype), "pointCollision", this).call(this, evt)) {
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

        if (this.attr('bounding') === 'path') {
          return evt.targetPaths.length > 0;
        }

        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render(t, drawingContext) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Path.prototype), "render", this).call(this, t, drawingContext);
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

        var fillColor = (0, _render.findColor)(drawingContext, this, 'fillColor');

        if (fillColor) {
          drawingContext.fillStyle = fillColor;
        }

        var strokeColor = (0, _render.findColor)(drawingContext, this, 'strokeColor');

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
  }, {
    key: "path",
    set: function set(val) {
      this.attr('path', val);
    },
    get: function get() {
      return this.attr('path');
    }
  }, {
    key: "lineWidth",
    get: function get() {
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
    key: "pathOffset",
    get: function get() {
      var lw = Math.round(this.lineWidth);
      return [lw, lw];
    }
  }, {
    key: "pathSize",
    get: function get() {
      return this.svg ? this.svg.size : [0, 0];
    }
  }, {
    key: "contentSize",
    get: function get() {
      if (!this.svg) return (0, _get2.default)((0, _getPrototypeOf2.default)(Path.prototype), "contentSize", this);
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
    key: "originalRect",
    get: function get() {
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

      return (0, _get2.default)((0, _getPrototypeOf2.default)(Path.prototype), "originalRect", this);
    }
  }]);
  return Path;
}(_basesprite.default), (0, _defineProperty2.default)(_class3, "Attr", PathSpriteAttr), _temp), ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "contentSize", [_utils.flow], Object.getOwnPropertyDescriptor(_class2.prototype, "contentSize"), _class2.prototype), (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "originalRect", [_utils.flow], Object.getOwnPropertyDescriptor(_class2.prototype, "originalRect"), _class2.prototype)), _class2);
exports.default = Path;
Path.setAttributeEffects({
  d: _path.pathEffect,
  path: function path(path1, path2, p, start, end) {
    path1 = (0, _path.createSvgPath)(path1);
    path2 = (0, _path.createSvgPath)(path2);
    return (0, _path.pathEffect)(path1.d, path2.d, p, start, end);
  }
});