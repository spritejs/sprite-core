const _zOrder = Symbol('zOrder');

export default {
  appendChild(sprite, update = true) {
    sprite.remove();

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
    return sprite;
  },
  append(...sprites) {
    sprites.forEach(sprite => this.appendChild(sprite));
  },
  removeChild(sprite) {
    const idx = this.children.indexOf(sprite);
    if(idx === -1) {
      return null;
    }
    this.children.splice(idx, 1);
    if(sprite.isVisible() || sprite.lastRenderBox) {
      sprite.forceUpdate();
    }
    sprite.disconnect(this);
    return sprite;
  },
  clear() {
    const children = this.children.slice(0);
    return children.map(child => this.removeChild(child));
  },
  insertBefore(newchild, refchild) {
    if(refchild == null) {
      return this.appendChild(newchild);
    }
    const idx = this.children.indexOf(refchild);
    if(idx >= 0) {
      this.removeChild(newchild);
      this.children.splice(idx, 0, newchild);
      const refZOrder = refchild.zOrder;
      newchild.connect(this, refZOrder);
      newchild.forceUpdate();

      for(let i = 0; i < this.children.length; i++) {
        if(i !== idx) {
          const child = this.children[i],
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
      }

      this[_zOrder] = this[_zOrder] || 0;
      this[_zOrder]++;
    }

    return newchild;
  },
};