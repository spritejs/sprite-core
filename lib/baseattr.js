"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _svgPathToCanvas = _interopRequireDefault(require("svg-path-to-canvas"));

var _spriteMath = require("sprite-math");

var _attr = _interopRequireDefault(require("./attr"));

var _utils = require("./utils");

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

var cache = true,
    reflow = true,
    relayout = true;
var border = {
  width: 0,
  color: 'rgba(0,0,0,0)',
  style: 'solid'
};

var SpriteAttr = _decorate(null, function (_initialize, _NodeAttr) {
  var SpriteAttr =
  /*#__PURE__*/
  function (_NodeAttr2) {
    (0, _inherits2.default)(SpriteAttr, _NodeAttr2);

    function SpriteAttr(subject) {
      var _this;

      (0, _classCallCheck2.default)(this, SpriteAttr);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SpriteAttr).call(this, subject));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      Object.defineProperty((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), '__reflowTag', {
        writable: true,
        value: false
      });
      return _this;
    }

    return SpriteAttr;
  }(_NodeAttr);

  return {
    F: SpriteAttr,
    d: [{
      kind: "method",
      key: "set",
      value: function value(key, _value) {
        var isQuiet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        (0, _get2.default)((0, _getPrototypeOf2.default)(SpriteAttr.prototype), "set", this).call(this, key, _value, isQuiet); // auto reflow

        if (key === 'margin') {
          this.__reflowTag = true;
        }
      }
    }, {
      kind: "method",
      key: "merge",
      value: function value(attrs) {
        var _this2 = this;

        if (typeof attrs === 'string') {
          attrs = JSON.parse(attrs);
        }

        Object.entries(attrs).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          if (key !== 'offsetPath' && key !== 'offsetDistance' && key !== 'offsetRotate' && key !== 'offsetAngle' && key !== 'offsetPoint') {
            // this[key] = value;
            _this2.subject.attr(key, value);
          } else if (key === 'offsetPath') {
            var offsetPath = new _svgPathToCanvas.default(value);

            _this2.set('offsetPath', offsetPath.d);

            _this2.saveObj('offsetPath', offsetPath);
          } else {
            _this2.set(key, value);
          }
        });
        return this;
      }
    }, {
      kind: "method",
      key: "serialize",
      value: function value() {
        var attrs = this.getAttributes();
        delete attrs.id;
        var offsetAngle = this.get('offsetAngle');
        if (offsetAngle != null) attrs.offsetAngle = offsetAngle;
        var offsetPoint = this.get('offsetPoint');
        if (offsetPoint != null) attrs.offsetPoint = offsetPoint;
        return JSON.stringify(attrs);
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "enableCache",
      value: function value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat, _utils.oneOrTwoValues), (0, _utils.attr)({
        cache: cache,
        relayout: relayout,
        reflow: reflow
      })],
      key: "anchor",
      value: function value() {
        return [0, 0];
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "display",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      }), (0, _utils.relative)('width')],
      key: "layoutX",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      }), (0, _utils.relative)('height')],
      key: "layoutY",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      }), (0, _utils.relative)('width')],
      key: "x",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      }), (0, _utils.relative)('height')],
      key: "y",
      value: function value() {
        return 0;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseStringInt), _utils.attr],
      key: "pos",
      value: function value(val) {
        if (val == null) {
          val = [0, 0];
        }

        var _val = val,
            _val2 = (0, _slicedToArray2.default)(_val, 2),
            x = _val2[0],
            y = _val2[1];

        this.x = x;
        this.y = y;
      }
    }, {
      kind: "get",
      key: "pos",
      value: function value() {
        return [this.x, this.y];
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr],
      key: "bgcolor",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        cache: true
      })],
      key: "opacity",
      value: function value() {
        return 1;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: true
      }), (0, _utils.relative)('width')],
      key: "width",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: true
      }), (0, _utils.relative)('height')],
      key: "height",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: true
      }), (0, _utils.relative)('width')],
      key: "layoutWidth",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: true
      }), (0, _utils.relative)('height')],
      key: "layoutHeight",
      value: function value() {
        return '';
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseStringInt), _utils.attr],
      key: "size",
      value: function value(val) {
        if (val == null) {
          val = ['', ''];
        }

        var _val3 = val,
            _val4 = (0, _slicedToArray2.default)(_val3, 2),
            width = _val4[0],
            height = _val4[1];

        this.width = width;
        this.height = height;
      }
    }, {
      kind: "get",
      key: "size",
      value: function value() {
        return [this.width, this.height];
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        value: border
      })],
      key: "border",
      value: function value(val) {
        if (val == null) {
          this.set('border', null);
          return;
        }

        if (typeof val === 'number' || typeof val === 'string') {
          val = {
            width: parseFloat(val)
          };
        } else if (Array.isArray(val)) {
          val = {
            width: parseFloat(val[0]),
            color: (0, _utils.parseColorString)(val[1] || '#000')
          };
        } else {
          val.width = parseFloat(val.width);
          val.color = (0, _utils.parseColorString)(val.color || '#000');
        }

        val = Object.assign({
          width: 1,
          color: (0, _utils.parseColorString)('#000'),
          style: 'solid'
        }, val);
        this.clearFlow();
        this.set('border', val);
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "paddingTop",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "paddingRight",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "paddingBottom",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow
      })],
      key: "paddingLeft",
      value: function value() {
        return 0;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseStringInt, _utils.fourValuesShortCut), _utils.attr],
      key: "padding",
      value: function value(val) {
        val = val || [0, 0, 0, 0];
        this.paddingTop = val[0];
        this.paddingRight = val[1];
        this.paddingBottom = val[2];
        this.paddingLeft = val[3];
      }
    }, {
      kind: "get",
      key: "padding",
      value: function value() {
        return [this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft];
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "borderRadius",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "boxSizing",
      value: function value() {
        return 'content-box';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "dashOffset",
      value: function value() {
        return 0;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseStringTransform), (0, _utils.attr)({
        cache: cache,
        value: 'matrix(1,0,0,1,0,0)'
      })],
      key: "transform",
      value: function value(val) {
        var _this3 = this;

        /*
          rotate: 0,
          scale: [1, 1],
          translate: [0, 0],
          skew: [0, 0],
          matrix: [1,0,0,1,0,0],
         */
        Object.assign(this.__attr, {
          rotate: 0,
          scale: [1, 1],
          translate: [0, 0],
          skew: [0, 0]
        });

        if (Array.isArray(val)) {
          this.transformMatrix = val;
          this.set('transform', "matrix(".concat(val, ")"));
        } else {
          this.transformMatrix = [1, 0, 0, 1, 0, 0];
          var transformStr = [];
          Object.entries(val).forEach(function (_ref3) {
            var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            if (key === 'matrix' && Array.isArray(value)) {
              _this3.transformMatrix = new _spriteMath.Matrix(value).m;
            } else {
              _this3[key] = value;
            }

            transformStr.push("".concat(key, "(").concat(value, ")"));
          });
          this.set('transform', transformStr.join(' '));
        }
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat), (0, _utils.attr)({
        cache: cache
      })],
      key: "transformOrigin",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "transformMatrix",
      value: function value() {
        return [1, 0, 0, 1, 0, 0];
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        cache: cache,
        value: 0
      })],
      key: "rotate",
      value: function value(val) {
        var delta = this.rotate - val;
        this.set('rotate', val);
        var transform = new _spriteMath.Matrix(this.transformMatrix).rotate(-delta);
        this.transformMatrix = transform.m;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat, _utils.oneOrTwoValues), (0, _utils.attr)({
        cache: cache,
        value: [1, 1]
      })],
      key: "scale",
      value: function value(val) {
        val = (0, _utils.oneOrTwoValues)(val).map(function (v) {
          if (Math.abs(v) > 0.001) {
            return v;
          }

          return 1 / v > 0 ? 0.001 : -0.001;
        });
        var oldVal = this.scale || [1, 1];
        var delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
        this.set('scale', val);
        var offsetAngle = this.get('offsetAngle');

        if (offsetAngle) {
          this.rotate -= offsetAngle;
        }

        var transform = new _spriteMath.Matrix(this.transformMatrix);
        transform.scale.apply(transform, delta);
        this.transformMatrix = transform.m;

        if (offsetAngle) {
          this.rotate += offsetAngle;
        }
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        cache: cache,
        value: [0, 0]
      })],
      key: "translate",
      value: function value(val) {
        var oldVal = this.translate || [0, 0];
        var delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
        this.set('translate', val);
        var transform = new _spriteMath.Matrix(this.transformMatrix);
        transform.translate.apply(transform, delta);
        this.transformMatrix = transform.m;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        cache: cache,
        value: [0, 0]
      })],
      key: "skew",
      value: function value(val) {
        var _ref5, _transform$multiply;

        var oldVal = this.skew || [0, 0];

        var invm = (_ref5 = new _spriteMath.Matrix()).skew.apply(_ref5, (0, _toConsumableArray2.default)(oldVal)).inverse();

        this.set('skew', val);
        var transform = new _spriteMath.Matrix(this.transformMatrix);

        (_transform$multiply = transform.multiply(invm)).skew.apply(_transform$multiply, (0, _toConsumableArray2.default)(val));

        this.transformMatrix = transform.m;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseInt), (0, _utils.attr)({
        cache: cache,
        value: 0
      })],
      key: "zIndex",
      value: function value(val) {
        this.set('zIndex', val);
        var subject = this.subject;

        if (subject.parent) {
          subject.parent.sortedChildNodes = (0, _utils.sortOrderedSprites)(subject.parent.childNodes);
        }
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "linearGradients",
      value: function value(val)
      /* istanbul ignore next  */
      {
        this.gradients = val;
      }
    }, {
      kind: "get",
      key: "linearGradients",
      value: function value() {
        return this.gradients;
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "gradients",
      value: function value() {
        return {};
      }
    }, {
      kind: "method",
      key: "resetOffset",
      value: function value() {
        var offsetPath = this.offsetPath;
        var dis = this.offsetDistance;

        if (offsetPath) {
          var pathObj = this.loadObj('offsetPath');

          if (pathObj) {
            offsetPath = pathObj;
          } else {
            offsetPath = new _svgPathToCanvas.default(offsetPath);
            this.saveObj('offsetPath', offsetPath);
          }
        }

        if (offsetPath != null) {
          var len = dis * offsetPath.getTotalLength();

          var _offsetPath$getPointA = offsetPath.getPointAtLength(len),
              _offsetPath$getPointA2 = (0, _slicedToArray2.default)(_offsetPath$getPointA, 2),
              x = _offsetPath$getPointA2[0],
              y = _offsetPath$getPointA2[1];

          var angle = this.offsetRotate;

          if (angle === 'auto' || angle === 'reverse') {
            if (angle === 'reverse' && len === 0) {
              len = 1;
            }

            var _offsetPath$getPointA3 = offsetPath.getPointAtLength(angle === 'auto' ? len + 1 : len - 1),
                _offsetPath$getPointA4 = (0, _slicedToArray2.default)(_offsetPath$getPointA3, 2),
                x1 = _offsetPath$getPointA4[0],
                y1 = _offsetPath$getPointA4[1];

            if (x1 === x && y1 === y) {
              // last point
              angle = this.get('offsetAngle');
            } else {
              angle = 180 * Math.atan2(y1 - y, x1 - x) / Math.PI;
            }

            if (this.offsetRotate === 'reverse') {
              angle = -angle;
            }
          }

          var offsetAngle = this.get('offsetAngle');

          if (offsetAngle) {
            this.rotate -= offsetAngle;
          }

          this.set('offsetAngle', angle);
          this.rotate += angle;
          var offsetPoint = this.get('offsetPoint');

          if (offsetPoint) {
            this.pos = [this.x - offsetPoint[0], this.y - offsetPoint[1]];
          }

          this.set('offsetPoint', [x, y]);
          this.pos = [this.x + x, this.y + y];
        }
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        cache: cache
      })],
      key: "offsetPath",
      value: function value(val) {
        var offsetPath = new _svgPathToCanvas.default(val);
        this.set('offsetPath', offsetPath.d);
        this.saveObj('offsetPath', offsetPath);
        this.resetOffset();
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        cache: cache,
        value: 0
      })],
      key: "offsetDistance",
      value: function value(val) {
        this.set('offsetDistance', val);
        this.resetOffset();
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        cache: cache,
        value: 'auto'
      })],
      key: "offsetRotate",
      value: function value(val) {
        if (typeof val === 'string' && val !== 'auto' && val !== 'reverse') {
          val = parseFloat(val);
        }

        this.set('offsetRotate', val);
        this.resetOffset();
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      })],
      key: "filter",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache
      })],
      key: "shadow",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        cache: cache,
        relayout: relayout
      })],
      key: "position",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow,
        relayout: relayout,
        cache: cache
      })],
      key: "marginTop",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow,
        relayout: relayout,
        cache: cache
      })],
      key: "marginRight",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow,
        relayout: relayout,
        cache: cache
      })],
      key: "marginBottom",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
        reflow: reflow,
        relayout: relayout,
        cache: cache
      })],
      key: "marginLeft",
      value: function value() {
        return 0;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseStringInt, _utils.fourValuesShortCut), _utils.attr],
      key: "margin",
      value: function value(val) {
        val = val || [0, 0, 0, 0];
        this.marginTop = val[0];
        this.marginRight = val[1];
        this.marginBottom = val[2];
        this.marginLeft = val[3];
      }
    }, {
      kind: "get",
      key: "margin",
      value: function value() {
        return [this.marginTop, this.marginRight, this.marginBottom, this.marginLeft];
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        value: ''
      })],
      key: "bgimage",
      value: function value(val) {
        if (val && val.clip9) val.clip9 = (0, _utils.fourValuesShortCut)(val.clip9);

        if (val && !val.image && this.subject.loadBgImage) {
          val = this.subject.loadBgImage(val);
        }

        this.set('bgimage', val);
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "clipOverflow",
      value: function value() {
        return true;
      }
    }]
  };
}, _attr.default);

exports.default = SpriteAttr;