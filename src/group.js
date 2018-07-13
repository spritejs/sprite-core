import BaseSprite from './basesprite'
import {registerNodeType} from './nodetype'
import {attr} from 'sprite-utils'
import {createSvgPath} from './helpers/path'

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
    // console.log(this.children);

    const items = this.children.filter((child) => {
      if(child.hasLayout) {
        child.attr('layoutWidth', null)
        child.attr('layoutHeight', null)
      }
      if(child.relayout) {
        child.relayout()
      }
      return child.hasLayout
    })

    items.sort((a, b) => {
      return (a.attributes.order || 0) - (b.attributes.order || 0)
    })

    const style = this.attributes

    let mainSize = 'width',
      mainStart = 'x',
      mainEnd = 'layoutRight',
      mainSign = +1,
      mainBase = 0,
      crossSize = 'height',
      crossStart = 'y',
      crossEnd = 'layoutBottom',
      crossSign,
      crossBase

    const flexDirection = style.flexDirection

    if(flexDirection === 'row-reverse') {
      mainSize = 'width'
      mainStart = 'layoutRight'
      mainEnd = 'x'
      mainSign = -1
      mainBase = style.width

      crossSize = 'height'
      crossStart = 'y'
      crossEnd = 'layoutBottom'
    } else if(flexDirection === 'column') {
      mainSize = 'height'
      mainStart = 'y'
      mainEnd = 'layoutBottom'
      mainSign = +1
      mainBase = 0

      crossSize = 'width'
      crossStart = 'x'
      crossEnd = 'layoutRight'
    } else if(flexDirection === 'column-reverse') {
      mainSize = 'height'
      mainStart = 'layoutBottom'
      mainEnd = 'y'
      mainSign = -1
      mainBase = style.height

      crossSize = 'width'
      crossStart = 'x'
      crossEnd = 'layoutRight'
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

    const isAutoMainSize = isAutoSize(style[mainSize])

    let groupMainSize

    if(isAutoMainSize) { // auto sizing
      let maxSize = 0
      for(let i = 0; i < items.length; i++) {
        const item = items[i],
          [width, height] = item.offsetSize
        const size = mainSize === 'width' ? width : height
        maxSize += size
      }
      if(flexDirection === 'row-reverse' || flexDirection === 'column-reverse') {
        mainBase = maxSize
      }
      groupMainSize = maxSize
    } else {
      groupMainSize = mainSize === 'width' ? this.offsetSize[0] : this.offsetSize[1]
    }

    let flexLine = []
    const flexLines = [flexLine]

    let mainSpace = groupMainSize,
      crossSpace = 0

    function setBoxLayoutSize(item, axis, size) {
      const borderWidth = item.attr('border').width,
        [paddingTop, paddingRight, paddingBottom, paddingLeft] = item.attr('padding')

      if(axis === 'width') {
        size = Math.max(0, size - 2 * borderWidth - paddingRight - paddingLeft)
        item.attr({layoutWidth: size})
      } else if(axis === 'height') {
        size = Math.max(0, size - 2 * borderWidth - paddingTop - paddingBottom)
        item.attr({layoutHeight: size})
      }
    }
    // collect items into lines

    for(let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemStyle = item.attributes

      let [itemMainSize, itemCrossSize] = item.offsetSize

      if(mainSize === 'height') [itemMainSize, itemCrossSize] = [itemCrossSize, itemMainSize]

      if(itemStyle.flex !== '') {
        flexLine.push(item)
      } else if(style.flexWrap === 'nowrap' || isAutoMainSize) {
        mainSpace -= itemMainSize
        crossSpace = Math.max(crossSpace, itemCrossSize)
        flexLine.push(item)
      } else {
        if(itemMainSize > groupMainSize) {
          setBoxLayoutSize(item, mainSize, groupMainSize)
          itemMainSize = groupMainSize
          itemCrossSize = mainSize === 'width' ? item.offsetSize[1] : item.offsetSize[0]
        }
        if(mainSpace < itemMainSize) {
          flexLine.mainSpace = mainSpace
          flexLine.crossSpace = crossSpace
          flexLine = [item]
          flexLines.push(flexLine)
          mainSpace = groupMainSize
          crossSpace = 0
        } else {
          flexLine.push(item)
        }
        crossSpace = Math.max(crossSpace, itemCrossSize)
        mainSpace -= itemMainSize
      }
    }
    flexLine.mainSpace = mainSpace

    if(style.flexWrap === 'nowrap' || isAutoMainSize) {
      flexLine.crossSpace = !isAutoSize(style[crossSize]) ? style[crossSize] : crossSpace
    } else {
      flexLine.crossSpace = crossSpace
    }

    function fixAnchor(item) {
      const [left, top] = item.originalRect
      if(left) {
        item.attr({x: x => x - left})
      }
      if(top) {
        item.attr({y: y => y - top})
      }
    }

    if(mainSpace < 0) {
      // overflow (happens only if container is single line), scale every item
      const scale = groupMainSize / (groupMainSize - mainSpace)
      let currentMain = mainBase
      for(let i = 0; i < items.length; i++) {
        const item = items[i]
        const itemStyle = item.attributes
        let boxSize = mainSize === 'width' ? item.offsetSize[0] : item.offsetSize[1]

        if(itemStyle.flex !== '') {
          boxSize = 0
        }

        boxSize *= scale

        item.attr(mainStart, currentMain)
        item.attr(mainEnd, currentMain + mainSign * boxSize)
        setBoxLayoutSize(item, mainSize, boxSize)
        currentMain = item.attr(mainEnd)
      }
    } else {
      // process each flex line
      flexLines.forEach((items) => {
        const mainSpace = items.mainSpace
        let flexTotal = 0
        for(let i = 0; i < items.length; i++) {
          const item = items[i]
          const itemStyle = item.attributes

          flexTotal += itemStyle.flex === '' ? 0 : parseInt(itemStyle.flex, 10)
        }

        if(flexTotal > 0) {
          // There is flexible flex items
          let currentMain = mainBase
          for(let i = 0; i < items.length; i++) {
            const item = items[i]
            const itemStyle = item.attributes
            let boxSize = mainSize === 'width' ? item.offsetSize[0] : item.offsetSize[1]

            if(itemStyle.flex !== '') {
              boxSize = (mainSpace / flexTotal) * parseInt(itemStyle.flex, 10)
            }

            item.attr(mainStart, currentMain)
            item.attr(mainEnd, currentMain + mainSign * boxSize)
            setBoxLayoutSize(item, mainSize, boxSize)
            currentMain = item.attr(mainEnd)
          }
        } else {
          let currentMain = mainBase,
            step = 0
          // There is *NO* flexible flex items, which means, justifyContent shoud work
          const justifyContent = style.justifyContent

          if(justifyContent === 'flex-end') {
            currentMain = mainSpace * mainSign + mainBase
            step = 0
          } else if(justifyContent === 'center') {
            currentMain = mainSpace / 2 * mainSign + mainBase
            step = 0
          } else if(justifyContent === 'space-between') {
            step = mainSpace / (items.length - 1) * mainSign
            currentMain = mainBase
          } else if(justifyContent === 'space-around') {
            step = mainSpace / items.length * mainSign
            currentMain = step / 2 + mainBase
          }

          for(let i = 0; i < items.length; i++) {
            const item = items[i]
            const boxSize = mainSize === 'width' ? item.offsetSize[0] : item.offsetSize[1]

            item.attr(mainStart, currentMain)
            item.attr(mainEnd, item.attr(mainStart) + mainSign * boxSize)
            setBoxLayoutSize(item, mainSize, boxSize)
            currentMain = item.attr(mainEnd) + step
          }
        }
      })
    }

    // compute the cross axis sizes
    // align-items, align-self
    let crossSizeValue
    if(isAutoSize(style[crossSize])) { // auto sizing
      crossSpace = 0
      crossSizeValue = 0
      for(let i = 0; i < flexLines.length; i++) {
        crossSizeValue += flexLines[i].crossSpace
      }
      // setBoxSize(this, crossSize, crossSizeValue)
    } else {
      crossSpace = style[crossSize]
      for(let i = 0; i < flexLines.length; i++) {
        crossSpace -= flexLines[i].crossSpace
      }
    }

    if(style.flexWrap === 'wrap-reverse') {
      crossBase = isAutoSize(style[crossSize]) ? crossSizeValue : style[crossSize]
    } else {
      crossBase = 0
    }

    let step = 0
    const alignContent = style.alignContent

    if(alignContent === 'flex-end') {
      crossBase += crossSign * crossSpace
    } else if(alignContent === 'center') {
      crossBase += crossSign * crossSpace / 2
    } else if(alignContent === 'space-between') {
      step = crossSpace / (flexLines.length - 1)
    } else if(alignContent === 'space-around') {
      step = crossSpace / (flexLines.length)
      crossBase += crossSign * step / 2
    }

    flexLines.forEach((items) => {
      const lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace

      for(let i = 0; i < items.length; i++) {
        const item = items[i]

        const align = item.attributes.alignSelf || style.alignItems

        // if(isAutoSize(item.attr(crossSize))) {
        //   item.attr(crossSize, ((align === 'stretch')) ? lineCrossSize : 0)
        // }

        if(align === 'flex-start') {
          item.attr(crossStart, crossBase)
          item.attr(crossEnd, item.attr(crossStart) + crossSign * item.attr(crossSize))
        }

        if(align === 'flex-end') {
          item.attr(crossEnd, crossBase + crossSign * lineCrossSize)
          item.attr(crossStart, item.attr(crossEnd) - crossSign * item.attr(crossSize))
        }

        if(align === 'center') {
          item.attr(crossStart, crossBase + crossSign * (lineCrossSize - item.attr(crossSize)) / 2)
          item.attr(crossEnd, item.attr(crossStart) + crossSign * item.attr(crossSize))
        }

        if(align === 'stretch') {
          item.attr(crossStart, crossBase)
          item.attr(crossEnd, crossBase + crossSign * (!isAutoSize(item.attr(crossSize)) ? item.attr(crossSize) : lineCrossSize))
          // setBoxLayoutSize(item, crossSize, crossSign * (item.attr(crossEnd) - item.attr(crossStart)))
          const crossAttr = crossSize === 'width' ? 'layoutWidth' : 'layoutHeight'
          item.attr(crossAttr, crossSign * (item.attr(crossEnd) - item.attr(crossStart)))
        }

        fixAnchor(item)
      }
      crossBase += crossSign * (lineCrossSize + step)
    })
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
