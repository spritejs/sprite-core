import SvgPath from 'svg-path-to-canvas';
import {Matrix} from 'sprite-math';
import NodeAttr from './attr';
import {parseColorString, oneOrTwoValues, fourValuesShortCut, eightValuesShortCut,
  parseStringInt, parseStringFloat, parseStringTransform,
  parseValue, attr, relative, sortOrderedSprites, composit} from '../utils';

const cache = true,
  reflow = true,
  relayout = true;

function parseBorderValue(val) {
  if(val == null) {
    return null;
  }
  if(typeof val === 'number' || typeof val === 'string') {
    val = {
      width: parseFloat(val),
    };
  } else if(Array.isArray(val)) {
    val = {
      width: parseFloat(val[0]),
      color: parseColorString(val[1] || '#000'),
    };
  } else {
    val.width = parseFloat(val.width);
    val.color = parseColorString(val.color || '#000');
  }
  val = Object.assign({
    width: 1,
    color: parseColorString('#000'),
    style: 'solid',
  }, val);
  return val;
}

export default class SpriteAttr extends NodeAttr {
  constructor(subject) {
    super(subject);
    Object.defineProperty(this, '__reflowTag', {
      writable: true,
      value: false,
    });
  }

  clearFlow() {
    this.__reflowTag = true;
    return this;
  }

  set(key, value, isQuiet = false) {
    super.set(key, value, isQuiet);
    // auto reflow
    if(key === 'margin') {
      this.__reflowTag = true;
    }
  }

  merge(attrs) {
    if(typeof attrs === 'string') {
      attrs = JSON.parse(attrs);
    }
    Object.entries(attrs).forEach(([key, value]) => {
      if(key !== 'offsetPath'
        && key !== 'offsetDistance'
        && key !== 'offsetRotate'
        && key !== 'offsetAngle'
        && key !== 'offsetPoint') {
        // this[key] = value;
        this.subject.attr(key, value);
      } else if(key === 'offsetPath') {
        const offsetPath = new SvgPath(value);
        this.set('offsetPath', offsetPath.d);
        this.saveObj('offsetPath', offsetPath);
      } else {
        this.set(key, value);
      }
    });
    return this;
  }

  serialize() {
    const attrs = this.getAttributes();
    delete attrs.id;
    const offsetAngle = this.get('offsetAngle');
    if(offsetAngle != null) attrs.offsetAngle = offsetAngle;
    const offsetPoint = this.get('offsetPoint');
    if(offsetPoint != null) attrs.offsetPoint = offsetPoint;
    return JSON.stringify(attrs);
  }

  @attr
  enableCache = false;

  @parseValue(parseStringFloat, oneOrTwoValues)
  @attr({cache, relayout, reflow})
  anchor = [0, 0];

  @attr({reflow})
  display = '';

  @attr({cache})
  @relative('width')
  layoutX = 0;

  @attr({cache})
  @relative('height')
  layoutY = 0;

  @attr({cache})
  @relative('width')
  x = 0;

  @attr({cache})
  @relative('height')
  y = 0;

  @parseValue(parseStringInt)
  @attr
  @composit(['x', 'y'])
  pos;

  @parseValue(parseColorString)
  @attr
  bgcolor = '';

  @parseValue(parseFloat)
  @attr({cache})
  opacity = 1;

  @attr({reflow})
  @relative('width')
  width = '';

  @attr({reflow})
  @relative('height')
  height = '';

  @attr({reflow})
  @relative('width')
  layoutWidth = '';

  @attr({reflow})
  @relative('height')
  layoutHeight = '';

  @parseValue(parseStringInt)
  @attr
  @composit(['width', 'height'])
  size;

  @parseValue(parseInt)
  @attr({reflow})
  borderWidth = 0;

  @attr({reflow})
  borderColor = 'rgba(0,0,0,0)';

  @attr({reflow})
  borderStyle = 'solid';

  @parseValue(parseBorderValue)
  @attr
  @composit({width: 'borderWidth', color: 'borderColor', style: 'borderStyle'})
  border;

  @parseValue(parseFloat)
  @attr({reflow})
  paddingTop = 0;

  @parseValue(parseFloat)
  @attr({reflow})
  paddingRight = 0;

  @parseValue(parseFloat)
  @attr({reflow})
  paddingBottom = 0;

  @parseValue(parseFloat)
  @attr({reflow})
  paddingLeft = 0;

  @parseValue(parseStringInt, fourValuesShortCut)
  @attr
  @composit(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'])
  padding;

  @parseValue(parseStringFloat, eightValuesShortCut)
  @attr({reflow})
  borderRadius = '';

  @attr({reflow})
  boxSizing = 'content-box';

  @parseValue(parseFloat)
  @attr
  dashOffset = 0;

  // transform attributes
  @parseValue(parseStringTransform)
  @attr({cache, value: 'matrix(1,0,0,1,0,0)'})
  set transform(val) {
    /*
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      matrix: [1,0,0,1,0,0],
     */
    Object.assign(this.__attr, {
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
    });

    if(Array.isArray(val)) {
      this.transformMatrix = val;
      this.set('transform', `matrix(${val})`);
    } else {
      this.transformMatrix = [1, 0, 0, 1, 0, 0];
      const transformStr = [];

      Object.entries(val).forEach(([key, value]) => {
        if(key === 'matrix' && Array.isArray(value)) {
          this.transformMatrix = new Matrix(value).m;
        } else {
          this[key] = value;
        }
        transformStr.push(`${key}(${value})`);
      });

      this.set('transform', transformStr.join(' '));
    }
  }

  @parseValue(parseStringFloat)
  @attr({cache})
  transformOrigin = '';

  // TODO: inner attribute
  @attr({cache})
  transformMatrix = [1, 0, 0, 1, 0, 0];

  @parseValue(parseFloat)
  @attr({cache, value: 0})
  set rotate(val) {
    const delta = this.rotate - val;
    this.set('rotate', val);
    const transform = new Matrix(this.transformMatrix).rotate(-delta);
    this.transformMatrix = transform.m;
  }

  @parseValue(parseStringFloat, oneOrTwoValues)
  @attr({cache, value: [1, 1]})
  set scale(val) {
    val = oneOrTwoValues(val).map((v) => {
      if(Math.abs(v) > 0.001) {
        return v;
      }
      return 1 / v > 0 ? 0.001 : -0.001;
    });
    const oldVal = this.scale || [1, 1];
    const delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
    this.set('scale', val);

    const offsetAngle = this.get('offsetAngle');
    if(offsetAngle) {
      this.rotate -= offsetAngle;
    }

    const transform = new Matrix(this.transformMatrix);
    transform.scale(...delta);
    this.transformMatrix = transform.m;

    if(offsetAngle) {
      this.rotate += offsetAngle;
    }
  }

  @attr({cache, value: [0, 0]})
  set translate(val) {
    const oldVal = this.translate || [0, 0];
    const delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
    this.set('translate', val);
    const transform = new Matrix(this.transformMatrix);
    transform.translate(...delta);
    this.transformMatrix = transform.m;
  }

  @attr({cache, value: [0, 0]})
  set skew(val) {
    const oldVal = this.skew || [0, 0];
    const invm = new Matrix().skew(...oldVal).inverse();
    this.set('skew', val);
    const transform = new Matrix(this.transformMatrix);
    transform.multiply(invm).skew(...val);
    this.transformMatrix = transform.m;
  }

  @parseValue(parseInt)
  @attr({cache, value: 0})
  set zIndex(val) {
    this.set('zIndex', val);
    const subject = this.subject;
    if(subject.parent) {
      subject.parent.sortedChildNodes = sortOrderedSprites(subject.parent.childNodes);
    }
  }

  /**
    linearGradients : {
      bgcolor: {
        direction: 30,  //angle，[0,360)
        rect: [x, y, w, h],
        vector: [x1, y1, x2, y2], // direction/rect or from/to
        colors: [
          {offset: 0, color: 'red'},
          {offset: 1, color: 'black'}
        ]
      }
    }
   */
  @attr
  set linearGradients(val) /* istanbul ignore next  */ {
    this.gradients = val;
  }

  get linearGradients() {
    return this.gradients;
  }

  /**
    gradients : {
      bgcolor: {
        direction: 30,  //angle，[0,360)
        rect: [x, y, w, h],  // rect + direction or vector
        vector: [x1, y1, r1, x2, y2, r2], // vector.length -> linear or radial
        colors: [
          {offset: 0, color: 'red'},
          {offset: 1, color: 'black'}
        ]
      }
    }
   */
  @attr
  gradients = {};

  resetOffset() {
    let offsetPath = this.offsetPath;
    const dis = this.offsetDistance;

    if(offsetPath) {
      const pathObj = this.loadObj('offsetPath');
      if(pathObj) {
        offsetPath = pathObj;
      } else {
        offsetPath = new SvgPath(offsetPath);
        this.saveObj('offsetPath', offsetPath);
      }
    }

    if(offsetPath != null) {
      let len = dis * offsetPath.getTotalLength();
      const [x, y] = offsetPath.getPointAtLength(len);

      let angle = this.offsetRotate;

      if(angle === 'auto' || angle === 'reverse') {
        if(angle === 'reverse' && len === 0) {
          len = 1;
        }
        const [x1, y1] = offsetPath.getPointAtLength(angle === 'auto' ? len + 1 : len - 1);

        if(x1 === x && y1 === y) { // last point
          angle = this.get('offsetAngle');
        } else {
          angle = 180 * Math.atan2(y1 - y, x1 - x) / Math.PI;
        }

        if(this.offsetRotate === 'reverse') {
          angle = -angle;
        }
      }

      const offsetAngle = this.get('offsetAngle');

      if(offsetAngle) {
        this.rotate -= offsetAngle;
      }

      this.set('offsetAngle', angle);
      this.rotate += angle;

      const offsetPoint = this.get('offsetPoint');
      if(offsetPoint) {
        this.pos = [this.x - offsetPoint[0], this.y - offsetPoint[1]];
      }

      this.set('offsetPoint', [x, y]);
      this.pos = [this.x + x, this.y + y];
    }
  }

  @attr({cache})
  set offsetPath(val) {
    const offsetPath = new SvgPath(val);

    this.set('offsetPath', offsetPath.d);
    this.saveObj('offsetPath', offsetPath);
    this.resetOffset();
  }

  @parseValue(parseFloat)
  @attr({cache, value: 0})
  set offsetDistance(val) {
    this.set('offsetDistance', val);
    this.resetOffset();
  }

  @attr({cache, value: 'auto'})
  set offsetRotate(val) {
    if(typeof val === 'string' && val !== 'auto' && val !== 'reverse') {
      val = parseFloat(val);
    }
    this.set('offsetRotate', val);
    this.resetOffset();
  }

  @attr({cache})
  filter = '';

  @attr({cache})
  shadow = '';

  @attr({cache, relayout})
  position = '';

  @parseValue(parseFloat)
  @attr({reflow, relayout, cache})
  marginTop = 0;

  @parseValue(parseFloat)
  @attr({reflow, relayout, cache})
  marginRight = 0;

  @parseValue(parseFloat)
  @attr({reflow, relayout, cache})
  marginBottom = 0;

  @parseValue(parseFloat)
  @attr({reflow, relayout, cache})
  marginLeft = 0;

  @parseValue(parseStringInt, fourValuesShortCut)
  @attr
  @composit(['marginTop', 'marginRight', 'marginBottom', 'marginLeft'])
  margin;

  /*
    {
      src: image | url,
      display: 'none' | 'repeatX' | 'repeatY' | 'repeat' | 'stretch' | 'center' | '.9',
      offset: [x, y],
      clip9: [paddingTop, paddingRight, paddingBottom, paddingLeft],
    }
  */
  @attr({value: ''})
  set bgimage(val) {
    if(val && val.clip9) val.clip9 = fourValuesShortCut(val.clip9);
    if(val && !val.image && this.subject.loadBgImage) {
      val = this.subject.loadBgImage(val);
    }
    this.set('bgimage', val);
  }

  @attr
  clipOverflow = true;
}