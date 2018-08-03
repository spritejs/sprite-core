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
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('flexDirection', value);
  },
  flexWrap(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('flexWrap', value);
  },
  justifyContent(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('justifyContent', value);
  },
  alignItems(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('alignItems', value);
  },
  alignContent(attr, value) {
    attr.clearCache();
    attr.subject.clearLayout();
    attr.set('alignContent', value);
  },
};


export function relayout(container, items) {
  items.sort((a, b) => {
    return (a.attributes.order || 0) - (b.attributes.order || 0);
  });

  function getSize(node, key) {
    return key === 'width' ? node.attrSize[0] : node.attrSize[1];
  }
  const style = container.attributes;

  let mainSize = 'width',
    mainStart = 'x',
    mainEnd = 'layoutRight',
    mainSign = +1,
    mainBase = 0,
    crossSize = 'height',
    crossStart = 'y',
    crossEnd = 'layoutBottom',
    crossSign,
    crossBase;

  const flexDirection = style.flexDirection;

  if(flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'layoutRight';
    mainEnd = 'x';
    mainSign = -1;
    mainBase = getSize(container, 'width');

    crossSize = 'height';
    crossStart = 'y';
    crossEnd = 'layoutBottom';
  } else if(flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'y';
    mainEnd = 'layoutBottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'x';
    crossEnd = 'layoutRight';
  } else if(flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'layoutBottom';
    mainEnd = 'y';
    mainSign = -1;
    mainBase = getSize(container, 'height');

    crossSize = 'width';
    crossStart = 'x';
    crossEnd = 'layoutRight';
  }

  if(style.flexWrap === 'wrap-reverse') {
    [crossStart, crossEnd] = [crossEnd, crossStart];
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  function isAutoSize(size) {
    return size == null || size === '';
  }

  const isAutoMainSize = isAutoSize(getSize(container, mainSize));

  let groupMainSize;

  if(isAutoMainSize) { // auto sizing
    let maxSize = 0;
    for(let i = 0; i < items.length; i++) {
      const item = items[i],
        [width, height] = item.layoutSize;
      const size = mainSize === 'width' ? width : height;
      maxSize += size;
    }
    if(flexDirection === 'row-reverse' || flexDirection === 'column-reverse') {
      mainBase = maxSize;
    }
    groupMainSize = maxSize;
  } else {
    groupMainSize = mainSize === 'width' ? container.layoutSize[0] : container.layoutSize[1];
  }

  let flexLine = [];
  const flexLines = [flexLine];

  let mainSpace = groupMainSize,
    crossSpace = 0;

  function setBoxLayoutSize(item, axis, size) {
    const isBorderBox = item.attr('boxSizing') === 'border-box';
    const [marginTop, marginRight, marginBottom, marginLeft] = item.attr('margin');
    if(isBorderBox) {
      if(axis === 'width') {
        size = Math.max(0, size - marginRight - marginLeft);
        item.attr({layoutWidth: size});
      } else if(axis === 'height') {
        size = Math.max(0, size - marginTop - marginBottom);
        item.attr({layoutHeight: size});
      }
    } else {
      const borderWidth = item.attr('border').width,
        [paddingTop, paddingRight, paddingBottom, paddingLeft] = item.attr('padding');

      if(axis === 'width') {
        size = Math.max(0, size - 2 * borderWidth - paddingRight - paddingLeft - marginRight - marginLeft);
        item.attr({layoutWidth: size});
      } else if(axis === 'height') {
        size = Math.max(0, size - 2 * borderWidth - paddingTop - paddingBottom - marginTop - marginBottom);
        item.attr({layoutHeight: size});
      }
    }
  }
  // collect items into lines

  for(let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemStyle = item.attributes;

    let [itemMainSize, itemCrossSize] = item.layoutSize;

    if(mainSize === 'height') [itemMainSize, itemCrossSize] = [itemCrossSize, itemMainSize];

    if(itemStyle.flex !== '') {
      flexLine.push(item);
    } else if(style.flexWrap === 'nowrap' || isAutoMainSize) {
      mainSpace -= itemMainSize;
      crossSpace = Math.max(crossSpace, itemCrossSize);
      flexLine.push(item);
    } else {
      if(itemMainSize > groupMainSize) {
        setBoxLayoutSize(item, mainSize, groupMainSize);
        itemMainSize = groupMainSize;
        itemCrossSize = mainSize === 'width' ? item.layoutSize[1] : item.layoutSize[0];
      }
      if(mainSpace < itemMainSize) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = groupMainSize;
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      crossSpace = Math.max(crossSpace, itemCrossSize);
      mainSpace -= itemMainSize;
    }
  }
  flexLine.mainSpace = mainSpace;

  if(style.flexWrap === 'nowrap' || isAutoMainSize) {
    const size = getSize(container, crossSize);
    flexLine.crossSpace = !isAutoSize(size) ? size : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  function fixAnchor(item) {
    const [left, top] = item.originalRect,
      margin = item.attr('margin');
    // console.log(margin[3])
    item.attr({x: x => x - left + margin[3]});
    item.attr({y: y => y - top + margin[0]});
  }

  if(mainSpace < 0) {
    // overflow (happens only if container is single line), scale every item
    const scale = groupMainSize / (groupMainSize - mainSpace);
    let currentMain = mainBase;
    for(let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemStyle = item.attributes;
      let boxSize = mainSize === 'width' ? item.layoutSize[0] : item.layoutSize[1];

      if(itemStyle.flex !== '') {
        boxSize = 0;
      }

      boxSize *= scale;

      item.attr(mainStart, currentMain);
      item.attr(mainEnd, currentMain + mainSign * boxSize);
      setBoxLayoutSize(item, mainSize, boxSize);
      currentMain = item.attr(mainEnd);
    }
  } else {
    // process each flex line
    flexLines.forEach((items) => {
      const mainSpace = items.mainSpace;
      let flexTotal = 0;
      for(let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemStyle = item.attributes;

        flexTotal += itemStyle.flex === '' ? 0 : parseInt(itemStyle.flex, 10);
      }

      if(flexTotal > 0) {
        // There is flexible flex items
        let currentMain = mainBase;
        for(let i = 0; i < items.length; i++) {
          const item = items[i];
          const itemStyle = item.attributes;
          let boxSize = mainSize === 'width' ? item.layoutSize[0] : item.layoutSize[1];

          if(itemStyle.flex !== '') {
            boxSize = (mainSpace / flexTotal) * parseInt(itemStyle.flex, 10);
          }

          item.attr(mainStart, currentMain);
          item.attr(mainEnd, currentMain + mainSign * boxSize);
          setBoxLayoutSize(item, mainSize, boxSize);
          currentMain = item.attr(mainEnd);
        }
      } else {
        let currentMain = mainBase,
          step = 0;
        // There is *NO* flexible flex items, which means, justifyContent shoud work
        const justifyContent = style.justifyContent;

        if(justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSign + mainBase;
          step = 0;
        } else if(justifyContent === 'center') {
          currentMain = mainSpace / 2 * mainSign + mainBase;
          step = 0;
        } else if(justifyContent === 'space-between') {
          step = mainSpace / (items.length - 1) * mainSign;
          currentMain = mainBase;
        } else if(justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign;
          currentMain = step / 2 + mainBase;
        }

        for(let i = 0; i < items.length; i++) {
          const item = items[i];
          const boxSize = mainSize === 'width' ? item.layoutSize[0] : item.layoutSize[1];

          item.attr(mainStart, currentMain);
          item.attr(mainEnd, item.attr(mainStart) + mainSign * boxSize);
          setBoxLayoutSize(item, mainSize, boxSize);
          currentMain = item.attr(mainEnd) + step;
        }
      }
    });
  }

  // compute the cross axis sizes
  // align-items, align-self
  let crossSizeValue;
  const size = getSize(container, crossSize);
  if(isAutoSize(size)) { // auto sizing
    crossSpace = 0;
    crossSizeValue = 0;
    for(let i = 0; i < flexLines.length; i++) {
      crossSizeValue += flexLines[i].crossSpace;
    }
    // setBoxSize(container, crossSize, crossSizeValue)
  } else {
    crossSpace = size;
    for(let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  if(style.flexWrap === 'wrap-reverse') {
    crossBase = isAutoSize(size) ? crossSizeValue : size;
  } else {
    crossBase = 0;
  }

  let step = 0;
  const alignContent = style.alignContent;

  if(alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
  } else if(alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2;
  } else if(alignContent === 'space-between') {
    step = crossSpace / (flexLines.length - 1);
  } else if(alignContent === 'space-around') {
    step = crossSpace / (flexLines.length);
    crossBase += crossSign * step / 2;
  }

  flexLines.forEach((items) => {
    const lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

    for(let i = 0; i < items.length; i++) {
      const item = items[i];

      const align = item.attributes.alignSelf || style.alignItems;

      const size = crossSize === 'width' ? item.offsetSize[0] : item.offsetSize[1];

      if(align === 'flex-start') {
        item.attr(crossStart, crossBase);
        item.attr(crossEnd, item.attr(crossStart) + crossSign * size);
      }

      if(align === 'flex-end') {
        item.attr(crossEnd, crossBase + crossSign * lineCrossSize);
        item.attr(crossStart, item.attr(crossEnd) - crossSign * size);
      }

      if(align === 'center') {
        item.attr(crossStart, crossBase + crossSign * (lineCrossSize - size) / 2);
        item.attr(crossEnd, item.attr(crossStart) + crossSign * size);
      }

      if(align === 'stretch') {
        item.attr(crossStart, crossBase);
        item.attr(crossEnd, crossBase + crossSign * (!isAutoSize(getSize(item, crossSize)) ? size : lineCrossSize));
        // setBoxLayoutSize(item, crossSize, crossSign * (item.attr(crossEnd) - item.attr(crossStart)))
        const crossAttr = crossSize === 'width' ? 'layoutWidth' : 'layoutHeight';
        item.attr(crossAttr, crossSign * (item.attr(crossEnd) - item.attr(crossStart)));
      }

      fixAnchor(item);
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
}