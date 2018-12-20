"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relayout = relayout;
exports.attrs = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _spriteFlexLayout = require("sprite-flex-layout");

var _utils = require("../../utils");

var attrs = {
  flexDirection: {
    decorators: [(0, _utils.attr)({
      relayout: relayout
    })],
    value: 'row'
  },
  flexWrap: {
    decorators: [(0, _utils.attr)({
      relayout: relayout
    })],
    value: 'nowrap'
  },
  justifyContent: {
    decorators: [(0, _utils.attr)({
      relayout: relayout
    })],
    value: 'flex-start'
  },
  alignItems: {
    decorators: [(0, _utils.attr)({
      relayout: relayout
    })],
    value: 'stretch'
  },
  alignContent: {
    decorators: [(0, _utils.attr)({
      relayout: relayout
    })],
    value: 'stretch'
  }
};
exports.attrs = attrs;

function relayout(containerSprite, itemsSprite) {
  itemsSprite.sort(function (a, b) {
    var orderA = a.attributes.order | 0,
        orderB = b.attributes.order | 0;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return a.zOrder - b.zOrder;
  });

  var container = _spriteFlexLayout.Node.create({
    width: containerSprite.attrSize[0],
    height: containerSprite.attrSize[1],
    flexDirection: containerSprite.attributes.flexDirection,
    alignItems: containerSprite.attributes.alignItems,
    justifyContent: containerSprite.attributes.justifyContent,
    flexWrap: containerSprite.attributes.flexWrap,
    alignContent: containerSprite.attributes.alignContent
  });

  itemsSprite.forEach(function (item) {
    var _item$attr = item.attr('margin'),
        _item$attr2 = (0, _slicedToArray2.default)(_item$attr, 4),
        marginTop = _item$attr2[0],
        marginRight = _item$attr2[1],
        marginBottom = _item$attr2[2],
        marginLeft = _item$attr2[3];

    var _item$attr3 = item.attr('padding'),
        _item$attr4 = (0, _slicedToArray2.default)(_item$attr3, 4),
        paddingTop = _item$attr4[0],
        paddingRight = _item$attr4[1],
        paddingBottom = _item$attr4[2],
        paddingLeft = _item$attr4[3];

    var borderWidth = item.attr('border').width;

    var _item$attrSize = (0, _slicedToArray2.default)(item.attrSize, 2),
        width = _item$attrSize[0],
        height = _item$attrSize[1];

    var config = {
      width: width,
      height: height,
      offsetWidth: item.contentSize[0],
      offsetHeight: item.contentSize[1],
      minWidth: item.attributes.minWidth,
      maxWidth: item.attributes.maxWidth,
      minHeight: item.attributes.minHeight,
      maxHeight: item.attributes.maxHeight,
      boxSizing: item.attr('boxSizing'),
      marginTop: marginTop,
      marginRight: marginRight,
      marginBottom: marginBottom,
      marginLeft: marginLeft,
      paddingTop: paddingTop,
      paddingRight: paddingRight,
      paddingBottom: paddingBottom,
      paddingLeft: paddingLeft,
      borderTop: borderWidth,
      borderRight: borderWidth,
      borderBottom: borderWidth,
      borderLeft: borderWidth,
      alignSelf: item.attributes.alignSelf,
      // flex: item.attributes.flex,
      flexBasis: item.attributes.flexBasis,
      flexGrow: item.attributes.flexGrow,
      flexShrink: item.attributes.flexShrink
    };

    var node = _spriteFlexLayout.Node.create(config);

    container.appendChild(node);
  });
  container.calculateLayout();
  var layout = container.getAllComputedLayout();
  containerSprite.attr({
    layoutWidth: layout.width,
    layoutHeight: layout.height
  });
  layout.children.forEach(function (item, index) {
    var sprite = itemsSprite[index];

    var _sprite$originalRect = (0, _slicedToArray2.default)(sprite.originalRect, 2),
        ox = _sprite$originalRect[0],
        oy = _sprite$originalRect[1]; // fix anchor


    sprite.attr({
      layoutX: item.left - ox,
      layoutY: item.top - oy,
      layoutWidth: item.width,
      layoutHeight: item.height,
      layoutRight: item.left + item.width,
      layoutBottom: item.top + item.height
    });
  });
}