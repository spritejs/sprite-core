"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _basesprite = _interopRequireDefault(require("../../core/basesprite"));

function doActions(ret, target, act) {
  var actions = target.children.map(function (c) {
    return c[act]();
  }).filter(function (d) {
    return d.promise;
  });

  if (ret.promise) {
    actions.unshift(ret);
  }

  if (actions.length) {
    var deferred = {
      promise: Promise.all(actions.map(function (d) {
        return d.promise;
      })),
      resolve: function resolve() {
        actions.forEach(function (d) {
          return d.resolve();
        });
        return this.promise;
      }
    };
    return deferred;
  }

  return null;
}

var _resolveState = Symbol('resolveState'),
    _changeStateAction = Symbol('changeStateAction'),
    _show = Symbol('show'),
    _hide = Symbol('hide'),
    _enter = Symbol('enter');

var _enter2 = _basesprite.default.prototype.enter;
var _exit2 = _basesprite.default.prototype.exit;
Object.assign(_basesprite.default.prototype, {
  changeState: function changeState(fromState, toState, action) {
    var _this = this;

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
      Object.entries(fromState || {}).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (key !== '__default') {
          if (typeof value === 'function') {
            _fromState[key] = _this.attr(key);
          } else {
            _fromState[key] = value;
          }
        }
      });
      Object.entries(toState || {}).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        if (key !== '__default') {
          if (typeof value === 'function') {
            _toState[key] = value(_this.attr(key));
          } else {
            _toState[key] = value;
          }
        }
      });
      animation = this.animate([_fromState, _toState], Object.assign({
        fill: 'forwards'
      }, action));
      animation.finished.then(function () {
        if (_this[_changeStateAction] && _this[_changeStateAction].animation === animation) delete _this[_changeStateAction];
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
  },
  resolveStates: function resolveStates(states, before, after) {
    var _this2 = this;

    var currentAnimation = null,
        resolved = false;
    var _states = [];
    var prev = null;

    for (var i = 0; i < states.length; i++) {
      var s = states[i];

      if (prev !== s) {
        prev = s;

        _states.push(s);
      }
    }

    states = _states;

    var _resolveStates = function _resolveStates() {
      _this2.__ignoreAction = false;

      var fromState = _this2.attr('state');

      if (fromState === states[0]) {
        states.shift();
      }

      var len = states.length;

      var resolveState = function resolveState(state, i) {
        var promise = new Promise(function (resolve) {
          _this2.once("state-to-".concat(state), function () {
            fromState = state;

            if (i === len - 1) {
              // lastState
              delete _this2[_resolveState];
            }

            if (after) after.call(_this2, states);
            resolve(_this2);
          });

          _this2.once("state-from-".concat(fromState), function (_ref5) {
            var animation = _ref5.animation;
            if (animation && resolved) animation.finish();else currentAnimation = animation;
          });

          _this2.attr('state', state);
        });
        return promise;
      };

      var promise = Promise.resolve();
      states.forEach(function (state, i) {
        promise = promise.then(function () {
          return resolveState(state, i);
        });
      });
      var ret = {
        get animation() {
          return currentAnimation;
        },

        states: states,
        resolve: function resolve() {
          resolved = true;
          if (currentAnimation) currentAnimation.finish();
          return promise;
        },
        promise: promise
      };
      _this2[_resolveState] = ret;
      return ret;
    };

    var rs = this[_resolveState];

    if (rs) {
      rs.resolve();
      this.__ignoreAction = true;
      var promise = rs.promise.then(function () {
        if (before) before.call(_this2, states);
        return _resolveStates().promise;
      });
      return {
        promise: promise,
        resolve: function resolve() {
          resolved = true;
          if (currentAnimation) currentAnimation.finish();
          return promise;
        }
      };
    }

    if (before) before.call(this, states);
    return _resolveStates();
  },
  // state: original -> show -> hide -> show -> original
  show: function show() {
    var _this3 = this;

    if (this[_show]) return this[_show];
    var originalDisplay = this.attr('__originalDisplay') || '';
    var originalState = this.attr('__originalState') || 'default';
    var states = this.attr('states');

    if (states.show) {
      var _st = ['show', originalState];

      if (states.beforeShow) {
        _st.unshift('beforeShow');
      }

      var deferred = this.resolveStates(_st, function () {
        var state = _this3.attr('state');

        if (state === 'hide') {
          _this3.once('state-from-hide', function () {
            _this3.attr('display', originalDisplay);
          });
        }
      });
      deferred.promise = deferred.promise.then(function () {
        if (!_this3[_hide]) {
          delete _this3.__attr.__originalDisplay;
          delete _this3.__attr.__originalState;

          if (states.show.__default) {
            delete states.show;

            _this3.attr('states', states);
          }
        }

        delete _this3[_show];
      });
      this[_show] = deferred;
      return deferred;
    }

    var rs = this[_resolveState];

    if (rs) {
      rs.resolve();
      rs.promise.then(function () {
        _this3.attr('state', originalState);

        _this3.attr('display', originalDisplay);
      });
      return rs;
    }

    this.attr('state', originalState);
    this.attr('display', originalDisplay);
    return this;
  },
  hide: function hide() {
    var _this4 = this;

    var state = this.attr('state');
    if (this[_hide] || state === 'hide' || state === 'afterExit' || state === 'beforeExit') return this[_hide];

    var __originalDisplay = this.attr('__originalDisplay');

    if (__originalDisplay == null) {
      var display = this.attr('display');
      this.attr({
        __originalDisplay: display !== 'none' ? display : '',
        __originalState: state !== 'hide' ? state : 'default'
      });
    }

    var states = this.attr('states');

    if (states.hide) {
      var deferred = this.resolveStates(['show', 'hide'], function () {
        if (!states.show) {
          var beforeHide = {
            __default: true
          };

          if (states.beforeShow) {
            Object.keys(states.beforeShow).forEach(function (key) {
              beforeHide[key] = _this4.attr(key);
            });
          }

          Object.keys(states.hide).forEach(function (key) {
            beforeHide[key] = _this4.attr(key);
          });
          states.show = beforeHide;

          _this4.attr('states', states);
        }
      });
      deferred.promise = deferred.promise.then(function () {
        _this4.attr('display', 'none');

        delete _this4[_hide];
        return _this4;
      });
      this[_hide] = deferred;
      return deferred;
    }

    var rs = this[_resolveState];

    if (rs) {
      rs.resolve();
      rs.promise.then(function () {
        _this4.attr('state', 'hide');

        _this4.attr('display', 'none');
      });
      return rs;
    }

    this.attr('state', 'hide');
    this.attr('display', 'none');
    return this;
  },
  enter: function enter(toState) {
    var _this5 = this;

    var states = this.attr('states');
    var ret;

    if (states && (states.beforeEnter || states.afterEnter)) {
      var deferred = this.resolveStates(['beforeEnter', 'afterEnter'], function (_states) {
        var state = _this5.attr('state');

        _states.push(toState || state);

        if (state !== 'beforeEnter' && state !== 'afterEnter' && (!states.afterEnter || states.afterEnter.__default)) {
          var afterEnter = {
            __default: true
          };
          Object.keys(states.beforeEnter).forEach(function (key) {
            afterEnter[key] = _this5.attr(key);
          });
          states.afterEnter = afterEnter;

          _this5.attr('states', states);
        }
      });
      ret = deferred;
    } else {
      ret = _enter2.call(this);
    }

    this[_enter] = ret;

    if (this.children) {
      var enterMode = this.attr('enterMode');

      if (enterMode === 'onebyone' || enterMode === 'onebyone-reverse') {
        var promise = null;
        var resolved = false;

        if (ret.promise) {
          promise = ret.promise;
        } else {
          promise = Promise.resolve(this);
        }

        var children = this.children;

        if (enterMode === 'onebyone-reverse') {
          children = (0, _toConsumableArray2.default)(children).reverse();
        }

        var currentTask = ret;
        children.forEach(function (c) {
          var states = c.attr('states');

          if (states && (states.beforeEnter || states.afterEnter)) {
            if (!states.afterEnter || states.afterEnter.__default) {
              var afterEnter = {
                __default: true
              };
              Object.keys(states.beforeEnter).forEach(function (key) {
                afterEnter[key] = c.attr(key);
              });
              states.afterEnter = afterEnter;
              c.attr('states', states);
            }
          }

          var toState = c.attr('state');
          c.attr('state', 'beforeEnter');
          promise = promise.then(function () {
            var d = c.enter(toState);

            if (d.promise) {
              currentTask = d;

              if (resolved && d.resolve) {
                d.resolve();
              }

              return d.promise;
            }

            return d;
          });
        });
        this[_enter] = {
          promise: promise,
          resolve: function resolve() {
            if (currentTask && currentTask.resolve) currentTask.resolve();
            resolved = true;
          }
        };
      } else {
        var _deferred = doActions(ret, this, 'enter');

        if (_deferred) this[_enter] = _deferred;
      }
    }

    return this[_enter];
  },
  exit: function exit(toState) {
    var _this6 = this;

    var onbyone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _exit = function _exit() {
      var states = _this6.attr('states');

      var ret;
      var afterEnter = states.afterEnter || {};

      if (states && (states.beforeExit || states.afterExit)) {
        var state;

        var deferred = _this6.resolveStates(['beforeExit', 'afterExit'], function () {
          state = _this6.attr('state');

          if (state !== 'beforeExit' && state !== 'afterExit' && (!states.beforeExit || states.beforeExit.__default)) {
            states.beforeExit = Object.assign({}, afterEnter);
            states.beforeExit.__default = true;

            _this6.attr('states', states);
          }
        });

        deferred.promise.then(function () {
          if (!onbyone) {
            _this6.attr(afterEnter);

            _this6.__attr.quietSet('state', toState || state);
          }

          return _this6;
        });
        ret = deferred;
      } else {
        var rs = _this6[_resolveState];

        if (rs) {
          rs.resolve();
          rs.promise.then(function () {
            _this6.attr(afterEnter);

            return _exit2.call(_this6);
          });
          ret = rs;
        } else {
          ret = _exit2.call(_this6);

          _this6.attr(afterEnter);
        }
      }

      if (_this6.children) {
        var exitMode = _this6.attr('exitMode');

        if (exitMode === 'onebyone' || exitMode === 'onebyone-reverse') {
          var promise = Promise.resolve(_this6);
          var resolved = false;
          var children = _this6.children;

          if (exitMode === 'onebyone-reverse') {
            children = (0, _toConsumableArray2.default)(children).reverse();
          }

          var currentTask = null;
          children.forEach(function (c) {
            var states = c.attr('states');

            if (states && (states.beforeExit || states.afterExit)) {
              if (!states.beforeExit || states.beforeExit.__default) {
                states.beforeExit = Object.assign({}, afterEnter);
                states.beforeExit.__default = true;
                c.attr('states', states);
              }
            }

            var toState = c.attr('state');
            c.attr('state', 'beforeExit');
            promise = promise.then(function () {
              var d = c.exit(toState, true);

              if (d.promise) {
                currentTask = d;
                if (resolved && d.resolve) d.resolve();
                return d.promise;
              }

              return d;
            });
            c.__toState = toState;
          });
          promise = promise.then(function () {
            var p = ret.promise || Promise.resolve(_this6);
            currentTask = ret;
            return p.then(function () {
              _this6.children.forEach(function (c) {
                var states = c.attr('states');
                c.attr(states.afterEnter);

                c.__attr.quietSet('state', c.__toState);

                delete c.__toState;
              });
            });
          });
          return {
            promise: promise,
            resolve: function resolve() {
              if (currentTask && currentTask.resolve) currentTask.resolve();
              resolved = true;
            }
          };
        }

        var _deferred2 = doActions(ret, _this6, 'exit');

        if (_deferred2) return _deferred2;
      }

      return ret;
    };

    if (this[_enter] && this[_enter].promise) {
      var resolved = false;

      this[_enter].resolve();

      var promise = this[_enter].promise.then(function () {
        var deferred = _exit();

        if (resolved && deferred.resolve) {
          deferred.resolve();
        }

        return deferred.promise;
      });

      return {
        promise: promise,
        resolve: function resolve() {
          resolved = true;
        }
      };
    }

    return _exit();
  }
});