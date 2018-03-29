import BaseSprite from './basesprite'
import createGradients from './gradient'
import {Effects} from 'sprite-animator'
import {parseColorString, attr, deprecate} from 'sprite-utils'
import {pathToCanvas, getBounds} from 'svg-path-to-canvas'
import pathEffect from 'sprite-path-effect'
import {getSvgPath, platform, pointInPath} from './platform'

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
    const commands = pathToCanvas(val)
    this.set('pathCommands', commands)
    this.set('pathBounds', getBounds(val))
    this.subject.svg = getSvgPath(val)
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
}

class Path extends BaseSprite {
  static Attr = PathSpriteAttr

  constructor(attr) {
    if(typeof attr === 'string') {
      attr = {d: attr}
    }
    super(attr)
  }

  get contentSize() {
    let [width, height] = this.attr('size')

    const bounds = this.attr('pathBounds')
    const lineWidth = this.attr('lineWidth')
    const lw = Math.ceil(1.414 * lineWidth) // Math.sqrt(2) * lineWidth

    if(width === '') {
      width = bounds[2] + lw | 0
    }
    if(height === '') {
      height = bounds[3] + lw | 0
    }

    return [width, height]
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
    const context = this.context,
      path = this.path,
      d = this.attr('d')

    if(path && context && context.isPointInPath) {
      if(context.isPointInPath(path, offsetX, offsetY)) {
        return [path]
      }
    } else if(d) {
      if(pointInPath(d, offsetX, offsetY)) {
        return [{d}]
      }
    }
    return []
  }

  pointCollision(evt) {
    if(super.pointCollision(evt)) {
      const {offsetX, offsetY} = evt
      evt.targetPaths = this.findPath(offsetX, offsetY)
      return true
    }
    return false
  }

  render(t, drawingContext) {
    const context = super.render(t, drawingContext),
      attr = this.attr()

    if(attr.d) {
      let {strokeColor, fillColor} = attr

      let p = null
      if(platform.isBrowser) {
        // only browser can use Path2D to create d attr
        p = new Path2D(attr.d)
        this.path = p
      } else {
        context.save()
        context.beginPath()
        const {commands} = this.attr('pathCommands')
        commands.forEach(({cmd, args}) => {
          context[cmd](...args)
        })
        context.restore()
      }

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
        if(p) {
          context.stroke(p)
        } else {
          context.stroke()
        }
      }
      if(fillColor) {
        if(p) {
          context.fill(p)
        } else {
          context.fill()
        }
      }
    }

    return context
  }
}

export default Path
