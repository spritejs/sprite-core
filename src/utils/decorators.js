import {notice} from './utils';
import {attributeNames, relatedAttributes} from './store';

const _attrAbsolute = Symbol('attrAbsolute');

/* eslint-disable prefer-rest-params */
function polyfillLegacy(target, key, descriptor) {
  return {target, key, descriptor};
}

function getPV(subject, relative) {
  let parent = subject.parent;
  let pv = null;
  if(parent) {
    let attrSize = parent.attrSize;
    if(attrSize) {
      const attrV = relative === 'pw' ? attrSize[0] : attrSize[1];
      while(attrSize && attrV === '') { // flexible value
        parent = parent.parent;
        attrSize = parent.attrSize;
      }
    }
    if(relative === 'pw') {
      pv = attrSize ? parent.contentSize[0] : parent.resolution[0];
    } else if(relative === 'ph') {
      pv = attrSize ? parent.contentSize[1] : parent.resolution[1];
    }
  }
  return pv;
}

export function attr(options) {
  let cache = false,
    reflow = false,
    relayout = false,
    quiet = false,
    value = null,
    extra = null;

  const decorator = function (elementDescriptor) {
    if(arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }
    const {key, kind} = elementDescriptor;
    attributeNames.add(key);

    if(quiet && (cache || reflow || relayout)) {
      throw new Error(`${key}: quietSet cannot enable cache or reflow or relayout`);
    }

    // let _symbolKey = key;
    let defaultValue = value != null ? value : elementDescriptor.value;

    const relativeType = elementDescriptor.descriptor.__relative;
    const inheritValue = elementDescriptor.descriptor.__inherit;
    const composit = elementDescriptor.descriptor.__composit;

    if(kind === 'field') {
      defaultValue = elementDescriptor.initializer ? elementDescriptor.initializer() : value;
      // _symbolKey = Symbol(key);
      const setter = quiet ? function (val) { this.quietSet(key, val) }
        : function (val) { this.set(key, val) };
      elementDescriptor = {
        kind: 'method',
        key,
        placement: 'prototype',
        descriptor: {
          configurable: true,
          enumerable: true,
          set: setter,
          get() {
            return this.get(key);
          },
        },
      };
    }

    if(relativeType) {
      elementDescriptor = applyRative(elementDescriptor, relativeType);
    }
    if(inheritValue) {
      elementDescriptor = applyInherit(elementDescriptor, inheritValue.defaultValue);
    }

    const descriptor = elementDescriptor.descriptor;

    let _getter = descriptor.get;
    if(!_getter) {
      _getter = function () {
        const ret = this.get(key);
        return ret != null ? ret : this.getDefaultValue(key, defaultValue);
      };
    }
    if(composit) {
      if(cache || reflow || relayout || quiet || value || extra) {
        throw new Error('Cannot apply state to composit attribute.');
      }
      descriptor.get = _getter;
    } else if(!relativeType && !inheritValue) {
      descriptor.get = function () {
        const ret = _getter.call(this);
        return ret != null ? ret : this.getDefaultValue(key, defaultValue);
      };
    } else if(relativeType) {
      // enable set default to user defined getter
      descriptor.get = function () {
        let ret = _getter.call(this);
        const subject = this.subject;

        if(ret == null) {
          ret = this.getDefaultValue(key, defaultValue);
        } else if(ret.relative) {
          const relative = ret.relative.trim();
          if(relative === 'pw' || relative === 'ph') {
            const pv = getPV(subject, relative);
            if(pv !== ret.pv) {
              this[key] = ret.rv;
              return this[key];
            }
            subject.cache = null;
            if(subject[_attrAbsolute]) {
              return pv * ret.v;
            }
            return ret.rv;
          }
          if(relative === 'rw' || relative === 'rh') {
            const layer = subject.layer;
            let pv = null;
            if(layer) {
              if(relative === 'rw') {
                pv = layer.resolution[0];
              } else if(relative === 'rh') {
                pv = layer.resolution[1];
              }
            }
            if(pv !== ret.pv) {
              this[key] = ret.rv;
              return this[key];
            }
            subject.cache = null;
            if(subject[_attrAbsolute]) {
              return pv * ret.v;
            }
            return ret.rv;
          }
        }
        return ret;
      };
    } else {
      // enable set default to user defined getter
      descriptor.get = function () {
        let ret = _getter.call(this);
        const subject = this.subject;
        if(ret == null) {
          ret = this.getDefaultValue(key, defaultValue);
        }
        if(ret === 'inherit') {
          let value = null;
          let parent = subject.parent;
          while(parent && parent.attr) {
            value = parent.attr(key);
            if(value != null) break;
            parent = parent.parent;
          }
          return value != null ? value : this.__inheritDefaults[key];
        }
        return ret;
      };
    }

    if(!composit) {
      const _setter = descriptor.set;
      const _clearCache = !(descriptor.__cachable || cache);

      descriptor.set = function (val) {
        const subject = this.subject;
        this.__updateTag = false;
        this.__reflowTag = reflow;
        this.__clearLayout = relayout;

        if(!this.__styleTag && val != null && this.__attributesSet) {
          this.__attributesSet.add(key);
        }
        if(!this.__styleTag && val == null && this.__attributesSet) {
          if(this.__attributesSet.has(key)) {
            this.__attributesSet.delete(key);
          }
        }

        _setter.call(this, val);
        if(subject && !this.__quietTag && this.__updateTag) {
          let clearLayout = this.__clearLayout;
          if(this.__reflowTag) { // reflow must before clearLayout because boxOffsetSize is also flowed.
            subject.reflow();
          }
          if(subject.hasLayout) {
            const offsetSize = subject.boxOffsetSize,
              layoutSize = subject.__lastLayout;
            clearLayout |= !layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1];
            subject.__lastLayout = offsetSize;
          }
          if(clearLayout) subject.clearLayout();
          subject.forceUpdate(_clearCache);
        }
        if(this.__updateTag) {
          if(relatedAttributes.has(key)) {
            subject.updateStyles();
          }
          if(extra) {
            this[extra](key, val);
          }
        }
      };
      // delete this.__reflowTag;
      // delete this.__updateTag;
    }
    if(arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
  if(options.descriptor) {
    return decorator(options);
  }
  if(arguments.length === 3) {
    return decorator.apply(this, arguments);
  }
  quiet = !!options.quiet;
  cache = !!options.cache;
  reflow = !!options.reflow;
  relayout = !!options.relayout;
  value = options.value;
  extra = options.extra;

  return decorator;
}

export function composit(struct) {
  return function (elementDescriptor) {
    if(arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }
    const {kind, key} = elementDescriptor;
    if(kind !== 'field') {
      throw new Error(`Invalid composit attribute ${key}`);
    }
    elementDescriptor.kind = 'method';
    let set,
      get;

    if(typeof struct === 'string') {
      set = function (val) {
        this[struct] = val;
      };
      get = function () {
        return this[struct];
      };
    } else if(Array.isArray(struct)) {
      set = function (val) {
        struct.forEach((key, i) => {
          this[key] = val != null ? val[i] : null;
        });
      };
      get = function () {
        return struct.map(key => this[key]);
      };
    } else {
      struct = Object.entries(struct);
      set = function (val) {
        struct.forEach(([prop, key]) => {
          this[key] = val != null ? val[prop] : null;
        });
      };
      get = function () {
        const ret = {};
        struct.forEach(([prop, key]) => {
          ret[prop] = this[key];
        });
        return ret;
      };
    }
    elementDescriptor.descriptor = {get, set, __composit: true};
    if(arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
}

// after attr
export function cachable(elementDescriptor) {
  if(arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }
  const {descriptor} = elementDescriptor;
  descriptor.__cachable = true;
  if(arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
}

export const inheritAttributes = new Set();

// after attr
export function inherit(defaultValue = '') {
  return function (elementDescriptor) {
    if(arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }
    const {descriptor} = elementDescriptor;
    descriptor.__inherit = {defaultValue};
    if(arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
}

function applyInherit(elementDescriptor, defaultValue) {
  const {key, finisher, target} = elementDescriptor;
  inheritAttributes.add(key);
  if(target) {
    if(!target.hasOwnProperty('__inheritDefaults')) { // eslint-disable-line no-prototype-builtins
      target.__inheritDefaults = Object.create(target.__inheritDefaults || null);
    }
    target.__inheritDefaults[key] = defaultValue;
    return elementDescriptor;
  }
  return {
    ...elementDescriptor,
    finisher(klass) {
      if(finisher) finisher(klass);
      const {prototype: proto} = klass;
      if(!proto.hasOwnProperty('__inheritDefaults')) { // eslint-disable-line no-prototype-builtins
        proto.__inheritDefaults = Object.create(proto.__inheritDefaults || null);
      }
      proto.__inheritDefaults[key] = defaultValue;
    },
  };
}

// after attr
// relative -> width | height
export function relative(type = 'width') {
  return function (elementDescriptor) {
    if(arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }
    const {descriptor} = elementDescriptor;
    descriptor.__relative = type;
    if(arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
}

function applyRative(elementDescriptor, type) {
  const {descriptor} = elementDescriptor;

  const setter = descriptor.set;

  descriptor.set = function (val) {
    if(typeof val === 'string') {
      val = val.trim();
      if(val.slice(-1) === '%') {
        const relative = type === 'width' ? 'pw' : 'ph';
        const pv = getPV(this.subject, relative);
        val = {
          relative,
          pv,
          v: parseFloat(val) / 100,
          rv: val,
        };
      } else {
        const relative = val.slice(-2);
        if(relative === 'rw' || relative === 'rh') {
          let pv = null;
          const layer = this.subject.layer;
          if(layer) {
            pv = layer.resolution[relative === 'rw' ? 0 : 1];
          }
          val = {
            relative,
            pv,
            v: parseFloat(val) / 100,
            rv: val,
          };
        } else {
          val = val ? parseFloat(val) : val;
        }
      }
    }
    setter.call(this, val);
  };
  return elementDescriptor;
}

export function flow(elementDescriptor) {
  if(arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }
  const {descriptor, key} = elementDescriptor;
  if(descriptor.get) {
    const _getter = descriptor.get;
    descriptor.get = function () {
      let ret = this.flow(key);
      if(ret === undefined) {
        ret = _getter.call(this);
        this.flow(key, ret);
      }
      return ret;
    };
  }
  if(arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
}

// set tag force to get absolute value from relative attributes
export function absolute(elementDescriptor) {
  if(arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }
  const {descriptor} = elementDescriptor;
  if(descriptor.get) {
    const _getter = descriptor.get;
    descriptor.get = function () {
      this[_attrAbsolute] = true;
      const ret = _getter.call(this);
      this[_attrAbsolute] = false;
      return ret;
    };
  }
  if(arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
}

export function setDeprecation(apiName, msg = '') {
  msg = `[Deprecation] ${apiName} has been deprecated.${msg}`;
  notice(msg);
}

export function deprecate(msg, apiName = '') {
  const decorator = function (elementDescriptor) {
    if(arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }
    const {descriptor, key} = elementDescriptor;
    apiName = apiName || `Method ${key}`;
    if(typeof descriptor.value === 'function') {
      const func = descriptor.value;
      descriptor.value = function (...args) {
        setDeprecation(apiName, msg);
        return func.apply(this, args);
      };
    }
    if(descriptor.set) {
      const setter = descriptor.set;
      descriptor.set = function (val) {
        setDeprecation(apiName, msg);
        return setter.call(this, val);
      };
    }
    if(descriptor.get) {
      const getter = descriptor.get;
      descriptor.get = function () {
        setDeprecation(apiName, msg);
        return getter.call(this);
      };
    }
    if(arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
  if(msg.descriptor) {
    return decorator(msg);
  }
  if(arguments.length === 3) {
    return decorator.apply(this, arguments);
  }
  return decorator;
}

// before attr
export function parseValue(...parsers) {
  return function (elementDescriptor) {
    if(arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }
    const {descriptor} = elementDescriptor;
    const setter = descriptor.set;

    descriptor.set = function (val) {
      if(val != null && val !== '' && val !== 'inherit') {
        val = parsers.reduce((v, parser) => parser(v), val);
      }
      setter.call(this, val);
    };
    if(arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
}

// return a function to apply any decorators to a descriptor
export function decorators(...funcs) {
  return function (key, value, descriptor) {
    let elementDescriptor;
    if(!descriptor) {
      elementDescriptor = key;
    } else {
      elementDescriptor = {key, descriptor, value};
    }
    const ret = funcs.reduceRight(function (a, b) {
      return b.call(this, a);
    }, elementDescriptor);
    return ret && ret.descriptor;
  };
}
/* eslint-enable prefer-rest-params */
