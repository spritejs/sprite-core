'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _update$appendChild$a;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _zOrder = (0, _symbol2.default)('zOrder'),
    _update = (0, _symbol2.default)('update');

exports.default = (_update$appendChild$a = {}, (0, _defineProperty3.default)(_update$appendChild$a, _update, function (sprite) {
  if (this.update) {
    // layer
    this.update(sprite);
  } else {
    // group
    this.forceUpdate(true, sprite);
  }
}), (0, _defineProperty3.default)(_update$appendChild$a, 'appendChild', function appendChild(sprite) {
  var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  this.removeChild(sprite);
  this.children.push(sprite);
  this[_zOrder] = this[_zOrder] || 0;
  sprite.connect(this, this[_zOrder]++);
  if (update) {
    this[_update](sprite);
  }
  return sprite;
}), (0, _defineProperty3.default)(_update$appendChild$a, 'append', function append() {
  var _this = this;

  for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
    sprites[_key] = arguments[_key];
  }

  sprites.forEach(function (sprite) {
    return _this.appendChild(sprite);
  });
}), (0, _defineProperty3.default)(_update$appendChild$a, 'removeChild', function removeChild(sprite) {
  var idx = this.children.indexOf(sprite);
  if (idx === -1) {
    return null;
  }
  this.children.splice(idx, 1);
  if (this.isVisible(sprite) || sprite.lastRenderBox) {
    sprite.forceUpdate();
  }
  sprite.disconnect(this);
  return sprite;
}), (0, _defineProperty3.default)(_update$appendChild$a, 'remove', function remove() {
  var _this2 = this;

  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args.length === 0) {
    args = this.children.slice(0);
  }
  return args.map(function (child) {
    return _this2.removeChild(child);
  });
}), (0, _defineProperty3.default)(_update$appendChild$a, 'insertBefore', function insertBefore(newchild, refchild) {
  var idx = this.children.indexOf(refchild);
  if (idx >= 0) {
    this.removeChild(newchild);
    this.children.splice(idx, 0, newchild);
    newchild.connect(this, refchild.zOrder);
    this[_update](newchild);

    for (var i = idx + 1; i < this.children.length; i++) {
      var child = this.children[i],
          zOrder = child.zOrder + 1;

      delete child.zOrder;
      Object.defineProperty(child, 'zOrder', {
        value: zOrder,
        writable: false,
        configurable: true
      });

      this[_update](child);
    }

    this[_zOrder] = this[_zOrder] || 0;
    this[_zOrder]++;
  }

  return newchild;
}), _update$appendChild$a);