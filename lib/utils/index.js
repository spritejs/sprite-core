'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateID = exports.sortOrderedSprites = exports.setDeprecation = exports.rectVertices = exports.rectToBox = exports.parseValue = exports.parseStringTransform = exports.parseStringInt = exports.parseStringFloat = exports.praseString = exports.parseColorString = exports.parseColor = exports.inheritAttributes = exports.inherit = exports.relative = exports.absolute = exports.oneOrTwoValues = exports.notice = exports.fourValuesShortCut = exports.flow = exports.deprecate = exports.Color = exports.boxUnion = exports.boxToRect = exports.boxIntersect = exports.boxEqual = exports.attr = exports.appendUnit = exports.cacheContextPool = exports.findColor = exports.cachable = undefined;

var _utils = require('./utils');

var _decorators = require('./decorators');

var _render = require('../helpers/render');

exports.cachable = _decorators.cachable;
exports.findColor = _render.findColor;
exports.cacheContextPool = _render.cacheContextPool;
exports.appendUnit = _utils.appendUnit;
exports.attr = _decorators.attr;
exports.boxEqual = _utils.boxEqual;
exports.boxIntersect = _utils.boxIntersect;
exports.boxToRect = _utils.boxToRect;
exports.boxUnion = _utils.boxUnion;
exports.Color = _utils.Color;
exports.deprecate = _decorators.deprecate;
exports.flow = _decorators.flow;
exports.fourValuesShortCut = _utils.fourValuesShortCut;
exports.notice = _utils.notice;
exports.oneOrTwoValues = _utils.oneOrTwoValues;
exports.absolute = _decorators.absolute;
exports.relative = _decorators.relative;
exports.inherit = _decorators.inherit;
exports.inheritAttributes = _decorators.inheritAttributes;
exports.parseColor = _utils.parseColor;
exports.parseColorString = _utils.parseColorString;
exports.praseString = _utils.praseString;
exports.parseStringFloat = _utils.parseStringFloat;
exports.parseStringInt = _utils.parseStringInt;
exports.parseStringTransform = _utils.parseStringTransform;
exports.parseValue = _decorators.parseValue;
exports.rectToBox = _utils.rectToBox;
exports.rectVertices = _utils.rectVertices;
exports.setDeprecation = _decorators.setDeprecation;
exports.sortOrderedSprites = _utils.sortOrderedSprites;
exports.generateID = _utils.generateID;