"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseColor = parseColor;
exports.parseColorString = parseColorString;
exports.parseStringTransform = parseStringTransform;
exports.parseValuesString = parseValuesString;
exports.praseString = praseString;
exports.parseStringInt = parseStringInt;
exports.parseStringFloat = parseStringFloat;
exports.oneOrTwoValues = oneOrTwoValues;
exports.fourValuesShortCut = fourValuesShortCut;
exports.eightValuesShortCut = eightValuesShortCut;
exports.rectVertices = rectVertices;
exports.appendUnit = appendUnit;
exports.sortOrderedSprites = sortOrderedSprites;
exports.notice = notice;
exports.generateID = generateID;
exports.sizeToPixel = sizeToPixel;
exports.Color = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var colorString = require('color-string');

var Color =
/*#__PURE__*/
function () {
  function Color(color) {
    (0, _classCallCheck2.default)(this, Color);

    if (typeof color === 'string') {
      var _colorString$get = colorString.get(color || 'rgba(0,0,0,1)'),
          model = _colorString$get.model,
          value = _colorString$get.value;

      this.model = model;
      this.value = value;
    } else {
      this.model = color.model;
      this.value = color.value;
    }
  }

  (0, _createClass2.default)(Color, [{
    key: "toString",
    value: function toString() {
      var _this$value = (0, _slicedToArray2.default)(this.value, 4),
          a = _this$value[0],
          b = _this$value[1],
          c = _this$value[2],
          d = _this$value[3];

      var model = this.model;

      if (model === 'rgb') {
        return "".concat(model, "a(").concat(a, ",").concat(b, ",").concat(c, ",").concat(d, ")");
      }

      return "".concat(model, "a(").concat(a, ",").concat(b, "%,").concat(c, "%,").concat(d, ")");
    }
  }, {
    key: "str",
    get: function get() {
      return String(this);
    }
  }]);
  return Color;
}();

exports.Color = Color;

function parseColor(color) {
  return new Color(color);
}

function parseColorString(color) {
  if (color && typeof color === 'string' && color !== 'inherit') {
    return parseColor(color).toString();
  }

  return color;
}

function parseStringTransform(str) {
  if (typeof str !== 'string') return str;
  var rules = str.match(/(?:^|\s)+((?:scale|rotate|translate|skew|matrix)\([^()]+\))/g);
  var ret = {};

  if (rules) {
    rules.forEach(function (rule) {
      var matched = rule.match(/(scale|rotate|translate|skew|matrix)\(([^()]+)\)/);

      var _matched = (0, _slicedToArray2.default)(matched, 3),
          m = _matched[1],
          v = _matched[2];

      if (m === 'rotate') {
        ret[m] = parseStringFloat(v)[0];
      } else {
        ret[m] = parseStringFloat(v);
      }
    });
  }

  return ret;
}

function parseValuesString(str, parser) {
  if (typeof str === 'string' && str !== '' && str !== 'inherit') {
    var values = str.split(/[\s,]+/g);
    return values.map(function (v) {
      var ret = parser ? parser(v) : v;
      return Number.isNaN(ret) ? v : ret;
    });
  }

  return str;
}

function praseString(str) {
  return parseValuesString(str);
}

function parseStringInt(str) {
  return parseValuesString(str, parseInt);
}

function parseStringFloat(str) {
  return parseValuesString(str, function (v) {
    if (v === 'center') return 0.5;
    if (v === 'left' || v === 'top') return 0;
    if (v === 'right' || v === 'bottom') return 1;
    return parseFloat(v);
  });
}

function oneOrTwoValues(val) {
  if (!Array.isArray(val)) {
    return [val, val];
  }

  if (val.length === 1) {
    return [val[0], val[0]];
  }

  return val;
}

function fourValuesShortCut(val) {
  if (!Array.isArray(val)) {
    return [val, val, val, val];
  }

  if (val.length === 1) {
    return [val[0], val[0], val[0], val[0]];
  }

  if (val.length === 2) {
    return [val[0], val[1], val[0], val[1]];
  }

  return (0, _toConsumableArray2.default)(val).concat([0, 0, 0, 0]).slice(0, 4);
}

function eightValuesShortCut(val) {
  if (!Array.isArray(val)) {
    return [val, val, val, val, val, val, val, val];
  }

  if (val.length === 1) {
    return eightValuesShortCut(val[0]);
  }

  if (val.length === 2) {
    return [val[0], val[1], val[0], val[1], val[0], val[1], val[0], val[1]];
  }

  if (val.length === 4) {
    return [val[0], val[1], val[2], val[3], val[0], val[1], val[2], val[3]];
  }

  return (0, _toConsumableArray2.default)(val).concat([0, 0, 0, 0, 0, 0, 0, 0]).slice(0, 8);
}

function rectVertices(rect) {
  var _rect = (0, _slicedToArray2.default)(rect, 4),
      x = _rect[0],
      y = _rect[1],
      w = _rect[2],
      h = _rect[3];

  return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
}

function appendUnit(value) {
  var defaultUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';

  if (value === '') {
    return value;
  }

  if (typeof value === 'string' && Number.isNaN(Number(value))) {
    return value;
  }

  return value + defaultUnit;
}

function sortOrderedSprites(sprites) {
  var reversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _toConsumableArray2.default)(sprites).sort(function (a, b) {
    if (reversed) {
      var _ref = [b, a];
      a = _ref[0];
      b = _ref[1];
    }

    if (a.zIndex === b.zIndex) {
      return a.zOrder - b.zOrder;
    }

    return a.zIndex - b.zIndex;
  });
}

var noticed = new Set();

function notice(msg) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warn';

  if (typeof console !== 'undefined' && !noticed.has(msg)) {
    console[level](msg); // eslint-disable-line no-console

    noticed.add(msg);
  }
}

var IDMap = new WeakMap();

function generateID(obj) {
  if (IDMap.has(obj)) {
    return IDMap.get(obj);
  }

  var id = Math.random().toString(36).slice(2);
  IDMap.set(obj, id);
  return id;
}

function sizeToPixel(value, defaultWidth) {
  // eslint-disable-line complexity
  if (typeof value === 'string') {
    var matched = value.trim().match(/^([\d.]+)(px|pt|pc|in|cm|mm|em|ex|rem|q|vw|vh|vmax|vmin|%)$/);

    if (matched) {
      value = {
        size: parseFloat(matched[1]),
        unit: matched[2]
      };
    } else {
      value = {
        size: parseInt(value, 10),
        unit: 'px'
      };
    }
  }

  var _value = value,
      size = _value.size,
      unit = _value.unit;

  if (unit === 'pt') {
    size /= 0.75;
  } else if (unit === 'pc') {
    size *= 16;
  } else if (unit === 'in') {
    size *= 96;
  } else if (unit === 'cm') {
    size *= 96.0 / 2.54;
  } else if (unit === 'mm') {
    size *= 96.0 / 25.4;
  } else if (unit === 'em' || unit === 'rem' || unit === 'ex') {
    if (!defaultWidth && typeof getComputedStyle === 'function' && typeof document !== 'undefined') {
      var root = getComputedStyle(document.documentElement).fontSize;
      defaultWidth = sizeToPixel(root, 16);
    }

    size *= defaultWidth;
    if (unit === 'ex') size /= 2;
  } else if (unit === 'q') {
    size *= 96.0 / 25.4 / 4;
  } else if (unit === 'vw' || unit === 'vh') {
    if (typeof document !== 'undefined') {
      var val = unit === 'vw' ? document.documentElement.clientWidth : document.documentElement.clientHeight;
      size *= val / 100;
    }
  } else if (unit === 'vmax' || unit === 'vmin') {
    if (typeof document !== 'undefined') {
      var width = document.documentElement.clientWidth;
      var height = document.documentElement.clientHeight;

      if (unit === 'vmax') {
        size *= Math.max(width, height) / 100;
      } else {
        size *= Math.min(width, height) / 100;
      }
    }
  }

  return size;
}