'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSvgPath = getSvgPath;
var getPoints = require('point-at-length');

var platform = exports.platform = {
  isBrowser: false
};

function getSvgPath(d) {
  var points = getPoints(d);
  return {
    getPointAtLength: function getPointAtLength(len) {
      return points.at(len);
    },
    getTotalLength: function getTotalLength() {
      return points.length();
    }
  };
}

var pointInPath = require('./point-in-path');
exports.pointInPath = pointInPath;