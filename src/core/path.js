import {parseColorString, parseValue, parseStringFloat,
  attr, composit, flow, inherit,
  findColor, createSvgPath} from '../utils';
import BaseSprite from './basesprite';

const reflow = true,
  quiet = true;

class PathSpriteAttr extends BaseSprite.Attr {
  @attr({reflow})
  set path(val) {
    if(val) {
      val = typeof val === 'string' ? {d: val} : val;
      this.subject.svg = createSvgPath(val);
      this.set('path', val);
    } else {
      this.subject.svg = null;
      this.set('path', null);
    }
  }

  @attr
  set d(val) {
    if(val) {
      const path = this.path;
      if(!path) {
        this.path = {d: val};
      } else {
        this.path = Object.assign(path, {d: val});
      }
    } else {
      this.path = null;
    }
  }

  get d() {
    return this.path ? this.path.d : null;
  }

  @parseValue(parseFloat)
  @attr({reflow})
  @inherit(1)
  lineWidth = 'inherit';

  @parseValue(parseStringFloat, (val) => { return typeof val === 'number' ? [val] : val })
  @attr
  lineDash;

  @parseValue(parseFloat)
  @attr
  lineDashOffset = 0;

  /**
    lineCap: butt|round|square
   */
  @attr
  @inherit('butt')
  lineCap = 'inherit';

  /**
    lineJoin: miter|round|bevel
   */
  @attr
  @inherit('miter')
  lineJoin = 'inherit';

  @parseValue(parseColorString)
  @attr
  @inherit('')
  strokeColor = 'inherit';

  @parseValue(parseColorString)
  @attr
  @inherit('')
  fillColor = 'inherit';

  @attr({reflow})
  flexible;

  // auto | box | path
  @attr({quiet})
  @inherit('auto')
  bounding = 'inherit';

  @attr
  @composit('strokeColor')
  color;
}

export default class Path extends BaseSprite {
  static Attr = PathSpriteAttr;

  constructor(attr) {
    if(typeof attr === 'string') {
      attr = {d: attr};
    }
    super(attr);
  }

  set path(val) {
    this.attr('path', val);
  }

  get path() {
    return this.attr('path');
  }

  getPointAtLength(length) {
    if(this.svg) {
      return this.svg.getPointAtLength(length);
    }
    return [0, 0];
  }

  getPathLength() {
    if(this.svg) {
      return this.svg.getTotalLength();
    }
    return 0;
  }

  isClosed() {
    const d = this.attr('d');
    if(d) {
      return /z$/img.test(d);
    }
    return false;
  }

  findPath(offsetX, offsetY) {
    const rect = this.originalRect;
    const pathOffset = this.pathOffset;
    const svg = this.svg;
    if(svg) {
      const x = offsetX - rect[0] - pathOffset[0],
        y = offsetY - rect[1] - pathOffset[1];
      let collision = false;
      if(this.isClosed()) {
        collision = svg.isPointInPath(x, y);
      }
      if(!collision) {
        const lineWidth = this.attr('lineWidth') + (parseFloat(this.attr('bounding')) || 0),
          lineCap = this.attr('lineCap'),
          lineJoin = this.attr('lineJoin');
        collision = svg.isPointInStroke(x, y, {lineWidth, lineCap, lineJoin});
      }
      if(collision) {
        return [svg];
      }
    }
    return [];
  }

  get lineWidth() {
    const lineWidth = this.attr('lineWidth'),
      gradients = this.attr('gradients'),
      fillColor = this.attr('fillColor'),
      strokeColor = this.attr('strokeColor');

    const hasStrokeColor = strokeColor || gradients && gradients.strokeColor,
      hasFillColor = fillColor || gradients && gradients.fillColor;

    if(!hasStrokeColor && hasFillColor) {
      // fill: ignore stroke
      return 0;
    }
    return lineWidth;
  }

  get pathOffset() {
    const lw = Math.round(this.lineWidth);
    return [lw, lw];
  }

  get pathSize() {
    return this.svg ? this.svg.size : [0, 0];
  }

  @flow
  get contentSize() {
    if(!this.svg) return super.contentSize;

    const bounds = this.svg.bounds;
    let [width, height] = this.attrSize;

    const pathOffset = this.pathOffset;

    if(width === '') {
      width = bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0];
    }
    if(height === '') {
      height = bounds[3] - Math.min(0, bounds[1]) + 2 * pathOffset[1];
    }

    if(this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
      height = Math.ceil(height * width / (bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0]));
    }

    return [width, height].map(Math.ceil);
  }

  @flow
  get originalRect() {
    const svg = this.svg;
    if(svg) {
      const bounds = svg.bounds,
        offset = this.pathOffset;
      const [width, height] = this.offsetSize,
        [anchorX, anchorY] = this.attr('anchor');

      const rect = [0, 0, width, height],
        offsetX = Math.min(0, bounds[0]),
        offsetY = Math.min(0, bounds[1]);

      rect[0] = offsetX - offset[0] - anchorX * (width + offsetX - 2 * offset[0]);
      rect[1] = offsetY - offset[1] - anchorY * (height + offsetY - 2 * offset[1]);
      return rect;
    }

    return super.originalRect;
  }

  pointCollision(evt) {
    const bounding = this.attr('bounding');
    if(super.pointCollision(evt) || (bounding !== 'auto' && bounding !== 'box' && bounding !== 'path' && bounding !== 0)) {
      let {offsetX, offsetY} = evt;
      if(offsetX == null && offsetY == null) return true;

      const svg = this.svg;
      if(svg) {
        const bounds = svg.bounds;
        offsetX += Math.min(0, bounds[0]);
        offsetY += Math.min(0, bounds[1]);
      }
      evt.targetPaths = this.findPath(offsetX, offsetY);
      if(bounding !== 'box' && !(bounding === 'auto'
        && (this.attr('borderWidth') > 0 || this.attr('bgcolor') || this.attr('gradients').bgcolor))) {
        return evt.targetPaths.length > 0;
      }
      return true;
    }
    return false;
  }

  render(t, drawingContext) {
    super.render(t, drawingContext);
    const d = this.attr('d'),
      lineWidth = this.attr('lineWidth'),
      lineCap = this.attr('lineCap'),
      lineJoin = this.attr('lineJoin'),
      lineDash = this.attr('lineDash'),
      flexible = this.attr('flexible');

    if(d) {
      const svg = this.svg;
      let [ox, oy, ow, oh] = svg.bounds;
      let [px, py] = this.pathOffset;
      const [w, h] = this.contentSize;
      if((w < ow || h < oh) && this.attr('clipOverflow')) {
        drawingContext.beginPath();
        drawingContext.rect(0, 0, w, h);
        drawingContext.clip();
      }

      if(flexible) {
        svg.save();
        const sw = w / (ow - Math.min(0, ox) + 2 * px);
        svg.scale(sw, sw);
        ox *= sw;
        oy *= sw;
        px *= sw;
        py *= sw;
      }

      if(ox < 0 || oy < 0) {
        drawingContext.translate(-Math.min(0, ox), -Math.min(0, oy));
      }
      drawingContext.translate(px, py);

      svg.beginPath().to(drawingContext);

      if(flexible) {
        svg.restore();
      }

      drawingContext.lineWidth = lineWidth;
      drawingContext.lineCap = lineCap;
      drawingContext.lineJoin = lineJoin;

      if(lineDash != null) {
        drawingContext.setLineDash(lineDash);

        const lineDashOffset = this.attr('lineDashOffset');
        drawingContext.lineDashOffset = lineDashOffset;
      }

      const fillColor = findColor(drawingContext, this, 'fillColor');
      if(fillColor) {
        drawingContext.fillStyle = fillColor;
      }

      let strokeColor = findColor(drawingContext, this, 'strokeColor');

      if(!strokeColor && !fillColor) {
        strokeColor = parseColorString('black');
      }
      if(strokeColor) {
        drawingContext.strokeStyle = strokeColor;
      }

      if(fillColor) {
        drawingContext.fill();
      }
      if(strokeColor) {
        drawingContext.stroke();
      }
    }
  }
}
