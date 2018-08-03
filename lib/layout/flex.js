'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attrs = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.relayout = relayout;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attrs = exports.attrs = {
  init: function init(attr) {
    attr.setDefault({
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignContent: 'stretch'
    });
  },
  flexDirection: function flexDirection(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('flexDirection', value);
  },
  flexWrap: function flexWrap(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('flexWrap', value);
  },
  justifyContent: function justifyContent(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('justifyContent', value);
  },
  alignItems: function alignItems(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('alignItems', value);
  },
  alignContent: function alignContent(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('alignContent', value);
  }
};

function relayout(container, items) {
  items.sort(function (a, b) {
    return (a.attributes.order || 0) - (b.attributes.order || 0);
  });

  function getSize(node, key) {
    return key === 'width' ? node.attrSize[0] : node.attrSize[1];
  }
  var style = container.attributes;

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
    mainBase = getSize(container, 'width');

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
    mainBase = getSize(container, 'height');

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

  var isAutoMainSize = isAutoSize(getSize(container, mainSize));

  var groupMainSize = void 0;

  if (isAutoMainSize) {
    // auto sizing
    var maxSize = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i],
          _item$layoutSize = (0, _slicedToArray3.default)(item.layoutSize, 2),
          width = _item$layoutSize[0],
          height = _item$layoutSize[1];

      var _size = mainSize === 'width' ? width : height;
      maxSize += _size;
    }
    if (flexDirection === 'row-reverse' || flexDirection === 'column-reverse') {
      mainBase = maxSize;
    }
    groupMainSize = maxSize;
  } else {
    groupMainSize = mainSize === 'width' ? container.layoutSize[0] : container.layoutSize[1];
  }

  var flexLine = [];
  var flexLines = [flexLine];

  var mainSpace = groupMainSize,
      crossSpace = 0;

  function setBoxLayoutSize(item, axis, size) {
    var isBorderBox = item.attr('boxSizing') === 'border-box';

    var _item$attr = item.attr('margin'),
        _item$attr2 = (0, _slicedToArray3.default)(_item$attr, 4),
        marginTop = _item$attr2[0],
        marginRight = _item$attr2[1],
        marginBottom = _item$attr2[2],
        marginLeft = _item$attr2[3];

    if (isBorderBox) {
      if (axis === 'width') {
        size = Math.max(0, size - marginRight - marginLeft);
        item.attr({ layoutWidth: size });
      } else if (axis === 'height') {
        size = Math.max(0, size - marginTop - marginBottom);
        item.attr({ layoutHeight: size });
      }
    } else {
      var borderWidth = item.attr('border').width,
          _item$attr3 = item.attr('padding'),
          _item$attr4 = (0, _slicedToArray3.default)(_item$attr3, 4),
          paddingTop = _item$attr4[0],
          paddingRight = _item$attr4[1],
          paddingBottom = _item$attr4[2],
          paddingLeft = _item$attr4[3];


      if (axis === 'width') {
        size = Math.max(0, size - 2 * borderWidth - paddingRight - paddingLeft - marginRight - marginLeft);
        item.attr({ layoutWidth: size });
      } else if (axis === 'height') {
        size = Math.max(0, size - 2 * borderWidth - paddingTop - paddingBottom - marginTop - marginBottom);
        item.attr({ layoutHeight: size });
      }
    }
  }
  // collect items into lines

  for (var _i = 0; _i < items.length; _i++) {
    var _item = items[_i];
    var itemStyle = _item.attributes;

    var _item$layoutSize2 = (0, _slicedToArray3.default)(_item.layoutSize, 2),
        itemMainSize = _item$layoutSize2[0],
        itemCrossSize = _item$layoutSize2[1];

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
        itemCrossSize = mainSize === 'width' ? _item.layoutSize[1] : _item.layoutSize[0];
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
    var _size2 = getSize(container, crossSize);
    flexLine.crossSpace = !isAutoSize(_size2) ? _size2 : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  function fixAnchor(item) {
    var _item$originalRect = (0, _slicedToArray3.default)(item.originalRect, 2),
        left = _item$originalRect[0],
        top = _item$originalRect[1],
        margin = item.attr('margin');
    // console.log(margin[3])


    item.attr({ x: function x(_x) {
        return _x - left + margin[3];
      } });
    item.attr({ y: function y(_y) {
        return _y - top + margin[0];
      } });
  }

  if (mainSpace < 0) {
    // overflow (happens only if container is single line), scale every item
    var scale = groupMainSize / (groupMainSize - mainSpace);
    var currentMain = mainBase;
    for (var _i2 = 0; _i2 < items.length; _i2++) {
      var _item2 = items[_i2];
      var _itemStyle = _item2.attributes;
      var boxSize = mainSize === 'width' ? _item2.layoutSize[0] : _item2.layoutSize[1];

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
          var _boxSize = mainSize === 'width' ? _item4.layoutSize[0] : _item4.layoutSize[1];

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
          var _boxSize2 = mainSize === 'width' ? _item5.layoutSize[0] : _item5.layoutSize[1];

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
  var size = getSize(container, crossSize);
  if (isAutoSize(size)) {
    // auto sizing
    crossSpace = 0;
    crossSizeValue = 0;
    for (var _i6 = 0; _i6 < flexLines.length; _i6++) {
      crossSizeValue += flexLines[_i6].crossSpace;
    }
    // setBoxSize(container, crossSize, crossSizeValue)
  } else {
    crossSpace = size;
    for (var _i7 = 0; _i7 < flexLines.length; _i7++) {
      crossSpace -= flexLines[_i7].crossSpace;
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    crossBase = isAutoSize(size) ? crossSizeValue : size;
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

      var _size3 = crossSize === 'width' ? _item6.offsetSize[0] : _item6.offsetSize[1];

      if (align === 'flex-start') {
        _item6.attr(crossStart, crossBase);
        _item6.attr(crossEnd, _item6.attr(crossStart) + crossSign * _size3);
      }

      if (align === 'flex-end') {
        _item6.attr(crossEnd, crossBase + crossSign * lineCrossSize);
        _item6.attr(crossStart, _item6.attr(crossEnd) - crossSign * _size3);
      }

      if (align === 'center') {
        _item6.attr(crossStart, crossBase + crossSign * (lineCrossSize - _size3) / 2);
        _item6.attr(crossEnd, _item6.attr(crossStart) + crossSign * _size3);
      }

      if (align === 'stretch') {
        _item6.attr(crossStart, crossBase);
        _item6.attr(crossEnd, crossBase + crossSign * (!isAutoSize(getSize(_item6, crossSize)) ? _size3 : lineCrossSize));
        // setBoxLayoutSize(item, crossSize, crossSign * (item.attr(crossEnd) - item.attr(crossStart)))
        var crossAttr = crossSize === 'width' ? 'layoutWidth' : 'layoutHeight';
        _item6.attr(crossAttr, crossSign * (_item6.attr(crossEnd) - _item6.attr(crossStart)));
      }

      fixAnchor(_item6);
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
}