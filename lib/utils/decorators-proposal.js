"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attr = attr;
exports.cachable = cachable;
exports.inherit = inherit;
exports.relative = relative;
exports.flow = flow;
exports.absolute = absolute;
exports.setDeprecation = setDeprecation;
exports.deprecate = deprecate;
exports.parseValue = parseValue;
exports.inheritAttributes = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _utils = require("./utils");

var _attrAbsolute = Symbol('attrAbsolute');

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

function attr(elementDescriptor) {
  var descriptor = elementDescriptor.descriptor,
      key = elementDescriptor.key;
  var _getter = descriptor.get;

  if (!_getter) {
    _getter = function _getter() {
      return this.get(key);
    };
  }

  if (!descriptor.__relative && !descriptor.__inherit) {
    descriptor.get = function () {
      var ret = _getter.call(this);

      if (ret == null) {
        ret = this.get(key);
      }

      return ret;
    };
  } else if (descriptor.__relative) {
    // enable set default to user defined getter
    descriptor.get = function () {
      var ret = _getter.call(this);

      var subject = this.subject;

      if (ret == null) {
        ret = this.get(key);
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
        ret = this.get(key);
      } else if (ret === 'inherit') {
        var value = null;
        var parent = subject.parent;

        while (parent && parent.attr) {
          value = parent.attr(key);
          if (value != null) break;
          parent = parent.parent;
        }

        return value != null ? value : this.__inheritDefaults[key];
      }

      return ret;
    };
  }

  var _setter = descriptor.set;

  var _clearCache = !descriptor.__cachable;

  descriptor.set = function (val) {
    var subject = this.subject;
    this.__updateTag = false;
    this.__reflowTag = false;
    this.__clearLayout = false;

    _setter.call(this, val);

    if (subject && subject.hasLayout) {
      var offsetSize = subject.boxOffsetSize,
          layoutSize = subject.__lastLayout;

      if (this.__clearLayout || !layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1]) {
        subject.clearLayout();
      }

      subject.__lastLayout = offsetSize;
    }

    if (this.subject && this.__updateTag) {
      subject.forceUpdate(_clearCache);

      if (this.__reflowTag) {
        subject.reflow();
      }
    } // delete this.__reflowTag;
    // delete this.__updateTag;

  };

  return (0, _objectSpread2.default)({}, elementDescriptor);
} // after attr


function cachable(elementDescriptor) {
  var descriptor = elementDescriptor.descriptor;
  descriptor.__cachable = true;
  return (0, _objectSpread2.default)({}, elementDescriptor);
}

var inheritAttributes = new Set(); // after attr

exports.inheritAttributes = inheritAttributes;

function inherit() {
  var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return function (elementDescriptor) {
    var descriptor = elementDescriptor.descriptor,
        key = elementDescriptor.key;
    descriptor.__inherit = true;
    inheritAttributes.add(key);
    return (0, _objectSpread2.default)({}, elementDescriptor, {
      finisher: function finisher(_ref) {
        var proto = _ref.prototype;

        if (!proto.hasOwnProperty('__inheritDefaults')) {
          // eslint-disable-line no-prototype-builtins
          proto.__inheritDefaults = (0, _objectSpread2.default)({}, proto.__inheritDefaults || {});
        }

        proto.__inheritDefaults[key] = defaultValue;
      }
    });
  };
} // after attr
// relative -> width | height


function relative() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'width';
  return function (elementDescriptor) {
    var descriptor = elementDescriptor.descriptor;

    if (descriptor.set) {
      var setter = descriptor.set;
      descriptor.__relative = true;

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

      return (0, _objectSpread2.default)({}, elementDescriptor);
    }
  };
}

function flow(elementDescriptor) {
  var descriptor = elementDescriptor.descriptor,
      key = elementDescriptor.key;

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

  return (0, _objectSpread2.default)({}, elementDescriptor);
} // set tag force to get absolute value from relative attributes


function absolute(elementDescriptor) {
  var descriptor = elementDescriptor.descriptor;

  if (descriptor.get) {
    var _getter = descriptor.get;

    descriptor.get = function () {
      this[_attrAbsolute] = true;

      var ret = _getter.call(this);

      this[_attrAbsolute] = false;
      return ret;
    };
  }

  return (0, _objectSpread2.default)({}, elementDescriptor);
}

function setDeprecation(apiName) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  msg = "[Deprecation] ".concat(apiName, " has been deprecated.").concat(msg);
  (0, _utils.notice)(msg);
}

function deprecate(msg) {
  var apiName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return function (elementDescriptor) {
    var descriptor = elementDescriptor.descriptor,
        key = elementDescriptor.key;
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

    return (0, _objectSpread2.default)({}, elementDescriptor);
  };
} // before attr


function parseValue() {
  for (var _len2 = arguments.length, parsers = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    parsers[_key2] = arguments[_key2];
  }

  return function (elementDescriptor) {
    var descriptor = elementDescriptor.descriptor;
    var setter = descriptor.set;

    descriptor.set = function (val) {
      if (val != null && val !== '' && val !== 'inherit') {
        val = parsers.reduce(function (v, parser) {
          return parser(v);
        }, val);
      }

      setter.call(this, val);
    };

    return (0, _objectSpread2.default)({}, elementDescriptor);
  };
}