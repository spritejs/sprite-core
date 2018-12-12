// borrow from node-canvas (https://github.com/Automattic/node-canvas)

/**
 * Font RegExp helpers.
 */

import {sizeToPixel} from './utils';

const weights = 'bold|bolder|lighter|[1-9]00',
  styles = 'italic|oblique',
  variants = 'small-caps',
  stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded',
  units = 'px|pt|pc|in|cm|mm|em|ex|rem|q|vw|vh|vmax|vmin|%',
  string = '\'([^\']+)\'|"([^"]+)"|([\\w-]|[\u4e00-\u9fa5])+';

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp(`(${weights}) +`, 'i');
const styleRe = new RegExp(`(${styles}) +`, 'i');
const variantRe = new RegExp(`(${variants}) +`, 'i');
const stretchRe = new RegExp(`(${stretches}) +`, 'i');

/* eslint-disable prefer-template */
const sizeFamilyRe = new RegExp(
  '([\\d\\.]+)(' + units + ') *'
  + '((?:' + string + ')( *, *(?:' + string + '))*)'
);
/* eslint-enable prefer-template */

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

export default function parseFont(str, defaultHeight) {
  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str);
  if(!sizeFamily) return; // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/ *, */g, ','),
  };

  // Stop search at `sizeFamily.index`
  const substr = str.substring(0, sizeFamily.index);

  // Optional, unordered properties.
  const weight = weightRe.exec(substr),
    style = styleRe.exec(substr),
    variant = variantRe.exec(substr),
    stretch = stretchRe.exec(substr);

  if(weight) font.weight = weight[1];
  if(style) font.style = style[1];
  if(variant) font.variant = variant[1];
  if(stretch) font.stretch = stretch[1];

  font.size0 = font.size;

  font.size = sizeToPixel({size: font.size0, unit: font.unit}, defaultHeight);

  if(font.unit === 'vw' || font.unit === 'vh') {
    if(typeof document !== 'undefined' && document.documentElement) {
      const {clientWidth, clientHeight} = document.documentElement;
      const val = font.unit === 'vw' ? clientWidth : clientHeight;
      font.size = val * font.size / 100;
    }
  }

  return font;
}

/* eslint-enable */
