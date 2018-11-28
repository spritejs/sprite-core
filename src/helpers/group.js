import {sortOrderedSprites} from '../utils';
const _zOrder = Symbol('zOrder');
const _removeTask = Symbol('removeTask');

export default {
  appendChild(sprite, update = true) {
    const _append = () => {
      const children = this.childNodes;
      children.push(sprite);

      this[_zOrder] = this[_zOrder] || 0;
      sprite.connect(this, this[_zOrder]++);
      this.sortedChildNodes = sortOrderedSprites(this.childNodes);

      // for(let i = children.length - 1; i > 0; i--) {
      //   const a = children[i],
      //     b = children[i - 1];

      //   if(a.zIndex < b.zIndex) {
      //     children[i] = b;
      //     children[i - 1] = a;
      //   }
      // }

      if(update) {
        sprite.forceUpdate();
      }

      if(sprite.layer) {
        sprite.updateStyles();
        return sprite.enter();
      }
      return sprite;
    };

    const _remove = sprite.remove();
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
      const parent = sprite.parent;
      sprite.disconnect(that);
      if(parent && parent.children[0]) {
        parent.children[0].updateStyles();
      }
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
          newchild.updateStyles();
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
  async replaceChild(newChild, oldChild) {
    await this.insertBefore(newChild, oldChild);
    this.removeChild(oldChild);
  },
};