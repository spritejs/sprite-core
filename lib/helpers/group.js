'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _zOrder = (0, _symbol2.default)('zOrder');
var _removeTask = (0, _symbol2.default)('removeTask');

exports.default = {
  appendChild: function appendChild(sprite) {
    var _this = this;

    var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var _append = function _append() {
      var children = _this.children;
      children.push(sprite);

      _this[_zOrder] = _this[_zOrder] || 0;
      sprite.connect(_this, _this[_zOrder]++);

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

      if (sprite.layer) {
        return sprite.enter();
      }
      return sprite;
    };

    var _remove = sprite.remove();
    if (_remove && _remove.promise) {
      // deferred
      if (_remove.resolve) _remove.resolve();
      _remove.promise.then(function () {
        return _append();
      });
      return _remove;
    }
    return _append();
  },
  append: function append() {
    var _this2 = this;

    for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
      sprites[_key] = arguments[_key];
    }

    sprites.forEach(function (sprite) {
      _this2.appendChild(sprite);
    });
    return this;
  },
  removeChild: function removeChild(child) {
    if (child[_removeTask]) return child[_removeTask];

    var idx = this.children.indexOf(child);
    if (idx === -1) {
      return null;
    }

    var that = this;
    function remove(sprite) {
      delete child[_removeTask];
      // re-calculate index because it's async...
      var idx = that.children.indexOf(child);
      if (idx === -1) {
        return null;
      }
      that.children.splice(idx, 1);
      if (sprite.isVisible() || sprite.lastRenderBox) {
        sprite.forceUpdate();
      }
      sprite.disconnect(that);
      return sprite;
    }

    var action = child.exit();
    if (action.promise) {
      child[_removeTask] = action;
      action.promise.then(function () {
        return remove(child);
      });
      return action;
    }

    return remove(child);
  },
  clear: function clear() {
    var _this3 = this;

    var children = this.children.slice(0);
    children.forEach(function (child) {
      return _this3.removeChild(child);
    });
    return this;
  },
  remove: function remove() {
    var _this4 = this;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length === 0) {
      if (!this.parent) return null;
      return this.parent.removeChild(this);
    }
    args.forEach(function (sprite) {
      _this4.removeChild(sprite);
    });
    return this;
  },
  insertBefore: function insertBefore(newchild, refchild) {
    var _this5 = this;

    if (refchild == null) {
      return this.appendChild(newchild);
    }
    var idx = this.children.indexOf(refchild);
    var refZOrder = refchild.zOrder;
    if (idx >= 0) {
      var _insert = function _insert() {
        var _idx = 0; // re-calculate because async...
        // TODO: use binary search?
        for (var i = 0; i < _this5.children.length; i++) {
          var child = _this5.children[i],
              zOrder = child.zOrder;
          if (zOrder < refZOrder) {
            _idx++;
          } else {
            delete child.zOrder;
            Object.defineProperty(child, 'zOrder', {
              value: zOrder + 1,
              writable: false,
              configurable: true
            });
          }
        }

        _this5.children.splice(_idx, 0, newchild);
        newchild.connect(_this5, refZOrder);
        newchild.forceUpdate();

        _this5[_zOrder] = _this5[_zOrder] || 0;
        _this5[_zOrder]++;

        if (_this5.layer) {
          return newchild.enter();
        }
      };

      var _remove = this.removeChild(newchild);
      if (_remove && _remove.promise) {
        if (_remove.resolve) _remove.resolve();
        _remove.promise.then(function () {
          return _insert();
        });
        return _remove;
      }
      return _insert();
    }
    return null;
  }
};