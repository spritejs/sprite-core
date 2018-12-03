'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SvgPath = exports.Color = exports.createElement = exports.createNode = exports.isValidNodeType = exports.registerNodeType = exports.Timeline = exports.Easings = exports.Effects = exports.Group = exports.Layer = exports.Path = exports.Label = exports.Sprite = exports.Batch = exports.DataNode = exports.BaseSprite = exports.BaseNode = exports.math = exports.utils = exports.use = exports.querySelectorAll = exports.querySelector = exports.stylesheet = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

var _spriteAnimator = require('sprite-animator');

var _svgPathToCanvas = require('svg-path-to-canvas');

var _svgPathToCanvas2 = _interopRequireDefault(_svgPathToCanvas);

var _spriteMath = require('sprite-math');

var math = _interopRequireWildcard(_spriteMath);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _basesprite = require('./basesprite');

var _basesprite2 = _interopRequireDefault(_basesprite);

var _datanode = require('./datanode');

var _datanode2 = _interopRequireDefault(_datanode);

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

var _selector = require('./selector');

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Color = utils.Color;

var installed = new _weakMap2.default();
var _merged = (0, _symbol2.default)('merged');

var target = null;
function use(plugin) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!target) {
    target = (0, _assign2.default)({}, this);
    target.__spritejs = this;
    // target.use = use.bind(target);
    target.use = function (plugin) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return use.call(target, plugin, options, merge);
    };
  }
  if (typeof options === 'boolean') {
    merge = options;
    options = null;
  }
  if (installed.has(plugin)) {
    var _ret = installed.get(plugin);
    if (merge && !_ret[_merged]) {
      (0, _assign2.default)(target, _ret);
      _ret[_merged] = true;
    }
    return _ret;
  }
  var install = plugin.install || plugin;
  var ret = install.call(plugin, target, options) || {};
  installed.set(plugin, ret);
  if (merge) {
    (0, _assign2.default)(target.__spritejs, ret);
    ret[_merged] = true;
  }
  return ret;
}

exports.stylesheet = _stylesheet2.default;
exports.querySelector = _selector.querySelector;
exports.querySelectorAll = _selector.querySelectorAll;
exports.use = use;
exports.utils = utils;
exports.math = math;
exports.BaseNode = _basenode2.default;
exports.BaseSprite = _basesprite2.default;
exports.DataNode = _datanode2.default;
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
exports.isValidNodeType = _nodetype.isValidNodeType;
exports.createNode = _nodetype.createNode;
exports.createElement = _nodetype.createElement;
exports.Color = Color;
exports.SvgPath = _svgPathToCanvas2.default;