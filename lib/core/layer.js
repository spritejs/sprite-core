"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _spriteAnimator = require("sprite-animator");

var _fastAnimationFrame = require("../helpers/fast-animation-frame");

var _basenode = _interopRequireDefault(require("./basenode"));

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _batch = _interopRequireDefault(require("./batch"));

var _group = _interopRequireDefault(require("./group"));

var _group2 = _interopRequireDefault(require("../helpers/group"));

var _utils = require("../utils");

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

var _zOrder = Symbol('zOrder'),
    _timeline = Symbol('timeline'),
    _renderDeferer = Symbol('renderDeferrer'),
    _drawTask = Symbol('drawTask'),
    _autoRender = Symbol('autoRender'),
    _adjustTimer = Symbol('adjustTimer');

var LayerAttr = _decorate(null, function (_initialize, _BaseNode$Attr) {
  var LayerAttr =
  /*#__PURE__*/
  function (_BaseNode$Attr2) {
    (0, _inherits2.default)(LayerAttr, _BaseNode$Attr2);

    function LayerAttr(subject) {
      var _this;

      (0, _classCallCheck2.default)(this, LayerAttr);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LayerAttr).call(this, subject));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      _this.setDefault({
        bgcolor: ''
      });

      return _this;
    }

    return LayerAttr;
  }(_BaseNode$Attr);

  return {
    F: LayerAttr,
    d: [{
      kind: "set",
      decorators: [(0, _utils.parseValue)(_utils.parseColorString), _utils.attr],
      key: "bgcolor",
      value: function value(val) {
        this.set('bgcolor', val);
        var subject = this.subject;

        if (subject.canvas && subject.canvas.style) {
          if (val != null) {
            this.quietSet('canvasBgColor', subject.canvas.style.backgroundColor);
            subject.canvas.style.backgroundColor = val;
          } else {
            subject.canvas.style.backgroundColor = this.get('canvasBgColor');
          }
        }
      }
    }]
  };
}, _basenode.default.Attr);

var Layer =
/*#__PURE__*/
function (_BaseNode) {
  (0, _inherits2.default)(Layer, _BaseNode);

  function Layer() {
    var _this2;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        context = _ref.context,
        _ref$evaluateFPS = _ref.evaluateFPS,
        evaluateFPS = _ref$evaluateFPS === void 0 ? false : _ref$evaluateFPS,
        _ref$renderMode = _ref.renderMode,
        renderMode = _ref$renderMode === void 0 ? 'repaintAll' : _ref$renderMode,
        _ref$autoRender = _ref.autoRender,
        autoRender = _ref$autoRender === void 0 ? true : _ref$autoRender,
        _ref$useDocumentCSS = _ref.useDocumentCSS,
        useDocumentCSS = _ref$useDocumentCSS === void 0 ? false : _ref$useDocumentCSS;

    (0, _classCallCheck2.default)(this, Layer);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Layer).call(this));
    _this2[_autoRender] = autoRender; // renderMode: repaintAll | repaintDirty

    if (renderMode === 'repaintDirty') {
      (0, _utils.setDeprecation)('renderRepaintDirty');
    }

    if (evaluateFPS !== false) {
      (0, _utils.setDeprecation)('evaluateFPS');
    }

    _this2.outputContext = context;
    if (context.canvas) context.canvas.layer_ = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2));
    _this2.childNodes = [];
    _this2.sortedChildNodes = [];
    _this2[_zOrder] = 0;
    _this2[_timeline] = new _spriteAnimator.Timeline(_fastAnimationFrame.timeline);
    _this2[_renderDeferer] = null;
    _this2.touchedTargets = {}; // auto release

    /* istanbul ignore if  */

    if (context.canvas && context.canvas.addEventListener) {
      context.canvas.addEventListener('DOMNodeRemovedFromDocument', function () {
        var _this3;

        _this2._savePlaybackRate = _this2.timeline.playbackRate;
        _this2._saveChildren = (0, _toConsumableArray2.default)(_this2.childNodes);

        (_this3 = _this2).remove.apply(_this3, (0, _toConsumableArray2.default)(_this2.childNodes));

        _this2.timeline.playbackRate = 0;
      });
      context.canvas.addEventListener('DOMNodeInsertedIntoDocument', function () {
        if (_this2._saveChildren) {
          var _this4;

          _this2.timeline.playbackRate = _this2._savePlaybackRate;

          (_this4 = _this2).append.apply(_this4, (0, _toConsumableArray2.default)(_this2._saveChildren));

          delete _this2._saveChildren;
        }
      });
    }

    if (useDocumentCSS) {
      _this2.fromDocumentCSS();
    }

    return _this2;
  }

  (0, _createClass2.default)(Layer, [{
    key: "fromDocumentCSS",
    value: function fromDocumentCSS() {// stylesheet.fromDocumentCSS();
    }
  }, {
    key: "clearContext",
    value: function clearContext() {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.outputContext;

      if (context.canvas) {
        var _context$canvas = context.canvas,
            width = _context$canvas.width,
            height = _context$canvas.height;
        context.clearRect(0, 0, width, height);
      }
    }
  }, {
    key: "prepareRender",
    value: function prepareRender() {
      var _this5 = this;

      if (!this[_renderDeferer]) {
        this[_renderDeferer] = {};
        this[_renderDeferer].promise = new Promise(function (resolve, reject) {
          Object.assign(_this5[_renderDeferer], {
            resolve: resolve,
            reject: reject
          });

          if (_this5.autoRender) {
            _this5[_drawTask] = (0, _fastAnimationFrame.requestAnimationFrame)(function () {
              delete _this5[_drawTask];

              _this5.draw();
            });
          }
        }); // .catch(ex => console.error(ex.message))
      }

      return this[_renderDeferer] ? this[_renderDeferer].promise : Promise.resolve();
    }
  }, {
    key: "forceUpdate",
    value: function forceUpdate() {
      return this.prepareRender();
    }
  }, {
    key: "restyle",
    value: function restyle() {
      var bgcolor = this.style.bgcolor;
      (0, _get2.default)((0, _getPrototypeOf2.default)(Layer.prototype), "restyle", this).call(this);

      if (bgcolor) {
        var color = this.attr('bgcolor');

        if (color !== bgcolor && this.canvas && this.canvas.style) {
          this.canvas.style = color;
        }
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var clearContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      // if(this.__styleNeedUpdate) {
      //   stylesheet.computeStyle(this);
      // }
      (0, _get2.default)((0, _getPrototypeOf2.default)(Layer.prototype), "draw", this).call(this);
      var renderDeferrer = this[_renderDeferer];
      this[_renderDeferer] = null;

      if (this[_drawTask]) {
        (0, _fastAnimationFrame.cancelAnimationFrame)(this[_drawTask]);
        delete this[_drawTask];
      }

      var currentTime = this.timeline.currentTime;
      this.repaint(currentTime, clearContext);
      (0, _get2.default)((0, _getPrototypeOf2.default)(Layer.prototype), "dispatchEvent", this).call(this, 'update', {
        target: this,
        timeline: this.timeline,
        renderTime: currentTime
      }, true, true);

      if (renderDeferrer) {
        renderDeferrer.resolve();
      }
    }
  }, {
    key: "update",
    value: function update(target) {
      if (target && target.isDirty) return;

      if (target) {
        target.isDirty = true;
      }

      this.prepareRender();
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      if (this.canvas) {
        return this.canvas.width > 0 && this.canvas.height > 0;
      }

      return true;
    }
  }, {
    key: "drawSprites",
    value: function drawSprites(renderEls, t) {
      if (this.beforeDrawTransform) {
        this.outputContext.save();
        this.beforeDrawTransform();
      }

      for (var i = 0; i < renderEls.length; i++) {
        var child = renderEls[i],
            isDirty = child.isDirty;
        child.isDirty = false;

        if (child.parent === this) {
          child.draw(t);

          if (isDirty) {
            child.dispatchEvent('update', {
              target: child,
              renderTime: t
            }, true, true);
          }
        }
      }

      if (this.beforeDrawTransform) {
        this.outputContext.restore();
      }
    }
  }, {
    key: "repaint",
    value: function repaint(t) {
      var clearContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var renderEls = this.sortedChildNodes;
      var outputContext = this.outputContext;
      if (clearContext) this.clearContext(outputContext);
      this.drawSprites(renderEls, t);
    }
  }, {
    key: "pointCollision",
    value: function pointCollision(evt) {
      if (this.outputContext.canvas) {
        var layerX = evt.layerX,
            layerY = evt.layerY;
        var _this$outputContext$c = this.outputContext.canvas,
            width = _this$outputContext$c.width,
            height = _this$outputContext$c.height;

        if (layerX == null && layerY == null || layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
          return true;
        }

        return false;
      }
      /* istanbul ignore next  */


      return true;
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(type, evt) {
      var _this6 = this;

      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (swallow && this.getEventHandlers(type).length === 0) {
        return;
      }

      if (!swallow && !evt.terminated && type !== 'mouseenter') {
        var isCollision = collisionState || this.pointCollision(evt);
        var changedTouches = evt.originalEvent && evt.originalEvent.changedTouches;

        if (changedTouches && (type === 'touchend' || type === 'touchmove')) {
          isCollision = true;
        }

        if (isCollision || type === 'mouseleave') {
          var sprites = this.sortedChildNodes.slice(0).reverse(),
              targetSprites = [];

          if (changedTouches && (type === 'touchend' || type === 'touchmove')) {
            var touch = changedTouches[0];

            if (touch && touch.identifier != null) {
              var targets = this.layer.touchedTargets[touch.identifier];

              if (targets) {
                targets.forEach(function (target) {
                  if (target !== _this6 && target.layer === _this6) {
                    var _target$getParentXY = target.getParentXY(evt.layerX, evt.layerY),
                        _target$getParentXY2 = (0, _slicedToArray2.default)(_target$getParentXY, 2),
                        parentX = _target$getParentXY2[0],
                        parentY = _target$getParentXY2[1];

                    var _parentX = evt.parentX;
                    var _parentY = evt.parentY;
                    evt.parentX = parentX;
                    evt.parentY = parentY;
                    target.dispatchEvent(type, evt, true, true);
                    evt.parentX = _parentX;
                    evt.parentY = _parentY;
                  }
                });
                if (type === 'touchend') delete this.layer.touchedTargets[touch.identifier];
              }
            }
          } else {
            for (var i = 0; i < sprites.length; i++) {
              var sprite = sprites[i];
              var hit = sprite.dispatchEvent(type, evt, collisionState, swallow);

              if (hit) {
                if (evt.targetSprites) {
                  targetSprites.push.apply(targetSprites, (0, _toConsumableArray2.default)(evt.targetSprites));
                  delete evt.targetSprites;
                } // detect mouseenter/mouseleave


                targetSprites.push(sprite);
              }

              if (evt.terminated && type !== 'mousemove') {
                break;
              }
            }
          }

          evt.targetSprites = targetSprites; // stopDispatch can only terminate event in the same level

          evt.terminated = false;
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

      var layerX = evt.layerX,
          layerY = evt.layerY;

      if (layerX != null && layerY != null) {
        evt.offsetX = layerX + this.offset[0];
        evt.offsetY = layerY + this.offset[1];
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(Layer.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: "group",
    value: function group() {
      var group = new _group.default();
      group.append.apply(group, arguments);
      this.appendChild(group);
      return group;
    }
  }, {
    key: "batch",
    value: function batch() {
      var _this7 = this;

      for (var _len = arguments.length, sprites = new Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      sprites.forEach(function (sprite) {
        if (sprite.layer !== _this7) {
          _this7.appendChild(sprite);
        }
      });
      var batch = new _batch.default(this);
      batch.add.apply(batch, sprites);
      return batch;
    }
  }, {
    key: "adjust",
    value: function adjust(handler)
    /* istanbul ignore next  */
    {
      var _this8 = this;

      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!update) return;
      var outputContext = this.outputContext;
      var shadowContext = this.adjustContext || outputContext.canvas.cloneNode().getContext('2d');

      if (!this[_adjustTimer]) {
        this.autoRender = false;
        shadowContext.clearRect(0, 0, shadowContext.canvas.width, shadowContext.canvas.height);
        shadowContext._clearTag = false;
        shadowContext.drawImage(outputContext.canvas, 0, 0);
        this.adjustContext = shadowContext;
      } else {
        clearTimeout(this[_adjustTimer]);
      }

      this[_adjustTimer] = setTimeout(function () {
        _this8.autoRender = true;
        delete _this8[_adjustTimer];
      }, 100);

      if (shadowContext.canvas.width > 0 && shadowContext.canvas.height > 0) {
        this.clearContext(outputContext);
        outputContext.save();
        handler.call(this, outputContext);
        outputContext.drawImage(shadowContext.canvas, 0, 0);
        outputContext.restore();
      }
    }
  }, {
    key: "resolution",
    get: function get() {
      return [this.canvas.width, this.canvas.height];
    }
  }, {
    key: "autoRender",
    set: function set(value) {
      this[_autoRender] = value;

      if (value) {
        this.draw();
      }
    },
    get: function get() {
      return this[_autoRender];
    }
  }, {
    key: "layer",
    get: function get() {
      return this;
    }
  }, {
    key: "children",
    get: function get() {
      return this.childNodes.filter(function (child) {
        return child instanceof _basesprite.default;
      });
    }
  }, {
    key: "timeline",
    get: function get() {
      return this[_timeline];
    }
  }, {
    key: "context",
    get: function get() {
      return this.outputContext;
    }
  }, {
    key: "canvas",
    get: function get() {
      return this.outputContext && this.outputContext.canvas;
    }
  }, {
    key: "offset",
    get: function get() {
      return [0, 0];
    }
  }]);
  return Layer;
}(_basenode.default);

exports.default = Layer;
(0, _defineProperty2.default)(Layer, "Attr", LayerAttr);
Object.assign(Layer.prototype, _group2.default);