import {notice} from './utils';

const _attrAbsolute = Symbol('attrAbsolute');

export function attr(target, prop, descriptor) {
  if(!target.hasOwnProperty('__attributeNames')) { // eslint-disable-line no-prototype-builtins
    target.__attributeNames = new Set(target.__attributeNames);
  }
  target.__attributeNames.add(prop);
  let _getter = descriptor.get;
  if(!_getter) {
    _getter = function () {
      return this.get(prop);
    };
  }
  if(!descriptor.__relative && !descriptor.__inherit) {
    descriptor.get = function () {
      let ret = _getter.call(this);
      if(ret == null) {
        ret = this.get(prop);
      }
      return ret;
    };
  } else if(descriptor.__relative) {
    // enable set default to user defined getter
    descriptor.get = function () {
      let ret = _getter.call(this);
      const subject = this.subject;

      if(ret == null) {
        ret = this.get(prop);
      } else if(ret.relative) {
        const relative = ret.relative.trim();
        if(relative === 'pw' || relative === 'ph') {
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
          if(pv !== ret.pv) {
            this[prop] = ret.rv;
            return this[prop];
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
            this[prop] = ret.rv;
            return this[prop];
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
        ret = this.get(prop);
      } else if(ret === 'inherit') {
        let value = null;
        let parent = subject.parent;
        while(parent && parent.attr) {
          value = parent.attr(prop);
          if(value != null) break;
          parent = parent.parent;
        }
        return value != null ? value : this.__inheritDefaults[prop];
        // return this.__inheritDefaults[prop];
      }
      return ret;
    };
  }

  const _setter = descriptor.set;
  const _clearCache = !descriptor.__cachable;

  descriptor.set = function (val) {
    const subject = this.subject;
    this.__updateTag = false;
    this.__reflowTag = false;
    _setter.call(this, val);
    if(subject && subject.hasLayout) {
      const offsetSize = subject.boxOffsetSize,
        layoutSize = subject.__lastLayout;

      if(!layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1]) {
        subject.parent.clearLayout();
      }
      subject.__lastLayout = offsetSize;
    }
    if(this.subject && this.__updateTag) {
      subject.forceUpdate(_clearCache);
      if(this.__reflowTag) {
        subject.reflow();
      }
    }
    // delete this.__reflowTag;
    // delete this.__updateTag;
  };
  return descriptor;
}

// after attr
export function cachable(target, prop, descriptor) {
  descriptor.__cachable = true;
  return descriptor;
}

export const inheritAttributes = new Set();

// after attr
export function inherit(defaultValue = '') {
  return function (target, prop, descriptor) {
    target.__inheritDefaults = target.__inheritDefaults || {};
    target.__inheritDefaults[prop] = defaultValue;
    descriptor.__inherit = true;
    inheritAttributes.add(prop);
    return descriptor;
  };
}

// after attr
// relative -> width | height
export function relative(type = 'width') {
  return function (target, prop, descriptor) {
    if(descriptor.set) {
      const setter = descriptor.set;
      descriptor.__relative = true;

      descriptor.set = function (val) {
        if(typeof val === 'string') {
          val = val.trim();
          if(val.slice(-1) === '%') {
            let parent = this.subject.parent;
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
              if(type === 'width') {
                pv = attrSize ? parent.contentSize[0] : parent.resolution[0];
              } else if(type === 'height') {
                pv = attrSize ? parent.contentSize[1] : parent.resolution[1];
              }
            }
            val = {
              relative: type === 'width' ? 'pw' : 'ph',
              pv,
              v: parseFloat(val) / 100,
              rv: val,
            };
          } else if(val.slice(-2) === 'rw') {
            const layer = this.subject.layer;
            let pv = null;
            if(layer) {
              pv = layer.resolution[0];
            }
            val = {
              relative: 'rw',
              pv,
              v: parseFloat(val) / 100,
              rv: val,
            };
          } else if(val.slice(-2) === 'rh') {
            const layer = this.subject.layer;
            let pv = null;
            if(layer) {
              pv = layer.resolution[1];
            }
            val = {
              relative: 'rh',
              pv,
              v: parseFloat(val) / 100,
              rv: val,
            };
          } else {
            val = val ? parseFloat(val) : val;
          }
        }
        setter.call(this, val);
      };
      return descriptor;
    }
  };
}

export function flow(target, prop, descriptor) {
  if(descriptor.get) {
    const _getter = descriptor.get;
    descriptor.get = function () {
      let ret = this.flow(prop);
      if(ret === undefined) {
        ret = _getter.call(this);
        this.flow(prop, ret);
      }
      return ret;
    };
  }
  return descriptor;
}

// set tag force to get absolute value from relative attributes
export function absolute(target, prop, descriptor) {
  if(descriptor.get) {
    const _getter = descriptor.get;
    descriptor.get = function () {
      this[_attrAbsolute] = true;
      const ret = _getter.call(this);
      this[_attrAbsolute] = false;
      return ret;
    };
  }
  return descriptor;
}

export function setDeprecation(apiName, msg = '') {
  msg = `[Deprecation] ${apiName} has been deprecated.${msg}`;
  notice(msg);
}

export function deprecate(...args) {
  let msg = '',
    apiName = '';
  function decorator(target, prop, descriptor) {
    apiName = apiName || `${target.constructor.name}#${prop}`;
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
  }
  if(args.length === 1) {
    msg = args[0];
    return decorator;
  }
  if(args.length === 2) {
    apiName = args[0];
    msg = args[1];
    return decorator;
  }
  return decorator(...args);
}

// before attr
export function parseValue(...parsers) {
  return function (target, prop, descriptor) {
    const setter = descriptor.set;

    descriptor.set = function (val) {
      if(val != null && val !== '') {
        val = parsers.reduce((v, parser) => parser(v), val);
      }
      setter.call(this, val);
    };

    return descriptor;
  };
}
