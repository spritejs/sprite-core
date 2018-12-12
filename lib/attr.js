'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _dec, _desc, _value, _class;

var _utils = require('./utils');

var _stylesheet = require('./stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = require('babel-decorators-runtime');

var _attr = (0, _symbol2.default)('attr'),
    _style = (0, _symbol2.default)('style'),
    _temp = (0, _symbol2.default)('store'),
    _subject = (0, _symbol2.default)('subject'),
    _default = (0, _symbol2.default)('default');

var SpriteAttr = (_dec = (0, _utils.deprecate)('You can remove this call.'), (_class = function () {
  function SpriteAttr(subject) {
    (0, _classCallCheck3.default)(this, SpriteAttr);

    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this[_style] = {};

    this[_temp] = new _map2.default(); // save non-serialized values

    Object.defineProperty(this, '__attributesSet', {
      value: new _set2.default()
    });
    Object.defineProperty(this, '__styleTag', {
      writable: true,
      value: false
    });
    Object.defineProperty(this, '__updateTag', {
      writable: true,
      value: false
    });
  }

  (0, _createClass3.default)(SpriteAttr, [{
    key: 'setDefault',
    value: function setDefault(attrs) {
      (0, _assign2.default)(this[_default], attrs);
      (0, _assign2.default)(this[_attr], attrs);
    }
  }, {
    key: 'saveObj',
    value: function saveObj(key, val) {
      this[_temp].set(key, val);
      this.__updateTag = true;
    }
  }, {
    key: 'loadObj',
    value: function loadObj(key) {
      return this[_temp].get(key);
    }
  }, {
    key: 'quietSet',
    value: function quietSet(key, val) {
      var oldVal = void 0;
      if (key.length > 5 && key.indexOf('data-') === 0) {
        var dataKey = key.slice(5);
        oldVal = this.subject.data(dataKey);
        this.subject.data(dataKey, val);
      } else {
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
      }
      if (_stylesheet2.default.relatedAttributes.has(key)) {
        if ((typeof oldVal === 'undefined' ? 'undefined' : (0, _typeof3.default)(oldVal)) === 'object' || (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' || oldVal !== val) {
          this.subject.updateStyles();
        }
      }
    }
  }, {
    key: 'clearStyle',
    value: function clearStyle() {
      this[_style] = {};
    }
  }, {
    key: 'set',
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
      if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object') {
        if (oldVal !== val && (0, _stringify2.default)(val) === (0, _stringify2.default)(oldVal)) {
          return;
        }
      } else if (oldVal === val) {
        return;
      }
      if (!this.__styleTag) {
        this[_attr][key] = val;
        if (_stylesheet2.default.relatedAttributes.has(key)) {
          this.subject.updateStyles();
        }
      }
      this.__updateTag = true;
    }
  }, {
    key: 'get',
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
    key: 'clearCache',
    value: function clearCache() {
      return this;
    }
  }, {
    key: 'merge',
    value: function merge(attrs) {
      if (typeof attrs === 'string') {
        attrs = JSON.parse(attrs);
      }
      return this;
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      var _this = this;

      var ret = {};
      [].concat((0, _toConsumableArray3.default)(this.__attributesSet)).forEach(function (key) {
        if (key !== 'id' && key.indexOf('__internal') !== 0) {
          ret[key] = _this[key];
        }
      });
      (0, _entries2.default)(this).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (key.indexOf('__') !== 0) {
          ret[key] = value;
        }
      });
      return (0, _stringify2.default)(ret);
    }
  }, {
    key: '__attr',
    get: function get() {
      return this[_attr];
    }
  }, {
    key: '__default',
    get: function get() {
      return this[_default];
    }
  }, {
    key: 'style',
    get: function get() {
      return this[_style];
    }
  }, {
    key: 'attrs',
    get: function get() {
      var _this2 = this;

      var ret = {};
      [].concat((0, _toConsumableArray3.default)(this.__attributeNames)).forEach(function (key) {
        ret[key] = _this2[key];
      });
      [].concat((0, _toConsumableArray3.default)(this.__attributesSet)).forEach(function (key) {
        ret[key] = _this2[key];
      });
      (0, _entries2.default)(this).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        if (key.indexOf('__') !== 0) {
          ret[key] = value;
        }
      });
      return ret;
    }
  }, {
    key: 'subject',
    get: function get() {
      return this[_subject];
    }

    /* ------------------- define attributes ----------------------- */

  }, {
    key: 'id',
    set: function set(val) {
      return this.quietSet('id', String(val));
    }
  }, {
    key: 'name',
    set: function set(val) {
      return this.quietSet('name', String(val));
    }
  }, {
    key: 'class',
    set: function set(val) {
      return this.quietSet('class', String(val));
    }
  }]);
  return SpriteAttr;
}(), (_applyDecoratedDescriptor(_class.prototype, 'clearCache', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clearCache'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'id', [_utils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'id'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'name', [_utils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'name'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'class', [_utils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'class'), _class.prototype)), _class));
exports.default = SpriteAttr;