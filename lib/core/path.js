"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _utils = require("../utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; try { Object.defineProperty(def.value, "name", { value: (0, _typeof2.default)(key) === "symbol" ? "" : key, configurable: true }); } catch (ex) {} } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

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

var reflow = true,
    quiet = true;

var PathSpriteAttr = _decorate(null, function (_initialize, _BaseSprite$Attr) {
  var PathSpriteAttr =
  /*#__PURE__*/
  function (_BaseSprite$Attr2) {
    (0, _inherits2.default)(PathSpriteAttr, _BaseSprite$Attr2);

    function PathSpriteAttr() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, PathSpriteAttr);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PathSpriteAttr)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      return _this;
    }

    return PathSpriteAttr;
  }(_BaseSprite$Attr);

  return {
    F: PathSpriteAttr,
    d: [{
      kind: "set",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "path",
      value: function value(val) {
        if (val) {
          val = typeof val === 'string' ? {
            d: val
          } : val;
          this.subject.svg = (0, _utils.createSvgPath)(val);
          this.set('path', val);
        } else {
          this.subject.svg = null;
          this.set('path', null);
        }
      }
    }, {
      kind: "set",
      decorators: [_utils.attr],
      key: "d",
      value: function value(val) {
        if (val) {
          var path = this.path;

          if (!path) {
            this.path = {
              d: val
            };
          } else {
            this.path = Object.assign(path, {
              d: val
            });
          }
        } else {
          this.path = null;
        }
      }
    }, {
      kind: "get",
      key: "d",
      value: function value() {
        return this.path ? this.path.d : null;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat, Math.round), (0, _utils.attr)({
        reflow: reflow
      }), (0, _utils.inherit)(1)],
      key: "lineWidth",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(_utils.parseStringFloat, function (val) {
        return typeof val === 'number' ? [val] : val;
      }), _utils.attr],
      key: "lineDash",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "lineDashOffset",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [_utils.attr, (0, _utils.inherit)('butt')],
      key: "lineCap",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [_utils.attr, (0, _utils.inherit)('miter')],
      key: "lineJoin",
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
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr, (0, _utils.inherit)('')],
      key: "fillColor",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow
      })],
      key: "flexible",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        quiet: quiet
      }), (0, _utils.inherit)('box')],
      key: "bounding",
      value: function value() {
        return 'inherit';
      }
    }, {
      kind: "field",
      decorators: [_utils.attr, (0, _utils.composit)('strokeColor')],
      key: "color",
      value: void 0
    }]
  };
}, _basesprite.default.Attr);

var Path = _decorate(null, function (_initialize2, _BaseSprite) {
  var Path =
  /*#__PURE__*/
  function (_BaseSprite2) {
    (0, _inherits2.default)(Path, _BaseSprite2);

    function Path(attr) {
      var _this2;

      (0, _classCallCheck2.default)(this, Path);

      if (typeof attr === 'string') {
        attr = {
          d: attr
        };
      }

      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(Path).call(this, attr));

      _initialize2((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));

      return _this2;
    }

    return Path;
  }(_BaseSprite);

  return {
    F: Path,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",
      value: function value() {
        return PathSpriteAttr;
      }
    }, {
      kind: "set",
      key: "path",
      value: function value(val) {
        this.attr('path', val);
      }
    }, {
      kind: "get",
      key: "path",
      value: function value() {
        return this.attr('path');
      }
    }, {
      kind: "method",
      key: "getPointAtLength",
      value: function value(length) {
        if (this.svg) {
          return this.svg.getPointAtLength(length);
        }

        return [0, 0];
      }
    }, {
      kind: "method",
      key: "getPathLength",
      value: function value() {
        if (this.svg) {
          return this.svg.getTotalLength();
        }

        return 0;
      }
    }, {
      kind: "method",
      key: "findPath",
      value: function value(offsetX, offsetY) {
        var rect = this.originalRect;
        var pathOffset = this.pathOffset;

        if (this.svg && this.svg.isPointInPath(offsetX - rect[0] - pathOffset[0], offsetY - rect[1] - pathOffset[1])) {
          return [this.svg];
        }

        return [];
      }
    }, {
      kind: "get",
      key: "lineWidth",
      value: function value() {
        var lineWidth = this.attr('lineWidth'),
            gradients = this.attr('gradients'),
            fillColor = this.attr('fillColor'),
            strokeColor = this.attr('strokeColor');
        var hasStrokeColor = strokeColor || gradients && gradients.strokeColor,
            hasFillColor = fillColor || gradients && gradients.fillColor;

        if (!hasStrokeColor && hasFillColor) {
          // fill: ignore stroke
          return 0;
        }

        return lineWidth;
      }
    }, {
      kind: "get",
      key: "pathOffset",
      value: function value() {
        var lw = Math.round(this.lineWidth);
        return [lw, lw];
      }
    }, {
      kind: "get",
      key: "pathSize",
      value: function value() {
        return this.svg ? this.svg.size : [0, 0];
      }
    }, {
      kind: "get",
      decorators: [_utils.flow],
      key: "contentSize",
      value: function value() {
        if (!this.svg) return (0, _get2.default)((0, _getPrototypeOf3.default)(Path.prototype), "contentSize", this);
        var bounds = this.svg.bounds;

        var _this$attrSize = (0, _slicedToArray2.default)(this.attrSize, 2),
            width = _this$attrSize[0],
            height = _this$attrSize[1];

        var pathOffset = this.pathOffset;

        if (width === '') {
          width = bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0];
        }

        if (height === '') {
          height = bounds[3] - Math.min(0, bounds[1]) + 2 * pathOffset[1];
        }

        if (this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
          height = Math.ceil(height * width / (bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0]));
        }

        return [width, height].map(Math.ceil);
      }
    }, {
      kind: "get",
      decorators: [_utils.flow],
      key: "originalRect",
      value: function value() {
        var svg = this.svg;

        if (svg) {
          var bounds = svg.bounds,
              offset = this.pathOffset;

          var _this$offsetSize = (0, _slicedToArray2.default)(this.offsetSize, 2),
              width = _this$offsetSize[0],
              height = _this$offsetSize[1],
              _this$attr = this.attr('anchor'),
              _this$attr2 = (0, _slicedToArray2.default)(_this$attr, 2),
              anchorX = _this$attr2[0],
              anchorY = _this$attr2[1];

          var rect = [0, 0, width, height],
              offsetX = Math.min(0, bounds[0]),
              offsetY = Math.min(0, bounds[1]);
          rect[0] = offsetX - offset[0] - anchorX * (width + offsetX - 2 * offset[0]);
          rect[1] = offsetY - offset[1] - anchorY * (height + offsetY - 2 * offset[1]);
          return rect;
        }

        return (0, _get2.default)((0, _getPrototypeOf3.default)(Path.prototype), "originalRect", this);
      }
    }, {
      kind: "method",
      key: "pointCollision",
      value: function value(evt) {
        if ((0, _get2.default)((0, _getPrototypeOf3.default)(Path.prototype), "pointCollision", this).call(this, evt)) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;
          if (offsetX == null && offsetY == null) return true;
          var svg = this.svg;

          if (svg) {
            var bounds = svg.bounds;
            offsetX += Math.min(0, bounds[0]);
            offsetY += Math.min(0, bounds[1]);
          }

          evt.targetPaths = this.findPath(offsetX, offsetY);

          if (this.attr('bounding') === 'path') {
            return evt.targetPaths.length > 0;
          }

          return true;
        }

        return false;
      }
    }, {
      kind: "method",
      key: "render",
      value: function value(t, drawingContext) {
        (0, _get2.default)((0, _getPrototypeOf3.default)(Path.prototype), "render", this).call(this, t, drawingContext);
        var d = this.attr('d'),
            lineWidth = this.attr('lineWidth'),
            lineCap = this.attr('lineCap'),
            lineJoin = this.attr('lineJoin'),
            lineDash = this.attr('lineDash'),
            flexible = this.attr('flexible');

        if (d) {
          var svg = this.svg;

          var _svg$bounds = (0, _slicedToArray2.default)(svg.bounds, 4),
              ox = _svg$bounds[0],
              oy = _svg$bounds[1],
              ow = _svg$bounds[2],
              oh = _svg$bounds[3];

          var _this$pathOffset = (0, _slicedToArray2.default)(this.pathOffset, 2),
              px = _this$pathOffset[0],
              py = _this$pathOffset[1];

          var _this$contentSize = (0, _slicedToArray2.default)(this.contentSize, 2),
              w = _this$contentSize[0],
              h = _this$contentSize[1];

          if ((w < ow || h < oh) && this.attr('clipOverflow')) {
            drawingContext.beginPath();
            drawingContext.rect(0, 0, w, h);
            drawingContext.clip();
          }

          if (flexible) {
            svg.save();
            var sw = w / (ow - Math.min(0, ox) + 2 * px);
            svg.scale(sw, sw);
            ox *= sw;
            oy *= sw;
            px *= sw;
            py *= sw;
          }

          if (ox < 0 || oy < 0) {
            drawingContext.translate(-Math.min(0, ox), -Math.min(0, oy));
          }

          drawingContext.translate(px, py);
          svg.beginPath().to(drawingContext);

          if (flexible) {
            svg.restore();
          }

          drawingContext.lineWidth = lineWidth;
          drawingContext.lineCap = lineCap;
          drawingContext.lineJoin = lineJoin;

          if (lineDash != null) {
            drawingContext.setLineDash(lineDash);
            var lineDashOffset = this.attr('lineDashOffset');
            drawingContext.lineDashOffset = lineDashOffset;
          }

          var fillColor = (0, _utils.findColor)(drawingContext, this, 'fillColor');

          if (fillColor) {
            drawingContext.fillStyle = fillColor;
          }

          var strokeColor = (0, _utils.findColor)(drawingContext, this, 'strokeColor');

          if (!strokeColor && !fillColor) {
            strokeColor = (0, _utils.parseColorString)('black');
          }

          if (strokeColor) {
            drawingContext.strokeStyle = strokeColor;
          }

          if (fillColor) {
            drawingContext.fill();
          }

          if (strokeColor) {
            drawingContext.stroke();
          }
        }
      }
    }]
  };
}, _basesprite.default);

exports.default = Path;