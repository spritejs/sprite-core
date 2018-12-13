"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _utils = require("./utils");

var _dec, _class, _class2, _temp2;

var _attr = Symbol('attr'),
    _style = Symbol('style'),
    _temp = Symbol('store'),
    _subject = Symbol('subject'),
    _default = Symbol('default');

var Attr = (_dec = (0, _utils.deprecate)('You can remove this call.'), (_class = (_temp2 = _class2 =
/*#__PURE__*/
function () {
  function Attr(subject) {
    (0, _classCallCheck2.default)(this, Attr);
    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this[_style] = {};
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
    this.setDefault(Attr.attrDefaultValues);
  }

  (0, _createClass2.default)(Attr, [{
    key: "getDefaultValue",
    value: function getDefaultValue(key) {
      return this[_default][key];
    }
  }, {
    key: "setDefault",
    value: function setDefault(attrs) {
      Object.assign(this[_default], attrs);
      Object.assign(this[_attr], attrs);
    }
  }, {
    key: "setAttrIndex",
    value: function setAttrIndex(key, val, idx) {
      if (val == null) val = this[_default][key][idx];
      var arr = this.get(key);
      arr[idx] = val;
      this.set(key, arr);
    }
  }, {
    key: "saveObj",
    value: function saveObj(key, val) {
      this[_temp].set(key, val);

      this.__updateTag = true;
    }
  }, {
    key: "loadObj",
    value: function loadObj(key) {
      return this[_temp].get(key);
    }
  }, {
    key: "quietSet",
    value: function quietSet(key, val) {
      var oldVal;

      if (key.length > 5 && key.indexOf('data-') === 0) {
        var dataKey = key.slice(5);
        oldVal = this.subject.data(dataKey);
        this.subject.data(dataKey, val);
      } else if (!this.__styleTag) {
        if (val != null) {
          this.__attributesSet.add(key);
        } else {
          val = this[_default][key];

          if (this.__attributesSet.has(key)) {
            this.__attributesSet.delete(key);
          }
        }

        oldVal = this[_attr][key];
        this[_attr][key] = val;
      } else if (val != null) {
        this[_style][key] = val;
      } else {
        delete this[_style][key];
      }

      if (!this.__styleTag && Attr.relatedAttributes.has(key)) {
        if ((0, _typeof2.default)(oldVal) === 'object' || (0, _typeof2.default)(val) === 'object' || oldVal !== val) {
          this.subject.updateStyles();
        }
      }
    }
  }, {
    key: "clearStyle",
    value: function clearStyle() {
      this[_style] = {};
    }
  }, {
    key: "set",
    value: function set(key, val) {
      if (!this.__styleTag && val != null) {
        this.__attributesSet.add(key);
      }

      if (!this.__styleTag && val == null) {
        val = this[_default][key];

        if (this.__attributesSet.has(key)) {
          this.__attributesSet.delete(key);
        }
      }

      if (this.__styleTag) {
        if (val != null) {
          this[_style][key] = val;
        } else {
          delete this[_style][key];
        }
      }

      var oldVal = this[_attr][key];

      if ((0, _typeof2.default)(val) === 'object') {
        if (oldVal !== val && JSON.stringify(val) === JSON.stringify(oldVal)) {
          return false;
        }
      } else if (oldVal === val) {
        return false;
      }

      if (!this.__styleTag) {
        this[_attr][key] = val;

        if (Attr.relatedAttributes.has(key)) {
          this.subject.updateStyles();
        }
      }

      this.__updateTag = true;
      return true;
    }
  }, {
    key: "get",
    value: function get(key) {
      if (key.length > 5 && key.indexOf('data-') === 0) {
        return this.subject.data(key.slice(5));
      }

      if (this.__getStyleTag || this[_style][key] != null && !this.__attributesSet.has(key)) {
        return this[_style][key];
      }

      return this[_attr][key];
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      var _this = this;

      var ignoreDefault = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var ret = {};

      if (!ignoreDefault) {
        Object.keys(this[_attr]).forEach(function (key) {
          if (_this[key] !== undefined) {
            ret[key] = _this[key];
          }
        });
      }

      (0, _toConsumableArray2.default)(this.__attributesSet).forEach(function (key) {
        if (key.indexOf('__internal') !== 0) {
          ret[key] = _this[key];
        }
      });
      Object.entries(this).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (key.indexOf('__') !== 0) {
          ret[key] = value;
        }
      });
      return ret;
    }
  }, {
    key: "clearCache",
    value: function clearCache() {
      return this;
    }
  }, {
    key: "merge",
    value: function merge(attrs) {
      if (typeof attrs === 'string') {
        attrs = JSON.parse(attrs);
      }

      return this;
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var attrs = this.getAttributes();
      delete attrs.id;
      return JSON.stringify(attrs);
    }
  }, {
    key: "__attr",
    get: function get() {
      return this[_attr];
    }
  }, {
    key: "style",
    get: function get() {
      return this[_style];
    }
  }, {
    key: "attrs",
    get: function get() {
      return this.getAttributes(false);
    }
  }, {
    key: "subject",
    get: function get() {
      return this[_subject];
    }
    /* ------------------- define attributes ----------------------- */

  }, {
    key: "id",
    set: function set(val) {
      return this.quietSet('id', String(val));
    }
  }, {
    key: "name",
    set: function set(val) {
      return this.quietSet('name', String(val));
    }
  }, {
    key: "class",
    set: function set(val) {
      return this.quietSet('class', String(val));
    }
  }]);
  return Attr;
}(), (0, _defineProperty2.default)(_class2, "relatedAttributes", new Set()), (0, _defineProperty2.default)(_class2, "attrDefaultValues", {}), _temp2), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "clearCache", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "clearCache"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "id", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "id"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "name", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "name"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "class", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "class"), _class.prototype)), _class));
exports.default = Attr;