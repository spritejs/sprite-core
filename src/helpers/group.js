import {sortOrderedSprites} from '../utils';
const _zOrder = Symbol('zOrder');
const _removeTask = Symbol('removeTask');

export default {
  getTargetFromXY(x, y) {
    const children = this.children;
    let target = this;

    children.some((child) => {
      const evt = {parentX: x, parentY: y};
      const hit = child.pointCollision(evt);
      if(hit) {
        if(child.getTargetFromXY) {
          target = child.getTargetFromXY(evt.offsetX, evt.offsetY);
        } else {
          target = child;
        }
      }
      return hit;
    });
    return target;
  },
  appendChild(sprite, update = true) {
    const _append = () => {
      this[_zOrder] = this[_zOrder] || 0;
      sprite.connect(this, this[_zOrder]++);
      const children = this.childNodes;

      const orderedSprites = [...children];
      children.push(sprite);

      // quick insert
      const len = orderedSprites.length;
      let i = len;
      const zIndex = sprite.attr('zIndex');
      for(; i > 0; i--) {
        const child = orderedSprites[i - 1];
        if(child.attr('zIndex') <= zIndex) break;
      }
      if(i === len) orderedSprites.push(sprite);
      else orderedSprites.splice(i, 0, sprite);

      this.sortedChildNodes = orderedSprites;

      if(update) {
        sprite.forceUpdate();
      }

      if(sprite.layer) {
        return sprite.enter();
      }
      return sprite;
    };

    const _remove = this.removeChild(sprite);
    if(_remove && _remove.promise) { // deferred
      if(_remove.resolve) _remove.resolve();
      _remove.promise.then(() => {
        return _append();
      });
      return _remove;
    }
    return _append();
  },
  append(...sprites) {
    sprites.forEach((sprite) => {
      this.appendChild(sprite);
    });
    return this;
  },
  removeChild(child) {
    if(child[_removeTask]) return child[_removeTask];

    const idx = this.childNodes.indexOf(child);
    if(idx === -1) {
      return null;
    }

    const that = this;
    function remove(sprite) {
      delete child[_removeTask];
      // re-calculate index because it's async...
      const idx = that.childNodes.indexOf(child);
      if(idx === -1) {
        return null;
      }
      that.childNodes.splice(idx, 1);
      that.sortedChildNodes = sortOrderedSprites(that.childNodes);
      if(sprite.isVisible() || sprite.lastRenderBox) {
        sprite.forceUpdate();
      }
      sprite.disconnect(that);
      return sprite;
    }

    const action = child.exit();
    if(action.promise) {
      child[_removeTask] = action;
      action.promise.then(() => {
        return remove(child);
      });
      return action;
    }

    return remove(child);
  },
  clear() {
    const children = this.childNodes.slice(0);
    children.forEach(child => this.removeChild(child));
    return this;
  },
  remove(...args) {
    if(args.length === 0) {
      if(!this.parent) return null;
      return this.parent.removeChild(this);
    }
    args.forEach((sprite) => {
      this.removeChild(sprite);
    });
    return this;
  },
  insertBefore(newchild, refchild) {
    if(refchild == null) {
      return this.appendChild(newchild);
    }
    const idx = this.childNodes.indexOf(refchild);
    const refZOrder = refchild.zOrder;
    if(idx >= 0) {
      const _insert = () => {
        for(let i = 0; i < this.childNodes.length; i++) {
          const child = this.childNodes[i],
            zOrder = child.zOrder;
          if(zOrder >= refZOrder) {
            delete child.zOrder;
            Object.defineProperty(child, 'zOrder', {
              value: zOrder + 1,
              writable: false,
              configurable: true,
            });
          }
        }
        this.childNodes.splice(idx, 0, newchild);
        newchild.connect(this, refZOrder);
        this.sortedChildNodes = sortOrderedSprites(this.childNodes);
        newchild.forceUpdate();

        this[_zOrder] = this[_zOrder] || 0;
        this[_zOrder]++;

        if(this.layer) {
          return newchild.enter();
        }
      };

      const _remove = this.removeChild(newchild);
      if(_remove && _remove.promise) {
        if(_remove.resolve) _remove.resolve();
        _remove.promise.then(() => _insert());
        return _remove;
      }
      return _insert();
    }
    return null;
  },
  replaceChild(newChild, oldChild) {
    Promise.resolve(this.insertBefore(newChild, oldChild)).then(() => {
      this.removeChild(oldChild);
    });
  },
};