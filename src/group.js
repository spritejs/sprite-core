import BaseSprite from './basesprite'
import {registerNodeType} from './nodetype'
import {attr} from 'sprite-utils'
import {pathToCanvas, getBounds} from 'svg-path-to-canvas'
import {getSvgPath, pointInPath, platform} from './platform'

const _children = Symbol('children'),
  _zOrder = Symbol('zOrder')

function sortChildren(children) {
  children.sort((a, b) => {
    const a_zidx = a.attr('zIndex'),
      b_zidx = b.attr('zIndex')
    if(a_zidx === b_zidx) {
      return a.zOrder - b.zOrder
    }
    return a_zidx - b_zidx
  })
}

class GroupAttr extends BaseSprite.Attr {
  constructor(subject) {
    super(subject)
    this.setDefault({
      clip: null,
      clipScale: 1.0,
    })
  }

  @attr
  set clip(val) {
    this.clearCache()
    this.set('clip', val)
    let commands
    if(val) {
      commands = pathToCanvas(val)
      this.set('pathCommands', commands)
      this.set('pathBounds', getBounds(val))
      this.subject.svg = getSvgPath(val)
    } else {
      this.set('pathCommands', null)
      this.set('pathBounds', null)
      this.subject.svg = null
    }
  }

  @attr
  set clipScale(val) {
    this.clearCache()
    this.set('clipScale', val)
  }
}

export default class Group extends BaseSprite {
  static Attr = GroupAttr

  constructor(attr) {
    super(attr)
    this[_children] = []
    this[_zOrder] = 0
  }
  appendChild(sprite, sort = true) {
    this[_children].push(sprite)
    sprite.connect(this, this[_zOrder]++)
    if(sort) sortChildren(this[_children])
  }
  append(...sprites) {
    sprites.forEach(sprite => this.appendChild(sprite, false))
    sortChildren(this[_children])
  }
  removeChild(sprite) {
    const idx = this[_children].indexOf(sprite)
    if(idx === -1) {
      return null
    }
    this[_children].splice(idx, 1)
    sprite.disconnect(this)
    return sprite
  }
  remove(...sprites) {
    if(sprites.length === 0) {
      sprites = this[_children].slice(0)
    }
    sprites.forEach(sprite => this.removeChild(sprite))
  }
  get children() {
    return this[_children]
  }
  // TODO: utils.findPath(d, x, y) ??
  findPath(offsetX, offsetY) {
    const context = this.context,
      path = this.clipPath,
      d = this.attr('d')

    if(platform.isBrowser && path) {
      if(context.isPointInPath(path, offsetX, offsetY)) {
        return [path]
      }
    } else if(!platform.isBrowser && d) {
      if(pointInPath(d, offsetX, offsetY)) {
        return [{d}]
      }
    }
    return []
  }
  pointCollision(evt) {
    if(super.pointCollision(evt)) {
      if(this.attr('clip')) {
        const {offsetX, offsetY} = evt
        const rect = this.originRect
        const scale = this.attr('clipScale')
        const paths = this.findPath((offsetX - rect[0]) / scale, (offsetY - rect[1]) / scale)
        evt.isInClip = !!paths.length
      }
      return true
    }
    return false
  }
  get contentSize() {
    let [width, height] = this.attr('size')

    if(width === '' || height === '') {
      if(this.attr('clip')) {
        const bounds = this.attr('pathBounds'),
          clipScale = this.attr('clipScale')
        width = bounds[2] * clipScale
        height = bounds[3] * clipScale
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
        width = right
        height = bottom
      }
    }
    return [width, height]
  }
  dispatchEvent(type, evt, forceTrigger = false) {
    if(!evt.terminated && (forceTrigger || this.pointCollision(evt))) {
      const parentX = evt.offsetX - this.originRect[0]
      const parentY = evt.offsetY - this.originRect[1]
      // console.log(evt.parentX, evt.parentY)

      const _evt = Object.assign({}, evt)
      _evt.parentX = parentX
      _evt.parentY = parentY

      const targetSprites = []

      for(let i = 0; i < this[_children].length && evt.isInClip !== false; i++) {
        const sprite = this[_children][i]
        const hit = sprite.dispatchEvent(type, _evt, forceTrigger)
        if(hit) {
          targetSprites.push(sprite)
        }
        if(evt.terminated && !evt.type.startsWith('mouse')) {
          break
        }
      }

      evt.targetSprites = targetSprites
      super.dispatchEvent(type, evt, forceTrigger)
    }
  }
  render(t, drawingContext) {
    const context = super.render(t, drawingContext)

    const clipPath = this.attr('clip')
    if(clipPath) {
      context.save()
      context.beginPath()
      const {commands} = this.attr('pathCommands')
      commands.forEach(({cmd, args}) => {
        context[cmd](...args.map(i => i * this.attr('clipScale')))
      })
      context.restore()
      context.clip()
      context.clearRect(0, 0, this.originRect[2], this.originRect[3])
      if(platform.isBrowser) {
        this.clipPath = new Path2D(clipPath)
      }
    }

    const children = this[_children]

    /* eslint-disable no-await-in-loop */
    for(let i = 0; i < children.length; i++) {
      const child = children[i]
      child.draw(t)
    }
    /* eslint-enable no-await-in-loop */

    return context
  }
}

registerNodeType('group', Group, true)
