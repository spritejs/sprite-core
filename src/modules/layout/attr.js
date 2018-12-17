import BaseAttr from '../../core/baseattr';
import {parseValue, attr} from '../../utils';

const defaultValues = {
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: 'auto',
  order: 0,
  alignSelf: '',
};

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
    value: defaultValues.flexGrow,
  },
  flexShrink: {
    decorators: [parseValue(parseFloat), attr({relayout})],
    value: defaultValues.flexShrink,
  },
  flexBasis: {
    decorators: [attr({relayout, reflow})],
    value: defaultValues.flexBasis,
  },
  order: {
    decorators: [parseValue(parseInt), attr({cache, relayout})],
    value: defaultValues.order,
  },
  alignSelf: {
    decorators: [attr({cache, relayout})],
    value: defaultValues.alignSelf,
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
