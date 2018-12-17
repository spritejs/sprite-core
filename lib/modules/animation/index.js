"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _basesprite = _interopRequireDefault(require("../../core/basesprite"));

var _animation = _interopRequireDefault(require("./animation"));

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

    var animation = new _animation.default(this, frames, timing, setter);
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
  }
});