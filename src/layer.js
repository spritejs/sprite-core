import BaseNode from './basenode'
import Batch from './batch'
import Group from './group'
import {Timeline} from 'sprite-animator'
import {requestAnimationFrame} from 'fast-animation-frame'
import {registerNodeType} from './nodetype'

import {clearContext} from './helpers/render'
import {isSpriteDirty, clearDirtyRects} from './helpers/dirty-check'

const _children = Symbol('children'),
  _updateSet = Symbol('updateSet'),
  _zOrder = Symbol('zOrder'),
  _tRecord = Symbol('tRecord'),
  _timeline = Symbol('timeline'),
  _renderDeferer = Symbol('renderDeferrer')

import {sortOrderedSprites} from 'sprite-utils'

export default class Layer extends BaseNode {
  constructor({
    context,
    handleEvent,
    evaluateFPS,
    renderMode,
  } = {}) {
    super()

    this.handleEvent = handleEvent !== false
    this.evaluateFPS = !!evaluateFPS

    // renderMode: repaintAll | repaintDirty
    this.renderMode = renderMode || 'repaintAll'

    this.outputContext = context

    if(context.canvas && context.canvas.cloneNode) {
      const shadowCanvas = context.canvas.cloneNode()
      this.shadowContext = shadowCanvas.getContext('2d')
    }

    this[_children] = []
    this[_updateSet] = new Set()
    this[_zOrder] = 0
    this[_tRecord] = [] // calculate FPS
    this[_timeline] = new Timeline()
    this[_renderDeferer] = null
  }

  get children() {
    return this[_children]
  }

  insertBefore(newchild, refchild) {
    const idx = this[_children].indexOf(refchild)
    if(idx >= 0) {
      this.removeChild(newchild)
      this[_children].splice(idx, 0, newchild)
      newchild.connect(this, refchild.zOrder)
      this.update(newchild)

      for(let i = idx + 1; i < this[_children].length; i++) {
        const child = this[_children][i],
          zOrder = child.zOrder + 1

        delete child.zOrder
        Object.defineProperty(this, 'zOrder', {
          value: zOrder,
          writable: false,
          configurable: true,
        })

        this.update(child)
      }

      this[_zOrder]++
    }

    return newchild
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
    if(t && this.evaluateFPS) {
      this[_tRecord].push(t)
      this[_tRecord] = this[_tRecord].slice(-10)
    }

    const updateSet = this[_updateSet]
    if(!updateSet.size) {
      return // nothing to draw
    }

    let renderer
    if(this.renderMode === 'repaintDirty') {
      renderer = this.renderRepaintDirty.bind(this)
    } else if(this.renderMode === 'repaintAll') {
      renderer = this.renderRepaintAll.bind(this)
    } else {
      throw new Error('unknown render mode!')
    }
    const currentTime = this.timeline.currentTime
    renderer(currentTime)

    super.dispatchEvent.call(
      this, 'update',
      {target: this, timeline: this.timeline, renderTime: currentTime}, true
    )
    if(this[_renderDeferer]) {
      this[_renderDeferer].resolve()
      this[_renderDeferer] = null
    }
  }
  update(target) {
    if(target && this[_updateSet].has(target)) return

    // invisible... return
    if(target && !target.lastRenderBox && !this.isVisible(target)) return

    if(target) this[_updateSet].add(target)

    this.prepareRender()
  }
  isVisible(sprite) {
    if(sprite.isVisible) {
      return sprite.isVisible()
    }

    const opacity = sprite.attr('opacity')
    if(opacity <= 0) {
      return false
    }

    const [width, height] = sprite.offsetSize
    if(width <= 0 || height <= 0) {
      return false
    }

    return true
  }
  get fps() {
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
        if(this.isVisible(child)) {
          child.draw(t)
        } else {
          // invisible, only need to remove lastRenderBox
          delete child.lastRenderBox
        }
      }
    }
  }
  renderRepaintAll(t) {
    const renderEls = this[_children].filter(e => this.isVisible(e))
    sortOrderedSprites(renderEls)

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
    if(!this.outputContext.canvas) {
      console.warn('Cannot use repaintDirty, fallback to repaintAll!')
      return this.renderRepaintAll(t)
    }
    const {width, height} = this.outputContext.canvas

    const updateSet = this[_updateSet]
    const children = this[_children].filter(e => this.isVisible(e))
    const restEls = children.filter(el => !updateSet.has(el))
    const affectedSet = new Set(),
      unaffectedSet = new Set()

    const updateEls = Array.from(updateSet)

    for(let i = 0; i < restEls.length; i++) {
      const unaffectedEl = restEls[i]
      if(isSpriteDirty(unaffectedEl, updateEls, true)) {
        affectedSet.add(unaffectedEl)
      } else {
        unaffectedSet.add(unaffectedEl)
      }
    }

    if(affectedSet.size > 0 && unaffectedSet.size > 0) {
      let changed
      do {
        changed = false
        const affectedEls = Array.from(affectedSet),
          unaffectedEls = Array.from(unaffectedSet)

        for(let i = 0; i < unaffectedEls.length; i++) {
          const unaffectedEl = unaffectedEls[i]
          if(isSpriteDirty(unaffectedEl, affectedEls)) {
            affectedSet.add(unaffectedEl)
            unaffectedSet.delete(unaffectedEl)
            changed = true
            break
          }
        }
      } while(changed)
    }

    const shadowContext = this.shadowContext
    const outputContext = this.outputContext

    if(shadowContext) {
      shadowContext.save()
      shadowContext.beginPath()
    } else {
      outputContext.save()
      outputContext.beginPath()
    }

    clearDirtyRects({shadowContext, outputContext}, updateEls, true)

    const affectedEls = Array.from(affectedSet)
    clearDirtyRects({shadowContext, outputContext}, affectedEls, false)

    if(shadowContext) {
      shadowContext.clip()
      shadowContext.clearRect(0, 0, width, height)
    } else {
      outputContext.clip()
      outputContext.clearRect(0, 0, width, height)
    }

    const renderEls = [...updateSet, ...affectedSet]
    sortOrderedSprites(renderEls)

    this.drawSprites(renderEls, t)
    if(shadowContext) {
      outputContext.clearRect(0, 0, width, height)
      outputContext.drawImage(shadowContext.canvas, 0, 0)
      shadowContext.restore()
    }

    outputContext.restore()
    this[_updateSet].clear()
  }
  appendChild(sprite, update = true) {
    this.removeChild(sprite)
    this[_children].push(sprite)
    sprite.connect(this, this[_zOrder]++)
    if(update) this.update(sprite)
    return sprite
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
    if(this.isVisible(sprite) || sprite.lastRenderBox) {
      sprite.forceUpdate()
    }
    sprite.disconnect(this)
    return sprite
  }
  remove(...args) {
    if(args.length === 0) {
      args = this[_children].slice(0)
    }
    return args.map(child => this.removeChild(child))
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
    return true
  }
  dispatchEvent(type, evt, collisionState = false, swallow = false) {
    collisionState = collisionState || this.pointCollision(evt)
    if(!evt.terminated && collisionState) {
      evt.layer = this

      const sprites = this[_children].slice(0)
      sortOrderedSprites(sprites, true)

      const targetSprites = []

      if(!swallow && type !== 'mouseenter' && type !== 'mouseleave') {
        for(let i = 0; i < sprites.length; i++) {
          const sprite = sprites[i]
          const hit = sprite.dispatchEvent(type, evt, collisionState, false)
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
      super.dispatchEvent(type, evt, collisionState)
    }
  }
  connect(parent, zOrder, zIndex) {
    super.connect(parent, zOrder)
    this.zIndex = zIndex
    if(parent && parent.container) {
      parent.container.appendChild(this.outputContext.canvas)
    }
    return this
  }
  disconnect(parent) {
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
  adjust(handler, update = true) {
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
    this[_updateSet].clear()
  }
}

registerNodeType('layer', Layer, true)
