import {createCanvas} from 'canvas';
import {Sprite, Layer} from '../../src';
var test = require('ava');

// remove bellow to enable tests
test('', t=>t.true(true));
test = function(){}

const getDefaultEffectTiming = () => ({
  delay: 0,
  endDelay: 0,
  fill: 'auto', // "none" | "forwards" | "backwards" | "both" | "auto";
  iterationStart: 0.0,
  iterations: 1.0,
  duration: 'auto', // 规范 https://drafts.csswg.org/web-animations/#the-effecttiming-dictionaries
  direction: 'normal', //"normal" | "reverse" | "alternate" | "alternate-reverse";
  easing: 'linear',
})

const getEffectTimming1 = () => ({
  delay: 1000,
  endDelay: 1000,
  fill: 'forwards', // "none" | "forwards" | "backwards" | "both" | "auto";
  iterationStart: .5,
  iterations: 2,
  duration: 10000, // 规范 https://drafts.csswg.org/web-animations/#the-effecttiming-dictionaries
  direction: 'reverse', //"normal" | "reverse" | "alternate" | "alternate-reverse";
  easing: 'ease-in-out', // ease, ease-in, ease-out, ease-in-out, cubic-bezier() ...
});

// 规范 https://drafts.csswg.org/web-animations/#the-computedeffecttiming-dictionary
const getComputedEffectTiming1 = ()=> ({
  endTime:,
  activeDuration: ,
  localTime:
  progress:
  currentIteration:
});

function createSprite() {
  const context = createCanvas(600, 600).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  s.attr({
    size: [50, 50],
    pos: [300, 300],
    bgcolor: 'transparent',
  });
  layer.append(s);
  return s;
}

function getAnimation(timing) {
  var s = createSprite();
  return s.animate(
    [
      {rotate: 360},
    ], timing);
}

test('animation.effect return an AnimationEffect', (t) => {
  var effect = getAnimation().effect;
  t.true(!!effect);
});

test('getTimming should return a default EffectTiming when KeyframeAnimationOptions is not specified', t => {
  var animation = getAnimation();
  t.deepEqual(animation.effect.getTiming(), getDefaultEffectTiming());
});

test('getTimming should return a the right EffectTiming', t => {
  var animation = getAnimation(getEffectTimming1());
  t.deepEqual(animation.effect.getTiming(), getEffectTimming1());
});

test('getComputedTiming should return the right EffectTiming dictionary', t => {
  var animation = getAnimation(getEffectTimming1());
  t.deepEqual(animation.effect.getTiming(), getEffectTimming1());
})

