"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeline = exports.cancelAnimationFrame = exports.requestAnimationFrame = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _spriteAnimator = require("sprite-animator");

var _requestAnimationFrame, _cancelAnimationFrame;

if (typeof global.requestAnimationFrame === 'undefined') {
  _requestAnimationFrame = function _requestAnimationFrame(fn) {
    return setTimeout(function () {
      fn(Date.now());
    }, 16);
  };

  _cancelAnimationFrame = function _cancelAnimationFrame(id) {
    return clearTimeout(id);
  };
} else {
  _requestAnimationFrame = global.requestAnimationFrame;
  _cancelAnimationFrame = global.cancelAnimationFrame;
}

var steps = new Map();
var timerId;
var currentTime = Date.now();

var requestAnimationFrame = function requestAnimationFrame(step) {
  var id = Symbol('requestId');
  steps.set(id, step);

  if (timerId == null) {
    if (steps.size === 1) {
      currentTime = Date.now();
    }

    timerId = _requestAnimationFrame(function (t) {
      timerId = null;
      currentTime = Date.now();
      (0, _toConsumableArray2.default)(steps).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            id = _ref2[0],
            callback = _ref2[1];

        callback(t);
        steps.delete(id);
      });
    });
  }

  return id;
};

exports.requestAnimationFrame = requestAnimationFrame;

var cancelAnimationFrame = function cancelAnimationFrame(id) {
  steps.delete(id);

  if (!steps.size && timerId) {
    _cancelAnimationFrame(timerId);

    timerId = null;
  }
};

exports.cancelAnimationFrame = cancelAnimationFrame;
var timeline = new _spriteAnimator.Timeline({
  nowtime: function nowtime() {
    return steps.size ? currentTime : Date.now();
  }
});
exports.timeline = timeline;