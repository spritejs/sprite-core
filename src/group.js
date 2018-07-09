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
    this.set('flexDirection', value)
  }

  @attr
  set flexWrap(value) {
    this.clearCache()
    this.set('flexWrap', value)
  }

  @attr
  set flexFlow(value) {
    this.clearCache()
    this.set('flexFlow', value)
  }

  @attr
  set justifyContent(value) {
    this.clearCache()
    this.set('justifyContent', value)
  }

  @attr
  set alignItems(value) {
    this.clearCache()
    this.set('alignItems', value)
  }

  @attr
  set alignContent(value) {
    this.clearCache()
    this.set('alignContent', value)
  }
}

export default class Group extends BaseSprite {
  static Attr = GroupAttr

  constructor(attr = {}) {
    super(attr)
    this[_children] = []
    this[_zOrder] = 0
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
  get contentSize() {
    if(this.isVirtual) return [0, 0]
    let [width, height] = this.attr('size')

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
    // console.log(this.children);

    const items = this.children.slice(0)

    items.sort((a, b) => {
      return (a.attributes.order || 0) - (b.attributes.order || 0)
    })

    const style = this.attributes

    let mainSize,
      mainStart,
      mainEnd,
      mainSign,
      mainBase,
      crossSize,
      crossStart,
      crossEnd,
      crossSign,
      crossBase

    const prefix = (attr) => {
      return attr === 'x' || attr === 'y' ? attr : `layout${attr.charAt(0).toUpperCase()}${attr.substr(1)}`
    }

    if(style.flexDirection === 'row') {
      mainSize = 'width'
      mainStart = 'x'
      mainEnd = 'right'
      mainSign = +1
      mainBase = 0

      crossSize = 'height'
      crossStart = 'y'
      crossEnd = 'bottom'
    }

    if(style.flexDirection === 'row-reverse') {
      mainSize = 'width'
      mainStart = 'right'
      mainEnd = 'x'
      mainSign = -1
      mainBase = style.width

      crossSize = 'height'
      crossStart = 'y'
      crossEnd = 'bottom'
    }

    if(style.flexDirection === 'column') {
      mainSize = 'height'
      mainStart = 'y'
      mainEnd = 'bottom'
      mainSign = +1
      mainBase = 0

      crossSize = 'width'
      crossStart = 'x'
      crossEnd = 'right'
    }

    if(style.flexDirection === 'column-reverse') {
      mainSize = 'height'
      mainStart = 'bottom'
      mainEnd = 'y'
      mainSign = -1
      mainBase = style.height

      crossSize = 'width'
      crossStart = 'x'
      crossEnd = 'right'
    }

    if(style.flexWrap === 'wrap-reverse') {
      [crossStart, crossEnd] = [crossEnd, crossStart]
      crossSign = -1
    } else {
      crossBase = 0
      crossSign = 1
    }

    function isAutoSize(size) {
      return size == null || size === ''
    }

    let isAutoMainSize = false

    if(isAutoSize(style[mainSize])) { // auto sizing
      let maxSize = 0
      for(let i = 0; i < items.length; i++) {
        const item = items[i],
          size = item.attr(mainSize)
        if(!isAutoSize(size)) {
          maxSize += size
        }
      }
      this.attr(mainSize, maxSize)
      isAutoMainSize = true
      // style.flexWrap = 'nowrap';
    }


    let flexLine = []
    const flexLines = [flexLine]

    let mainSpace = this.attr(mainSize),
      crossSpace = 0

    // collect items into lines


    for(let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemStyle = item.attributes

      if(isAutoSize(itemStyle[mainSize])) {
        itemStyle[mainSize] = 0
      }

      if(itemStyle.flex) {
        flexLine.push(item)
      } else if(style.flexWrap === 'nowrap' || isAutoMainSize) {
        mainSpace -= itemStyle[mainSize]
        if(!isAutoSize(itemStyle[crossSize])) {
          crossSpace = Math.max(crossSpace, itemStyle[crossSize])
        }
        flexLine.push(item)
      } else {
        if(itemStyle[mainSize] > style[mainSize]) {
          item.attr(prefix(mainSize), style[mainSize])
        }
        if(mainSpace < itemStyle[mainSize]) {
          flexLine.mainSpace = mainSpace
          flexLine.crossSpace = crossSpace
          flexLine = [item]
          flexLines.push(flexLine)
          mainSpace = style[mainSize]
          crossSpace = 0
        } else {
          flexLine.push(item)
        }
        if(!isAutoSize(itemStyle[crossSize])) {
          crossSpace = Math.max(crossSpace, itemStyle[crossSize])
        }
        mainSpace -= itemStyle[mainSize]
      }
    }
    flexLine.mainSpace = mainSpace

    if(style.flexWrap === 'nowrap' || isAutoMainSize) {
      flexLine.crossSpace = !isAutoSize(style[crossSize]) ? style[crossSize] : crossSpace
    } else {
      flexLine.crossSpace = crossSpace
    }

    if(mainSpace < 0) {
      // overflow (happens only if container is single line), scale every item
      const scale = style[mainSize] / (style[mainSize] - mainSpace)
      let currentMain = mainBase
      for(let i = 0; i < items.length; i++) {
        const item = items[i]
        const itemStyle = item.attributes

        if(itemStyle.flex) {
          item.attr(prefix(mainSize), 0)
        } else {
          item.attr(prefix(mainSize), item.attr(mainSize))
        }

        item.attr(prefix(mainSize), item.attr(prefix(mainSize)) * scale)

        item.attr(prefix(mainStart), currentMain)
        item.attr(prefix(mainEnd), item.attr(prefix(mainStart)) + mainSign * item.attr(prefix(mainSize)))
        currentMain = item.attr(prefix(mainEnd))
      }
    } else {
      // process each flex line
      flexLines.forEach((items) => {
        const mainSpace = items.mainSpace
        let flexTotal = 0
        for(let i = 0; i < items.length; i++) {
          const item = items[i]
          const itemStyle = item.attributes

          flexTotal += itemStyle.flex
        }

        if(flexTotal > 0) {
          // There is flexible flex items
          let currentMain = mainBase
          for(let i = 0; i < items.length; i++) {
            const item = items[i]
            const itemStyle = item.attributes

            if(itemStyle.flex) {
              item.attr(prefix(mainSize), (mainSpace / flexTotal) * itemStyle.flex)
            } else {
              item.attr(prefix(mainSize), item.attr(mainSize))
            }
            item.attr(prefix(mainStart), currentMain)
            item.attr(prefix(mainEnd), item.attr(prefix(mainStart)) + mainSign * item.attr(prefix(mainSize)))
            currentMain = item.attr(prefix(mainEnd))
          }
        } else {
          let currentMain,
            step
          // There is *NO* flexible flex items, which means, justifyContent shoud work
          if(style.justifyContent === 'flex-start') {
            currentMain = mainBase
            step = 0
          }
          if(style.justifyContent === 'flex-end') {
            currentMain = mainSpace * mainSign + mainBase
            step = 0
          }
          if(style.justifyContent === 'center') {
            currentMain = mainSpace / 2 * mainSign + mainBase
            step = 0
          }
          if(style.justifyContent === 'space-between') {
            step = mainSpace / (items.length - 1) * mainSign
            currentMain = mainBase
          }
          if(style.justifyContent === 'space-around') {
            step = mainSpace / items.length * mainSign
            currentMain = step / 2 + mainBase
          }
          for(let i = 0; i < items.length; i++) {
            const item = items[i]
            item.attr(prefix(mainSize), item.attr(mainSize) || 0)
            item.attr(prefix(mainStart), currentMain)
            item.attr(prefix(mainEnd), item.attr(prefix(mainStart)) + mainSign * item.attr(prefix(mainSize)))
            currentMain = item.attr(prefix(mainEnd)) + step
          }
        }
      })
    }

    // compute the cross axis sizes
    // align-items, align-self

    if(isAutoSize(style[crossSize])) { // auto sizing
      crossSpace = 0
      this.attr(crossSize, 0)
      for(let i = 0; i < flexLines.length; i++) {
        this.attr(crossSize, this.attr(crossSize) + flexLines[i].crossSpace)
      }
    } else {
      crossSpace = style[crossSize]
      for(let i = 0; i < flexLines.length; i++) {
        crossSpace -= flexLines[i].crossSpace
      }
    }

    if(style.flexWrap === 'wrap-reverse') {
      crossBase = style[crossSize]
    } else {
      crossBase = 0
    }
    // let lineSize = style[crossSize] / flexLines.length

    let step
    if(style.alignContent === 'flex-start') {
      crossBase += 0
      step = 0
    }
    if(style.alignContent === 'flex-end') {
      crossBase += crossSign * crossSpace
      step = 0
    }
    if(style.alignContent === 'center') {
      crossBase += crossSign * crossSpace / 2
      step = 0
    }
    if(style.alignContent === 'space-between') {
      crossBase += 0
      step = crossSpace / (flexLines.length - 1)
    }
    if(style.alignContent === 'space-around') {
      step = crossSpace / (flexLines.length)
      crossBase += crossSign * step / 2
    }
    if(style.alignContent === 'stretch') {
      crossBase += 0
      step = 0
    }

    flexLines.forEach((items) => {
      const lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace

      for(let i = 0; i < items.length; i++) {
        const item = items[i]

        const align = item.attributes.alignSelf || style.alignItems

        if(isAutoSize(item.attr(crossSize))) {
          item.attr(prefix(crossSize), ((align === 'stretch')) ? lineCrossSize : 0)
        } else {
          item.attr(prefix(crossSize), item.attr(crossSize))
        }

        if(align === 'flex-start') {
          item.attr(prefix(crossStart), crossBase)
          item.attr(prefix(crossEnd), item.attr(prefix(crossStart)) + crossSign * item.attr(prefix(crossSize)))
        }

        if(align === 'flex-end') {
          item.attr(prefix(crossEnd), crossBase + crossSign * lineCrossSize)
          item.attr(prefix(crossStart), item.attr(prefix(crossEnd)) - crossSign * item.attr(prefix(crossSize)))
        }

        if(align === 'center') {
          item.attr(prefix(crossStart), crossBase + crossSign * (lineCrossSize - item.attr(prefix(crossSize))) / 2)
          item.attr(prefix(crossEnd), item.attr(crossStart) + crossSign * item.attr(prefix(crossSize)))
        }

        if(align === 'stretch') {
          item.attr(prefix(crossStart), crossBase)
          item.attr(prefix(crossEnd), crossBase + crossSign * (!isAutoSize(item.attr(prefix(crossSize))) ? item.attr(prefix(crossSize)) : lineCrossSize))

          item.attr(prefix(crossSize), crossSign * (item.attr(prefix(crossEnd)) - item.attr(prefix(crossStart))))
        }
      }
      crossBase += crossSign * (lineCrossSize + step)
    })
  }
  render(t, drawingContext) {
    if(this.attr('display') === 'flex') {
      this.relayout()
    }

    const clipPath = this.attr('clip')
    if(clipPath) {
      this.svg.beginPath().to(drawingContext)
      drawingContext.clip()
    }

    if(!this.isVirtual) {
      super.render(t, drawingContext)
      const [w, h] = this.attr('size')
      if(w !== '' || h !== '') {
        drawingContext.beginPath()
        drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1])
        drawingContext.clip()
      }
    }

    const sprites = this[_children]

    for(let i = 0; i < sprites.length; i++) {
      const child = sprites[i]
      if(child.isVisible()) {
        child.draw(t, drawingContext)
      }
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
