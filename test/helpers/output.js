const {Sprite, Label} = require('../../lib')
const drawCase = require('./drawcase')
const {loadImage} = require('canvas')

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

drawCase('empty', [10, 10], (layer, size) => {
  const sprite = new Sprite()
  sprite.attr({
    bgcolor: 'red',
  })

  layer.append(sprite)
  return layer.prepareRender()
})


drawCase('red-block-150', [150, 150], (layer, size) => {
  const sprite = new Sprite()
  sprite.attr({
    size,
    bgcolor: 'red',
  })

  layer.append(sprite)
  return layer.prepareRender()
})

drawCase('red-block-150-300', [300, 300], (layer, size) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
  })

  layer.append(sprite)
  return layer.prepareRender()
})

drawCase('red-block-150-300-center', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 0.5,
  })

  layer.append(sprite)
  return layer.prepareRender()
})

drawCase('red-block-150-300-left-top', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 1,
  })

  layer.append(sprite)
  return layer.prepareRender()
})

drawCase('red-block-150-300-right-bottom', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 0,
  })

  layer.append(sprite)
  return layer.prepareRender()
})

drawCase('red-block-150-300-left-bottom', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: [1, 0],
  })

  layer.append(sprite)
  return layer.prepareRender()
})

drawCase('red-block-150-300-right-top', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: [0, 1],
  })

  layer.append(sprite)
  return layer.prepareRender()
})

drawCase('label-48px-Arial', [800, 600], (layer, size) => {
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

  layer.append(text1)
  return layer.prepareRender()
})

drawCase('animate-block-1', [600, 600], async (layer, [width, height]) => {
  const s = new Sprite()
  s.attr({
    size: [50, 50],
    pos: [300, 300],
    bgcolor: 'transparent',
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
})

drawCase('animate-block-color', [50, 50], async (layer, [width, height]) => {
  const block = new Sprite()
  block.attr({
    size: [50, 50],
    pos: [0, 0],
    bgcolor: 'rgb(254, 0, 0)',
  })
  layer.append(block)

  const anim = block.animate([
    {bgcolor: 'rgb(0, 254, 254)'},
  ], {
    duration: 2000,
  })
  anim.timeline.playbackRate = 0
  anim.timeline.currentTime = 1000

  await layer.prepareRender()
})

drawCase('image-guanguan', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan1.png')

  const s = new Sprite()
  s.attr({
    textures: [img],
    pos: [150, 150],
    anchor: 0.5,
  })
  layer.append(s)

  await layer.prepareRender()
})

drawCase('image-guanguan-body', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan_p.png')

  const s = new Sprite()
  s.attr({
    textures: [{image: img, srcRect: [0, 41, 86, 56]}],
    pos: [150, 150],
    anchor: 0.5,
  })
  layer.append(s)

  await layer.prepareRender()
})

drawCase('image-guanguan-body-filter', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan_p.png')

  const s = new Sprite()
  s.attr({
    textures: [{image: img, srcRect: [0, 41, 86, 56], filter: {opacity: 0.5}}],
    pos: [150, 150],
    anchor: 0.5,
  })
  layer.append(s)

  await layer.prepareRender()
})
