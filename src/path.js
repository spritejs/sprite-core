import BaseSprite from './basesprite'
import createGradients from './gradient'
import {Effects} from 'sprite-animator'
import {parseColorString, attr, deprecate} from 'sprite-utils'
import pathEffect from 'sprite-path-effect'
import {registerNodeType} from './nodetype'
import SvgPath from 'svg-path-to-canvas'

Effects.d = pathEffect

class PathSpriteAttr extends BaseSprite.Attr {
  constructor(subject) {
    super(subject)
    this.setDefault({
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter',
      strokeColor: '',
      fillColor: '',
      // d: path2d,
      boxSize: [0, 0],
      pathRect: [0, 0, 0, 0],
      pathBounds: [0, 0, 0, 0],
      trim: false,
    }, {
      color: {
        get() {
          return this.strokeColor
        },
      },
    })
  }
  @attr
  set d(val) {
    this.clearCache()
    this.set('d', val)
    if(val) {
      this.subject.svg = new SvgPath(val)
    } else {
      this.subject.svg = null
    }
  }

  @attr
  set lineWidth(val) {
    this.clearCache()
    this.set('lineWidth', Math.round(val))
  }

  /**
    lineCap: butt|round|square
   */
  @attr
  set lineCap(val) {
    this.clearCache()
    this.set('lineCap', val)
  }

  /**
    lineJoin: miter|round|bevel
   */
  @attr
  set lineJoin(val) {
    this.clearCache()
    this.set('lineJoin', val)
  }

  @attr
  set strokeColor(val) {
    this.clearCache()
    this.set('strokeColor', parseColorString(val))
  }

  @attr
  set fillColor(val) {
    this.clearCache()
    this.set('fillColor', parseColorString(val))
  }

  @attr
  @deprecate('Instead use strokeColor.')
  set color(val) {
    this.strokeColor = val
  }

  @attr
  set trim(val) {
    this.set('trim', val)
  }
}

export default class Path extends BaseSprite {
  static Attr = PathSpriteAttr

  constructor(attr) {
    if(typeof attr === 'string') {
      attr = {d: attr}
    }
    super(attr)
  }

  get contentSize() {
    if(!this.svg) return super.contentSize

    const bounds = this.svg.bounds
    let [width, height] = this.attr('size')

    const lineWidth = this.attr('lineWidth')

    const [borderWidth] = this.attr('border')
    const padding = this.attr('padding')
    const padLeft = borderWidth + padding[3],
      padTop = borderWidth + padding[0]

    if(width === '') {
      width = bounds[2] + 1.414 * lineWidth | 0
    }
    if(height === '') {
      height = bounds[3] + 1.414 * lineWidth | 0
    }
    if(this.attr('trim')) {
      const [x, y] = this.pathOffset
      width += x - padLeft
      height += y - padTop
    }

    return [width, height]
  }

  getPointAtLength(length) {
    if(this.svg) {
      const {x, y} = this.svg.getPointAtLength(length)
      return [x, y]
    }
    return [0, 0]
  }

  getPathLength() {
    if(this.svg) {
      return this.svg.getTotalLength()
    }
    return 0
  }

  findPath(offsetX, offsetY) {
    if(this.attr('trim')) {
      const [x, y] = this.pathOffset
      offsetX -= x
      offsetY -= y
    }

    if(this.svg.isPointInPath(offsetX, offsetY)) {
      return [this.svg]
    }
    return []
  }

  get pathOffset() {
    const trim = this.attr('trim'),
      bounds = this.svg.bounds

    const lineWidth = this.attr('lineWidth')

    const [borderWidth] = this.attr('border')
    const padding = this.attr('padding')
    const padLeft = borderWidth + padding[3],
      padTop = borderWidth + padding[0]

    if(trim) {
      return [-bounds[0] + padLeft + lineWidth * 1.414,
        -bounds[1] + padTop + lineWidth * 1.414]
    }
    return [padLeft, padTop]
  }

  pointCollision(evt) {
    if(super.pointCollision(evt)) {
      const {offsetX, offsetY} = evt
      const rect = this.originRect
      evt.targetPaths = this.findPath(offsetX - rect[0], offsetY - rect[1])
      return true
    }
    return false
  }

  render(t, drawingContext) {
    const context = super.render(t, drawingContext),
      attr = this.attr()

    if(attr.d) {
      let {strokeColor, fillColor} = attr

      context.translate(...this.pathOffset)
      this.svg.render(context)

      context.lineWidth = attr.lineWidth
      context.lineCap = attr.lineCap
      context.lineJoin = attr.lineJoin

      const [width, height] = this.contentSize,
        [borderWidth] = attr.border
      const gradients = attr.gradients
      if(gradients && gradients.fillColor) {
        const rect = gradients.fillColor.rect || [borderWidth, borderWidth,
          width, height]

        fillColor = createGradients(context, rect, gradients.fillColor)
      }
      if(fillColor) {
        context.fillStyle = fillColor
      }

      if(gradients && gradients.strokeColor) {
        const rect = gradients.strokeColor.rect || [borderWidth, borderWidth,
          width, height]

        strokeColor = createGradients(context, rect, gradients.strokeColor)
      }
      if(strokeColor) {
        context.strokeStyle = strokeColor
      }

      if(!strokeColor && !fillColor) {
        strokeColor = parseColorString('black')
      }

      if(strokeColor) {
        context.stroke()
      }
      if(fillColor) {
        context.fill()
      }
    }

    return context
  }
}

registerNodeType('path', Path)
