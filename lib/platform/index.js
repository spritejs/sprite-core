'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointInPath = exports.platform = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.getSvgPath = getSvgPath;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPoints = require('point-at-length');

var platform = exports.platform = {
  isBrowser: false
};

function getSvgPath(d) {
  var points = getPoints(d);
  return {
    getPointAtLength: function getPointAtLength(len) {
      var _points$at = points.at(len),
          _points$at2 = (0, _slicedToArray3.default)(_points$at, 2),
          x = _points$at2[0],
          y = _points$at2[1];

      return { x: x, y: y };
    },
    getTotalLength: function getTotalLength() {
      return points.length();
    },
    getAttribute: function getAttribute(val) {
      if (val === 'd') return d;
      return null;
    }
  };
}

var pointInPath = require('./point-in-path');
exports.pointInPath = pointInPath;