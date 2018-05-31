const _zOrder = Symbol('zOrder')
import {sortOrderedSprites} from 'sprite-utils'

export default {
  appendChild(sprite, update = true) {
    this.removeChild(sprite)
    this.children.push(sprite)
    this[_zOrder] = this[_zOrder] || 0
    sprite.connect(this, this[_zOrder]++)
    sortOrderedSprites(this.children)
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
      const refZOrder = refchild.zOrder
      newchild.connect(this, refZOrder)
      newchild.forceUpdate()

      for(let i = 0; i < this.children.length; i++) {
        if(i !== idx) {
          const child = this.children[i],
            zOrder = child.zOrder

          if(zOrder >= refZOrder) {
            delete child.zOrder
            Object.defineProperty(child, 'zOrder', {
              value: zOrder + 1,
              writable: false,
              configurable: true,
            })
          }
        }
      }

      this[_zOrder] = this[_zOrder] || 0
      this[_zOrder]++
    }

    return newchild
  },
}