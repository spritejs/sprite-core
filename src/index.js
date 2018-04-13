import BaseSprite from './basesprite'
import Sprite from './sprite'
import Label from './label'
import Layer from './layer'
import Group from './group'
import BaseNode from './basenode'
import Path from './path'
import Batch from './batch'
import {registerNodeType, createNode} from './nodetype'

import {Effects} from 'sprite-animator'
import SvgPath from 'svg-path-to-canvas'

import {
  Color,
  parseColor,
  oneOrTwoValues,
  parseStringInt,
  parseStringFloat,
  parseColorString,
  fourValuesShortCut,
  parseStringTransform,
  boxIntersect,
  boxToRect,
  boxEqual,
  boxUnion,
  rectToBox,
  rectVertices,
  appendUnit,
  attr,
  setDeprecation,
  deprecate,
  parseValue,
  sortOrderedSprites,
  isPropEqual,
} from 'sprite-utils'

const utils = {
  parseColor,
  oneOrTwoValues,
  parseStringInt,
  parseStringFloat,
  parseColorString,
  fourValuesShortCut,
  parseStringTransform,
  boxIntersect,
  boxToRect,
  boxEqual,
  boxUnion,
  rectToBox,
  rectVertices,
  appendUnit,
  attr,
  setDeprecation,
  deprecate,
  parseValue,
  sortOrderedSprites,
  isPropEqual,
}

import {Matrix, Vector} from 'sprite-math'

const math = {Matrix, Vector}

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
  registerNodeType,
  createNode,
  Color,
  SvgPath,
}
