import {Effects, Easings, Timeline} from 'sprite-animator';
import SvgPath from 'svg-path-to-canvas';
import * as math from 'sprite-math';
import * as utils from './utils';
import BaseSprite from './core/basesprite';
import Sprite from './core/sprite';
import Label from './core/label';
import Layer from './core/layer';
import Group from './core/group';
import BaseNode from './core/basenode';
import Path from './core/path';
import Batch from './core/batch';
import use from './core/use';

// load modules
import './modules/animation';
import {
  registerNodeType,
  createNode,
  createElement,
  isValidNodeType,
  querySelector,
  querySelectorAll,
} from './modules/dom';

const Color = utils.Color;

export {
  querySelector,
  querySelectorAll,
  registerNodeType,
  isValidNodeType,
  createNode,
  createElement,

  use,
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
  Timeline,
  Color,
  SvgPath,
};
