import BaseSprite from './basesprite'
import {registerNodeType} from './nodetype'
import {attr} from 'sprite-utils'
import {createSvgPath} from './helpers/path'

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

  constructor(attr = {}) {
    super(attr)
    this[_children] = []
    this[_zOrder] = 0
  }
  get cachePriority() {
    // virtual group disable cache
    if(this.isVirtual) return 0
    return super.cachePriority
  }
  get isVirtual() {
    const {width: borderWidth} = this.attr('border'),
      borderRadius = this.attr('borderRadius'),
      bgcolor = this.attr('bgcolor'),
      {bgcolor: bgGradient} = this.attr('gradients'),
      [width, height] = this.attr('size'),
      [anchorX, anchorY] = this.attr('anchor')

    return !anchorX && !anchorY && !width && !height && !borderRadius
      && !borderWidth && !bgcolor && !bgGradient
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
  update(child) {
    this.forceUpdate(true)
  }
  pointCollision(evt) {
    if(super.pointCollision(evt) || this.isVirtual) {
      if(this.svg) {
        const {offsetX, offsetY} = evt
        const rect = this.originalRect
        evt.isInClip = this.svg.isPointInPath(offsetX - rect[0], offsetY - rect[1])
      }
      return true
    }
    return false
  }
  isVisible() {
    return this.isVirtual || super.isVisible()
  }
  get contentSize() {
    if(this.isVirtual) {
      return [0, 0]
    }

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
    if(swallow && this.getEventHandlers(type).length === 0) {
      return
    }
    if(!swallow && !evt.terminated && type !== 'mouseenter' && type !== 'mouseleave') {
      const isCollision = collisionState || this.pointCollision(evt)
      if(isCollision) {
        const parentX = evt.offsetX - this.originalRect[0]
        const parentY = evt.offsetY - this.originalRect[1]
        // console.log(evt.parentX, evt.parentY)

        const _evt = Object.assign({}, evt)
        _evt.parentX = parentX
        _evt.parentY = parentY

        const sprites = this[_children].slice(0).reverse()

        const targetSprites = []

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

        evt.targetSprites = targetSprites
        // stopDispatch can only terminate event in the same level
        evt.terminated = false
        return super.dispatchEvent(type, evt, isCollision, swallow)
      }
    }

    return super.dispatchEvent(type, evt, collisionState, swallow)
  }
  render(t, drawingContext) {
    const clipPath = this.attr('clip')
    if(clipPath) {
      drawingContext.save()
      this.svg.beginPath().to(drawingContext)
      drawingContext.restore()
      drawingContext.clip()
    }

    if(!this.isVirtual) {
      super.render(t, drawingContext)
    }

    const sprites = this[_children]

    for(let i = 0; i < sprites.length; i++) {
      const child = sprites[i]
      child.draw(t, drawingContext)
      if(child.isDirty) {
        child.isDirty = false
        child.dispatchEvent('update', {target: child, renderTime: t}, true, true)
      }
    }
  }
}

import groupApi from './helpers/group'
Object.assign(Group.prototype, groupApi)

registerNodeType('group', Group, true)
