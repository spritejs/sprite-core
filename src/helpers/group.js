const _zOrder = Symbol('zOrder');
const _removeTask = Symbol('removeTask');

export default {
  appendChild(sprite, update = true) {
    sprite.remove(false);

    const children = this.children;
    children.push(sprite);

    this[_zOrder] = this[_zOrder] || 0;
    sprite.connect(this, this[_zOrder]++);

    for(let i = children.length - 1; i > 0; i--) {
      const a = children[i],
        b = children[i - 1];

      if(a.zIndex < b.zIndex) {
        children[i] = b;
        children[i - 1] = a;
      }
    }

    if(update) {
      sprite.forceUpdate();
    }

    const task = sprite.enter();
    if(task instanceof Promise) {
      return task.then(() => {
        return sprite;
      });
    }
    return sprite;
  },
  append(...sprites) {
    let isPromise = false;
    const tasks = sprites.map((sprite) => {
      const task = this.appendChild(sprite);
      if(task instanceof Promise) isPromise = true;
      return task;
    });
    if(isPromise) return Promise.all(tasks);
    return tasks;
  },
  removeChild(child, exit = true) {
    if(child[_removeTask]) return child[_removeTask];

    const idx = this.children.indexOf(child);
    if(idx === -1) {
      return null;
    }

    const that = this;
    function remove(sprite) {
      delete child[_removeTask];
      that.children.splice(idx, 1);
      if(sprite.isVisible() || sprite.lastRenderBox) {
        sprite.forceUpdate();
      }
      sprite.disconnect(that);
      return sprite;
    }

    if(exit) {
      const action = child.exit();
      if(action instanceof Promise) {
        child[_removeTask] = action;
        return action.then(() => {
          return remove(child);
        });
      }
    }
    return remove(child);
  },
  clear() {
    const children = this.children.slice(0);
    return children.map(child => this.removeChild(child));
  },
  remove(...args) {
    if(args.length === 0 || args.length === 1 && typeof args[0] === 'boolean') {
      if(!this.parent) return null;
      return this.parent.removeChild(!args[0]);
    }
    let isPromise = false;
    const tasks = args.map((sprite) => {
      const task = this.removeChild(sprite);
      if(task instanceof Promise) isPromise = true;
      return task;
    });
    if(isPromise) return Promise.all(tasks);
    return tasks;
  },
  insertBefore(newchild, refchild) {
    if(refchild == null) {
      return this.appendChild(newchild);
    }
    const idx = this.children.indexOf(refchild);
    if(idx >= 0) {
      this.removeChild(newchild, false);
      const refZOrder = refchild.zOrder;
      for(let i = idx; i < this.children.length; i++) {
        const child = this.children[i],
          zOrder = child.zOrder;
        delete child.zOrder;
        Object.defineProperty(child, 'zOrder', {
          value: zOrder + 1,
          writable: false,
          configurable: true,
        });
      }
      this.children.splice(idx, 0, newchild);
      newchild.connect(this, refZOrder);
      newchild.forceUpdate();

      this[_zOrder] = this[_zOrder] || 0;
      this[_zOrder]++;

      const task = newchild.enter();
      if(task instanceof Promise) {
        return task.then(() => {
          return newchild;
        });
      }
      return newchild;
    }
    return null;
  },
};