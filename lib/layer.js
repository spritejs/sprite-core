'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _spriteAnimator = require('sprite-animator');

var _fastAnimationFrame = require('./helpers/fast-animation-frame');

var _basenode = require('./basenode');

var _basenode2 = _interopRequireDefault(_basenode);

var _datanode = require('./datanode');

var _datanode2 = _interopRequireDefault(_datanode);

var _batch = require('./batch');

var _batch2 = _interopRequireDefault(_batch);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _nodetype = require('./nodetype');

var _dirtyCheck = require('./helpers/dirty-check');

var _group3 = require('./helpers/group');

var _group4 = _interopRequireDefault(_group3);

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _updateSet = (0, _symbol2.default)('updateSet'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _tRecord = (0, _symbol2.default)('tRecord'),
    _timeline = (0, _symbol2.default)('timeline'),
    _renderDeferer = (0, _symbol2.default)('renderDeferrer'),
    _drawTask = (0, _symbol2.default)('drawTask'),
    _autoRender = (0, _symbol2.default)('autoRender'),
    _adjustTimer = (0, _symbol2.default)('adjustTimer'),
    _node = (0, _symbol2.default)('node');

var Layer = function (_BaseNode) {
  (0, _inherits3.default)(Layer, _BaseNode);

  function Layer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        context = _ref.context,
        _ref$handleEvent = _ref.handleEvent,
        handleEvent = _ref$handleEvent === undefined ? true : _ref$handleEvent,
        _ref$evaluateFPS = _ref.evaluateFPS,
        evaluateFPS = _ref$evaluateFPS === undefined ? false : _ref$evaluateFPS,
        _ref$renderMode = _ref.renderMode,
        renderMode = _ref$renderMode === undefined ? 'repaintAll' : _ref$renderMode,
        _ref$autoRender = _ref.autoRender,
        autoRender = _ref$autoRender === undefined ? true : _ref$autoRender,
        _ref$useDocumentCSS = _ref.useDocumentCSS,
        useDocumentCSS = _ref$useDocumentCSS === undefined ? false : _ref$useDocumentCSS;

    (0, _classCallCheck3.default)(this, Layer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layer.__proto__ || (0, _getPrototypeOf2.default)(Layer)).call(this));

    _this.handleEvent = handleEvent;
    _this.evaluateFPS = evaluateFPS;
    _this[_autoRender] = autoRender;

    // renderMode: repaintAll | repaintDirty
    _this.renderMode = renderMode;

    _this.outputContext = context;

    if (context.canvas) context.canvas.layer_ = _this;

    _this.childNodes = [];
    _this.sortedChildNodes = [];
    _this[_updateSet] = new _set2.default();
    _this[_zOrder] = 0;
    _this[_tRecord] = []; // calculate FPS
    _this[_timeline] = new _spriteAnimator.Timeline(_fastAnimationFrame.timeline);
    _this[_renderDeferer] = null;

    _this[_node] = new _datanode2.default();
    _this[_node].__owner = _this;
    _this[_node].forceUpdate = function () {
      _this.prepareRender();
    };
    _this[_node].updateStyles = function () {
      _this.__updateStyleTag = true;
      _this.prepareRender();
    };

    _this.touchedTargets = {};

    // auto release
    /* istanbul ignore if  */
    if (context.canvas && context.canvas.addEventListener) {
      context.canvas.addEventListener('DOMNodeRemovedFromDocument', function () {
        _this._savePlaybackRate = _this.timeline.playbackRate;
        _this._saveChildren = [].concat((0, _toConsumableArray3.default)(_this.childNodes));
        _this.remove.apply(_this, (0, _toConsumableArray3.default)(_this.childNodes));
        _this.timeline.playbackRate = 0;
      });
      context.canvas.addEventListener('DOMNodeInsertedIntoDocument', function () {
        if (_this._saveChildren) {
          _this.timeline.playbackRate = _this._savePlaybackRate;
          _this.append.apply(_this, (0, _toConsumableArray3.default)(_this._saveChildren));
          delete _this._saveChildren;
        }
      });
    }
    if (useDocumentCSS) {
      _stylesheet2.default.fromDocumentCSS();
    }
    return _this;
  }

  (0, _createClass3.default)(Layer, [{
    key: 'attr',
    value: function attr() {
      var _node2;

      return (_node2 = this[_node]).attr.apply(_node2, arguments);
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(prop) {
      /* istanbul ignore next */
      return this.attr(prop);
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(prop, val) {
      /* istanbul ignore next */
      return this.attr(prop, val);
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(prop) {
      /* istanbul ignore next */
      return this.attr(prop, null);
    }
  }, {
    key: 'clearContext',
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
    key: 'prepareRender',
    value: function prepareRender() {
      var _this2 = this;

      if (!this[_renderDeferer]) {
        this[_renderDeferer] = {};
        this[_renderDeferer].promise = new _promise2.default(function (resolve, reject) {
          (0, _assign2.default)(_this2[_renderDeferer], { resolve: resolve, reject: reject });
          if (_this2.autoRender) {
            _this2[_drawTask] = (0, _fastAnimationFrame.requestAnimationFrame)(function () {
              delete _this2[_drawTask];
              _this2.draw();
            });
          }
        });
        // .catch(ex => console.error(ex.message))
      }
      return this[_renderDeferer] ? this[_renderDeferer].promise : _promise2.default.resolve();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var clearContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.__updateStyleTag) {
        if (_stylesheet2.default.cssRules.length > 0) {
          var nodes = this.querySelectorAll('*');
          _stylesheet2.default.computeStyle(this);
          nodes.forEach(function (node) {
            _stylesheet2.default.computeStyle(node);
          });
        }
        this.__updateStyleTag = false;
      }
      var renderDeferrer = this[_renderDeferer];
      this[_renderDeferer] = null;
      if (this[_drawTask]) {
        (0, _fastAnimationFrame.cancelAnimationFrame)(this[_drawTask]);
        delete this[_drawTask];
      }
      /* istanbul ignore if  */
      if (this.evaluateFPS) {
        this[_tRecord].push(Date.now());
        this[_tRecord] = this[_tRecord].slice(-10);
      }

      var renderer = void 0;
      if (this.renderMode === 'repaintDirty') {
        renderer = this.renderRepaintDirty.bind(this);
      } else if (this.renderMode === 'repaintAll') {
        renderer = this.renderRepaintAll.bind(this);
      } else {
        /* istanbul ignore next  */
        throw new Error('unknown render mode!');
      }
      var currentTime = this.timeline.currentTime;
      renderer(currentTime, clearContext);

      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this).call(this, 'update', { target: this, timeline: this.timeline, renderTime: currentTime }, true, true);

      if (renderDeferrer) {
        renderDeferrer.resolve();
      }
    }
  }, {
    key: 'update',
    value: function update(target) {
      if (target && target.isDirty) return;
      if (target) {
        this[_updateSet].add(target);
        target.isDirty = true;
      }
      this.prepareRender();
    }
  }, {
    key: 'isVisible',
    value: function isVisible() {
      if (this.canvas) {
        return this.canvas.width > 0 && this.canvas.height > 0;
      }
      return true;
    }
  }, {
    key: 'drawSprites',
    value: function drawSprites(renderEls, t) {
      this[_updateSet].clear();
      if (this.beforeDrawTransform) {
        this.outputContext.save();
        this.beforeDrawTransform();
      }
      for (var i = 0; i < renderEls.length; i++) {
        var child = renderEls[i],
            isDirty = child.isDirty;
        child.isDirty = false;

        if (child.parent === this) {
          var isVisible = child.isVisible();
          if (isVisible) {
            child.draw(t);
            if (this.renderMode === 'repaintDirty') {
              child.lastRenderBox = child.renderBox;
            } else {
              child.lastRenderBox = 'no-calc';
            }
          } else {
            // invisible, only need to remove lastRenderBox
            delete child.lastRenderBox;
          }
          if (isDirty) {
            child.dispatchEvent('update', { target: child, renderTime: t, isVisible: isVisible }, true, true);
          }
        }
      }
      if (this.beforeDrawTransform) {
        this.outputContext.restore();
      }
    }
  }, {
    key: 'renderRepaintAll',
    value: function renderRepaintAll(t) {
      var clearContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var renderEls = this.sortedChildNodes;
      var outputContext = this.outputContext;
      if (clearContext) this.clearContext(outputContext);
      this.drawSprites(renderEls, t);
    }
  }, {
    key: 'renderRepaintDirty',
    value: function renderRepaintDirty(t) {
      var clearContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var updateEls = [].concat((0, _toConsumableArray3.default)(this[_updateSet]));

      if (this.__updateStyleTag || updateEls.some(function (el) {
        return !!el.attr('filter') || el.isVirtual || el.lastRenderBox === 'no-calc';
      })) {
        return this.renderRepaintAll(t, clearContext);
      }

      var outputContext = this.outputContext;

      var renderEls = this.sortedChildNodes;

      outputContext.save();
      if (this.beforeDrawTransform) {
        this.beforeDrawTransform();
      }
      outputContext.beginPath();
      (0, _dirtyCheck.clearDirtyRects)(outputContext, updateEls, true);
      outputContext.restore();
      if (clearContext) this.clearContext(outputContext);
      this.drawSprites(renderEls, t);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if (this.outputContext.canvas) {
        var layerX = evt.layerX,
            layerY = evt.layerY;
        var _outputContext$canvas = this.outputContext.canvas,
            width = _outputContext$canvas.width,
            height = _outputContext$canvas.height;


        if (layerX == null && layerY == null || layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
          return true;
        }
        return false;
      }
      /* istanbul ignore next  */
      return true;
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var _this3 = this;

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
                  if (target !== _this3 && target.layer === _this3) {
                    var _target$getParentXY = target.getParentXY(evt.layerX, evt.layerY),
                        _target$getParentXY2 = (0, _slicedToArray3.default)(_target$getParentXY, 2),
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
                  targetSprites.push.apply(targetSprites, (0, _toConsumableArray3.default)(evt.targetSprites));
                  delete evt.targetSprites;
                }
                // detect mouseenter/mouseleave
                targetSprites.push(sprite);
              }
              if (evt.terminated && type !== 'mousemove') {
                break;
              }
            }
          }
          evt.targetSprites = targetSprites;
          // stopDispatch can only terminate event in the same level
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
      return (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: 'group',
    value: function group() {
      var group = new _group2.default();
      group.append.apply(group, arguments);
      this.appendChild(group);
      return group;
    }
  }, {
    key: 'batch',
    value: function batch() {
      var _this4 = this;

      for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      sprites.forEach(function (sprite) {
        if (sprite.layer !== _this4) {
          _this4.appendChild(sprite);
        }
      });
      var batch = new _batch2.default(this);
      batch.add.apply(batch, sprites);
      return batch;
    }
  }, {
    key: 'adjust',
    value: function adjust(handler) /* istanbul ignore next  */{
      var _this5 = this;

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
        _this5.autoRender = true;
        delete _this5[_adjustTimer];
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
    key: 'clearUpdate',
    value: function clearUpdate() {
      /* istanbul ignore next  */
      this[_updateSet].clear();
    }
  }, {
    key: 'attributes',
    get: function get() {
      return this[_node].attributes;
    }
  }, {
    key: 'id',
    set: function set(val) {
      this.attr('id', val);
    },
    get: function get() {
      return this.attr('id');
    }
  }, {
    key: 'name',
    set: function set(val) {
      this.attr('name', val);
    },
    get: function get() {
      return this.attr('name');
    }
  }, {
    key: 'className',
    set: function set(val) {
      this.attr('class', val);
    },
    get: function get() {
      return this.attr('class');
    }
  }, {
    key: 'resolution',
    get: function get() {
      return [this.canvas.width, this.canvas.height];
    }
  }, {
    key: 'autoRender',
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
    key: 'layer',
    get: function get() {
      return this;
    }
  }, {
    key: 'children',
    get: function get() {
      return this.childNodes.filter(function (child) {
        return child instanceof _basenode2.default && !(child instanceof _datanode2.default);
      });
    }
  }, {
    key: 'timeline',
    get: function get() {
      return this[_timeline];
    }
  }, {
    key: 'context',
    get: function get() {
      return this.outputContext;
    }
  }, {
    key: 'canvas',
    get: function get() {
      return this.outputContext.canvas;
    }
  }, {
    key: 'offset',
    get: function get() {
      return [0, 0];
    }
  }, {
    key: 'fps',
    get: function get() /* istanbul ignore next  */{
      if (!this.evaluateFPS) {
        return NaN;
      }
      var sum = 0;
      var tr = this[_tRecord].slice(-10);
      var len = tr.length;

      if (len <= 5) {
        return NaN;
      }
      tr.reduceRight(function (a, b, i) {
        sum += a - b;return b;
      });

      return Math.round(1000 * (len - 1) / sum);
    }
  }]);
  return Layer;
}(_basenode2.default);

exports.default = Layer;


(0, _assign2.default)(Layer.prototype, _group4.default);

(0, _nodetype.registerNodeType)('layer', Layer, true);