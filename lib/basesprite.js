"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _spriteMath = require("sprite-math");

var _spriteAnimator = require("sprite-animator");

var _utils = require("./utils");

var _baseattr = _interopRequireDefault(require("./baseattr"));

var _basenode = _interopRequireDefault(require("./basenode"));

var _animation2 = _interopRequireDefault(require("./animation"));

var _render = require("./helpers/render");

var _filters = _interopRequireDefault(require("./filters"));

var _dec, _class, _class2, _temp;

var _animations = Symbol('animations'),
    _cachePriority = Symbol('cachePriority'),
    _effects = Symbol('effects'),
    _flow = Symbol('flow'),
    _changeStateAction = Symbol('changeStateAction'),
    _releaseKeys = Symbol('releaseKeys');

var CACHE_PRIORITY_THRESHOLDS = 0; // disable cache_priority, for canvas drawing bug...

var BaseSprite = (_dec = (0, _utils.deprecate)('Instead use sprite.cache = null'), (_class = (_temp = _class2 =
/*#__PURE__*/
function (_BaseNode) {
  (0, _inherits2.default)(BaseSprite, _BaseNode);

  /**
    new Sprite({
      attr: {
        ...
      }
    })
   */
  function BaseSprite(attrs) {
    var _this;

    (0, _classCallCheck2.default)(this, BaseSprite);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BaseSprite).call(this, attrs));
    _this[_animations] = new Set();
    _this[_cachePriority] = 0;
    _this[_flow] = {};
    _this[_releaseKeys] = new Set();
    return _this;
  }

  (0, _createClass2.default)(BaseSprite, [{
    key: "setReleaseKey",
    value: function setReleaseKey(key) {
      this[_releaseKeys].add(key);
    }
  }, {
    key: "reflow",
    value: function reflow() {
      this[_flow] = {};
    }
  }, {
    key: "flow",
    value: function flow(prop, value) {
      if (value === undefined) {
        return this[_flow][prop];
      }

      this[_flow][prop] = value;
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      if (!this.parent) return false;
      var display = this.attr('display');

      if (display === 'none') {
        return false;
      }

      var opacity = this.attr('opacity');

      if (opacity <= 0) {
        return false;
      }

      if (this.isVirtual) return true;

      var _this$offsetSize = (0, _slicedToArray2.default)(this.offsetSize, 2),
          width = _this$offsetSize[0],
          height = _this$offsetSize[1];

      if (width <= 0 || height <= 0) {
        return false;
      }

      if (this.parent.isVisible) {
        return this.parent.isVisible();
      }

      return true;
    }
  }, {
    key: "transition",
    value: function transition(sec) {
      var _ref5;

      var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'linear';
      var isStyleAnim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var that = this,
          _animation = Symbol('animation');

      easing = easing || 'linear';
      var delay = 0;

      if ((0, _typeof2.default)(sec) === 'object') {
        delay = sec.delay || 0;
        sec = sec.duration;
      }

      return _ref5 = {}, (0, _defineProperty2.default)(_ref5, _animation, null), (0, _defineProperty2.default)(_ref5, "cancel", function cancel() {
        var preserveState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var animation = this[_animation];

        if (animation) {
          animation.cancel(preserveState);
        }
      }), (0, _defineProperty2.default)(_ref5, "end", function end() {
        var animation = this[_animation];

        if (animation && (animation.playState === 'running' || animation.playState === 'pending')) {
          animation.finish();
        }
      }), (0, _defineProperty2.default)(_ref5, "reverse", function reverse() {
        var animation = this[_animation];

        if (animation) {
          if (animation.playState === 'running' || animation.playState === 'pending') {
            animation.playbackRate = -animation.playbackRate;
          } else {
            var direction = animation.timing.direction;
            animation.timing.direction = direction === 'reverse' ? 'normal' : 'reverse';
            animation.play();
          }
        }

        return animation.finished;
      }), (0, _defineProperty2.default)(_ref5, "attr", function attr(prop, val) {
        this.end();

        if (typeof prop === 'string') {
          prop = (0, _defineProperty2.default)({}, prop, val);
        }

        Object.entries(prop).forEach(function (_ref3) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];

          if (typeof value === 'function') {
            prop[key] = value(that.attr(key));
          }
        });
        this[_animation] = that.animate([prop], {
          duration: sec * 1000,
          delay: delay * 1000,
          fill: 'forwards',
          easing: easing
        }, isStyleAnim);
        return this[_animation].finished;
      }), _ref5;
    }
  }, {
    key: "animate",
    value: function animate(frames, timing) {
      var _this2 = this;

      var isStyleAnim = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var setter = null;

      if (isStyleAnim) {
        setter = function setter(frame, target) {
          target.__attr.__styleTag = true;
          target.attr(frame);
          target.__attr.__styleTag = false;
        };
      }

      var animation = new _animation2.default(this, frames, timing, setter);
      if (this[_effects]) animation.applyEffects(this[_effects]);

      if (this.layer) {
        animation.baseTimeline = this.layer.timeline;
        animation.play();
        animation.finished.then(function () {
          _this2[_animations].delete(animation);
        });
      }

      this[_animations].add(animation);

      return animation;
    }
  }, {
    key: "changeState",
    value: function changeState(fromState, toState, action) {
      var _this3 = this;

      var animation;

      if (this[_changeStateAction]) {
        var currentAnim = this[_changeStateAction].animation;

        if (this[_changeStateAction].reversable && (currentAnim.playState === 'running' || currentAnim.playState === 'pending') && this[_changeStateAction].fromState === toState && this[_changeStateAction].toState === fromState) {
          currentAnim.playbackRate = -currentAnim.playbackRate;
          animation = currentAnim;
          animation.__reversed = this[_changeStateAction].action;
        } else {
          currentAnim.finish();
        }
      }

      if (!animation) {
        // const [_fromState, _toState] = [Object.assign({}, fromState), Object.assign({}, toState)];
        // delete _fromState.__default;
        // delete _toState.__default;
        var _fromState = {},
            _toState = {};
        Object.entries(fromState || {}).forEach(function (_ref6) {
          var _ref7 = (0, _slicedToArray2.default)(_ref6, 2),
              key = _ref7[0],
              value = _ref7[1];

          if (key !== '__default') {
            if (typeof value === 'function') {
              _fromState[key] = _this3.attr(key);
            } else {
              _fromState[key] = value;
            }
          }
        });
        Object.entries(toState || {}).forEach(function (_ref8) {
          var _ref9 = (0, _slicedToArray2.default)(_ref8, 2),
              key = _ref9[0],
              value = _ref9[1];

          if (key !== '__default') {
            if (typeof value === 'function') {
              _toState[key] = value(_this3.attr(key));
            } else {
              _toState[key] = value;
            }
          }
        });
        animation = this.animate([_fromState, _toState], Object.assign({
          fill: 'forwards'
        }, action));
        animation.finished.then(function () {
          if (_this3[_changeStateAction] && _this3[_changeStateAction].animation === animation) delete _this3[_changeStateAction];
        });
      }

      this[_changeStateAction] = {
        animation: animation,
        fromState: fromState,
        toState: toState,
        action: action,
        reversable: action.reversable !== false
      };
      return animation;
    }
  }, {
    key: "connect",
    value: function connect(parent) {
      var _this4 = this;

      var zOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (parent && !(parent instanceof _basenode.default)) {
        var node = new _basenode.default();
        node.context = parent;
        node.timeline = new _spriteAnimator.Timeline();

        node.update = function () {
          var currentTime = this.timeline.currentTime;
          node.dispatchEvent('update', {
            target: this,
            timeline: this.timeline,
            renderTime: currentTime
          }, true, true);
        };

        parent = node;
      }

      var ret = (0, _get2.default)((0, _getPrototypeOf2.default)(BaseSprite.prototype), "connect", this).call(this, parent, zOrder);
      Object.defineProperty(this, 'context', {
        get: function get() {
          return parent.cache || parent.context;
        },
        configurable: true
      });

      this[_animations].forEach(function (animation) {
        if (parent.layer) {
          animation.baseTimeline = parent.layer.timeline;
        }

        animation.play();
        animation.finished.then(function () {
          _this4[_animations].delete(animation);
        });
      });

      if (this.hasLayout) this.clearLayout();
      this.reflow();
      return ret;
    }
  }, {
    key: "disconnect",
    value: function disconnect(parent) {
      var _this5 = this;

      this[_animations].forEach(function (animation) {
        return animation.cancel();
      });

      if (this.cache) {
        this.cache = null;
      }

      if (this.hasLayout) this.clearLayout();
      this.reflow();
      var ret = (0, _get2.default)((0, _getPrototypeOf2.default)(BaseSprite.prototype), "disconnect", this).call(this, parent);
      delete this.context;
      (0, _toConsumableArray2.default)(this[_releaseKeys]).forEach(function (key) {
        return delete _this5[key];
      });
      return ret;
    }
  }, {
    key: "getParentXY",
    value: function getParentXY() {
      var lx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var ly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var layer = this.layer;
      if (!layer) return [0, 0];
      var parents = [];
      var target = this.parent;

      while (target && target !== layer) {
        parents.push(target);
        target = target.parent;
      }

      parents.reverse();
      var parentX = lx,
          parentY = ly;
      parents.forEach(function (node) {
        var scrollLeft = node.attr('scrollLeft'),
            scrollTop = node.attr('scrollTop'),
            borderWidth = node.attr('border').width,
            padding = node.attr('padding');

        var _node$pointToOffset = node.pointToOffset(parentX, parentY);

        var _node$pointToOffset2 = (0, _slicedToArray2.default)(_node$pointToOffset, 2);

        parentX = _node$pointToOffset2[0];
        parentY = _node$pointToOffset2[1];
        parentX = parentX - node.originalRect[0] - borderWidth - padding[3] + scrollLeft;
        parentY = parentY - node.originalRect[1] - borderWidth - padding[0] + scrollTop;
      });
      return [parentX, parentY];
    }
  }, {
    key: "getLayerXY",
    value: function getLayerXY() {
      var dx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var dy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var layer = this.layer;
      if (!layer) return [0, 0];
      var target = this;
      var x = dx,
          y = dy;

      while (target && target !== layer) {
        var _target$offsetToPoint = target.offsetToPoint(x, y);

        var _target$offsetToPoint2 = (0, _slicedToArray2.default)(_target$offsetToPoint, 2);

        x = _target$offsetToPoint2[0];
        y = _target$offsetToPoint2[1];
        var parent = target.parent;

        if (parent !== layer) {
          var borderWidth = parent.attr('border').width;
          var padding = parent.attr('padding'),
              scrollLeft = parent.attr('scrollLeft') || 0,
              scrollTop = parent.attr('scrollTop') || 0; // const parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft
          // const parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop

          x = x + parent.originalRect[0] + borderWidth + padding[3] - scrollLeft;
          y = y + parent.originalRect[1] + borderWidth + padding[0] - scrollTop;
        }

        target = parent;
      }

      return [x, y];
    }
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.cache = null;
    }
  }, {
    key: "appendTo",
    value: function appendTo(parent) {
      parent.appendChild(this);
    }
  }, {
    key: "forceUpdate",
    value: function forceUpdate() {
      var clearCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (clearCache) {
        this.cache = null;
      }

      (0, _get2.default)((0, _getPrototypeOf2.default)(BaseSprite.prototype), "forceUpdate", this).call(this);
    } // layer position to sprite offset

  }, {
    key: "pointToOffset",
    value: function pointToOffset(x, y) {
      var _this$xy = (0, _slicedToArray2.default)(this.xy, 2),
          x0 = _this$xy[0],
          y0 = _this$xy[1];

      var dx = x - x0,
          dy = y - y0;
      var transform = this.transform;
      return transform.inverse().transformPoint(dx, dy);
    }
  }, {
    key: "offsetToPoint",
    value: function offsetToPoint(dx, dy) {
      var transform = this.transform;

      var _this$xy2 = (0, _slicedToArray2.default)(this.xy, 2),
          x0 = _this$xy2[0],
          y0 = _this$xy2[1];

      var _transform$transformP = transform.transformPoint(dx, dy),
          _transform$transformP2 = (0, _slicedToArray2.default)(_transform$transformP, 2),
          x = _transform$transformP2[0],
          y = _transform$transformP2[1];

      return [x + x0, y + y0];
    }
  }, {
    key: "getOffsetXY",
    value: function getOffsetXY(evt) {
      var parentX, parentY;

      if (evt.parentX != null) {
        // group
        parentX = evt.parentX;
        parentY = evt.parentY;
      } else {
        parentX = evt.layerX;
        parentY = evt.layerY;
      }

      if (parentX != null && parentY != null) {
        return this.pointToOffset(parentX, parentY);
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(type, evt) {
      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (collisionState) {
        var offsetXY = this.getOffsetXY(evt);

        if (offsetXY) {
          evt.offsetX = offsetXY[0];
          evt.offsetY = offsetXY[1];
        }
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(BaseSprite.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: "pointCollision",
    value: function pointCollision(evt) {
      /* istanbul ignore if */
      if (!this.isVisible()) {
        return false;
      }

      var offsetXY = this.getOffsetXY(evt);
      if (!offsetXY) return true;

      var _offsetXY = (0, _slicedToArray2.default)(offsetXY, 2),
          nx = _offsetXY[0],
          ny = _offsetXY[1];

      evt.offsetX = nx;
      evt.offsetY = ny;

      var _this$originalRect = (0, _slicedToArray2.default)(this.originalRect, 4),
          ox = _this$originalRect[0],
          oy = _this$originalRect[1],
          ow = _this$originalRect[2],
          oh = _this$originalRect[3];

      if (nx >= ox && nx - ox < ow && ny >= oy && ny - oy < oh) {
        if (this.context && this.context.isPointInPath) {
          var borderWidth = this.attr('border').width,
              borderRadius = this.attr('borderRadius');

          if (borderWidth || borderRadius) {
            var _this$outerSize = (0, _slicedToArray2.default)(this.outerSize, 2),
                width = _this$outerSize[0],
                height = _this$outerSize[1];

            var _ref10 = [0, 0, width, height, Math.max(0, borderRadius + borderWidth / 2)],
                x = _ref10[0],
                y = _ref10[1],
                w = _ref10[2],
                h = _ref10[3],
                r = _ref10[4];
            (0, _render.drawRadiusBox)(this.context, {
              x: x,
              y: y,
              w: w,
              h: h,
              r: r
            });

            if (this.layer && this.layer.offset) {
              nx += this.layer.offset[0];
              ny += this.layer.offset[1];
            }

            return this.context.isPointInPath(nx - ox, ny - oy);
          }
        }

        return true;
      }
    } // OBB: http://blog.csdn.net/silangquan/article/details/50812425

  }, {
    key: "OBBCollision",
    value: function OBBCollision(sprite) {
      // vertices: [p1, p2, p3, p4]
      var _this$vertices = (0, _slicedToArray2.default)(this.vertices, 3),
          p11 = _this$vertices[0],
          p12 = _this$vertices[1],
          p13 = _this$vertices[2],
          _sprite$vertices = (0, _slicedToArray2.default)(sprite.vertices, 3),
          p21 = _sprite$vertices[0],
          p22 = _sprite$vertices[1],
          p23 = _sprite$vertices[2];

      var a1 = new _spriteMath.Vector(p12, p11).unit(),
          a2 = new _spriteMath.Vector(p13, p12).unit(),
          a3 = new _spriteMath.Vector(p22, p21).unit(),
          a4 = new _spriteMath.Vector(p23, p22).unit(); // The projection of the axis of a vertex in a certain direction

      function verticesProjection(vertices, axis) {
        var _vertices$map = vertices.map(function (v) {
          return axis.dot(new _spriteMath.Vector(v));
        }),
            _vertices$map2 = (0, _slicedToArray2.default)(_vertices$map, 4),
            p1 = _vertices$map2[0],
            p2 = _vertices$map2[1],
            p3 = _vertices$map2[2],
            p4 = _vertices$map2[3];

        return [Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4)];
      }

      function projectionIntersect(p1, p2) {
        var m1 = (p1[0] + p1[1]) / 2,
            l1 = Math.abs(p1[1] - p1[0]),
            m2 = (p2[0] + p2[1]) / 2,
            l2 = Math.abs(p2[1] - p2[0]);
        return Math.abs(m2 - m1) <= (l1 + l2) / 2;
      }

      return projectionIntersect(verticesProjection(this.vertices, a1), verticesProjection(sprite.vertices, a1)) && projectionIntersect(verticesProjection(this.vertices, a2), verticesProjection(sprite.vertices, a2)) && projectionIntersect(verticesProjection(this.vertices, a3), verticesProjection(sprite.vertices, a3)) && projectionIntersect(verticesProjection(this.vertices, a4), verticesProjection(sprite.vertices, a4));
    }
  }, {
    key: "relayout",
    value: function relayout() {}
  }, {
    key: "draw",
    value: function draw(t) {
      var drawingContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;
      // eslint-disable-line complexity
      (0, _get2.default)((0, _getPrototypeOf2.default)(BaseSprite.prototype), "draw", this).call(this, t, drawingContext);

      if (!this.isVisible()) {
        return;
      }

      var bound = this.originalRect;
      var cachableContext = !this.isVirtual && this.cache;
      var filter = this.attr('filter'),
          shadow = this.attr('shadow'),
          enableCache = this.attr('enableCache') || shadow || filter;
      var ratio = this.layer ? this.layer.displayRatio || 1.0 : 1.0;

      if (enableCache && (shadow || filter || cachableContext !== false) && !cachableContext) {
        cachableContext = _render.cacheContextPool.get(drawingContext);

        if (cachableContext) {
          // +2 to solve 1px problem
          cachableContext.canvas.width = Math.ceil(bound[2] * ratio) + 2;
          cachableContext.canvas.height = Math.ceil(bound[3] * ratio) + 2;
        }
      }

      var evtArgs = {
        context: drawingContext,
        cacheContext: cachableContext,
        target: this,
        renderTime: t,
        fromCache: !!this.cache
      };
      drawingContext.save();
      drawingContext.translate.apply(drawingContext, (0, _toConsumableArray2.default)(this.xy));
      drawingContext.transform.apply(drawingContext, (0, _toConsumableArray2.default)(this.transform.m)); // fix for wxapp

      var alpha = drawingContext.globalAlpha != null ? drawingContext.globalAlpha : 1;
      drawingContext.globalAlpha = alpha * this.attr('opacity');

      if (!cachableContext) {
        drawingContext.translate(bound[0], bound[1]);
      } else {
        cachableContext.save(); // solve 1px problem

        cachableContext.translate(bound[0] - Math.floor(bound[0]) + 1, bound[1] - Math.floor(bound[1]) + 1);

        if (ratio !== 1.0) {
          cachableContext.scale(ratio, ratio);
        }
      }

      this.dispatchEvent('beforedraw', evtArgs, true, true);

      if (cachableContext) {
        // set cache before render for group
        if (!this.cache) {
          this.cache = cachableContext;
          this.render(t, cachableContext);
        }
      } else {
        this.render(t, drawingContext);
      }

      if ((shadow || filter) && !cachableContext) {
        console.warn('No cachable context. Shadows and filters have been ignored.');
      }

      if (cachableContext && cachableContext.canvas.width > 0 && cachableContext.canvas.height > 0) {
        if (filter) {
          drawingContext.filter = _filters.default.compile(filter);
        }

        if (shadow) {
          var blur = shadow.blur,
              color = shadow.color,
              offset = shadow.offset;
          blur = blur || 1;
          color = color || 'rgba(0,0,0,1)';
          drawingContext.shadowBlur = blur;
          drawingContext.shadowColor = color;

          if (offset) {
            drawingContext.shadowOffsetX = offset[0];
            drawingContext.shadowOffsetY = offset[1];
          }
        }

        drawingContext.drawImage(cachableContext.canvas, Math.floor(bound[0]) - 1, Math.floor(bound[1]) - 1, bound[2] + 2, bound[3] + 2);
      }

      this.dispatchEvent('afterdraw', evtArgs, true, true);

      if (cachableContext) {
        cachableContext.restore();
      }

      drawingContext.restore();
      this[_cachePriority]++;
      return drawingContext;
    }
  }, {
    key: "show",
    value: function show() {
      this.attr('display', this.__originalDisplay || '');
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      var display = this.attr('display');

      if (display !== 'none') {
        this.__originalDisplay = display;
        this.attr('display', 'none');
      }

      return this;
    }
  }, {
    key: "render",
    value: function render(t, drawingContext) {
      var border = this.attr('border'),
          borderRadius = this.attr('borderRadius'),
          padding = this.attr('padding'),
          _this$offsetSize2 = (0, _slicedToArray2.default)(this.offsetSize, 2),
          offsetWidth = _this$offsetSize2[0],
          offsetHeight = _this$offsetSize2[1],
          _this$clientSize = (0, _slicedToArray2.default)(this.clientSize, 2),
          clientWidth = _this$clientSize[0],
          clientHeight = _this$clientSize[1];

      if (!this.needRender) {
        drawingContext.translate(padding[3], padding[0]);
        return false;
      }

      var borderWidth = border.width;
      var borderStyle = border.style; // draw border

      if (borderWidth) {
        drawingContext.lineWidth = borderWidth;
        var x = borderWidth / 2,
            y = borderWidth / 2,
            w = offsetWidth - borderWidth,
            h = offsetHeight - borderWidth,
            r = borderRadius;
        (0, _render.drawRadiusBox)(drawingContext, {
          x: x,
          y: y,
          w: w,
          h: h,
          r: r
        });

        if (borderStyle && borderStyle !== 'solid') {
          var dashOffset = this.attr('dashOffset');
          drawingContext.lineDashOffset = dashOffset;

          if (borderStyle === 'dashed') {
            borderStyle = [borderWidth * 3, borderWidth * 3];
          }

          drawingContext.setLineDash(borderStyle);
        }

        drawingContext.strokeStyle = (0, _render.findColor)(drawingContext, this, 'border');
        drawingContext.stroke();
      } // draw bgcolor


      var bgcolor = (0, _render.findColor)(drawingContext, this, 'bgcolor');
      var bgimage = this.attr('bgimage');

      if (this.cache == null || borderWidth || borderRadius || bgcolor || bgimage && bgimage.display !== 'none') {
        var _ref11 = [borderWidth, borderWidth, clientWidth, clientHeight, Math.max(0, borderRadius - borderWidth / 2)],
            _x = _ref11[0],
            _y = _ref11[1],
            _w = _ref11[2],
            _h = _ref11[3],
            _r = _ref11[4];
        (0, _render.drawRadiusBox)(drawingContext, {
          x: _x,
          y: _y,
          w: _w,
          h: _h,
          r: _r
        });

        if (bgcolor) {
          drawingContext.fillStyle = bgcolor;
          drawingContext.fill();
        } // clip is expensive, we should only perform clip when it has to.


        if (bgimage && bgimage.display !== 'none' || borderRadius && (this.nodeType !== 'sprite' || this.textures && this.textures.length)) {
          drawingContext.clip();
        }

        if (bgimage && bgimage.image && bgimage.display !== 'none') {
          drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
        }
      }

      drawingContext.translate(borderWidth + padding[3], borderWidth + padding[0]);
      return true;
    }
  }, {
    key: "hasLayout",
    get: function get() {
      if (this.attr('position') === 'absolute') return false;

      if (this.parent && this.parent.relayout) {
        var display = this.parent.attr('display');
        return display !== '' && display !== 'static';
      }

      return false;
    }
  }, {
    key: "zIndex",
    set: function set(val) {
      this.attr('zIndex', val);
    },
    get: function get() {
      return this.attr('zIndex');
    }
  }, {
    key: "isVirtual",
    get: function get() {
      return false;
    }
  }, {
    key: "transform",
    get: function get() {
      var transform = new _spriteMath.Matrix(this.__attr.get('transformMatrix'));
      var transformOrigin = this.attr('transformOrigin');

      if (transformOrigin) {
        var t = new _spriteMath.Matrix();
        t.translate.apply(t, (0, _toConsumableArray2.default)(transformOrigin));
        t.multiply(transform);
        t.translate.apply(t, (0, _toConsumableArray2.default)(transformOrigin.map(function (v) {
          return -v;
        })));
        return t;
      }

      return transform;
    }
  }, {
    key: "animations",
    get: function get() {
      return this[_animations];
    }
  }, {
    key: "xy",
    get: function get() {
      var x, y;

      if (this.hasLayout) {
        x = this.attr('layoutX');
        y = this.attr('layoutY');
      } else {
        var _this$attr = this.attr('pos');

        var _this$attr2 = (0, _slicedToArray2.default)(_this$attr, 2);

        x = _this$attr2[0];
        y = _this$attr2[1];
      }

      return [x, y];
    }
  }, {
    key: "attrSize",
    get: function get() {
      var _this$attr3 = this.attr('size'),
          _this$attr4 = (0, _slicedToArray2.default)(_this$attr3, 2),
          width = _this$attr4[0],
          height = _this$attr4[1];

      var isBorderBox = this.attr('boxSizing') === 'border-box';

      if (this.hasLayout) {
        var layoutWidth = this.attr('layoutWidth'),
            layoutHeight = this.attr('layoutHeight');
        var _ref12 = [layoutWidth !== '' ? layoutWidth : width, layoutHeight !== '' ? layoutHeight : height];
        width = _ref12[0];
        height = _ref12[1];
      }

      if (isBorderBox) {
        var borderWidth = this.attr('border').width,
            _this$attr5 = this.attr('padding'),
            _this$attr6 = (0, _slicedToArray2.default)(_this$attr5, 4),
            paddingTop = _this$attr6[0],
            paddingRight = _this$attr6[1],
            paddingBottom = _this$attr6[2],
            paddingLeft = _this$attr6[3];

        if (width !== '') {
          width = Math.max(0, width - 2 * borderWidth - paddingLeft - paddingRight);
        }

        if (height !== '') {
          height = Math.max(0, height - 2 * borderWidth - paddingTop - paddingBottom);
        }
      }

      return [width, height];
    }
  }, {
    key: "boxOffsetSize",
    get: function get() {
      // get original boxSize, without layout
      if (this.isVirtual) return [0, 0];

      var _this$attr7 = this.attr('size'),
          _this$attr8 = (0, _slicedToArray2.default)(_this$attr7, 2),
          width = _this$attr8[0],
          height = _this$attr8[1];

      var _this$attr9 = this.attr('padding'),
          _this$attr10 = (0, _slicedToArray2.default)(_this$attr9, 4),
          top = _this$attr10[0],
          right = _this$attr10[1],
          bottom = _this$attr10[2],
          left = _this$attr10[3];

      var _this$attr11 = this.attr('border'),
          borderWidth = _this$attr11.width,
          lw = borderWidth * 2;

      return [left + (width | 0) + right + lw, top + (height | 0) + bottom + lw];
    } // content width / height

  }, {
    key: "contentSize",
    get: function get() {
      if (this.isVirtual) return [0, 0];

      var _this$attrSize = (0, _slicedToArray2.default)(this.attrSize, 2),
          width = _this$attrSize[0],
          height = _this$attrSize[1];

      return [width | 0, height | 0];
    } // content + padding

  }, {
    key: "clientSize",
    get: function get() {
      var _this$attr12 = this.attr('padding'),
          _this$attr13 = (0, _slicedToArray2.default)(_this$attr12, 4),
          top = _this$attr13[0],
          right = _this$attr13[1],
          bottom = _this$attr13[2],
          left = _this$attr13[3],
          _this$contentSize = (0, _slicedToArray2.default)(this.contentSize, 2),
          width = _this$contentSize[0],
          height = _this$contentSize[1];

      return [left + width + right, top + height + bottom];
    } // content + padding + border

  }, {
    key: "offsetSize",
    get: function get() {
      var _this$attr14 = this.attr('border'),
          borderWidth = _this$attr14.width,
          _this$clientSize2 = (0, _slicedToArray2.default)(this.clientSize, 2),
          width = _this$clientSize2[0],
          height = _this$clientSize2[1];

      return [width + 2 * borderWidth, height + 2 * borderWidth];
    }
  }, {
    key: "layoutSize",
    get: function get() {
      var size = this.offsetSize;

      var _this$attr15 = this.attr('margin'),
          _this$attr16 = (0, _slicedToArray2.default)(_this$attr15, 4),
          top = _this$attr16[0],
          right = _this$attr16[1],
          bottom = _this$attr16[2],
          left = _this$attr16[3];

      return [left + size[0] + right, top + size[1] + bottom];
    }
  }, {
    key: "innerSize",
    get: function get() {
      return this.contentSize;
    }
  }, {
    key: "outerSize",
    get: function get() {
      return this.offsetSize;
    }
  }, {
    key: "boundingRect",
    get: function get() {
      var transform = this.transform;

      var _this$originalRect2 = (0, _slicedToArray2.default)(this.originalRect, 4),
          ox = _this$originalRect2[0],
          oy = _this$originalRect2[1],
          width = _this$originalRect2[2],
          height = _this$originalRect2[3];

      if (this.hasLayout) {
        var margin = this.attr('margin');
        width += margin[1];
        height += margin[2];
      }

      var vertexs = [[ox, oy], [width + ox, oy], [ox, height + oy], [width + ox, height + oy]];
      var transformed = vertexs.map(function (v) {
        return transform.transformPoint(v[0], v[1]);
      });
      var vx = transformed.map(function (v) {
        return v[0];
      }),
          vy = transformed.map(function (v) {
        return v[1];
      });
      var minX = Math.min.apply(Math, (0, _toConsumableArray2.default)(vx)),
          minY = Math.min.apply(Math, (0, _toConsumableArray2.default)(vy)),
          maxX = Math.max.apply(Math, (0, _toConsumableArray2.default)(vx)),
          maxY = Math.max.apply(Math, (0, _toConsumableArray2.default)(vy));
      return [minX, minY].concat([maxX - minX, maxY - minY]);
    } // rect before transform

  }, {
    key: "originalRect",
    get: function get() {
      var _this$offsetSize3 = (0, _slicedToArray2.default)(this.offsetSize, 2),
          width = _this$offsetSize3[0],
          height = _this$offsetSize3[1],
          _this$attr17 = this.attr('anchor'),
          _this$attr18 = (0, _slicedToArray2.default)(_this$attr17, 2),
          anchorX = _this$attr18[0],
          anchorY = _this$attr18[1];

      var rect = [-anchorX * width, -anchorY * height, width, height];

      if (this.hasLayout) {
        var margin = this.attr('margin');
        rect[0] += margin[3];
        rect[1] += margin[0];
      }

      return rect;
    }
  }, {
    key: "originalRenderRect",
    get: function get() {
      var bound = this.originalRect,
          pos = this.xy;
      return [pos[0] + bound[0], pos[1] + bound[1], bound[2], bound[3]];
    }
  }, {
    key: "renderBox",
    get: function get() {
      var bound = this.boundingRect,
          pos = this.xy;
      return [Math.floor(pos[0] + bound[0]), Math.floor(pos[1] + bound[1]), Math.ceil(pos[0] + bound[0] + bound[2]), Math.ceil(pos[1] + bound[1] + bound[3])];
    }
  }, {
    key: "renderRect",
    get: function get() {
      var _this$renderBox = (0, _slicedToArray2.default)(this.renderBox, 4),
          x0 = _this$renderBox[0],
          y0 = _this$renderBox[1],
          x1 = _this$renderBox[2],
          y1 = _this$renderBox[3];

      return [x0, y0, x1 - x0, y1 - y0];
    }
  }, {
    key: "vertices",
    get: function get() {
      var vertices = (0, _utils.rectVertices)(this.originalRect),
          transform = this.transform,
          _this$xy3 = (0, _slicedToArray2.default)(this.xy, 2),
          x0 = _this$xy3[0],
          y0 = _this$xy3[1];

      return vertices.map(function (v) {
        var _transform$transformP3 = transform.transformPoint(v[0], v[1]),
            _transform$transformP4 = (0, _slicedToArray2.default)(_transform$transformP3, 2),
            x = _transform$transformP4[0],
            y = _transform$transformP4[1];

        return [x0 + x, y0 + y];
      });
    }
  }, {
    key: "cache",
    set: function set(context) {
      if (context == null) {
        this[_cachePriority] = 0;

        if (this.parent && this.parent.cache) {
          this.parent.cache = null;
        }
      }

      if (this.cacheContext && context !== this.cacheContext) {
        _render.cacheContextPool.put(this.cacheContext);
      }

      this.cacheContext = context;
    },
    get: function get() {
      if (this[_cachePriority] >= CACHE_PRIORITY_THRESHOLDS) {
        return this.cacheContext;
      }

      if (this.cacheContext) {
        this.cache = null;
      }

      return false;
    }
  }, {
    key: "needRender",
    get: function get() {
      if (this.isVirtual) return false;

      var _this$offsetSize4 = (0, _slicedToArray2.default)(this.offsetSize, 2),
          offsetWidth = _this$offsetSize4[0],
          offsetHeight = _this$offsetSize4[1];

      if (offsetWidth <= 0 || offsetHeight <= 0) return false;
      var border = this.attr('border');

      if (border.width <= 0 && this.attr('borderRadius') <= 0 && !this.attr('bgcolor') && !this.attr('gradients').bgcolor && !this.attr('bgimage')) {
        return false; // don't need to render
      }

      return true;
    }
  }], [{
    key: "setAttributeEffects",
    value: function setAttributeEffects() {
      var effects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.prototype[_effects] == null) {
        this.prototype[_effects] = effects;
      }

      Object.assign(this.prototype[_effects], effects);
    }
  }, {
    key: "addAttributes",
    value: function addAttributes() {
      var _this6 = this;

      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.entries(attrs).forEach(function (_ref13) {
        var _ref14 = (0, _slicedToArray2.default)(_ref13, 2),
            prop = _ref14[0],
            handler = _ref14[1];

        var getter = function getter() {
          return this.get(prop);
        };

        if (typeof handler !== 'function' && handler.set) {
          getter = handler.get || getter;
          handler = handler.set;
        }

        if (prop !== 'init') {
          Object.defineProperty(_this6.Attr.prototype, prop, {
            set: function set(val) {
              this.__updateTag = false;
              this.__reflowTag = false;
              this.__clearLayout = false;
              handler(this, val);

              if (this.subject && this.subject.hasLayout) {
                var offsetSize = this.subject.offsetSize,
                    layoutSize = this.subject.__layoutSize;

                if (this.__clearLayout || !layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1]) {
                  this.subject.clearLayout();
                }

                this.subject.__lastLayout = offsetSize;
              }

              if (this.subject && this.__updateTag) {
                this.subject.forceUpdate(true);

                if (this.__reflowTag) {
                  this.subject.reflow();
                }
              } // delete this.__reflowTag;
              // delete this.__updateTag;

            },
            get: getter
          });
        }
      });
    }
  }, {
    key: "defineAttributes",
    value: function defineAttributes(attrs, effects) {
      this.Attr =
      /*#__PURE__*/
      function (_this$Attr) {
        (0, _inherits2.default)(_class3, _this$Attr);

        function _class3(subject) {
          var _this7;

          (0, _classCallCheck2.default)(this, _class3);
          _this7 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class3).call(this, subject));
          if (attrs.init) attrs.init((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this7)), subject);
          return _this7;
        }

        return _class3;
      }(this.Attr);

      if (attrs) this.addAttributes(attrs);
      if (effects) this.setAttributeEffects(effects);
      return this.Attr;
    }
  }]);
  return BaseSprite;
}(_basenode.default), (0, _defineProperty2.default)(_class2, "Attr", _baseattr.default), _temp), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "xy", [_utils.absolute], Object.getOwnPropertyDescriptor(_class.prototype, "xy"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "attrSize", [_utils.absolute, _utils.flow], Object.getOwnPropertyDescriptor(_class.prototype, "attrSize"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "boxOffsetSize", [_utils.absolute, _utils.flow], Object.getOwnPropertyDescriptor(_class.prototype, "boxOffsetSize"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "contentSize", [_utils.flow], Object.getOwnPropertyDescriptor(_class.prototype, "contentSize"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "clientSize", [_utils.flow], Object.getOwnPropertyDescriptor(_class.prototype, "clientSize"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "offsetSize", [_utils.flow], Object.getOwnPropertyDescriptor(_class.prototype, "offsetSize"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "originalRect", [_utils.flow], Object.getOwnPropertyDescriptor(_class.prototype, "originalRect"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "clearCache", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "clearCache"), _class.prototype)), _class));
exports.default = BaseSprite;

function drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  var w = image.width,
      h = image.height;

  var _ref = clip9 || [16, 16, 16, 16],
      _ref2 = (0, _slicedToArray2.default)(_ref, 4),
      top = _ref2[0],
      right = _ref2[1],
      bottom = _ref2[2],
      left = _ref2[3];

  var leftTop = [0, 0, left, top],
      rightTop = [w - right, 0, right, top],
      rightBottom = [w - right, h - bottom, right, bottom],
      leftBottom = [0, h - bottom, left, bottom];
  var boxRight = offsetWidth - right - borderWidth,
      boxBottom = offsetHeight - borderWidth - bottom; // draw .9 cross

  var midWidth = w - left - right,
      midHeight = h - top - bottom;

  if (midWidth > 0) {
    var midBoxWidth = clientWidth - left - right + 2;
    var leftOffset = borderWidth + left - 1;

    while (midBoxWidth > 0) {
      var ww = Math.min(midBoxWidth, midWidth) + 1;
      var topPiece = [left - 1, 0, ww, top],
          bottomPiece = [left - 1, h - bottom, ww, bottom];
      drawingContext.drawImage.apply(drawingContext, [image].concat(topPiece, [leftOffset, borderWidth, ww, top]));
      drawingContext.drawImage.apply(drawingContext, [image].concat(bottomPiece, [leftOffset, boxBottom, ww, bottom]));
      midBoxWidth -= midWidth;

      if (midBoxWidth > 0) {
        leftOffset += midWidth;
      }
    }
  }

  if (midHeight > 0) {
    var midBoxHeight = clientHeight - top - bottom + 2;
    var topOffset = borderWidth + top - 1;

    while (midBoxHeight > 0) {
      var hh = Math.min(midBoxHeight, midHeight) + 1;
      var leftPiece = [0, top - 1, left, hh],
          rightPiece = [w - right, top - 1, right, hh];
      drawingContext.drawImage.apply(drawingContext, [image].concat(leftPiece, [borderWidth, topOffset, left, hh]));
      drawingContext.drawImage.apply(drawingContext, [image].concat(rightPiece, [boxRight, topOffset, right, hh]));
      midBoxHeight -= midHeight;

      if (midBoxHeight > 0) {
        topOffset += midHeight;
      }
    }
  }

  if (midHeight && midWidth > 0) {
    var _midBoxWidth = clientWidth - left - right + 2;

    var _leftOffset = borderWidth + left - 1;

    while (_midBoxWidth > 0) {
      var _midBoxHeight = clientHeight - top - bottom + 2;

      var _topOffset = borderWidth + top - 1;

      while (_midBoxHeight > 0) {
        var _ww = Math.min(_midBoxWidth, midWidth) + 1,
            _hh = Math.min(_midBoxHeight, midHeight) + 1;

        var midPiece = [left - 1, top - 1, _ww, _hh];
        drawingContext.drawImage.apply(drawingContext, [image].concat(midPiece, [_leftOffset, _topOffset, _ww, _hh]));
        _midBoxHeight -= midWidth;

        if (_midBoxHeight > 0) {
          _topOffset += midHeight;
        }
      }

      _midBoxWidth -= midWidth;

      if (_midBoxWidth > 0) {
        _leftOffset += midWidth;
      }
    }
  } // draw four corners


  drawingContext.drawImage.apply(drawingContext, [image].concat(leftTop, [borderWidth, borderWidth, left, top]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(rightTop, [boxRight, borderWidth, right, top]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(rightBottom, [boxRight, boxBottom, left, bottom]));
  drawingContext.drawImage.apply(drawingContext, [image].concat(leftBottom, [borderWidth, boxBottom, left, bottom]));
}

function drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  var image = bgimage.image,
      display = bgimage.display,
      clip9 = bgimage.clip9;

  if (display === '.9') {
    drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
  } else {
    var offset = bgimage.offset || [0, 0],
        w = image.width,
        h = image.height;

    if (display === 'center') {
      offset = [(clientWidth - w) * 0.5, (clientHeight - h) * 0.5];
    } else if (display === 'stretch') {
      w = clientWidth - offset[0];
      h = clientHeight - offset[1];
    }

    drawingContext.drawImage(image, borderWidth + offset[0], borderWidth + offset[1], w, h);

    if (w > 0 && (display === 'repeat' || display === 'repeatX')) {
      var cw = clientWidth - borderWidth - offset[0] - w;

      while (cw > borderWidth) {
        drawingContext.drawImage(image, clientWidth - cw, borderWidth + offset[1], w, h);

        if (h > 0 && display === 'repeat') {
          var ch = clientHeight - borderWidth - offset[1] - h;

          while (ch > borderWidth) {
            drawingContext.drawImage(image, clientWidth - cw, clientHeight - ch, w, h);
            ch -= h;
          }
        }

        cw -= w;
      }
    }

    if (h > 0 && (display === 'repeat' || display === 'repeatY')) {
      var _ch = clientHeight - borderWidth - offset[1] - h;

      while (_ch > borderWidth) {
        drawingContext.drawImage(image, borderWidth + offset[0], clientHeight - _ch, w, h);
        _ch -= h;
      }
    }
  }
}