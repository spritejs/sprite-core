"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attr = attr;
exports.composit = composit;
exports.cachable = cachable;
exports.inherit = inherit;
exports.relative = relative;
exports.flow = flow;
exports.absolute = absolute;
exports.setDeprecation = setDeprecation;
exports.deprecate = deprecate;
exports.parseValue = parseValue;
exports.decorators = decorators;
exports.inheritAttributes = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("./utils");

var _store = require("./store");

var _attrAbsolute = Symbol('attrAbsolute');
/* eslint-disable prefer-rest-params */


function polyfillLegacy(target, key, descriptor) {
  return {
    target: target,
    key: key,
    descriptor: descriptor
  };
}

function getPV(subject, relative) {
  var parent = subject.parent;
  var pv = null;

  if (parent) {
    var attrSize = parent.attrSize;

    if (attrSize) {
      var attrV = relative === 'pw' ? attrSize[0] : attrSize[1];

      while (attrSize && attrV === '') {
        // flexible value
        parent = parent.parent;
        attrSize = parent.attrSize;
      }
    }

    if (relative === 'pw') {
      pv = attrSize ? parent.contentSize[0] : parent.resolution[0];
    } else if (relative === 'ph') {
      pv = attrSize ? parent.contentSize[1] : parent.resolution[1];
    }
  }

  return pv;
}

function attr(options) {
  var cache = false,
      reflow = false,
      relayout = false,
      quiet = false,
      value = null,
      extra = null;

  var decorator = function decorator(elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    var _elementDescriptor = elementDescriptor,
        key = _elementDescriptor.key,
        kind = _elementDescriptor.kind;

    _store.attributeNames.add(key);

    if (quiet && (cache || reflow || relayout)) {
      throw new Error("".concat(key, ": quietSet cannot enable cache or reflow or relayout"));
    } // let _symbolKey = key;


    var defaultValue = value != null ? value : elementDescriptor.value;
    var relativeType = elementDescriptor.descriptor.__relative;
    var inheritValue = elementDescriptor.descriptor.__inherit;
    var composit = elementDescriptor.descriptor.__composit;

    if (kind === 'field') {
      defaultValue = elementDescriptor.initializer ? elementDescriptor.initializer() : value; // _symbolKey = Symbol(key);

      var setter = quiet ? function (val) {
        this.quietSet(key, val);
      } : function (val) {
        this.set(key, val);
      };
      elementDescriptor = {
        kind: 'method',
        key: key,
        placement: 'prototype',
        descriptor: {
          configurable: true,
          enumerable: true,
          set: setter,
          get: function get() {
            return this.get(key);
          }
        }
      };
    }

    if (relativeType) {
      elementDescriptor = applyRative(elementDescriptor, relativeType);
    }

    if (inheritValue) {
      elementDescriptor = applyInherit(elementDescriptor, inheritValue.defaultValue);
    }

    var descriptor = elementDescriptor.descriptor;
    var _getter = descriptor.get;

    if (!_getter) {
      _getter = function _getter() {
        var ret = this.get(key);
        return ret != null ? ret : this.getDefaultValue(key, defaultValue);
      };
    }

    if (composit) {
      if (cache || reflow || relayout || quiet || value || extra) {
        throw new Error('Cannot apply state to composit attribute.');
      }

      descriptor.get = _getter;
    } else if (!relativeType && !inheritValue) {
      descriptor.get = function () {
        var ret = _getter.call(this);

        return ret != null ? ret : this.getDefaultValue(key, defaultValue);
      };
    } else if (relativeType) {
      // enable set default to user defined getter
      descriptor.get = function () {
        var ret = _getter.call(this);

        var subject = this.subject;

        if (ret == null) {
          ret = this.getDefaultValue(key, defaultValue);
        } else if (ret.relative) {
          var _relative = ret.relative.trim();

          if (_relative === 'pw' || _relative === 'ph') {
            var pv = getPV(subject, _relative);

            if (pv !== ret.pv) {
              this[key] = ret.rv;
              return this[key];
            }

            subject.cache = null;

            if (subject[_attrAbsolute]) {
              return pv * ret.v;
            }

            return ret.rv;
          }

          if (_relative === 'rw' || _relative === 'rh') {
            var layer = subject.layer;
            var _pv = null;

            if (layer) {
              if (_relative === 'rw') {
                _pv = layer.resolution[0];
              } else if (_relative === 'rh') {
                _pv = layer.resolution[1];
              }
            }

            if (_pv !== ret.pv) {
              this[key] = ret.rv;
              return this[key];
            }

            subject.cache = null;

            if (subject[_attrAbsolute]) {
              return _pv * ret.v;
            }

            return ret.rv;
          }
        }

        return ret;
      };
    } else {
      // enable set default to user defined getter
      descriptor.get = function () {
        var ret = _getter.call(this);

        var subject = this.subject;

        if (ret == null) {
          ret = this.getDefaultValue(key, defaultValue);
        }

        if (ret === 'inherit') {
          var _value = null;
          var parent = subject.parent;

          while (parent && parent.attr) {
            _value = parent.attr(key);
            if (_value != null) break;
            parent = parent.parent;
          }

          return _value != null ? _value : this.__inheritDefaults[key];
        }

        return ret;
      };
    }

    if (!composit) {
      var _setter = descriptor.set;

      var _clearCache = !(descriptor.__cachable || cache);

      descriptor.set = function (val) {
        var subject = this.subject;
        this.__updateTag = false;
        this.__reflowTag = reflow;
        this.__clearLayout = relayout;

        if (!this.__styleTag && val != null && this.__attributesSet) {
          this.__attributesSet.add(key);
        }

        if (!this.__styleTag && val == null && this.__attributesSet) {
          if (this.__attributesSet.has(key)) {
            this.__attributesSet.delete(key);
          }
        }

        _setter.call(this, val);

        if (subject && !this.__quietTag && this.__updateTag) {
          var clearLayout = this.__clearLayout;

          if (this.__reflowTag) {
            // reflow must before clearLayout because boxOffsetSize is also flowed.
            subject.reflow();
          }

          if (subject.hasLayout) {
            var offsetSize = subject.boxOffsetSize,
                layoutSize = subject.__lastLayout;
            clearLayout |= !layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1];
            subject.__lastLayout = offsetSize;
          }

          if (clearLayout) subject.clearLayout();
          subject.forceUpdate(_clearCache);
        }

        if (this.__updateTag) {
          if (_store.relatedAttributes.has(key)) {
            subject.updateStyles();
          }

          if (extra) {
            this[extra](key, val);
          }
        }
      }; // delete this.__reflowTag;
      // delete this.__updateTag;

    }

    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };

  if (options.descriptor) {
    return decorator(options);
  }

  if (arguments.length === 3) {
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

function composit(struct) {
  return function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    var _elementDescriptor2 = elementDescriptor,
        kind = _elementDescriptor2.kind,
        key = _elementDescriptor2.key;

    if (kind !== 'field') {
      throw new Error("Invalid composit attribute ".concat(key));
    }

    elementDescriptor.kind = 'method';
    var set, get;

    if (typeof struct === 'string') {
      set = function set(val) {
        this[struct] = val;
      };

      get = function get() {
        return this[struct];
      };
    } else if (Array.isArray(struct)) {
      set = function set(val) {
        var _this = this;

        struct.forEach(function (key, i) {
          _this[key] = val != null ? val[i] : null;
        });
      };

      get = function get() {
        var _this2 = this;

        return struct.map(function (key) {
          return _this2[key];
        });
      };
    } else {
      struct = Object.entries(struct);

      set = function set(val) {
        var _this3 = this;

        struct.forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              prop = _ref2[0],
              key = _ref2[1];

          _this3[key] = val != null ? val[prop] : null;
        });
      };

      get = function get() {
        var _this4 = this;

        var ret = {};
        struct.forEach(function (_ref3) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
              prop = _ref4[0],
              key = _ref4[1];

          ret[prop] = _this4[key];
        });
        return ret;
      };
    }

    elementDescriptor.descriptor = {
      get: get,
      set: set,
      __composit: true
    };
    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
} // after attr


function cachable(elementDescriptor) {
  if (arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }

  var _elementDescriptor3 = elementDescriptor,
      descriptor = _elementDescriptor3.descriptor;
  descriptor.__cachable = true;
  if (arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
}

var inheritAttributes = new Set(); // after attr

exports.inheritAttributes = inheritAttributes;

function inherit() {
  var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    var _elementDescriptor4 = elementDescriptor,
        descriptor = _elementDescriptor4.descriptor;
    descriptor.__inherit = {
      defaultValue: defaultValue
    };
    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
}

function applyInherit(elementDescriptor, defaultValue) {
  var key = elementDescriptor.key,
      _finisher = elementDescriptor.finisher,
      target = elementDescriptor.target;
  inheritAttributes.add(key);

  if (target) {
    if (!target.hasOwnProperty('__inheritDefaults')) {
      // eslint-disable-line no-prototype-builtins
      target.__inheritDefaults = Object.create(target.__inheritDefaults || null);
    }

    target.__inheritDefaults[key] = defaultValue;
    return elementDescriptor;
  }

  return (0, _objectSpread2.default)({}, elementDescriptor, {
    finisher: function finisher(klass) {
      if (_finisher) _finisher(klass);
      var proto = klass.prototype;

      if (!proto.hasOwnProperty('__inheritDefaults')) {
        // eslint-disable-line no-prototype-builtins
        proto.__inheritDefaults = Object.create(proto.__inheritDefaults || null);
      }

      proto.__inheritDefaults[key] = defaultValue;
    }
  });
} // after attr
// relative -> width | height


function relative() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'width';
  return function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    var _elementDescriptor5 = elementDescriptor,
        descriptor = _elementDescriptor5.descriptor;
    descriptor.__relative = type;
    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
}

function applyRative(elementDescriptor, type) {
  var descriptor = elementDescriptor.descriptor;
  var setter = descriptor.set;

  descriptor.set = function (val) {
    if (typeof val === 'string') {
      val = val.trim();

      if (val.slice(-1) === '%') {
        var _relative2 = type === 'width' ? 'pw' : 'ph';

        var pv = getPV(this.subject, _relative2);
        val = {
          relative: _relative2,
          pv: pv,
          v: parseFloat(val) / 100,
          rv: val
        };
      } else {
        var _relative3 = val.slice(-2);

        if (_relative3 === 'rw' || _relative3 === 'rh') {
          var _pv2 = null;
          var layer = this.subject.layer;

          if (layer) {
            _pv2 = layer.resolution[_relative3 === 'rw' ? 0 : 1];
          }

          val = {
            relative: _relative3,
            pv: _pv2,
            v: parseFloat(val) / 100,
            rv: val
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

function flow(elementDescriptor) {
  if (arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }

  var _elementDescriptor6 = elementDescriptor,
      descriptor = _elementDescriptor6.descriptor,
      key = _elementDescriptor6.key;

  if (descriptor.get) {
    var _getter = descriptor.get;

    descriptor.get = function () {
      var ret = this.flow(key);

      if (ret === undefined) {
        ret = _getter.call(this);
        this.flow(key, ret);
      }

      return ret;
    };
  }

  if (arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
} // set tag force to get absolute value from relative attributes


function absolute(elementDescriptor) {
  if (arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }

  var _elementDescriptor7 = elementDescriptor,
      descriptor = _elementDescriptor7.descriptor;

  if (descriptor.get) {
    var _getter = descriptor.get;

    descriptor.get = function () {
      this[_attrAbsolute] = true;

      var ret = _getter.call(this);

      this[_attrAbsolute] = false;
      return ret;
    };
  }

  if (arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
}

function setDeprecation(apiName) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  msg = "[Deprecation] ".concat(apiName, " has been deprecated.").concat(msg);
  (0, _utils.notice)(msg);
}

function deprecate(msg) {
  var apiName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var decorator = function decorator(elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    var _elementDescriptor8 = elementDescriptor,
        descriptor = _elementDescriptor8.descriptor,
        key = _elementDescriptor8.key;
    apiName = apiName || "Method ".concat(key);

    if (typeof descriptor.value === 'function') {
      var func = descriptor.value;

      descriptor.value = function () {
        setDeprecation(apiName, msg);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return func.apply(this, args);
      };
    }

    if (descriptor.set) {
      var setter = descriptor.set;

      descriptor.set = function (val) {
        setDeprecation(apiName, msg);
        return setter.call(this, val);
      };
    }

    if (descriptor.get) {
      var getter = descriptor.get;

      descriptor.get = function () {
        setDeprecation(apiName, msg);
        return getter.call(this);
      };
    }

    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };

  if (msg.descriptor) {
    return decorator(msg);
  }

  if (arguments.length === 3) {
    return decorator.apply(this, arguments);
  }

  return decorator;
} // before attr


function parseValue() {
  for (var _len2 = arguments.length, parsers = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    parsers[_key2] = arguments[_key2];
  }

  return function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    var _elementDescriptor9 = elementDescriptor,
        descriptor = _elementDescriptor9.descriptor;
    var setter = descriptor.set;

    descriptor.set = function (val) {
      if (val != null && val !== '' && val !== 'inherit') {
        val = parsers.reduce(function (v, parser) {
          return parser(v);
        }, val);
      }

      setter.call(this, val);
    };

    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
} // return a function to apply any decorators to a descriptor


function decorators() {
  for (var _len3 = arguments.length, funcs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    funcs[_key3] = arguments[_key3];
  }

  return function (key, value, descriptor) {
    var elementDescriptor;

    if (!descriptor) {
      elementDescriptor = key;
    } else {
      elementDescriptor = {
        key: key,
        descriptor: descriptor,
        value: value
      };
    }

    var ret = funcs.reduceRight(function (a, b) {
      return b.call(this, a);
    }, elementDescriptor);
    return ret && ret.descriptor;
  };
}
/* eslint-enable prefer-rest-params */