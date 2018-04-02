import BaseSprite from './basesprite'
import {registerNodeType} from './nodetype'
import {attr} from 'sprite-utils'
import SvgPath from 'svg-path-to-canvas'
import transformPath from './pathtransform'

const _children = Symbol('children'),
  _zOrder = Symbol('zOrder')

function sortChildren(children) {
  children.sort((a, b) => {
    const a_zidx = a.attr('zIndex'),
      b_zidx = b.attr('zIndex')
    if(a_zidx === b_zidx) {
      return a.zOrder - b.zOrder
    }
    return a_zidx - b_zidx
  })
}

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
      if(typeof val === 'string') {
        this.subject.svg = new SvgPath(val)
        this.set('clip', {d: val})
      } else {
        this.subject.svg = transformPath(val)
        this.set('clip', val)
      }
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
  appendChild(sprite, sort = true) {
    this[_children].push(sprite)
    sprite.connect(this, this[_zOrder]++)
    if(sort) sortChildren(this[_children])
  }
  append(...sprites) {
    sprites.forEach(sprite => this.appendChild(sprite, false))
    sortChildren(this[_children])
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
  get children() {
    return this[_children]
  }
  findPath(offsetX, offsetY) {
    if(this.svg.isPointInPath(offsetX, offsetY)) {
      return [this.svg]
    }
    return []
  }
  get pathOffset() {
    const [borderWidth] = this.attr('border')
    const padding = this.attr('padding')

    const padLeft = borderWidth + padding[3],
      padTop = borderWidth + padding[0]

    return [padLeft, padTop]
  }
  pointCollision(evt) {
    if(super.pointCollision(evt)) {
      if(this.attr('clip')) {
        const {offsetX, offsetY} = evt
        const rect = this.originRect
        const pathOffset = this.pathOffset
        const paths = this.findPath(offsetX - rect[0] - pathOffset[0], offsetY - rect[1] - pathOffset[1])
        evt.isInClip = !!paths.length
      }
      return true
    }
    return false
  }
  get contentSize() {
    let [width, height] = this.attr('size')

    if(width === '' || height === '') {
      if(this.attr('clip')) {
        const pathOffset = this.pathOffset
        const [borderWidth] = this.attr('border')
        const svg = this.svg
        const bounds = svg.bounds
        width = bounds[2] + pathOffset[0] - borderWidth
        height = bounds[3] + pathOffset[1] - borderWidth
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
  dispatchEvent(type, evt, forceTrigger = false) {
    if(!evt.terminated && (forceTrigger || this.pointCollision(evt))) {
      const parentX = evt.offsetX - this.originRect[0]
      const parentY = evt.offsetY - this.originRect[1]
      // console.log(evt.parentX, evt.parentY)

      const _evt = Object.assign({}, evt)
      _evt.parentX = parentX
      _evt.parentY = parentY

      const targetSprites = []

      for(let i = 0; i < this[_children].length && evt.isInClip !== false; i++) {
        const sprite = this[_children][i]
        const hit = sprite.dispatchEvent(type, _evt, forceTrigger)
        if(hit) {
          targetSprites.push(sprite)
        }
        if(evt.terminated && !evt.type.startsWith('mouse')) {
          break
        }
      }

      evt.targetSprites = targetSprites
      super.dispatchEvent(type, evt, forceTrigger)
    }
  }
  render(t, drawingContext) {
    const context = super.render(t, drawingContext)

    const clipPath = this.attr('clip')
    if(clipPath) {
      context.translate(...this.pathOffset)
      this.svg.beginPath().to(context)
      context.clip()
      context.clearRect(0, 0, this.originRect[2], this.originRect[3])
    }

    const children = this[_children]

    /* eslint-disable no-await-in-loop */
    for(let i = 0; i < children.length; i++) {
      const child = children[i]
      child.draw(t)
    }
    /* eslint-enable no-await-in-loop */

    return context
  }
}

registerNodeType('group', Group, true)
