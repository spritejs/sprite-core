"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _set2 = _interopRequireDefault(require("@babel/runtime/helpers/set"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _utils = require("../utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _filters = _interopRequireDefault(require("./filters"));

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

var _texturesCache = Symbol('_texturesCache');

var _images = Symbol('_images');

var TextureAttr = _decorate(null, function (_initialize, _BaseSprite$Attr) {
  var TextureAttr =
  /*#__PURE__*/
  function (_BaseSprite$Attr2) {
    (0, _inherits2.default)(TextureAttr, _BaseSprite$Attr2);

    function TextureAttr() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, TextureAttr);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TextureAttr)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      return _this;
    }

    return TextureAttr;
  }(_BaseSprite$Attr);

  return {
    F: TextureAttr,
    d: [{
      kind: "field",
      decorators: [_utils.attr],
      key: "enableCache",
      value: function value() {
        return true;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        value: []
      })],
      key: "textures",
      value: function value(textures) {
        if (!Array.isArray(textures)) {
          textures = [textures];
        }

        textures = textures.map(function (texture) {
          if (!texture.image) {
            texture = {
              image: texture
            };
          }

          texture.__tag = (0, _utils.generateID)(texture.image); // prevent JSON.stringify ignorance

          return texture;
        });
        this.loadTextures(textures);
        this.set('textures', textures);
      }
    }, {
      kind: "method",
      key: "loadTextures",
      value: function value(textures) {
        var subject = this.subject; // adaptive textures

        var width = 0,
            height = 0;
        subject.images = textures.map(function (texture) {
          var image = texture.image,
              rect = texture.rect,
              srcRect = texture.srcRect;
          var w, h;

          if (rect) {
            w = rect[2] + rect[0];
            h = rect[3] + rect[1];
          } else if (srcRect) {
            w = srcRect[2];
            h = srcRect[3];
          } else {
            w = image.width;
            h = image.height;
          }

          if (width < w) {
            width = w;
          }

          if (height < h) {
            height = h;
          }

          delete texture.image;
          return image;
        });
        var texturesSize = subject.texturesSize;

        if (!texturesSize || texturesSize[0] !== width || texturesSize[1] !== height) {
          var attrSize = subject.attrSize;

          if (attrSize[0] === '' || attrSize[1] === '') {
            subject.reflow();
            subject.clearLayout();
          }
        }

        subject.texturesSize = [width, height];
        return textures;
      }
    }]
  };
}, _basesprite.default.Attr);

var Sprite = _decorate(null, function (_initialize2, _BaseSprite) {
  var Sprite =
  /*#__PURE__*/
  function (_BaseSprite2) {
    (0, _inherits2.default)(Sprite, _BaseSprite2);

    /**
      new Sprite({
        attr: {
          ...
        },
        attributeChangedCallback: function(prop, oldValue, newValue){
         }
      })
     */
    function Sprite(attr) {
      var _this2;

      (0, _classCallCheck2.default)(this, Sprite);

      if (attr && attr.constructor !== Object) {
        attr = {
          textures: [attr]
        };
      }

      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(Sprite).call(this));

      _initialize2((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));

      _this2[_texturesCache] = new Map();

      if (attr) {
        _this2.attr(attr);
      }

      return _this2;
    }

    return Sprite;
  }(_BaseSprite);

  return {
    F: Sprite,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",
      value: function value() {
        return TextureAttr;
      }
    }, {
      kind: "method",
      key: "cloneNode",
      value: function value() {
        var _this3 = this;

        var node = (0, _get2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "cloneNode", this).call(this);

        if (this.images) {
          node.textures = this.textures.map(function (texture, i) {
            texture.image = _this3.images[i];
            return texture;
          });
        }

        return node;
      }
    }, {
      kind: "set",
      key: "images",
      value: function value(images) {
        this[_images] = images;
      }
    }, {
      kind: "get",
      key: "images",
      value: function value() {
        return this[_images];
      }
    }, {
      kind: "set",
      key: "textures",
      value: function value(textures) {
        this.attr('textures', textures);
      }
    }, {
      kind: "get",
      key: "textures",
      value: function value() {
        return this.attr('textures');
      }
    }, {
      kind: "get",
      decorators: [_utils.flow],
      key: "contentSize",
      value: function value() {
        var _this$attrSize = (0, _slicedToArray2.default)(this.attrSize, 2),
            width = _this$attrSize[0],
            height = _this$attrSize[1];

        var boxSize = this.texturesSize || [0, 0];
        var w = width,
            h = height;

        if (width === '') {
          w = boxSize[0] | 0;

          if (height !== '' && boxSize[1]) {
            w *= height / boxSize[1];
          }
        }

        if (height === '') {
          h = boxSize[1] | 0;

          if (width !== '' && boxSize[0]) {
            h *= width / boxSize[0];
          }
        }

        return [w, h];
      }
    }, {
      kind: "method",
      key: "pointCollision",
      value: function value(evt) {
        var _this4 = this;

        if ((0, _get2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "pointCollision", this).call(this, evt)) {
          var textures = this.textures;

          if (textures) {
            var offsetX = evt.offsetX,
                offsetY = evt.offsetY;
            if (offsetX == null && offsetY == null) return true;
            evt.targetTextures = [];

            var _this$attr = this.attr('anchor'),
                _this$attr2 = (0, _slicedToArray2.default)(_this$attr, 2),
                anchorX = _this$attr2[0],
                anchorY = _this$attr2[1],
                _this$contentSize = (0, _slicedToArray2.default)(this.contentSize, 2),
                width = _this$contentSize[0],
                height = _this$contentSize[1];

            offsetX += width * anchorX;
            offsetY += height * anchorY;
            textures.forEach(function (texture) {
              var _ref = texture.rect || [0, 0].concat((0, _toConsumableArray2.default)(_this4.innerSize)),
                  _ref2 = (0, _slicedToArray2.default)(_ref, 4),
                  x = _ref2[0],
                  y = _ref2[1],
                  w = _ref2[2],
                  h = _ref2[3];

              if (offsetX >= x && offsetX - x < w && offsetY >= y && offsetY - y < h) {
                // touched textures
                evt.targetTextures.push(texture);
              }
            });
          }

          return true;
        }

        return false;
      }
    }, {
      kind: "get",
      key: "cache",
      value: function value() {
        var bg = this.attr('bgcolor') || this.attr('gradients').bgcolor;

        if (!bg && this.textures.length <= 1) {
          return false;
        }

        return (0, _get2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "cache", this);
      }
    }, {
      kind: "set",
      key: "cache",
      value: function value(context) {
        (0, _set2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "cache", context, this, true);
      }
    }, {
      kind: "method",
      key: "render",
      value: function value(t, drawingContext) {
        var _this5 = this;

        (0, _get2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "render", this).call(this, t, drawingContext);
        var textures = this.textures;
        var cliped = !this.attr('clipOverflow');

        if (this.images && this.images.length) {
          textures.forEach(function (texture, i) {
            var img = _this5.images[i];

            var _this5$contentSize = (0, _slicedToArray2.default)(_this5.contentSize, 2),
                w = _this5$contentSize[0],
                h = _this5$contentSize[1];

            var rect = texture.rect || [0, 0, w, h];
            var srcRect = texture.srcRect;

            if (!cliped && texture.rect && (rect[2] > w || rect[3] > h)) {
              cliped = true;
              drawingContext.beginPath();
              drawingContext.rect(0, 0, w, h);
              drawingContext.clip();
            }

            drawingContext.save();

            if (texture.filter) {
              (0, _utils.setDeprecation)('texture.filter', 'Instead use sprite.attr({filter}).');
              var imgRect = srcRect ? [0, 0, srcRect[2], srcRect[3]] : [0, 0, img.width, img.height];
              var sx = rect[2] / imgRect[2],
                  sy = rect[3] / imgRect[3];
              drawingContext.filter = _filters.default.compile(texture.filter);

              if (srcRect) {
                drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray2.default)(srcRect), [sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * srcRect[2], sy * srcRect[3]]));
              } else {
                drawingContext.drawImage(img, sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * img.width, sy * img.height);
              }
            } else if (srcRect) {
              drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray2.default)(srcRect), (0, _toConsumableArray2.default)(rect)));
            } else {
              drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray2.default)(rect)));
            }

            drawingContext.restore();
          });
        }
      }
    }]
  };
}, _basesprite.default);

exports.default = Sprite;