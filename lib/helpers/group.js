"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _zOrder = Symbol('zOrder');

var _removeTask = Symbol('removeTask');

var _default = {
  getTargetFromXY: function getTargetFromXY(x, y) {
    var children = this.children;
    var target = this;
    children.some(function (child) {
      var evt = {
        parentX: x,
        parentY: y
      };
      var hit = child.pointCollision(evt);

      if (hit) {
        if (child.getTargetFromXY) {
          target = child.getTargetFromXY(evt.offsetX, evt.offsetY);
        } else {
          target = child;
        }
      }

      return hit;
    });
    return target;
  },
  appendChild: function appendChild(sprite) {
    var _this = this;

    var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var _append = function _append() {
      _this[_zOrder] = _this[_zOrder] || 0;
      sprite.connect(_this, _this[_zOrder]++);
      var children = _this.childNodes;
      children.push(sprite); // quick insert

      var orderedSprites = _this.sortedChildNodes || [];
      var len = orderedSprites.length;
      var i;
      var left = 0,
          right = len - 1;
      var zIndex = sprite.attr('zIndex') | 0;

      for (; i == null && left <= right;) {
        var rightSprite = orderedSprites[right];
        var leftSprite = orderedSprites[left];
        if (zIndex >= rightSprite.zIndex) i = right + 1;else if (zIndex < leftSprite.zIndex) i = left;else if (left >= right - 1) i = right;else {
          // between left & right
          var mid = Math.ceil((left + right) / 2);
          var midSprite = orderedSprites[mid];
          if (zIndex >= midSprite.zIndex) left = mid;else right = mid;
        }
      }

      if (i == null || i === len) orderedSprites.push(sprite);else orderedSprites.splice(i, 0, sprite);
      _this.sortedChildNodes = orderedSprites;

      if (update) {
        sprite.forceUpdate();
      }

      if (sprite.layer) {
        return sprite.enter();
      }

      return sprite;
    };

    var _remove = this.removeChild(sprite);

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

    for (var _len = arguments.length, sprites = new Array(_len), _key = 0; _key < _len; _key++) {
      sprites[_key] = arguments[_key];
    }

    sprites.forEach(function (sprite) {
      _this2.appendChild(sprite);
    });
    return this;
  },
  removeChild: function removeChild(child) {
    if (child[_removeTask]) return child[_removeTask];
    var idx = this.childNodes.indexOf(child);

    if (idx === -1) {
      return null;
    }

    var that = this;

    function remove(sprite) {
      delete child[_removeTask]; // re-calculate index because it's async...

      var idx = that.childNodes.indexOf(child);

      if (idx === -1) {
        return null;
      }

      that.childNodes.splice(idx, 1);
      that.sortedChildNodes = (0, _utils.sortOrderedSprites)(that.childNodes);

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

    var children = this.childNodes.slice(0);
    children.forEach(function (child) {
      return _this3.removeChild(child);
    });
    return this;
  },
  remove: function remove() {
    var _this4 = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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

    var idx = this.childNodes.indexOf(refchild);
    var refZOrder = refchild.zOrder;

    if (idx >= 0) {
      var _insert = function _insert() {
        for (var i = 0; i < _this5.childNodes.length; i++) {
          var child = _this5.childNodes[i],
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

        _this5.childNodes.splice(idx, 0, newchild);

        newchild.connect(_this5, refZOrder);
        _this5.sortedChildNodes = (0, _utils.sortOrderedSprites)(_this5.childNodes);
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
  },
  replaceChild: function replaceChild(newChild, oldChild) {
    var _this6 = this;

    Promise.resolve(this.insertBefore(newChild, oldChild)).then(function () {
      _this6.removeChild(oldChild);
    });
  }
};
exports.default = _default;