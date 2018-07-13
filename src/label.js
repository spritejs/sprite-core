import BaseSprite from './basesprite'
import {parseValue, parseColorString, attr} from 'sprite-utils'
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

  const {size} = parseFont(font)
  const height = lineHeight || size * 1.2

  return [width, height].map(Math.round)
}

function calculTextboxSize(node) {
  if(!node.context) return ''
  const text = node.text,
    font = node.attr('font'),
    lineHeight = node.attr('lineHeight')

  const lines = text.split(/\n/)
  let width = 0,
    height = 0

  lines.forEach((line) => {
    const [w, h] = measureText(node, line, font, lineHeight)
    width = Math.max(width, w)
    height += h
  })
  node[_boxSize] = [width, height]
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
      flexible: false,
    }, {
      color() {
        return this.fillColor
      },
    })
  }

  @attr
  set text(val) {
    this.clearCache()
    val = String(val)
    delete this.subject[_boxSize]
    this.set('text', val)
    calculTextboxSize(this.subject)
  }

  @attr
  set font(val) {
    this.clearCache()
    delete this.subject[_boxSize]
    this.set('font', val)
    calculTextboxSize(this.subject)
  }

  @parseValue(parseFloat)
  @attr
  set lineHeight(val) {
    this.clearCache()
    delete this.subject[_boxSize]
    this.set('lineHeight', val)
    calculTextboxSize(this.subject)
  }

  @attr
  set textAlign(val) {
    this.clearCache()
    this.set('textAlign', val)
    calculTextboxSize(this.subject)
  }

  @attr
  set color(val) {
    this.fillColor = val
  }

  @parseValue(parseColorString)
  @attr
  set strokeColor(val) {
    this.clearCache()
    this.set('strokeColor', val)
  }

  @parseValue(parseColorString)
  @attr
  set fillColor(val) {
    this.clearCache()
    this.set('fillColor', val)
  }

  @attr
  set flexible(val) {
    this.clearCache()
    this.set('flexible', val)
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

  get textboxSize() {
    if(!this[_boxSize]) calculTextboxSize(this)
    return this[_boxSize]
  }

  get flexibleFont() {
    const font = this.attr('font')
    if(this.attr('width') === '' && this.attr('layoutWidth') === '') return font
    const textboxSize = this.textboxSize,
      contentSize = this.contentSize
    let {style, variant, weight, size, family} = parseFont(font)
    size *= contentSize[0] / textboxSize[0]
    return `${style} ${variant} ${weight} ${Math.floor(size)}px "${family}"`
  }

  // override to adapt content size
  get contentSize() {
    let [width, height] = this.attrSize

    if(width === '' || height === '') {
      const textboxSize = this.textboxSize
      if(!textboxSize) return [0, 0]
      width = width || textboxSize[0]
      height = height || textboxSize[1]
    }

    if(this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
      height = Math.ceil(height * width / this.textboxSize[0])
    }

    return [width, height]
  }

  render(t, drawingContext) {
    super.render(t, drawingContext)

    const textAlign = this.attr('textAlign'),
      flexible = this.attr('flexible'),
      font = flexible ? this.flexibleFont : this.attr('font'),
      lineHeight = this.attr('lineHeight'),
      text = this.text

    if(text) {
      const [w, h] = this.contentSize
      if(this.textboxSize[0] > w
        || this.textboxSize[1] > h) {
        drawingContext.beginPath()
        drawingContext.rect(0, 0, w, h)
        drawingContext.clip()
      }
      drawingContext.font = font
      const lines = this.text.split(/\n/)

      drawingContext.textBaseline = 'top'

      const align = textAlign

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
        const [w, h] = measureText(this, line, font, lineHeight)

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
