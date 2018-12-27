import BaseAttr from '../../core/baseattr';

const defaultValues = {
  state: 'default',
  states: {},
  actions: {
    'beforeEnter:': {
      duration: 300,
      easing: 'ease-in',
    },
    'beforeExit:': {
      duration: 300,
      easing: 'ease-out',
    },
    'hide:': {
      duration: 300,
      easing: 'ease-in',
    },
    ':hide': {
      duration: 300,
      easing: 'ease-out',
    },
    'hide:beforeShow': 'none',
    'beforeShow:': {
      duration: 300,
      easing: 'ease-in',
    },
  },
  enterMode: 'normal',
  exitMode: 'normal',
};

BaseAttr.addAttributes({
  states: {
    value: defaultValues.states,
    set(val) {
      val = Object.assign({}, val);
      const states = this.states;
      // recover __default
      Object.entries(states).forEach(([key, value]) => {
        if(value.__default && !(key in val)) {
          val[key] = value;
        }
      });
      this.quietSet('states', val);
    },
  },
  actions: {
    value: defaultValues.actions,
    set(val) {
      if(Array.isArray(val)) {
        const value = {};
        val.forEach((v) => {
          let key;
          let action = v.action;
          if(!action) {
            action = Object.assign({}, v);
            delete action.from;
            delete action.to;
            delete action.both;
          }
          if(v.both) {
            if(!Array.isArray(v.both)) {
              v.both = [v.both];
            }
            if(v.both.length > 1) {
              key = v.both.join(':');
              value[key] = Object.assign({}, action);
              key = v.both.reverse().join(':');
              value[key] = Object.assign({}, action);
            } else {
              value[`${v.both[0]}:`] = Object.assign({}, action);
              value[`:${v.both[0]}`] = Object.assign({}, action);
            }
          } else {
            key = `${v.from || ''}:${v.to || ''}`;
            value[key] = Object.assign({}, action);
          }
        });
        val = value;
      }
      const defaultVal = defaultValues.actions;
      val = Object.assign({}, defaultVal, val);
      this.quietSet('actions', val);
    },
  },
  state: {
    value: defaultValues.state,
    set(val) {
      if(val == null) val = 'default';
      const oldState = this.state;
      if(oldState !== val) {
        this.quietSet('state', val);
        const states = this.states;

        let action = null;
        const toState = states[val] || {};
        const subject = this.subject;
        if(!subject.__ignoreAction && subject.layer) {
          const fromState = states[oldState],
            actions = this.actions;
          action = actions[`${oldState}:${val}`] || actions[`:${val}`] || actions[`${oldState}:`];
          if(!action || action === 'none') action = {duration: 0};

          const animation = subject.changeState(fromState, toState, action);
          const tag = Symbol('tag');
          animation.tag = tag;
          if(animation.__reversed) {
            subject.dispatchEvent(`state-to-${oldState}`, {
              from: val,
              to: oldState,
              action: animation.__reversed,
              cancelled: true,
              animation}, true, true);
          }
          subject.dispatchEvent(`state-from-${oldState}`, {from: oldState, to: val, action, animation}, true, true);
          animation.finished.then(() => {
            if(animation.tag === tag) {
              subject.dispatchEvent(`state-to-${val}`, {from: oldState, to: val, action, animation}, true, true);
            }
          });
          if(oldState === 'afterExit') {
            animation.finish();
          }
        } else {
          subject.dispatchEvent(`state-from-${oldState}`, {from: oldState, to: val}, true, true);
          if(toState) subject.attr(toState);
          subject.dispatchEvent(`state-to-${val}`, {from: oldState, to: val}, true, true);
        }
      }
    },
  },
  enterMode: {
    value: defaultValues.enterMode,
  },
  exitMode: {
    value: defaultValues.exitMode,
  },
});
