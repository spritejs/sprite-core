import {createCanvas} from 'canvas';
import {Layer, Sprite, createNode, createElement} from '../src';
import {compare} from './helpers';

const test = require('ava');

test('createNode', (t) => {
  const s = createNode('sprite'),
    l = createNode('label'),
    g = createNode('group'),
    p = createNode('path'),
    x = createNode('foo');

  t.is(s.nodeType, 'sprite');
  t.is(g.nodeType, 'group');
  t.is(p.nodeType, 'path');
  t.is(l.nodeType, 'label');
  t.is(x, null);
});

test('createElement', (t) => {
  const s = createElement(Sprite, {pos: [100, 100]}),
    l = createElement('label', null, 'test'),
    g = createElement('group', null, [s]),
    p = createElement('path'),
    x = createElement('foo');

  t.is(s.nodeType, 'sprite');
  t.is(s.attr('x'), 100);
  t.is(s.attr('y'), 100);
  t.is(g.nodeType, 'group');
  t.is(g.children.length, 1);
  t.is(g.children[0], s);
  t.is(p.nodeType, 'path');
  t.is(l.text, 'test');
  t.is(l.nodeType, 'label');
  t.is(x, null);
});

test('querySelector', (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

  for(let i = 0; i < 10; i++) {
    const s = new Sprite();
    layer.appendChild(s);
  }

  const all = layer.querySelectorAll('*');
  t.is(all.length, 10);
});

test('getElementById', async (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

  const block = new Sprite();
  const width = 300,
    height = 300;

  block.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: [0, 0],
    id: 'abc',
  });
  layer.append(block);

  await layer.prepareRender();

  const isEqual = await compare(canvas, 'red-block-150-300-right-bottom');
  t.truthy(isEqual);

  t.is(layer.getElementById('abc'), block);
});

test('getElementsByName', async (t) => {
  const context = createCanvas(600, 600).getContext('2d');
  const layer = new Layer({context});

  const s = new Sprite();
  s.attr({
    size: [50, 50],
    pos: [300, 300],
    bgcolor: 'transparent',
  });
  s.id = 'abc';
  s.name = 'block';
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

  const blocks = layer.getElementsByName('block');
  t.is(blocks.length, 9);

  const copied = layer.querySelector(':block');
  t.is(copied, layer.children[0]);

  t.is(layer.querySelectorAll(':block').length, 9);
  t.is(layer.querySelectorAll('sprite').length, 9);

  const original = layer.querySelectorAll('#abc');
  t.is(original.length, 1);

  t.is(layer.querySelector('*'), s);
  t.is(layer.querySelector('#abc'), s);
  t.is(layer.querySelector('#abcd'), null);
  t.is(layer.querySelector('sprite'), s);

  const copied2 = layer.querySelectorAll({
    sprite: s => s.id !== 'abc',
    label: l => l.id !== 'abc',
  });
  t.is(copied2.length, 8);

  const copied3 = layer.querySelector({
    sprite: s => s.id !== 'abc',
    label: l => l.id !== 'abc',
  });
  t.is(copied3, layer.children[1]);
});
