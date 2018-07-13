'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _set2 = require('babel-runtime/helpers/set');

var _set3 = _interopRequireDefault(_set2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class, _class2, _temp;

var _basesprite = require('./basesprite');

var _basesprite2 = _interopRequireDefault(_basesprite);

var _nodetype = require('./nodetype');

var _spriteUtils = require('sprite-utils');

var _path = require('./helpers/path');

var _group = require('./helpers/group');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _applyDecoratedDescriptor = require('babel-decorators-runtime');

var _children = (0, _symbol2.default)('children'),
    _zOrder = (0, _symbol2.default)('zOrder'),
    _layoutTag = (0, _symbol2.default)('layoutTag');

var GroupAttr = (_class = function (_BaseSprite$Attr) {
  (0, _inherits3.default)(GroupAttr, _BaseSprite$Attr);

  function GroupAttr(subject) {
    (0, _classCallCheck3.default)(this, GroupAttr);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupAttr.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr)).call(this, subject));

    _this.setDefault({
      clip: null,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignContent: 'stretch'
    });
    return _this;
  }

  (0, _createClass3.default)(GroupAttr, [{
    key: 'clip',
    set: function set(val) {
      this.clearCache();
      if (val) {
        val = typeof val === 'string' ? { d: val } : val;
        this.subject.svg = (0, _path.createSvgPath)(val);
        this.set('clip', val);
      } else {
        this.subject.svg = null;
        this.set('clip', null);
      }
    }

    // flexbox attributes

  }, {
    key: 'flexDirection',
    set: function set(value) {
      this.clearCache();
      this.subject.clearLayout();
      this.set('flexDirection', value);
    }
  }, {
    key: 'flexWrap',
    set: function set(value) {
      this.clearCache();
      this.subject.clearLayout();
      this.set('flexWrap', value);
    }
  }, {
    key: 'justifyContent',
    set: function set(value) {
      this.clearCache();
      this.subject.clearLayout();
      this.set('justifyContent', value);
    }
  }, {
    key: 'alignItems',
    set: function set(value) {
      this.clearCache();
      this.subject.clearLayout();
      this.set('alignItems', value);
    }
  }, {
    key: 'alignContent',
    set: function set(value) {
      this.clearCache();
      this.subject.clearLayout();
      this.set('alignContent', value);
    }
  }, {
    key: 'width',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'width', value, this);
    }
  }, {
    key: 'height',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'height', value, this);
    }
  }, {
    key: 'layoutWidth',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'layoutWidth', value, this);
    }
  }, {
    key: 'layoutHeight',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'layoutHeight', value, this);
    }
  }, {
    key: 'display',
    set: function set(value) {
      this.subject.clearLayout();
      (0, _set3.default)(GroupAttr.prototype.__proto__ || (0, _getPrototypeOf2.default)(GroupAttr.prototype), 'display', value, this);
    }
  }]);
  return GroupAttr;
}(_basesprite2.default.Attr), (_applyDecoratedDescriptor(_class.prototype, 'clip', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clip'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'flexDirection', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'flexDirection'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'flexWrap', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'flexWrap'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'justifyContent', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'justifyContent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'alignItems', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'alignItems'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'alignContent', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'alignContent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'width', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'width'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'height', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'height'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutWidth', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutWidth'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'layoutHeight', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'layoutHeight'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'display', [_spriteUtils.attr], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'display'), _class.prototype)), _class);
var Group = (_temp = _class2 = function (_BaseSprite) {
  (0, _inherits3.default)(Group, _BaseSprite);

  function Group() {
    var attr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Group);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Group.__proto__ || (0, _getPrototypeOf2.default)(Group)).call(this, attr));

    _this2[_children] = [];
    _this2[_zOrder] = 0;
    _this2[_layoutTag] = false;
    return _this2;
  }

  (0, _createClass3.default)(Group, [{
    key: 'cloneNode',
    value: function cloneNode(deepCopy) {
      var node = (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'cloneNode', this).call(this);
      if (deepCopy) {
        var children = this.children;
        children.forEach(function (child) {
          var subNode = child.cloneNode(deepCopy);
          node.append(subNode);
        });
      }
      return node;
    }
  }, {
    key: 'update',
    value: function update(child) {
      child.isDirty = true;
      this.forceUpdate(true);
    }
  }, {
    key: 'pointCollision',
    value: function pointCollision(evt) {
      if ((0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'pointCollision', this).call(this, evt) || this.isVirtual) {
        if (this.svg) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;

          var rect = this.originalRect;
          evt.isInClip = this.svg.isPointInPath(offsetX - rect[0], offsetY - rect[1]);
        }
        return true;
      }
      return false;
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, evt) {
      var collisionState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var swallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (swallow && this.getEventHandlers(type).length === 0) {
        return;
      }
      if (!swallow && !evt.terminated && type !== 'mouseenter' && type !== 'mouseleave') {
        var isCollision = collisionState || this.pointCollision(evt);
        if (isCollision) {
          var parentX = evt.offsetX - this.originalRect[0];
          var parentY = evt.offsetY - this.originalRect[1];
          // console.log(evt.parentX, evt.parentY)

          var _evt = (0, _assign2.default)({}, evt);
          _evt.parentX = parentX;
          _evt.parentY = parentY;

          var sprites = this[_children].slice(0).reverse();

          var targetSprites = [];

          for (var i = 0; i < sprites.length && evt.isInClip !== false; i++) {
            var sprite = sprites[i];
            var hit = sprite.dispatchEvent(type, _evt, collisionState, swallow);
            if (hit) {
              targetSprites.push(sprite);
            }
            if (evt.terminated && !evt.type.startsWith('mouse')) {
              break;
            }
          }

          evt.targetSprites = targetSprites;
          // stopDispatch can only terminate event in the same level
          evt.terminated = false;
          return (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'dispatchEvent', this).call(this, type, evt, isCollision, swallow);
        }
      }

      return (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'dispatchEvent', this).call(this, type, evt, collisionState, swallow);
    }
  }, {
    key: 'relayout',
    value: function relayout() {
      // console.log(this.children);

      var items = this.children.filter(function (child) {
        if (child.hasLayout) {
          child.attr('layoutWidth', null);
          child.attr('layoutHeight', null);
        }
        if (child.relayout) {
          child.relayout();
        }
        return child.hasLayout;
      });

      items.sort(function (a, b) {
        return (a.attributes.order || 0) - (b.attributes.order || 0);
      });

      var style = this.attributes;

      var mainSize = 'width',
          mainStart = 'x',
          mainEnd = 'layoutRight',
          mainSign = +1,
          mainBase = 0,
          crossSize = 'height',
          crossStart = 'y',
          crossEnd = 'layoutBottom',
          crossSign = void 0,
          crossBase = void 0;

      var flexDirection = style.flexDirection;

      if (flexDirection === 'row-reverse') {
        mainSize = 'width';
        mainStart = 'layoutRight';
        mainEnd = 'x';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'y';
        crossEnd = 'layoutBottom';
      } else if (flexDirection === 'column') {
        mainSize = 'height';
        mainStart = 'y';
        mainEnd = 'layoutBottom';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'x';
        crossEnd = 'layoutRight';
      } else if (flexDirection === 'column-reverse') {
        mainSize = 'height';
        mainStart = 'layoutBottom';
        mainEnd = 'y';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'x';
        crossEnd = 'layoutRight';
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

      function isAutoSize(size) {
        return size == null || size === '';
      }

      var isAutoMainSize = isAutoSize(style[mainSize]);

      var groupMainSize = void 0;

      if (isAutoMainSize) {
        // auto sizing
        var maxSize = 0;
        for (var i = 0; i < items.length; i++) {
          var item = items[i],
              _item$offsetSize = (0, _slicedToArray3.default)(item.offsetSize, 2),
              width = _item$offsetSize[0],
              height = _item$offsetSize[1];

          var size = mainSize === 'width' ? width : height;
          maxSize += size;
        }
        if (flexDirection === 'row-reverse' || flexDirection === 'column-reverse') {
          mainBase = maxSize;
        }
        groupMainSize = maxSize;
      } else {
        groupMainSize = mainSize === 'width' ? this.offsetSize[0] : this.offsetSize[1];
      }

      var flexLine = [];
      var flexLines = [flexLine];

      var mainSpace = groupMainSize,
          crossSpace = 0;

      function setBoxLayoutSize(item, axis, size) {
        var borderWidth = item.attr('border').width,
            _item$attr = item.attr('padding'),
            _item$attr2 = (0, _slicedToArray3.default)(_item$attr, 4),
            paddingTop = _item$attr2[0],
            paddingRight = _item$attr2[1],
            paddingBottom = _item$attr2[2],
            paddingLeft = _item$attr2[3];


        if (axis === 'width') {
          size = Math.max(0, size - 2 * borderWidth - paddingRight - paddingLeft);
          item.attr({ layoutWidth: size });
        } else if (axis === 'height') {
          size = Math.max(0, size - 2 * borderWidth - paddingTop - paddingBottom);
          item.attr({ layoutHeight: size });
        }
      }
      // collect items into lines

      for (var _i = 0; _i < items.length; _i++) {
        var _item = items[_i];
        var itemStyle = _item.attributes;

        var _item$offsetSize2 = (0, _slicedToArray3.default)(_item.offsetSize, 2),
            itemMainSize = _item$offsetSize2[0],
            itemCrossSize = _item$offsetSize2[1];

        if (mainSize === 'height') {
          ;

          var _ref2 = [itemCrossSize, itemMainSize];
          itemMainSize = _ref2[0];
          itemCrossSize = _ref2[1];
        }if (itemStyle.flex !== '') {
          flexLine.push(_item);
        } else if (style.flexWrap === 'nowrap' || isAutoMainSize) {
          mainSpace -= itemMainSize;
          crossSpace = Math.max(crossSpace, itemCrossSize);
          flexLine.push(_item);
        } else {
          if (itemMainSize > groupMainSize) {
            setBoxLayoutSize(_item, mainSize, groupMainSize);
            itemMainSize = groupMainSize;
            itemCrossSize = mainSize === 'width' ? _item.offsetSize[1] : _item.offsetSize[0];
          }
          if (mainSpace < itemMainSize) {
            flexLine.mainSpace = mainSpace;
            flexLine.crossSpace = crossSpace;
            flexLine = [_item];
            flexLines.push(flexLine);
            mainSpace = groupMainSize;
            crossSpace = 0;
          } else {
            flexLine.push(_item);
          }
          crossSpace = Math.max(crossSpace, itemCrossSize);
          mainSpace -= itemMainSize;
        }
      }
      flexLine.mainSpace = mainSpace;

      if (style.flexWrap === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace = !isAutoSize(style[crossSize]) ? style[crossSize] : crossSpace;
      } else {
        flexLine.crossSpace = crossSpace;
      }

      function fixAnchor(item) {
        var _item$originalRect = (0, _slicedToArray3.default)(item.originalRect, 2),
            left = _item$originalRect[0],
            top = _item$originalRect[1];

        if (left) {
          item.attr({ x: function x(_x4) {
              return _x4 - left;
            } });
        }
        if (top) {
          item.attr({ y: function y(_y) {
              return _y - top;
            } });
        }
      }

      if (mainSpace < 0) {
        // overflow (happens only if container is single line), scale every item
        var scale = groupMainSize / (groupMainSize - mainSpace);
        var currentMain = mainBase;
        for (var _i2 = 0; _i2 < items.length; _i2++) {
          var _item2 = items[_i2];
          var _itemStyle = _item2.attributes;
          var boxSize = mainSize === 'width' ? _item2.offsetSize[0] : _item2.offsetSize[1];

          if (_itemStyle.flex !== '') {
            boxSize = 0;
          }

          boxSize *= scale;

          _item2.attr(mainStart, currentMain);
          _item2.attr(mainEnd, currentMain + mainSign * boxSize);
          setBoxLayoutSize(_item2, mainSize, boxSize);
          currentMain = _item2.attr(mainEnd);
        }
      } else {
        // process each flex line
        flexLines.forEach(function (items) {
          var mainSpace = items.mainSpace;
          var flexTotal = 0;
          for (var _i3 = 0; _i3 < items.length; _i3++) {
            var _item3 = items[_i3];
            var _itemStyle2 = _item3.attributes;

            flexTotal += _itemStyle2.flex === '' ? 0 : parseInt(_itemStyle2.flex, 10);
          }

          if (flexTotal > 0) {
            // There is flexible flex items
            var _currentMain = mainBase;
            for (var _i4 = 0; _i4 < items.length; _i4++) {
              var _item4 = items[_i4];
              var _itemStyle3 = _item4.attributes;
              var _boxSize = mainSize === 'width' ? _item4.offsetSize[0] : _item4.offsetSize[1];

              if (_itemStyle3.flex !== '') {
                _boxSize = mainSpace / flexTotal * parseInt(_itemStyle3.flex, 10);
              }

              _item4.attr(mainStart, _currentMain);
              _item4.attr(mainEnd, _currentMain + mainSign * _boxSize);
              setBoxLayoutSize(_item4, mainSize, _boxSize);
              _currentMain = _item4.attr(mainEnd);
            }
          } else {
            var _currentMain2 = mainBase,
                _step = 0;
            // There is *NO* flexible flex items, which means, justifyContent shoud work
            var justifyContent = style.justifyContent;

            if (justifyContent === 'flex-end') {
              _currentMain2 = mainSpace * mainSign + mainBase;
              _step = 0;
            } else if (justifyContent === 'center') {
              _currentMain2 = mainSpace / 2 * mainSign + mainBase;
              _step = 0;
            } else if (justifyContent === 'space-between') {
              _step = mainSpace / (items.length - 1) * mainSign;
              _currentMain2 = mainBase;
            } else if (justifyContent === 'space-around') {
              _step = mainSpace / items.length * mainSign;
              _currentMain2 = _step / 2 + mainBase;
            }

            for (var _i5 = 0; _i5 < items.length; _i5++) {
              var _item5 = items[_i5];
              var _boxSize2 = mainSize === 'width' ? _item5.offsetSize[0] : _item5.offsetSize[1];

              _item5.attr(mainStart, _currentMain2);
              _item5.attr(mainEnd, _item5.attr(mainStart) + mainSign * _boxSize2);
              setBoxLayoutSize(_item5, mainSize, _boxSize2);
              _currentMain2 = _item5.attr(mainEnd) + _step;
            }
          }
        });
      }

      // compute the cross axis sizes
      // align-items, align-self
      var crossSizeValue = void 0;
      if (isAutoSize(style[crossSize])) {
        // auto sizing
        crossSpace = 0;
        crossSizeValue = 0;
        for (var _i6 = 0; _i6 < flexLines.length; _i6++) {
          crossSizeValue += flexLines[_i6].crossSpace;
        }
        // setBoxSize(this, crossSize, crossSizeValue)
      } else {
        crossSpace = style[crossSize];
        for (var _i7 = 0; _i7 < flexLines.length; _i7++) {
          crossSpace -= flexLines[_i7].crossSpace;
        }
      }

      if (style.flexWrap === 'wrap-reverse') {
        crossBase = isAutoSize(style[crossSize]) ? crossSizeValue : style[crossSize];
      } else {
        crossBase = 0;
      }

      var step = 0;
      var alignContent = style.alignContent;

      if (alignContent === 'flex-end') {
        crossBase += crossSign * crossSpace;
      } else if (alignContent === 'center') {
        crossBase += crossSign * crossSpace / 2;
      } else if (alignContent === 'space-between') {
        step = crossSpace / (flexLines.length - 1);
      } else if (alignContent === 'space-around') {
        step = crossSpace / flexLines.length;
        crossBase += crossSign * step / 2;
      }

      flexLines.forEach(function (items) {
        var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

        for (var _i8 = 0; _i8 < items.length; _i8++) {
          var _item6 = items[_i8];

          var align = _item6.attributes.alignSelf || style.alignItems;

          // if(isAutoSize(item.attr(crossSize))) {
          //   item.attr(crossSize, ((align === 'stretch')) ? lineCrossSize : 0)
          // }

          if (align === 'flex-start') {
            _item6.attr(crossStart, crossBase);
            _item6.attr(crossEnd, _item6.attr(crossStart) + crossSign * _item6.attr(crossSize));
          }

          if (align === 'flex-end') {
            _item6.attr(crossEnd, crossBase + crossSign * lineCrossSize);
            _item6.attr(crossStart, _item6.attr(crossEnd) - crossSign * _item6.attr(crossSize));
          }

          if (align === 'center') {
            _item6.attr(crossStart, crossBase + crossSign * (lineCrossSize - _item6.attr(crossSize)) / 2);
            _item6.attr(crossEnd, _item6.attr(crossStart) + crossSign * _item6.attr(crossSize));
          }

          if (align === 'stretch') {
            _item6.attr(crossStart, crossBase);
            _item6.attr(crossEnd, crossBase + crossSign * (!isAutoSize(_item6.attr(crossSize)) ? _item6.attr(crossSize) : lineCrossSize));
            // setBoxLayoutSize(item, crossSize, crossSign * (item.attr(crossEnd) - item.attr(crossStart)))
            var crossAttr = crossSize === 'width' ? 'layoutWidth' : 'layoutHeight';
            _item6.attr(crossAttr, crossSign * (_item6.attr(crossEnd) - _item6.attr(crossStart)));
          }

          fixAnchor(_item6);
        }
        crossBase += crossSign * (lineCrossSize + step);
      });
    }
  }, {
    key: 'clearLayout',
    value: function clearLayout() {
      this[_layoutTag] = false;
      var parent = this.parent;
      while (parent) {
        if (parent[_layoutTag]) parent[_layoutTag] = false;
        parent = parent.parent;
      }
    }
  }, {
    key: 'render',
    value: function render(t, drawingContext) {
      if (this.attr('display') === 'flex' && !this[_layoutTag]) {
        this.relayout();
      }

      var clipPath = this.attr('clip');
      if (clipPath) {
        this.svg.beginPath().to(drawingContext);
        drawingContext.clip();
      }

      if (!this.isVirtual) {
        (0, _get3.default)(Group.prototype.__proto__ || (0, _getPrototypeOf2.default)(Group.prototype), 'render', this).call(this, t, drawingContext);

        var _attrSize = (0, _slicedToArray3.default)(this.attrSize, 2),
            w = _attrSize[0],
            h = _attrSize[1];

        if (w !== '' || h !== '') {
          drawingContext.beginPath();
          drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
          drawingContext.clip();
        }
      }

      var sprites = this[_children];

      for (var i = 0; i < sprites.length; i++) {
        var child = sprites[i],
            isDirty = child.isDirty;
        child.isDirty = false;

        if (child.isVisible()) {
          child.draw(t, drawingContext);
        }
        if (isDirty) {
          child.dispatchEvent('update', { target: child, renderTime: t }, true, true);
        }
      }
      if (this.attr('display') === 'flex') {
        this[_layoutTag] = true;
      }
    }
  }, {
    key: 'isVirtual',
    get: function get() {
      if (this.attr('display') === 'flex') return false;

      var _attr = this.attr('border'),
          borderWidth = _attr.width,
          borderRadius = this.attr('borderRadius'),
          bgcolor = this.attr('bgcolor'),
          _attr2 = this.attr('gradients'),
          bgGradient = _attr2.bgcolor,
          _attrSize2 = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize2[0],
          height = _attrSize2[1],
          _attr3 = this.attr('anchor'),
          _attr4 = (0, _slicedToArray3.default)(_attr3, 2),
          anchorX = _attr4[0],
          anchorY = _attr4[1];

      return !anchorX && !anchorY && !width && !height && !borderRadius && !borderWidth && !bgcolor && !bgGradient;
    }
  }, {
    key: 'children',
    get: function get() {
      return this[_children];
    }
  }, {
    key: 'contentSize',
    get: function get() {
      if (this.isVirtual) return [0, 0];

      var _attrSize3 = (0, _slicedToArray3.default)(this.attrSize, 2),
          width = _attrSize3[0],
          height = _attrSize3[1];

      if (width === '' || height === '') {
        if (this.attr('clip')) {
          var svg = this.svg;
          var bounds = svg.bounds;
          width = width || bounds[2];
          height = height || bounds[3];
        } else {
          var right = void 0,
              bottom = void 0;

          right = 0;
          bottom = 0;
          this[_children].forEach(function (sprite) {
            var renderBox = sprite.renderBox;
            right = Math.max(right, renderBox[2]);
            bottom = Math.max(bottom, renderBox[3]);
          });
          width = width || right;
          height = height || bottom;
        }
      }
      return [width, height];
    }
  }]);
  return Group;
}(_basesprite2.default), _class2.Attr = GroupAttr, _temp);
exports.default = Group;

(0, _assign2.default)(Group.prototype, _group2.default);

(0, _nodetype.registerNodeType)('group', Group, true);