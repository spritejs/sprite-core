import {createCanvas} from 'canvas';
import {Sprite, Layer} from '../src';
import {compare} from './helpers';

const test = require('ava');

test('draw path', async (t) => {
  const canvas = createCanvas(1200, 600),
    layer = new Layer({context: canvas.getContext('2d')});

  canvas.cloneNode = function () {
    return createCanvas(1, 1);
  };
  const blocks = [];
  for(let i = 0; i < 10; i++) {
    const block = new Sprite();
    block.attr({
      pos: [i * 50, 150],
      size: [20, 20],
      bgcolor: 'red',
    });
    // layer.append(block)
    blocks.push(block);
  }

  const batched = layer.batch(...blocks);
  batched.baseNode.attr('bgcolor', 'blue');

  await layer.prepareRender();

  t.is(batched.baseNode, blocks[0]);

  const isEqual = await compare(canvas, 'batch-1');
  t.truthy(isEqual);

  batched.remove(blocks[0]);
  t.is(batched.baseNode, blocks[1]);

  batched.add(blocks[0]);
  t.is(batched.baseNode, blocks[0]);
});