import {Effects, Easings, Timeline} from 'sprite-animator';
import SvgPath from 'svg-path-to-canvas';
import * as math from 'sprite-math';
import * as utils from './utils';
import BaseSprite from './basesprite';
import Sprite from './sprite';
import Label from './label';
import Layer from './layer';
import Group from './group';
import BaseNode from './basenode';
import Path from './path';
import Batch from './batch';
import use from './use';

// load modules
import './modules/layout';
import {
  registerNodeType,
  createNode,
  createElement,
  isValidNodeType,
  querySelector,
  querySelectorAll,
} from './modules/dom';
import stylesheet from './modules/css';
import './modules/actions';

const Color = utils.Color;

export {
  stylesheet,
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
