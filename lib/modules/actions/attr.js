"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _baseattr = _interopRequireDefault(require("../../core/baseattr"));

var defaultValues = {
  state: 'default',
  states: {},
  actions: {
    'beforeEnter:': {
      duration: 300,
      easing: 'ease-in'
    },
    'beforeExit:': {
      duration: 300,
      easing: 'ease-out'
    },
    'hide:': {
      duration: 300,
      easing: 'ease-in'
    },
    ':hide': {
      duration: 300,
      easing: 'ease-out'
    },
    'hide:beforeShow': 'none',
    'beforeShow:': {
      duration: 300,
      easing: 'ease-in'
    }
  },
  enterMode: 'normal',
  exitMode: 'normal'
};

_baseattr.default.addAttributes({
  states: {
    value: defaultValues.states,
    set: function set(val) {
      val = Object.assign({}, val);
      var states = this.states; // recover __default

      Object.entries(states).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (value.__default && !(key in val)) {
          val[key] = value;
        }
      });
      this.quietSet('states', val);
    }
  },
  actions: {
    value: defaultValues.actions,
    set: function set(val) {
      if (Array.isArray(val)) {
        var value = {};
        val.forEach(function (v) {
          var key;
          var action = v.action;

          if (!action) {
            action = Object.assign({}, v);
            delete action.from;
            delete action.to;
            delete action.both;
          }

          if (v.both) {
            if (!Array.isArray(v.both)) {
              v.both = [v.both];
            }

            if (v.both.length > 1) {
              key = v.both.join(':');
              value[key] = Object.assign({}, action);
              key = v.both.reverse().join(':');
              value[key] = Object.assign({}, action);
            } else {
              value["".concat(v.both[0], ":")] = Object.assign({}, action);
              value[":".concat(v.both[0])] = Object.assign({}, action);
            }
          } else {
            key = "".concat(v.from || '', ":").concat(v.to || '');
            value[key] = Object.assign({}, action);
          }
        });
        val = value;
      }

      var defaultVal = defaultValues.actions;
      val = Object.assign({}, defaultVal, val);
      this.quietSet('actions', val);
    }
  },
  state: {
    value: defaultValues.state,
    set: function set(val) {
      if (val == null) val = 'default';
      var oldState = this.state;

      if (oldState !== val) {
        this.quietSet('state', val);
        var states = this.states;
        var action = null;
        var toState = states[val] || {};
        var subject = this.subject;

        if (!subject.__ignoreAction && subject.layer) {
          var fromState = states[oldState],
              actions = this.actions;
          action = actions["".concat(oldState, ":").concat(val)] || actions[":".concat(val)] || actions["".concat(oldState, ":")];
          if (!action || action === 'none') action = {
            duration: 0
          };
          var animation = subject.changeState(fromState, toState, action);
          var tag = Symbol('tag');
          animation.tag = tag;

          if (animation.__reversed) {
            subject.dispatchEvent("state-to-".concat(oldState), {
              from: val,
              to: oldState,
              action: animation.__reversed,
              cancelled: true,
              animation: animation
            }, true, true);
          }

          subject.dispatchEvent("state-from-".concat(oldState), {
            from: oldState,
            to: val,
            action: action,
            animation: animation
          }, true, true);
          animation.finished.then(function () {
            if (animation.tag === tag) {
              subject.dispatchEvent("state-to-".concat(val), {
                from: oldState,
                to: val,
                action: action,
                animation: animation
              }, true, true);
            }
          });

          if (oldState === 'afterExit') {
            animation.finish();
          }
        } else {
          subject.dispatchEvent("state-from-".concat(oldState), {
            from: oldState,
            to: val
          }, true, true);
          if (toState) subject.attr(toState);
          subject.dispatchEvent("state-to-".concat(val), {
            from: oldState,
            to: val
          }, true, true);
        }
      }
    }
  },
  enterMode: {
    value: defaultValues.enterMode
  },
  exitMode: {
    value: defaultValues.exitMode
  }
});