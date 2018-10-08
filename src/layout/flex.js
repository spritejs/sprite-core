import {Node} from 'sprite-flex-layout';

export const attrs = {
  init(attr) {
    attr.setDefault({
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
      alignContent: 'stretch',
    });
  },
  flexDirection(attr, value) {
    attr.subject.clearLayout();
    attr.set('flexDirection', value);
  },
  flexWrap(attr, value) {
    attr.subject.clearLayout();
    attr.set('flexWrap', value);
  },
  justifyContent(attr, value) {
    attr.subject.clearLayout();
    attr.set('justifyContent', value);
  },
  alignItems(attr, value) {
    attr.subject.clearLayout();
    attr.set('alignItems', value);
  },
  alignContent(attr, value) {
    attr.subject.clearLayout();
    attr.set('alignContent', value);
  },
};

export function relayout(containerSprite, itemsSprite) {
  itemsSprite.sort((a, b) => {
    const orderA = a.attributes.order | 0,
      orderB = b.attributes.order | 0;
    if(orderA !== orderB) {
      return orderA - orderB;
    }
    return a.zOrder - b.zOrder;
  });
  const container = Node.create({
    width: containerSprite.attrSize[0],
    height: containerSprite.attrSize[1],
    flexDirection: containerSprite.attributes.flexDirection,
    alignItems: containerSprite.attributes.alignItems,
    justifyContent: containerSprite.attributes.justifyContent,
    flexWrap: containerSprite.attributes.flexWrap,
    alignContent: containerSprite.attributes.alignContent,
  });
  itemsSprite.forEach((item) => {
    const [marginTop, marginRight, marginBottom, marginLeft] = item.attr('margin');
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = item.attr('padding');
    const borderWidth = item.attr('border').width;
    const [width, height] = item.attrSize;

    const config = {
      width,
      height,
      offsetWidth: item.contentSize[0],
      offsetHeight: item.contentSize[1],
      minWidth: item.attributes.minWidth,
      maxWidth: item.attributes.maxWidth,
      minHeight: item.attributes.minHeight,
      maxHeight: item.attributes.maxHeight,
      boxSizing: item.attr('boxSizing'),
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      borderTop: borderWidth,
      borderRight: borderWidth,
      borderBottom: borderWidth,
      borderLeft: borderWidth,
      alignSelf: item.attributes.alignSelf,
      // flex: item.attributes.flex,
      flexBasis: item.attributes.flexBasis,
      flexGrow: item.attributes.flexGrow,
      flexShrink: item.attributes.flexShrink,
    };
    const node = Node.create(config);
    container.appendChild(node);
  });
  container.calculateLayout();
  const layout = container.getAllComputedLayout();
  containerSprite.attr({
    layoutWidth: layout.width,
    layoutHeight: layout.height,
  });
  layout.children.forEach((item, index) => {
    const sprite = itemsSprite[index];
    const [ox, oy] = sprite.originalRect; // fix anchor
    sprite.attr({
      layoutX: item.left - ox,
      layoutY: item.top - oy,
      layoutWidth: item.width,
      layoutHeight: item.height,
      layoutRight: item.left + item.width,
      layoutBottom: item.top + item.height,
    });
  });
}