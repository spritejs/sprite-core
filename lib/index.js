'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SvgPath = exports.Color = exports.createElement = exports.createNode = exports.registerNodeType = exports.Timeline = exports.Easings = exports.Effects = exports.Group = exports.Layer = exports.Path = exports.Label = exports.Sprite = exports.Batch = exports.BaseSprite = exports.BaseNode = exports.math = exports.utils = undefined;

var _spriteAnimator = require('sprite-animator');

var _svgPathToCanvas = require('svg-path-to-canvas');

var _svgPathToCanvas2 = _interopRequireDefault(_svgPathToCanvas);

var _spriteUtils = require('sprite-utils');

var utils = _interopRequireWildcard(_spriteUtils);

var _spriteMath = require('sprite-math');

var math = _interopRequireWildcard(_spriteMath);

var _basesprite = require('./basesprite');

var _basesprite2 = _interopRequireDefault(_basesprite);

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _layer = require('./layer');

var _layer2 = _interopRequireDefault(_layer);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _basenode = require('./basenode');

var _basenode2 = _interopRequireDefault(_basenode);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _batch = require('./batch');

var _batch2 = _interopRequireDefault(_batch);

var _nodetype = require('./nodetype');

var _render = require('./helpers/render');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

utils.findColor = _render.findColor;
utils.cacheContextPool = _render.cacheContextPool;

var Color = utils.Color;

exports.utils = utils;
exports.math = math;
exports.BaseNode = _basenode2.default;
exports.BaseSprite = _basesprite2.default;
exports.Batch = _batch2.default;
exports.Sprite = _sprite2.default;
exports.Label = _label2.default;
exports.Path = _path2.default;
exports.Layer = _layer2.default;
exports.Group = _group2.default;
exports.Effects = _spriteAnimator.Effects;
exports.Easings = _spriteAnimator.Easings;
exports.Timeline = _spriteAnimator.Timeline;
exports.registerNodeType = _nodetype.registerNodeType;
exports.createNode = _nodetype.createNode;
exports.createElement = _nodetype.createElement;
exports.Color = Color;
exports.SvgPath = _svgPathToCanvas2.default;