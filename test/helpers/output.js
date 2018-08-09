const {createCanvas, loadImage} = require('canvas');
const drawCase = require('./drawcase');
const {BaseSprite, Sprite, Label, Path, Group, Color} = require('../../lib');

drawCase('empty', [10, 10], (layer, size) => {
  const sprite = new Sprite();
  sprite.attr({
    bgcolor: 'red',
  });

  layer.append(sprite);
  return layer.prepareRender();
});


drawCase('red-block-150', [150, 150], (layer, size) => {
  const sprite = new Sprite();
  sprite.attr({
    size,
    bgcolor: 'red',
  });

  layer.append(sprite);
  return layer.prepareRender();
});

drawCase('red-block-150-300', [300, 300], (layer, size) => {
  const sprite = new Sprite();
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
  });

  layer.append(sprite);
  return layer.prepareRender();
});

drawCase('red-block-150-300-center', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite();
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 0.5,
  });

  layer.append(sprite);
  return layer.prepareRender();
});

drawCase('red-block-150-300-left-top', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite();
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 1,
  });

  layer.append(sprite);
  return layer.prepareRender();
});

drawCase('red-block-150-300-right-bottom', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite();
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: 0,
  });

  layer.append(sprite);
  return layer.prepareRender();
});

drawCase('red-block-150-300-left-bottom', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite();
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: [1, 0],
  });

  layer.append(sprite);
  return layer.prepareRender();
});

drawCase('red-block-150-300-right-top', [300, 300], (layer, [width, height]) => {
  const sprite = new Sprite();
  sprite.attr({
    size: [150, 150],
    bgcolor: 'red',
    pos: [width / 2, height / 2],
    anchor: [0, 1],
  });

  layer.append(sprite);
  return layer.prepareRender();
});

drawCase('animate-block-1', [600, 600], async (layer, [width, height]) => {
  const s = new Sprite();
  s.attr({
    size: [50, 50],
    pos: [300, 300],
    bgcolor: 'transparent',
  });
  layer.append(s);

  const anim = s.animate([
    {rotate: 360},
  ], {
    delay: 500,
    duration: 2000,
  });

  anim.timeline.playbackRate = 0;

  for(let i = 0; i < 8; i++) {
    anim.timeline.currentTime = i * 250;
    await layer.prepareRender(); // eslint-disable-line no-await-in-loop
    const ss = s.cloneNode();
    ss.attr({
      bgcolor: `rgba(${i * 30}, ${(8 - i) * 30}, 128, 0.5)`,
    });
    layer.append(ss);
  }
  await layer.prepareRender();
});

drawCase('animate-block-color', [50, 50], async (layer, [width, height]) => {
  const block = new Sprite();
  block.attr({
    size: [50, 50],
    pos: [0, 0],
    bgcolor: 'rgb(254, 0, 0)',
  });
  layer.append(block);

  const anim = block.animate([
    {bgcolor: 'rgb(0, 254, 254)'},
  ], {
    duration: 2000,
  });
  anim.timeline.playbackRate = 0;
  anim.timeline.currentTime = 1000;

  await layer.prepareRender();
});

drawCase('image-guanguan', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan1.png');

  const s = new Sprite();
  s.attr({
    textures: [img],
    pos: [150, 150],
    anchor: 0.5,
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('image-guanguan-body', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan_p.png');

  const s = new Sprite();
  s.attr({
    textures: [{image: img, srcRect: [0, 41, 86, 56]}],
    pos: [150, 150],
    anchor: 0.5,
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('image-guanguan-2', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan1.png');

  const s = new Sprite(img);
  s.attr({
    pos: [150, 150],
    anchor: 0.5,
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('image-guanguan-body-filter', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan_p.png');

  const s = new Sprite();
  s.attr({
    textures: [{image: img, srcRect: [0, 41, 86, 56], filter: {opacity: 0.5}}],
    pos: [150, 150],
    anchor: 0.5,
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('image-guanguan-body-filter-2', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan_p.png');

  const s = new Sprite();
  s.attr({
    textures: [{image: img, srcRect: [0, 41, 86, 56], filter: {dropShadow: [2, 2, 10, 'black']}}],
    pos: [150, 150],
    anchor: 0.5,
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('image-guanguan-filter-3', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan1.png');

  const s = new Sprite();
  s.attr({
    textures: [{image: img, filter: {dropShadow: [2, 2, 10, 'black']}}],
    pos: [150, 150],
    anchor: 0.5,
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('image-guanguan-parts', [300, 300], async (layer) => {
  const img = await loadImage('../res/guanguan_p.png');

  const guanguan = new Sprite();

  guanguan.attr({
    textures: [
      {image: img, srcRect: [50, 0, 46, 18], rect: [72, 66, 46, 18]}, // neck
      {image: img, srcRect: [0, 97, 86, 76], rect: [50, 0, 86, 76]}, // head
      {image: img, srcRect: [0, 41, 86, 56], rect: [50, 76, 86, 56]}, // body
      {image: img, srcRect: [0, 0, 25, 41], rect: [40, 76, 25, 41]}, // left-arm
      {image: img, srcRect: [25, 0, 25, 41], rect: [120, 76, 25, 41]}, // right-arm
    ],
    pos: [150, 10],
    size: [300, 300],
    anchor: [0.5, 0],
  });

  layer.append(guanguan);

  await layer.prepareRender();
});

drawCase('path-1', [300, 300], async (layer) => {
  const s = new Path('M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z');
  s.attr({
    pos: [150, 150],
    anchor: 0.5,
    fillColor: 'red',
    bgcolor: 'grey',
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('path-2', [300, 300], async (layer) => {
  const s = new Path();
  s.attr({
    path: {d: 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'},
    pos: [150, 150],
    anchor: 0.5,
    strokeColor: 'red',
    lineWidth: 10,
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('path-3', [300, 300], async (layer) => {
  const s = new Path();
  s.attr({
    path: {
      d: 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z',
      transform: {scale: 3},
      trim: true,
    },
    pos: [150, 150],
    anchor: 0.5,
    bgcolor: '#fff',
    lineWidth: 10,
    lineDash: [5, 10, 5],
    lineDashOffset: 10,
  });
  layer.append(s);

  await layer.prepareRender();
});

drawCase('path-4', [300, 300], async (layer) => {
  const s = new Path();
  s.attr({
    pos: [150, 150],
    anchor: 0.5,
    color: 'red',
    bgcolor: 'grey',
    lineJoin: 'round',
    lineCap: 'round',
  });
  layer.append(s);

  s.path = {d: 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z'};

  await layer.prepareRender();
});

drawCase('path-5', [800, 800], async (layer) => {
  const paths = [
    'M280,250A200,200,0,1,1,680,250A200,200,0,1,1,280,250Z',
    'M480,50L423.8,182.6L280,194.8L389.2,289.4L356.4,430L480,355.4L480,355.4L603.6,430L570.8,289.4L680,194.8L536.2,182.6Z',
    'M480,437l-29-26.4c-103-93.4-171-155-171-230.6c0-61.6,48.4-110,110-110c34.8,0,68.2,16.2,90,41.8C501.8,86.2,535.2,70,570,70c61.6,0,110,48.4,110,110c0,75.6-68,137.2-171,230.8L480,437z',
    'M595,82.1c1,1-1,2-1,2s-6.9,2-8.9,4.9c-2,2-4.9,8.8-4.9,8.8c3.9-1,8.9-2,13.8-4c1,0,2,1,3,2c1,0-11.8,4.9-14.8,6.9c-2,2-11.8,9.9-14.8,9.9c-2.9,0-9.9,1-9.9,1c1,2,2,3.9,3.9,6.9c0,0-6.9,4-6.9,4.9c-1,1-5.9,6.9-5.9,6.9s17.7,1.9,23.6-7.9c-5.9,9.8-19.7,19.7-48.2,19.7c-29.5,0-53.1-11.8-68.9-17.7c-16.7-6.9-38.4-14.8-56.1-14.8c-16.7,0-36.4,4.9-49.2,16.8c-22.6-8.8-54.1-4-68.9,9.8c-13.8,13.8-27.5,30.5-29.5,42.3c-2.9,12.9-9.8,43.3-19.7,57.2c-13.8,22.5-29.5,28.5-34.5,38.3c-4.9,9.9-4.9,30.5-4,30.5c2,1,8.9,0,12.8-2c7.9-2.9,29.5-25.6,37.4-36.4c7.9-10.9,34.5-58.1,38.4-74.8s7.9-33.5,19.7-42.3c12.8-8.8,28.5-4.9,28.5-3.9c0,0-14.7,11.8-15.7,44.3s18.7,28.6,8.8,49.2c-9.9,17.7-39.3,5.9-49.2,16.7c-7.9,8.9,0,40.3,0,46.2c0,6-3,33.5-4.9,40.4c-1,5.9,0,9.8-1,13.8c-1,3,6,3.9,6,3.9s-6,7.8-8.9,5.9c-2.9-1-4.9-1-6.9,0c-2,0-5.9,1.9-9.9,0L232.9,401c2,1,4.9,1.9,7.9,1c4-1,23.6-9.9,25.6-11.9c2.9-1,19.7-10.8,22.6-16.7c2-5.9,5.9-24.6,5.9-30.5c1-6,2-24.6,2-29.5s-1-13.8,0-17.7c2-2.9,4.9-6.9,8.9-8.9c4.9-1,10.8-1,11.8-1c2,0,18.7,2,21.6,2c3.9,0,19.7-2.9,23.6-5c4.9-0.9,7.8,0,8.9,2c2,1.9-2,4.9-2,5.9c-1,1-8.8,10.8-10.8,14.7c-2,4.9-8.8,13.8-6.9,17.7c2,3.9,2,4.9,7.8,7.9c5.9,1.9,28.5,13.8,41.3,25.6c13.8,12.7,26.6,28.4,28.6,36.4c2.9,8.9,7.8,9.8,10.8,9.8c3,1,8.9,2,8.9,5.9s-1,8.8-1,8.8l36.4,13.8c0,0,0-12.8-1-17.7c-1-5.9-6.9-11.8-11.8-17.7c-4.9-6.9-56-57.1-61-61c-4.9-3-8.9-6.9-9.8-14.7c-1-7.9,8.8-13.8,14.8-20.6c3.9-4.9,14.7-27.6,16.7-30.6c2-2.9,8.9-10.8,12.8-10.8c4.9,0,15.8,6.9,29.5,11.8c5.9,2,48.2,12.8,54.1,14.8c5.9,1,18.6,0,22.6,3.9c3.9,2.9,0,10.9-1,15.8c-1,5.9-11.8,27.5-11.8,27.5s2,7.8,2,13.8c0,6.9-2.9,31.5-5.9,39.3c-2,8.9-15.8,31.6-18.7,35.5c-2,2.9-4.9,4.9-4.9,9.9c0,4.9,8.8,6,11.8,9.8c4,3,1,8.8,0,14.8l39.4,16.7c0-2.9,2-7.9,0-9.9c-1-2.9-5.9-8.8-8.8-12.8c-2-2.9-8.9-13.8-10.8-15.8c-2-2.9-2-8.8,0-13.8c1-4.9,13.8-38.3,14.7-42.3c2-4.9,20.7-44.3,22.6-49.2c2-5.9,17.7-34.4,19.7-39.4c2-5.9,14.8-10.8,18.7-10.8c4.9,0,29.5,8.8,33.4,10.8c2.9,1,25.6,10.9,29.5,12.8c4.9,1.9,2,5.9-1,6.9c-2.9,1.9-39.4,26.5-42.3,27.5c-2.9,1-5.9,3.9-7.9,3.9c-2.9,0-6.9,3.1-6.9,4c0,2-1,5.9-5.9,5.9c-3.9,0-11.8-5.9-16.7-11.8c-6.9,3.9-11.8,6.9-14.8,12.8c-4.9,4.9-6.9,8.9-9.8,15.8c2,2,5.9,2.9,8.8,2.9h31.5c3,0,6.9-0.9,9.9-1.9c2.9-2,80.7-53.1,80.7-53.1s12.8-9.9,12.8-18.7c0-6.9-5.9-8.9-7.9-11.8c-3-1.9-20.7-13.8-23.6-15.7c-4-2.9-17.7-10.9-21.6-12.9c-3-1.9-13.8-5.8-13.8-5.8c3-8.9,5-15.8,5.9-17.7c1-2,1-19.7,2-22.7c0-2.9,5-15.7,6.9-17.7c2-2,6.9-17.7,7.9-20.7c1-1.9,8.8-24.6,12.8-24.6c3.9-1,7.9,2.9,11.8,2.9c4,1,18.7-1,26.6,0c6.9,1,15.8,9.9,17.7,10.8c2.9,1,9.8,3.9,11.8,3.9c1,0,10.8-6.9,10.8-8.8c0-2-6.9-5.9-7.9-5.9c-1-1-7.8-4.9-7.8-4.9c0,1,2.9-1.9,7.8-1.9c3.9,0,7.9,3.9,8.8,4.9c2,1,6.9,3.9,7.9,1.9c1-1,4.9-5.9,4.9-8.9c0-4-3.9-8.8-5.9-10.8s-24.6-23.6-26.6-24.6c-2.9-1-14.7-11.8-14.7-14.7c-1-2-6.9-6.9-7.9-7.9s-30.5-21.6-34.5-24.6c-3.9-2.9-7.9-7.8-7.9-12.7s-2-17.7-2-17.7s-6.9-1-9.8,1.9c-2.9,2-9.8,17.8-13.8,17.8c-10.9-2-24.6,1-24.6,2.9c1,2.9,10.8,1,10.8,1c0,1-3.9,5.9-6.9,5.9c-2,0-7.8,2-8.8,2.9c-2,0-5.9,3.1-5.9,3.1c2.9,0,5.9,0,9.8,0.9c0,0-5.9,4-8.9,4c-2.9,0-12.8,2.9-15.7,3.9c-2,1.9-9.9,7.9-9.9,7.9H589l1,2h4.9L595,82.1L595,82.1z',
    'M638.9,259.3v-23.8H380.4c-0.7-103.8-37.3-200.6-37.3-200.6s-8.5,0-22.1,0C369.7,223,341.4,465,341.4,465h22.1c0,0,11.4-89.5,15.8-191h210.2l11.9,191h22.1c0,0-5.3-96.6-0.6-205.7H638.9z',
    'M345.47,250L460.94,450L230,450Z M460.94,50L576.41,250L345.47,250Z M576.41,250L691.88,450L460.94,450Z',
  ];
  const s = new Path();
  s.attr({
    anchor: 0.5,
    pos: [400, 400],
    path: {
      d: paths[0],
      trim: true,
    },
    strokeColor: 'red',
    lineWidth: 4,
    bgcolor: 'rgba(133,0,33,0.2)',
  });
  layer.append(s);

  const s2 = s.cloneNode();
  s2.attr({
    d: paths[1],
    bgcolor: 'rgba(133,0,133,0.2)',
  });
  layer.append(s2);

  await layer.prepareRender();
});

drawCase('path-6', [300, 300], async (layer) => {
  const s = new Path();
  s.attr({
    pos: [150, 150],
    anchor: 0.5,
    color: 'red',
    bgcolor: 'grey',
    lineJoin: 'round',
    lineCap: 'round',
  });
  layer.append(s);

  s.path = {d: 'M-10,-10L20,-10L20,20Z', transform: {scale: 2}};

  await layer.prepareRender();
});

drawCase('group-1', [300, 300], async (layer) => {
  const g = new Group();
  g.attr({
    pos: [150, 150],
    anchor: 0.5,
    bgcolor: 'grey',
    rotate: 45,
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
    x: x => x + 50,
  });
  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
    y: y => y + 50,
  });

  g.append(s1, s2, s3);

  await layer.prepareRender();
});

drawCase('group-1-virtual', [300, 300], async (layer) => {
  const g = new Group();
  g.attr({
    pos: [150, 150],
    rotate: 45,
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
    x: x => x + 50,
  });
  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
    y: y => y + 50,
  });

  g.append(s1, s2, s3);

  await layer.prepareRender();
});

drawCase('group-2', [300, 300], async (layer) => {
  const clipPath = 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z';

  const g = new Group();
  g.attr({
    pos: [150, 150],
    anchor: 0.5,
    bgcolor: 'grey',
    rotate: 45,
    clip: {
      d: clipPath,
      transform: {
        scale: 3,
      },
    },
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
    x: x => x + 50,
  });
  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
    y: y => y + 50,
  });
  const s4 = s1.cloneNode();
  s4.attr({
    bgcolor: 'cyan',
    x: x => x + 50,
    y: y => y + 50,
  });

  g.append(s1, s2, s3, s4);

  await layer.prepareRender();
});

drawCase('group-3', [300, 300], async (layer) => {
  const g = new Group();
  g.attr({
    pos: [150, 150],
    anchor: 0.5,
    bgcolor: 'grey',
    rotate: 45,
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
    x: x => x + 60,
  });
  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
    y: y => y + 60,
  });

  g.append(s1, s2, s3);

  await layer.prepareRender();

  for(let i = 0; i < 10; i++) {
    g.attr({
      x: x => x + 1,
    });
    await layer.prepareRender(); // eslint-disable-line no-await-in-loop
  }

  s3.attr({
    y: y => y + 20,
  });
  await layer.prepareRender();
});

drawCase('group-4', [1200, 600], async (layer) => {
  const g = new Group();
  g.attr({
    anchor: 0.5,
    pos: [600, 300],
    size: [400, 400],
    bgcolor: 'grey',
  });
  layer.append(g);

  const clipPath = 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z';

  const g2 = new Group();
  g2.attr({
    anchor: 0.5,
    pos: [200, 200],
    size: [300, 300],
    clip: {
      d: clipPath,
      transform: {
        scale: 6,
        translate: [4, 4],
      },
    },
    bgcolor: 'blue',
  });
  g.append(g2);

  const s = new Sprite();
  s.attr({
    pos: [50, 50],
    bgcolor: 'red',
    borderRadius: 25,
    size: [50, 50],
  });
  g2.append(s);

  await layer.prepareRender();
});

drawCase('group-6', [600, 300], async (layer) => {
  const g = new Group();
  g.attr({
    pos: [150, 150],
    anchor: 0.5,
    bgcolor: 'grey',
    rotate: 45,
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
    x: x => x + 50,
  });
  const s3 = s1.cloneNode();
  s3.attr({
    bgcolor: 'green',
    y: y => y + 50,
  });

  g.append(s1, s2, s3);
  await layer.prepareRender();

  const g2 = g.cloneNode(true);
  g2.attr({
    x: x => x + 300,
  });
  layer.append(g2);

  await layer.prepareRender();
});

drawCase('batch-1', [1200, 600], async (layer) => {
  layer.canvas.cloneNode = function () {
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
    layer.append(block);
    blocks.push(block);
  }
  await layer.prepareRender();

  const batched = layer.batch(...blocks);
  batched.baseNode.attr('bgcolor', 'blue');

  await layer.prepareRender();
});

drawCase('label-48px-Arial', [800, 600], (layer, size) => {
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
  return layer.prepareRender();
});

drawCase('label-2rem-Song', [800, 600], async (layer, size) => {
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
});

drawCase('offset-path', [800, 600], async (layer, size) => {
  const path = new Path(),
    d = 'M10,80 q100,120 120,20 q140,-50 160,0';

  path.attr({
    pos: [110, 150],
    color: 'red',
    d,
  });
  layer.append(path);

  const s = new Sprite();

  s.attr({
    anchor: [0.5, 0.5],
    pos: [110, 150],
    size: [50, 25],
    bgcolor: 'red',
    offsetPath: d,
    offsetDistance: 0.5,
    zIndex: 200,
  });
  layer.appendChild(s);

  const s2 = s.cloneNode();
  s2.attr({
    offsetDistance: 0.3,
    offsetRotate: 60,
    bgcolor: 'blue',
    zIndex: 400,
  });
  layer.appendChild(s2);

  s.attr({
    offsetDistance: 0.7,
  });

  const s3 = s.cloneNode();
  s3.attr({
    offsetDistance: 1.0,
    offsetRotate: '45',
    bgcolor: 'green',
    zIndex: 600,
  });
  layer.appendChild(s3);

  const s4 = s.cloneNode();
  s4.attr({
    offsetDistance: 0,
    offsetRotate: 'reverse',
    bgcolor: 'cyan',
    scale: 1.2,
  });
  layer.appendChild(s4);

  await layer.prepareRender();
});

drawCase('gradients-block', [300, 300], async (layer, size) => {
  const s = new Sprite();

  s.attr({
    anchor: 0.5,
    pos: [150, 150],
    bgcolor: {
      vector: [0, 0, 100, 100],
      colors: [
        {offset: 0, color: 'red'},
        {offset: 1, color: 'blue'},
      ],
    },
    border: {
      width: 2,
      style: 'dashed',
      color: 'blue',
    },
    size: [100, 100],
  });

  layer.append(s);
  await layer.prepareRender();
});

drawCase('gradients-block-2', [300, 300], async (layer, size) => {
  const s = new Sprite();

  s.attr({
    anchor: 0.5,
    pos: [150, 150],
    bgcolor: {
      vector: [20, 20, 75, 75, 20, 20],
      colors: [
        {offset: 0, color: 'red'},
        {offset: 1, color: 'blue'},
      ],
    },
    size: [100, 100],
  });

  layer.append(s);
  await layer.prepareRender();
});

drawCase('obb-collision', [300, 300], async (layer, size) => {
  const s = new Sprite();
  s.attr({
    anchor: 0.5,
    pos: [100, 100],
    bgcolor: 'red',
    size: [20, 40],
    rotate: 30,
  });

  const s2 = s.cloneNode();
  s2.attr({
    rotate: 60,
    pos: [120, 90],
    bgcolor: 'blue',
  });

  const s3 = s.cloneNode();
  s3.attr({
    rotate: 90,
    pos: [200, 20],
    bgcolor: 'green',
  });
  layer.append(s, s2, s3);

  await layer.prepareRender();
});

drawCase('transition', [300, 300], async (layer, size) => {
  const s = new Sprite();
  s.attr({
    anchor: 0.5,
    pos: [30, 100],
    bgcolor: 'red',
    size: [20, 40],
    rotate: 30,
  });

  const s2 = s.cloneNode();
  const s3 = s.cloneNode();
  layer.append(s, s2, s3);

  await s2.transition(0.2).attr({
    x: x => x + 100,
  });

  await s3.transition(0.2).attr({
    x: x => x + 200,
  });

  await layer.prepareRender();
});

drawCase('rotate-origin', [300, 300], async (layer, size) => {
  const s = new Sprite();
  s.attr({
    anchor: 0.5,
    pos: [150, 150],
    bgcolor: 'red',
    size: [20, 40],
  });

  const s2 = s.cloneNode();
  s2.attr({
    transformOrigin: [0, -150],
    pos: [150, 150],
    bgcolor: 'blue',
  });

  s.attr({
    rotate: 45,
  });

  s2.attr({
    rotate: 45,
  });

  layer.append(s, s2);

  await layer.prepareRender();
});

drawCase('user-circle', [600, 600], async (layer, size) => {
  class Circle extends BaseSprite {
    get contentSize() {
      let [width, height] = this.attr('size');
      const r = this.attr('r');
      const lineWidth = this.attr('lineWidth');

      if(width === '') {
        width = r * 2 + lineWidth;
      }
      if(height === '') {
        height = r * 2 + lineWidth;
      }
      return [width, height];
    }

    render(t, context) {
      super.render(t, context);

      const bounds = this.boundingRect;
      const {strokeColor, fillColor, r, lineWidth} = this.attr();
      context.lineWidth = lineWidth;

      context.beginPath();
      context.arc(bounds[2] / 2, bounds[3] / 2, r, 0, 2 * Math.PI);
      if(fillColor) {
        context.fillStyle = fillColor;
        context.fill();
      }
      if(strokeColor && lineWidth) {
        context.strokeStyle = strokeColor;
        context.stroke();
      }
    }
  }

  Circle.defineAttributes({
    init(attr) {
      attr.setDefault({
        r: 0,
        fillColor: '',
        strokeColor: '',
        lineWidth: 0,
      });
    },
    r(attr, val) {
      attr.clearCache();
      attr.set('r', val);
    },
    fillColor(attr, color) {
      attr.clearCache();
      color = new Color(color).str;
      attr.set('fillColor', color);
    },
    strokeColor(attr, color) {
      attr.clearCache();
      color = new Color(color).str;
      attr.set('strokeColor', color);
    },
    lineWidth(attr, val) {
      attr.clearCache();
      attr.set('lineWidth', val);
    },
  });

  const s = new Circle({
    anchor: 0.5,
    bgcolor: 'hsl(180,50%,50%)',
    pos: [300, 300],
    r: 150,
    lineWidth: 6,
    strokeColor: 'red',
    fillColor: 'blue',
  });

  layer.append(s);

  await layer.prepareRender();
});

drawCase('path-anchor', [600, 600], async (layer, size) => {
  const paths = [
    'M0,0L0,100L100,100L100,0z',
  ];
  const path = new Path();
  path.attr({
    path: {d: paths[0]},
    anchor: 0.5,
    // size: [1000, 1000],
    pos: [300, 300],
    strokeColor: 'blue',
    bgcolor: '#aaa',
    lineWidth: 10,
  });

  const block = new Sprite();
  block.attr({
    anchor: 0.5,
    pos: [300, 300],
    size: [20, 20],
    bgcolor: 'red',
  });

  layer.append(path, block);

  await layer.prepareRender();
});

drawCase('path-shadow', [600, 600], async (layer, size) => {
  const paths = [
    'M0,0L0,100L100,100L100,0z',
  ];
  const path = new Path();
  path.attr({
    path: {d: paths[0]},
    anchor: 0.5,
    // size: [1000, 1000],
    pos: [300, 300],
    strokeColor: 'blue',
    bgcolor: '#aaa',
    lineWidth: 10,
    shadow: {
      blur: 10,
      offset: [10, 10],
      color: 'blue',
    },
  });

  const block = new Sprite();
  block.attr({
    anchor: 0.5,
    pos: [300, 300],
    size: [20, 20],
    bgcolor: 'red',
  });

  layer.append(path, block);

  await layer.prepareRender();
});
