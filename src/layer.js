import BaseNode from './basenode'
import Group from './group'

import {boxIntersect, boxEqual, boxToRect} from 'sprite-utils'
import {Timeline} from 'sprite-animator'
import {requestAnimationFrame} from 'fast-animation-frame'
import {registerNodeType} from './nodetype'

import {clearContext} from './helpers/render'

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
  sortChildren(children) {
    children.sort((a, b) => {
      const a_zidx = a.attr('zIndex'),
        b_zidx = b.attr('zIndex')
      if(a_zidx === b_zidx) {
        return a.zOrder - b.zOrder
      }
      return a_zidx - b_zidx
    })
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
    this.sortChildren(renderEls)

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
      let affected = false

      for(let j = 0; j < updateEls.length; j++) {
        const affectedEl = updateEls[j]
        const box1 = affectedEl.renderBox,
          box2 = unaffectedEl.renderBox,
          box3 = affectedEl.lastRenderBox

        if(boxIntersect(box1, box2) || box3 && boxIntersect(box3, box2)) {
          affected = true
          break
        }
      }
      if(affected) affectedSet.add(unaffectedEl)
      else unaffectedSet.add(unaffectedEl)
    }

    if(affectedSet.size > 0 && unaffectedSet.size > 0) {
      let changed
      do {
        changed = false
        const affectedEls = Array.from(affectedSet),
          unaffectedEls = Array.from(unaffectedSet)

        for(let i = 0; i < affectedEls.length; i++) {
          const affectedEl = affectedEls[i]
          for(let j = 0; j < unaffectedEls.length; j++) {
            const unaffectedEl = unaffectedEls[j]
            const box1 = affectedEl.renderBox,
              box2 = unaffectedEl.renderBox

            if(boxIntersect(box1, box2)) {
              affectedSet.add(unaffectedEl)
              unaffectedSet.delete(unaffectedEl)
              changed = true
              break
            }
          }
          if(changed) break
        }
      } while(changed)
    }

    const shadowContext = this.shadowContext
    const outputContext = this.outputContext

    if(shadowContext) {
      shadowContext.save()
      shadowContext.beginPath()
    }
    outputContext.save()
    outputContext.beginPath()

    for(let i = 0; i < updateEls.length; i++) {
      const updateEl = updateEls[i]
      const box = updateEl.renderBox

      let dirtyBox = boxIntersect(box, [0, 0, width, height])

      if(dirtyBox) {
        const dirtyRect = boxToRect(dirtyBox)

        if(shadowContext) shadowContext.rect(...dirtyRect)
        outputContext.rect(...dirtyRect)
      }

      const lastRenderBox = updateEl.lastRenderBox
      if(lastRenderBox && !boxEqual(lastRenderBox, box)) {
        dirtyBox = boxIntersect(lastRenderBox, [0, 0, width, height])

        if(dirtyBox) {
          const dirtyRect = boxToRect(dirtyBox)

          if(shadowContext) shadowContext.rect(...dirtyRect)
          outputContext.rect(...dirtyRect)
        }
      }
    }

    const affectedEls = Array.from(affectedSet)
    for(let i = 0; i < affectedEls.length; i++) {
      const affectedEl = affectedEls[i]
      const box = affectedEl.renderBox
      const dirtyBox = boxIntersect(box, [0, 0, width, height])

      if(dirtyBox) {
        const dirtyRect = boxToRect(dirtyBox)

        if(shadowContext) shadowContext.rect(...dirtyRect)
        outputContext.rect(...dirtyRect)
      }
    }

    if(shadowContext) {
      shadowContext.clip()
      shadowContext.clearRect(0, 0, width, height)
    }

    outputContext.clip()
    outputContext.clearRect(0, 0, width, height)

    const renderEls = [...updateSet, ...affectedSet]
    this.sortChildren(renderEls)

    if(shadowContext) {
      this.drawSprites(renderEls, t)
      outputContext.drawImage(shadowContext.canvas, 0, 0)
      shadowContext.restore()
    } else {
      this.drawSprites(renderEls, t)
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
  dispatchEvent(type, evt) {
    evt.layer = this
    const sprites = this[_children].slice(0)
    sprites.sort((a, b) => {
      const a_zidx = a.attr('zIndex'),
        b_zidx = b.attr('zIndex')

      if(a_zidx === b_zidx) {
        return b.zOrder - a.zOrder
      }
      return b_zidx - a_zidx
    })

    const targetSprites = []
    for(let i = 0; i < sprites.length; i++) {
      const sprite = sprites[i]
      const hit = sprite.dispatchEvent(type, evt)
      if(hit) {
        // detect mouseenter/mouseleave
        targetSprites.push(sprite)
      }
      if(evt.terminated && !evt.type.startsWith('mouse')) {
        break
      }
    }

    evt.targetSprites = targetSprites
    super.dispatchEvent(type, evt)
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
