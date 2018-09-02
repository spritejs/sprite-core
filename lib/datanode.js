'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _basesprite = require('./basesprite');

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = require('./nodetype');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataAttr = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(DataAttr, _BaseSprite$Attr);

  function DataAttr(subject) {
    (0, _classCallCheck3.default)(this, DataAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DataAttr.__proto__ || (0, _getPrototypeOf2.default)(DataAttr)).call(this, subject));

    _this.setDefault({
      display: 'none'
    });
    return _this;
  }

  return DataAttr;
}(_basesprite2.default.Attr);

var DataNode = (_temp = _class = function (_BaseSprite) {
  (0, _inherits3.default)(DataNode, _BaseSprite);

  function DataNode() {
    (0, _classCallCheck3.default)(this, DataNode);
    return (0, _possibleConstructorReturn3.default)(this, (DataNode.__proto__ || (0, _getPrototypeOf2.default)(DataNode)).apply(this, arguments));
  }

  return DataNode;
}(_basesprite2.default), _class.Attr = DataAttr, _temp);


(0, _nodetype.registerNodeType)('data', DataNode, true);

exports.default = DataNode;