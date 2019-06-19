"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _utils = require("../utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _group = _interopRequireDefault(require("../helpers/group"));

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

var _zOrder = Symbol('zOrder'),
    _layoutTag = Symbol('layoutTag');

var reflow = true,
    relayout = true;

var GroupAttr = _decorate(null, function (_initialize, _BaseSprite$Attr) {
  var GroupAttr =
  /*#__PURE__*/
  function (_BaseSprite$Attr2) {
    (0, _inherits2.default)(GroupAttr, _BaseSprite$Attr2);

    function GroupAttr(subject) {
      var _this;

      (0, _classCallCheck2.default)(this, GroupAttr);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GroupAttr).call(this, subject));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      GroupAttr.inits.forEach(function (init) {
        init((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), subject);
      });
      return _this;
    }

    return GroupAttr;
  }(_BaseSprite$Attr);

  return {
    F: GroupAttr,
    d: [{
      kind: "field",
      static: true,
      key: "inits",
      value: function value() {
        return [];
      }
    }, {
      kind: "field",
      decorators: [_utils.attr],
      key: "enableCache",
      value: function value() {
        return 'auto';
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        value: null
      })],
      key: "clip",
      value: function value(val) {
        if (val) {
          val = typeof val === 'string' ? {
            d: val
          } : val;
          this.subject.svg = (0, _utils.createSvgPath)(val);
          this.set('clip', val);
        } else {
          this.subject.svg = null;
          this.set('clip', null);
        }
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        relayout: relayout
      }), (0, _utils.relative)('width')],
      key: "layoutWidth",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        relayout: relayout
      }), (0, _utils.relative)('height')],
      key: "layoutHeight",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        relayout: relayout
      }), (0, _utils.relative)('width')],
      key: "width",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        reflow: reflow,
        relayout: relayout
      }), (0, _utils.relative)('height')],
      key: "height",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.attr)({
        relayout: relayout
      })],
      key: "display",
      value: function value() {
        return '';
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "scrollLeft",
      value: function value() {
        return 0;
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(parseFloat), _utils.attr],
      key: "scrollTop",
      value: function value() {
        return 0;
      }
    }]
  };
}, _basesprite.default.Attr);

var _layout = Symbol('layout');

var Group = _decorate(null, function (_initialize2, _BaseSprite) {
  var Group =
  /*#__PURE__*/
  function (_BaseSprite2) {
    (0, _inherits2.default)(Group, _BaseSprite2);

    function Group() {
      var _this2;

      var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _classCallCheck2.default)(this, Group);
      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Group).call(this, attr));

      _initialize2((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));

      _this2.childNodes = [];
      _this2.sortedChildNodes = [];
      _this2[_zOrder] = 0;
      _this2[_layoutTag] = false;
      _this2.__labelCount = 0;
      return _this2;
    }

    return Group;
  }(_BaseSprite);

  return {
    F: Group,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",
      value: function value() {
        return GroupAttr;
      }
    }, {
      kind: "method",
      static: true,
      key: "applyLayout",
      value: function value(name, layout) {
        this[_layout] = this[_layout] || {};
        var attrs = layout.attrs,
            relayout = layout.relayout;

        if (attrs.init) {
          GroupAttr.inits.push(attrs.init);
        }

        Group.addAttributes(attrs);
        this[_layout][name] = relayout;
      }
    }, {
      kind: "get",
      key: "isVirtual",
      value: function value() {
        var display = this.attr('display');
        if (display !== '' && display !== 'none') return false;
        var parent = this.parent;
        if (parent && parent instanceof Group && !parent.isVirtual) return false;

        var _this$attr = this.attr('border'),
            borderWidth = _this$attr.width,
            borderRadius = this.attr('borderRadius'),
            bgcolor = this.attr('bgcolor'),
            _this$attr2 = this.attr('gradients'),
            bgGradient = _this$attr2.bgcolor,
            _this$attrSize = (0, _slicedToArray2.default)(this.attrSize, 2),
            width = _this$attrSize[0],
            height = _this$attrSize[1],
            _this$attr3 = this.attr('anchor'),
            _this$attr4 = (0, _slicedToArray2.default)(_this$attr3, 2),
            anchorX = _this$attr4[0],
            anchorY = _this$attr4[1],
            bgimage = this.attr('bgimage'),
            _this$attr5 = this.attr('padding'),
            _this$attr6 = (0, _slicedToArray2.default)(_this$attr5, 4),
            paddingTop = _this$attr6[0],
            paddingRight = _this$attr6[1],
            paddingBottom = _this$attr6[2],
            paddingLeft = _this$attr6[3];

        return !anchorX && !anchorY && !width && !height && !borderRadius && !borderWidth && !bgcolor && !bgGradient && !bgimage && !paddingTop && !paddingRight && !paddingBottom && !paddingLeft;
      }
    }, {
      kind: "method",
      key: "connect",
      value: function value(parent) {
        var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var ret = (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "connect", this).call(this, parent, zOrder);
        var labelCount = this.__labelCount;
        var _p = parent;

        while (_p && _p.__labelCount != null) {
          _p.__labelCount += labelCount;
          _p = _p.parent;
        }

        return ret;
      }
    }, {
      kind: "method",
      key: "disconnect",
      value: function value(parent) {
        var ret = (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "disconnect", this).call(this, parent);
        var labelCount = this.__labelCount;
        var _p = parent;

        while (_p && _p.__labelCount != null) {
          _p.__labelCount -= labelCount;
          _p = _p.parent;
        }

        return ret;
      }
    }, {
      kind: "method",
      key: "scrollTo",
      value: function value(x, y) {
        this.attr('scrollLeft', x);
        this.attr('scrollTop', y);
      }
    }, {
      kind: "method",
      key: "scrollBy",
      value: function value(dx, dy) {
        var x = this.attr('scrollLeft'),
            y = this.attr('scrollTop');
        this.scrollTo(x + dx, y + dy);
      }
    }, {
      kind: "method",
      key: "cloneNode",
      value: function value(deepCopy) {
        var node = (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "cloneNode", this).call(this);

        if (deepCopy) {
          var children = this.childNodes;
          children.forEach(function (child) {
            var subNode = child.cloneNode(deepCopy);
            node.append(subNode);
          });
        }

        return node;
      }
    }, {
      kind: "get",
      key: "children",
      value: function value() {
        var children = this.childNodes || [];
        return children.filter(function (child) {
          return child instanceof _basesprite.default;
        });
      }
    }, {
      kind: "method",
      key: "update",
      value: function value(child) {
        child.isDirty = true;
        var attrSize = this.attrSize;

        if (attrSize[0] === '' || attrSize[1] === '') {
          this.reflow();
        }

        this.forceUpdate(true);
      }
    }, {
      kind: "method",
      key: "pointCollision",
      value: function value(evt) {
        if ((0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "pointCollision", this).call(this, evt) || this.isVirtual) {
          if (this.svg) {
            var offsetX = evt.offsetX,
                offsetY = evt.offsetY;
            if (offsetX == null && offsetY == null) return true;
            var rect = this.originalRect;
            evt.isInClip = this.svg.isPointInPath(offsetX - rect[0], offsetY - rect[1]);
          }

          return true;
        }

        return false;
      }
    }, {
      kind: "get",
      decorators: [_utils.flow],
      key: "contentSize",
      value: function value() {
        if (this.isVirtual) return [0, 0];

        var _this$attrSize2 = (0, _slicedToArray2.default)(this.attrSize, 2),
            width = _this$attrSize2[0],
            height = _this$attrSize2[1];

        if (width === '' || height === '') {
          if (this.attr('clip')) {
            var svg = this.svg;
            var bounds = svg.bounds;
            width = width || bounds[2];
            height = height || bounds[3];
          } else {
            var right, bottom;
            right = 0;
            bottom = 0;
            this.childNodes.forEach(function (sprite) {
              if (sprite.attr('display') !== 'none') {
                var renderBox = sprite.renderBox;

                if (renderBox) {
                  right = Math.max(right, renderBox[2]);
                  bottom = Math.max(bottom, renderBox[3]);
                }
              }
            });
            width = width || right;
            height = height || bottom;
          }
        }

        return [width, height];
      }
    }, {
      kind: "method",
      key: "dispatchEvent",
      value: function value(type, evt) {
        var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (swallow && this.getEventHandlers(type).length === 0) {
          return;
        }

        if (!swallow && !evt.terminated && type !== 'mouseenter') {
          var isCollision = collisionState || this.pointCollision(evt);

          if (isCollision || type === 'mouseleave' || !this.attr('clipOverflow')) {
            var scrollLeft = this.attr('scrollLeft'),
                scrollTop = this.attr('scrollTop'),
                borderWidth = this.attr('border').width,
                padding = this.attr('padding');
            var parentX, parentY;
            if ('offsetX' in evt) parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft;
            if ('offsetY' in evt) parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop;
            var _parentX = evt.parentX,
                _parentY = evt.parentY;
            evt.parentX = parentX;
            evt.parentY = parentY;
            var sprites = this.sortedChildNodes.slice(0).reverse();
            var targetSprites = [];

            for (var i = 0; i < sprites.length && evt.isInClip !== false; i++) {
              var sprite = sprites[i];
              var hit = sprite.dispatchEvent(type, evt, collisionState, swallow);

              if (hit) {
                if (evt.targetSprites) {
                  targetSprites.push.apply(targetSprites, (0, _toConsumableArray2.default)(evt.targetSprites));
                  delete evt.targetSprites;
                }

                targetSprites.push(sprite);
              }

              if (evt.terminated && type !== 'mousemove') {
                break;
              }
            }

            evt.targetSprites = targetSprites; // stopDispatch can only terminate event in the same level

            evt.terminated = false;
            evt.parentX = _parentX;
            evt.parentY = _parentY;
            collisionState = isCollision;
          }
        }

        evt.targetSprites = evt.targetSprites || [];

        if (evt.cancelBubble) {
          // stop bubbling
          return false;
        }

        if (evt.targetSprites.length > 0) {
          // bubbling
          collisionState = true;
        }

        return (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow);
      }
    }, {
      kind: "method",
      key: "relayout",
      value: function value() {
        var items = this.childNodes.filter(function (child) {
          if (child.hasLayout) {
            child.attr('layoutWidth', null);
            child.attr('layoutHeight', null);
            child.attr('layoutX', null);
            child.attr('layoutY', null);
          }

          if (child.relayout) {
            var _display = child.attr('display');

            if (_display !== '' && _display !== 'static') {
              child.relayout();
            }
          }

          return child.hasLayout && child.attr('display') !== 'none';
        });
        var display = this.attr('display');
        var doLayout = Group[_layout][display];

        if (doLayout) {
          doLayout(this, items);
        }
      }
    }, {
      kind: "method",
      key: "clearLayout",
      value: function value() {
        this[_layoutTag] = false;
        if (this.hasLayout) this.parent.clearLayout();
      }
    }, {
      kind: "method",
      key: "draw",
      value: function value(t) {
        var drawingContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;
        // must relayout before draw
        // prevent originalRect changing when rendering.
        var display = this.attr('display');

        if (display !== '' && display !== 'static' && !this[_layoutTag]) {
          this.relayout();
          this[_layoutTag] = true;
        }

        return (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "draw", this).call(this, t, drawingContext);
      }
    }, {
      kind: "method",
      key: "render",
      value: function value(t, drawingContext) {
        var clipPath = this.attr('clip');

        if (clipPath) {
          this.svg.beginPath().to(drawingContext);
          drawingContext.clip();
        }

        if (!this.isVirtual) {
          (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "render", this).call(this, t, drawingContext);

          if (this.attr('clipOverflow')) {
            drawingContext.beginPath();
            drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
            drawingContext.clip();
          }
        }

        drawingContext.save();
        var scrollLeft = this.attr('scrollLeft'),
            scrollTop = this.attr('scrollTop');
        drawingContext.translate(-scrollLeft, -scrollTop);
        var sprites = this.sortedChildNodes;

        for (var i = 0; i < sprites.length; i++) {
          var child = sprites[i],
              isDirty = child.isDirty;
          child.isDirty = false;
          child.draw(t, drawingContext);

          if (isDirty) {
            child.dispatchEvent('update', {
              target: child,
              renderTime: t
            }, true, true);
          }
        }

        drawingContext.restore();
      }
    }]
  };
}, _basesprite.default);

exports.default = Group;
Object.assign(Group.prototype, _group.default);