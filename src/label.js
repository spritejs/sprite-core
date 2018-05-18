import BaseSprite from './basesprite'
import {parseColorString, attr} from 'sprite-utils'
import {registerNodeType} from './nodetype'

import {findColor} from './helpers/render'

const parseFont = require('./helpers/parse-font')
const _boxSize = Symbol('boxSize')

const measureText = (node, text, font, lineHeight = '') => {
  const ctx = node.context
  if(!ctx) {
    return [0, 0]
  }
  ctx.save()
  ctx.font = font
  const {width} = ctx.measureText(text)
  ctx.restore()

  const height = lineHeight || parseFont(font).size * 1.2
  return [width, height].map(Math.round)
}

function calculTextboxSize(node, text, font, lineHeight) {
  const lines = text.split(/\n/)
  let width = 0,
    height = 0

  lines.forEach((line) => {
    const [w, h] = measureText(node, line, font, lineHeight)
    width = Math.max(width, w)
    height += h
  })
  if(width === 0 && height === 0) {
    return ''
  }
  return [width, height]
}

class LabelSpriteAttr extends BaseSprite.Attr {
  constructor(subject) {
    super(subject)
    this.setDefault({
      font: '16px Arial',
      textAlign: 'left',
      strokeColor: '',
      fillColor: '',
      lineHeight: '',
      text: '',
    }, {
      color: {
        get() {
          return this.fillColor
        },
      },
    })
  }

  @attr
  set text(val) {
    this.clearCache()
    val = String(val)
    delete this.subject[_boxSize]
    this.set('text', val)
  }

  @attr
  set font(val) {
    this.clearCache()
    delete this.subject[_boxSize]
    this.set('font', val)
  }

  @attr
  set lineHeight(val) {
    this.clearCache()
    delete this.subject[_boxSize]
    this.set('lineHeight', val)
  }

  @attr
  set textAlign(val) {
    this.clearCache()
    this.set('textAlign', val)
  }

  @attr
  set color(val) {
    this.fillColor = val
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
}

export default class Label extends BaseSprite {
  static Attr = LabelSpriteAttr

  constructor(attr) {
    if(typeof attr === 'string') {
      attr = {text: attr}
    }
    super(attr)
  }

  set text(val) {
    this.attr('text', val)
  }
  get text() {
    return this.attr('text')
  }

  // override to adapt content size
  get contentSize() {
    const [width, height] = this.attr('size')

    if(this[_boxSize]) {
      return this[_boxSize]
    }
    if(width === '' || height === '') {
      const size = calculTextboxSize(this, this.text, this.attr('font'), this.attr('lineHeight'))
      this[_boxSize] = size
      return size || [0, 0]
    }

    return [width, height]
  }

  render(t, drawingContext) {
    super.render(t, drawingContext)

    const attr = this.attr(),
      text = this.text,
      font = attr.font

    if(text) {
      drawingContext.font = attr.font
      const lines = this.text.split(/\n/)

      drawingContext.textBaseline = 'top'

      const align = attr.textAlign

      drawingContext.textBaseline = 'middle'

      const strokeColor = findColor(drawingContext, this, 'strokeColor')
      if(strokeColor) {
        drawingContext.strokeStyle = strokeColor
      }

      let fillColor = findColor(drawingContext, this, 'fillColor')

      if(!strokeColor && !fillColor) {
        fillColor = parseColorString('black')
      }
      if(fillColor) {
        drawingContext.fillStyle = fillColor
      }

      let top = 0,
        left = 0
      const width = this.contentSize[0]

      lines.forEach((line) => {
        const [w, h] = measureText(this, line, font, attr.lineHeight)

        if(align === 'center') {
          left += (width - w) / 2
        } else if(align === 'right') {
          left += width - w
        }

        if(fillColor) {
          drawingContext.fillText(line, left, top + h / 2)
        }
        if(strokeColor) {
          drawingContext.strokeText(line, left, top + h / 2)
        }

        top += h
      })
    }
  }
}

registerNodeType('label', Label)
