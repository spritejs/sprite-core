import BaseSprite from './basesprite'
import {registerNodeType} from './nodetype'
import {attr, sortOrderedSprites, boxIntersect} from 'sprite-utils'
import {createSvgPath} from './helpers/path'
import {copyContext} from './helpers/render'

const _children = Symbol('children'),
  _zOrder = Symbol('zOrder')

class GroupAttr extends BaseSprite.Attr {
  constructor(subject) {
    super(subject)
    this.setDefault({
      clip: null,
    })
  }

  @attr
  set clip(val) {
    this.clearCache()
    if(val) {
      val = typeof val === 'string' ? {d: val} : val
      this.subject.svg = createSvgPath(val)
      this.set('clip', val)
    } else {
      this.subject.svg = null
      this.set('clip', null)
    }
  }
}

export default class Group extends BaseSprite {
  static Attr = GroupAttr

  constructor(attr) {
    super(attr)
    this[_children] = []
    this[_zOrder] = 0
  }
  appendChild(sprite) {
    this[_children].push(sprite)
    sprite.connect(this, this[_zOrder]++)
    this.forceUpdate(true, sprite)
  }
  append(...sprites) {
    sprites.forEach(sprite => this.appendChild(sprite))
  }
  removeChild(sprite) {
    const idx = this[_children].indexOf(sprite)
    if(idx === -1) {
      return null
    }
    this[_children].splice(idx, 1)
    sprite.disconnect(this)
    return sprite
  }
  remove(...sprites) {
    if(sprites.length === 0) {
      sprites = this[_children].slice(0)
    }
    sprites.forEach(sprite => this.removeChild(sprite))
  }
  cloneNode(deepCopy) {
    const node = super.cloneNode()
    if(deepCopy) {
      const children = this.children
      children.forEach((child) => {
        const subNode = child.cloneNode(deepCopy)
        node.append(subNode)
      })
    }
    return node
  }
  get children() {
    return this[_children]
  }
  pointCollision(evt) {
    if(super.pointCollision(evt)) {
      if(this.svg) {
        const {offsetX, offsetY} = evt
        const rect = this.originalRect
        evt.isInClip = this.svg.isPointInPath(offsetX - rect[0], offsetY - rect[1])
      }
      return true
    }
    return false
  }
  get contentSize() {
    let [width, height] = this.attr('size')

    if(width === '' || height === '') {
      if(this.attr('clip')) {
        const svg = this.svg
        const bounds = svg.bounds
        width = bounds[2]
        height = bounds[3]
      } else {
        let right,
          bottom

        right = 0
        bottom = 0
        this[_children].forEach((sprite) => {
          const renderBox = sprite.renderBox
          right = Math.max(right, renderBox[2])
          bottom = Math.max(bottom, renderBox[3])
        })
        width = right
        height = bottom
      }
    }
    return [width, height]
  }
  dispatchEvent(type, evt, collisionState = false, swallow = false) {
    const isCollision = collisionState || this.pointCollision(evt)
    if(!evt.terminated && isCollision) {
      const parentX = evt.offsetX - this.originalRect[0]
      const parentY = evt.offsetY - this.originalRect[1]
      // console.log(evt.parentX, evt.parentY)

      const _evt = Object.assign({}, evt)
      _evt.parentX = parentX
      _evt.parentY = parentY

      const sprites = this[_children].slice(0)
      sortOrderedSprites(sprites, true)

      const targetSprites = []

      if(!swallow && type !== 'mouseenter' && type !== 'mouseleave') {
        for(let i = 0; i < sprites.length && evt.isInClip !== false; i++) {
          const sprite = sprites[i]
          const hit = sprite.dispatchEvent(type, _evt, collisionState, swallow)
          if(hit) {
            targetSprites.push(sprite)
          }
          if(evt.terminated && !evt.type.startsWith('mouse')) {
            break
          }
        }
      }

      evt.targetSprites = targetSprites
    }
    // support mouseleave
    return super.dispatchEvent(type, evt, collisionState)
  }
  isNodeVisible(sprite) {
    if(!sprite.isVisible()) return false

    const [w, h] = this.outerSize
    const box1 = sprite.renderBox,
      box2 = [0, 0, w, h]
    if(boxIntersect(box1, box2)) {
      return true
    }
    return false
  }
  clearCache() {
    super.clearCache()
    this.baseCache = null
  }
  forceUpdate(clearCache, updater) {
    if(updater) {
      // child update on group
      this.cache = null
      return super.forceUpdate()
    }
    return super.forceUpdate(clearCache)
  }
  render(t, drawingContext) {
    if(this.baseCache) {
      drawingContext.drawImage(this.baseCache.canvas, 0, 0)
    } else {
      super.render(t, drawingContext)
      this.baseCache = copyContext(drawingContext)
      this.baseCache.drawImage(drawingContext.canvas, 0, 0)
    }

    const clipPath = this.attr('clip')
    if(clipPath) {
      drawingContext.save()
      this.svg.beginPath().to(drawingContext)
      drawingContext.restore()
      drawingContext.clip()
      drawingContext.clearRect(0, 0, this.originalRect[2], this.originalRect[3])
    }

    const sprites = this[_children].slice(0)
    sortOrderedSprites(sprites)

    for(let i = 0; i < sprites.length; i++) {
      const child = sprites[i]
      if(this.isNodeVisible(child)) {
        child.draw(t)
      }
    }
  }
}

registerNodeType('group', Group, true)
