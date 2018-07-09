'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class, _class2, _temp;

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _spriteUtils = require('sprite-utils');

var _nodetype = require('./nodetype');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = require('babel-decorators-runtime');

var LayoutAttr = (_class = function (_Group$Attr) {
  (0, _inherits3.default)(LayoutAttr, _Group$Attr);

  function LayoutAttr(subject) {
    (0, _classCallCheck3.default)(this, LayoutAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LayoutAttr.__proto__ || (0, _getPrototypeOf2.default)(LayoutAttr)).call(this, subject));

    _this.setDefault({
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignContent: 'stretch'
    });
    return _this;
  }

  (0, _createClass3.default)(LayoutAttr, [{
    key: 'flexDirection',
    set: function set(value) {
      this.clearCache();
      this.set('flexDirection', value);
    }
  }, {
    key: 'flexWrap',
    set: function set(value) {
      this.clearCache();
      this.set('flexWrap', value);
    }
  }, {
    key: 'flexFlow',
    set: function set(value) {
      this.clearCache();
      this.set('flexFlow', value);
    }
  }, {
    key: 'justifyContent',
    set: function set(value) {
      this.clearCache();
      this.set('justifyContent', value);
    }
  }, {
    key: 'alignItems',
    set: function set(value) {
      this.clearCache();
      this.set('alignItems', value);
    }
  }, {
    key: 'alignContent',
    set: function set(value) {
      this.clearCache();
      this.set('alignContent', value);
    }
  }]);
  return LayoutAttr;
}(_group2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'flexDirection', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'flexDirection'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'flexWrap', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'flexWrap'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'flexFlow', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'flexFlow'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'justifyContent', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'justifyContent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'alignItems', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'alignItems'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'alignContent', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'alignContent'), _class.prototype)), _class);
var FlexLayout = (_temp = _class2 = function (_Group) {
  (0, _inherits3.default)(FlexLayout, _Group);

  function FlexLayout() {
    (0, _classCallCheck3.default)(this, FlexLayout);
    return (0, _possibleConstructorReturn3.default)(this, (FlexLayout.__proto__ || (0, _getPrototypeOf2.default)(FlexLayout)).apply(this, arguments));
  }

  (0, _createClass3.default)(FlexLayout, [{
    key: 'relayout',


    // async measure() {

    // }

    value: function relayout() {
      // console.log(this.children);

      var items = this.children;

      items.sort(function (a, b) {
        return (a.attributes.order || 0) - (b.attributes.order || 0);
      });

      var style = this.attributes;

      var mainSize = void 0,
          mainStart = void 0,
          mainEnd = void 0,
          mainSign = void 0,
          mainBase = void 0,
          crossSize = void 0,
          crossStart = void 0,
          crossEnd = void 0,
          crossSign = void 0,
          crossBase = void 0;

      var prefix = function prefix(attr) {
        return attr === 'x' || attr === 'y' ? attr : 'layout' + attr.charAt(0).toUpperCase() + attr.substr(1);
      };

      if (style.flexDirection === 'row') {
        mainSize = 'width';
        mainStart = 'x';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'y';
        crossEnd = 'bottom';
      }

      if (style.flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'x';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'y';
        crossEnd = 'bottom';
      }

      if (style.flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'y';
        mainEnd = 'bottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'x';
        crossEnd = 'right';
      }

      if (style.flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'y';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'x';
        crossEnd = 'right';
      }

      if (style.flexWrap === 'wrap-reverse') {
        var _ref = [crossEnd, crossStart];
        crossStart = _ref[0];
        crossEnd = _ref[1];

        crossSign = -1;
      } else {
        crossBase = 0;
        crossSign = 1;
      }

      var isAutoMainSize = false;

      if (style[mainSize] === null) {
        // auto sizing
        this.attr(mainSize, 0);
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (item.attr(mainSize) !== null || item.attr(mainSize) !== undefined) {
            this.attr(mainSize, this.attr(mainSize) + item.attr(mainSize));
          }
        }
        isAutoMainSize = true;
        // style.flexWrap = 'nowrap';
      }

      var flexLine = [];
      var flexLines = [flexLine];

      var mainSpace = this.attr(mainSize),
          crossSpace = 0;

      // collect items into lines


      for (var _i = 0; _i < items.length; _i++) {
        var _item = items[_i];
        var itemStyle = _item.attributes;

        if (itemStyle[mainSize] === null) {
          itemStyle[mainSize] = 0;
        }

        if (itemStyle.flex) {
          flexLine.push(_item);
        } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
          mainSpace -= itemStyle[mainSize];
          if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) {
            crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
          }
          flexLine.push(_item);
        } else {
          if (itemStyle[mainSize] > style[mainSize]) {
            _item.attr(prefix(mainSize), style[mainSize]);
          }
          if (mainSpace < itemStyle[mainSize]) {
            flexLine.mainSpace = mainSpace;
            flexLine.crossSpace = crossSpace;
            flexLine = [_item];
            flexLines.push(flexLine);
            mainSpace = style[mainSize];
            crossSpace = 0;
          } else {
            flexLine.push(_item);
          }
          if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) {
            crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
          }
          mainSpace -= itemStyle[mainSize];
        }
      }
      flexLine.mainSpace = mainSpace;

      if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = style[crossSize] !== null ? style[crossSize] : crossSpace;
      } else {
        flexLine.crossSpace = crossSpace;
      }

      if (mainSpace < 0) {
        // overflow (happens only if container is single line), scale every item
        var scale = style[mainSize] / (style[mainSize] - mainSpace);
        var currentMain = mainBase;
        for (var _i2 = 0; _i2 < items.length; _i2++) {
          var _item2 = items[_i2];
          var _itemStyle = _item2.attributes;

          if (_itemStyle.flex) {
            _item2.attr(prefix(mainSize), 0);
          } else {
            _item2.attr(prefix(mainSize), _item2.attr(mainSize));
          }

          _item2.attr(prefix(mainSize), _item2.attr(prefix(mainSize)) * scale);

          _item2.attr(prefix(mainStart), currentMain);
          _item2.attr(prefix(mainEnd), _item2.attr(prefix(mainStart)) + mainSign * _item2.attr(prefix(mainSize)));
          currentMain = _item2.attr(prefix(mainEnd));
        }
      } else {
        // process each flex line
        flexLines.forEach(function (items) {
          var mainSpace = items.mainSpace;
          var flexTotal = 0;
          for (var _i3 = 0; _i3 < items.length; _i3++) {
            var _item3 = items[_i3];
            var _itemStyle2 = _item3.attributes;

            if (_itemStyle2.flex !== null && _itemStyle2.flex !== undefined) {
              flexTotal += _itemStyle2.flex;
            }
          }

          if (flexTotal > 0) {
            // There is flexible flex items
            var _currentMain = mainBase;
            for (var _i4 = 0; _i4 < items.length; _i4++) {
              var _item4 = items[_i4];
              var _itemStyle3 = _item4.attributes;

              if (_itemStyle3.flex) {
                _item4.attr(prefix(mainSize), mainSpace / flexTotal * _itemStyle3.flex);
              } else {
                _item4.attr(prefix(mainSize), _item4.attr(mainSize));
              }
              _item4.attr(prefix(mainStart), _currentMain);
              _item4.attr(prefix(mainEnd), _item4.attr(prefix(mainStart)) + mainSign * _item4.attr(prefix(mainSize)));
              _currentMain = _item4.attr(prefix(mainEnd));
            }
          } else {
            var _currentMain2 = void 0,
                _step = void 0;
            // There is *NO* flexible flex items, which means, justifyContent shoud work
            if (style.justifyContent === 'flex-start') {
              _currentMain2 = mainBase;
              _step = 0;
            }
            if (style.justifyContent === 'flex-end') {
              _currentMain2 = mainSpace * mainSign + mainBase;
              _step = 0;
            }
            if (style.justifyContent === 'center') {
              _currentMain2 = mainSpace / 2 * mainSign + mainBase;
              _step = 0;
            }
            if (style.justifyContent === 'space-between') {
              _step = mainSpace / (items.length - 1) * mainSign;
              _currentMain2 = mainBase;
            }
            if (style.justifyContent === 'space-around') {
              _step = mainSpace / items.length * mainSign;
              _currentMain2 = _step / 2 + mainBase;
            }
            for (var _i5 = 0; _i5 < items.length; _i5++) {
              var _item5 = items[_i5];
              _item5.attr(prefix(mainSize), _item5.attr(mainSize) || 0);
              _item5.attr(prefix(mainStart), _currentMain2);
              _item5.attr(prefix(mainEnd), _item5.attr(prefix(mainStart)) + mainSign * _item5.attr(prefix(mainSize)));
              _currentMain2 = _item5.attr(prefix(mainEnd)) + _step;
            }
          }
        });
      }

      // compute the cross axis sizes
      // align-items, align-self

      if (style[crossSize] === null) {
        // auto sizing
        crossSpace = 0;
        this.attr(crossSize, 0);
        for (var _i6 = 0; _i6 < flexLines.length; _i6++) {
          this.attr(crossSize, this.attr(crossSize) + flexLines[_i6].crossSpace);
        }
      } else {
        crossSpace = style[crossSize];
        for (var _i7 = 0; _i7 < flexLines.length; _i7++) {
          crossSpace -= flexLines[_i7].crossSpace;
        }
      }

      if (style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossSize];
      } else {
        crossBase = 0;
      }
      // let lineSize = style[crossSize] / flexLines.length

      var step = void 0;
      if (style.alignContent === 'flex-start') {
        crossBase += 0;
        step = 0;
      }
      if (style.alignContent === 'flex-end') {
        crossBase += crossSign * crossSpace;
        step = 0;
      }
      if (style.alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2;
        step = 0;
      }
      if (style.alignContent === 'space-between') {
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
      }
      if (style.alignContent === 'space-around') {
        step = crossSpace / flexLines.length;
        crossBase += crossSign * step / 2;
      }
      if (style.alignContent === 'stretch') {
        crossBase += 0;
        step = 0;
      }

      flexLines.forEach(function (items) {
        var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

        for (var _i8 = 0; _i8 < items.length; _i8++) {
          var _item6 = items[_i8];

          var align = _item6.attributes.alignSelf || style.alignItems;

          if (_item6.attr(crossSize) === null || _item6.attr(crossSize) === undefined || _item6.attr(crossSize) === '') {
            _item6.attr(prefix(crossSize), align === 'stretch' ? lineCrossSize : 0);
          } else {
            _item6.attr(prefix(crossSize), _item6.attr(crossSize));
          }

          if (align === 'flex-start') {
            _item6.attr(prefix(crossStart), crossBase);
            _item6.attr(prefix(crossEnd), _item6.attr(prefix(crossStart)) + crossSign * _item6.attr(prefix(crossSize)));
          }

          if (align === 'flex-end') {
            _item6.attr(prefix(crossEnd), crossBase + crossSign * lineCrossSize);
            _item6.attr(prefix(crossStart), _item6.attr(prefix(crossEnd)) - crossSign * _item6.attr(prefix(crossSize)));
          }

          if (align === 'center') {
            _item6.attr(prefix(crossStart), crossBase + crossSign * (lineCrossSize - _item6.attr(prefix(crossSize))) / 2);
            _item6.attr(prefix(crossEnd), _item6.attr(crossStart) + crossSign * _item6.attr(prefix(crossSize)));
          }

          if (align === 'stretch') {
            _item6.attr(prefix(crossStart), crossBase);
            _item6.attr(prefix(crossEnd), crossBase + crossSign * (_item6.attr(prefix(crossSize)) !== null && _item6.attr(prefix(crossSize)) !== undefined ? _item6.attr(prefix(crossSize)) : lineCrossSize));

            _item6.attr(prefix(crossSize), crossSign * (_item6.attr(prefix(crossEnd)) - _item6.attr(prefix(crossStart))));
          }
        }
        crossBase += crossSign * (lineCrossSize + step);
      });
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      this.relayout();
      return (0, _get3.default)(FlexLayout.prototype.__proto__ || (0, _getPrototypeOf2.default)(FlexLayout.prototype), 'render', this).call(this, t, drawingContext);
    }
  }]);
  return FlexLayout;
}(_group2.default), _class2.Attr = LayoutAttr, _temp);
exports.default = FlexLayout;


(0, _nodetype.registerNodeType)('flexLayout', FlexLayout, true);