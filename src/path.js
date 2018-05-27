import BaseSprite from './basesprite'
import {findColor} from './helpers/render'
import {Effects} from 'sprite-animator'
import {parseColorString, attr, deprecate} from 'sprite-utils'
import {pathEffect, createSvgPath} from './helpers/path'
import {registerNodeType} from './nodetype'

Effects.d = pathEffect

Effects.path = function (path1, path2, p, start, end) {
  path1 = createSvgPath(path1)
  path2 = createSvgPath(path2)
  return pathEffect(path1.d, path2.d, p, start, end)
}

class PathSpriteAttr extends BaseSprite.Attr {
  constructor(subject) {
    super(subject)
    this.setDefault({
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter',
      strokeColor: '',
      fillColor: '',
    }, {
      color: {
        get() {
          return this.strokeColor
        },
      },
      d: {
        get() {
          return this.path ? JSON.parse(this.path).d : null
        },
      },
    })
  }
  @attr
  set path(val) {
    this.clearCache()
    if(val) {
      val = typeof val === 'string' ? {d: val} : val
      this.subject.svg = createSvgPath(val)
      this.set('path', val)
    } else {
      this.subject.svg = null
      this.set('path', null)
    }
  }

  @attr
  set d(val) {
    if(val) {
      const path = this.get('path')
      if(!path) {
        this.path = {d: val}
      } else {
        this.path = Object.assign(path, {d: val})
      }
    } else {
      this.path = null
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

  @deprecate('Instead use strokeColor.')
  @attr
  set color(val) {
    this.strokeColor = val
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

  set path(val) {
    this.attr('path', val)
  }
  get path() {
    return this.attr('path')
  }

  getPointAtLength(length) {
    if(this.svg) {
      return this.svg.getPointAtLength(length)
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
    const rect = this.originalRect
    const pathOffset = this.pathOffset
    if(this.svg && this.svg.isPointInPath(offsetX - rect[0] - pathOffset[0], offsetY - rect[1] - pathOffset[1])) {
      return [this.svg]
    }
    return []
  }

  get lineWidth() {
    const lineWidth = this.attr('lineWidth'),
      gradients = this.attr('gradients'),
      fillColor = this.attr('fillColor'),
      strokeColor = this.attr('strokeColor')

    const hasStrokeColor = strokeColor || gradients && gradients.strokeColor,
      hasFillColor = fillColor || gradients && gradients.fillColor

    if(!hasStrokeColor && hasFillColor) {
      // fill: ignore stroke
      return 0
    }
    return lineWidth
  }

  get pathOffset() {
    const lineWidth = this.lineWidth
    return [lineWidth * 1.414, lineWidth * 1.414]
  }

  get pathSize() {
    return this.svg ? this.svg.size : [0, 0]
  }

  get contentSize() {
    if(!this.svg) return super.contentSize

    const bounds = this.svg.bounds
    let [width, height] = this.attr('size')

    const lineWidth = this.lineWidth

    if(width === '') {
      width = bounds[2] - Math.min(0, bounds[0]) + 2 * 1.414 * lineWidth | 0
    }
    if(height === '') {
      height = bounds[3] - Math.min(0, bounds[1]) + 2 * 1.414 * lineWidth | 0
    }

    return [width, height]
  }

  get originalRect() {
    const rect = super.originalRect,
      svg = this.svg
    if(svg) {
      const bounds = svg.bounds
      rect[0] += Math.min(0, bounds[0])
      rect[1] += Math.min(0, bounds[1])
    }
    return rect
  }

  pointCollision(evt) {
    if(super.pointCollision(evt)) {
      let {offsetX, offsetY} = evt
      const svg = this.svg
      if(svg) {
        const bounds = svg.bounds
        offsetX += Math.min(0, bounds[0])
        offsetY += Math.min(0, bounds[1])
      }
      evt.targetPaths = this.findPath(offsetX, offsetY)
      return true
    }
    return false
  }

  render(t, drawingContext) {
    super.render(t, drawingContext)
    const d = this.attr('d'),
      lineWidth = this.attr('lineWidth'),
      lineCap = this.attr('lineCap'),
      lineJoin = this.attr('lineJoin')

    if(d) {
      const svg = this.svg
      const [ox, oy] = svg.bounds
      if(ox < 0 || oy < 0) {
        drawingContext.translate(-Math.min(0, ox), -Math.min(0, oy))
      }
      drawingContext.translate(...this.pathOffset)
      svg.beginPath().to(drawingContext)

      drawingContext.lineWidth = lineWidth
      drawingContext.lineCap = lineCap
      drawingContext.lineJoin = lineJoin

      const fillColor = findColor(drawingContext, this, 'fillColor')
      if(fillColor) {
        drawingContext.fillStyle = fillColor
      }

      let strokeColor = findColor(drawingContext, this, 'strokeColor')

      if(!strokeColor && !fillColor) {
        strokeColor = parseColorString('black')
      }
      if(strokeColor) {
        drawingContext.strokeStyle = strokeColor
      }

      if(fillColor) {
        drawingContext.fill()
      }
      if(strokeColor) {
        drawingContext.stroke()
      }
    }
  }
}

registerNodeType('path', Path)
