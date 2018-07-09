const {FlexLayout, Sprite} = require('../../lib')
const drawCase = require('./drawcase')

drawCase('layout-basic', [300, 300], (layer, size) => {
  const g = new FlexLayout()
  g.attr({
    pos: [150, 150],
    // width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  })
  layer.append(g)

  const s1 = new Sprite()
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  })

  const s2 = s1.cloneNode()
  s2.attr({
    bgcolor: 'blue',
  })

  const s3 = s1.cloneNode()
  s3.attr({
    bgcolor: 'green',
  })

  g.append(s1, s2, s3)
  return layer.prepareRender()
})

drawCase('layout-flex', [300, 300], (layer, size) => {
  const g = new FlexLayout()
  g.attr({
    pos: [150, 150],
    width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  })
  layer.append(g)

  const s1 = new Sprite()
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
    flex: 1,
  })

  const s2 = s1.cloneNode()
  s2.attr({
    bgcolor: 'blue',
  })

  const s3 = s1.cloneNode()
  s3.attr({
    bgcolor: 'green',
  })

  g.append(s1, s2, s3)
  return layer.prepareRender()
})