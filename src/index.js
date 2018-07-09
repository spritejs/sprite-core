import BaseSprite from './basesprite'
import Sprite from './sprite'
import Label from './label'
import Layer from './layer'
import Group from './group'
import BaseNode from './basenode'
import Path from './path'
import Batch from './batch'
import FlexLayout from './layout'
import {registerNodeType, createNode} from './nodetype'
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
  FlexLayout,
  Effects,
  Easings,
  registerNodeType,
  createNode,
  Color,
  SvgPath,
}
