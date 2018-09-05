import {parseValue, deprecate, attr, setDeprecation} from '../src/utils/decorators';

const test = require('ava');

const _subject = Symbol('subject'),
  _attr = Symbol('attr');

class Attr {
  constructor(subject = {cache: null}) {
    this[_subject] = subject;
    subject.forceUpdate = () => {
      this.updateTimes++;
    };
    this[_attr] = {};
    this.updateTimes = 0;
  }

  get subject() {
    return this[_subject];
  }

  set(key, val) {
    if(val != null && typeof val === 'object') {
      val = JSON.stringify(val);
    }
    if(val !== this[_attr][key]) {
      this[_attr][key] = val;
      this.__updateTag = true;
    }
  }

  get(key) {
    let val = this[_attr][key];
    if(typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
      val = JSON.parse(val);
    }
    return val;
  }

  @attr
  set pos(val) {
    this.set('pos', val);
  }

  @attr
  set border(val) {
    this.set('border', val);
  }

  @attr
  set abc(val) {
    this.set('abc', val);
  }

  @attr
  @parseValue(parseInt)
  set width(val) {
    this.set('width', val);
  }

  @deprecate
  bar() {
    return 'bar';
  }

  @deprecate('out of date...')
  @attr
  set bar2(val) {
    this.set('bar2', val);
  }

  @deprecate('bar3333', 'out of date')
  set bar3(val) {
    this.set('bar3', val);
  }
}

// test('@attr', (t) => {
//   t.throws(() => {
//     /* eslint-disable no-unused-vars */
//     class Attr {
//       @attr
//       set bar(val) {
//         this._bar = val
//       }
//       get bar() {
//         return this._bar
//       }
//     }
//     /* eslint-enable no-unused-vars */
//   }, Error)
// })

test('attr', (t) => {
  const node = new Attr();
  node.pos = [0, 1];
  t.deepEqual(node.pos, [0, 1]);
  node.pos = [0, 1];
  node.pos = [0, 2];
  t.deepEqual(node.pos, [0, 2]);
  t.is(node.updateTimes, 2);
  node.pos = null;
  node.pos = undefined;
  t.is(node.updateTimes, 4);
  node.pos = 'bar';
  node.pos = 'bar';
  t.is(node.updateTimes, 5);
  node.pos = [0];
  node.pos = [0, 2];
  t.is(node.updateTimes, 7);
});

test('attr parseValue', (t) => {
  const node = new Attr();
  node.width = '100px';

  t.is(node.width, 100);
});

test('deprecate', (t) => {
  const node = new Attr();
  node.bar();
  node.bar2 = 'test';
  t.is(node.bar2, 'test');
  node.bar3 = 'test3';
  t.is(node.bar3, undefined);
  node.bar2 = 'aaa';
  t.is(node.bar2, 'aaa');
  setDeprecation('test');
});
