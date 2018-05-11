import {Sprite, Layer} from '../src'
import {compare} from './helpers'
import {createCanvas} from 'canvas'

const test = require('ava')

function box(rect) {
  const [x, y, w, h] = rect
  return [...[x, y].map(Math.floor), ...[w, h].map(Math.ceil)]
}

test('box model', (t) => {
  const block = new Sprite()
  t.deepEqual(block.contentSize, [0, 0])
  t.deepEqual(block.innerSize, [0, 0])
  t.deepEqual(block.clientSize, [0, 0])
  t.deepEqual(block.outerSize, [0, 0])
  t.deepEqual(block.offsetSize, [0, 0])

  t.deepEqual(block.originalRect, [-0, -0, 0, 0])
  t.deepEqual(block.boundingRect, [0, 0, 0, 0])
  t.deepEqual(block.originalRenderRect, [0, 0, 0, 0])
  t.deepEqual(block.renderRect, [0, 0, 0, 0])

  block.attr({
    pos: [385, 300],
    size: [100, 100],
    anchor: 0.5,
  })

  t.deepEqual(block.contentSize, [100, 100])
  t.deepEqual(block.innerSize, [100, 100])
  t.deepEqual(block.clientSize, [100, 100])
  t.deepEqual(block.outerSize, [100, 100])
  t.deepEqual(block.offsetSize, [100, 100])

  t.deepEqual(block.originalRect, [-50, -50, 100, 100])
  t.deepEqual(block.boundingRect, [-50, -50, 100, 100])
  t.deepEqual(block.originalRenderRect, [335, 250, 100, 100])
  t.deepEqual(block.renderRect, [335, 250, 100, 100])

  block.attr({
    rotate: 45,
  })

  t.deepEqual(block.contentSize, [100, 100])
  t.deepEqual(block.innerSize, [100, 100])
  t.deepEqual(block.clientSize, [100, 100])
  t.deepEqual(block.outerSize, [100, 100])
  t.deepEqual(block.offsetSize, [100, 100])

  t.deepEqual(block.originalRect, [-50, -50, 100, 100])
  t.deepEqual(box(block.boundingRect), [-71, -71, 142, 142])
  t.deepEqual(box(block.originalRenderRect), [335, 250, 100, 100])
  t.deepEqual(box(block.renderRect), [314, 229, 142, 142])

  block.attr({
    padding: 10,
    border: 5,
  })

  t.deepEqual(block.contentSize, [100, 100])
  t.deepEqual(block.innerSize, [100, 100])
  t.deepEqual(block.clientSize, [120, 120])
  t.deepEqual(block.outerSize, [130, 130])
  t.deepEqual(block.offsetSize, [130, 130])

  t.deepEqual(block.originalRect, [-65, -65, 130, 130])
  t.deepEqual(box(block.boundingRect), [-92, -92, 184, 184])
  t.deepEqual(box(block.originalRenderRect), [320, 235, 130, 130])
  t.deepEqual(box(block.renderRect), [293, 208, 184, 184])
})

test('red block 150/300', async (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')})

  const block = new Sprite()
  const width = 300,
    height = 300

  block.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: [0, 0],
  })

  layer.append(block)
  layer.draw()
  let isEqual = await compare(canvas, 'red-block-150-300-right-bottom')
  t.truthy(isEqual)

  block.attr({
    anchor: [0.5, 0.5],
  })
  layer.draw()
  isEqual = await compare(canvas, 'red-block-150-300-center')
  t.truthy(isEqual)

  block.attr({
    anchor: [1, 0],
  })
  layer.draw()
  isEqual = await compare(canvas, 'red-block-150-300-left-bottom')
  t.truthy(isEqual)

  block.attr({
    anchor: [0, 1],
  })
  layer.draw()
  isEqual = await compare(canvas, 'red-block-150-300-right-top')
  t.truthy(isEqual)

  block.attr({
    anchor: [1, 1],
  })
  layer.draw()
  isEqual = await compare(canvas, 'red-block-150-300-left-top')
  t.truthy(isEqual)
})
