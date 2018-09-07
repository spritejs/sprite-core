'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _zOrder = (0, _symbol2.default)('zOrder');
var _removeTask = (0, _symbol2.default)('removeTask');

exports.default = {
  appendChild: function appendChild(sprite) {
    var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    sprite.remove(false);

    var children = this.children;
    children.push(sprite);

    this[_zOrder] = this[_zOrder] || 0;
    sprite.connect(this, this[_zOrder]++);

    for (var i = children.length - 1; i > 0; i--) {
      var a = children[i],
          b = children[i - 1];

      if (a.zIndex < b.zIndex) {
        children[i] = b;
        children[i - 1] = a;
      }
    }

    if (update) {
      sprite.forceUpdate();
    }

    var task = sprite.enter();
    if (task instanceof _promise2.default) {
      return task.then(function () {
        return sprite;
      });
    }
    return sprite;
  },
  append: function append() {
    var _this = this;

    var isPromise = false;

    for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
      sprites[_key] = arguments[_key];
    }

    var tasks = sprites.map(function (sprite) {
      var task = _this.appendChild(sprite);
      if (task instanceof _promise2.default) isPromise = true;
      return task;
    });
    if (isPromise) return _promise2.default.all(tasks);
    return tasks;
  },
  removeChild: function removeChild(child) {
    var exit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (child[_removeTask]) return child[_removeTask];

    var idx = this.children.indexOf(child);
    if (idx === -1) {
      return null;
    }

    var that = this;
    function remove(sprite) {
      delete child[_removeTask];
      that.children.splice(idx, 1);
      if (sprite.isVisible() || sprite.lastRenderBox) {
        sprite.forceUpdate();
      }
      sprite.disconnect(that);
      return sprite;
    }

    if (exit) {
      var action = child.exit();
      if (action instanceof _promise2.default) {
        child[_removeTask] = action;
        return action.then(function () {
          return remove(child);
        });
      }
    }
    return remove(child);
  },
  clear: function clear() {
    var _this2 = this;

    var children = this.children.slice(0);
    return children.map(function (child) {
      return _this2.removeChild(child);
    });
  },
  remove: function remove() {
    var _this3 = this;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length === 0 || args.length === 1 && typeof args[0] === 'boolean') {
      if (!this.parent) return null;
      return this.parent.removeChild(!args[0]);
    }
    var isPromise = false;
    var tasks = args.map(function (sprite) {
      var task = _this3.removeChild(sprite);
      if (task instanceof _promise2.default) isPromise = true;
      return task;
    });
    if (isPromise) return _promise2.default.all(tasks);
    return tasks;
  },
  insertBefore: function insertBefore(newchild, refchild) {
    if (refchild == null) {
      return this.appendChild(newchild);
    }
    var idx = this.children.indexOf(refchild);
    if (idx >= 0) {
      this.removeChild(newchild, false);
      var refZOrder = refchild.zOrder;
      for (var i = idx; i < this.children.length; i++) {
        var child = this.children[i],
            zOrder = child.zOrder;
        delete child.zOrder;
        Object.defineProperty(child, 'zOrder', {
          value: zOrder + 1,
          writable: false,
          configurable: true
        });
      }
      this.children.splice(idx, 0, newchild);
      newchild.connect(this, refZOrder);
      newchild.forceUpdate();

      this[_zOrder] = this[_zOrder] || 0;
      this[_zOrder]++;

      var task = newchild.enter();
      if (task instanceof _promise2.default) {
        return task.then(function () {
          return newchild;
        });
      }
      return newchild;
    }
    return null;
  }
};