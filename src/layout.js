import Group from './group'
import { attr } from 'sprite-utils'
import { registerNodeType } from './nodetype'

class LayoutAttr extends Group.Attr {
  constructor(subject) {
    super(subject)
    this.setDefault({

    })
  }

  @attr
  set direction(value) {
    this.clearCache()
    this.set('direction', value)
  }
}

export class FlexLayout extends Group {
  //static Attr = LayoutAttr

  async measure() {

  }



  async relayout() {
    //console.log(this.children);

    var items = this.children;

    items.sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });

    var style = this.attr();

    ['width', 'height'].forEach(size => {
      if(style[size] === 'auto' || style[size] === '') {
        style[size] = null;
      }
    })


    if (!style.flexDirection || style.flexDirection === 'auto')
      style.flexDirection = 'row';
    if (!style.alignItems || style.alignItems === 'auto')
      style.alignItems = 'stretch';
    if (!style.justifyContent || style.justifyContent === 'auto')
      style.justifyContent = 'flex-start';
    if (!style.flexWrap || style.flexWrap === 'auto')
      style.flexWrap = 'nowrap';
    if (!style.alignContent || style.alignContent === 'auto')
      style.alignContent = 'stretch';

    var mainSize, mainStart, mainEnd, mainSign, mainBase,
      crossSize, crossStart, crossEnd, crossSign, crossBase;
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
      var tmp = crossStart;
      crossStart = crossEnd;
      crossEnd = tmp;
      crossSign = -1;
    } else {
      crossBase = 0;
      crossSign = 1;
    }


    var isAutoMainSize = false;
    if (style[mainSize] === null) { // auto sizing
      this.attr(mainSize, 0);
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.attr(mainSize) !== null || item.attr(mainSize) !== (void 0))
          this.attr(mainSize, this.attr(mainSize) + item.attr(mainSize));
      }
      isAutoMainSize = true;
      //style.flexWrap = 'nowrap';
    }


    var flexLine = []
    var flexLines = [flexLine]

    var mainSpace = this.attr(mainSize);
    var crossSpace = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = item.attr();

      if (itemStyle[mainSize] === null) {
        item.attr(mainSize, 0);
      }



      if (itemStyle.flex) {
        flexLine.push(item);
      } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
        mainSpace -= itemStyle[mainSize];
        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
          crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        flexLine.push(item);
      } else {
        if (itemStyle[mainSize] > style[mainSize]) {
          item.attr(mainSize, style[mainSize]);
        }
        if (mainSpace < itemStyle[mainSize]) {
          flexLine.mainSpace = mainSpace;
          flexLine.crossSpace = crossSpace;
          flexLine = [item];
          flexLines.push(flexLine);
          mainSpace = style[mainSize];
          crossSpace = 0;
        } else {
          flexLine.push(item);
        }
        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
          crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        mainSpace -= itemStyle[mainSize];
      }
    }
    flexLine.mainSpace = mainSpace;

    if (style.flexWrap === 'nowrap' || isAutoMainSize) {
      flexLine.crossSpace = (style[crossSize] !== null) ? style[crossSize] : crossSpace;
    } else {
      flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) { 
      // overflow (happens only if container is single line), scale every item
      var scale = style[mainSize] / (style[mainSize] - mainSpace);
      var currentMain = mainBase;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = item.attr();

        if (itemStyle.flex) {
          item.attr(mainSize, 0);
        }

        item.attr(mainSize, item.attr(mainSize) * scale);

        item.attr(mainStart, currentMain);
        item.attr(mainEnd, item.attr(mainStart) + mainSign * item.attr(mainSize));
        currentMain = item.attr(mainEnd);
      }

    } else {
      // process each flex line
      flexLines.forEach(function (items) {

        var mainSpace = items.mainSpace;
        var flexTotal = 0;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var itemStyle = item.attr();

          if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
            flexTotal += itemStyle.flex;
            continue;
          }
        }

        if (flexTotal > 0) { 
          // There is flexible flex items
          var currentMain = mainBase;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = item.attr();

            if (itemStyle.flex) {
              item.attr(mainSize, (mainSpace / flexTotal) * itemStyle.flex);
            }
            item.attr(mainStart, currentMain)
            item.attr(mainEnd, item.attr(mainStart) + mainSign * item.attr(mainSize))
            currentMain = item.attr(mainEnd);
          }
        } else { 
          // There is *NO* flexible flex items, which means, justifyContent shoud work
          if (style.justifyContent === 'flex-start') {
            var currentMain = mainBase;
            var step = 0;
          }
          if (style.justifyContent === 'flex-end') {
            var currentMain = mainSpace * mainSign + mainBase;
            var step = 0;
          }
          if (style.justifyContent === 'center') {
            var currentMain = mainSpace / 2 * mainSign + mainBase;
            var step = 0;
          }
          if (style.justifyContent === 'space-between') {
            var step = mainSpace / (items.length - 1) * mainSign;
            var currentMain = mainBase;
          }
          if (style.justifyContent === 'space-around') {
            var step = mainSpace / items.length * mainSign;
            var currentMain = step / 2 + mainBase;
          }
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.attr(mainStart, currentMain);
            item.attr(mainEnd, item.attr(mainStart) + mainSign * item.attr(mainSize))
            currentMain = item.attr(mainEnd) + step;
          }
        }
      })


    }

    // compute the cross axis sizes
    // align-items, align-self
    var crossSpace;

    if (style[crossSize] === null) { // auto sizing
      crossSpace = 0;
      this.attr(crossSize, 0);
      for (var i = 0; i < flexLines.length; i++) {
        this.attr(crossSize, this.attr(crossSize) + flexLines[i].crossSpace);
      }
    } else {
      crossSpace = style[crossSize]
      for (var i = 0; i < flexLines.length; i++) {
        crossSpace -= flexLines[i].crossSpace;
      }
    }

    if (style.flexWrap === 'wrap-reverse') {
      crossBase = style[crossSize];
    } else {
      crossBase = 0;
    }
    var lineSize = style[crossSize] / flexLines.length;

    var step;
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

      step = crossSpace / (flexLines.length);
      crossBase += crossSign * step / 2;
    }
    if (style.alignContent === 'stretch') {
      crossBase += 0;
      step = 0;
    }
    flexLines.forEach(function (items) {
      var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var align = item.alignSelf || style.alignItems;

        if (item === null)
          item.attr(crossSize, ((align === 'stretch')) ? lineCrossSize : 0)

        if (align === 'flex-start') {
          item.attr(crossStart, crossBase);
          item.attr(crossEnd, item.attr(crossStart) + crossSign * item.attr(crossSize));
        }

        if (align === 'flex-end') {
          item.attr(crossEnd, crossBase + crossSign * lineCrossSize);
          item.attr(crossStart, item.attr(crossEnd) - crossSign * item.attr(crossSize))
        }

        if (align === 'center') {
          item.attr(crossStart, crossBase + crossSign * (lineCrossSize - itemitem.attr(crossSize)) / 2)
          item.attr(crossEnd, item.attr(crossStart) + crossSign * item.attr(crossSize));
        }

        if (align === 'stretch') {
          item.attr(crossStart, crossBase);
          item.attr(crossEnd, crossBase + crossSign * ((item.attr(crossSize) !== null && item.attr(crossSize) !== (void 0)) ? item.attr(crossSize) : lineCrossSize))

          item.attr(crossSize, crossSign * (item.attr(crossEnd) - item.attr(crossStart)))
        }
        

      }
      crossBase += crossSign * (lineCrossSize + step);
    });
    console.log(items);
  }

  render(t, drawingContext) {
    //console.log(t)
    //console.log(drawingContext)
    return super.render(t, drawingContext)
  }
}

registerNodeType('flexLayout', FlexLayout, true)

