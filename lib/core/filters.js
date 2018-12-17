"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("../utils");

// http://www.runoob.com/cssref/css3-pr-filter.html
var _default = {
  blur: function blur(px) {
    return "blur(".concat((0, _utils.appendUnit)(px), ")");
  },
  brightness: function brightness(percent) {
    return "brightness(".concat(percent, ")");
  },
  contrast: function contrast(percent) {
    return "contrast(".concat(percent, ")");
  },
  dropShadow: function dropShadow(_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 4),
        offsetX = _ref2[0],
        offsetY = _ref2[1],
        shadowRadius = _ref2[2],
        color = _ref2[3];

    return "drop-shadow(".concat((0, _utils.appendUnit)(offsetX), " ").concat((0, _utils.appendUnit)(offsetY), " ").concat((0, _utils.appendUnit)(shadowRadius), " ").concat(color, ")");
  },
  grayscale: function grayscale(percent) {
    return "grayscale(".concat(percent, ")");
  },
  hueRotate: function hueRotate(value) {
    return "hue-rotate(".concat((0, _utils.appendUnit)(value, 'deg'), ")");
  },
  invert: function invert(percent) {
    return "invert(".concat(percent, ")");
  },
  opacity: function opacity(percent) {
    return "opacity(".concat(percent, ")");
  },
  saturate: function saturate(percent) {
    return "saturate(".concat(percent, ")");
  },
  sepia: function sepia(percent) {
    return "sepia(".concat(percent, ")");
  },
  url: function url(path) {
    return "url(".concat(path, ")");
  },
  compile: function compile() {
    var _this = this;

    var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.entries(filter).reduce(function (accumulator, curVal) {
      return accumulator.concat(_this[curVal[0]](curVal[1]));
    }, []).join(' ');
  }
};
exports.default = _default;