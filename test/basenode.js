import {BaseNode} from '../src';

const test = require('ava');

test('basenode event', (t) => {
  const s1 = new BaseNode();

  t.plan(2);

  s1.on('test', (evt) => {
    t.is(evt.x, 1);
    t.is(evt.y, 2);
  });

  s1.dispatchEvent('test', {x: 1, y: 2}, true);
});

test('basenode event 2', (t) => {
  const s1 = new BaseNode();

  t.plan(3);

  s1.addEventListener('test', function f(evt) {
    if(evt.x && evt.y) {
      t.is(evt.x, 1);
      t.is(evt.y, 2);
    } else {
      s1.removeEventListener('test', f);
    }
  });

  s1.dispatchEvent('test', {x: 1, y: 2}, true);
  s1.dispatchEvent('test', {x: 0, y: 0}, true);
  s1.dispatchEvent('test', {x: 3, y: 4}, true);

  t.throws(() => {
    s1.dispatchEvent('test', {});
  });
});

test('basenode event 3', (t) => {
  const s1 = new BaseNode(),
    s2 = new BaseNode();

  t.plan(6);

  s1.on(['test', 'test2'], (evt) => {
    console.log(`s1 ${evt.msg}`); // eslint-disable-line no-console
    t.truthy(evt.stopDispatch != null);
    t.falsy(evt.terminated);
    if(evt.type === 'test') {
      evt.stopDispatch();
    } else {
      s1.off(['test']);
    }
  });

  s2.on(['test', 'test2'], (evt) => {
    console.log(`s2 ${evt.msg}`); // eslint-disable-line no-console
    if(evt.terminated) {
      throw new Error('should not called');
    } else {
      t.is(evt.target, s2);
    }
  })

  ;[s1, s2].reduce((evt, node) => {
    if(!evt.terminated) {
      node.dispatchEvent('test', evt, true);
    }
    return evt;
  }, {msg: 'trigger test'})

  ;[s1, s2].reduce((evt, node) => {
    if(!evt.terminated) {
      node.dispatchEvent('test2', evt, true);
    }
    return evt;
  }, {msg: 'trigger test2'})

  ;[s1, s2].reduce((evt, node) => {
    if(!evt.terminated) {
      node.dispatchEvent('test', evt, true);
    }
    return evt;
  }, {msg: 'trigger test'});
});