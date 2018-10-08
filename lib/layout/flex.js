'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attrs = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.relayout = relayout;

var _spriteFlexLayout = require('sprite-flex-layout');

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
    attr.subject.clearLayout();
    attr.set('flexDirection', value);
  },
  flexWrap: function flexWrap(attr, value) {
    attr.subject.clearLayout();
    attr.set('flexWrap', value);
  },
  justifyContent: function justifyContent(attr, value) {
    attr.subject.clearLayout();
    attr.set('justifyContent', value);
  },
  alignItems: function alignItems(attr, value) {
    attr.subject.clearLayout();
    attr.set('alignItems', value);
  },
  alignContent: function alignContent(attr, value) {
    attr.subject.clearLayout();
    attr.set('alignContent', value);
  }
};

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
        _item$attr2 = (0, _slicedToArray3.default)(_item$attr, 4),
        marginTop = _item$attr2[0],
        marginRight = _item$attr2[1],
        marginBottom = _item$attr2[2],
        marginLeft = _item$attr2[3];

    var _item$attr3 = item.attr('padding'),
        _item$attr4 = (0, _slicedToArray3.default)(_item$attr3, 4),
        paddingTop = _item$attr4[0],
        paddingRight = _item$attr4[1],
        paddingBottom = _item$attr4[2],
        paddingLeft = _item$attr4[3];

    var borderWidth = item.attr('border').width;

    var _item$attrSize = (0, _slicedToArray3.default)(item.attrSize, 2),
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

    var _sprite$originalRect = (0, _slicedToArray3.default)(sprite.originalRect, 2),
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