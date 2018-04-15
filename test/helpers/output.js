const {Sprite, Label} = require('../../lib')
const drawCase = require('./drawcase')

drawCase('empty', [10, 10], (size) => {
  const sprite = new Sprite()
  sprite.attr({
    bgcolor: 'red',
  })

  return [sprite]
})


drawCase('red-block-150', [150, 150], (size) => {
  const sprite = new Sprite()
  sprite.attr({
    size,
    bgcolor: 'red',
  })

  return [sprite]
})

drawCase('red-block-150-300', [300, 300], (size) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
  })

  return [sprite]
})

drawCase('red-block-150-300-center', [300, 300], ([width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 0.5,
  })

  return [sprite]
})

drawCase('red-block-150-300-left-top', [300, 300], ([width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 1,
  })

  return [sprite]
})

drawCase('red-block-150-300-right-bottom', [300, 300], ([width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 0,
  })

  return [sprite]
})

drawCase('red-block-150-300-left-bottom', [300, 300], ([width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: [1, 0],
  })

  return [sprite]
})

drawCase('red-block-150-300-right-top', [300, 300], ([width, height]) => {
  const sprite = new Sprite()
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: [0, 1],
  })

  return [sprite]
})

drawCase('label-48px-Arial', [800, 600], (size) => {
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

  return [text1]
})
