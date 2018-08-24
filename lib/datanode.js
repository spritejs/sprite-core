'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp;

var _basesprite = require('./basesprite');

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = require('./nodetype');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyAttr = function () {
  function EmptyAttr(node) {
    (0, _classCallCheck3.default)(this, EmptyAttr);

    this.subject = node;
  }

  (0, _createClass3.default)(EmptyAttr, [{
    key: 'serialize',
    value: function serialize() {
      var attrs = this.attrs;
      delete attrs.id;
      return (0, _stringify2.default)(attrs);
    }
  }, {
    key: 'merge',
    value: function merge(attrs) {
      if (typeof attrs === 'string') {
        attrs = JSON.parse(attrs);
      }
      return (0, _assign2.default)(this, attrs);
    }
  }, {
    key: 'attrs',
    get: function get() {
      var attrs = (0, _assign2.default)({}, this);
      delete attrs.subject;
      return attrs;
    }
  }]);
  return EmptyAttr;
}();

var DataNode = (_temp = _class = function (_BaseSprite) {
  (0, _inherits3.default)(DataNode, _BaseSprite);

  function DataNode() {
    (0, _classCallCheck3.default)(this, DataNode);
    return (0, _possibleConstructorReturn3.default)(this, (DataNode.__proto__ || (0, _getPrototypeOf2.default)(DataNode)).apply(this, arguments));
  }

  (0, _createClass3.default)(DataNode, [{
    key: 'isVisible',
    value: function isVisible() {
      return false;
    }
  }, {
    key: 'draw',
    value: function draw() {
      //  empty;
    }
  }]);
  return DataNode;
}(_basesprite2.default), _class.Attr = EmptyAttr, _temp);


(0, _nodetype.registerNodeType)('data', DataNode, true);

exports.default = DataNode;