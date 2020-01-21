"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _cssLineBreak = require("css-line-break");

var _utils = require("../utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _render = require("../utils/render");

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

var LabelSpriteAttr = (0, _decorate2.default)(null, function (_initialize, _BaseSprite$Attr) {
  var LabelSpriteAttr =
  /*#__PURE__*/
  function (_BaseSprite$Attr2) {
    (0, _inherits2.default)(LabelSpriteAttr, _BaseSprite$Attr2);

    function LabelSpriteAttr() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, LabelSpriteAttr);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LabelSpriteAttr)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      return _this;
    }

    return LabelSpriteAttr;
  }(_BaseSprite$Attr);

  return {
    F: LabelSpriteAttr,
    d: [{
      kind: "method",
      key: "retypesetting",
      value: function value() {
        this.subject.retypesetting();
      }
    }, {
      kind: "method",
      key: "widthRetypeseting",
      value: function value() {
        if (this.lineBreak !== '') this.subject.retypesetting();else this.subject.reflow();
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(String), (0, _utils.attr)({
        extra: 'retypesetting'
      })],
      key: "text",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        extra: 'retypesetting'
      }), (0, _utils.inherit)('normal normal normal 16px Arial')],
      key: "font",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "fontSize",
      value: function value(val) {
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
      }
    }, {
      kind: "get",
      key: "fontSize",
      value: function value() {
        var font = this.font;

        var _parseFont2 = (0, _utils.parseFont)(font),
            size0 = _parseFont2.size0,
            unit = _parseFont2.unit;

        return "".concat(size0).concat(unit);
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "fontFamily",
      value: function value(val) {
        if (val == null) val = 'Arial';
        this.font = setFontPart(this.font, {
          family: val
        });
      }
    }, {
      kind: "get",
      key: "fontFamily",
      value: function value() {
        return (0, _utils.parseFont)(this.font).family;
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "fontStyle",
      value: function value(val) {
        if (val == null) val = 'normal';
        this.font = setFontPart(this.font, {
          style: val
        });
      }
    }, {
      kind: "get",
      key: "fontStyle",
      value: function value() {
        return (0, _utils.parseFont)(this.font).style;
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "fontVariant",
      value: function value(val) {
        if (val == null) val = 'normal';
        this.font = setFontPart(this.font, {
          variant: val
        });
      }
    }, {
      kind: "get",
      key: "fontVariant",
      value: function value() {
        return (0, _utils.parseFont)(this.font).variant;
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "fontWeight",
      value: function value(val) {
        if (val == null) val = 'normal';
        this.font = setFontPart(this.font, {
          weight: val
        });
      }
    }, {
      kind: "get",
      key: "fontWeight",
      value: function value() {
        return (0, _utils.parseFont)(this.font).weight;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        extra: 'retypesetting'
      }), (0, _utils.inherit)('')],
      key: "lineHeight",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        extra: 'retypesetting'
      }), (0, _utils.inherit)('left')],
      key: "textAlign",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr, (0, _utils.inherit)('')],
      key: "strokeColor",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "strokeWidth",
      value: function value() {
        return 1;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr, (0, _utils.inherit)('')],
      key: "color",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [_utils.attr, (0, _utils.composit)('color')],
      key: "fillColor",
      value: void 0
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "flexible",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        extra: 'retypesetting'
      }), (0, _utils.inherit)('')],
      key: "lineBreak",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        extra: 'retypesetting'
      }), (0, _utils.inherit)('')],
      key: "wordBreak",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        extra: 'retypesetting'
      }), (0, _utils.inherit)(0)],
      key: "letterSpacing",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        extra: 'retypesetting'
      }), (0, _utils.inherit)(0)],
      key: "textIndent",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        extra: 'widthRetypeseting'
      }), (0, _utils.relative)('width')],
      key: "width",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        extra: 'widthRetypeseting'
      }), (0, _utils.relative)('width')],
      key: "layoutWidth",
      value: function value() {
        return '';
      }
    }]
  };
}, _basesprite.default.Attr);
var Label = (0, _decorate2.default)(null, function (_initialize2, _BaseSprite) {
  var Label =
  /*#__PURE__*/
  function (_BaseSprite2) {
    (0, _inherits2.default)(Label, _BaseSprite2);

    function Label(attr) {
      var _this2;

      (0, _classCallCheck2.default)(this, Label);

      if ((0, _typeof2.default)(attr) !== 'object') {
        attr = {
          text: String(attr)
        };
      }

      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(Label).call(this, attr));

      _initialize2((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));

      return _this2;
    }

    return Label;
  }(_BaseSprite);

  return {
    F: Label,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",
      value: function value() {
        return LabelSpriteAttr;
      }
    }, {
      kind: "set",
      key: "text",
      value: function value(val) {
        this.attr('text', val);
      }
    }, {
      kind: "get",
      key: "text",
      value: function value() {
        return this.attr('text');
      }
    }, {
      kind: "get",
      key: "textboxSize",
      value: function value() {
        if (!this[_boxSize]) calculTextboxSize(this);
        return this[_boxSize];
      }
    }, {
      kind: "get",
      key: "flexibleFont",
      value: function value() {
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
      }
    }, {
      kind: "get",
      decorators: [_utils.flow],
      key: "contentSize",
      value: function value() {
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
    }, {
      kind: "method",
      key: "connect",
      value: function value(parent) {
        var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var ret = (0, _get2.default)((0, _getPrototypeOf3.default)(Label.prototype), "connect", this).call(this, parent, zOrder);
        var _p = parent;

        while (_p && _p.__labelCount != null) {
          ++_p.__labelCount;
          _p = _p.parent;
        }

        return ret;
      }
    }, {
      kind: "method",
      key: "disconnect",
      value: function value(parent) {
        var ret = (0, _get2.default)((0, _getPrototypeOf3.default)(Label.prototype), "disconnect", this).call(this, parent);
        var _p = parent;

        while (_p && _p.__labelCount != null) {
          --_p.__labelCount;
          _p = _p.parent;
        }

        return ret;
      }
    }, {
      kind: "method",
      key: "retypesetting",
      value: function value() {
        // calculTextboxSize(this);
        this[_boxSize] = false;
        this[_outputText] = null;
        this.reflow();
        this.forceUpdate(true);
      }
    }, {
      kind: "method",
      key: "restyle",
      value: function value() {
        (0, _get2.default)((0, _getPrototypeOf3.default)(Label.prototype), "restyle", this).call(this);
        this.retypesetting();
      }
    }, {
      kind: "method",
      key: "render",
      value: function value(t, drawingContext) {
        var _this3 = this;

        (0, _get2.default)((0, _getPrototypeOf3.default)(Label.prototype), "render", this).call(this, t, drawingContext);
        var textAlign = this.attr('textAlign'),
            flexible = this.attr('flexible'),
            font = flexible ? this.flexibleFont : this.attr('font'),
            strokeWidth = this.attr('strokeWidth'),
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

          drawingContext.lineWidth = strokeWidth;
          var top = 0;
          var width = this.contentSize[0];
          var letterSpacing = this.attr('letterSpacing'),
              textIndent = this.attr('textIndent');
          lines.forEach(function (line, idx) {
            var _measureText5 = measureText(_this3, line, font, lineHeight),
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

                l += measureText(_this3, letter, font)[0] + letterSpacing;
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
    }]
  };
}, _basesprite.default);
exports.default = Label;