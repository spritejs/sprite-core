const {Group, Sprite} = require('../../lib');
const drawCase = require('./drawcase');

drawCase('layout-basic', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    pos: [150, 150],
    // width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixwidth', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    pos: [150, 150],
    width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixwidth-justify-end', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    justifyContent: 'flex-end',
    pos: [150, 150],
    width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixwidth-justify-center', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    justifyContent: 'center',
    pos: [150, 150],
    width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixwidth-justify-between', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    justifyContent: 'space-between',
    pos: [150, 150],
    width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixwidth-justify-around', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    justifyContent: 'space-around',
    pos: [150, 150],
    width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixwidth-justify-unknown', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    justifyContent: 'unknown',
    pos: [150, 150],
    width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-column', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    pos: [150, 150],
    // height: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixcolumn', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    pos: [150, 150],
    height: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixcolumn-juesify-end', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    pos: [150, 150],
    height: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixcolumn-juesify-center', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pos: [150, 150],
    height: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixcolumn-juesify-between', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    pos: [150, 150],
    height: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixcolumn-juesify-around', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    pos: [150, 150],
    height: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixcolumn-juesify-unknown', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'unknown',
    pos: [150, 150],
    height: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixrow-reverse', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    pos: [150, 150],
    width: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-fixcolumn-reverse', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    pos: [150, 150],
    height: 300,
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});

drawCase('layout-auto-reverse', [300, 300], (layer, size) => {
  const g = new Group();
  g.attr({
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    pos: [150, 150],
    anchor: 0.5,
    bgcolor: 'grey',
    alignItems: 'stretch',
  });
  layer.append(g);

  const s1 = new Sprite();
  s1.attr({
    size: [50, 50],
    borderRadius: 25,
    bgcolor: 'red',
  });

  const s2 = s1.cloneNode();
  s2.attr({
    bgcolor: 'blue',
  });

  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
  });

  g.append(s1, s2, s3);
  return layer.prepareRender();
});


drawCase('auto-height container', [300, 60], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '60',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [140, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('auto-width container', [190, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '190',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [73.328125, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [153.328125, 0],
    size: [146.65625, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('wrap, align-content:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 60],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 60],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap, align-content:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 70],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 70],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 70],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 70],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 130],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap, align-content:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 35],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 35],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 35],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 35],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 95],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 95],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap, align-content:space-between', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 130],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap, align-content:space-around', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 17.5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 17.5],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 17.5],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 17.5],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 112.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 112.5],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap, align-content:stretch', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 95],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 95],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 95],
    size: [80, 105],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap-reverse, align-content:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 140],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 70],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 70],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap-reverse, align-content:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 80],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 70],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 70],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 80],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 0],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap-reverse, align-content:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 115],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 105],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 105],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 115],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 35],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 35],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap-reverse, align-content:space-between', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 140],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 0],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap-reverse, align-content:space-around', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 132.5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 122.5],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 122.5],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 132.5],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 17.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 17.5],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap-reverse, align-content:stretch', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 105],
    size: [30, 95],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 35],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 0],
    size: [80, 105],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap, alignContent:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 60],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 60],
    size: [80, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [80, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 95],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [30, 95],
    size: [80, 30],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('basic', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('auto-width item', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [0, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [80, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('justify:space-between, auto-width item', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [150, 0],
    size: [0, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('justify:space-around,auto-width item', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [23.328125, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [150, 0],
    size: [0, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [196.65625, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('auto-height item', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:center, auto-height container', [300, 60], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '60',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 15],
    size: [140, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('auto-height container, auto-height item', [300, 60], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '60',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [140, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('order', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [110, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [30, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('overflow', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [120, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [120, 0],
    size: [120, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [240, 0],
    size: [60, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('overflow-vertical', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 71.421875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 71.421875],
    size: [30, 42.84375],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 114.28125],
    size: [80, 85.703125],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [190, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 80],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 120],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 60],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('justify-content:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('justify-content:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [110, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [190, 0],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('justify-content:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [55, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [165, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('justify-content:space-between', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('justify-content:space-around', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [18.328125, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [201.65625, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 100],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 75],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 50],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 70],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:stretch', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-start, align-self:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-start, align-self:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 170],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-start, align-self:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 85],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-start, align-self:stretch', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-end, align-self:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-end, align-self:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 170],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-end, align-self:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 85],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:flex-end, align-self:stretch', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:center, align-self:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 75],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 70],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:center, align-self:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 75],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 170],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 70],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:center, align-self:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 75],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 85],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 70],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:center, align-self:stretch', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 75],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 70],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:stretch, align-self:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:stretch, align-self:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 170],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:stretch, align-self:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 85],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('align-items:stretch, align-self:stretch', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [110, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [190, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [55, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [165, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:space-between', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:space-around', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [18.328125, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [201.65625, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row-reverse, justify-content:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [190, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row-reverse, justify-content:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [110, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row-reverse, justify-content:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [165, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [55, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row-reverse, justify-content:space-between', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row-reverse, justify-content:space-around', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [201.65625, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 0],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [18.328125, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 80],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 60],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 110],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 140],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 30],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 80],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 110],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:space-between', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 80],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 140],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:space-around', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 10],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 80],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 130],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column-reverse, justify-content:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 120],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 60],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column-reverse, justify-content:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 90],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 60],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column-reverse, justify-content:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 120],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 90],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 30],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column-reverse, justify-content:space-between', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 90],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column-reverse, justify-content:space-around', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 140],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 90],
    size: [30, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 10],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex & justify-content:flex-start', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [140, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex & justify-content:flex-end', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [140, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex & justify-content:center', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [140, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex & justify-content:space-between', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [140, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex & justify-content:space-around', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [140, 100],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [220, 0],
    size: [80, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('tmp2', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 110],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-flow:row wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-flow:row nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-flow:column wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-flow:column nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:flex-start,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:flex-start,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:flex-start,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:flex-end,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [70, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [150, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [180, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [270, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [220, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:flex-end,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:flex-end,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [70, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [150, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [180, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [270, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [220, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:center,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [35, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [115, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [145, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [235, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [235, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [110, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:center,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:center,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [35, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [115, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [145, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [235, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [235, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [110, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:space-between,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [97.5, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [145, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [252.5, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:space-between,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:space-between,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [97.5, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [145, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [252.5, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:space-around,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [7, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [101, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [145, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [249, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [263, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [110, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:space-around,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, justify-content:space-around,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [7, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [101, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [145, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [249, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [263, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [110, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:flex-start,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:flex-start,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:flex-start,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 110],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:flex-end,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 40],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 90],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 90],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 150],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:flex-end,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:flex-end,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 40],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 90],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 90],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 150],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:center,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 20],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 70],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 70],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 130],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 65],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 135],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:center,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:center,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 20],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 70],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 70],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 130],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 65],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 135],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:space-between,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 63.328125],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 76.65625],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 150],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:space-between,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:space-between,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 63.328125],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 76.65625],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 150],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:space-around,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 65],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 75],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 145],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 32.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 167.5],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:space-around,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, justify-content:space-around,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 65],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 75],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 145],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 32.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 167.5],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:flex-start,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 135],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:flex-start,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:flex-start,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 200],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 65],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:flex-end,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 85],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 135],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 75],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 85],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 65],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:flex-end,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 200],
    size: [29.03125, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 140],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 130],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 200],
    size: [77.40625, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:flex-end,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 65],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 65],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 65],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 65],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 65],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:center,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 42.5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 67.5],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 37.5],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 42.5],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 32.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 167.5],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:center,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 75],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 100],
    size: [29.03125, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 70],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 75],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 65],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 100],
    size: [77.40625, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:center,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 107.5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 132.5],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 102.5],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 107.5],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 97.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 32.5],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:stretch,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:stretch,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-items:stretch,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:flex-start,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:flex-start,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [0, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:flex-start,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [300, 110],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:flex-end,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [75, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [125, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [65, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [155, 110],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [220, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:flex-end,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [300, 95.640625],
    size: [0, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [220, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:flex-end,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [145, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [145, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [145, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 110],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:center,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [37.5, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [62.5, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [32.5, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [77.5, 110],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [212.5, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [187.5, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:center,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [110, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [135, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [105, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [150, 95.640625],
    size: [0, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [135, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [110, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:center,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [182.5, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [207.5, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [177.5, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [222.5, 110],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [57.5, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [32.5, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:stretch,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:stretch,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-items:stretch,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 110],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 130],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 130],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 130],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 130],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 130],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 130],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 20],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 10],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 20],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 65],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 65],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 65],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 65],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 65],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 135],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 85],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 65],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 75],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 85],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 65],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 65],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 130],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 32.5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 32.5],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 32.5],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 32.5],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 32.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 167.5],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 117.5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 97.5],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 107.5],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 117.5],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 97.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 32.5],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 135],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 65],
    size: [30, 135],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 0],
    size: [80, 65],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [90, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [90, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [210, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [180, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [130, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [130, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [130, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [130, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [130, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [220, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [220, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [90, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [140, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [80, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [80, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [50, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [65, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [65, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [65, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [65, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [155, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [205, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [145, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [220, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [220, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [210, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [50, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [32.5, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [32.5, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [32.5, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [32.5, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [187.5, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [187.5, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [187.5, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [237.5, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [177.5, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [177.5, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [82.5, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [32.5, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:wrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [155, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [155, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:nowrap', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:wrap-reverse', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [220, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [270, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [210, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [145, 110],
    size: [155, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [115, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [65, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row;basic', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column;basic', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row;flex:1-2-3', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [50, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [50, 0],
    size: [100, 30],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [150, 0],
    size: [150, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:column;flex:1-2-3', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 33.328125],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 33.328125],
    size: [30, 66.65625],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 100],
    size: [80, 100],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  return layer.prepareRender();
});

drawCase('flex-direction:row;auto-width-height item', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column;auto-width-height item', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:wrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:nowrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:wrap-reverse,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:wrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:nowrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:wrap-reverse,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:wrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:nowrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:wrap-reverse,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:wrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:nowrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:wrap-reverse,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:wrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:nowrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:wrap-reverse,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:wrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:nowrap,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:wrap-reverse,auto-width container', [310, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '310',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 150],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 140],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 150],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [230, 0],
    size: [80, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:wrap,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [90, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [90, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:nowrap,auto-width container', [90, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '90',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [90, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:wrap-reverse,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [90, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [140, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [80, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [80, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [50, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:wrap,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [90, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [90, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:nowrap,auto-width container', [90, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '90',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [90, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:wrap-reverse,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [90, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [140, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [80, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [80, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [50, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:wrap,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [90, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [90, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:nowrap,auto-width container', [90, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '90',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [90, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:wrap-reverse,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [90, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [140, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [80, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [80, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [50, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:wrap,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [90, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [90, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:nowrap,auto-width container', [90, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '90',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [90, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:wrap-reverse,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [90, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [140, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [80, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [80, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [50, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:wrap,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [90, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [90, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:nowrap,auto-width container', [90, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '90',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [90, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:wrap-reverse,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [90, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [140, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [80, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [80, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [50, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:wrap,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [90, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [90, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:nowrap,auto-width container', [90, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '90',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 43.46875],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [90, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 200],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:wrap-reverse,auto-width container', [170, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '170',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [90, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [140, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [80, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [80, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [50, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:wrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:nowrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:wrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:nowrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:wrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:nowrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:wrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:nowrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:wrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:nowrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:wrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [80, 0],
    size: [30, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [110, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [200, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [200, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 70],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:nowrap,auto-height container', [300, 70], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '70',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [77.40625, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [106.4375, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [193.546875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [193.546875, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [222.578125, 0],
    size: [77.40625, 70],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:wrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:nowrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:wrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:nowrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:wrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:nowrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:wrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:nowrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:wrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:nowrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:wrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:nowrap,auto-height container', [300, 230], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '230',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 50],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [300, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 160],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 230],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [250, 0],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [160, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [250, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 60],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [80, 0],
    size: [80, 60],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-start,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [241.921875, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [154.828125, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [241.921875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270.953125, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [77.40625, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 70],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [250, 70],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [160, 70],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [250, 70],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [80, 70],
    size: [80, 60],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:flex-end,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [241.921875, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [154.828125, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [241.921875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270.953125, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [77.40625, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 35],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [250, 35],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [160, 35],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [250, 35],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 95],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [80, 35],
    size: [80, 60],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:center,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [241.921875, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [154.828125, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [241.921875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270.953125, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [77.40625, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [250, 0],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [160, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [250, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 130],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [80, 0],
    size: [80, 60],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-between,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [241.921875, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [154.828125, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [241.921875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270.953125, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [77.40625, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 17.5],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [250, 17.5],
    size: [30, 60],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [160, 17.5],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [250, 17.5],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 112.5],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [80, 17.5],
    size: [80, 60],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:space-around,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [241.921875, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [154.828125, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [241.921875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270.953125, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [77.40625, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [250, 0],
    size: [30, 95],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [160, 0],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [250, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 95],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [80, 0],
    size: [80, 95],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:row, align-content:stretch,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [77.40625, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [241.921875, 0],
    size: [29.03125, 200],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [154.828125, 0],
    size: [87.09375, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [241.921875, 0],
    size: [0, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270.953125, 0],
    size: [29.03125, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [77.40625, 0],
    size: [77.40625, 200],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 160],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [90, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 50],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-start,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 139.125],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 43.46875],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [180, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [180, 160],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [180, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [180, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [180, 50],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:flex-end,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 139.125],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 43.46875],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [90, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [90, 160],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [90, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [90, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [180, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [90, 50],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:center,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 139.125],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 43.46875],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 160],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [270, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 50],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-between,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 139.125],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 43.46875],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [45, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [45, 160],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [45, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [45, 110],
    size: [90, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [225, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [45, 50],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:space-around,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 139.125],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 43.46875],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:wrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 50],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 160],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 50],
    size: [90, 60],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 110],
    size: [180, 50],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [180, 0],
    size: [30, 70],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 50],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});

drawCase('flex-direction:column, align-content:stretch,flex-wrap:nowrap,order:1-6-3-4-2-5', [300, 200], (layer, size) => {
  const g = new Group();
  g.attr({
    width: '300',
    height: '200',
    bgcolor: 'rgb(128, 128, 128)',
  });
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({
    pos: [0, 0],
    size: [80, 43.46875],
    bgcolor: 'rgb(255, 0, 0)',
  });
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({
    pos: [0, 139.125],
    size: [30, 0],
    bgcolor: 'rgb(0, 0, 0)',
  });
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({
    pos: [0, 43.46875],
    size: [90, 52.171875],
    bgcolor: 'rgb(0, 0, 255)',
  });
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({
    pos: [0, 95.640625],
    size: [300, 43.46875],
    bgcolor: 'rgb(144, 238, 144)',
  });
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({
    pos: [0, 139.125],
    size: [30, 60.859375],
    bgcolor: 'rgb(173, 216, 230)',
  });
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({
    pos: [0, 43.46875],
    size: [80, 0],
    bgcolor: 'rgb(255, 192, 203)',
  });
  g.append(s5);


  return layer.prepareRender();
});