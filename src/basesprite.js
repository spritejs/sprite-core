import SpriteAttr from './attr'
import BaseNode from './basenode'
import {Matrix, Vector} from 'sprite-math'
import Animation from './animation'
import {rectVertices} from 'sprite-utils'
import {registerNodeType} from './nodetype'

import {drawRadiusBox, findColor, cacheContextPool} from './helpers/render'

const _attr = Symbol('attr'),
  _animations = Symbol('animations'),
  _cachePriority = Symbol('cachePriority')

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
    this[_cachePriority] = 0

    if(attr) {
      this.attr(attr)
    }
  }
  get cachePriority() {
    return this[_cachePriority]
  }
  static defineAttributes(attrs) {
    this.Attr = class extends this.Attr {
      constructor(subject) {
        super(subject)
        attrs.init(this, subject)
      }
    }
    Object.entries(attrs).forEach(([prop, handler]) => {
      let getter = function () {
        return this.get(prop)
      }
      if(typeof handler !== 'function' && handler.set) {
        getter = handler.get || getter
        handler = handler.set
      }
      if(prop !== 'init') {
        this.Attr.prototype.__attributeNames.push(prop)
        Object.defineProperty(this.Attr.prototype, prop, {
          set(val) {
            this.__clearCacheTag = false
            this.__updateTag = false
            handler(this, val)
            if(this.subject && this.__updateTag) {
              this.subject.forceUpdate(this.__clearCacheTag)
            }
            delete this.__updateTag
            delete this.__clearCacheTag
          },
          get: getter,
        })
      }
    })
    return this.Attr
  }

  get layer() {
    return this.parent && this.parent.layer
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

  set zIndex(val) {
    this.attr('zIndex', val)
  }

  get zIndex() {
    return this.attr('zIndex')
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
      Object.entries(props).forEach(([prop, value]) => {
        this.attr(prop, value)
      })
      return this
    } else if(typeof props === 'string') {
      if(val !== undefined) {
        if(typeof val === 'function') {
          val = val(this[_attr][props])
        }
        Object.assign(this[_attr], {[props]: val})
        if(props === 'zIndex' && this.parent) {
          this.parent.children.sort((a, b) => {
            if(a.zIndex === b.zIndex) {
              return a.zOrder - b.zOrder
            }
            return a.zIndex - b.zIndex
          })
        }
        return this
      }
      return this[_attr][props]
    }

    return this[_attr].attrs
  }
  attrs() {
    return this.attr()
  }

  isVisible() {
    const opacity = this.attr('opacity')
    if(opacity <= 0) {
      return false
    }

    const [width, height] = this.offsetSize
    if(width <= 0 || height <= 0) {
      return false
    }

    return true
  }

  get transform() {
    const transform = new Matrix(this[_attr].get('transformMatrix'))
    const transformOrigin = this.attr('transformOrigin')
    if(transformOrigin) {
      const t = new Matrix()
      t.translate(...transformOrigin)
      t.multiply(transform)
      t.translate(...transformOrigin.map(v => -v))
      return t
    }
    return transform
  }
  transition(sec, easing = 'linear') {
    const that = this
    return {
      attr(prop, val) {
        if(typeof prop === 'string') {
          prop = {[prop]: val}
        }
        Object.entries(prop).forEach(([key, value]) => {
          if(typeof value === 'function') {
            prop[key] = value(that.attr(key))
          }
        })
        const anim = that.animate([prop], {
          duration: sec * 1000,
          fill: 'forwards',
          easing,
        })
        return anim.finished
      },
    }
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
      if(parent.layer) {
        animation.baseTimeline = parent.layer.timeline
      }
      animation.play()
      animation.finished.then(() => {
        this[_animations].delete(animation)
      })
    })
    return ret
  }

  disconnect(parent) {
    this[_animations].forEach(animation => animation.cancel())
    if(this.cache) {
      cacheContextPool.put(this.cache)
    }
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
    const {width: borderWidth} = this.attr('border'),
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

  get boundingRect() {
    const transform = this.transform
    const [ox, oy] = this.originalRect
    const [width, height] = this.offsetSize

    const vertexs = [[ox, oy],
      [width + ox, oy],
      [ox, height + oy],
      [width + ox, height + oy]]

    const transformed = vertexs.map((v) => {
      return transform.transformPoint(v[0], v[1])
    })

    const vx = transformed.map(v => v[0]),
      vy = transformed.map(v => v[1])

    const minX = Math.min(...vx),
      minY = Math.min(...vy),
      maxX = Math.max(...vx),
      maxY = Math.max(...vy)

    return [...[minX, minY], ...[maxX - minX, maxY - minY]]
  }

  // rect before transform
  get originalRect() {
    const [width, height] = this.offsetSize,
      [anchorX, anchorY] = this.attr('anchor')

    return [-anchorX * width,
      -anchorY * height,
      width, height]
  }

  get originalRenderRect() {
    const bound = this.originalRect,
      pos = this.attr('pos')

    return [pos[0] + bound[0],
      pos[1] + bound[1],
      bound[2],
      bound[3]]
  }

  get renderBox() {
    const bound = this.boundingRect,
      pos = this.attr('pos')

    return [pos[0] + bound[0] - 1,
      pos[1] + bound[1] - 1,
      pos[0] + bound[0] + bound[2] + 1,
      pos[1] + bound[1] + bound[3] + 1]
  }

  get renderRect() {
    const bound = this.boundingRect,
      pos = this.attr('pos')

    return [pos[0] + bound[0],
      pos[1] + bound[1],
      bound[2],
      bound[3]]
  }

  get vertices() {
    const vertices = rectVertices(this.originalRect),
      transform = this.transform,
      [x0, y0] = this.attr('pos')

    return vertices.map((v) => {
      const [x, y] = transform.transformPoint(v[0], v[1])
      return [x0 + x, y0 + y]
    })
  }

  set cache(context) {
    if(this.cacheContext && context !== this.cacheContext) {
      cacheContextPool.put(this.cacheContext)
    }
    this.cacheContext = context
  }

  get cache() {
    return this.cacheContext
  }

  clearCache() {
    this[_cachePriority] = 0
    this.cache = null
    if(this.parent && this.parent.cache) {
      this.parent[_cachePriority] = 0
      this.parent.cache = null
    }
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
    if(clearCache) {
      this.clearCache()
    }
    const parent = this.parent
    if(parent) {
      if(parent.forceUpdate) {
        // is group
        parent[_cachePriority] = 0
        parent.cache = null
        parent.forceUpdate()
      } else if(parent.update) {
        // is layer
        this.parent.update(this)
      }
    }
  }

  // layer position to sprite offset
  pointToOffset(x, y) {
    const [x0, y0] = this.attr('pos')
    const [dx, dy] = [x - x0, y - y0]
    const transform = this.transform
    return transform.inverse().transformPoint(dx, dy)
  }

  pointCollision(evt) {
    if(!this.isVisible()) {
      return false
    }

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
      const [ox, oy, ow, oh] = this.originalRect

      const [nx, ny] = this.pointToOffset(parentX, parentY)

      if(nx >= ox && nx - ox < ow
        && ny >= oy && ny - oy < oh) {
        evt.offsetX = nx
        evt.offsetY = ny

        return true
      }
    }
  }

  // OBB: http://blog.csdn.net/silangquan/article/details/50812425
  OBBCollision(sprite) {
    // vertices: [p1, p2, p3, p4]
    const [p11, p12, p13] = this.vertices,
      [p21, p22, p23] = sprite.vertices

    const a1 = (new Vector(p12, p11)).unit(),
      a2 = (new Vector(p13, p12)).unit(),
      a3 = (new Vector(p22, p21)).unit(),
      a4 = (new Vector(p23, p22)).unit()

    // The projection of the axis of a vertex in a certain direction
    function verticesProjection(vertices, axis) {
      const [p1, p2, p3, p4] = vertices.map(v => axis.dot(new Vector(v)))

      return [Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4)]
    }

    function projectionIntersect(p1, p2) {
      const m1 = (p1[0] + p1[1]) / 2,
        l1 = Math.abs(p1[1] - p1[0]),
        m2 = (p2[0] + p2[1]) / 2,
        l2 = Math.abs(p2[1] - p2[0])

      return Math.abs(m2 - m1) <= (l1 + l2) / 2
    }

    return projectionIntersect(
      verticesProjection(this.vertices, a1),
      verticesProjection(sprite.vertices, a1)
    ) && projectionIntersect(
      verticesProjection(this.vertices, a2),
      verticesProjection(sprite.vertices, a2)
    ) && projectionIntersect(
      verticesProjection(this.vertices, a3),
      verticesProjection(sprite.vertices, a3)
    ) && projectionIntersect(
      verticesProjection(this.vertices, a4),
      verticesProjection(sprite.vertices, a4)
    )
  }

  draw(t) {
    const drawingContext = this.context
    const bound = this.originalRect
    let cachableContext = null
    // solve 1px problem
    if(this[_cachePriority] > 6) {
      if(this.cache) {
        cachableContext = this.cache
      } else {
        cachableContext = cacheContextPool.get(drawingContext)
        cachableContext.canvas.width = Math.ceil(bound[2]) + 2
        cachableContext.canvas.height = Math.ceil(bound[3]) + 2
      }
    }

    this[_cachePriority] = Math.min(this[_cachePriority] + 1, 10)
    const evtArgs = {context: drawingContext, cacheContext: cachableContext, target: this, renderTime: t, fromCache: !!this.cache}

    drawingContext.save()
    this.dispatchEvent('beforedraw', evtArgs, true, true)

    drawingContext.save()
    drawingContext.translate(...this.attr('pos'))
    drawingContext.transform(...this.transform.m)
    drawingContext.globalAlpha *= this.attr('opacity')

    if(!cachableContext) {
      drawingContext.translate(bound[0], bound[1])
    } else {
      // solve 1px problem
      cachableContext.translate(1, 1)
    }

    if(cachableContext) {
      // set cache before render for group
      if(!this.cache) {
        this.cache = cachableContext
        this.render(t, cachableContext)
      }
    } else {
      this.render(t, drawingContext)
    }

    if(cachableContext) {
      drawingContext.drawImage(cachableContext.canvas, bound[0] - 1, bound[1] - 1)
    }
    drawingContext.restore()

    this.lastRenderBox = this.renderBox

    this.dispatchEvent('afterdraw', evtArgs, true, true)
    drawingContext.restore()

    return drawingContext
  }

  render(t, drawingContext) {
    const border = this.attr('border'),
      borderRadius = this.attr('borderRadius'),
      padding = this.attr('padding'),
      [offsetWidth, offsetHeight] = this.offsetSize,
      [clientWidth, clientHeight] = this.clientSize

    if(offsetWidth === 0 || offsetHeight === 0) {
      return // don't need to render
    }

    const borderWidth = border.width
    let borderStyle = border.style

    // draw border
    if(borderWidth) {
      drawingContext.lineWidth = borderWidth

      const [x, y, w, h, r] = [borderWidth / 2, borderWidth / 2,
        offsetWidth - borderWidth, offsetHeight - borderWidth,
        borderRadius]

      drawRadiusBox(drawingContext, {x, y, w, h, r})

      if(borderStyle && borderStyle !== 'solid') {
        const dashOffset = this.attr('dashOffset')
        drawingContext.lineDashOffset = dashOffset
        if(borderStyle === 'dashed') {
          borderStyle = [borderWidth * 3, borderWidth * 3]
        }
        drawingContext.setLineDash(borderStyle)
      }
      drawingContext.strokeStyle = findColor(drawingContext, this, 'border')
      drawingContext.stroke()
    }

    // draw bgcolor
    const bgcolor = findColor(drawingContext, this, 'bgcolor')

    if(borderWidth || borderRadius || bgcolor) {
      const [x, y, w, h, r] = [borderWidth, borderWidth,
        clientWidth, clientHeight,
        Math.max(0, borderRadius - borderWidth / 2)]

      drawRadiusBox(drawingContext, {x, y, w, h, r})

      if(bgcolor) {
        drawingContext.fillStyle = bgcolor
        drawingContext.fill()
      }
      // we should always clip to prevent the subclass rendering not to overflow the box
      // but in some platform (eg. wxapp), clip regions has very high cost
      // for performance we allow the region clip only when sprite has borderRadius
      if(borderWidth || borderRadius) {
        drawingContext.clip()
      }
    }

    drawingContext.translate(borderWidth + padding[3], borderWidth + padding[0])
  }
}

registerNodeType('basesprite', BaseSprite)
