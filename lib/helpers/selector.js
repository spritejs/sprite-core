"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = querySelectorLimits;
function querySelectorLimits(elements, functor) {
  var limits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

  var nodeList = [];
  for (var i = 0; i < elements.length; i++) {
    var node = elements[i];
    if (functor(node)) {
      nodeList.push(node);
      if (limits === nodeList.length) {
        break;
      }
    }
  }
  return nodeList;
}