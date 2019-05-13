"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _spriteAnimator = require("sprite-animator");

var _spriteMath = require("sprite-math");

var _utils = require("../../utils");

var _patheffect = _interopRequireDefault(require("./patheffect"));

var _fastAnimationFrame = require("../../helpers/fast-animation-frame");

var _defaultEffect = _spriteAnimator.Effects.default;

var defaultEffect = function defaultEffect(from, to, p, start, end) {
  var unitFrom = 'px',
      unitTo = 'px';
  var matchFrom = null,
      matchTo = null;
  var exp = /^([\d.]+)(%|rh|rw)$/i;

  if (typeof from === 'string') {
    matchFrom = exp.exec(from);

    if (matchFrom) {
      unitFrom = matchFrom[2];
    }
  }

  if (typeof to === 'string') {
    matchTo = exp.exec(to);

    if (matchTo) {
      unitTo = matchTo[2];
    }
  }

  if (unitFrom === unitTo) {
    if (matchFrom) from = parseFloat(matchFrom[1]);
    if (matchTo) to = parseFloat(matchTo[1]);
  }

  var v = _defaultEffect(from, to, p, start, end);

  return unitFrom !== 'px' ? "".concat(v).concat(unitFrom) : v;
};

_spriteAnimator.Effects.default = defaultEffect;

function arrayEffect(arr1, arr2, p, start, end) {
  if (typeof arr1 === 'string') {
    arr1 = (0, _utils.parseStringFloat)(arr1);
  }

  if (typeof arr2 === 'string') {
    arr2 = (0, _utils.parseStringFloat)(arr2);
  }

  if (Array.isArray(arr1)) {
    return arr1.map(function (o, i) {
      return defaultEffect(o, arr2[i] != null ? arr2[i] : arr2, p, start, end);
    });
  }

  return defaultEffect(arr1, arr2, p, start, end);
}

function objectEffect(obj1, obj2, p, start, end) {
  var t1 = Object.assign({}, obj2, obj1),
      t2 = Object.assign({}, obj1, obj2);
  Object.entries(t1).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    t1[key] = arrayEffect(value, t2[key], p, start, end);
  });
  return t1;
}

function getTransformMatrix(trans) {
  var matrix = new _spriteMath.Matrix();
  Object.entries(trans).forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    if (key === 'matrix') {
      matrix = new _spriteMath.Matrix(val);
    } else if (Array.isArray(val)) {
      var _matrix;

      (_matrix = matrix)[key].apply(_matrix, (0, _toConsumableArray2.default)(val));
    } else if (key === 'scale') {
      matrix.scale(val, val);
    } else {
      matrix[key](val);
    }
  });
  return matrix.m;
}

function arrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function transformEffect(trans1, trans2, p, start, end) {
  trans1 = (0, _utils.parseStringTransform)(trans1);
  trans2 = (0, _utils.parseStringTransform)(trans2);

  if (!arrayEqual(Object.keys(trans1), Object.keys(trans2))) {
    trans1 = getTransformMatrix(trans1);
    trans2 = getTransformMatrix(trans2);
  }

  if (Array.isArray(trans1) || Array.isArray(trans2)) {
    return arrayEffect(trans1, trans2, p, start, end);
  }

  return objectEffect(trans1, trans2, p, start, end);
}

function colorEffect(color1, color2, p, start, end) {
  var c1 = (0, _utils.parseColor)(color1);
  var c2 = (0, _utils.parseColor)(color2);

  if (c1.model === c2.model) {
    c1.value = arrayEffect(c1.value, c2.value, p, start, end).map(function (c, i) {
      return i < 3 ? Math.round(c) : Math.round(c * 100) / 100;
    });
    return c1.str;
  }

  return defaultEffect(color1, color2, p, start, end);
}

function pathEffect(path1, path2, p, start, end) {
  path1 = (0, _utils.createSvgPath)(path1);
  path2 = (0, _utils.createSvgPath)(path2);
  return (0, _patheffect.default)(path1.d, path2.d, p, start, end);
}

Object.assign(_spriteAnimator.Effects, {
  arrayEffect: arrayEffect,
  transformEffect: transformEffect,
  colorEffect: colorEffect,
  pathEffect: pathEffect,
  pos: arrayEffect,
  size: arrayEffect,
  transform: transformEffect,
  bgcolor: colorEffect,
  border: function border(v1, v2, p, start, end) {
    if (Array.isArray(v2)) {
      v2 = {
        width: v2[0],
        color: v2[1],
        style: v2[2] || 'solid'
      };
    }

    return {
      width: defaultEffect(v1.width, v2.width, p, start, end),
      color: colorEffect(v1.color, v2.color, p, start, end),
      style: arrayEffect(v1.style, v2.style, p, start, end)
    };
  },
  scale: arrayEffect,
  translate: arrayEffect,
  skew: arrayEffect,
  padding: arrayEffect,
  margin: arrayEffect,
  color: colorEffect,
  strokeColor: colorEffect,
  fillColor: colorEffect,
  d: _patheffect.default,
  path: pathEffect,
  clip: pathEffect
});

var _default =
/*#__PURE__*/
function (_Animator) {
  (0, _inherits2.default)(_default, _Animator);

  function _default(sprite, frames, timing, setter) {
    var _this;

    (0, _classCallCheck2.default)(this, _default);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_default).call(this, sprite.attr(), frames, timing));
    _this.target = sprite;

    _this.setter = setter || function (frame, target) {
      target.attr(frame);
    };

    return _this;
  }

  (0, _createClass2.default)(_default, [{
    key: "finish",
    value: function finish() {
      // finish should change attrs synchronously
      (0, _get2.default)((0, _getPrototypeOf2.default)(_default.prototype), "finish", this).call(this);
      (0, _fastAnimationFrame.cancelAnimationFrame)(this.requestId);
      this.setter(this.frame, this.target);
    }
  }, {
    key: "play",
    value: function play() {
      if (!this.target.parent || this.playState === 'running') {
        return;
      }

      (0, _get2.default)((0, _getPrototypeOf2.default)(_default.prototype), "play", this).call(this);
      this.setter(this.frame, this.target);
      var that = this;
      this.ready.then(function () {
        that.setter(that.frame, that.target);
        that.requestId = (0, _fastAnimationFrame.requestAnimationFrame)(function update() {
          var target = that.target;

          if (typeof document !== 'undefined' && document.documentElement && document.documentElement.contains && target.layer && target.layer.canvas && !document.documentElement.contains(target.layer.canvas)) {
            // if dom element has been removed stop animation.
            // it usually occurs in single page applications.
            that.cancel();
            return;
          }

          var playState = that.playState;
          that.setter(that.frame, that.target);
          if (playState === 'idle') return;

          if (playState === 'running') {
            that.requestId = (0, _fastAnimationFrame.requestAnimationFrame)(update);
          } else if (playState === 'paused' || playState === 'pending' && that.timeline.currentTime < 0) {
            // playbackRate < 0 will cause playState reset to pending...
            that.ready.then(function () {
              that.setter(that.frame, that.target);
              that.requestId = (0, _fastAnimationFrame.requestAnimationFrame)(update);
            });
          }
        });
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {
      var preserveState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      (0, _fastAnimationFrame.cancelAnimationFrame)(this.requestId);

      if (preserveState) {
        this.setter(this.frame, this.target);
        (0, _get2.default)((0, _getPrototypeOf2.default)(_default.prototype), "cancel", this).call(this);
      } else {
        (0, _get2.default)((0, _getPrototypeOf2.default)(_default.prototype), "cancel", this).call(this);
        this.setter(this.frame, this.target);
      }
    }
  }, {
    key: "playState",
    get: function get() {
      if (!this.target.parent) {
        return 'idle';
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(_default.prototype), "playState", this);
    }
  }, {
    key: "finished",
    get: function get() {
      var _this2 = this;

      // set last frame when finished
      // because while the web page is not focused
      // requestAnimationFrame will not trigger while deferTime of
      // the animator is still running
      return (0, _get2.default)((0, _getPrototypeOf2.default)(_default.prototype), "finished", this).then(function () {
        var that = _this2;
        return new Promise(function (resolve) {
          function update() {
            that.setter(that.frame, that.target);
            var playState = that.playState;

            if (playState === 'finished' || playState === 'idle') {
              (0, _fastAnimationFrame.cancelAnimationFrame)(that.requestId);
              resolve();
            } else {
              (0, _fastAnimationFrame.requestAnimationFrame)(update);
            }
          }

          update();
        });
      });
    }
  }]);
  return _default;
}(_spriteAnimator.Animator);

exports.default = _default;