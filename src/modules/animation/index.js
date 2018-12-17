import BaseSprite from '../../core/basesprite';
import Animation from './animation';

Object.assign(BaseSprite.prototype, {
  animate(frames, timing, isStyleAnim = false) {
    let setter = null;
    if(isStyleAnim) {
      setter = (frame, target) => {
        target.__attr.__styleTag = true;
        target.attr(frame);
        target.__attr.__styleTag = false;
      };
    }
    const animation = new Animation(this, frames, timing, setter);
    if(this.effects) animation.applyEffects(this.effects);
    if(this.layer) {
      animation.baseTimeline = this.layer.timeline;
      animation.play();
      animation.finished.then(() => {
        this.animations.delete(animation);
      });
    }
    this.animations.add(animation);
    return animation;
  },
});