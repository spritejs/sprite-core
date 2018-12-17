import BaseSprite from '../../core/basesprite';

function doActions(ret, target, act) {
  const actions = target.children.map(c => c[act]()).filter(d => d.promise);
  if(ret.promise) {
    actions.unshift(ret);
  }
  if(actions.length) {
    const deferred = {
      promise: Promise.all(actions.map(d => d.promise)),
      resolve() {
        actions.forEach(d => d.resolve());
        return this.promise;
      },
    };
    return deferred;
  }
  return null;
}

const _resolveState = Symbol('resolveState'),
  _changeStateAction = Symbol('changeStateAction'),
  _show = Symbol('show'),
  _hide = Symbol('hide'),
  _enter = Symbol('enter');

const enter = BaseSprite.prototype.enter;
const exit = BaseSprite.prototype.exit;

Object.assign(BaseSprite.prototype, {
  changeState(fromState, toState, action) {
    let animation;
    if(this[_changeStateAction]) {
      const currentAnim = this[_changeStateAction].animation;
      if(this[_changeStateAction].reversable && (currentAnim.playState === 'running' || currentAnim.playState === 'pending')
        && this[_changeStateAction].fromState === toState && this[_changeStateAction].toState === fromState) {
        currentAnim.playbackRate = -currentAnim.playbackRate;
        animation = currentAnim;
        animation.__reversed = this[_changeStateAction].action;
      } else {
        currentAnim.finish();
      }
    }
    if(!animation) {
      // const [_fromState, _toState] = [Object.assign({}, fromState), Object.assign({}, toState)];
      // delete _fromState.__default;
      // delete _toState.__default;
      const _fromState = {},
        _toState = {};
      Object.entries(fromState || {}).forEach(([key, value]) => {
        if(key !== '__default') {
          if(typeof value === 'function') {
            _fromState[key] = this.attr(key);
          } else {
            _fromState[key] = value;
          }
        }
      });
      Object.entries(toState || {}).forEach(([key, value]) => {
        if(key !== '__default') {
          if(typeof value === 'function') {
            _toState[key] = value(this.attr(key));
          } else {
            _toState[key] = value;
          }
        }
      });
      animation = this.animate([_fromState, _toState], Object.assign({fill: 'forwards'}, action));
      animation.finished.then(() => {
        if(this[_changeStateAction] && this[_changeStateAction].animation === animation) delete this[_changeStateAction];
      });
    }
    this[_changeStateAction] = {animation, fromState, toState, action, reversable: action.reversable !== false};
    return animation;
  },
  resolveStates(states, before, after) {
    let currentAnimation = null,
      resolved = false;

    const _states = [];
    let prev = null;
    for(let i = 0; i < states.length; i++) {
      const s = states[i];
      if(prev !== s) {
        prev = s;
        _states.push(s);
      }
    }
    states = _states;

    const _resolveStates = () => {
      this.__ignoreAction = false;
      let fromState = this.attr('state');
      if(fromState === states[0]) {
        states.shift();
      }

      const len = states.length;
      const resolveState = (state, i) => {
        const promise = new Promise((resolve) => {
          this.once(`state-to-${state}`, () => {
            fromState = state;
            if(i === len - 1) { // lastState
              delete this[_resolveState];
            }
            if(after) after.call(this, states);
            resolve(this);
          });
          this.once(`state-from-${fromState}`, ({animation}) => {
            if(animation && resolved) animation.finish();
            else currentAnimation = animation;
          });
          this.attr('state', state);
        });
        return promise;
      };

      let promise = Promise.resolve();
      states.forEach((state, i) => {
        promise = promise.then(() => {
          return resolveState(state, i);
        });
      });

      const ret = {
        get animation() {
          return currentAnimation;
        },
        states,
        resolve() {
          resolved = true;
          if(currentAnimation) currentAnimation.finish();
          return promise;
        },
        promise,
      };
      this[_resolveState] = ret;
      return ret;
    };
    const rs = this[_resolveState];
    if(rs) {
      rs.resolve();
      this.__ignoreAction = true;
      const promise = rs.promise.then(() => {
        if(before) before.call(this, states);
        return _resolveStates().promise;
      });
      return {
        promise,
        resolve() {
          resolved = true;
          if(currentAnimation) currentAnimation.finish();
          return promise;
        },
      };
    }
    if(before) before.call(this, states);
    return _resolveStates();
  },
  // state: original -> show -> hide -> show -> original
  show() {
    if(this[_show]) return this[_show];

    const originalDisplay = this.attr('__originalDisplay') || '';
    const originalState = this.attr('__originalState') || 'default';

    const states = this.attr('states');

    if(states.show) {
      const _st = ['show', originalState];
      if(states.beforeShow) {
        _st.unshift('beforeShow');
      }
      const deferred = this.resolveStates(_st, () => {
        const state = this.attr('state');
        if(state === 'hide') {
          this.once('state-from-hide', () => {
            this.attr('display', originalDisplay);
          });
        }
      });
      deferred.promise = deferred.promise.then(() => {
        if(!this[_hide]) {
          delete this.__attr.__originalDisplay;
          delete this.__attr.__originalState;
          if(states.show.__default) {
            delete states.show;
            this.attr('states', states);
          }
        }
        delete this[_show];
      });
      this[_show] = deferred;
      return deferred;
    }

    const rs = this[_resolveState];
    if(rs) {
      rs.resolve();
      rs.promise.then(() => {
        this.attr('state', originalState);
        this.attr('display', originalDisplay);
      });
      return rs;
    }

    this.attr('state', originalState);
    this.attr('display', originalDisplay);
    return this;
  },
  hide() {
    const state = this.attr('state');
    if(this[_hide] || state === 'hide' || state === 'afterExit' || state === 'beforeExit') return this[_hide];
    const __originalDisplay = this.attr('__originalDisplay');
    if(__originalDisplay == null) {
      const display = this.attr('display');

      this.attr({
        __originalDisplay: display !== 'none' ? display : '',
        __originalState: state !== 'hide' ? state : 'default',
      });
    }

    const states = this.attr('states');

    if(states.hide) {
      const deferred = this.resolveStates(['show', 'hide'], () => {
        if(!states.show) {
          const beforeHide = {__default: true};
          if(states.beforeShow) {
            Object.keys(states.beforeShow).forEach((key) => {
              beforeHide[key] = this.attr(key);
            });
          }
          Object.keys(states.hide).forEach((key) => {
            beforeHide[key] = this.attr(key);
          });
          states.show = beforeHide;
          this.attr('states', states);
        }
      });
      deferred.promise = deferred.promise.then(() => {
        this.attr('display', 'none');
        delete this[_hide];
        return this;
      });
      this[_hide] = deferred;
      return deferred;
    }

    const rs = this[_resolveState];
    if(rs) {
      rs.resolve();
      rs.promise.then(() => {
        this.attr('state', 'hide');
        this.attr('display', 'none');
      });
      return rs;
    }

    this.attr('state', 'hide');
    this.attr('display', 'none');
    return this;
  },
  enter(toState) {
    const states = this.attr('states');
    let ret;
    if(states && (states.beforeEnter || states.afterEnter)) {
      const deferred = this.resolveStates(['beforeEnter', 'afterEnter'], (_states) => {
        const state = this.attr('state');
        _states.push(toState || state);
        if(state !== 'beforeEnter' && state !== 'afterEnter' && (!states.afterEnter || states.afterEnter.__default)) {
          const afterEnter = {__default: true};
          Object.keys(states.beforeEnter).forEach((key) => {
            afterEnter[key] = this.attr(key);
          });
          states.afterEnter = afterEnter;
          this.attr('states', states);
        }
      });
      ret = deferred;
    } else {
      ret = enter.call(this);
    }

    this[_enter] = ret;
    if(this.children) {
      const enterMode = this.attr('enterMode');
      if(enterMode === 'onebyone' || enterMode === 'onebyone-reverse') {
        let promise = null;
        let resolved = false;
        if(ret.promise) {
          promise = ret.promise;
        } else {
          promise = Promise.resolve(this);
        }

        let children = this.children;
        if(enterMode === 'onebyone-reverse') {
          children = [...children].reverse();
        }

        let currentTask = ret;
        children.forEach((c) => {
          const states = c.attr('states');
          if(states && (states.beforeEnter || states.afterEnter)) {
            if(!states.afterEnter || states.afterEnter.__default) {
              const afterEnter = {__default: true};
              Object.keys(states.beforeEnter).forEach((key) => {
                afterEnter[key] = c.attr(key);
              });
              states.afterEnter = afterEnter;
              c.attr('states', states);
            }
          }
          const toState = c.attr('state');
          c.attr('state', 'beforeEnter');
          promise = promise.then(() => {
            const d = c.enter(toState);
            if(d.promise) {
              currentTask = d;
              if(resolved && d.resolve) {
                d.resolve();
              }
              return d.promise;
            }
            return d;
          });
        });

        this[_enter] = {
          promise,
          resolve() {
            if(currentTask && currentTask.resolve) currentTask.resolve();
            resolved = true;
          },
        };
      } else {
        const deferred = doActions(ret, this, 'enter');
        if(deferred) this[_enter] = deferred;
      }
    }

    return this[_enter];
  },
  exit(toState, onbyone = false) {
    const _exit = () => {
      const states = this.attr('states');
      let ret;
      const afterEnter = states.afterEnter || {};
      if(states && (states.beforeExit || states.afterExit)) {
        let state;
        const deferred = this.resolveStates(['beforeExit', 'afterExit'], () => {
          state = this.attr('state');
          if(state !== 'beforeExit' && state !== 'afterExit' && (!states.beforeExit || states.beforeExit.__default)) {
            states.beforeExit = Object.assign({}, afterEnter);
            states.beforeExit.__default = true;
            this.attr('states', states);
          }
        });
        deferred.promise.then(() => {
          if(!onbyone) {
            this.attr(afterEnter);
            this.__attr.quietSet('state', toState || state);
          }
          return this;
        });
        ret = deferred;
      } else {
        const rs = this[_resolveState];
        if(rs) {
          rs.resolve();
          rs.promise.then(() => {
            this.attr(afterEnter);
            return exit.call(this);
          });
          ret = rs;
        } else {
          ret = exit.call(this);
          this.attr(afterEnter);
        }
      }

      if(this.children) {
        const exitMode = this.attr('exitMode');
        if(exitMode === 'onebyone' || exitMode === 'onebyone-reverse') {
          let promise = Promise.resolve(this);
          let resolved = false;

          let children = this.children;
          if(exitMode === 'onebyone-reverse') {
            children = [...children].reverse();
          }

          let currentTask = null;
          children.forEach((c) => {
            const states = c.attr('states');
            if(states && (states.beforeExit || states.afterExit)) {
              if(!states.beforeExit || states.beforeExit.__default) {
                states.beforeExit = Object.assign({}, afterEnter);
                states.beforeExit.__default = true;
                c.attr('states', states);
              }
            }
            const toState = c.attr('state');
            c.attr('state', 'beforeExit');
            promise = promise.then(() => {
              const d = c.exit(toState, true);
              if(d.promise) {
                currentTask = d;
                if(resolved && d.resolve) d.resolve();
                return d.promise;
              }
              return d;
            });
            c.__toState = toState;
          });

          promise = promise.then(() => {
            const p = ret.promise || Promise.resolve(this);
            currentTask = ret;
            return p.then(() => {
              this.children.forEach((c) => {
                const states = c.attr('states');
                c.attr(states.afterEnter);
                c.__attr.quietSet('state', c.__toState);
                delete c.__toState;
              });
            });
          });

          return {
            promise,
            resolve() {
              if(currentTask && currentTask.resolve) currentTask.resolve();
              resolved = true;
            },
          };
        }

        const deferred = doActions(ret, this, 'exit');
        if(deferred) return deferred;
      }

      return ret;
    };

    if(this[_enter] && this[_enter].promise) {
      let resolved = false;
      this[_enter].resolve();
      const promise = this[_enter].promise.then(() => {
        const deferred = _exit();
        if(resolved && deferred.resolve) {
          deferred.resolve();
        }
        return deferred.promise;
      });
      return {
        promise,
        resolve() {
          resolved = true;
        },
      };
    }
    return _exit();
  },
});
