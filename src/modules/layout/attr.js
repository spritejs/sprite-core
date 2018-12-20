import BaseAttr from '../../core/baseattr';
import {parseValue, attr} from '../../utils';

/*
  BaseAttr.addAttributes({
    flexGrow: {
      decorators: [],
      value: ...,
      set: ...,
      get: ...,
    },
  });
*/
const relayout = true,
  reflow = true,
  cache = true;

BaseAttr.addAttributes({
  flexGrow: {
    decorators: [parseValue(parseFloat), attr({relayout})],
    value: 0,
  },
  flexShrink: {
    decorators: [parseValue(parseFloat), attr({relayout})],
    value: 1,
  },
  flexBasis: {
    decorators: [attr({relayout, reflow})],
    value: 'auto',
  },
  order: {
    decorators: [parseValue(parseInt), attr({cache, relayout})],
    value: 0,
  },
  alignSelf: {
    decorators: [attr({cache, relayout})],
    value: '',
  },
  flex: {
    set(val) {
      this.clearFlow();
      if(val != null && val !== 'initial') {
        if(val === 'auto') {
          this.flexGrow = 1;
          this.flexShrink = 1;
          this.flexBasis = 'auto';
        } else if(val === 'none') {
          this.flexGrow = 0;
          this.flexShrink = 0;
          this.flexBasis = 'auto';
        } else if(typeof val === 'string') {
          const values = val.trim().split(/\s+/);
          this.flexGrow = values[0];
          this.flexShrink = values[1];
          this.flexBasis = values[2];
        } else {
          this.flexGrow = val;
          this.flexShrink = 1;
          this.flexBasis = 'auto';
        }
      } else {
        this.flexGrow = 0;
        this.flexShrink = 1;
        this.flexBasis = 'auto';
      }
    },
    get() {
      return `${this.flexGrow} ${this.flexShrink} ${this.flexBasis}`;
    },
  },
});
