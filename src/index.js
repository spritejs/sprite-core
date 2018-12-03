import {Effects, Easings, Timeline} from 'sprite-animator';
import SvgPath from 'svg-path-to-canvas';
import * as math from 'sprite-math';
import * as utils from './utils';
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
import {querySelector, querySelectorAll} from './selector';
import stylesheet from './stylesheet';

const Color = utils.Color;

const installed = new WeakMap();
const _merged = Symbol('merged');

let target = null;
function use(plugin, options = null, merge = true) {
  if(!target) {
    target = Object.assign({}, this);
    target.__spritejs = this;
    // target.use = use.bind(target);
    target.use = function (plugin, options = null, merge = false) {
      return use.call(target, plugin, options, merge);
    };
  }
  if(typeof options === 'boolean') {
    merge = options;
    options = null;
  }
  if(installed.has(plugin)) {
    const ret = installed.get(plugin);
    if(merge && !ret[_merged]) {
      Object.assign(target, ret);
      ret[_merged] = true;
    }
    return ret;
  }
  const install = plugin.install || plugin;
  const ret = install.call(plugin, target, options) || {};
  installed.set(plugin, ret);
  if(merge) {
    Object.assign(target.__spritejs, ret);
    ret[_merged] = true;
  }
  return ret;
}

export {
  stylesheet,
  querySelector,
  querySelectorAll,
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
