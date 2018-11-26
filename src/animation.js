import {Animator, Effects} from 'sprite-animator';
import {Matrix} from 'sprite-math';
import {parseColor, parseStringFloat, parseStringTransform} from './utils';
import {requestAnimationFrame, cancelAnimationFrame} from './helpers/fast-animation-frame';

const _defaultEffect = Effects.default;

const defaultEffect = (from, to, p, start, end) => {
  let unitFrom = 'px',
    unitTo = 'px';
  let matchFrom = null,
    matchTo = null;

  const exp = /^([\d.]+)(%|rh|rw)$/i;
  if(typeof from === 'string') {
    matchFrom = exp.exec(from);
    if(matchFrom) {
      unitFrom = matchFrom[2];
    }
  }

  if(typeof to === 'string') {
    matchTo = exp.exec(to);
    if(matchTo) {
      unitTo = matchTo[2];
    }
  }

  if(unitFrom === unitTo) {
    if(matchFrom) from = parseFloat(matchFrom[1]);
    if(matchTo) to = parseFloat(matchTo[1]);
  }

  const v = _defaultEffect(from, to, p, start, end);
  return unitFrom !== 'px' ? `${v}${unitFrom}` : v;
};

Effects.default = defaultEffect;

function arrayEffect(arr1, arr2, p, start, end) {
  if(typeof arr1 === 'string') {
    arr1 = parseStringFloat(arr1);
  }
  if(typeof arr2 === 'string') {
    arr2 = parseStringFloat(arr2);
  }
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
  padding: arrayEffect,
  margin: arrayEffect,
  color: colorEffect,
  strokeColor: colorEffect,
  fillColor: colorEffect,
});

export default class extends Animator {
  constructor(sprite, frames, timing, setter) {
    super(sprite.attr(), frames, timing);
    this.target = sprite;
    this.setter = setter || function (frame, target) { target.attr(frame) };
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
    return super.finished.then(() => {
      const that = this;
      return new Promise((resolve) => {
        function update() {
          that.setter(that.frame, that.target);
          const playState = that.playState;
          if(playState === 'finished' || playState === 'idle') {
            cancelAnimationFrame(that.requestId);
            resolve();
          } else {
            requestAnimationFrame(update);
          }
        }
        update();
      });
    });
  }

  finish() { // finish should change attrs synchronously
    super.finish();
    cancelAnimationFrame(this.requestId);
    this.setter(this.frame, this.target);
  }

  play() {
    if(!this.target.parent || this.playState === 'running') {
      return;
    }

    super.play();

    this.setter(this.frame, this.target);

    const that = this;
    this.ready.then(() => {
      that.setter(that.frame, that.target);
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
        that.setter(that.frame, that.target);
        if(playState === 'idle') return;
        if(playState === 'running') {
          that.requestId = requestAnimationFrame(update);
        } else if(playState === 'paused' || playState === 'pending' && that.timeline.currentTime < 0) {
          // playbackRate < 0 will cause playState reset to pending...
          that.ready.then(() => {
            that.setter(that.frame, that.target);
            that.requestId = requestAnimationFrame(update);
          });
        }
      });
    });
  }

  cancel(preserveState = false) {
    cancelAnimationFrame(this.requestId);
    if(preserveState) {
      this.setter(this.frame, this.target);
      super.cancel();
    } else {
      super.cancel();
      this.setter(this.frame, this.target);
    }
  }
}
