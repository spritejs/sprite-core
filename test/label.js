import {Label} from '../src'
import {compare, drawSprites} from './helpers'

const test = require('ava')

test('draw text', async (t) => {
  const text1 = new Label('SpriteJS.org 中国')

  text1.attr({
    anchor: 0.5,
    pos: [400, 300],
    font: '48px Arial',
    color: '#fff',
    bgcolor: 'blue',
    renderMode: 'stroke',
    lineHeight: 75,
    padding: [0, 50, 0, 50],
  })

  const canvas = drawSprites([text1], 800, 600)

  const isEqual = await compare(canvas, 'label-48px-Arial')
  t.truthy(isEqual)
})

