import Timeline from 'sprite-timeline';

const isBrowser = typeof document !== 'undefined'
  && document.documentElement
  && document.documentElement.contains;

class AnimationScheduler {
  _animations = new Set()
  add(animation) {
    animation.ready.then(() => {
      this._animations.add(animation);
      animation.target.attr(animation.frame);
      this.scheduleAnimation();
    });
  }

  delete(animation) {
    this._animations.delete(animation);
  }

  scheduleAnimation() {
    if(this.requestId) return;
    this.requestId = requestAnimationFrame(this.updateFrame.bind(this));
  }

  updateFrame() {
    const ntime = Timeline.nowtime();
    var scheduleNext = false;
    this._animations.forEach(animation => {

      let sprite = animation.target;

      if(isBrowser
        && sprite.layer
        && sprite.layer.canvas
        && !document.documentElement.contains(sprite.layer.canvas)) {
        // if dom element has been removed stop animation.
        // it usually occurs in single page applications.
        animation.cancel();
        return this._animations.delete(animation);
      }
      const playState = animation.getPlayState(ntime);
      sprite.attr(animation.getFrame(ntime));
      if(playState === 'idle') {
        return this._animations.delete(animation);
      }
      if(playState === 'running') {
        scheduleNext = true;
      } else if(playState === 'paused' || playState === 'pending' && animation.timeline.getCurrentTime(ntime) < 0) {
        // playbackRate < 0 will cause playState reset to pending...
        this.add(animation)
      }
    })

    this.requestId = null;
    if(!scheduleNext) {
      return;
    }
    this.scheduleAnimation();
  }
}

export default new AnimationScheduler();