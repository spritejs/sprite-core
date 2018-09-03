import Timeline from 'sprite-timeline';

const isBrowser = typeof document !== 'undefined'
  && document.documentElement
  && document.documentElement.contains;

class AnimationScheduler {
  _animations = []
  add(animation) {
    this._animations.push(animation);
    this.scheduleAnimation();
  }


  scheduleAnimation() {
    if(this.requestId) return;
    this.requestId = requestAnimationFrame(() => {
      var ntime = Timeline.nowtime();
      this.updateFrame(ntime);
    });
  }

  updateFrame(ntime) {
    var nullAnimationCount = 0;
    var scheduleNext = false;
    for(var i = 0; i < this._animations.length; i++) {
      let animation = this._animations[i];
      if(animation === null) {
        nullAnimationCount++;
        continue;
      }
      let sprite = animation.target;

      if(isBrowser
        && sprite.layer
        && sprite.layer.canvas
        && !document.documentElement.contains(sprite.layer.canvas)) {
        // if dom element has been removed stop animation.
        // it usually occurs in single page applications.
        animation.cancel();
        this._animations[i] = null;
        continue;
      }
      const playState = animation.getPlayState(ntime);
      sprite.attr(animation.getFrame(ntime));
      if(playState === 'idle') {
        this._animations[i] = null;
        continue;
      }
      if(playState === 'running') {
        scheduleNext = true;
      } else if(playState === 'paused' || playState === 'pending' && animation.timeline.getCurrentTime(ntime) < 0) {
        // playbackRate < 0 will cause playState reset to pending...
        this.add(animation)
      }
    }
    // if there are more than 10 animation is finished we do a cleaning, avoid GC.
    if(nullAnimationCount > 10) {
      this._animations = this._animations.filter(i => i !== null);
    }
    if(scheduleNext) {
      this.requestId = null;
      this.scheduleAnimation();
    }
  }
}

export default new AnimationScheduler();