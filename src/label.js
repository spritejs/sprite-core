import BaseSprite from './basesprite'
import {parseColorString, attr, deprecate} from 'sprite-utils'
import createGradients from './gradient'
import {registerNodeType} from './nodetype'

const parseFont = require('./font/parse-font')

const measureText = (node, text, font, lineHeight = '') => {
  const ctx = node.context
  if(!ctx) {
    return [0, 0]
  }
  ctx.save()
  ctx.font = font
  const {width} = ctx.measureText(text)
  const height = parseFont(font).size * 1.2
  ctx.restore()
  return [width, Math.max(height, lineHeight)]
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
      textboxSize: '',
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
    val = String(val)
    this.clearCache()
    this.set('textboxSize', '')
    this.set('text', val)
  }

  @attr
  set textboxSize(val) {
    this.set('textboxSize', val)
  }

  @attr
  set font(val) {
    this.clearCache()
    this.set('textboxSize', '')
    this.set('font', val)
  }

  @attr
  set lineHeight(val) {
    this.clearCache()
    this.set('textboxSize', '')
    this.set('lineHeight', val)
  }

  @attr
  set textAlign(val) {
    this.clearCache()
    this.set('textAlign', val)
  }

  @attr
  @deprecate('Instead use fillColor.')
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

  constructor(text, attr) {
    super(attr)
    this.text = String(text)
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

    const boxSize = this.attr('textboxSize')

    if(boxSize) {
      return boxSize
    }
    if(width === '' || height === '') {
      const size = calculTextboxSize(this, this.text, this.attr('font'), this.attr('lineHeight'))
      this.attr('textboxSize', size)
      return size || [0, 0]
    }

    return [width, height]
  }

  render(t, drawingContext) {
    const context = super.render(t, drawingContext),
      attr = this.attr(),
      text = this.text,
      font = attr.font

    if(text) {
      context.font = attr.font
      const lines = this.text.split(/\n/)
      let {strokeColor, fillColor} = attr

      context.textBaseline = 'top'

      const align = attr.textAlign,
        [width, height] = this.contentSize

      context.textBaseline = 'middle'

      const [borderWidth] = this.attr('border')

      const gradients = attr.gradients

      if(gradients && gradients.strokeColor) {
        const rect = gradients.strokeColor.rect || [borderWidth, borderWidth,
          width, height]

        strokeColor = createGradients(context, rect, gradients.strokeColor)
      }
      if(strokeColor) {
        context.strokeStyle = strokeColor
      }

      if(gradients && gradients.fillColor) {
        const rect = gradients.fillColor.rect || [borderWidth, borderWidth,
          width, height]

        fillColor = createGradients(context, rect, gradients.fillColor)
      }
      if(fillColor) {
        context.fillStyle = fillColor
      }

      if(!strokeColor && !fillColor) {
        fillColor = parseColorString('black')
      }

      let top = borderWidth

      lines.forEach((line) => {
        let left = borderWidth
        const [w, h] = measureText(this, line, font, attr.lineHeight)

        if(align === 'center') {
          left += (width - w) / 2
        } else if(align === 'right') {
          left += width - w
        }

        if(fillColor) {
          context.fillText(line, left, top + h / 2)
        }
        if(strokeColor) {
          context.strokeText(line, left, top + h / 2)
        }

        top += h
      })
    }

    return context
  }
}

registerNodeType('label', Label)
