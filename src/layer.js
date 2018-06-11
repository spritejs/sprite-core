import BaseNode from './basenode'
import Batch from './batch'
import Group from './group'
import {Timeline} from 'sprite-animator'
import {requestAnimationFrame} from 'fast-animation-frame'
import {registerNodeType} from './nodetype'

import {clearContext} from './helpers/render'
import {clearDirtyRects} from './helpers/dirty-check'
import {setDeprecation} from 'sprite-utils'

const _children = Symbol('children'),
  _updateSet = Symbol('updateSet'),
  _zOrder = Symbol('zOrder'),
  _tRecord = Symbol('tRecord'),
  _timeline = Symbol('timeline'),
  _renderDeferer = Symbol('renderDeferrer')

export default class Layer extends BaseNode {
  constructor({
    context,
    handleEvent,
    evaluateFPS,
    renderMode,
    shadowContext,
  } = {}) {
    super()

    this.handleEvent = handleEvent !== false
    this.evaluateFPS = !!evaluateFPS

    // renderMode: repaintAll | repaintDirty
    this.renderMode = renderMode || 'repaintAll'

    this.outputContext = context

    if(shadowContext !== false) {
      if(typeof shadowContext === 'object') {
        this.shadowContext = shadowContext
      } else if(context.canvas && context.canvas.cloneNode) {
        const shadowCanvas = context.canvas.cloneNode()
        this.shadowContext = shadowCanvas.getContext('2d')
      }
    }

    // auto release
    /* istanbul ignore if  */
    if(context.canvas && context.canvas.addEventListener) {
      context.canvas.addEventListener('DOMNodeRemovedFromDocument', () => {
        this.timeline.clear()
        this.clear()
      })
    }

    this[_children] = []
    this[_updateSet] = new Set()
    this[_zOrder] = 0
    this[_tRecord] = [] // calculate FPS
    this[_timeline] = new Timeline()
    this[_renderDeferer] = null
  }

  get layer() {
    return this
  }

  get children() {
    return this[_children]
  }

  get timeline() {
    return this[_timeline]
  }

  get context() {
    return this.shadowContext ? this.shadowContext : this.outputContext
  }

  get canvas() {
    return this.outputContext.canvas
  }
  get offset() {
    return [0, 0]
  }

  remove(...args) {
    if(args.length === 0) {
      setDeprecation('layer.remove()', 'Instead use layer.clear().')
      return this.clear()
    }
    return args.map(child => this.removeChild(child))
  }
  prepareRender() {
    if(!this[_renderDeferer]) {
      this[_renderDeferer] = {}
      this[_renderDeferer].promise = new Promise((resolve, reject) => {
        Object.assign(this[_renderDeferer], {resolve, reject})
        requestAnimationFrame(this.draw.bind(this))
      })
      // .catch(ex => console.error(ex.message))
    }
    return this[_renderDeferer] ? this[_renderDeferer].promise : Promise.resolve()
  }
  draw(t) {
    /* istanbul ignore if  */
    if(t && this.evaluateFPS) {
      this[_tRecord].push(t)
      this[_tRecord] = this[_tRecord].slice(-10)
    }

    const updateSet = this[_updateSet]
    if(updateSet.size) {
      let renderer
      if(this.renderMode === 'repaintDirty') {
        renderer = this.renderRepaintDirty.bind(this)
      } else if(this.renderMode === 'repaintAll') {
        renderer = this.renderRepaintAll.bind(this)
      } else {
        /* istanbul ignore next  */
        throw new Error('unknown render mode!')
      }
      const currentTime = this.timeline.currentTime
      renderer(currentTime)

      super.dispatchEvent.call(
        this, 'update',
        {target: this, timeline: this.timeline, renderTime: currentTime}, true
      )
    }
    if(this[_renderDeferer]) {
      this[_renderDeferer].resolve()
      this[_renderDeferer] = null
    }
  }
  update(target) {
    if(target && this[_updateSet].has(target)) return
    if(target) this[_updateSet].add(target)
    this.prepareRender()
  }
  isVisible(sprite) {
    if(!sprite.isVisible()) {
      return false
    }
    if(sprite.parent !== this) {
      return false
    }
    return true
  }
  get fps() /* istanbul ignore next  */ {
    if(!this.evaluateFPS) {
      return NaN
    }
    let sum = 0
    const tr = this[_tRecord].slice(-10)
    const len = tr.length

    if(len <= 5) {
      return NaN
    }
    tr.reduceRight((a, b, i) => { sum += (a - b); return b })

    return Math.round(1000 * (len - 1) / sum)
  }
  drawSprites(renderEls, t) {
    for(let i = 0; i < renderEls.length; i++) {
      const child = renderEls[i]
      if(child.parent === this) {
        const isVisible = this.isVisible(child)
        if(isVisible) {
          child.draw(t)
        } else {
          // invisible, only need to remove lastRenderBox
          delete child.lastRenderBox
        }
        if(child.isDirty) {
          child.isDirty = false
          child.dispatchEvent('update', {target: child, renderTime: t, isVisible}, true, true)
        }
      }
    }
  }
  renderRepaintAll(t) {
    const renderEls = this[_children]

    const outputContext = this.outputContext
    clearContext(outputContext)

    const shadowContext = this.shadowContext

    if(shadowContext) {
      clearContext(shadowContext)
      this.drawSprites(renderEls, t)
      outputContext.drawImage(shadowContext.canvas, 0, 0)
    } else {
      this.drawSprites(renderEls, t)
    }

    this[_updateSet].clear()
  }
  renderRepaintDirty(t) {
    const updateEls = [...this[_updateSet]]
    if(updateEls.some(el => !!el.attr('filter'))) {
      return this.renderRepaintAll(t)
    }

    const shadowContext = this.shadowContext
    const outputContext = this.outputContext

    const renderEls = this[_children]

    if(shadowContext) {
      shadowContext.save()
      shadowContext.beginPath()
    }
    outputContext.save()
    outputContext.beginPath()

    clearDirtyRects({shadowContext, outputContext}, updateEls, true)

    if(shadowContext) {
      shadowContext.clip()
      outputContext.clip()
      clearContext(shadowContext)
    }
    outputContext.clip()
    clearContext(outputContext)

    this.drawSprites(renderEls, t)
    if(shadowContext) {
      outputContext.drawImage(shadowContext.canvas, 0, 0)
      shadowContext.restore()
    }

    outputContext.restore()
    this[_updateSet].clear()
  }
  pointCollision(evt) {
    if(this.outputContext.canvas) {
      const {layerX, layerY} = evt
      const {width, height} = this.outputContext.canvas

      if(layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
        return true
      }
      return false
    }
    /* istanbul ignore next  */
    return true
  }
  dispatchEvent(type, evt, collisionState = false, swallow = false) {
    const isCollision = collisionState || this.pointCollision(evt)
    if(!evt.terminated && isCollision) {
      evt.layer = this

      const sprites = this[_children].slice(0).reverse()

      const targetSprites = []

      if(!swallow && type !== 'mouseenter' && type !== 'mouseleave') {
        for(let i = 0; i < sprites.length; i++) {
          const sprite = sprites[i]
          const hit = sprite.dispatchEvent(type, evt, collisionState, swallow)
          if(hit) {
            // detect mouseenter/mouseleave
            targetSprites.push(sprite)
          }
          if(evt.terminated && !evt.type.startsWith('mouse')) {
            break
          }
        }
      }

      evt.targetSprites = targetSprites
    }

    // stopDispatch can only terminate event in the same level
    evt.terminated = false
    return super.dispatchEvent(type, evt, collisionState)
  }
  connect(parent, zOrder, zIndex) /* istanbul ignore next  */ {
    super.connect(parent, zOrder)
    this.zIndex = zIndex
    if(parent && parent.container) {
      parent.container.appendChild(this.outputContext.canvas)
    }
    return this
  }
  disconnect(parent) /* istanbul ignore next  */ {
    if(this.canvas && this.canvas.remove) {
      this.canvas.remove()
    }
    return super.disconnect(parent)
  }
  group(...sprites) {
    const group = new Group()
    group.append(...sprites)
    this.appendChild(group)
    return group
  }
  batch(...sprites) {
    sprites.forEach((sprite) => {
      if(sprite.layer !== this) {
        this.appendChild(sprite)
      }
    })
    const batch = new Batch(this)
    batch.add(...sprites)
    return batch
  }
  adjust(handler, update = true) /* istanbul ignore next  */ {
    const outputContext = this.outputContext,
      shadowContext = this.shadowContext
    if(!shadowContext) {
      throw new Error('No shadowContext.')
    }
    clearContext(outputContext)

    handler.call(this, outputContext)

    if(update) {
      outputContext.drawImage(shadowContext.canvas, 0, 0)
    }
  }
  clearUpdate() {
    /* istanbul ignore next  */
    this[_updateSet].clear()
  }
}

import groupApi from './helpers/group'

Object.assign(Layer.prototype, groupApi)

registerNodeType('layer', Layer, true)
