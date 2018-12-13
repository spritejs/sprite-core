"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _cssLineBreak = require("css-line-break");

var _utils = require("./utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _render = require("./helpers/render");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _class3, _temp;

var _boxSize = Symbol('boxSize'),
    _outputText = Symbol('outputText');

var measureText = function measureText(node, text, font) {
  var lineHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var ctx = node.context;

  if (!ctx) {
    return [0, 0];
  }

  ctx.save();
  ctx.font = font;

  var _ctx$measureText = ctx.measureText(text),
      width = _ctx$measureText.width;

  ctx.restore();
  var letterSpacing = node.attr('letterSpacing');

  if (letterSpacing) {
    width += letterSpacing * (text.length - 1);
  }

  var _parseFont = (0, _utils.parseFont)(font),
      size = _parseFont.size;

  var height = lineHeight || size * 1.2;
  return [width, height].map(Math.round);
};

function calculTextboxSize(node) {
  if (!node.context) return '';
  var text = node.text,
      font = node.attr('font'),
      lineHeight = node.attr('lineHeight'),
      textIndent = node.attr('textIndent');
  var lines = [];
  var width = 0,
      height = 0;
  node[_outputText] = text;
  var lineBreak = node.attr('lineBreak'),
      textboxWidth = node.hasLayout ? node.attr('layoutWidth') : node.attr('width');

  if (lineBreak !== '' && textboxWidth !== '') {
    var wordBreak = node.attr('wordBreak');
    text.split(/\n/).forEach(function (line) {
      var breaker = (0, _cssLineBreak.LineBreaker)(line, {
        lineBreak: lineBreak,
        wordBreak: wordBreak
      });
      var words = [];
      var bk = breaker.next();

      while (!bk.done) {
        words.push(bk.value.slice());
        bk = breaker.next();
      }

      var l = '';
      words.forEach(function (word) {
        if (!l) {
          l = word;
        } else {
          var ll = "".concat(l).concat(word);

          var _measureText = measureText(node, ll, font),
              _measureText2 = (0, _slicedToArray2.default)(_measureText, 1),
              w = _measureText2[0];

          if (w > (lines.length === 0 ? textboxWidth - textIndent : textboxWidth)) {
            lines.push(l);
            l = word;
          } else {
            l = ll;
          }
        }
      });
      lines.push(l);
    }); // lines = node[_outputText].split(/\n/)

    node[_outputText] = lines.join('\n');
  } else {
    lines = text.split(/\n/);
  }

  lines.forEach(function (line, idx) {
    var _measureText3 = measureText(node, line, font, lineHeight),
        _measureText4 = (0, _slicedToArray2.default)(_measureText3, 2),
        w = _measureText4[0],
        h = _measureText4[1];

    if (idx === 0) w += textIndent;
    width = Math.max(width, w);
    height += h;
  });
  var boxSize = node[_boxSize];

  if (!boxSize || boxSize[0] !== width || boxSize[1] !== height) {
    var attrSize = node.attrSize;

    if (attrSize[0] === '' || attrSize[1] === '') {
      node.reflow();
      node.clearLayout();
    }
  }

  node[_boxSize] = [width, height];
}

function setFontPart(font, part) {
  var _Object$assign = Object.assign((0, _utils.parseFont)(font), part),
      style = _Object$assign.style,
      variant = _Object$assign.variant,
      weight = _Object$assign.weight,
      size0 = _Object$assign.size0,
      unit = _Object$assign.unit,
      family = _Object$assign.family;

  return "".concat(style, " ").concat(variant, " ").concat(weight, " ").concat(size0).concat(unit, " ").concat(family);
}

var LabelSpriteAttr = (_dec = (0, _utils.inherit)('normal normal normal 16px Arial'), _dec2 = (0, _utils.parseValue)(parseFloat), _dec3 = (0, _utils.inherit)(''), _dec4 = (0, _utils.inherit)('left'), _dec5 = (0, _utils.parseValue)(_utils.parseColorString), _dec6 = (0, _utils.inherit)(''), _dec7 = (0, _utils.parseValue)(_utils.parseColorString), _dec8 = (0, _utils.inherit)(''), _dec9 = (0, _utils.inherit)(''), _dec10 = (0, _utils.inherit)(''), _dec11 = (0, _utils.parseValue)(parseFloat), _dec12 = (0, _utils.inherit)(0), _dec13 = (0, _utils.parseValue)(parseFloat), _dec14 = (0, _utils.inherit)(0), _dec15 = (0, _utils.relative)('width'), _dec16 = (0, _utils.relative)('height'), (_class =
/*#__PURE__*/
function (_BaseSprite$Attr) {
  (0, _inherits2.default)(LabelSpriteAttr, _BaseSprite$Attr);

  function LabelSpriteAttr(subject) {
    var _this;

    (0, _classCallCheck2.default)(this, LabelSpriteAttr);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LabelSpriteAttr).call(this, subject));

    _this.setDefault({
      font: 'inherit',
      textAlign: 'inherit',
      strokeColor: 'inherit',
      fillColor: 'inherit',
      lineHeight: 'inherit',
      text: '',
      flexible: false,
      lineBreak: 'inherit',
      wordBreak: 'inherit',
      letterSpacing: 'inherit',
      textIndent: 'inherit'
    });

    return _this;
  }

  (0, _createClass2.default)(LabelSpriteAttr, [{
    key: "text",
    set: function set(val) {
      val = String(val);
      this.set('text', val);
      this.subject.retypesetting();
    }
  }, {
    key: "font",
    set: function set(val) {
      this.set('font', val);
      this.subject.retypesetting();
    }
  }, {
    key: "fontSize",
    set: function set(val) {
      if (val == null) val = '16px';
      var unit = 'px';

      if (typeof val === 'string') {
        var unitReg = /^([\d.]+)(\w+)/;
        var matches = val.match(unitReg);

        if (!matches) {
          return null;
        }

        val = parseFloat(matches[1]);
        unit = matches[2];
      }

      this.font = setFontPart(this.font, {
        size0: val,
        unit: unit
      });
    },
    get: function get() {
      var font = this.font;

      var _parseFont2 = (0, _utils.parseFont)(font),
          size0 = _parseFont2.size0,
          unit = _parseFont2.unit;

      return "".concat(size0).concat(unit);
    }
  }, {
    key: "fontFamily",
    set: function set(val) {
      if (val == null) val = 'Arial';
      this.font = setFontPart(this.font, {
        family: val
      });
    },
    get: function get() {
      return (0, _utils.parseFont)(this.font).family;
    }
  }, {
    key: "fontStyle",
    set: function set(val) {
      if (val == null) val = 'normal';
      this.font = setFontPart(this.font, {
        style: val
      });
    },
    get: function get() {
      return (0, _utils.parseFont)(this.font).style;
    }
  }, {
    key: "fontVariant",
    set: function set(val) {
      if (val == null) val = 'normal';
      this.font = setFontPart(this.font, {
        variant: val
      });
    },
    get: function get() {
      return (0, _utils.parseFont)(this.font).variant;
    }
  }, {
    key: "fontWeight",
    set: function set(val) {
      if (val == null) val = 'normal';
      this.font = setFontPart(this.font, {
        weight: val
      });
    },
    get: function get() {
      return (0, _utils.parseFont)(this.font).weight;
    }
  }, {
    key: "lineHeight",
    set: function set(val) {
      this.set('lineHeight', val);
      this.subject.retypesetting();
    }
  }, {
    key: "textAlign",
    set: function set(val) {
      this.set('textAlign', val);
      this.subject.retypesetting();
    }
  }, {
    key: "color",
    set: function set(val) {
      this.fillColor = val;
    },
    get: function get() {
      return this.fillColor;
    }
  }, {
    key: "strokeColor",
    set: function set(val) {
      this.set('strokeColor', val);
    }
  }, {
    key: "fillColor",
    set: function set(val) {
      this.set('fillColor', val);
    }
  }, {
    key: "flexible",
    set: function set(val) {
      this.set('flexible', val);
    }
  }, {
    key: "lineBreak",
    set: function set(val) {
      // normal, strict, none
      this.set('lineBreak', val);
      this.subject.retypesetting();
    }
  }, {
    key: "wordBreak",
    set: function set(val) {
      // normal | break-all | break-word | keep-all
      this.set('wordBreak', val);
      this.subject.retypesetting();
    }
  }, {
    key: "letterSpacing",
    set: function set(value) {
      this.set('letterSpacing', value);
      this.subject.retypesetting();
    }
  }, {
    key: "textIndent",
    set: function set(value) {
      this.set('textIndent', value);
      this.subject.retypesetting();
    }
  }, {
    key: "width",
    set: function set(val) {
      this.set('width', val);
      if (this.lineBreak !== '') this.subject.retypesetting();
    }
  }, {
    key: "layoutWidth",
    set: function set(val) {
      this.set('layoutWidth', val);
      if (this.lineBreak !== '') this.subject.retypesetting();
    }
  }]);
  return LabelSpriteAttr;
}(_basesprite.default.Attr), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "text", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "text"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "font", [_utils.attr, _dec], Object.getOwnPropertyDescriptor(_class.prototype, "font"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "fontSize", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "fontSize"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "fontFamily", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "fontFamily"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "fontStyle", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "fontStyle"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "fontVariant", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "fontVariant"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "fontWeight", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "fontWeight"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "lineHeight", [_dec2, _utils.attr, _dec3], Object.getOwnPropertyDescriptor(_class.prototype, "lineHeight"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "textAlign", [_utils.attr, _dec4], Object.getOwnPropertyDescriptor(_class.prototype, "textAlign"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "color", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "color"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "strokeColor", [_dec5, _utils.attr, _dec6], Object.getOwnPropertyDescriptor(_class.prototype, "strokeColor"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "fillColor", [_dec7, _utils.attr, _dec8], Object.getOwnPropertyDescriptor(_class.prototype, "fillColor"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "flexible", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "flexible"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "lineBreak", [_utils.attr, _dec9], Object.getOwnPropertyDescriptor(_class.prototype, "lineBreak"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "wordBreak", [_utils.attr, _dec10], Object.getOwnPropertyDescriptor(_class.prototype, "wordBreak"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "letterSpacing", [_dec11, _utils.attr, _dec12], Object.getOwnPropertyDescriptor(_class.prototype, "letterSpacing"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "textIndent", [_dec13, _utils.attr, _dec14], Object.getOwnPropertyDescriptor(_class.prototype, "textIndent"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "width", [_utils.attr, _dec15], Object.getOwnPropertyDescriptor(_class.prototype, "width"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "layoutWidth", [_utils.attr, _dec16], Object.getOwnPropertyDescriptor(_class.prototype, "layoutWidth"), _class.prototype)), _class));
var Label = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_BaseSprite) {
  (0, _inherits2.default)(Label, _BaseSprite);

  function Label(attr) {
    (0, _classCallCheck2.default)(this, Label);

    if ((0, _typeof2.default)(attr) !== 'object') {
      attr = {
        text: String(attr)
      };
    }

    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Label).call(this, attr));
  }

  (0, _createClass2.default)(Label, [{
    key: "retypesetting",
    value: function retypesetting() {
      // calculTextboxSize(this);
      this[_boxSize] = false;
      this[_outputText] = null;
      this.reflow();
      this.forceUpdate(true);
    }
  }, {
    key: "restyle",
    value: function restyle() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Label.prototype), "restyle", this).call(this);
      this.retypesetting();
    }
  }, {
    key: "render",
    value: function render(t, drawingContext) {
      var _this2 = this;

      (0, _get2.default)((0, _getPrototypeOf2.default)(Label.prototype), "render", this).call(this, t, drawingContext);
      var textAlign = this.attr('textAlign'),
          flexible = this.attr('flexible'),
          font = flexible ? this.flexibleFont : this.attr('font'),
          lineHeight = this.attr('lineHeight');
      var text = this.text;

      if (text) {
        var _this$contentSize = (0, _slicedToArray2.default)(this.contentSize, 2),
            w = _this$contentSize[0],
            h = _this$contentSize[1];

        if (!this[_outputText]) calculTextboxSize(this);
        text = this[_outputText] || this.text;

        if ((this.textboxSize[0] > w || this.textboxSize[1] > h) && this.attr('clipOverflow')) {
          drawingContext.beginPath();
          drawingContext.rect(0, 0, w, h);
          drawingContext.clip();
        }

        drawingContext.font = font;
        var lines = text.split(/\n/);
        drawingContext.textBaseline = 'top';
        var align = textAlign;
        drawingContext.textBaseline = 'middle';
        var strokeColor = (0, _render.findColor)(drawingContext, this, 'strokeColor');

        if (strokeColor) {
          drawingContext.strokeStyle = strokeColor;
        }

        var fillColor = (0, _render.findColor)(drawingContext, this, 'fillColor');

        if (!strokeColor && !fillColor) {
          fillColor = (0, _utils.parseColorString)('black');
        }

        if (fillColor) {
          drawingContext.fillStyle = fillColor;
        }

        var top = 0;
        var width = this.contentSize[0];
        var letterSpacing = this.attr('letterSpacing'),
            textIndent = this.attr('textIndent');
        lines.forEach(function (line, idx) {
          var _measureText5 = measureText(_this2, line, font, lineHeight),
              _measureText6 = (0, _slicedToArray2.default)(_measureText5, 2),
              w = _measureText6[0],
              h = _measureText6[1];

          var left = 0;

          if (align === 'center') {
            left = (width - w) / 2;
          } else if (align === 'right') {
            left = width - w;
          }

          var indent = 0;

          if (textIndent && idx === 0 && align !== 'right') {
            indent = textIndent;
          }

          if (letterSpacing) {
            var l = left;
            (0, _toConsumableArray2.default)(line).forEach(function (letter, i) {
              if (idx === 0 && i === 0) {
                l += indent;
              }

              if (fillColor) {
                drawingContext.fillText(letter, l, top + h / 2);
              }

              if (strokeColor) {
                drawingContext.strokeText(letter, l, top + h / 2);
              }

              l += measureText(_this2, letter, font)[0] + letterSpacing;
            });
          } else {
            if (fillColor) {
              drawingContext.fillText(line, left + indent, top + h / 2);
            }

            if (strokeColor) {
              drawingContext.strokeText(line, left + indent, top + h / 2);
            }
          }

          top += h;
        });
      }
    }
  }, {
    key: "text",
    set: function set(val) {
      this.attr('text', val);
    },
    get: function get() {
      return this.attr('text');
    }
  }, {
    key: "textboxSize",
    get: function get() {
      if (!this[_boxSize]) calculTextboxSize(this);
      return this[_boxSize];
    }
  }, {
    key: "flexibleFont",
    get: function get() {
      var font = this.attr('font');
      if (this.attr('width') === '' && this.attr('layoutWidth') === '') return font;
      var textboxSize = this.textboxSize,
          contentSize = this.contentSize;

      var _parseFont3 = (0, _utils.parseFont)(font),
          style = _parseFont3.style,
          variant = _parseFont3.variant,
          weight = _parseFont3.weight,
          size = _parseFont3.size,
          family = _parseFont3.family;

      size *= contentSize[0] / textboxSize[0];
      return "".concat(style, " ").concat(variant, " ").concat(weight, " ").concat(Math.floor(size), "px \"").concat(family, "\"");
    } // override to adapt content size

  }, {
    key: "contentSize",
    get: function get() {
      var _this$attrSize = (0, _slicedToArray2.default)(this.attrSize, 2),
          width = _this$attrSize[0],
          height = _this$attrSize[1];

      if (width === '' || height === '') {
        var textboxSize = this.textboxSize;
        if (!textboxSize) return [0, 0];
        width = width || textboxSize[0];
        height = height || textboxSize[1];
      }

      if (this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
        height = Math.ceil(height * width / this.textboxSize[0]);
      }

      return [width, height];
    }
  }]);
  return Label;
}(_basesprite.default), (0, _defineProperty2.default)(_class3, "Attr", LabelSpriteAttr), _temp), ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "contentSize", [_utils.flow], Object.getOwnPropertyDescriptor(_class2.prototype, "contentSize"), _class2.prototype)), _class2);
exports.default = Label;