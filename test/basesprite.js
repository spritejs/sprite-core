import {createCanvas} from 'canvas';
import {BaseSprite, Sprite, Layer, Color, Path, createNode} from '../src';
import {compare} from './helpers';

const test = require('ava');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

test('sprite zIndex', (t) => {
  const canvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d')});

  const s = new BaseSprite(),
    s2 = new BaseSprite(),
    s3 = new BaseSprite();

  layer.append(s, s2, s3);
  t.is(layer.children[0], s);

  s.zIndex = 100;
  t.is(layer.children[0], s2);

  t.is(s.attributes.zIndex, s.zIndex);

  const s4 = new BaseSprite();
  layer.insertBefore(s4, s2);
  t.is(layer.children[0], s4);
  t.is(s4.zOrder, 1);
  t.is(s2.zOrder, 2);

  layer.remove();
  t.is(layer.children.length, 0);
});

test.cb('sprite data', (t) => {
  const s = new BaseSprite();
  s.data('foo', 'bar');
  t.is(s.dataset.foo, 'bar');

  const s2 = s.cloneNode();
  t.is(s2.dataset.foo, 'bar');

  s.data('foo2', 'bar2');

  s.data('foo2', async () => {
    await sleep(100);
    return 'bar3';
  });
  t.is(s.dataset.foo2, 'bar2');
  t.is(s2.dataset.foo, 'bar');

  setTimeout(() => {
    t.is(s.dataset.foo2, 'bar3');
    t.end();
  }, 200);
});

test.cb('sprite attr', (t) => {
  const s = new Sprite();
  s.name = 'foo';
  s.attr({
    name: async () => {
      await sleep(100);
      return 'bar';
    },
  });
  t.is(s.attributes.name, 'foo');
  setTimeout(() => {
    t.is(s.attributes.name, 'bar');
    t.end();
  }, 200);
});

test('sprite scale', (t) => {
  const s = new BaseSprite();
  s.attr({
    scale: [0, -0],
  });
  t.deepEqual(s.attr('scale'), [0.001, -0.001]);
});

test('sprite border', (t) => {
  const s = new BaseSprite();
  s.attr({
    border: [1, 'red'],
  });
  t.is(s.attr('border').width, 1);
  t.is(s.attr('border').style, 'solid');
  t.is(s.attr('border').color, 'rgba(255,0,0,1)');
});

test('sprite size & pos', (t) => {
  const s = new Path('M0,0L0,10L10,10L10,0z');
  s.attr({
    size: [10, 10],
    pos: [5, 15],
  });
  t.deepEqual(s.clientSize, [10, 10]);
  t.deepEqual(s.attr('pos'), [5, 15]);
  s.attr({
    size: null,
    pos: null,
  });
  t.deepEqual(s.clientSize, [12, 12]);
  t.deepEqual(s.attr('pos'), [0, 0]);
});

test('sprite visible', (t) => {
  const s = new BaseSprite();
  t.falsy(s.isVisible());
  s.attr({
    size: [10, 10],
  });
  t.falsy(s.isVisible());
  const canvas = createCanvas(600, 600),
    layer = new Layer({context: canvas.getContext('2d')});

  t.falsy(s.isVisible());
  layer.append(s);
  t.truthy(s.isVisible());

  s.attr({
    opacity: 0,
  });
  t.falsy(s.isVisible());
});

test('draw block red', async (t) => {
  const canvas = createCanvas(300, 300),
    context = canvas.getContext('2d');

  const s = new BaseSprite();
  s.attr({
    anchor: 0.5,
    size: [150, 150],
    pos: [150, 150],
    bgcolor: 'red',
  });
  s.connect(context).draw();

  let isEqual = await compare(canvas, 'red-block-150-300-center');
  t.truthy(isEqual);

  context.clearRect(0, 0, 300, 300);
  s.attr({
    anchor: 0,
  });
  s.draw();

  isEqual = await compare(canvas, 'red-block-150-300-right-bottom');
  t.truthy(isEqual);
});

test('transform origin repaint dirty', async (t) => {
  const canvas = createCanvas(300, 300);
  canvas.cloneNode = function () {
    return createCanvas(300, 300);
  };

  const layer = new Layer({context: canvas.getContext('2d'), renderMode: 'repaintDirty'});

  const s = new BaseSprite();
  s.attr({
    anchor: 0.5,
    pos: [150, 150],
    bgcolor: 'red',
    size: [20, 40],
  });
  t.deepEqual(s.transform.m, [1, 0, 0, 1, 0, 0]);

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

  const isEqual = await compare(canvas, 'rotate-origin');
  t.truthy(isEqual);
});

test('transform origin', async (t) => {
  const canvas = createCanvas(300, 300),
    shadowCanvas = createCanvas(300, 300),
    layer = new Layer({context: canvas.getContext('2d'), shadowContext: shadowCanvas.getContext('2d')});

  const s = new BaseSprite();
  s.attr({
    anchor: 0.5,
    pos: [150, 150],
    bgcolor: 'red',
    size: [20, 40],
  });
  t.deepEqual(s.transform.m, [1, 0, 0, 1, 0, 0]);

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

  const isEqual = await compare(canvas, 'rotate-origin');
  t.truthy(isEqual);
});

test('user circle', async (t) => {
  const canvas = createCanvas(600, 600),
    layer = new Layer({context: canvas.getContext('2d')});

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

  const isEqual = await compare(canvas, 'user-circle');
  t.truthy(isEqual);
});

test('serialized', (t) => {
  const s = new Sprite();
  s.attr({
    x: 10,
  });
  s.id = 'myID';

  const data = s.serialize();
  t.is(data.id, 'myID');
  t.is(data.nodeType, 'sprite');

  const s2 = createNode(data.nodeType, JSON.parse(data.attrs));
  t.truthy(s2 instanceof Sprite);
  t.truthy(s2.attr('x'), 10);
});
