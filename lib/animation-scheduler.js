'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _spriteTimeline = require('sprite-timeline');

var _spriteTimeline2 = _interopRequireDefault(_spriteTimeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBrowser = typeof document !== 'undefined' && document.documentElement && document.documentElement.contains;

var AnimationScheduler = function () {
  function AnimationScheduler() {
    (0, _classCallCheck3.default)(this, AnimationScheduler);
    this._animations = [];
  }

  (0, _createClass3.default)(AnimationScheduler, [{
    key: 'add',
    value: function add(animation) {
      this._animations.push(animation);
      this.scheduleAnimation();
    }
  }, {
    key: 'scheduleAnimation',
    value: function scheduleAnimation() {
      var _this = this;

      if (this.requestId) return;
      this.requestId = requestAnimationFrame(function () {
        var ntime = _spriteTimeline2.default.nowtime();
        _this.updateFrame(ntime);
      });
    }
  }, {
    key: 'updateFrame',
    value: function updateFrame(ntime) {
      var nullAnimationCount = 0;
      var scheduleNext = false;
      for (var i = 0; i < this._animations.length; i++) {
        var animation = this._animations[i];
        if (animation === null) {
          nullAnimationCount++;
          continue;
        }
        var sprite = animation.target;

        if (isBrowser && sprite.layer && sprite.layer.canvas && !document.documentElement.contains(sprite.layer.canvas)) {
          // if dom element has been removed stop animation.
          // it usually occurs in single page applications.
          animation.cancel();
          this._animations[i] = null;
          continue;
        }
        var playState = animation.getPlayState(ntime);
        sprite.attr(animation.getFrame(ntime));
        if (playState === 'idle') {
          this._animations[i] = null;
          continue;
        }
        if (playState === 'running') {
          scheduleNext = true;
        } else if (playState === 'paused' || playState === 'pending' && animation.timeline.getCurrentTime(ntime) < 0) {
          // playbackRate < 0 will cause playState reset to pending...
          this.add(animation);
        }
      }
      // if there are more than 10 animation is finished we do a cleaning, avoid GC.
      if (nullAnimationCount > 10) {
        this._animations = this._animations.filter(function (i) {
          return i !== null;
        });
      }
      if (scheduleNext) {
        this.requestId = null;
        this.scheduleAnimation();
      }
    }
  }]);
  return AnimationScheduler;
}();

exports.default = new AnimationScheduler();