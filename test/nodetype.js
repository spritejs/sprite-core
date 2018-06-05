import {Layer, Sprite} from '../src'
import {compare} from './helpers'
import {createCanvas} from 'canvas'

const test = require('ava')

test('getElementById', async (t) => {
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
    id: 'abc',
  })
  layer.append(block)

  await layer.prepareRender()

  const isEqual = await compare(canvas, 'red-block-150-300-right-bottom')
  t.truthy(isEqual)

  t.is(layer.getElementById('abc'), block)
})

test('getElementsByName', async (t) => {
  const context = createCanvas(600, 600).getContext('2d')
  const layer = new Layer({context})

  const s = new Sprite()
  s.attr({
    size: [50, 50],
    pos: [300, 300],
    bgcolor: 'transparent',
    name: 'block',
    id: 'abc',
  })
  layer.append(s)

  const anim = s.animate([
    {rotate: 360},
  ], {
    delay: 500,
    duration: 2000,
  })

  anim.timeline.playbackRate = 0

  for(let i = 0; i < 8; i++) {
    anim.timeline.currentTime = i * 250
    await layer.prepareRender() // eslint-disable-line no-await-in-loop
    const ss = s.cloneNode()
    ss.attr({
      bgcolor: `rgba(${i * 30}, ${(8 - i) * 30}, 128, 0.5)`,
    })
    layer.append(ss)
  }
  await layer.prepareRender()

  const isEqual = await compare(context.canvas, 'animate-block-1')
  t.truthy(isEqual)

  const blocks = layer.getElementsByName('block')
  t.is(blocks.length, 9)

  const copied = layer.querySelector(':block')
  t.is(copied, layer.children[0])

  const original = layer.querySelectorAll('#abc')
  t.is(original.length, 1)

  const copied2 = layer.querySelectorAll({
    sprite: s => s.id !== 'abc',
  })
  t.is(copied2.length, 8)
})

