'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _basenode = require('./basenode');

var _basenode2 = _interopRequireDefault(_basenode);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _spriteUtils = require('sprite-utils');

var _spriteAnimator = require('sprite-animator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _children = (0, _symbol2.default)('children'),
    _updateSet = (0, _symbol2.default)('updateSet'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _state = (0, _symbol2.default)('state'),
    _tRecord = (0, _symbol2.default)('tRecord'),
    _timeline = (0, _symbol2.default)('timeline'),
    _renderPromise = (0, _symbol2.default)('renderPromise');

var Layer = function (_BaseNode) {
  (0, _inherits3.default)(Layer, _BaseNode);

  function Layer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        context = _ref.context,
        handleEvent = _ref.handleEvent,
        evaluateFPS = _ref.evaluateFPS,
        renderMode = _ref.renderMode;

    (0, _classCallCheck3.default)(this, Layer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layer.__proto__ || (0, _getPrototypeOf2.default)(Layer)).call(this));

    _this.handleEvent = handleEvent !== false;
    _this.evaluateFPS = !!evaluateFPS;

    // renderMode: repaintAll | repaintDirty
    _this.renderMode = renderMode || 'repaintAll';

    _this.outputContext = context;

    if (context.canvas && context.canvas.cloneNode) {
      var shadowCanvas = context.canvas.cloneNode(true);
      _this.shadowContext = shadowCanvas.getContext('2d');
    }

    _this[_children] = [];
    _this[_updateSet] = new _set2.default();
    _this[_zOrder] = 0;
    _this[_tRecord] = []; // calculate FPS
    _this[_state] = {};
    _this[_timeline] = new _spriteAnimator.Timeline();
    return _this;
  }

  (0, _createClass3.default)(Layer, [{
    key: 'insertBefore',
    value: function insertBefore(newchild, refchild) {
      var idx = this[_children].indexOf(refchild);
      if (idx >= 0) {
        this.removeChild(newchild);
        this[_children].splice(idx, 0, newchild);
        newchild.connect(this, refchild.zOrder);
        this.update(newchild);

        for (var i = idx + 1; i < this[_children].length; i++) {
          var child = this[_children][i],
              zOrder = child.zOrder + 1;

          delete child.zOrder;
          Object.defineProperty(this, 'zOrder', {
            value: zOrder,
            writable: false,
            configurable: true
          });

          this.update(child);
        }

        this[_zOrder]++;
      }

      return newchild;
    }
  }, {
    key: 'prepareRender',
    value: function prepareRender() {
      if (!this[_state].prepareRender) {
        this[_state].prepareRender = true;

        var that = this,
            _dispatchEvent = (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this);

        this[_renderPromise] = new _promise2.default(function (resolve, reject) {
          requestAnimationFrame(function step(t) {
            var renderer = void 0;
            if (that.renderMode === 'repaintDirty') {
              renderer = that.renderRepaintDirty.bind(that);
            } else if (that.renderMode === 'repaintAll') {
              renderer = that.renderRepaintAll.bind(that);
            } else {
              throw new Error('unknown render mode!');
            }

            if (that[_updateSet].size) {
              renderer(t);

              _dispatchEvent.call(that, 'update', { target: that, timeline: that.timeline, currentTime: that.timeline.currentTime }, true);
            }

            if (that[_updateSet].size) {
              requestAnimationFrame(step);
            } else {
              that[_state].prepareRender = false;
              resolve();
            }
          });
        });
        // .catch(ex => console.error(ex.message))
      }

      return this[_renderPromise];
    }
  }, {
    key: 'update',
    value: function update(target) {
      if (target && this[_updateSet].has(target)) return;

      // invisible... return
      if (target && !target.lastRenderBox && !this.isVisible(target)) return;

      if (target) this[_updateSet].add(target);

      this.prepareRender();
    }
  }, {
    key: 'isVisible',
    value: function isVisible(sprite) {
      var opacity = sprite.attr('opacity');
      if (opacity <= 0) {
        return false;
      }

      var _sprite$offsetSize = (0, _slicedToArray3.default)(sprite.offsetSize, 2),
          width = _sprite$offsetSize[0],
          height = _sprite$offsetSize[1];

      if (width <= 0 || height <= 0) {
        return false;
      }

      return true;
    }
  }, {
    key: 'sortChildren',
    value: function sortChildren(children) {
      children.sort(function (a, b) {
        var a_zidx = a.attr('zIndex'),
            b_zidx = b.attr('zIndex');
        if (a_zidx === b_zidx) {
          return a.zOrder - b.zOrder;
        }
        return a_zidx - b_zidx;
      });
    }
  }, {
    key: 'drawSprites',
    value: function drawSprites(renderEls, t) {
      if (this.evaluateFPS) {
        this[_tRecord].push(t);
        this[_tRecord] = this[_tRecord].slice(-10);
      }

      for (var i = 0; i < renderEls.length; i++) {
        var child = renderEls[i];
        if (child.parent === this) {
          if (this.isVisible(child)) {
            child.draw(t);
          } else {
            // invisible, only need to remove lastRenderBox
            delete child.lastRenderBox;
          }
        }
      }
    }
  }, {
    key: 'renderRepaintAll',
    value: function renderRepaintAll(t) {
      var _this2 = this;

      var renderEls = this[_children].filter(function (e) {
        return _this2.isVisible(e);
      });
      this.sortChildren(renderEls);

      var outputContext = this.outputContext;
      if (outputContext.canvas) {
        var _outputContext$canvas = outputContext.canvas,
            width = _outputContext$canvas.width,
            height = _outputContext$canvas.height;

        outputContext.clearRect(0, 0, width, height);
      }

      var shadowContext = this.shadowContext;

      if (shadowContext) {
        if (shadowContext.canvas) {
          var _outputContext$canvas2 = outputContext.canvas,
              _width = _outputContext$canvas2.width,
              _height = _outputContext$canvas2.height;

          shadowContext.clearRect(0, 0, _width, _height);
        }
        this.drawSprites(renderEls, t);
        outputContext.drawImage(shadowContext.canvas, 0, 0);
      } else {
        this.drawSprites(renderEls, t);
      }

      this[_updateSet].clear();
    }
  }, {
    key: 'renderRepaintDirty',
    value: function renderRepaintDirty(t) {
      var _this3 = this;

      if (!this.outputContext.canvas) {
        console.warn('Cannot use repaintDirty, fallback to repaintAll!');
        return this.renderRepaintAll(t);
      }
      var _outputContext$canvas3 = this.outputContext.canvas,
          width = _outputContext$canvas3.width,
          height = _outputContext$canvas3.height;


      var updateSet = this[_updateSet];
      var children = this[_children].filter(function (e) {
        return _this3.isVisible(e);
      });
      var restEls = children.filter(function (el) {
        return !updateSet.has(el);
      });
      var affectedSet = new _set2.default(),
          unaffectedSet = new _set2.default();

      var updateEls = (0, _from2.default)(updateSet);

      for (var i = 0; i < restEls.length; i++) {
        var unaffectedEl = restEls[i];
        var affected = false;

        for (var j = 0; j < updateEls.length; j++) {
          var affectedEl = updateEls[j];
          var box1 = affectedEl.renderBox,
              box2 = unaffectedEl.renderBox,
              box3 = affectedEl.lastRenderBox;

          if ((0, _spriteUtils.boxIntersect)(box1, box2) || box3 && (0, _spriteUtils.boxIntersect)(box3, box2)) {
            affected = true;
            break;
          }
        }
        if (affected) affectedSet.add(unaffectedEl);else unaffectedSet.add(unaffectedEl);
      }

      if (affectedSet.size > 0 && unaffectedSet.size > 0) {
        var changed = void 0;
        do {
          changed = false;
          var _affectedEls = (0, _from2.default)(affectedSet),
              unaffectedEls = (0, _from2.default)(unaffectedSet);

          for (var _i = 0; _i < _affectedEls.length; _i++) {
            var _affectedEl = _affectedEls[_i];
            for (var _j = 0; _j < unaffectedEls.length; _j++) {
              var _unaffectedEl = unaffectedEls[_j];
              var _box = _affectedEl.renderBox,
                  _box2 = _unaffectedEl.renderBox;

              if ((0, _spriteUtils.boxIntersect)(_box, _box2)) {
                affectedSet.add(_unaffectedEl);
                unaffectedSet.delete(_unaffectedEl);
                changed = true;
                break;
              }
            }
            if (changed) break;
          }
        } while (changed);
      }

      var shadowContext = this.shadowContext;
      var outputContext = this.outputContext;

      if (shadowContext) {
        shadowContext.save();
        shadowContext.beginPath();
      }
      outputContext.save();
      outputContext.beginPath();

      for (var _i2 = 0; _i2 < updateEls.length; _i2++) {
        var updateEl = updateEls[_i2];
        var box = updateEl.renderBox;

        var dirtyBox = (0, _spriteUtils.boxIntersect)(box, [0, 0, width, height]);

        if (dirtyBox) {
          var dirtyRect = (0, _spriteUtils.boxToRect)(dirtyBox);

          if (shadowContext) shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(dirtyRect));
          outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(dirtyRect));
        }

        var lastRenderBox = updateEl.lastRenderBox;
        if (lastRenderBox && !(0, _spriteUtils.boxEqual)(lastRenderBox, box)) {
          dirtyBox = (0, _spriteUtils.boxIntersect)(lastRenderBox, [0, 0, width, height]);

          if (dirtyBox) {
            var _dirtyRect = (0, _spriteUtils.boxToRect)(dirtyBox);

            if (shadowContext) shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(_dirtyRect));
            outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(_dirtyRect));
          }
        }
      }

      var affectedEls = (0, _from2.default)(affectedSet);
      for (var _i3 = 0; _i3 < affectedEls.length; _i3++) {
        var _affectedEl2 = affectedEls[_i3];
        var _box3 = _affectedEl2.renderBox;
        var _dirtyBox = (0, _spriteUtils.boxIntersect)(_box3, [0, 0, width, height]);

        if (_dirtyBox) {
          var _dirtyRect2 = (0, _spriteUtils.boxToRect)(_dirtyBox);

          if (shadowContext) shadowContext.rect.apply(shadowContext, (0, _toConsumableArray3.default)(_dirtyRect2));
          outputContext.rect.apply(outputContext, (0, _toConsumableArray3.default)(_dirtyRect2));
        }
      }

      if (shadowContext) {
        shadowContext.clip();
        shadowContext.clearRect(0, 0, width, height);
      }

      outputContext.clip();
      outputContext.clearRect(0, 0, width, height);

      var renderEls = [].concat((0, _toConsumableArray3.default)(updateSet), (0, _toConsumableArray3.default)(affectedSet));
      this.sortChildren(renderEls);

      if (shadowContext) {
        this.drawSprites(renderEls, t);
        outputContext.drawImage(shadowContext.canvas, 0, 0);
        shadowContext.restore();
      } else {
        this.drawSprites(renderEls, t);
      }

      outputContext.restore();
      this[_updateSet].clear();
    }
  }, {
    key: 'appendChild',
    value: function appendChild(sprite) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.removeChild(sprite);
      this[_children].push(sprite);
      sprite.connect(this, this[_zOrder]++);
      if (update) this.update(sprite);
      return sprite;
    }
  }, {
    key: 'append',
    value: function append() {
      var _this4 = this;

      for (var _len = arguments.length, sprites = Array(_len), _key = 0; _key < _len; _key++) {
        sprites[_key] = arguments[_key];
      }

      sprites.forEach(function (sprite) {
        return _this4.appendChild(sprite);
      });
    }
  }, {
    key: 'removeChild',
    value: function removeChild(sprite) {
      var idx = this[_children].indexOf(sprite);
      if (idx === -1) {
        return null;
      }
      this[_children].splice(idx, 1);
      if (this.isVisible(sprite) || sprite.lastRenderBox) {
        sprite.forceUpdate();
      }
      sprite.disconnect(this);
      return sprite;
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this5 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length === 0) {
        args = this[_children].slice(0);
      }
      return args.map(function (child) {
        return _this5.removeChild(child);
      });
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if (this.outputContext.canvas) {
        var layerX = evt.layerX,
            layerY = evt.layerY;
        var _outputContext$canvas4 = this.outputContext.canvas,
            width = _outputContext$canvas4.width,
            height = _outputContext$canvas4.height;


        if (layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
          return true;
        }
        return false;
      }
      return true;
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      evt.layer = this;
      var sprites = this[_children].slice(0);
      sprites.sort(function (a, b) {
        var a_zidx = a.attr('zIndex'),
            b_zidx = b.attr('zIndex');

        if (a_zidx === b_zidx) {
          return b.zOrder - a.zOrder;
        }
        return b_zidx - a_zidx;
      });

      var targetSprites = [];
      for (var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i];
        var hit = sprite.dispatchEvent(type, evt);
        if (hit) {
          // detect mouseenter/mouseleave
          targetSprites.push(sprite);
        }
      }

      evt.targetSprites = targetSprites;
      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'dispatchEvent', this).call(this, type, evt);
    }
  }, {
    key: 'connect',
    value: function connect(parent, zOrder, zIndex) {
      (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'connect', this).call(this, parent, zOrder);
      this.zIndex = zIndex;
      if (parent && parent.container) {
        parent.container.append(this.outputContext.canvas);
      }
      return this;
    }
  }, {
    key: 'disconnect',
    value: function disconnect(parent) {
      if (this.canvas && this.canvas.remove) {
        this.canvas.remove();
      }
      return (0, _get3.default)(Layer.prototype.__proto__ || (0, _getPrototypeOf2.default)(Layer.prototype), 'disconnect', this).call(this, parent);
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
    key: 'adjust',
    value: function adjust(handler) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var outputContext = this.outputContext,
          shadowContext = this.shadowContext;
      if (!shadowContext) {
        throw new Error('No shadowContext.');
      }
      if (outputContext.canvas) {
        var _outputContext$canvas5 = outputContext.canvas,
            width = _outputContext$canvas5.width,
            height = _outputContext$canvas5.height;

        outputContext.clearRect(0, 0, width, height);
      }

      handler.call(this, outputContext);

      if (update) {
        outputContext.drawImage(shadowContext.canvas, 0, 0);
      }
    }
  }, {
    key: 'clearUpdate',
    value: function clearUpdate() {
      this[_updateSet].clear();
    }
  }, {
    key: 'children',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'timeline',
    get: function get() {
      return this[_timeline];
    }
  }, {
    key: 'context',
    get: function get() {
      return this.shadowContext ? this.shadowContext : this.outputContext;
    }
  }, {
    key: 'fps',
    get: function get() {
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