import Attr from '../src/core/attr';

const test = require('ava');

test('merge', (t) => {
  const node = {
    updateStyles() {},
    attr(key, value) {
      this._attr[key] = value;
    },
  };
  const attr = new Attr({});
  attr.id = 'test';
  attr.class = 'abc';
  attr.name = 'def';
  attr.foo = 'bar';
  attr.__private = 'private';

  const nodeAttr = new Attr(node);
  node._attr = nodeAttr;

  const n = attr.serialize();
  nodeAttr.merge(n);

  t.is(nodeAttr.class, 'abc');
  t.is(nodeAttr.name, 'def');
  t.is(nodeAttr.foo, 'bar');
  t.falsy(nodeAttr.id);
  t.falsy(nodeAttr.__private);
});

test('serialize', (t) => {
  const attr = new Attr({updateStyles: () => {}});
  attr.id = 'test';
  attr.class = 'abc';
  attr.name = 'def';
  attr.foo = 'bar';
  attr.__private = 'private';

  const n = JSON.parse(attr.serialize());
  t.is(n.class, 'abc');
  t.falsy(n.id);
  t.is(n.name, 'def');
  t.is(n.foo, 'bar');
  t.falsy(n.__private);
});

test('set-get', (t) => {
  const node = {
    dataset: {},
    data(key, value) {
      if(value != null) {
        this.dataset[key] = value;
      } else {
        return this.dataset[key];
      }
    },
  };
  const attr = new Attr(node);
  attr.set('foo', 'bar');
  t.is(attr.get('foo'), 'bar');
  attr.quietSet('data-foo', 'data-bar');
  t.is(node.dataset.foo, 'data-bar');
  t.is(attr.get('data-foo'), 'data-bar');
});
