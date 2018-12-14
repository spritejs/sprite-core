import BaseAttr from '../../baseattr';
import {decorators, parseValue, attr, cachable} from '../../utils';

Object.assign(BaseAttr.attrDefaultValues, {
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: 'auto',
  order: 0,
  alignSelf: '',
});

const $attr = decorators(attr);
const $floatAttr = decorators(parseValue(parseFloat), attr);
const $intAttrCachable = decorators(parseValue(parseInt), attr, cachable);
const $attrCachable = decorators(attr, cachable);

const target = BaseAttr.prototype;
Object.defineProperties(target, {
  flexGrow: $floatAttr('flexGrow', {
    set(val) {
      this.clearLayout();
      this.set('flexGrow', val);
    },
  }),
  flexShrink: $floatAttr('flexShrink', {
    set(val) {
      this.clearLayout();
      this.set('flexShrink', val);
    },
  }),
  flexBasis: $attr('flexBasis', {
    set(val) {
      this.clearFlow();
      this.clearLayout();
      this.set('flexBasis', val);
    },
  }),
  order: $intAttrCachable('order', {
    set(val) {
      this.clearLayout();
      this.set('order', val);
    },
  }),
  alignSelf: $attrCachable('alignSelf', {
    set(val) {
      this.clearLayout();
      this.set('alignSelf', val);
    },
  }),
  flex: $attr('flex', {
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
  }),
});
