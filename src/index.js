import BaseSprite from './basesprite'
import Sprite from './sprite'
import Label from './label'
import Layer from './layer'
import Group from './group'
import BaseNode from './basenode'
import Path from './path'
import Batch from './batch'
import {registerNodeType, createNode, createElement} from './nodetype'
import {Effects, Easings} from 'sprite-animator'
import SvgPath from 'svg-path-to-canvas'

import {findColor, cacheContextPool} from './helpers/render'

import * as utils from 'sprite-utils'

utils.findColor = findColor
utils.cacheContextPool = cacheContextPool

const Color = utils.Color

import * as math from 'sprite-math'

export {
  utils,
  math,
  BaseNode,
  BaseSprite,
  Batch,
  Sprite,
  Label,
  Path,
  Layer,
  Group,
  Effects,
  Easings,
  registerNodeType,
  createNode,
  createElement,
  Color,
  SvgPath,
}
