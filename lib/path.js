'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _desc, _value, _class, _class2, _temp;

var _basesprite = require('./basesprite');

var _basesprite2 = _interopRequireDefault(_basesprite);

var _gradient = require('./gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _spriteAnimator = require('sprite-animator');

var _spriteUtils = require('sprite-utils');

var _spritePathEffect = require('sprite-path-effect');

var _spritePathEffect2 = _interopRequireDefault(_spritePathEffect);

var _nodetype = require('./nodetype');

var _svgPathToCanvas = require('svg-path-to-canvas');

var _svgPathToCanvas2 = _interopRequireDefault(_svgPathToCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

_spriteAnimator.Effects.d = _spritePathEffect2.default;

var PathSpriteAttr = (_dec = (0, _spriteUtils.deprecate)('Instead use strokeColor.'), (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(PathSpriteAttr, _BaseSprite$Attr);

  function PathSpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, PathSpriteAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PathSpriteAttr.__proto__ || (0, _getPrototypeOf2.default)(PathSpriteAttr)).call(this, subject));

    _this.setDefault({
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter',
      strokeColor: '',
      fillColor: '',
      // d: path2d,
      boxSize: [0, 0],
      pathRect: [0, 0, 0, 0],
      pathBounds: [0, 0, 0, 0],
      trim: false
    }, {
      color: {
        get: function get() {
          return this.strokeColor;
        }
      }
    });
    return _this;
  }

  (0, _createClass3.default)(PathSpriteAttr, [{
    key: 'd',
    set: function set(val) {
      this.clearCache();
      this.set('d', val);
      if (val) {
        this.subject.svg = new _svgPathToCanvas2.default(val);
      } else {
        this.subject.svg = null;
      }
    }
  }, {
    key: 'lineWidth',
    set: function set(val) {
      this.clearCache();
      this.set('lineWidth', Math.round(val));
    }

    /**
      lineCap: butt|round|square
     */

  }, {
    key: 'lineCap',
    set: function set(val) {
      this.clearCache();
      this.set('lineCap', val);
    }

    /**
      lineJoin: miter|round|bevel
     */

  }, {
    key: 'lineJoin',
    set: function set(val) {
      this.clearCache();
      this.set('lineJoin', val);
    }
  }, {
    key: 'strokeColor',
    set: function set(val) {
      this.clearCache();
      this.set('strokeColor', (0, _spriteUtils.parseColorString)(val));
    }
  }, {
    key: 'fillColor',
    set: function set(val) {
      this.clearCache();
      this.set('fillColor', (0, _spriteUtils.parseColorString)(val));
    }
  }, {
    key: 'color',
    set: function set(val) {
      this.strokeColor = val;
    }
  }, {
    key: 'trim',
    set: function set(val) {
      this.set('trim', val);
    }
  }]);
  return PathSpriteAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'd', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineWidth', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineCap', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineCap'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lineJoin', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'lineJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'strokeColor', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'strokeColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fillColor', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fillColor'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'color', [_spriteUtils.attr, _dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'color'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'trim', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'trim'), _class.prototype)), _class));
var Path = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Path, _BaseSprite);

  function Path(attr) {
    (0, _classCallCheck3.default)(this, Path);

    if (typeof attr === 'string') {
      attr = { d: attr };
    }
    return (0, _possibleConstructorReturn3.default)(this, (Path.__proto__ || (0, _getPrototypeOf2.default)(Path)).call(this, attr));
  }

  (0, _createClass3.default)(Path, [{
    key: 'getPointAtLength',
    value: function getPointAtLength(length) {
      if (this.svg) {
        var _svg$getPointAtLength = this.svg.getPointAtLength(length),
            x = _svg$getPointAtLength.x,
            y = _svg$getPointAtLength.y;

        return [x, y];
      }
      return [0, 0];
    }
  }, {
    key: 'getPathLength',
    value: function getPathLength() {
      if (this.svg) {
        return this.svg.getTotalLength();
      }
      return 0;
    }
  }, {
    key: 'findPath',
    value: function findPath(offsetX, offsetY) {
      if (this.attr('trim')) {
        var _pathOffset = (0, _slicedToArray3.default)(this.pathOffset, 2),
            x = _pathOffset[0],
            y = _pathOffset[1];

        offsetX -= x;
        offsetY -= y;
      }

      if (this.svg.isPointInPath(offsetX, offsetY)) {
        return [this.svg];
      }
      return [];
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if ((0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'pointCollision', this).call(this, evt)) {
        var offsetX = evt.offsetX,
            offsetY = evt.offsetY;

        var rect = this.originRect;
        evt.targetPaths = this.findPath(offsetX - rect[0], offsetY - rect[1]);
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      var context = (0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'render', this).call(this, t, drawingContext),
          attr = this.attr();

      if (attr.d) {
        var strokeColor = attr.strokeColor,
            fillColor = attr.fillColor;


        context.translate.apply(context, (0, _toConsumableArray3.default)(this.pathOffset));
        // console.log(this.svg.path)
        // this.svg.render(context)
        var commands = this.svg.path;
        if (commands.length) {
          context.save();
          context.beginPath();
          commands.forEach(function (c) {
            var _c = (0, _toArray3.default)(c),
                cmd = _c[0],
                args = _c.slice(1);

            if (cmd === 'M') {
              context.moveTo.apply(context, (0, _toConsumableArray3.default)(args));
            } else {
              context.bezierCurveTo.apply(context, (0, _toConsumableArray3.default)(args));
            }
          });
          context.restore();
        }

        context.lineWidth = attr.lineWidth;
        context.lineCap = attr.lineCap;
        context.lineJoin = attr.lineJoin;

        var _contentSize = (0, _slicedToArray3.default)(this.contentSize, 2),
            width = _contentSize[0],
            height = _contentSize[1],
            _attr$border = (0, _slicedToArray3.default)(attr.border, 1),
            borderWidth = _attr$border[0];

        var gradients = attr.gradients;
        if (gradients && gradients.fillColor) {
          var rect = gradients.fillColor.rect || [borderWidth, borderWidth, width, height];

          fillColor = (0, _gradient2.default)(context, rect, gradients.fillColor);
        }
        if (fillColor) {
          context.fillStyle = fillColor;
        }

        if (gradients && gradients.strokeColor) {
          var _rect = gradients.strokeColor.rect || [borderWidth, borderWidth, width, height];

          strokeColor = (0, _gradient2.default)(context, _rect, gradients.strokeColor);
        }
        if (strokeColor) {
          context.strokeStyle = strokeColor;
        }

        if (!strokeColor && !fillColor) {
          strokeColor = (0, _spriteUtils.parseColorString)('black');
        }

        if (strokeColor) {
          context.stroke();
        }
        if (fillColor) {
          context.fill();
        }
      }

      return context;
    }
  }, {
    key: 'contentSize',
    get: function get() {
      if (!this.svg) return (0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'contentSize', this);

      var bounds = this.svg.bounds;

      var _attr = this.attr('size'),
          _attr2 = (0, _slicedToArray3.default)(_attr, 2),
          width = _attr2[0],
          height = _attr2[1];

      var lineWidth = this.attr('lineWidth');

      var _attr3 = this.attr('border'),
          _attr4 = (0, _slicedToArray3.default)(_attr3, 1),
          borderWidth = _attr4[0];

      var padding = this.attr('padding');
      var padLeft = borderWidth + padding[3],
          padTop = borderWidth + padding[0];

      if (width === '') {
        width = bounds[2] + 1.414 * lineWidth | 0;
      }
      if (height === '') {
        height = bounds[3] + 1.414 * lineWidth | 0;
      }
      if (this.attr('trim')) {
        var _pathOffset2 = (0, _slicedToArray3.default)(this.pathOffset, 2),
            x = _pathOffset2[0],
            y = _pathOffset2[1];

        width += x - padLeft;
        height += y - padTop;
      }

      return [width, height];
    }
  }, {
    key: 'pathOffset',
    get: function get() {
      var trim = this.attr('trim'),
          bounds = this.svg.bounds;

      var lineWidth = this.attr('lineWidth');

      var _attr5 = this.attr('border'),
          _attr6 = (0, _slicedToArray3.default)(_attr5, 1),
          borderWidth = _attr6[0];

      var padding = this.attr('padding');
      var padLeft = borderWidth + padding[3],
          padTop = borderWidth + padding[0];

      if (trim) {
        return [-bounds[0] + padLeft + lineWidth * 1.414, -bounds[1] + padTop + lineWidth * 1.414];
      }
      return [padLeft, padTop];
    }
  }]);
  return Path;
}(_basesprite2.default), _class2.Attr = PathSpriteAttr, _temp);
exports.default = Path;


(0, _nodetype.registerNodeType)('path', Path);