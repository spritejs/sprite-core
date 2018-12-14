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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _cssLineBreak = require("css-line-break");

var _utils = require("./utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _render = require("./helpers/render");

function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: (0, _typeof2.default)(key) === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return (0, _toArray2.default)(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return (0, _typeof2.default)(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if ((0, _typeof2.default)(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if ((0, _typeof2.default)(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

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

var LabelSpriteAttr = _decorate(null, function (_initialize, _BaseSprite$Attr) {
  var LabelSpriteAttr =
  /*#__PURE__*/
  function (_BaseSprite$Attr2) {
    (0, _inherits2.default)(LabelSpriteAttr, _BaseSprite$Attr2);

    function LabelSpriteAttr(subject) {
      var _this;

      (0, _classCallCheck2.default)(this, LabelSpriteAttr);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LabelSpriteAttr).call(this, subject));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

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

    return LabelSpriteAttr;
  }(_BaseSprite$Attr);

  return {
    F: LabelSpriteAttr,
    d: [{
      kind: "set",
      decorators: [_utils.attr],
      key: "text",
      value: function value(val) {
        val = String(val);
        this.set('text', val);
        this.subject.retypesetting();
      }
    }, {
      kind: "set",
      decorators: [_utils.attr, (0, _utils.inherit)('normal normal normal 16px Arial')],
      key: "font",
      value: function value(val) {
        this.set('font', val);
        this.subject.retypesetting();
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
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr, (0, _utils.inherit)('')],
      key: "lineHeight",
      value: function value(val) {
        this.set('lineHeight', val);
        this.subject.retypesetting();
      }
    }, {
      kind: "set",
      decorators: [_utils.attr, (0, _utils.inherit)('left')],
      key: "textAlign",
      value: function value(val) {
        this.set('textAlign', val);
        this.subject.retypesetting();
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "color",
      value: function value(val) {
        this.fillColor = val;
      }
    }, {
      kind: "get",
      key: "color",
      value: function value() {
        return this.fillColor;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr, (0, _utils.inherit)('')],
      key: "strokeColor",
      value: function value(val) {
        this.set('strokeColor', val);
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr, (0, _utils.inherit)('')],
      key: "fillColor",
      value: function value(val) {
        this.set('fillColor', val);
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "flexible",
      value: function value(val) {
        this.set('flexible', val);
      }
    }, {
      kind: "set",
      decorators: [_utils.attr, (0, _utils.inherit)('')],
      key: "lineBreak",
      value: function value(val) {
        // normal, strict, none
        this.set('lineBreak', val);
        this.subject.retypesetting();
      }
    }, {
      kind: "set",
      decorators: [_utils.attr, (0, _utils.inherit)('')],
      key: "wordBreak",
      value: function value(val) {
        // normal | break-all | break-word | keep-all
        this.set('wordBreak', val);
        this.subject.retypesetting();
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr, (0, _utils.inherit)(0)],
      key: "letterSpacing",
      value: function value(_value) {
        this.set('letterSpacing', _value);
        this.subject.retypesetting();
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr, (0, _utils.inherit)(0)],
      key: "textIndent",
      value: function value(_value2) {
        this.set('textIndent', _value2);
        this.subject.retypesetting();
      }
    }, {
      kind: "set",
      decorators: [_utils.attr, (0, _utils.relative)('width')],
      key: "width",
      value: function value(val) {
        this.set('width', val);
        if (this.lineBreak !== '') this.subject.retypesetting();
      }
    }, {
      kind: "set",
      decorators: [_utils.attr, (0, _utils.relative)('height')],
      key: "layoutWidth",
      value: function value(val) {
        this.set('layoutWidth', val);
        if (this.lineBreak !== '') this.subject.retypesetting();
      }
    }]
  };
}, _basesprite.default.Attr);

var Label = _decorate(null, function (_initialize2, _BaseSprite) {
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

      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Label).call(this, attr));

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
        (0, _get2.default)((0, _getPrototypeOf2.default)(Label.prototype), "restyle", this).call(this);
        this.retypesetting();
      }
    }, {
      kind: "method",
      key: "render",
      value: function value(t, drawingContext) {
        var _this3 = this;

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