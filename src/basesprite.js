import SpriteAttr from './attr'
import BaseNode from './basenode'
import {Matrix} from 'sprite-math'
import Animation from './animation'
import {rectVertices} from 'sprite-utils'
import {registerNodeType} from './nodetype'

import {drawRadiusBox, findColor, copyContext} from './helpers/render'

const _attr = Symbol('attr'),
  _animations = Symbol('animations')

export default class BaseSprite extends BaseNode {
  static Attr = SpriteAttr;

  /**
    new Sprite({
      attr: {
        ...
      }
    })
   */
  constructor(attr) {
    super()

    this[_attr] = new this.constructor.Attr(this)
    this[_animations] = new Set()

    if(attr) {
      this.attr(attr)
    }
  }

  get layer() {
    let node = this
    do {
      node = node.parent
    } while(node != null && !(node.drawSprites))
    return node
  }

  serialize() {
    const nodeType = this.nodeType,
      attrs = this[_attr].serialize(),
      id = this.id

    return {
      nodeType,
      attrs,
      id,
    }
  }

  merge(attrs) {
    this[_attr].merge(attrs)
  }

  cloneNode() {
    const node = new this.constructor()
    node.merge(this[_attr].serialize())
    return node
  }

  set id(val) {
    this.attr('id', val)
  }
  get id() {
    return this.attr('id')
  }

  set name(val) {
    this.attr('name', val)
  }
  get name() {
    return this.attr('name')
  }

  getAttribute(prop) {
    return this.attr(prop)
  }
  setAttribute(prop, val) {
    return this.attr(prop, val)
  }
  removeAttribute(prop) {
    return this.attr(prop, null)
  }

  attr(props, val) {
    if(typeof props === 'object') {
      Object.assign(this[_attr], props)
      return this
    } else if(typeof props === 'string') {
      if(val !== undefined) {
        Object.assign(this[_attr], {[props]: val})
        return this
      }
      const attrs = this[_attr].attrs
      return attrs[props]
    }

    return this[_attr].attrs
  }
  attrs() {
    return this[_attr].attrs
  }

  get transform() {
    return new Matrix(this[_attr].get('transformMatrix'))
  }

  animate(frames, timing) {
    const animation = new Animation(this, frames, timing)
    if(this.layer) {
      animation.baseTimeline = this.layer.timeline
      animation.play()
      animation.finished.then(() => {
        this[_animations].delete(animation)
      })
    }
    this[_animations].add(animation)
    return animation
  }

  connect(parent, zOrder = 0) {
    if(parent && !(parent instanceof BaseNode)) {
      const node = new BaseNode()
      node.context = parent
      parent = node
    }
    const ret = super.connect(parent, zOrder)
    Object.defineProperty(this, 'context', {
      get: () => parent.cache || parent.context,
      configurable: true,
    })
    this[_animations].forEach((animation) => {
      animation.baseTimeline = parent.timeline
      animation.play()
      animation.finished.then(() => {
        this[_animations].delete(animation)
      })
    })
    return ret
  }

  disconnect(parent) {
    this[_animations].forEach(animation => animation.cancel())
    const ret = super.disconnect(parent)
    delete this.context
    return ret
  }

  // content width / height
  get contentSize() {
    const [width, height] = this.attr('size')

    return [width | 0, height | 0]
  }

  // content + padding
  get clientSize() {
    const [top, right, bottom, left] = this.attr('padding'),
      [width, height] = this.contentSize

    return [left + width + right, top + height + bottom]
  }

  // content + padding + border
  get offsetSize() {
    const [borderWidth] = this.attr('border'),
      [width, height] = this.clientSize

    return [width + 2 * borderWidth,
      height + 2 * borderWidth]
  }

  get innerSize() {
    return this.contentSize
  }

  get outerSize() {
    return this.offsetSize
  }

  get boundRect() {
    const anchor = this.attr('anchor'),
      transform = this.transform

    const [width, height] = this.offsetSize

    const [anchorX, anchorY] = anchor

    const vertexs = [[-anchorX * width, -anchorY * height],
      [(1 - anchorX) * width, -anchorY * height],
      [-anchorX * width, (1 - anchorY) * height],
      [(1 - anchorX) * width, (1 - anchorY) * height]]

    const transformed = vertexs.map(v => transform.transformPoint(v[0], v[1]))
    const vx = transformed.map(v => v[0]),
      vy = transformed.map(v => v[1])

    const minX = Math.min(...vx),
      minY = Math.min(...vy),
      maxX = Math.max(...vx),
      maxY = Math.max(...vy)

    return [...[minX, minY].map(Math.floor),
      ...[maxX - minX, maxY - minY].map(Math.ceil)]
  }

  // rect before transform
  get originRect() {
    const [width, height] = this.offsetSize,
      [anchorX, anchorY] = this.attr('anchor')

    return [Math.floor(-anchorX * width),
      Math.floor(-anchorY * height),
      width, height]
  }

  get originRenderRect() {
    const bound = this.originRect,
      pos = this.attr('pos')

    return [pos[0] + bound[0],
      pos[1] + bound[1],
      bound[2],
      bound[3]]
  }

  get renderBox() {
    const bound = this.boundRect,
      pos = this.attr('pos')

    return [pos[0] + bound[0] - 1,
      pos[1] + bound[1] - 1,
      pos[0] + bound[0] + bound[2] + 1,
      pos[1] + bound[1] + bound[3] + 1]
  }

  get renderRect() {
    const bound = this.boundRect,
      pos = this.attr('pos')

    return [pos[0] + bound[0],
      pos[1] + bound[1],
      bound[2],
      bound[3]]
  }

  get vertices() {
    const vertices = rectVertices(this.originRect),
      transform = this.transform,
      [x0, y0] = this.attr('pos')

    return vertices.map((v) => {
      const [x, y] = transform.transformPoint(v[0], v[1])
      return [Math.round(x0 + x), Math.round(y0 + y)]
    })
  }

  set cache(context) {
    this.cacheContext = context
  }

  get cache() {
    return this.cacheContext
  }

  remove() {
    if(!this.parent) return false
    this.parent.removeChild(this)
    return true
  }

  appendTo(parent) {
    parent.appendChild(this)
  }

  forceUpdate(clearCache = false) {
    const parent = this.parent
    if(parent) {
      if(parent.forceUpdate) {
        parent.forceUpdate(true)
      } else if(parent.update) {
        if(clearCache) {
          this.cache = null
        }
        this.parent.update(this)
      }
    }
  }

  // layer position to sprite offset
  pointToOffset(x, y) {
    const attr = this.attr()
    const [dx, dy] = [x - attr.x, y - attr.y]
    const transform = this.transform
    return transform.inverse().transformPoint(dx, dy)
  }

  pointCollision(evt) {
    let parentX,
      parentY

    if(evt.parentX != null) {
      // group
      parentX = evt.parentX
      parentY = evt.parentY
    } else {
      parentX = evt.layerX
      parentY = evt.layerY
    }

    const [x, y, w, h] = this.renderRect

    if(parentX >= x && parentX - x < w
     && parentY >= y && parentY - y < h) {
      const [ox, oy, ow, oh] = this.originRect

      const [nx, ny] = this.pointToOffset(parentX, parentY)

      if(nx >= ox && nx - ox < ow
        && ny >= oy && ny - oy < oh) {
        evt.offsetX = nx
        evt.offsetY = ny

        return true
      }
    }
  }
  draw(t, ...args) {
    const drawingContext = this.context

    drawingContext.save()
    drawingContext.translate(...this.attr('pos'))
    drawingContext.transform(...this.transform.m)
    drawingContext.globalAlpha = this.attr('opacity')

    const canuseCache = drawingContext.canvas && drawingContext.canvas.cloneNode

    let context = canuseCache ? this.cache : drawingContext

    const bound = this.originRect
    if(!canuseCache) {
      context.translate(bound[0], bound[1])
    } else if(!context) {
      context = copyContext(drawingContext, bound[2], bound[3])
    }

    const evtArgs = {context, target: this, renderTime: t}

    this.dispatchEvent('beforedraw', evtArgs, true, true)
    if(this.cache !== context) {
      // set cache before render for group
      if(canuseCache) this.cache = context
      context = this.render(t, context)
    }
    if(canuseCache) {
      drawingContext.drawImage(context.canvas, bound[0], bound[1])
    }
    this.dispatchEvent('afterdraw', evtArgs, true, true)
    drawingContext.restore()

    this.dispatchEvent('update', evtArgs, true, true)
    this.lastRenderBox = this.renderBox

    return drawingContext
  }

  render(t, drawingContext) {
    const attr = this.attr(),
      [offsetWidth, offsetHeight] = this.offsetSize,
      [clientWidth, clientHeight] = this.clientSize

    if(offsetWidth === 0 || offsetHeight === 0) {
      return drawingContext // don't need to render
    }

    const borderWidth = attr.border[0]
    const borderRadius = attr.borderRadius

    drawingContext.save()

    // draw border
    if(borderWidth) {
      drawingContext.lineWidth = borderWidth

      const [x, y, w, h, r] = [borderWidth / 2, borderWidth / 2,
        offsetWidth - borderWidth, offsetHeight - borderWidth,
        borderRadius]

      drawRadiusBox(drawingContext, {x, y, w, h, r})
      drawingContext.strokeStyle = findColor(drawingContext, this, 'border')
      drawingContext.stroke()
      drawingContext.clip()
    }

    // draw bgcolor
    const bgcolor = findColor(drawingContext, this, 'bgcolor')
    if(bgcolor) {
      const [x, y, w, h, r] = [borderWidth, borderWidth,
        clientWidth, clientHeight,
        Math.max(0, borderRadius - borderWidth / 2)]

      drawRadiusBox(drawingContext, {x, y, w, h, r})

      drawingContext.fillStyle = bgcolor
      drawingContext.fill()
    }

    drawingContext.restore()

    drawingContext.translate(attr.padding[0], attr.padding[3])

    return drawingContext
  }
}

registerNodeType('basesprite', BaseSprite)
