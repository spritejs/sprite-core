"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _utils = require("../utils");

var _attr = Symbol('attr'),
    _style = Symbol('style'),
    _temp = Symbol('store'),
    _subject = Symbol('subject'),
    _default = Symbol('default');

var Attr = (0, _decorate2.default)(null, function (_initialize) {
  var Attr = function Attr(subject) {
    (0, _classCallCheck2.default)(this, Attr);

    _initialize(this);

    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this[_style] = {};
    this.__cached = {};
    if (!subject.updateStyles) subject.updateStyles = function () {};
    this[_temp] = new Map(); // save non-serialized values

    Object.defineProperty(this, '__attributesSet', {
      value: new Set()
    });
    Object.defineProperty(this, '__styleTag', {
      writable: true,
      value: false
    });
    Object.defineProperty(this, '__updateTag', {
      writable: true,
      value: false
    });
  };

  return {
    F: Attr,
    d: [{
      kind: "field",
      static: true,
      key: "relatedAttributes",
      value: function value() {
        return _utils.relatedAttributes;
      }
    }, {
      kind: "field",
      static: true,
      key: "attributeNames",
      value: function value() {
        return _utils.attributeNames;
      }
    }, {
      kind: "method",
      static: true,
      key: "addAttributes",
      value: function value(attrs) {
        var descriptors = {};
        Object.entries(attrs).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              key = _ref2[0],
              v = _ref2[1];

          if (typeof v === 'function') {
            var _setter = v;
            v = {
              set: function set(val) {
                _setter(this, val);
              }
            };
          }

          var _v = v,
              wrappers = _v.decorators,
              value = _v.value,
              get = _v.get,
              set = _v.set;
          wrappers = wrappers || [_utils.attr];

          if (set == null) {
            set = function set(val) {
              this.set(key, val);
            };
          }

          if (get == null) {
            get = function get() {
              return this.get(key);
            };
          }

          var $decorator = _utils.decorators.apply(void 0, (0, _toConsumableArray2.default)(wrappers));

          descriptors[key] = $decorator(key, value, {
            set: set,
            get: get
          });
        });
        Object.defineProperties(this.prototype, descriptors);
      }
    }, {
      kind: "get",
      key: "__attr",
      value: function value() {
        return this[_attr];
      }
    }, {
      kind: "method",
      key: "setDefault",
      value: function value(attrs) {
        Object.assign(this[_default], attrs);
      }
    }, {
      kind: "method",
      key: "getDefaultValue",
      value: function value(key, defaultValue) {
        if (key in this[_default]) return this[_default][key];
        return defaultValue;
      }
    }, {
      kind: "method",
      key: "saveObj",
      value: function value(key, val) {
        this[_temp].set(key, val);

        this.__updateTag = true;
      }
    }, {
      kind: "method",
      key: "loadObj",
      value: function value(key) {
        return this[_temp].get(key);
      }
    }, {
      kind: "method",
      key: "quietSet",
      value: function value(key, val) {
        this.set(key, val, true);
      }
    }, {
      kind: "method",
      key: "clearStyle",
      value: function value() {
        this[_style] = {};
      }
    }, {
      kind: "method",
      key: "clearLayout",
      value: function value() {
        this.__clearLayout = true;
        return this;
      }
    }, {
      kind: "get",
      key: "style",
      value: function value() {
        return this[_style];
      }
    }, {
      kind: "method",
      key: "set",
      value: function value(key, val) {
        var isQuiet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        this.__quietTag = isQuiet;
        var oldVal;

        if (isQuiet && key.length > 5 && key.indexOf('data-') === 0) {
          var dataKey = key.slice(5);
          oldVal = this.subject.data(dataKey);
          this.subject.data(dataKey, val);
        } else if (this.__styleTag) {
          oldVal = this[_style][key];

          if (val != null) {
            this[_style][key] = val;
          } else {
            delete this[_style][key];
          }
        } else {
          oldVal = this[_attr][key];
        }

        if (val && (0, _typeof2.default)(val) === 'object') {
          if (oldVal !== val && JSON.stringify(val) === JSON.stringify(oldVal)) {
            return false;
          }
        } else if (oldVal === val) {
          return false;
        }

        if (!this.__styleTag) {
          this[_attr][key] = val;
        }

        this.__updateTag = true;
        return true;
      }
    }, {
      kind: "method",
      key: "get",
      value: function value(key) {
        if (key.length > 5 && key.indexOf('data-') === 0) {
          return this.subject.data(key.slice(5));
        }

        if (this.__getStyleTag || this[_style][key] != null && !this.__attributesSet.has(key)) {
          return this[_style][key];
        }

        return this[_attr][key];
      }
    }, {
      kind: "method",
      key: "getAttributes",
      value: function value() {
        var _this = this;

        var includeDefault = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var ret = {};

        if (includeDefault) {
          (0, _toConsumableArray2.default)(_utils.attributeNames).forEach(function (key) {
            if (key in _this) {
              ret[key] = _this[key];
            }
          });
        }

        (0, _toConsumableArray2.default)(this.__attributesSet).forEach(function (key) {
          if (key.indexOf('__internal') !== 0) {
            ret[key] = _this[key];
          }
        });
        Object.entries(this).forEach(function (_ref3) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];

          if (key.indexOf('__') !== 0) {
            ret[key] = value;
          }
        });
        return ret;
      }
    }, {
      kind: "get",
      key: "attrs",
      value: function value() {
        return this.getAttributes(true);
      }
    }, {
      kind: "method",
      decorators: [(0, _utils.deprecate)('You can remove this call.')],
      key: "clearCache",
      value: function value() {
        return this;
      }
    }, {
      kind: "method",
      key: "merge",
      value: function value(attrs) {
        var _this2 = this;

        if (typeof attrs === 'string') {
          attrs = JSON.parse(attrs);
        }

        Object.entries(attrs).forEach(function (_ref5) {
          var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];

          _this2.subject.attr(key, value);
        });
        return this;
      }
    }, {
      kind: "method",
      key: "serialize",
      value: function value() {
        var attrs = this.getAttributes();
        delete attrs.id;
        return JSON.stringify(attrs);
      }
    }, {
      kind: "get",
      key: "subject",
      value: function value() {
        return this[_subject];
      }
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(String), (0, _utils.attr)({
        quiet: true
      })],
      key: "id",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(String), (0, _utils.attr)({
        quiet: true
      })],
      key: "name",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0, _utils.parseValue)(String), (0, _utils.attr)({
        quiet: true
      })],
      key: "class",
      value: void 0
    }]
  };
});
exports.default = Attr;