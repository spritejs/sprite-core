import SpriteAttr from './attr'
import BaseNode from './basenode'
import {Matrix, Vector} from 'sprite-math'
import Animation from './animation'
import {rectVertices, boxToRect} from 'sprite-utils'
import {registerNodeType} from './nodetype'

import {drawRadiusBox, findColor, cacheContextPool} from './helpers/render'
import {Timeline} from 'sprite-animator'
import filters from './filters'

const _attr = Symbol('attr'),
  _animations = Symbol('animations'),
  _cachePriority = Symbol('cachePriority'),
  _effects = Symbol('effects')

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
    this.__cachePolicyThreshold = 6

    if(attr) {
      this.attr(attr)
    }
  }
  get cachePriority() {
    if(this.isVirtual) return -1
    return this[_cachePriority]
  }
  set cachePriority(priority) {
    this[_cachePriority] = priority
  }
  static setAttributeEffects(effects = {}) {
    if(this.prototype[_effects] == null) {
      this.prototype[_effects] = effects
    }
    Object.assign(this.prototype[_effects], effects)
  }
  static defineAttributes(attrs, effects) {
    this.Attr = class extends this.Attr {
      constructor(subject) {
        super(subject)
        if(attrs.init) attrs.init(this, subject)
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
    if(effects) this.setAttributeEffects(effects)
    return this.Attr
  }

  get layer() {
    return this.parent && this.parent.layer
  }

  serialize() {
    const nodeType = this.nodeType,
      attrs = this[_attr].serialize(),
      dataset = JSON.stringify(this.dataset),
      id = this.id

    return {
      nodeType,
      attrs,
      dataset,
      id,
    }
  }

  merge(attrs) {
    this[_attr].merge(attrs)
  }

  cloneNode() {
    const node = new this.constructor()
    node.merge(this[_attr].serialize())
    node.data(this.dataset)
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

  get hasLayout() {
    if(this.attr('position') === 'absolute') return false
    if(this.parent && this.parent.relayout && this.parent.attr('display') === 'flex') return true
    return false
  }

  set zIndex(val) {
    this.attr('zIndex', val)
  }

  get zIndex() {
    return this.attr('zIndex')
  }

  getAttribute(prop) {
    /* istanbul ignore next */
    return this.attr(prop)
  }
  setAttribute(prop, val) {
    /* istanbul ignore next */
    return this.attr(prop, val)
  }
  removeAttribute(prop) {
    /* istanbul ignore next */
    return this.attr(prop, null)
  }

  attr(props, val) {
    const setVal = (key, value) => {
      this[_attr][key] = value
      if(key === 'zIndex' && this.parent) {
        this.parent.children.sort((a, b) => {
          if(a.zIndex === b.zIndex) {
            return a.zOrder - b.zOrder
          }
          return a.zIndex - b.zIndex
        })
      }
    }
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
        if(val && typeof val.then === 'function') {
          return val.then((res) => {
            setVal(props, res)
          })
        }
        setVal(props, val)
        return this
      }
      return this[_attr][props]
    }

    return this[_attr].attrs
  }

  get attributes() {
    return this[_attr]
  }

  get isVirtual() {
    return false
  }

  isVisible() {
    const display = this.attr('display')
    if(display === 'none') {
      return false
    }

    const opacity = this.attr('opacity')
    if(opacity <= 0) {
      return false
    }

    if(this.isVirtual) return true

    const [width, height] = this.offsetSize
    if(width <= 0 || height <= 0) {
      return false
    }

    if(this.parent && this.parent.isVisible) {
      return this.parent.isVisible()
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
    const that = this,
      _animation = Symbol('animation')

    return {
      [_animation]: null,
      end() {
        const animation = this[_animation]
        if(animation && (animation.playState === 'running' || animation.playState === 'pending')) {
          animation.finish()
        }
      },
      reverse() {
        const animation = this[_animation]
        if(animation) {
          if(animation.playState === 'running' || animation.playState === 'pending') {
            animation.playbackRate = -animation.playbackRate
          } else {
            const direction = animation.timing.direction
            animation.timing.direction = direction === 'reverse' ? 'normal' : 'reverse'
            animation.play()
          }
        }
        return animation.finished
      },
      attr(prop, val) {
        this.end()
        if(typeof prop === 'string') {
          prop = {[prop]: val}
        }
        Object.entries(prop).forEach(([key, value]) => {
          if(typeof value === 'function') {
            prop[key] = value(that.attr(key))
          }
        })
        this[_animation] = that.animate([prop], {
          duration: sec * 1000,
          fill: 'forwards',
          easing,
        })
        return this[_animation].finished
      },
    }
  }
  animate(frames, timing) {
    const animation = new Animation(this, frames, timing)
    if(this[_effects]) animation.applyEffects(this[_effects])
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
      node.timeline = new Timeline()
      node.update = function () {
        const currentTime = this.timeline.currentTime
        node.dispatchEvent('update', {target: this, timeline: this.timeline, renderTime: currentTime}, true, true)
      }
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
    if(this.hasLayout) parent.clearLayout()
    return ret
  }

  disconnect(parent) {
    this[_animations].forEach(animation => animation.cancel())
    if(this.cache) {
      this.cache = null
    }
    if(this.hasLayout) parent.clearLayout()
    const ret = super.disconnect(parent)
    delete this.context
    return ret
  }

  get attrSize() {
    const [width, height] = this.attr('size')
    if(!this.hasLayout) {
      return [width, height]
    }
    const layoutWidth = this.attr('layoutWidth'),
      layoutHeight = this.attr('layoutHeight')

    return [layoutWidth !== '' ? layoutWidth : width, layoutHeight !== '' ? layoutHeight : height]
  }

  // content width / height
  get contentSize() {
    if(this.isVirtual) return [0, 0]

    const [width, height] = this.attrSize

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

    return [Math.floor(pos[0] + bound[0]),
      Math.floor(pos[1] + bound[1]),
      Math.ceil(pos[0] + bound[0] + bound[2]),
      Math.ceil(pos[1] + bound[1] + bound[3])]
  }

  get renderRect() {
    return boxToRect(this.renderBox)
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
      this.parent.update(this)
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
    /* istanbul ignore if */
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

    let [nx, ny] = this.pointToOffset(parentX, parentY)
    evt.offsetX = nx
    evt.offsetY = ny

    const [ox, oy, ow, oh] = this.originalRect

    if(nx >= ox && nx - ox < ow
      && ny >= oy && ny - oy < oh) {
      if(this.context && this.context.isPointInPath) {
        const borderWidth = this.attr('border').width,
          borderRadius = this.attr('borderRadius')
        if(borderWidth || borderRadius) {
          const [width, height] = this.outerSize
          const [x, y, w, h, r] = [0, 0,
            width, height,
            Math.max(0, borderRadius + borderWidth / 2)]
          drawRadiusBox(this.context, {x, y, w, h, r})
          if(this.layer && this.layer.offset) {
            nx += this.layer.offset[0]
            ny += this.layer.offset[1]
          }
          return this.context.isPointInPath(nx - ox, ny - oy)
        }
      }
      return true
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

  relayout() {

  }

  draw(t, drawingContext = this.context) {
    const bound = this.originalRect
    let cachableContext = this.cache

    const filter = this.attr('filter'),
      shadow = this.attr('shadow')

    // filter & shadow require cachableContext
    if(!cachableContext && (filter || shadow || this.cachePriority > this.__cachePolicyThreshold)) {
      cachableContext = cacheContextPool.get(drawingContext)
      if(cachableContext) {
        // +2 to solve 1px problem
        cachableContext.canvas.width = Math.ceil(bound[2]) + 2
        cachableContext.canvas.height = Math.ceil(bound[3]) + 2
      } else {
        this.__cachePolicyThreshold = Infinity
      }
    }

    this[_cachePriority] = Math.min(this[_cachePriority] + 1, 10)
    const evtArgs = {context: drawingContext, cacheContext: cachableContext, target: this, renderTime: t, fromCache: !!this.cache}

    drawingContext.save()
    drawingContext.translate(...this.attr('pos'))
    drawingContext.transform(...this.transform.m)

    // fix for wxapp
    const alpha = drawingContext.globalAlpha != null ? drawingContext.globalAlpha : 1
    drawingContext.globalAlpha = alpha * this.attr('opacity')

    if(!cachableContext) {
      drawingContext.translate(bound[0], bound[1])
    } else {
      // solve 1px problem
      cachableContext.translate(bound[0] - Math.floor(bound[0]) + 1, bound[1] - Math.floor(bound[1]) + 1)
    }

    this.dispatchEvent('beforedraw', evtArgs, true, true)

    if(cachableContext) {
      // set cache before render for group
      if(!this.cache) {
        this.cache = cachableContext
        this.render(t, cachableContext)
      }
    } else {
      this.render(t, drawingContext)
    }

    if(cachableContext && cachableContext.canvas.width > 0 && cachableContext.canvas.height > 0) {
      if(filter) {
        drawingContext.filter = filters.compile(filter)
      }
      if(shadow) {
        let {blur, color, offset} = shadow
        blur = blur || 1
        color = color || 'rgba(0,0,0,1)'
        drawingContext.shadowBlur = blur
        drawingContext.shadowColor = color
        if(offset) {
          drawingContext.shadowOffsetX = offset[0]
          drawingContext.shadowOffsetY = offset[1]
        }
      }
      drawingContext.drawImage(cachableContext.canvas, Math.floor(bound[0]) - 1, Math.floor(bound[1]) - 1)
    }

    this.dispatchEvent('afterdraw', evtArgs, true, true)

    drawingContext.restore()

    return drawingContext
  }

  render(t, drawingContext) {
    if(this.isVirtual) return false

    const border = this.attr('border'),
      borderRadius = this.attr('borderRadius'),
      padding = this.attr('padding'),
      [offsetWidth, offsetHeight] = this.offsetSize,
      [clientWidth, clientHeight] = this.clientSize

    /* istanbul ignore if */
    if(offsetWidth === 0 || offsetHeight === 0) return
    if(border.width <= 0
      && borderRadius <= 0
      && !this.attr('bgcolor')
      && !this.attr('gradients').bgcolor) {
      drawingContext.translate(padding[3], padding[0])
      return false // don't need to render
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

    if(this.cache == null || borderWidth || borderRadius || bgcolor) {
      const [x, y, w, h, r] = [borderWidth, borderWidth,
        clientWidth, clientHeight,
        Math.max(0, borderRadius - borderWidth / 2)]

      drawRadiusBox(drawingContext, {x, y, w, h, r})

      if(bgcolor) {
        drawingContext.fillStyle = bgcolor
        drawingContext.fill()
      }
      // clip is expensive, we should only perform clip when it has to.
      if(borderRadius && (this.nodeType !== 'sprite' || this.textures && this.textures.length)) {
        drawingContext.clip()
      }
    }

    drawingContext.translate(borderWidth + padding[3], borderWidth + padding[0])

    return true
  }
}

registerNodeType('basesprite', BaseSprite)
