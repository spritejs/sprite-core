import {Animator, Effects} from 'sprite-animator';
import {requestAnimationFrame, cancelAnimationFrame} from 'fast-animation-frame';
import {Matrix} from 'sprite-math';
import {parseColor, parseStringTransform} from 'sprite-utils';

const defaultEffect = Effects.default;

function arrayEffect(arr1, arr2, p, start, end) {
  if(Array.isArray(arr1)) {
    return arr1.map((o, i) => defaultEffect(o, arr2[i], p, start, end));
  }
  return defaultEffect(arr1, arr2, p, start, end);
}

function objectEffect(obj1, obj2, p, start, end) {
  const t1 = Object.assign({}, obj2, obj1),
    t2 = Object.assign({}, obj1, obj2);

  Object.entries(t1).forEach(([key, value]) => {
    t1[key] = arrayEffect(value, t2[key], p, start, end);
  });

  return t1;
}

function getTransformMatrix(trans) {
  let matrix = new Matrix();
  Object.entries(trans).forEach(([key, val]) => {
    if(key === 'matrix') {
      matrix = new Matrix(val);
    } else if(Array.isArray(val)) {
      matrix[key](...val);
    } else if(key === 'scale') {
      matrix.scale(val, val);
    } else {
      matrix[key](val);
    }
  });
  return matrix.m;
}

function arrayEqual(arr1, arr2) {
  if(arr1.length !== arr2.length) return false;
  for(let i = 0; i < arr1.length; i++) {
    if(arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function transformEffect(trans1, trans2, p, start, end) {
  trans1 = parseStringTransform(trans1);
  trans2 = parseStringTransform(trans2);

  if(!arrayEqual(Object.keys(trans1), Object.keys(trans2))) {
    trans1 = getTransformMatrix(trans1);
    trans2 = getTransformMatrix(trans2);
  }

  if(Array.isArray(trans1) || Array.isArray(trans2)) {
    return arrayEffect(trans1, trans2, p, start, end);
  }
  return objectEffect(trans1, trans2, p, start, end);
}

function colorEffect(color1, color2, p, start, end) {
  const c1 = parseColor(color1);
  const c2 = parseColor(color2);

  if(c1.model === c2.model) {
    c1.value = arrayEffect(c1.value, c2.value, p, start, end).map((c, i) => {
      return i < 3 ? Math.round(c) : Math.round(c * 100) / 100;
    });
    return c1.str;
  }

  return defaultEffect(color1, color2, p, start, end);
}

Object.assign(Effects, {
  arrayEffect,
  transformEffect,
  colorEffect,
  pos: arrayEffect,
  size: arrayEffect,
  transform: transformEffect,
  bgcolor: colorEffect,
  border(v1, v2, p, start, end) {
    return {
      width: defaultEffect(v1.width, v2.width, p, start, end),
      color: colorEffect(v1.color, v2.color, p, start, end),
      style: arrayEffect(v1.style, v2.style, p, start, end),
    };
  },
  scale: arrayEffect,
  translate: arrayEffect,
  skew: arrayEffect,
  color: colorEffect,
  strokeColor: colorEffect,
  fillColor: colorEffect,
});

export default class extends Animator {
  constructor(sprite, frames, timing) {
    super(sprite.attr(), frames, timing);
    this.target = sprite;
  }

  get playState() {
    if(!this.target.parent) {
      return 'idle';
    }
    return super.playState;
  }

  get finished() {
    // set last frame when finished
    // because while the web page is not focused
    // requestAnimationFrame will not trigger while deferTime of
    // the animator is still running
    const sprite = this.target;
    return super.finished.then(() => {
      sprite.attr(this.frame);
      cancelAnimationFrame(this.requestId);
    });
  }

  finish() {
    super.finish();
    cancelAnimationFrame(this.requestId);
    const sprite = this.target;
    sprite.attr(this.frame);
  }

  play() {
    if(!this.target.parent || this.playState === 'running') {
      return;
    }

    super.play();

    const sprite = this.target;

    sprite.attr(this.frame);

    const that = this;
    this.ready.then(() => {
      sprite.attr(that.frame);
      that.requestId = requestAnimationFrame(function update() {
        const target = that.target;
        if(typeof document !== 'undefined'
          && document.documentElement
          && document.documentElement.contains
          && target.layer
          && target.layer.canvas
          && !document.documentElement.contains(target.layer.canvas)) {
          // if dom element has been removed stop animation.
          // it usually occurs in single page applications.
          that.cancel();
          return;
        }
        const playState = that.playState;
        sprite.attr(that.frame);
        if(playState === 'idle') return;
        if(playState === 'running') {
          that.requestId = requestAnimationFrame(update);
        } else if(playState === 'paused' || playState === 'pending' && that.timeline.currentTime < 0) {
          // playbackRate < 0 will cause playState reset to pending...
          that.ready.then(() => {
            sprite.attr(that.frame);
            that.requestId = requestAnimationFrame(update);
          });
        }
      });
    });
  }

  cancel(preserveState = false) {
    cancelAnimationFrame(this.requestId);
    if(preserveState) {
      this.target.attr(this.frame);
      super.cancel();
    } else {
      super.cancel();
      this.target.attr(this.frame);
    }
  }
}
