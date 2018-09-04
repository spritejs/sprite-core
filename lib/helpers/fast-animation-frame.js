'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeline = exports.cancelAnimationFrame = exports.requestAnimationFrame = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _spriteAnimator = require('sprite-animator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _requestAnimationFrame = void 0,
    _cancelAnimationFrame = void 0;

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

var steps = new _map2.default();
var timerId = void 0;

var currentTime = Date.now();

var requestAnimationFrame = function requestAnimationFrame(step) {
  var id = (0, _symbol2.default)('requestId');
  steps.set(id, step);

  if (timerId == null) {
    if (steps.size === 1) {
      currentTime = Date.now();
    }
    timerId = _requestAnimationFrame(function (t) {
      timerId = null;
      currentTime = Date.now();
      [].concat((0, _toConsumableArray3.default)(steps)).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            id = _ref2[0],
            callback = _ref2[1];

        callback(t);
        steps.delete(id);
      });
    });
  }
  return id;
};

var cancelAnimationFrame = function cancelAnimationFrame(id) {
  steps.delete(id);
  if (!steps.size && timerId) {
    _cancelAnimationFrame(timerId);
    timerId = null;
  }
};

var timeline = new _spriteAnimator.Timeline({
  nowtime: function nowtime() {
    return steps.size ? currentTime : Date.now();
  }
});

exports.requestAnimationFrame = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;
exports.timeline = timeline;