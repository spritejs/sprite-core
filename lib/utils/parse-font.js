"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseFont;

var _utils = require("./utils");

// borrow from node-canvas (https://github.com/Automattic/node-canvas)

/**
 * Font RegExp helpers.
 */
var weights = 'bold|bolder|lighter|[1-9]00',
    styles = 'italic|oblique',
    variants = 'small-caps',
    stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded',
    units = 'px|pt|pc|in|cm|mm|em|ex|rem|q|vw|vh|vmax|vmin|%',
    string = "'([^']+)'|\"([^\"]+)\"|([\\w-]|[\u4E00-\u9FA5])+"; // [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop

var weightRe = new RegExp("(".concat(weights, ") +"), 'i');
var styleRe = new RegExp("(".concat(styles, ") +"), 'i');
var variantRe = new RegExp("(".concat(variants, ") +"), 'i');
var stretchRe = new RegExp("(".concat(stretches, ") +"), 'i');
/* eslint-disable prefer-template */

var sizeFamilyRe = new RegExp('([\\d\\.]+)(' + units + ') *' + '((?:' + string + ')( *, *(?:' + string + '))*)');
/* eslint-enable prefer-template */

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

function parseFont(str, defaultHeight) {
  // Try for required properties first.
  var sizeFamily = sizeFamilyRe.exec(str);
  if (!sizeFamily) return; // invalid
  // Default values and required properties

  var font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/ *, */g, ',')
  }; // Stop search at `sizeFamily.index`

  var substr = str.substring(0, sizeFamily.index); // Optional, unordered properties.

  var weight = weightRe.exec(substr),
      style = styleRe.exec(substr),
      variant = variantRe.exec(substr),
      stretch = stretchRe.exec(substr);
  if (weight) font.weight = weight[1];
  if (style) font.style = style[1];
  if (variant) font.variant = variant[1];
  if (stretch) font.stretch = stretch[1];
  font.size0 = font.size;
  font.size = (0, _utils.sizeToPixel)({
    size: font.size0,
    unit: font.unit
  }, defaultHeight);

  if (font.unit === 'vw' || font.unit === 'vh') {
    if (typeof document !== 'undefined' && document.documentElement) {
      var _document$documentEle = document.documentElement,
          clientWidth = _document$documentEle.clientWidth,
          clientHeight = _document$documentEle.clientHeight;
      var val = font.unit === 'vw' ? clientWidth : clientHeight;
      font.size = val * font.size / 100;
    }
  }

  return font;
}
/* eslint-enable */