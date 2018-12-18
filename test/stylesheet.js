import {stylesheet, BaseNode, Sprite, Group} from '../src';

const test = require('ava');

function initStyleSheet() {
  stylesheet.cssRules.length = 0;
  stylesheet.relatedAttributes.clear();
}

test('add rules', (t) => {
  initStyleSheet();

  const rules = {
    '#test': {
      bgcolor: 'red',
      x: 100,
      y: 200,
    },
    'sprite.foo': {
      width: 200,
      height: 200,
    },
  };
  stylesheet.add(rules);

  const cssRules = stylesheet.cssRules;
  t.is(cssRules.length, 2);
  t.is(cssRules[0].selector, 'sprite.foo');
  t.is(cssRules[0].attributes.width, 200);
  t.is(cssRules[0].priority, 1001);
  t.is(cssRules[1].selector, '#test');
  t.is(cssRules[1].priority, 1000000);
  t.is(cssRules[1].attributes.x, 100);
});

test('multi selector rules', (t) => {
  initStyleSheet();

  const sel = `
    #test,
    label.test,
    path:nth-child(1)
  `;
  const rules = {
    [sel]: {
      bgcolor: 'red',
      x: 100,
      y: 200,
    },
  };
  stylesheet.add(rules);

  const cssRules = stylesheet.cssRules;
  t.is(cssRules.length, 3);
  t.is(cssRules[0].selector, 'label.test');
  t.is(cssRules[0].attributes.y, 200);
  t.is(cssRules[0].priority, 1001);
  t.is(cssRules[1].priority, 1001);
  t.is(cssRules[2].priority, 1000000);
  t.deepEqual([...stylesheet.relatedAttributes], ['id', 'class']);
});

test('match rules', (t) => {
  initStyleSheet();
  const rules = {
    '#test, #test2': {
      bgcolor: 'red',
      x: 100,
      y: 200,
    },
    'sprite.foo': {
      width: 200,
      height: 200,
      bgcolor: 'blue',
    },
  };
  stylesheet.add(rules);

  const node1 = new BaseNode();
  node1.id = 'test';
  stylesheet.computeStyle(node1);

  const node2 = new Sprite();
  node2.className = 'foo';
  stylesheet.computeStyle(node2);

  const node3 = node2.cloneNode();
  node3.id = 'test2';
  stylesheet.computeStyle(node3);

  t.is(node1.attr('x'), 100);
  t.is(node1.attr('bgcolor'), 'red');

  t.is(node2.attr('bgcolor'), 'rgba(0,0,255,1)');
  t.is(node3.attr('bgcolor'), 'rgba(255,0,0,1)');
});

test('descendant & child', (t) => {
  initStyleSheet();
  const rules = {
    'group sprite': {
      bgcolor: 'red',
    },
    '.group1 > sprite': {
      bgcolor: 'green',
    },
    sprite: {
      bgcolor: 'blue',
    },
  };
  stylesheet.add(rules);

  const group = new Group();

  const node1 = new Sprite();
  group.append(node1);
  group.className = 'group1';

  const node2 = new Sprite();

  const group2 = new Group();
  const node3 = new Sprite();
  group.append(group2);
  group2.append(node3);

  stylesheet.computeStyle(node1);
  stylesheet.computeStyle(node2);
  stylesheet.computeStyle(node3);

  t.is(node1.attr('bgcolor'), 'rgba(0,128,0,1)');
  t.is(node2.attr('bgcolor'), 'rgba(0,0,255,1)');
  t.is(node3.attr('bgcolor'), 'rgba(255,0,0,1)');
});

test('adjacent & sibling', (t) => {
  initStyleSheet();
  const rules = {
    sprite: {
      bgcolor: 'white',
    },
    '.node1 ~ sprite': {
      bgcolor: 'red',
      x: 100,
      y: 200,
    },
    '.node1 + sprite': {
      bgcolor: 'blue',
    },
  };
  stylesheet.add(rules);

  const group = new Group();

  const node1 = new Sprite();
  node1.className = 'node1';

  const node2 = new Sprite();
  const node3 = new Sprite();
  const node4 = new Sprite();

  group.append(node1, node2, node3, node4);

  stylesheet.computeStyle(node1);
  stylesheet.computeStyle(node2);
  stylesheet.computeStyle(node3);
  stylesheet.computeStyle(node4);

  t.is(node1.attr('bgcolor'), 'rgba(255,255,255,1)');
  t.is(node2.attr('bgcolor'), 'rgba(0,0,255,1)');
  t.is(node3.attr('bgcolor'), 'rgba(255,0,0,1)');
  t.is(node4.attr('bgcolor'), 'rgba(255,0,0,1)');
});
