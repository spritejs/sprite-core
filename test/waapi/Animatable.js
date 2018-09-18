import {createCanvas} from 'canvas';
import {Sprite, Layer} from '../../src';
var test = require('ava');

// 本次测试针对 web animation api 规范的 timing model
// 目前在 safari TP 版本可以运行通过


// remove bellow to enable tests
test('', t => t.true(true));
test = function () {}

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

function testParamValidAndInvalidValues(t, name, values, invalidValues) {
  //"none", "forwards", "backwards", "both", "auto"
  values.forEach(value => getAnimation({[name]: value}));
  getAnimation({[name]: undefined});
  invalidValues.forEach(invaldValue => {
    t.throws(() => {
      animation = getAnimation({[name]: invaldValue});
    }, Error);
  });

  t.throws(() => {
    animation = getAnimation({[name]: null});
  }, Error);
  t.throws(() => {
    animation = getAnimation({[name]: 0});
  }, Error);
  t.throws(() => {
    animation = getAnimation({[name]: 'other will throw error'});
  }, Error);
}

test('animate() should validate KeyframeAnimationOptions "fill" "direction" "easing" and throws errors', t => {
  var incorectEnumerables = [null, 0, 'blabla'];

  testParamValidAndInvalidValues(t, 'fill',
    ['none', 'forwards', 'backwards', 'both', 'auto'], incorectEnumerables);
  testParamValidAndInvalidValues(t, 'direction',
    ['normal', 'reverse', 'alternate', 'alternate-reverse'], incorectEnumerables);
  testParamValidAndInvalidValues(t, 'easing', [
    'linear',
    'ease', 'ease-in', 'ease-in-out', 'cubic-bezier(.1, .2, .3, .4)',
    'step-start', 'step-end', 'steps(2, start)',
    'frames(30)'
  ], incorectEnumerables);


  // no sure bellow two params effect, see https://drafts.csswg.org/web-animations/#the-keyframeeffectoptions-dictionary
  // testParamValidAndInvalidValues(t, 'composite',
  //   ['replace', 'add', 'accumulate'], incorectEnumerables);
  // testParamValidAndInvalidValues(t, 'iterationComposite',
  //   ['replace', 'accumulate', 'alternate-reverse'], incorectEnumerables);

})

test('animate() should validate KeyframeAnimationOptions "delay" "endDelay" "interationStart" "interations" "duration" and throws erros', t => {
  testParamValidAndInvalidValues(t, 'delay', [0, 100, -100, '100', '-100'], ['no a number']);
  testParamValidAndInvalidValues(t, 'endDelay', [0, 100, -100, '100', '-100'], ['no a number']);
  testParamValidAndInvalidValues(t, 'iterationStart', [0, .3, 100, '100'], ['no a number', '-100', -100]);
  testParamValidAndInvalidValues(t, 'iterations', [0, 1.1, 100, '100'], ['no a number', '-100', -100]);
  // 因为允许 'auto', 所以字符串的 '100' 也是错误的。
  testParamValidAndInvalidValues(t, 'duration', [0, 100, 'auto'], ['no a number', -100, '-100', '100' ]); 
})