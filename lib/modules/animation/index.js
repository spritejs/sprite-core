"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _basesprite = _interopRequireDefault(require("../../core/basesprite"));

var _animation2 = _interopRequireDefault(require("./animation"));

Object.assign(_basesprite.default.prototype, {
  animate: function animate(frames, timing) {
    var _this = this;

    var isStyleAnim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var setter = null;

    if (isStyleAnim) {
      setter = function setter(frame, target) {
        target.__attr.__styleTag = true;
        target.attr(frame);
        target.__attr.__styleTag = false;
      };
    }

    var animation = new _animation2.default(this, frames, timing, setter);
    if (this.effects) animation.applyEffects(this.effects);

    if (this.layer) {
      animation.baseTimeline = this.layer.timeline;
      animation.play();
      animation.finished.then(function () {
        _this.animations.delete(animation);
      });
    }

    this.animations.add(animation);
    return animation;
  },
  transition: function transition(sec) {
    var _ref3;

    var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'linear';
    var isStyleAnim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var that = this,
        _animation = Symbol('animation');

    easing = easing || 'linear';
    var delay = 0;

    if ((0, _typeof2.default)(sec) === 'object') {
      delay = sec.delay || 0;
      sec = sec.duration;
    }

    return _ref3 = {}, (0, _defineProperty2.default)(_ref3, _animation, null), (0, _defineProperty2.default)(_ref3, "cancel", function cancel() {
      var preserveState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var animation = this[_animation];

      if (animation) {
        animation.cancel(preserveState);
      }
    }), (0, _defineProperty2.default)(_ref3, "end", function end() {
      var animation = this[_animation];

      if (animation && (animation.playState === 'running' || animation.playState === 'pending')) {
        animation.finish();
      }
    }), (0, _defineProperty2.default)(_ref3, "reverse", function reverse() {
      var animation = this[_animation];

      if (animation) {
        if (animation.playState === 'running' || animation.playState === 'pending') {
          animation.playbackRate = -animation.playbackRate;
        } else {
          var direction = animation.timing.direction;
          animation.timing.direction = direction === 'reverse' ? 'normal' : 'reverse';
          animation.play();
        }
      }

      return animation.finished;
    }), (0, _defineProperty2.default)(_ref3, "attr", function attr(prop, val) {
      this.end();

      if (typeof prop === 'string') {
        prop = (0, _defineProperty2.default)({}, prop, val);
      }

      Object.entries(prop).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (typeof value === 'function') {
          prop[key] = value(that.attr(key));
        }
      });
      this[_animation] = that.animate([prop], {
        duration: sec * 1000,
        delay: delay * 1000,
        fill: 'forwards',
        easing: easing
      }, isStyleAnim);
      return this[_animation].finished;
    }), _ref3;
  }
});