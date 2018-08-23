'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _zOrder = (0, _symbol2.default)('zOrder');

exports.default = {
  appendChild: function appendChild(sprite) {
    var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    sprite.remove();

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
    return sprite;
  },
  append: function append() {
    var _this = this;

    for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
      sprites[_key] = arguments[_key];
    }

    sprites.forEach(function (sprite) {
      return _this.appendChild(sprite);
    });
  },
  removeChild: function removeChild(sprite) {
    var idx = this.children.indexOf(sprite);
    if (idx === -1) {
      return null;
    }
    this.children.splice(idx, 1);
    if (sprite.isVisible() || sprite.lastRenderBox) {
      sprite.forceUpdate();
    }
    sprite.disconnect(this);
    return sprite;
  },
  clear: function clear() {
    var _this2 = this;

    var children = this.children.slice(0);
    return children.map(function (child) {
      return _this2.removeChild(child);
    });
  },
  insertBefore: function insertBefore(newchild, refchild) {
    if (refchild == null) {
      return this.appendChild(newchild);
    }
    var idx = this.children.indexOf(refchild);
    if (idx >= 0) {
      this.removeChild(newchild);
      this.children.splice(idx, 0, newchild);
      var refZOrder = refchild.zOrder;
      newchild.connect(this, refZOrder);
      newchild.forceUpdate();

      for (var i = 0; i < this.children.length; i++) {
        if (i !== idx) {
          var child = this.children[i],
              zOrder = child.zOrder;

          if (zOrder >= refZOrder) {
            delete child.zOrder;
            Object.defineProperty(child, 'zOrder', {
              value: zOrder + 1,
              writable: false,
              configurable: true
            });
          }
        }
      }

      this[_zOrder] = this[_zOrder] || 0;
      this[_zOrder]++;
    }

    return newchild;
  }
};