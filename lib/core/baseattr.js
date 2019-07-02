"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _svgPathToCanvas = _interopRequireDefault(require("svg-path-to-canvas"));

var _spriteMath = require("sprite-math");

var _attr = _interopRequireDefault(require("./attr"));

var _utils = require("../utils");

var cache = true,
    reflow = true,
    relayout = true;

function parseBorderValue(val) {
  if (val == null) {
    return null;
  }

  if (typeof val === 'number' || typeof val === 'string') {
    val = {
      width: parseFloat(val)
    };
  } else if (Array.isArray(val)) {
    val = {
      width: parseFloat(val[0]),
      color: (0, _utils.parseColorString)(val[1] || '#000')
    };
  } else {
    val.width = parseFloat(val.width);
    val.color = (0, _utils.parseColorString)(val.color || '#000');
  }

  val = Object.assign({
    width: 1,
    color: (0, _utils.parseColorString)('#000'),
    style: 'solid'
  }, val);
  return val;
}

var SpriteAttr = (0, _decorate2.default)(null, function (_initialize, _NodeAttr) {
  var SpriteAttr =
  /*#__PURE__*/
  function (_NodeAttr2) {
    (0, _inherits2.default)(SpriteAttr, _NodeAttr2);

    function SpriteAttr(subject) {
      var _this;

      (0, _classCallCheck2.default)(this, SpriteAttr);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SpriteAttr).call(this, subject));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      Object.defineProperty((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), '__reflowTag', {
        writable: true,
        value: false
      });
      return _this;
    }

    return SpriteAttr;
  }(_NodeAttr);

  return {
    F: SpriteAttr,
    d: [{
      kind: "method",
      key: "clearFlow",
      value: function value() {
        this.__reflowTag = true;
        return this;
      }
    }, {
      kind: "method",
      key: "set",
      value: function value(key, _value) {
        var isQuiet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        (0, _get2.default)((0, _getPrototypeOf2.default)(SpriteAttr.prototype), "set", this).call(this, key, _value, isQuiet); // auto reflow

        if (key === 'margin') {
          this.__reflowTag = true;
        }
      }
    }, {
      kind: "method",
      key: "merge",
      value: function value(attrs) {
        var _this2 = this;

        if (typeof attrs === 'string') {
          attrs = JSON.parse(attrs);
        }

        Object.entries(attrs).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          if (key !== 'offsetPath' && key !== 'offsetDistance' && key !== 'offsetRotate' && key !== 'offsetAngle' && key !== 'offsetPoint') {
            // this[key] = value;
            _this2.subject.attr(key, value);
          } else if (key === 'offsetPath') {
            var offsetPath = new _svgPathToCanvas.default(value);

            _this2.set('offsetPath', offsetPath.d);

            _this2.saveObj('offsetPath', offsetPath);
          } else {
            _this2.set(key, value);
          }
        });
        return this;
      }
    }, {
      kind: "method",
      key: "serialize",
      value: function value() {
        var attrs = this.getAttributes();
        delete attrs.id;
        var offsetAngle = this.get('offsetAngle');
        if (offsetAngle != null) attrs.offsetAngle = offsetAngle;
        var offsetPoint = this.get('offsetPoint');
        if (offsetPoint != null) attrs.offsetPoint = offsetPoint;
        return JSON.stringify(attrs);
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "enableCache",
      value: function value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat, _utils.oneOrTwoValues), (0, _utils.attr)({
        cache: cache,
        relayout: relayout,
        reflow: reflow
      })],
      key: "anchor",
      value: function value() {
        return [0, 0];
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "display",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      }), (0, _utils.relative)('width')],
      key: "layoutX",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      }), (0, _utils.relative)('height')],
      key: "layoutY",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      }), (0, _utils.relative)('width')],
      key: "x",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      }), (0, _utils.relative)('height')],
      key: "y",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringInt), _utils.attr, (0, _utils.composit)(['x', 'y'])],
      key: "pos",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr],
      key: "bgcolor",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        cache: cache
      })],
      key: "opacity",
      value: function value() {
        return 1;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      }), (0, _utils.relative)('width')],
      key: "width",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      }), (0, _utils.relative)('height')],
      key: "height",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      }), (0, _utils.relative)('width')],
      key: "layoutWidth",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      }), (0, _utils.relative)('height')],
      key: "layoutHeight",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringInt), _utils.attr, (0, _utils.composit)(['width', 'height'])],
      key: "size",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseInt), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "borderWidth",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "borderColor",
      value: function value() {
        return 'rgba(0,0,0,0)';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "borderStyle",
      value: function value() {
        return 'solid';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseBorderValue), _utils.attr, (0, _utils.composit)({
        width: 'borderWidth',
        color: 'borderColor',
        style: 'borderStyle'
      })],
      key: "border",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "paddingTop",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "paddingRight",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "paddingBottom",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "paddingLeft",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringInt, _utils.fourValuesShortCut), _utils.attr, (0, _utils.composit)(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'])],
      key: "padding",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat, _utils.eightValuesShortCut), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "borderRadius",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "boxSizing",
      value: function value() {
        return 'content-box';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "dashOffset",
      value: function value() {
        return 0;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseStringTransform), (0, _utils.attr)({
        cache: cache,
        value: 'matrix(1,0,0,1,0,0)'
      })],
      key: "transform",
      value: function value(val) {
        var _this3 = this;

        /*
          rotate: 0,
          scale: [1, 1],
          translate: [0, 0],
          skew: [0, 0],
          matrix: [1,0,0,1,0,0],
         */
        Object.assign(this.__attr, {
          rotate: 0,
          scale: [1, 1],
          translate: [0, 0],
          skew: [0, 0]
        });

        if (Array.isArray(val)) {
          this.transformMatrix = val;
          this.set('transform', "matrix(".concat(val, ")"));
        } else {
          this.transformMatrix = [1, 0, 0, 1, 0, 0];
          var transformStr = [];
          Object.entries(val).forEach(function (_ref3) {
            var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            if (key === 'matrix' && Array.isArray(value)) {
              _this3.transformMatrix = new _spriteMath.Matrix(value).m;
            } else {
              _this3[key] = value;
            }

            transformStr.push("".concat(key, "(").concat(value, ")"));
          });
          this.set('transform', transformStr.join(' '));
        }
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat), (0, _utils.attr)({
        cache: cache
      })],
      key: "transformOrigin",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      })],
      key: "transformMatrix",
      value: function value() {
        return [1, 0, 0, 1, 0, 0];
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        cache: cache,
        value: 0
      })],
      key: "rotate",
      value: function value(val) {
        var delta = this.rotate - val;
        this.set('rotate', val);
        var transform = new _spriteMath.Matrix(this.transformMatrix).rotate(-delta);
        this.transformMatrix = transform.m;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat, _utils.oneOrTwoValues), (0, _utils.attr)({
        cache: cache,
        value: [1, 1]
      })],
      key: "scale",
      value: function value(val) {
        val = (0, _utils.oneOrTwoValues)(val).map(function (v) {
          if (Math.abs(v) > 0.001) {
            return v;
          }

          return 1 / v > 0 ? 0.001 : -0.001;
        });
        var oldVal = this.scale || [1, 1];
        var delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
        this.set('scale', val);
        var offsetAngle = this.get('offsetAngle');

        if (offsetAngle) {
          this.rotate -= offsetAngle;
        }

        var transform = new _spriteMath.Matrix(this.transformMatrix);
        transform.scale.apply(transform, delta);
        this.transformMatrix = transform.m;

        if (offsetAngle) {
          this.rotate += offsetAngle;
        }
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        cache: cache,
        value: [0, 0]
      })],
      key: "translate",
      value: function value(val) {
        var oldVal = this.translate || [0, 0];
        var delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
        this.set('translate', val);
        var transform = new _spriteMath.Matrix(this.transformMatrix);
        transform.translate.apply(transform, delta);
        this.transformMatrix = transform.m;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        cache: cache,
        value: [0, 0]
      })],
      key: "skew",
      value: function value(val) {
        var _ref5, _transform$multiply;

        var oldVal = this.skew || [0, 0];

        var invm = (_ref5 = new _spriteMath.Matrix()).skew.apply(_ref5, (0, _toConsumableArray2.default)(oldVal)).inverse();

        this.set('skew', val);
        var transform = new _spriteMath.Matrix(this.transformMatrix);

        (_transform$multiply = transform.multiply(invm)).skew.apply(_transform$multiply, (0, _toConsumableArray2.default)(val));

        this.transformMatrix = transform.m;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseInt), (0, _utils.attr)({
        cache: cache,
        value: 0
      })],
      key: "zIndex",
      value: function value(val) {
        this.set('zIndex', val);
        var subject = this.subject;

        if (subject.parent) {
          subject.parent.sortedChildNodes = (0, _utils.sortOrderedSprites)(subject.parent.childNodes);
        }
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "linearGradients",
      value: function value(val)
      /* istanbul ignore next  */
      {
        this.gradients = val;
      }
    }, {
      kind: "get",
      key: "linearGradients",
      value: function value() {
        return this.gradients;
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "gradients",
      value: function value() {
        return {};
      }
    }, {
      kind: "method",
      key: "resetOffset",
      value: function value() {
        var offsetPath = this.offsetPath;
        var dis = this.offsetDistance;

        if (offsetPath) {
          var pathObj = this.loadObj('offsetPath');

          if (pathObj) {
            offsetPath = pathObj;
          } else {
            offsetPath = new _svgPathToCanvas.default(offsetPath);
            this.saveObj('offsetPath', offsetPath);
          }
        }

        if (offsetPath != null) {
          var len = dis * offsetPath.getTotalLength();

          var _offsetPath$getPointA = offsetPath.getPointAtLength(len),
              _offsetPath$getPointA2 = (0, _slicedToArray2.default)(_offsetPath$getPointA, 2),
              x = _offsetPath$getPointA2[0],
              y = _offsetPath$getPointA2[1];

          var angle = this.offsetRotate;

          if (angle === 'auto' || angle === 'reverse') {
            if (angle === 'reverse' && len === 0) {
              len = 1;
            }

            var _offsetPath$getPointA3 = offsetPath.getPointAtLength(angle === 'auto' ? len + 1 : len - 1),
                _offsetPath$getPointA4 = (0, _slicedToArray2.default)(_offsetPath$getPointA3, 2),
                x1 = _offsetPath$getPointA4[0],
                y1 = _offsetPath$getPointA4[1];

            if (x1 === x && y1 === y) {
              // last point
              angle = this.get('offsetAngle');
            } else {
              angle = 180 * Math.atan2(y1 - y, x1 - x) / Math.PI;
            }

            if (this.offsetRotate === 'reverse') {
              angle = -angle;
            }
          }

          var offsetAngle = this.get('offsetAngle');

          if (offsetAngle) {
            this.rotate -= offsetAngle;
          }

          this.set('offsetAngle', angle);
          this.rotate += angle;
          var offsetPoint = this.get('offsetPoint');

          if (offsetPoint) {
            this.pos = [this.x - offsetPoint[0], this.y - offsetPoint[1]];
          }

          this.set('offsetPoint', [x, y]);
          this.pos = [this.x + x, this.y + y];
        }
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        cache: cache
      })],
      key: "offsetPath",
      value: function value(val) {
        var offsetPath = new _svgPathToCanvas.default(val);
        this.set('offsetPath', offsetPath.d);
        this.saveObj('offsetPath', offsetPath);
        this.resetOffset();
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        cache: cache,
        value: 0
      })],
      key: "offsetDistance",
      value: function value(val) {
        this.set('offsetDistance', val);
        this.resetOffset();
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        cache: cache,
        value: 'auto'
      })],
      key: "offsetRotate",
      value: function value(val) {
        if (typeof val === 'string' && val !== 'auto' && val !== 'reverse') {
          val = parseFloat(val);
        }

        this.set('offsetRotate', val);
        this.resetOffset();
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      })],
      key: "filter",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      })],
      key: "shadow",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache,
        relayout: relayout
      })],
      key: "position",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow,
        relayout: relayout,
        cache: cache
      })],
      key: "marginTop",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow,
        relayout: relayout,
        cache: cache
      })],
      key: "marginRight",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow,
        relayout: relayout,
        cache: cache
      })],
      key: "marginBottom",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow,
        relayout: relayout,
        cache: cache
      })],
      key: "marginLeft",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringInt, _utils.fourValuesShortCut), _utils.attr, (0, _utils.composit)(['marginTop', 'marginRight', 'marginBottom', 'marginLeft'])],
      key: "margin",
      value: void 0
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        value: ''
      })],
      key: "bgimage",
      value: function value(val) {
        if (val && val.clip9) val.clip9 = (0, _utils.fourValuesShortCut)(val.clip9);

        if (val && !val.image && this.subject.loadBgImage) {
          val = this.subject.loadBgImage(val);
        }

        this.set('bgimage', val);
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "clipOverflow",
      value: function value() {
        return true;
      }
    }]
  };
}, _attr.default);
exports.default = SpriteAttr;