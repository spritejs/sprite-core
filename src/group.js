import BaseSprite from './basesprite'
import {registerNodeType} from './nodetype'
import {attr} from 'sprite-utils'
import {createSvgPath} from './helpers/path'
import * as layout from './layout'

const _children = Symbol('children'),
  _zOrder = Symbol('zOrder'),
  _layoutTag = Symbol('layoutTag')

class GroupAttr extends BaseSprite.Attr {
  constructor(subject) {
    super(subject)
    this.setDefault({
      clip: null,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignContent: 'stretch',
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

  // flexbox attributes
  @attr
  set flexDirection(value) {
    this.clearCache()
    this.subject.clearLayout()
    this.set('flexDirection', value)
  }

  @attr
  set flexWrap(value) {
    this.clearCache()
    this.subject.clearLayout()
    this.set('flexWrap', value)
  }

  @attr
  set justifyContent(value) {
    this.clearCache()
    this.subject.clearLayout()
    this.set('justifyContent', value)
  }

  @attr
  set alignItems(value) {
    this.clearCache()
    this.subject.clearLayout()
    this.set('alignItems', value)
  }

  @attr
  set alignContent(value) {
    this.clearCache()
    this.subject.clearLayout()
    this.set('alignContent', value)
  }

  @attr
  set width(value) {
    this.subject.clearLayout()
    super.width = value
  }

  @attr
  set height(value) {
    this.subject.clearLayout()
    super.height = value
  }

  @attr
  set layoutWidth(value) {
    this.subject.clearLayout()
    super.layoutWidth = value
  }

  @attr
  set layoutHeight(value) {
    this.subject.clearLayout()
    super.layoutHeight = value
  }

  @attr
  set display(value) {
    this.subject.clearLayout()
    super.display = value
  }
}

export default class Group extends BaseSprite {
  static Attr = GroupAttr

  constructor(attr = {}) {
    super(attr)
    this[_children] = []
    this[_zOrder] = 0
    this[_layoutTag] = false
  }
  get isVirtual() {
    if(this.attr('display') === 'flex') return false
    const {width: borderWidth} = this.attr('border'),
      borderRadius = this.attr('borderRadius'),
      bgcolor = this.attr('bgcolor'),
      {bgcolor: bgGradient} = this.attr('gradients'),
      [width, height] = this.attrSize,
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
    child.isDirty = true
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
  get contentSize() {
    if(this.isVirtual) return [0, 0]
    let [width, height] = this.attrSize

    if(width === '' || height === '') {
      if(this.attr('clip')) {
        const svg = this.svg
        const bounds = svg.bounds
        width = width || bounds[2]
        height = height || bounds[3]
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
        width = width || right
        height = height || bottom
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
  relayout() {
    const items = this.children.filter((child) => {
      if(child.hasLayout) {
        child.attr('layoutWidth', null)
        child.attr('layoutHeight', null)
      }
      if(child.relayout) {
        const display = child.attr('display')
        if(display !== '' && display !== 'static') {
          child.relayout()
        }
      }
      return child.hasLayout
    })

    const display = this.attr('display')
    const doLayout = layout[`${display}Layout`]
    if(doLayout) {
      doLayout(this, items)
    }
  }
  clearLayout() {
    this[_layoutTag] = false
    let parent = this.parent
    while(parent) {
      if(parent[_layoutTag]) parent[_layoutTag] = false
      parent = parent.parent
    }
  }
  render(t, drawingContext) {
    if(this.attr('display') === 'flex' && !this[_layoutTag]) {
      this.relayout()
    }

    const clipPath = this.attr('clip')
    if(clipPath) {
      this.svg.beginPath().to(drawingContext)
      drawingContext.clip()
    }

    if(!this.isVirtual) {
      super.render(t, drawingContext)
      const [w, h] = this.attrSize
      if(w !== '' || h !== '') {
        drawingContext.beginPath()
        drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1])
        drawingContext.clip()
      }
    }

    const sprites = this[_children]

    for(let i = 0; i < sprites.length; i++) {
      const child = sprites[i],
        isDirty = child.isDirty
      child.isDirty = false

      if(child.isVisible()) {
        child.draw(t, drawingContext)
      }
      if(isDirty) {
        child.dispatchEvent('update', {target: child, renderTime: t}, true, true)
      }
    }
    if(this.attr('display') === 'flex') {
      this[_layoutTag] = true
    }
  }
}

import groupApi from './helpers/group'
Object.assign(Group.prototype, groupApi)

registerNodeType('group', Group, true)
