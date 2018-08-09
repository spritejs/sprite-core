import {createCanvas} from 'canvas';
import {Label, Layer} from '../src';
import {compare} from './helpers';

const test = require('ava');

test.skip('draw text', async (t) => {
  const canvas = createCanvas(800, 600),
    layer = new Layer({context: canvas.getContext('2d')});

  const text1 = new Label('SpriteJS.org 中国');

  text1.attr({
    anchor: 0.5,
    pos: [400, 300],
    font: '48px Arial',
    color: '#fff',
    bgcolor: 'blue',
    lineHeight: 75,
    padding: [0, 50, 0, 50],
  });
  layer.append(text1);

  await layer.prepareRender();

  const isEqual = await compare(canvas, 'label-48px-Arial');
  t.truthy(isEqual);
});

test.skip('draw text 2', async (t) => {
  const canvas = createCanvas(800, 600),
    layer = new Layer({context: canvas.getContext('2d')});

  const text1 = new Label('SpriteJS.org 中国');

  text1.attr({
    anchor: 0.5,
    pos: [400, 300],
    font: '2rem "宋体"',
    strokeColor: '#fff',
    bgcolor: '#000',
    lineHeight: 75,
    padding: [0, 50, 0, 50],
  });

  layer.append(text1);

  await layer.prepareRender();

  const isEqual = await compare(canvas, 'label-2rem-Song');
  t.truthy(isEqual);
});
