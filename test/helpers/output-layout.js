const {Group, Sprite} = require('../../lib')
const drawCase = require('./drawcase')

drawCase('layout-basic', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
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

drawCase('layout-fixwidth', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
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

drawCase('layout-fixwidth-justify-end', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    justifyContent: 'flex-end',
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

drawCase('layout-fixwidth-justify-center', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    justifyContent: 'center',
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

drawCase('layout-fixwidth-justify-between', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    justifyContent: 'space-between',
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

drawCase('layout-fixwidth-justify-around', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    justifyContent: 'space-around',
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

drawCase('layout-fixwidth-justify-unknown', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    justifyContent: 'unknown',
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

drawCase('layout-column', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    pos: [150, 150],
    // height: 300,
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

drawCase('layout-fixcolumn', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    pos: [150, 150],
    height: 300,
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

drawCase('layout-fixcolumn-juesify-end', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    pos: [150, 150],
    height: 300,
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

drawCase('layout-fixcolumn-juesify-center', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pos: [150, 150],
    height: 300,
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

drawCase('layout-fixcolumn-juesify-between', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    pos: [150, 150],
    height: 300,
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

drawCase('layout-fixcolumn-juesify-around', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    pos: [150, 150],
    height: 300,
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

drawCase('layout-fixcolumn-juesify-unknown', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'unknown',
    pos: [150, 150],
    height: 300,
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

drawCase('layout-fixrow-reverse', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
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

drawCase('layout-fixcolumn-reverse', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    pos: [150, 150],
    height: 300,
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

drawCase('layout-auto-reverse', [300, 300], (layer, size) => {
  const g = new Group()
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    pos: [150, 150],
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

// drawCase('layout-basic-fixwidth2', [300, 300], (layer, size) => {
//   const g = new Group()
//   g.attr({
//     display: 'flex',
//     pos: [150, 150],
//     width: 100,
//     anchor: 0.5,
//     bgcolor: 'grey',
//     alignItems: 'stretch',
//   })
//   layer.append(g)

//   const s1 = new Sprite()
//   s1.attr({
//     size: [50, 50],
//     borderRadius: 25,
//     bgcolor: 'red',
//   })

//   const s2 = s1.cloneNode()
//   s2.attr({
//     bgcolor: 'blue',
//   })

//   const s3 = s1.cloneNode()
//   s3.attr({
//     bgcolor: 'green',
//   })

//   g.append(s1, s2, s3)
//   return layer.prepareRender()
// })

// drawCase('layout-basic-wrap', [300, 300], (layer, size) => {
//   const g = new Group()
//   g.attr({
//     display: 'flex',
//     flexWrap: 'wrap',
//     pos: [150, 150],
//     width: 100,
//     anchor: 0.5,
//     bgcolor: 'grey',
//     alignItems: 'stretch',
//   })
//   layer.append(g)

//   const s1 = new Sprite()
//   s1.attr({
//     size: [50, 50],
//     borderRadius: 25,
//     bgcolor: 'red',
//   })

//   const s2 = s1.cloneNode()
//   s2.attr({
//     bgcolor: 'blue',
//   })

//   const s3 = s1.cloneNode()
//   s3.attr({
//     bgcolor: 'green',
//   })

//   g.append(s1, s2, s3)
//   return layer.prepareRender()
// })

// drawCase('layout-basic-wrap2', [300, 300], (layer, size) => {
//   const g = new Group()
//   g.attr({
//     display: 'flex',
//     flexWrap: 'wrap',
//     pos: [150, 150],
//     width: 100,
//     anchor: 0.5,
//     bgcolor: 'grey',
//     alignItems: 'stretch',
//   })
//   layer.append(g)

//   const s1 = new Sprite()
//   s1.attr({
//     size: [50, 50],
//     bgcolor: 'red',
//   })

//   const s2 = s1.cloneNode()
//   s2.attr({
//     width: 100,
//     bgcolor: 'blue',
//   })

//   const s3 = s1.cloneNode()
//   s3.attr({
//     bgcolor: 'green',
//   })

//   g.append(s1, s2, s3)
//   return layer.prepareRender()
// })

// drawCase('layout-basic-wrap2-order', [300, 300], (layer, size) => {
//   const g = new Group()
//   g.attr({
//     display: 'flex',
//     flexWrap: 'wrap',
//     pos: [150, 150],
//     width: 100,
//     anchor: 0.5,
//     bgcolor: 'grey',
//     alignItems: 'stretch',
//   })
//   layer.append(g)

//   const s1 = new Sprite()
//   s1.attr({
//     size: [50, 50],
//     bgcolor: 'red',
//   })

//   const s2 = s1.cloneNode()
//   s2.attr({
//     width: 100,
//     bgcolor: 'blue',
//     order: -1,
//   })

//   const s3 = s1.cloneNode()
//   s3.attr({
//     bgcolor: 'green',
//   })

//   g.append(s1, s2, s3)
//   return layer.prepareRender()
// })

// drawCase('layout-basic-wrap2-reverse', [300, 300], (layer, size) => {
//   const g = new Group()
//   g.attr({
//     display: 'flex',
//     flexWrap: 'wrap',
//     flexDirection: 'row-reverse',
//     pos: [150, 150],
//     width: 100,
//     anchor: 0.5,
//     bgcolor: 'grey',
//     alignItems: 'stretch',
//   })
//   layer.append(g)

//   const s1 = new Sprite()
//   s1.attr({
//     size: [50, 50],
//     bgcolor: 'red',
//   })

//   const s2 = s1.cloneNode()
//   s2.attr({
//     width: 100,
//     bgcolor: 'blue',
//     order: -1,
//   })

//   const s3 = s1.cloneNode()
//   s3.attr({
//     bgcolor: 'green',
//   })

//   g.append(s1, s2, s3)
//   return layer.prepareRender()
// })

// drawCase('layout-flex', [300, 300], (layer, size) => {
//   const g = new Group()
//   g.attr({
//     display: 'flex',
//     pos: [150, 150],
//     width: 300,
//     anchor: 0.5,
//     bgcolor: 'grey',
//     alignItems: 'stretch',
//   })
//   layer.append(g)

//   const s1 = new Sprite()
//   s1.attr({
//     size: [50, 50],
//     borderRadius: 25,
//     bgcolor: 'red',
//     flex: 1,
//   })

//   const s2 = s1.cloneNode()
//   s2.attr({
//     bgcolor: 'blue',
//   })

//   const s3 = s1.cloneNode()
//   s3.attr({
//     bgcolor: 'green',
//   })

//   g.append(s1, s2, s3)
//   return layer.prepareRender()
// })


// drawCase('layout-flex-121', [300, 300], (layer, size) => {
//   const g = new Group()
//   g.attr({
//     display: 'flex',
//     pos: [150, 150],
//     width: 300,
//     anchor: 0.5,
//     bgcolor: 'grey',
//     alignItems: 'stretch',
//   })
//   layer.append(g)

//   const s1 = new Sprite()
//   s1.attr({
//     size: [50, 50],
//     borderRadius: 25,
//     bgcolor: 'red',
//     flex: 1,
//   })

//   const s2 = s1.cloneNode()
//   s2.attr({
//     bgcolor: 'blue',
//     flex: 2,
//   })

//   const s3 = s1.cloneNode()
//   s3.attr({
//     bgcolor: 'green',
//   })

//   g.append(s1, s2, s3)
//   return layer.prepareRender()
// })