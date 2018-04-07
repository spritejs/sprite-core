'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.isSpriteDirty = isSpriteDirty;
exports.clearDirtyRects = clearDirtyRects;

var _spriteUtils = require('sprite-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSpriteDirty(sprite, dirtyEls) {
  var isUpdateEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  for (var i = 0; i < dirtyEls.length; i++) {
    var dirtyEl = dirtyEls[i];
    var box1 = dirtyEl.renderBox,
        box2 = sprite.renderBox,
        box3 = dirtyEl.lastRenderBox;

    if ((0, _spriteUtils.boxIntersect)(box1, box2) || isUpdateEl && box3 && (0, _spriteUtils.boxIntersect)(box3, box2)) {
      return true;
    }
  }
  return false;
}

function clearDirtyRect(_ref, box, width, height) {
  var shadowContext = _ref.shadowContext,
      outputContext = _ref.outputContext;

  var dirtyBox = (0, _spriteUtils.boxIntersect)(box, [0, 0, width, height]);

  if (dirtyBox) {
    var dirtyRect = (0, _spriteUtils.boxToRect)(dirtyBox);

    if (shadowContext) shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(dirtyRect));
    outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(dirtyRect));
  }
}

function clearDirtyRects(_ref2, dirtyEls) {
  var shadowContext = _ref2.shadowContext,
      outputContext = _ref2.outputContext;
  var isUpdateEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _outputContext$canvas = outputContext.canvas,
      width = _outputContext$canvas.width,
      height = _outputContext$canvas.height;


  for (var i = 0; i < dirtyEls.length; i++) {
    var dirtyEl = dirtyEls[i];
    var box = dirtyEl.renderBox;

    clearDirtyRect({ shadowContext: shadowContext, outputContext: outputContext }, box, width, height);

    if (isUpdateEl) {
      var lastRenderBox = dirtyEl.lastRenderBox;
      if (lastRenderBox && !(0, _spriteUtils.boxEqual)(lastRenderBox, box)) {
        clearDirtyRect({ shadowContext: shadowContext, outputContext: outputContext }, lastRenderBox, width, height);
      }
    }
  }
}