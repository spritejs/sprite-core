import {createCanvas} from 'canvas';
import {Group, Sprite, Layer} from '../src';
import {compare} from './helpers';

const test = require('ava');

test('draw group 1', async (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

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

  const isEqual = await compare(canvas, 'group-1');
  t.truthy(isEqual);
  t.falsy(g.isVirtual);
});

test('draw virtual group 1', async (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

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

  const isEqual = await compare(canvas, 'group-1-virtual');
  t.truthy(isEqual);
  t.truthy(g.isVirtual);
});

test('draw group 2', async (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

  const clipPath = 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z';

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

  const g = layer.group(s1, s2, s3, s4);
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

  await layer.prepareRender();

  const isEqual = await compare(canvas, 'group-2');
  t.truthy(isEqual);
});

test('draw group 3 not cached', async (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

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

  const s4 = s1.cloneNode();
  s4.attr({
    x: -1000,
    y: -1000,
  });

  g.append(s1, s2, s3, s4);

  await layer.prepareRender();

  for(let i = 0; i < 10; i++) {
    g.attr({
      x: x => x + 1,
    });
    await layer.prepareRender(); // eslint-disable-line no-await-in-loop
  }
  t.truthy(g.baseCache == null);

  s3.attr({
    y: y => y + 20,
  });
  await layer.prepareRender();

  const isEqual = await compare(canvas, 'group-3');
  t.truthy(isEqual);
});

test('draw group 3 cached', async (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

  canvas.cloneNode = function f() {
    const c = createCanvas(1, 1);
    c.cloneNode = f;
    return c;
  };

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

  const s4 = s1.cloneNode();
  s4.attr({
    x: -1000,
    y: -1000,
  });

  g.append(s1, s2, s3, s4);

  await layer.prepareRender();

  for(let i = 0; i < 10; i++) {
    g.attr({
      x: x => x + 1,
    });
    await layer.prepareRender(); // eslint-disable-line no-await-in-loop
  }
  t.truthy(g.cache != null);

  s3.attr({
    y: y => y + 20,
  });
  await layer.prepareRender();

  g.clearCache();
  t.truthy(g.baseCache == null);

  const isEqual = await compare(canvas, 'group-3');
  t.truthy(isEqual);
});

test('draw group 3-2 cached', async (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

  canvas.cloneNode = function f() {
    const c = createCanvas(1, 1);
    c.cloneNode = f;
    return c;
  };

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

  const s4 = s1.cloneNode();
  s4.attr({
    x: -1000,
    y: -1000,
  });

  g.append(s1, s2, s3, s4);

  await layer.prepareRender();

  for(let i = 0; i < 10; i++) {
    g.attr({
      x: x => x + 1,
    });
    await layer.prepareRender(); // eslint-disable-line no-await-in-loop
  }
  t.truthy(g.cache != null);

  s3.clearCache();
  t.truthy(g.cache == null);

  s3.attr({
    y: y => y + 20,
  });
  await layer.prepareRender();

  g.clearCache();
  t.truthy(g.baseCache == null);

  const isEqual = await compare(canvas, 'group-3');
  t.truthy(isEqual);
});

test('draw group 4', async (t) => {
  const canvas = createCanvas(1200, 600),
    layer = new Layer({context: canvas.getContext('2d')});

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

  s.on('click', (evt) => {
    console.log('group sprite clicked!'); // eslint-disable-line no-console
    t.is(evt.layerX, 527);
  });

  layer.dispatchEvent('click', {layerX: 10, layerY: 10});
  layer.dispatchEvent('click', {layerX: 527, layerY: 230});

  await layer.prepareRender();

  const isEqual = await compare(canvas, 'group-4');
  t.truthy(isEqual);

  t.truthy(g2.svg != null);
  g2.attr('clip', null);
  t.is(g2.svg, null);
});

test('draw group 6', async (t) => {
  const canvas = createCanvas(600, 300),
    layer = new Layer({context: canvas.getContext('2d')});

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

  const isEqual = await compare(canvas, 'group-6');
  t.truthy(isEqual);
});

test('auto-height container', async (t) => {
  const canvas = createCanvas(300, 60),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'auto-height container');
  t.truthy(isEqual);
});

test('auto-width container', async (t) => {
  const canvas = createCanvas(190, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'auto-width container');
  t.truthy(isEqual);
});

test('flex', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, flex: 2, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex');
  t.truthy(isEqual);
});

test('wrap, align-content:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', alignContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap, align-content:flex-start');
  t.truthy(isEqual);
});

test('wrap, align-content:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', alignContent: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap, align-content:flex-end');
  t.truthy(isEqual);
});

test('wrap, align-content:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', alignContent: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap, align-content:center');
  t.truthy(isEqual);
});

test('wrap, align-content:space-between', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', alignContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap, align-content:space-between');
  t.truthy(isEqual);
});

test('wrap, align-content:space-around', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', alignContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap, align-content:space-around');
  t.truthy(isEqual);
});

test('wrap, align-content:stretch', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', alignContent: 'stretch', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap, align-content:stretch');
  t.truthy(isEqual);
});

test('wrap-reverse, align-content:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap-reverse', alignContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap-reverse, align-content:flex-start');
  t.truthy(isEqual);
});

test('wrap-reverse, align-content:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap-reverse', alignContent: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap-reverse, align-content:flex-end');
  t.truthy(isEqual);
});

test('wrap-reverse, align-content:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap-reverse', alignContent: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap-reverse, align-content:center');
  t.truthy(isEqual);
});

test('wrap-reverse, align-content:space-between', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap-reverse', alignContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap-reverse, align-content:space-between');
  t.truthy(isEqual);
});

test('wrap-reverse, align-content:space-around', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap-reverse', alignContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap-reverse, align-content:space-around');
  t.truthy(isEqual);
});

test('wrap-reverse, align-content:stretch', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap-reverse', alignContent: 'stretch', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap-reverse, align-content:stretch');
  t.truthy(isEqual);
});

test('wrap, alignContent:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', alignContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap, alignContent:flex-start');
  t.truthy(isEqual);
});

test('wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, width: 80, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({height: 30, width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'wrap');
  t.truthy(isEqual);
});

test('basic', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'basic');
  t.truthy(isEqual);
});

test('auto-width item', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'auto-width item');
  t.truthy(isEqual);
});

test('justify:space-between, auto-width item', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'justify:space-between, auto-width item');
  t.truthy(isEqual);
});

test('justify:space-around,auto-width item', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'justify:space-around,auto-width item');
  t.truthy(isEqual);
});

test('auto-height item', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'auto-height item');
  t.truthy(isEqual);
});

test('align-items:center, auto-height container', async (t) => {
  const canvas = createCanvas(300, 60),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'center', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:center, auto-height container');
  t.truthy(isEqual);
});

test('auto-height container, auto-height item', async (t) => {
  const canvas = createCanvas(300, 60),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'auto-height container, auto-height item');
  t.truthy(isEqual);
});

test('order', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 3, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, order: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, order: 2, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'order');
  t.truthy(isEqual);
});

test('overflow', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 2000, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 2000, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 1000, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'overflow');
  t.truthy(isEqual);
});

test('overflow-vertical', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 500, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 300, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 600, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'overflow-vertical');
  t.truthy(isEqual);
});

test('flex-direction:row', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row');
  t.truthy(isEqual);
});

test('flex-direction:row-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column');
  t.truthy(isEqual);
});

test('flex-direction:column-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column-reverse');
  t.truthy(isEqual);
});

test('justify-content:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'justify-content:flex-start');
  t.truthy(isEqual);
});

test('justify-content:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'justify-content:flex-end');
  t.truthy(isEqual);
});

test('justify-content:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'justify-content:center');
  t.truthy(isEqual);
});

test('justify-content:space-between', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'justify-content:space-between');
  t.truthy(isEqual);
});

test('justify-content:space-around', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'justify-content:space-around');
  t.truthy(isEqual);
});

test('align-items:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-start');
  t.truthy(isEqual);
});

test('align-items:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-end');
  t.truthy(isEqual);
});

test('align-items:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:center');
  t.truthy(isEqual);
});

test('align-items:stretch', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'stretch', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:stretch');
  t.truthy(isEqual);
});

test('align-items:flex-start, align-self:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'flex-start', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-start, align-self:flex-start');
  t.truthy(isEqual);
});

test('align-items:flex-start, align-self:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'flex-end', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-start, align-self:flex-end');
  t.truthy(isEqual);
});

test('align-items:flex-start, align-self:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'center', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-start, align-self:center');
  t.truthy(isEqual);
});

test('align-items:flex-start, align-self:stretch', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'stretch', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-start, align-self:stretch');
  t.truthy(isEqual);
});

test('align-items:flex-end, align-self:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'flex-start', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-end, align-self:flex-start');
  t.truthy(isEqual);
});

test('align-items:flex-end, align-self:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'flex-end', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-end, align-self:flex-end');
  t.truthy(isEqual);
});

test('align-items:flex-end, align-self:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'center', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-end, align-self:center');
  t.truthy(isEqual);
});

test('align-items:flex-end, align-self:stretch', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'stretch', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:flex-end, align-self:stretch');
  t.truthy(isEqual);
});

test('align-items:center, align-self:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'flex-start', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:center, align-self:flex-start');
  t.truthy(isEqual);
});

test('align-items:center, align-self:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'flex-end', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:center, align-self:flex-end');
  t.truthy(isEqual);
});

test('align-items:center, align-self:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'center', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:center, align-self:center');
  t.truthy(isEqual);
});

test('align-items:center, align-self:stretch', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'stretch', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:center, align-self:stretch');
  t.truthy(isEqual);
});

test('align-items:stretch, align-self:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'stretch', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'flex-start', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:stretch, align-self:flex-start');
  t.truthy(isEqual);
});

test('align-items:stretch, align-self:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'stretch', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'flex-end', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:stretch, align-self:flex-end');
  t.truthy(isEqual);
});

test('align-items:stretch, align-self:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'stretch', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'center', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:stretch, align-self:center');
  t.truthy(isEqual);
});

test('align-items:stretch, align-self:stretch', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({alignItems: 'stretch', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, alignSelf: 'stretch', bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'align-items:stretch, align-self:stretch');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:flex-start');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:flex-end');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:center');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:space-between', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:space-between');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:space-around', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:space-around');
  t.truthy(isEqual);
});

test('flex-direction:row-reverse, justify-content:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row-reverse', justifyContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row-reverse, justify-content:flex-start');
  t.truthy(isEqual);
});

test('flex-direction:row-reverse, justify-content:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row-reverse', justifyContent: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row-reverse, justify-content:flex-end');
  t.truthy(isEqual);
});

test('flex-direction:row-reverse, justify-content:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row-reverse', justifyContent: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row-reverse, justify-content:center');
  t.truthy(isEqual);
});

test('flex-direction:row-reverse, justify-content:space-between', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row-reverse', justifyContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row-reverse, justify-content:space-between');
  t.truthy(isEqual);
});

test('flex-direction:row-reverse, justify-content:space-around', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row-reverse', justifyContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row-reverse, justify-content:space-around');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:flex-start');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:flex-end');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:center');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:space-between', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:space-between');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:space-around', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:space-around');
  t.truthy(isEqual);
});

test('flex-direction:column-reverse, justify-content:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column-reverse', justifyContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column-reverse, justify-content:flex-start');
  t.truthy(isEqual);
});

test('flex-direction:column-reverse, justify-content:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column-reverse', justifyContent: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column-reverse, justify-content:flex-end');
  t.truthy(isEqual);
});

test('flex-direction:column-reverse, justify-content:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column-reverse', justifyContent: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column-reverse, justify-content:center');
  t.truthy(isEqual);
});

test('flex-direction:column-reverse, justify-content:space-between', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column-reverse', justifyContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column-reverse, justify-content:space-between');
  t.truthy(isEqual);
});

test('flex-direction:column-reverse, justify-content:space-around', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column-reverse', justifyContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column-reverse, justify-content:space-around');
  t.truthy(isEqual);
});

test('flex & justify-content:flex-start', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'flex-start', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex & justify-content:flex-start');
  t.truthy(isEqual);
});

test('flex & justify-content:flex-end', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'flex-end', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex & justify-content:flex-end');
  t.truthy(isEqual);
});

test('flex & justify-content:center', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'center', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex & justify-content:center');
  t.truthy(isEqual);
});

test('flex & justify-content:space-between', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'space-between', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex & justify-content:space-between');
  t.truthy(isEqual);
});

test('flex & justify-content:space-around', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({justifyContent: 'space-around', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 100, width: 30, flex: 1, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex & justify-content:space-around');
  t.truthy(isEqual);
});

test('tmp2', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'tmp2');
  t.truthy(isEqual);
});

test('flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-flow:row wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexFlow: 'row wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-flow:row wrap');
  t.truthy(isEqual);
});

test('flex-flow:row nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexFlow: 'row nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-flow:row nowrap');
  t.truthy(isEqual);
});

test('flex-flow:column wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexFlow: 'column wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-flow:column wrap');
  t.truthy(isEqual);
});

test('flex-flow:column nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexFlow: 'column nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-flow:column nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:flex-start,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:flex-start,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:flex-start,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:flex-start,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:flex-start,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:flex-start,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:flex-end,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:flex-end,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:flex-end,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:flex-end,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:flex-end,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:flex-end,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:center,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:center,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:center,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'center', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:center,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:center,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:center,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:space-between,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:space-between,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:space-between,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:space-between,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:space-between,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:space-between,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:space-around,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:space-around,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:space-around,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:space-around,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, justify-content:space-around,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, justify-content:space-around,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:flex-start,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:flex-start,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:flex-start,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:flex-start,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:flex-start,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:flex-start,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:flex-end,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'flex-end', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:flex-end,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:flex-end,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'flex-end', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:flex-end,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:flex-end,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'flex-end', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:flex-end,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:center,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:center,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:center,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'center', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:center,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:center,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'center', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:center,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:space-between,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:space-between,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:space-between,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:space-between,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:space-between,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:space-between,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:space-around,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'space-around', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:space-around,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:space-around,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'space-around', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:space-around,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, justify-content:space-around,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', justifyContent: 'space-around', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, justify-content:space-around,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:flex-start,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:flex-start,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:flex-start,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:flex-start,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:flex-start,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:flex-start,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:flex-end,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:flex-end,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:flex-end,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:flex-end,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:flex-end,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:flex-end,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:center,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:center,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:center,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:center,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:center,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:center,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:stretch,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'stretch', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:stretch,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:stretch,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'stretch', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:stretch,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-items:stretch,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignItems: 'stretch', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-items:stretch,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:flex-start,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:flex-start,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:flex-start,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:flex-start,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:flex-start,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:flex-start,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:flex-end,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:flex-end,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:flex-end,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:flex-end,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:flex-end,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:flex-end,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:center,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:center,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:center,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'center', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:center,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:center,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:center,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:stretch,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'stretch', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:stretch,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:stretch,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:stretch,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-items:stretch,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignItems: 'stretch', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-items:stretch,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:wrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:wrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:nowrap', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:nowrap');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:wrap-reverse', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'wrap-reverse', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:wrap-reverse');
  t.truthy(isEqual);
});

test('flex-direction:row;basic', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row;basic');
  t.truthy(isEqual);
});

test('flex-direction:column;basic', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column;basic');
  t.truthy(isEqual);
});

test('flex-direction:row;flex:1-2-3', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, flex: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, flex: 2, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, flex: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row;flex:1-2-3');
  t.truthy(isEqual);
});

test('flex-direction:column;flex:1-2-3', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, flex: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({height: 30, width: 30, flex: 2, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 80, flex: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column;flex:1-2-3');
  t.truthy(isEqual);
});

test('flex-direction:row;auto-width-height item', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row;auto-width-height item');
  t.truthy(isEqual);
});

test('flex-direction:column;auto-width-height item', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column;auto-width-height item');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(310, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(90, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(90, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(90, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(90, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(90, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:wrap,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'wrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:wrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:nowrap,auto-width container', async (t) => {
  const canvas = createCanvas(90, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'nowrap', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:nowrap,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:wrap-reverse,auto-width container', async (t) => {
  const canvas = createCanvas(170, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'wrap-reverse', height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:wrap-reverse,auto-width container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 70),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:wrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'wrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:wrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:nowrap,auto-height container', async (t) => {
  const canvas = createCanvas(300, 230),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'nowrap', width: 300, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:nowrap,auto-height container');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-start,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-start', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-start,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:flex-end,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'flex-end', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:flex-end,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:center,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'center', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:center,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-between,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-between', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-between,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:space-around,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'space-around', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:space-around,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:row, align-content:stretch,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'row', alignContent: 'stretch', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:row, align-content:stretch,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-start,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-start', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-start,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:flex-end,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'flex-end', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:flex-end,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:center,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'center', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:center,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-between,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-between', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-between,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:space-around,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'space-around', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:space-around,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:wrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'wrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:wrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});

test('flex-direction:column, align-content:stretch,flex-wrap:nowrap,order:1-6-3-4-2-5', async (t) => {
  const canvas = createCanvas(300, 200),
    layer = new Layer({context: canvas.getContext('2d')});

  const g = new Group();
  g.attr({flexDirection: 'column', alignContent: 'stretch', flexWrap: 'nowrap', width: 300, height: 200, bgcolor: 'rgb(128, 128, 128)', display: 'flex'});
  layer.append(g);

  const s0 = new Sprite();
  s0.attr({height: 50, width: 80, order: 1, bgcolor: 'rgb(255, 0, 0)'});
  g.append(s0);


  const s1 = new Sprite();
  s1.attr({width: 30, order: 5, bgcolor: 'rgb(0, 0, 0)'});
  g.append(s1);


  const s2 = new Sprite();
  s2.attr({height: 60, width: 90, order: 3, bgcolor: 'rgb(0, 0, 255)'});
  g.append(s2);


  const s3 = new Sprite();
  s3.attr({height: 50, order: 4, bgcolor: 'rgb(144, 238, 144)'});
  g.append(s3);


  const s4 = new Sprite();
  s4.attr({height: 70, width: 30, order: 6, bgcolor: 'rgb(173, 216, 230)'});
  g.append(s4);


  const s5 = new Sprite();
  s5.attr({width: 80, order: 2, bgcolor: 'rgb(255, 192, 203)'});
  g.append(s5);


  await layer.prepareRender();

  const isEqual = await compare(canvas, 'flex-direction:column, align-content:stretch,flex-wrap:nowrap,order:1-6-3-4-2-5');
  t.truthy(isEqual);
});