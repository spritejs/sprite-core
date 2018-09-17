import {createCanvas} from 'canvas';
import {Sprite, Layer} from '../../src';
var test = require('ava');

// 本次测试针对 web animation api 规范的 timing model
// 目前在 safari TP 版本可以运行通过
// 规范 https://drafts.csswg.org/web-animations/#the-computedeffecttiming-dictionary


// remove bellow to enable tests
test('', t => t.true(true));
test = function () {}

const getDefaultEffectTiming = () => ({
  delay: 0,
  endDelay: 0,
  fill: 'auto', // "none" | "forwards" | "backwards" | "both" | "auto"; 
  iterationStart: 0,
  iterations: 1,
  duration: 'auto', // 规范 https://drafts.csswg.org/web-animations/#the-effecttiming-dictionaries
  direction: 'normal', //"normal" | "reverse" | "alternate" | "alternate-reverse";
  easing: 'linear',
})

const getDefaultComputedTiming = currentTime => Object.assign(
  getDefaultEffectTiming(),
  {
    endTime: 0,
    activeDuration: 0,
    localTime: currentTime,
    progress: null,
    currentIteration: null
  })

const getEffectTimming1 = () => ({
  delay: 1000,
  endDelay: 1000,
  fill: 'forwards', // "none" | "forwards" | "backwards" | "both" | "auto";
  iterationStart: 0.5,
  iterations: 2.5,
  duration: 10000, // 规范 https://drafts.csswg.org/web-animations/#the-effecttiming-dictionaries
  direction: 'reverse', //"normal" | "reverse" | "alternate" | "alternate-reverse";
  easing: 'linear', // ease, ease-in, ease-out, ease-in-out, cubic-bezier() ...
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

test('getTimming() when KeyframeAnimationOptions is not specified', t => {
  var animation = getAnimation();
  t.deepEqual(animation.effect.timing, getDefaultEffectTiming());
});

test('getTimming()', t => {
  var animation = getAnimation(getEffectTimming1());
  t.deepEqual(animation.effect.timing, getEffectTimming1());
});

test('getComputedTiming() when KeyframeAnimationOptions is not specified', t => {
  var animation = getAnimation();
  animation.currentTime = 100;
  t.deepEqual(animation.effect.getComputedTiming(), getDefaultComputedTiming(100));

  animation.currentTime = 10000;
  t.deepEqual(animation.effect.getComputedTiming(), getDefaultComputedTiming(10000));
});

test('getComputedTiming().activeDuration', t => {
  var animation = getAnimation({
    iterationStart: 1,
    iterations: 3,
    duration: 10
  });
  t.is(animation.effect.getComputedTiming().activeDuration, 30);
});

test('getComputedTiming().endTime', t => {
  // const endTime = Math.max(0, timing.delay + timing.endDelay + activeDuration);

  var animation = getAnimation({
    delay: 10,
    endDelay: 10,
    iterations: 3,
    duration: 10
  });
  t.is(animation.effect.getComputedTiming().endTime, 50);

  animation = getAnimation({
    delay: -10,
    endDelay: -10,
    iterations: 3,
    duration: 10
  });
  t.is(animation.effect.getComputedTiming().endTime, 10);


  animation = getAnimation({
    delay: -30,
    endDelay: -10,
    iterations: 3,
    duration: 10
  });
  t.is(animation.effect.getComputedTiming().endTime, 0);
});

function testComputedTimingValueWithDiffrentCurrentTime(t, animation, name, currentTimes, values) {
  for(var i = 0; i < currentTimes.length; i++) {
    animation.currentTime = currentTimes[i];
    var actual = animation.effect.getComputedTiming()[name];
    var expect = values[i];
    var isEqual = actual === expect;
    if(!isEqual) {
      if(parseFloat(actual) - parseFloat(expect) <= 0.0000001) {
        isEqual = true;
      }
    }
    t.truthy(isEqual);
  }
}

test('getComputedTiming().localTime with defferent fillMode', t => {
  var animation = getAnimation({
    delay: 10,
    endDelay: 10,
    iterations: 3,
    duration: 10,
    fill: 'none'
  });

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'localTime',
    [-10, 0, 10, 20, 21, 40],
    [-10, 0, 10, 20, 21, 40]
  );
});

test('getComputedTiming().currentIteration with defferent fillMode', t => {
  var animation = getAnimation({
    delay: 10,
    endDelay: 10,
    iterations: 3,
    duration: 10,
    fill: 'none'
  });

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'currentIteration',
    [0, 10, 20, 21, 40],
    [null, 0, 1, 1, null]
  )
  animation = getAnimation({
    delay: 10,
    endDelay: 10,
    iterations: 3,
    duration: 10,
    fill: 'auto'
  });

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'currentIteration',
    [0, 10, 20, 21, 40],
    [null, 0, 1, 1, null]
  );

  animation = getAnimation({
    delay: 10,
    endDelay: 10,
    iterations: 3,
    duration: 10,
    fill: 'backwards'
  });

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'currentIteration',
    [-1, 1, 10, 20, 21, 40],
    [0, 0, 0, 1, 1, null]
  );

  animation = getAnimation({
    delay: 10,
    endDelay: 10,
    iterations: 3,
    duration: 10,
    fill: 'forwards'
  });

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'currentIteration',
    [1, 10, 20, 21, 40, 1000],
    [null, 0, 1, 1, 2, 2]
  );

  animation = getAnimation({
    delay: 10,
    endDelay: 10,
    iterations: 3,
    duration: 10,
    fill: 'both'
  });

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'currentIteration',
    [-1, 1, 10, 20, 21, 40, 1000],
    [0, 0, 0, 1, 1, 2, 2]
  );
});

test('getComputedTiming().currentIteration with defferent iterationStart', t => {
  var animation = getAnimation({
    iterationStart: 0,
    iterations: 3,
    duration: 10,
    fill: 'none'
  });

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'currentIteration',
    [0, 5, 10, 15, 25, 29, 30, 40],
    [0, 0, 1, 1, 2, 2, null, null]
  )

  var animation = getAnimation({
    iterationStart: .5,
    iterations: 3,
    duration: 10,
    fill: 'none'
  });

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'currentIteration',
    [0, 5, 10, 15, 25, 29, 30, 40],
    [0, 1, 1, 2, 3, 3, null, null]
  )

});

test('getComputedTiming().progress with different FillMode and direction "normal" and easing="linear"', t => {

  const getOpt = opt => Object.assign({
    delay: 10,
    iterationStart: .5,
    iterations: 3,
    duration: 10,
    direction: 'normal',
    easing: 'linear',
    fill: 'must specified'
  }, opt)

  var animation = getAnimation(getOpt({fill: 'none'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 10, 11, 12.5, 15, 25, 30, 39, 40],
    [null, .5, .6, .75, 0, 0, .5, .4, null]
  );

  animation = getAnimation(getOpt({fill: 'both'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [-10, 0, 10, 11, 12.5, 15, 25, 30, 39, 40, 100],
    [.5, .5, .5, .6, .75, 0, 0, .5, .4, 1, 1]
  );

  animation = getAnimation(getOpt({fill: 'forwards'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [-10, 0, 10, 11, 12.5, 15, 25, 30, 39, 40, 100],
    [null, null, .5, .6, .75, 0, 0, .5, .4, 1, 1]
  );

  animation = getAnimation(getOpt({fill: 'backwards'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [-10, 0, 10, 11, 12.5, 15, 25, 30, 39, 40, 100],
    [.5, .5, .5, .6, .75, 0, 0, .5, .4, null, null]
  );

});

test('getComputedTiming().progress with different PlaybackDirection and FillMode and easing="linear"', t => {
  //"normal" | "reverse" | "alternate" | "alternate-reverse"
  const getOpt = opt => Object.assign({
    delay: 10,
    iterationStart: .4,
    iterations: 3,
    duration: 10,
    direction: 'must specified',
    easing: 'linear',
    fill: 'none'
  }, opt)

  var animation = getAnimation(getOpt({direction: 'normal'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 10, 11, 12.5, 16, 26, 30, 39, 40],
    [null, .4, .5, .65, 0, 0, .4, .3, null]
  );

  animation = getAnimation(getOpt({direction: 'reverse'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 10, 11, 12.5, 16, 26, 30, 39, 40, 100],
    [null, .6, .5, .35, 1, 1, .6, .7, null, null]
  );

  animation = getAnimation(getOpt({direction: 'reverse', fill: 'both'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 10, 11, 12.5, 16, 26, 30, 39, 40, 100],
    [.6, .6, .5, .35, 1, 1, .6, .7, .6, .6]
  );

  animation = getAnimation(getOpt({direction: 'alternate'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 10, 11, 12.5, 16, 17, 18, 26, 30, 39, 40],
    [null, .4, .5, .65, 1, .9, .8, 0, .4, .7, null]
  );

  animation = getAnimation(getOpt({direction: 'alternate', fill: 'both'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 10, 11, 12.5, 16, 17, 18, 26, 30, 39, 40],
    [.4, .4, .5, .65, 1, .9, .8, 0, .4, .7, .6]
  );

  animation = getAnimation(getOpt({direction: 'alternate-reverse'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 10, 11, 12.5, 16, 17, 18, 26, 30, 39, 40],
    [null, .6, .5, .35, 0, .1, .2, 1, .6, .3, null]
  );

  animation = getAnimation(getOpt({direction: 'alternate-reverse', fill: 'both'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 10, 11, 12.5, 16, 17, 18, 26, 30, 39, 40],
    [.6, .6, .5, .35, 0, .1, .2, 1, .6, .3, .4]
  );
});

test('getComputedTiming().progress with diffrent easing', t => {
  const getOpt = opt => Object.assign({
    iterations: 1,
    duration: 100,
    direction: 'normal',
    easing: 'easing',
    fill: 'none'
  }, opt)

  var animation = getAnimation(getOpt({easing: 'ease'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [0, 30, 60, 100],
    [0, 0.5138514242233256, 0.8870120356162837, null],
  );

  animation = getAnimation(getOpt({easing: 'ease-in'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [30, 60],
    [0.12901227636423704, 0.4289758049640159],
  );

  animation = getAnimation(getOpt({easing: 'ease-out'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [30, 60],
    [0.4459538725310063, 0.788442989552886],
  );

  animation = getAnimation(getOpt({easing: 'ease-in-out'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [30, 60],
    [0.18717057744376955, 0.668167932792936],
  );

  var animation = getAnimation(getOpt({easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'}));

  testComputedTimingValueWithDiffrentCurrentTime(
    t, animation, 'progress',
    [30, 60],
    [0.5138514242233256, 0.8870120356162837],
  );
});



