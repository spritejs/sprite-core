import BaseNode from './basenode'
import {boxIntersect, boxEqual, boxToRect, deprecate} from 'sprite-utils'
import {Timeline} from 'sprite-animator'

const _children = Symbol('children'),
  _updateSet = Symbol('updateSet'),
  _zOrder = Symbol('zOrder'),
  _tRecord = Symbol('tRecord'),
  _timeline = Symbol('timeline'),
  _render = Symbol('render')

const readyState = Promise.resolve()

class Layer extends BaseNode {
  constructor({
    canvas,
    handleEvent,
    evaluateFPS,
    renderMode,
    resolution,
  } = {}) {
    super()

    this.handleEvent = handleEvent !== false
    this.evaluateFPS = !!evaluateFPS

    // renderMode: repaintAll | repaintDirty
    this.renderMode = renderMode || 'repaintAll'
    this.outputContext = canvas.getContext('2d')

    if(canvas.cloneNode) {
      const shadowCanvas = canvas.cloneNode(true)
      this.shadowContext = shadowCanvas.getContext('2d')
    }

    this[_children] = []
    this[_updateSet] = new Set()
    this[_zOrder] = 0
    this[_tRecord] = [] // calculate FPS
    this[_timeline] = new Timeline()

    this.afterRender = readyState
  }

  get timeline() {
    return this[_timeline]
  }

  get canvas() {
    return this.outputContext.canvas
  }
  get context() {
    return this.shadowContext ? this.shadowContext : this.outputContext
  }

  get id() {
    return this.canvas.dataset.layerId
  }

  @deprecate('Instead use await layer.afterRender')
  prepareRender() {
    return this.afterRender
  }

  [_render]() {
    if(this.afterRender === readyState) {
      const that = this,
        _dispatchEvent = super.dispatchEvent

      this.afterRender = new Promise((resolve, reject) => {
        requestAnimationFrame(function step(t) {
          let renderer
          if(that.renderMode === 'repaintDirty') {
            renderer = that.renderRepaintDirty.bind(that)
          } else if(that.renderMode === 'repaintAll') {
            renderer = that.renderRepaintAll.bind(that)
          } else {
            throw new Error('unknown render mode!')
          }

          if(that[_updateSet].size) {
            renderer(t)

            _dispatchEvent.call(
              that, 'update',
              {target: that, timeline: that.timeline, currentTime: that.timeline.currentTime}, true
            )
          }

          if(that[_updateSet].size) {
            requestAnimationFrame(step)
          } else {
            that.afterRender = readyState
            resolve()
          }
        })
      })
      // .catch(ex => console.error(ex.message))
    }

    return this.afterRender
  }

  update(target) {
    if(target && this[_updateSet].has(target)) return
    // invisible... return
    if(target && !target.lastRenderBox && !this.isVisible(target)) return
    if(target) this[_updateSet].add(target)

    return this[_render]()
  }

  isVisible(sprite) {
    const opacity = sprite.attr('opacity')
    if(opacity <= 0) {
      return false
    }

    const [width, height] = sprite.offsetSize
    if(width <= 0 || height <= 0) {
      return false
    }

    const {width: maxWidth, height: maxHeigth} = this.canvas

    const box = sprite.renderBox
    if(box[0] > maxWidth || box[1] > maxHeigth
      || box[2] < 0 || box[3] < 0) {
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
    if(this.evaluateFPS) {
      this[_tRecord].push(t)
      this[_tRecord] = this[_tRecord].slice(-10)
    }

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
    const {width, height} = this.canvas

    this.sortChildren(renderEls)

    const outputContext = this.outputContext
    outputContext.clearRect(0, 0, width, height)

    const shadowContext = this.shadowContext

    if(shadowContext) {
      shadowContext.clearRect(0, 0, width, height)
      this.drawSprites(renderEls, t)
      outputContext.drawImage(shadowContext.canvas, 0, 0)
    } else {
      this.drawSprites(renderEls, t)
    }

    this[_updateSet].clear()
  }
  renderRepaintDirty(t) {
    const [width, height] = this.resolution

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
    const {layerX, layerY} = evt
    const [width, height] = this.resolution

    if(layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
      return [layerX, layerY]
    }
  }
  dispatchEvent(type, evt, forceTrigger = false) {
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
      const hit = sprite.dispatchEvent(type, evt, forceTrigger)
      if(hit) {
        // detect mouseenter/mouseleave
        targetSprites.push(sprite)
      }
    }

    evt.targetSprites = targetSprites
    super.dispatchEvent(type, evt, forceTrigger)
  }
  connect(parent, zOrder, zIndex) {
    super.connect(parent, zOrder)
    this.zIndex = zIndex
    this.updateResolution()
    return this
  }
  disconnect(parent) {
    this.outputContext.canvas.remove()
    return super.disconnect(parent)
  }
}

export default Layer
