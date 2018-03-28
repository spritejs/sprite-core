'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSvgPath = getSvgPath;
var platform = exports.platform = {
  isBrowser: true
};

function getSvgPath(d) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  return path;
}