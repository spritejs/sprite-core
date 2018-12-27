import {attr, deprecate, attributeNames, relatedAttributes, parseValue, decorators} from '../utils';

const _attr = Symbol('attr'),
  _style = Symbol('style'),
  _temp = Symbol('store'),
  _subject = Symbol('subject'),
  _default = Symbol('default');

export default class Attr {
  static relatedAttributes = relatedAttributes;

  static attributeNames = attributeNames;

  static addAttributes(attrs) {
    const descriptors = {};
    Object.entries(attrs).forEach(([key, v]) => {
      if(typeof v === 'function') {
        const _setter = v;
        v = {
          set(val) {
            _setter(this, val);
          },
        };
      }
      let {decorators: wrappers, value, get, set} = v;
      wrappers = wrappers || [attr];
      if(set == null) {
        set = function (val) {
          this.set(key, val);
        };
      }
      if(get == null) {
        get = function () {
          return this.get(key);
        };
      }
      const $decorator = decorators(...wrappers);
      descriptors[key] = $decorator(key, value, {set, get});
    });
    Object.defineProperties(this.prototype, descriptors);
  }

  constructor(subject) {
    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this[_style] = {};
    this.__cached = {};

    if(!subject.updateStyles) subject.updateStyles = () => {};

    this[_temp] = new Map(); // save non-serialized values

    Object.defineProperty(this, '__attributesSet', {
      value: new Set(),
    });
    Object.defineProperty(this, '__styleTag', {
      writable: true,
      value: false,
    });
    Object.defineProperty(this, '__updateTag', {
      writable: true,
      value: false,
    });
  }

  get __attr() {
    return this[_attr];
  }

  setDefault(attrs) {
    Object.assign(this[_default], attrs);
  }

  getDefaultValue(key, defaultValue) {
    if(key in this[_default]) return this[_default][key];
    return defaultValue;
  }

  saveObj(key, val) {
    this[_temp].set(key, val);
    this.__updateTag = true;
  }

  loadObj(key) {
    return this[_temp].get(key);
  }

  quietSet(key, val) {
    this.set(key, val, true);
  }

  clearStyle() {
    this[_style] = {};
  }

  clearLayout() {
    this.__clearLayout = true;
    return this;
  }

  get style() {
    return this[_style];
  }

  set(key, val, isQuiet = false) {
    this.__quietTag = isQuiet;
    let oldVal;
    if(isQuiet && key.length > 5 && key.indexOf('data-') === 0) {
      const dataKey = key.slice(5);
      oldVal = this.subject.data(dataKey);
      this.subject.data(dataKey, val);
    } else if(this.__styleTag) {
      oldVal = this[_style][key];
      if(val != null) {
        this[_style][key] = val;
      } else {
        delete this[_style][key];
      }
    } else {
      oldVal = this[_attr][key];
    }
    if(val && typeof val === 'object') {
      if(oldVal !== val && JSON.stringify(val) === JSON.stringify(oldVal)) {
        return false;
      }
    } else if(oldVal === val) {
      return false;
    }
    if(!this.__styleTag) {
      this[_attr][key] = val;
    }
    this.__updateTag = true;
    return true;
  }

  get(key) {
    if(key.length > 5 && key.indexOf('data-') === 0) {
      return this.subject.data(key.slice(5));
    }
    if(this.__getStyleTag || this[_style][key] != null && !this.__attributesSet.has(key)) {
      return this[_style][key];
    }
    return this[_attr][key];
  }

  getAttributes(includeDefault = false) {
    const ret = {};
    if(includeDefault) {
      [...attributeNames].forEach((key) => {
        if(key in this) {
          ret[key] = this[key];
        }
      });
    }
    [...this.__attributesSet].forEach((key) => {
      if(key.indexOf('__internal') !== 0) {
        ret[key] = this[key];
      }
    });
    Object.entries(this).forEach(([key, value]) => {
      if(key.indexOf('__') !== 0) {
        ret[key] = value;
      }
    });
    return ret;
  }

  get attrs() {
    return this.getAttributes(true);
  }

  @deprecate('You can remove this call.')
  clearCache() {
    return this;
  }

  merge(attrs) {
    if(typeof attrs === 'string') {
      attrs = JSON.parse(attrs);
    }
    Object.entries(attrs).forEach(([key, value]) => {
      this.subject.attr(key, value);
    });
    return this;
  }

  serialize() {
    const attrs = this.getAttributes();
    delete attrs.id;
    return JSON.stringify(attrs);
  }

  get subject() {
    return this[_subject];
  }

  /* ------------------- define attributes ----------------------- */
  // @attr({quiet, cache, reflow, relayout})
  @parseValue(String)
  @attr({quiet: true})
  id;

  @parseValue(String)
  @attr({quiet: true})
  name;

  @parseValue(String)
  @attr({quiet: true})
  class;
}
