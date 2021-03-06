import {
  Color,
  parseColor,
  parseColorString,
  parseStringTransform,
  parseStringInt,
  parseStringFloat,
  fourValuesShortCut,
  oneOrTwoValues,
  appendUnit,
  rectVertices,
  sortOrderedSprites,
} from '../src/utils';

const test = require('ava');

function floatEqual(a, b, precision = 0.01) {
  return Math.abs(a - b) < precision;
}

test('color', (t) => {
  const red = parseColor('red');
  t.is(red.toString(), 'rgba(255,0,0,1)');

  const c1 = parseColor('#ff0');
  t.deepEqual(c1.value, [255, 255, 0, 1]);

  const c2 = parseColor('rgba(0,0,0,.5)');
  t.truthy(floatEqual(c2.value[3], 0.5));

  const yellow = new Color('yellow');
  t.is(yellow.model, 'rgb');

  const y2 = new Color(yellow);
  t.deepEqual(y2.value, yellow.value);
  t.is(y2.model, yellow.model);
  t.is(yellow.str, 'rgba(255,255,0,1)');

  const y3 = new Color('hsl(300, 100%, 25.1%)');
  t.deepEqual(y3.value, [300, 100, 25.1, 1]);
  t.is(y3.str, 'hsla(300,100%,25.1%,1)');
});

test('parseColorString', (t) => {
  const red = parseColorString('red');
  t.is(red, 'rgba(255,0,0,1)');

  const ep = parseColorString('');
  t.is(ep, '');
});

test('parseStringInt', (t) => {
  const r = parseStringInt('200, 30.5, 55, 4');
  t.deepEqual(r, [200, 30, 55, 4]);
  const r2 = parseStringInt([1, 2, 3, 4]);
  t.deepEqual(r2, [1, 2, 3, 4]);
});

test('parseStringFloat', (t) => {
  const r = parseStringFloat('200, 30.5, 55, 4');
  t.deepEqual(r, [200, 30.5, 55, 4]);
  const r2 = parseStringFloat([1, 2, 3, 4]);
  t.deepEqual(r2, [1, 2, 3, 4]);
});

test('parseStringTransform', (t) => {
  const transform = 'rotate(60) scale(30, 30)';
  const r = parseStringTransform(transform);
  t.is(r.rotate, 60);
  t.deepEqual(r.scale, [30, 30]);
  const transform2 = 'foo(1, 1) bar(2, 2) matrix(1,0,0,1,0,0)';
  const r2 = parseStringTransform(transform2);
  t.falsy(r2.foo);
  t.falsy(r2.bar);
  t.deepEqual(r2.matrix, [1, 0, 0, 1, 0, 0]);
  const r3 = parseStringTransform('not(1)');
  t.is(Object.keys(r3).length, 0);
  const r4 = parseStringTransform(r2);
  t.is(r4, r2);
});

test('oneOrTwoValues', (t) => {
  const v = 1;
  t.deepEqual(oneOrTwoValues(v), [1, 1]);
  const w = [1, 2];
  t.deepEqual(oneOrTwoValues(w), [1, 2]);
  const u = [3];
  t.deepEqual(oneOrTwoValues(u), [3, 3]);
});

test('fourValuesShortCut', (t) => {
  let r = fourValuesShortCut(1);
  t.deepEqual(r, [1, 1, 1, 1]);

  r = fourValuesShortCut([2]);
  t.deepEqual(r, [2, 2, 2, 2]);

  r = fourValuesShortCut([3, 4]);
  t.deepEqual(r, [3, 4, 3, 4]);

  r = fourValuesShortCut([3, 4, 5]);
  t.deepEqual(r, [3, 4, 5, 0]);
});

test('rectVertices', (t) => {
  const rect = [1, 1, 3, 3];
  const vertices = rectVertices(rect);
  t.deepEqual(vertices, [[1, 1], [4, 1], [4, 4], [1, 4]]);
});

test('appendUnit', (t) => {
  t.is(appendUnit(''), '');
  t.is(appendUnit(16), '16px');
  t.is(appendUnit('128'), '128px');
  t.is(appendUnit('12rem'), '12rem');
  t.is(appendUnit('3', 'pt'), '3pt');
});

test('sort sprites', (t) => {
  const a = {value: 10, zIndex: 2, zOrder: 3},
    b = {value: 20, zIndex: 1, zOrder: 4},
    c = {value: 30, zIndex: 1, zOrder: 0},
    d = {value: 40, zIndex: 1, zOrder: 2};

  const list = [a, b, c, d];
  const list2 = sortOrderedSprites(list);
  t.deepEqual(list2.map(i => i.value), [30, 40, 20, 10]);

  const list3 = sortOrderedSprites(list, true);
  t.deepEqual(list3.map(i => i.value), [10, 20, 40, 30]);
});
