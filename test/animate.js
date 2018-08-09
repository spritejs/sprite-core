import {createCanvas} from 'canvas';
import {Sprite, Layer} from '../src';
import {compare} from './helpers';

const test = require('ava');

test('transition', async (t) => {
  const context = createCanvas(300, 300).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  s.attr({
    anchor: 0.5,
    pos: [30, 100],
    bgcolor: 'red',
    size: [20, 40],
    rotate: 30,
  });

  const s2 = s.cloneNode();
  const s3 = s.cloneNode();
  layer.append(s, s2, s3);

  await s2.transition(0.2).attr({
    x: x => x + 100,
  });

  await s3.transition(0.2).attr('x', x => x + 200);

  await layer.prepareRender();

  const isEqual = await compare(context.canvas, 'transition');
  t.truthy(isEqual);
});

test('animate-block-1', async (t) => {
  const context = createCanvas(600, 600).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  s.attr({
    size: [50, 50],
    pos: [300, 300],
    bgcolor: 'transparent',
  });
  layer.append(s);

  const anim = s.animate([
    {rotate: 360},
  ], {
    delay: 500,
    duration: 2000,
  });

  anim.timeline.playbackRate = 0;

  for(let i = 0; i < 8; i++) {
    anim.timeline.currentTime = i * 250;
    await layer.prepareRender(); // eslint-disable-line no-await-in-loop
    const ss = s.cloneNode();
    ss.attr({
      bgcolor: `rgba(${i * 30}, ${(8 - i) * 30}, 128, 0.5)`,
    });
    layer.append(ss);
  }
  await layer.prepareRender();

  const isEqual = await compare(context.canvas, 'animate-block-1');
  t.truthy(isEqual);
});

test('animate-block-color', async (t) => {
  const context = createCanvas(50, 50).getContext('2d');
  const layer = new Layer({context});

  const block = new Sprite();
  block.attr({
    size: [50, 50],
    pos: [0, 0],
    bgcolor: 'rgb(254, 0, 0)',
  });
  layer.append(block);

  const anim = block.animate([
    {bgcolor: 'rgb(0, 254, 254)'},
  ], {
    duration: 2000,
  });
  anim.timeline.playbackRate = 0;
  anim.timeline.currentTime = 1000;

  await layer.prepareRender();

  const isEqual = await compare(context.canvas, 'animate-block-color');
  t.truthy(isEqual);
});

test.cb('animate-block-remove', (t) => {
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  s.attr({
    size: [50, 50],
    pos: [0, 0],
  });
  const anim = s.animate([
    {y: 50},
  ], {
    duration: 2000,
  });
  layer.append(s);

  setTimeout(() => {
    t.truthy(anim.timeline.currentTime >= 1000);
    layer.remove(s);
  }, 1100);

  setTimeout(() => {
    t.is(s.attr('y'), 0);
    t.is(anim.timeline, null);
    t.is(anim.playState, 'idle');
    t.end();
  }, 1200);
});

test.cb('animate-block-cancel', (t) => {
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  s.attr({
    size: [50, 50],
    pos: [0, 0],
  });
  const anim = s.animate([
    {y: 50},
  ], {
    duration: 2000,
  });
  layer.append(s);

  setTimeout(() => {
    t.truthy(anim.timeline.currentTime >= 1000);
    anim.cancel(true);
  }, 1100);

  setTimeout(() => {
    t.truthy(s.attr('y') >= 25);
    t.is(anim.timeline, null);
    t.is(anim.playState, 'idle');
    t.end();
  }, 1200);
});

test('animate-no-layer', (t) => {
  const s = new Sprite();
  const anim = s.animate([
    {y: 50},
  ], {
    duration: 2000,
  });
  anim.play();
  t.is(anim.timeline, null);
});

test.cb('fake-document-contains', (t) => {
  global.document = {
    documentElement: {
      contains: () => false,
    },
  };
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});
  const s = new Sprite();
  layer.append(s);

  const anim = s.animate([
    {y: 50},
  ], {
    duration: 500,
    fill: 'forwards',
  });

  setTimeout(() => {
    t.is(s.attr('y'), 0);
    t.is(anim.timeline, null);
    delete global.document;
    t.end();
  }, 200);
});

test('animate-transform', async (t) => {
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  layer.append(s);

  const anim = s.animate([
    {transform: {rotate: 0}},
    {transform: {rotate: 120}},
  ], {
    duration: 500,
    fill: 'forwards',
  });
  await anim.finished;

  t.is(s.attr('transform'), 'rotate(120)');
});

test('animate-transform-2', async (t) => {
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  layer.append(s);

  const anim = s.animate([
    {transform: {scale: 2, translate: [-10, -10], rotate: 360}, bgcolor: 'hsl(360, 50%, 50%)'},
  ], {
    duration: 500,
    fill: 'forwards',
  });
  await anim.finished;

  t.deepEqual(s.transform.m.map(o => Math.round(o)), [2, -0, 0, 2, -20, -20]);
});

test('animate-transform-3', async (t) => {
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  layer.append(s);

  const anim = s.animate([
    {transform: {scale: 2}},
  ], {
    duration: 500,
    fill: 'forwards',
  });
  await anim.finished;

  t.is(s.attr('transform'), 'matrix(2,0,0,2,0,0)');
});

test('animate-border', async (t) => {
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  s.attr({
    anchor: 0.5,
    pos: [400, 300],
    size: [50, 50],
  });
  layer.append(s);

  const anim = s.animate([
    {border: {width: 10, color: 'red', style: [5, 5]}},
  ], {
    duration: 2000,
    fill: 'forwards',
  });

  await anim.finished;

  t.is(s.attr('border').color, 'rgba(255,0,0,1)');
});

test('animate-finished', async (t) => {
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  layer.append(s);

  const anim = s.animate([
    {y: 50},
  ], {
    duration: 500,
    fill: 'forwards',
  });

  await anim.finished;
  t.truthy(anim.timeline.currentTime >= 500);
  t.is(s.attr('y'), 50);
});

test.cb('animate-playState', (t) => {
  const context = createCanvas(50, 100).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  s.attr({
    size: [50, 50],
    pos: [0, 0],
  });
  const anim = s.animate([
    {y: 50},
  ], {
    delay: 500,
    duration: 1000,
    endDelay: 500,
  });
  t.is(anim.playState, 'idle');
  layer.append(s);

  t.is(anim.playState, 'pending');

  setTimeout(() => {
    t.is(anim.playState, 'running');
  }, 550);

  setTimeout(() => {
    t.is(anim.playState, 'pending');
  }, 1550);

  setTimeout(() => {
    t.is(anim.playState, 'finished');
    t.end();
  }, 2050);
});
