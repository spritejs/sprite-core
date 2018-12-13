"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _svgPathToCanvas = _interopRequireDefault(require("svg-path-to-canvas"));

var _spriteMath = require("sprite-math");

var _attr = _interopRequireDefault(require("./attr"));

var _utils = require("./utils");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class;

var SpriteAttr = (_dec = (0, _utils.parseValue)(_utils.parseStringFloat, _utils.oneOrTwoValues), _dec2 = (0, _utils.relative)('width'), _dec3 = (0, _utils.relative)('height'), _dec4 = (0, _utils.relative)('width'), _dec5 = (0, _utils.relative)('height'), _dec6 = (0, _utils.parseValue)(_utils.parseStringInt), _dec7 = (0, _utils.parseValue)(_utils.parseColorString), _dec8 = (0, _utils.parseValue)(parseFloat), _dec9 = (0, _utils.relative)('width'), _dec10 = (0, _utils.relative)('height'), _dec11 = (0, _utils.relative)('width'), _dec12 = (0, _utils.relative)('height'), _dec13 = (0, _utils.parseValue)(_utils.parseStringInt), _dec14 = (0, _utils.parseValue)(_utils.parseStringInt, _utils.fourValuesShortCut), _dec15 = (0, _utils.parseValue)(parseFloat), _dec16 = (0, _utils.parseValue)(parseFloat), _dec17 = (0, _utils.parseValue)(parseFloat), _dec18 = (0, _utils.parseValue)(parseFloat), _dec19 = (0, _utils.parseValue)(parseFloat), _dec20 = (0, _utils.parseValue)(parseFloat), _dec21 = (0, _utils.parseValue)(_utils.parseStringTransform), _dec22 = (0, _utils.parseValue)(_utils.parseStringFloat), _dec23 = (0, _utils.parseValue)(parseFloat), _dec24 = (0, _utils.parseValue)(_utils.parseStringFloat, _utils.oneOrTwoValues), _dec25 = (0, _utils.parseValue)(parseInt), _dec26 = (0, _utils.parseValue)(parseFloat), _dec27 = (0, _utils.parseValue)(parseFloat), _dec28 = (0, _utils.parseValue)(parseFloat), _dec29 = (0, _utils.parseValue)(parseInt), _dec30 = (0, _utils.parseValue)(_utils.parseStringInt, _utils.fourValuesShortCut), _dec31 = (0, _utils.parseValue)(parseFloat), _dec32 = (0, _utils.parseValue)(parseFloat), _dec33 = (0, _utils.parseValue)(parseFloat), _dec34 = (0, _utils.parseValue)(parseFloat), (_class =
/*#__PURE__*/
function (_NodeAttr) {
  (0, _inherits2.default)(SpriteAttr, _NodeAttr);

  function SpriteAttr(subject) {
    var _this;

    (0, _classCallCheck2.default)(this, SpriteAttr);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SpriteAttr).call(this, subject));

    _this.setDefault({
      anchor: [0, 0],
      enableCache: false,
      x: 0,
      y: 0,
      opacity: 1,
      width: '',
      height: '',
      layoutX: 0,
      layoutY: 0,
      layoutWidth: '',
      layoutHeight: '',
      bgcolor: '',
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      order: 0,
      position: '',
      alignSelf: '',
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      transform: 'matrix(1,0,0,1,0,0)',
      transformOrigin: '',
      transformMatrix: [1, 0, 0, 1, 0, 0],
      border: {
        width: 0,
        color: 'rgba(0,0,0,0)',
        style: 'solid'
      },
      // border: [0, 'rgba(0,0,0,0)'],
      borderRadius: 0,
      boxSizing: 'content-box',
      dashOffset: 0,
      display: '',
      padding: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      zIndex: 0,
      offsetRotate: 'auto',
      gradients: {},
      offsetDistance: 0,
      filter: '',
      // filter: {blur, ...}
      shadow: '',
      // shadow: {color = 'rgba(0,0,0,1)', blur = 1[, offset]}
      bgimage: '',
      clipOverflow: true
    });

    Object.defineProperty((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), '__reflowTag', {
      writable: true,
      value: false
    });
    return _this;
  }

  (0, _createClass2.default)(SpriteAttr, [{
    key: "clearFlow",
    value: function clearFlow() {
      this.__reflowTag = true;
      return this;
    }
  }, {
    key: "clearLayout",
    value: function clearLayout() {
      this.__clearLayout = true;
      return this;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(SpriteAttr.prototype), "set", this).call(this, key, value); // auto reflow

      if (key === 'width' || key === 'height' || key === 'layoutWidth' || key === 'layoutHeight' || key === 'display' || key === 'anchor' || key === 'border' || key === 'padding' || key === 'boxSizing' || key === 'margin' || key === 'flexBasis' || key === 'flex') {
        this.__reflowTag = true;
      }
    }
  }, {
    key: "merge",
    value: function merge(attrs) {
      var _this2 = this;

      if (typeof attrs === 'string') {
        attrs = JSON.parse(attrs);
      }

      Object.entries(attrs).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (_this2.getDefaultValue(key) !== value) {
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
        }
      });
      return this;
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var attrs = this.getAttributes();
      delete attrs.id;
      var offsetAngle = this.get('offsetAngle');
      if (offsetAngle != null) attrs.offsetAngle = offsetAngle;
      var offsetPoint = this.get('offsetPoint');
      if (offsetPoint != null) attrs.offsetPoint = offsetPoint;
      return JSON.stringify(attrs);
    }
  }, {
    key: "resetOffset",
    value: function resetOffset() {
      var offsetPath = this.get('offsetPath');
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
    key: "enableCache",
    set: function set(val) {
      return this.set('enableCache', val);
    }
  }, {
    key: "anchor",
    set: function set(val) {
      this.clearLayout();
      this.set('anchor', val);
    }
  }, {
    key: "display",
    set: function set(val) {
      this.set('display', val);
    }
  }, {
    key: "layoutX",
    set: function set(val) {
      this.set('layoutX', val);
    }
  }, {
    key: "layoutY",
    set: function set(val) {
      this.set('layoutY', val);
    }
  }, {
    key: "x",
    set: function set(val) {
      this.set('x', val);
    }
  }, {
    key: "y",
    set: function set(val) {
      this.set('y', val);
    }
  }, {
    key: "pos",
    set: function set(val) {
      if (val == null) {
        val = [0, 0];
      }

      var _val = val,
          _val2 = (0, _slicedToArray2.default)(_val, 2),
          x = _val2[0],
          y = _val2[1];

      this.x = x;
      this.y = y;
    },
    get: function get() {
      return [this.x, this.y];
    }
  }, {
    key: "bgcolor",
    set: function set(val) {
      this.set('bgcolor', val);
    }
  }, {
    key: "opacity",
    set: function set(val) {
      this.set('opacity', val);
    }
  }, {
    key: "width",
    set: function set(val) {
      this.set('width', val);
    }
  }, {
    key: "height",
    set: function set(val) {
      this.set('height', val);
    }
  }, {
    key: "layoutWidth",
    set: function set(val) {
      this.set('layoutWidth', val);
    }
  }, {
    key: "layoutHeight",
    set: function set(val) {
      this.set('layoutHeight', val);
    }
  }, {
    key: "size",
    set: function set(val) {
      if (val == null) {
        val = ['', ''];
      }

      var _val3 = val,
          _val4 = (0, _slicedToArray2.default)(_val3, 2),
          width = _val4[0],
          height = _val4[1];

      this.width = width;
      this.height = height;
    },
    get: function get() {
      return [this.width, this.height];
    }
  }, {
    key: "border",
    set: function set(val) {
      if (val == null) {
        this.set('border', null);
        return;
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
      this.set('border', val);
    }
  }, {
    key: "padding",
    set: function set(val) {
      this.set('padding', val);
    }
  }, {
    key: "paddingTop",
    set: function set(val) {
      this.setAttrIndex('padding', val, 0);
    },
    get: function get() {
      return this.get('padding')[0];
    }
  }, {
    key: "paddingRight",
    set: function set(val) {
      this.setAttrIndex('padding', val, 1);
    },
    get: function get() {
      return this.get('padding')[1];
    }
  }, {
    key: "paddingBottom",
    set: function set(val) {
      this.setAttrIndex('padding', val, 2);
    },
    get: function get() {
      return this.get('padding')[2];
    }
  }, {
    key: "paddingLeft",
    set: function set(val) {
      this.setAttrIndex('padding', val, 3);
    },
    get: function get() {
      return this.get('padding')[3];
    }
  }, {
    key: "borderRadius",
    set: function set(val) {
      this.set('borderRadius', val);
    }
  }, {
    key: "boxSizing",
    set: function set(val) {
      this.set('boxSizing', val);
    }
  }, {
    key: "dashOffset",
    set: function set(val) {
      this.set('dashOffset', val);
    } // transform attributes

  }, {
    key: "transform",
    set: function set(val) {
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
        this.set('transformMatrix', val);
        this.set('transform', "matrix(".concat(val, ")"));
      } else {
        this.set('transformMatrix', [1, 0, 0, 1, 0, 0]);
        var transformStr = [];
        Object.entries(val).forEach(function (_ref3) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];

          if (key === 'matrix' && Array.isArray(value)) {
            _this3.set('transformMatrix', new _spriteMath.Matrix(value).m);
          } else {
            _this3[key] = value;
          }

          transformStr.push("".concat(key, "(").concat(value, ")"));
        });
        this.set('transform', transformStr.join(' '));
      }
    }
  }, {
    key: "transformOrigin",
    set: function set(val) {
      this.set('transformOrigin', val);
    }
  }, {
    key: "rotate",
    set: function set(val) {
      var delta = this.get('rotate') - val;
      this.set('rotate', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix')).rotate(-delta);
      this.set('transformMatrix', transform.m);
    }
  }, {
    key: "scale",
    set: function set(val) {
      val = (0, _utils.oneOrTwoValues)(val).map(function (v) {
        if (Math.abs(v) > 0.001) {
          return v;
        }

        return 1 / v > 0 ? 0.001 : -0.001;
      });
      var oldVal = this.get('scale') || [1, 1];
      var delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
      this.set('scale', val);
      var offsetAngle = this.get('offsetAngle');

      if (offsetAngle) {
        this.rotate -= offsetAngle;
      }

      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));
      transform.scale.apply(transform, delta);
      this.set('transformMatrix', transform.m);

      if (offsetAngle) {
        this.rotate += offsetAngle;
      }
    }
  }, {
    key: "translate",
    set: function set(val) {
      var oldVal = this.get('translate') || [0, 0];
      var delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
      this.set('translate', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));
      transform.translate.apply(transform, delta);
      this.set('transformMatrix', transform.m);
    }
  }, {
    key: "skew",
    set: function set(val) {
      var _ref5, _transform$multiply;

      var oldVal = this.get('skew') || [0, 0];

      var invm = (_ref5 = new _spriteMath.Matrix()).skew.apply(_ref5, (0, _toConsumableArray2.default)(oldVal)).inverse();

      this.set('skew', val);
      var transform = new _spriteMath.Matrix(this.get('transformMatrix'));

      (_transform$multiply = transform.multiply(invm)).skew.apply(_transform$multiply, (0, _toConsumableArray2.default)(val));

      this.set('transformMatrix', transform.m);
    }
  }, {
    key: "zIndex",
    set: function set(val) {
      this.set('zIndex', val);
      var subject = this.subject;

      if (subject.parent) {
        subject.parent.sortedChildNodes = (0, _utils.sortOrderedSprites)(subject.parent.childNodes);
      }
    }
    /**
      linearGradients : {
        bgcolor: {
          direction: 30,  //angle，[0,360)
          rect: [x, y, w, h],
          vector: [x1, y1, x2, y2], // direction/rect or from/to
          colors: [
            {offset: 0, color: 'red'},
            {offset: 1, color: 'black'}
          ]
        }
      }
     */

  }, {
    key: "linearGradients",
    set: function set(val)
    /* istanbul ignore next  */
    {
      this.gradients = val;
    },
    get: function get() {
      return this.gradients;
    }
    /**
      gradients : {
        bgcolor: {
          direction: 30,  //angle，[0,360)
          rect: [x, y, w, h],  // rect + direction or vector
          vector: [x1, y1, r1, x2, y2, r2], // vector.length -> linear or radial
          colors: [
            {offset: 0, color: 'red'},
            {offset: 1, color: 'black'}
          ]
        }
      }
     */

  }, {
    key: "gradients",
    set: function set(val) {
      this.set('gradients', val);
    }
  }, {
    key: "offsetPath",
    set: function set(val) {
      var offsetPath = new _svgPathToCanvas.default(val);
      this.set('offsetPath', offsetPath.d);
      this.saveObj('offsetPath', offsetPath);
      this.resetOffset();
    }
  }, {
    key: "offsetDistance",
    set: function set(val) {
      this.set('offsetDistance', val);
      this.resetOffset();
    }
  }, {
    key: "offsetRotate",
    set: function set(val) {
      if (typeof val === 'string' && val !== 'auto' && val !== 'reverse') {
        val = parseFloat(val);
      }

      this.set('offsetRotate', val);
      this.resetOffset();
    }
  }, {
    key: "filter",
    set: function set(val) {
      this.set('filter', val);
    }
  }, {
    key: "shadow",
    set: function set(val) {
      this.set('shadow', val);
    }
  }, {
    key: "flexGrow",
    set: function set(val) {
      this.clearLayout();
      this.set('flexGrow', val);
    }
  }, {
    key: "flexShrink",
    set: function set(val) {
      this.clearLayout();
      this.set('flexShrink', val);
    }
  }, {
    key: "flexBasis",
    set: function set(val) {
      this.clearLayout();

      if (val && val !== 'auto') {
        val = parseFloat(val);
      }

      this.set('flexBasis', val);
    }
  }, {
    key: "flex",
    set: function set(val) {
      if (val != null && val !== 'initial') {
        if (val === 'auto') {
          this.flexGrow = 1;
          this.flexShrink = 1;
          this.flexBasis = 'auto';
        } else if (val === 'none') {
          this.flexGrow = 0;
          this.flexShrink = 0;
          this.flexBasis = 'auto';
        } else if (typeof val === 'string') {
          var values = val.trim().split(/\s+/);
          this.flexGrow = values[0];
          this.flexShrink = values[1];
          this.flexBasis = values[2];
        } else {
          this.flexGrow = val;
          this.flexShrink = 1;
          this.flexBasis = 'auto';
        }
      } else {
        this.flexGrow = 0;
        this.flexShrink = 1;
        this.flexBasis = 'auto';
      }
    },
    get: function get() {
      return "".concat(this.flexGrow, " ").concat(this.flexShrink, " ").concat(this.flexBasis);
    }
  }, {
    key: "order",
    set: function set(val) {
      this.clearLayout();
      this.set('order', val);
    }
  }, {
    key: "position",
    set: function set(val) {
      this.clearLayout();
      this.set('position', val);
    }
  }, {
    key: "alignSelf",
    set: function set(val) {
      this.clearLayout();
      this.set('alignSelf', val);
    }
  }, {
    key: "margin",
    set: function set(val) {
      this.clearLayout();
      this.set('margin', val);
    }
  }, {
    key: "marginTop",
    set: function set(val) {
      this.setAttrIndex('margin', val, 0);
    },
    get: function get() {
      return this.get('margin')[0];
    }
  }, {
    key: "marginRight",
    set: function set(val) {
      this.setAttrIndex('margin', val, 1);
    },
    get: function get() {
      return this.get('margin')[1];
    }
  }, {
    key: "marginBottom",
    set: function set(val) {
      this.setAttrIndex('margin', val, 2);
    },
    get: function get() {
      return this.get('margin')[2];
    }
  }, {
    key: "marginLeft",
    set: function set(val) {
      this.setAttrIndex('margin', val, 3);
    },
    get: function get() {
      return this.get('margin')[3];
    }
    /*
      {
        src: image | url,
        display: 'none' | 'repeatX' | 'repeatY' | 'repeat' | 'stretch' | 'center' | '.9',
        offset: [x, y],
        clip9: [paddingTop, paddingRight, paddingBottom, paddingLeft],
      }
    */

  }, {
    key: "bgimage",
    set: function set(val) {
      if (val && val.clip9) val.clip9 = (0, _utils.fourValuesShortCut)(val.clip9);

      if (val && !val.image && this.subject.loadBgImage) {
        val = this.subject.loadBgImage(val);
      }

      this.set('bgimage', val);
    }
  }, {
    key: "clipOverflow",
    set: function set(val) {
      this.set('clipOverflow', !!val);
    }
  }]);
  return SpriteAttr;
}(_attr.default), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "enableCache", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "enableCache"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "anchor", [_dec, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "anchor"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "display", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "display"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutX", [_utils.attr, _dec2, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "layoutX"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutY", [_utils.attr, _dec3, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "layoutY"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "x", [_utils.attr, _dec4, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "x"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "y", [_utils.attr, _dec5, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "y"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "pos", [_dec6, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "pos"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "bgcolor", [_dec7, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "bgcolor"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "opacity", [_dec8, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "opacity"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "width", [_utils.attr, _dec9], Object.getOwnPropertyDescriptor(_class.prototype, "width"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "height", [_utils.attr, _dec10], Object.getOwnPropertyDescriptor(_class.prototype, "height"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutWidth", [_utils.attr, _dec11], Object.getOwnPropertyDescriptor(_class.prototype, "layoutWidth"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutHeight", [_utils.attr, _dec12], Object.getOwnPropertyDescriptor(_class.prototype, "layoutHeight"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "size", [_dec13, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "size"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "border", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "border"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "padding", [_dec14, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "padding"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "paddingTop", [_dec15, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "paddingTop"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "paddingRight", [_dec16, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "paddingRight"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "paddingBottom", [_dec17, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "paddingBottom"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "paddingLeft", [_dec18, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "paddingLeft"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "borderRadius", [_dec19, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "borderRadius"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "boxSizing", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "boxSizing"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "dashOffset", [_dec20, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "dashOffset"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "transform", [_dec21, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "transform"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "transformOrigin", [_dec22, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "transformOrigin"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "rotate", [_dec23, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "rotate"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "scale", [_dec24, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "scale"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "translate", [_utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "translate"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "skew", [_utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "skew"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "zIndex", [_dec25, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "zIndex"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "linearGradients", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "linearGradients"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "gradients", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "gradients"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "offsetPath", [_utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "offsetPath"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "offsetDistance", [_dec26, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "offsetDistance"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "offsetRotate", [_utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "offsetRotate"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "filter", [_utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "filter"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "shadow", [_utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "shadow"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "flexGrow", [_dec27, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "flexGrow"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "flexShrink", [_dec28, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "flexShrink"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "flexBasis", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "flexBasis"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "flex", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "flex"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "order", [_dec29, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "order"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "position", [_utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "position"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "alignSelf", [_utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "alignSelf"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "margin", [_dec30, _utils.attr, _utils.cachable], Object.getOwnPropertyDescriptor(_class.prototype, "margin"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "marginTop", [_dec31, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "marginTop"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "marginRight", [_dec32, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "marginRight"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "marginBottom", [_dec33, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "marginBottom"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "marginLeft", [_dec34, _utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "marginLeft"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "bgimage", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "bgimage"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "clipOverflow", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "clipOverflow"), _class.prototype)), _class));
exports.default = SpriteAttr;