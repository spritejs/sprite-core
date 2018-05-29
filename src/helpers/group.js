const _zOrder = Symbol('zOrder')

export default {
  appendChild(sprite, update = true) {
    this.removeChild(sprite)
    this.children.push(sprite)
    this[_zOrder] = this[_zOrder] || 0
    sprite.connect(this, this[_zOrder]++)
    if(update) {
      sprite.forceUpdate()
    }
    return sprite
  },
  append(...sprites) {
    sprites.forEach(sprite => this.appendChild(sprite))
  },
  removeChild(sprite) {
    const idx = this.children.indexOf(sprite)
    if(idx === -1) {
      return null
    }
    this.children.splice(idx, 1)
    if(this.isVisible(sprite) || sprite.lastRenderBox) {
      sprite.forceUpdate()
    }
    sprite.disconnect(this)
    return sprite
  },
  remove(...args) {
    if(args.length === 0) {
      args = this.children.slice(0)
    }
    return args.map(child => this.removeChild(child))
  },
  insertBefore(newchild, refchild) {
    const idx = this.children.indexOf(refchild)
    if(idx >= 0) {
      this.removeChild(newchild)
      this.children.splice(idx, 0, newchild)
      newchild.connect(this, refchild.zOrder)
      newchild.forceUpdate()

      for(let i = idx + 1; i < this.children.length; i++) {
        const child = this.children[i],
          zOrder = child.zOrder + 1

        delete child.zOrder
        Object.defineProperty(child, 'zOrder', {
          value: zOrder,
          writable: false,
          configurable: true,
        })
      }

      this[_zOrder] = this[_zOrder] || 0
      this[_zOrder]++
    }

    return newchild
  },
}