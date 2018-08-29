import {Effects, Easings, Timeline} from 'sprite-animator';
import SvgPath from 'svg-path-to-canvas';
import * as utils from 'sprite-utils';
import * as math from 'sprite-math';
import BaseSprite from './basesprite';
import DataNode from './datanode';
import Sprite from './sprite';
import Label from './label';
import Layer from './layer';
import Group from './group';
import BaseNode from './basenode';
import Path from './path';
import Batch from './batch';
import {registerNodeType, createNode, createElement, isValidNodeType} from './nodetype';

import {findColor, cacheContextPool} from './helpers/render';


utils.findColor = findColor;
utils.cacheContextPool = cacheContextPool;

const Color = utils.Color;

const installed = new WeakSet();

function use(plugin, ...args) {
  if(installed.has(plugin)) return false;
  Object.assign(this, plugin.install(this, ...args));
  installed.add(plugin);
  return true;
}

export {
  use,
  utils,
  math,
  BaseNode,
  BaseSprite,
  DataNode,
  Batch,
  Sprite,
  Label,
  Path,
  Layer,
  Group,
  Effects,
  Easings,
  Timeline,
  registerNodeType,
  isValidNodeType,
  createNode,
  createElement,
  Color,
  SvgPath,
};
