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

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _utils = require("../utils");

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

var _attr = Symbol('attr'),
    _style = Symbol('style'),
    _temp = Symbol('store'),
    _subject = Symbol('subject'),
    _default = Symbol('default');

var Attr = _decorate(null, function (_initialize) {
  var Attr = function Attr(subject) {
    (0, _classCallCheck2.default)(this, Attr);

    _initialize(this);

    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this[_style] = {};
    this.__cached = {};
    if (!subject.updateStyles) subject.updateStyles = function () {};
    this[_temp] = new Map(); // save non-serialized values

    Object.defineProperty(this, '__attributesSet', {
      value: new Set()
    });
    Object.defineProperty(this, '__styleTag', {
      writable: true,
      value: false
    });
    Object.defineProperty(this, '__updateTag', {
      writable: true,
      value: false
    });
  };

  return {
    F: Attr,
    d: [{
      kind: "field",
      static: true,
      key: "relatedAttributes",
      value: function value() {
        return _utils.relatedAttributes;
      }
    }, {
      kind: "field",
      static: true,
      key: "attributeNames",
      value: function value() {
        return _utils.attributeNames;
      }
    }, {
      kind: "method",
      static: true,
      key: "addAttributes",
      value: function value(attrs) {
        var descriptors = {};
        Object.entries(attrs).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              key = _ref2[0],
              v = _ref2[1];

          if (typeof v === 'function') {
            var _setter = v;
            v = {
              set: function set(val) {
                _setter(this, val);
              }
            };
          }

          var _v = v,
              wrappers = _v.decorators,
              value = _v.value,
              get = _v.get,
              set = _v.set;
          wrappers = wrappers || [_utils.attr];

          if (set == null) {
            set = function set(val) {
              this.set(key, val);
            };
          }

          if (get == null) {
            get = function get() {
              return this.get(key);
            };
          }

          var $decorator = _utils.decorators.apply(void 0, (0, _toConsumableArray2.default)(wrappers));

          descriptors[key] = $decorator(key, value, {
            set: set,
            get: get
          });
        });
        Object.defineProperties(this.prototype, descriptors);
      }
    }, {
      kind: "get",
      key: "__attr",
      value: function value() {
        return this[_attr];
      }
    }, {
      kind: "method",
      key: "setDefault",
      value: function value(attrs) {
        Object.assign(this[_default], attrs);
      }
    }, {
      kind: "method",
      key: "getDefaultValue",
      value: function value(key, defaultValue) {
        if (key in this[_default]) return this[_default][key];
        return defaultValue;
      }
    }, {
      kind: "method",
      key: "saveObj",
      value: function value(key, val) {
        this[_temp].set(key, val);

        this.__updateTag = true;
      }
    }, {
      kind: "method",
      key: "loadObj",
      value: function value(key) {
        return this[_temp].get(key);
      }
    }, {
      kind: "method",
      key: "quietSet",
      value: function value(key, val) {
        this.set(key, val, true);
      }
    }, {
      kind: "method",
      key: "clearStyle",
      value: function value() {
        this[_style] = {};
      }
    }, {
      kind: "method",
      key: "clearLayout",
      value: function value() {
        this.__clearLayout = true;
        return this;
      }
    }, {
      kind: "get",
      key: "style",
      value: function value() {
        return this[_style];
      }
    }, {
      kind: "method",
      key: "set",
      value: function value(key, val) {
        var isQuiet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        this.__quietTag = isQuiet;
        var oldVal;

        if (isQuiet && key.length > 5 && key.indexOf('data-') === 0) {
          var dataKey = key.slice(5);
          oldVal = this.subject.data(dataKey);
          this.subject.data(dataKey, val);
        } else if (this.__styleTag) {
          oldVal = this[_style][key];

          if (val != null) {
            this[_style][key] = val;
          } else {
            delete this[_style][key];
          }
        } else {
          oldVal = this[_attr][key];
        }

        if (val && (0, _typeof2.default)(val) === 'object') {
          if (oldVal !== val && JSON.stringify(val) === JSON.stringify(oldVal)) {
            return false;
          }
        } else if (oldVal === val) {
          return false;
        }

        if (!this.__styleTag) {
          this[_attr][key] = val;
        }

        this.__updateTag = true;
        return true;
      }
    }, {
      kind: "method",
      key: "get",
      value: function value(key) {
        if (key.length > 5 && key.indexOf('data-') === 0) {
          return this.subject.data(key.slice(5));
        }

        if (this.__getStyleTag || this[_style][key] != null && !this.__attributesSet.has(key)) {
          return this[_style][key];
        }

        return this[_attr][key];
      }
    }, {
      kind: "method",
      key: "getAttributes",
      value: function value() {
        var _this = this;

        var includeDefault = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var ret = {};

        if (includeDefault) {
          (0, _toConsumableArray2.default)(_utils.attributeNames).forEach(function (key) {
            if (key in _this) {
              ret[key] = _this[key];
            }
          });
        }

        (0, _toConsumableArray2.default)(this.__attributesSet).forEach(function (key) {
          if (key.indexOf('__internal') !== 0) {
            ret[key] = _this[key];
          }
        });
        Object.entries(this).forEach(function (_ref3) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];

          if (key.indexOf('__') !== 0) {
            ret[key] = value;
          }
        });
        return ret;
      }
    }, {
      kind: "get",
      key: "attrs",
      value: function value() {
        return this.getAttributes(true);
      }
    }, {
      kind: "method",
      decorators: [(0, _utils.deprecate)('You can remove this call.')],
      key: "clearCache",
      value: function value() {
        return this;
      }
    }, {
      kind: "method",
      key: "merge",
      value: function value(attrs) {
        var _this2 = this;

        if (typeof attrs === 'string') {
          attrs = JSON.parse(attrs);
        }

        Object.entries(attrs).forEach(function (_ref5) {
          var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];

          _this2.subject.attr(key, value);
        });
        return this;
      }
    }, {
      kind: "method",
      key: "serialize",
      value: function value() {
        var attrs = this.getAttributes();
        delete attrs.id;
        return JSON.stringify(attrs);
      }
    }, {
      kind: "get",
      key: "subject",
      value: function value() {
        return this[_subject];
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(String), (0, _utils.attr)({
        quiet: true
      })],
      key: "id",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(String), (0, _utils.attr)({
        quiet: true
      })],
      key: "name",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(String), (0, _utils.attr)({
        quiet: true
      })],
      key: "class",
      value: void 0
    }]
  };
});

exports.default = Attr;