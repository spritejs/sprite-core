import SvgPath from 'svg-path-to-canvas';
import {Matrix} from 'sprite-math';
import NodeAttr from './attr';
import {parseColorString, oneOrTwoValues, fourValuesShortCut,
  parseStringInt, parseStringFloat, parseStringTransform,
  parseValue, attr, relative, cachable, sortOrderedSprites} from './utils';

export default class SpriteAttr extends NodeAttr {
  constructor(subject) {
    super(subject);
    this.setDefault({
      anchor: [0, 0],
      enableCache: false,
      x: 0,
      y: 0,
      opacity: 1,
      width: '',
      height: '',
      layoutX: 0,
      layoutY: 0,
      layoutWidth: '',
      layoutHeight: '',
      bgcolor: '',
      position: '',
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      transform: 'matrix(1,0,0,1,0,0)',
      transformOrigin: '',
      transformMatrix: [1, 0, 0, 1, 0, 0],
      border: {
        width: 0,
        color: 'rgba(0,0,0,0)',
        style: 'solid',
      },
      // border: [0, 'rgba(0,0,0,0)'],
      borderRadius: 0,
      boxSizing: 'content-box',
      dashOffset: 0,
      display: '',
      padding: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
      zIndex: 0,
      offsetRotate: 'auto',
      gradients: {},
      offsetDistance: 0,
      filter: '', // filter: {blur, ...}
      shadow: '', // shadow: {color = 'rgba(0,0,0,1)', blur = 1[, offset]}
      bgimage: '',
      clipOverflow: true,
    });
    Object.defineProperty(this, '__reflowTag', {
      writable: true,
      value: false,
    });
  }

  set(key, value, isQuiet = false) {
    super.set(key, value, isQuiet);
    // auto reflow
    if(key === 'width' || key === 'height'
      || key === 'layoutWidth' || key === 'layoutHeight'
      || key === 'display'
      || key === 'anchor'
      || key === 'border'
      || key === 'padding'
      || key === 'boxSizing'
      || key === 'margin') {
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

  @attr({share: true})
  enableCache = false;

  @parseValue(parseStringFloat, oneOrTwoValues)
  @attr({cache: true, share: true, relayout: true})
  anchor = [0, 0];

  @attr
  display = '';

  @attr({cache: true})
  @relative('width')
  layoutX = 0;

  @attr({cache: true})
  @relative('height')
  layoutY = 0;

  @attr({cache: true})
  @relative('width')
  x = 0;

  @attr({cache: true})
  @relative('height')
  y = 0;

  @parseValue(parseStringInt)
  @attr
  set pos(val) {
    if(val == null) {
      val = [0, 0];
    }
    const [x, y] = val;
    this.x = x;
    this.y = y;
  }

  get pos() {
    return [this.x, this.y];
  }

  @parseValue(parseColorString)
  @attr
  bgcolor = '';

  @parseValue(parseFloat)
  @attr({cache: true})
  opacity = 1;

  @attr
  @relative('width')
  set width(val) {
    this.set('width', val);
  }

  @attr
  @relative('height')
  set height(val) {
    this.set('height', val);
  }

  @attr
  @relative('width')
  set layoutWidth(val) {
    this.set('layoutWidth', val);
  }

  @attr
  @relative('height')
  set layoutHeight(val) {
    this.set('layoutHeight', val);
  }

  @parseValue(parseStringInt)
  @attr
  set size(val) {
    if(val == null) {
      val = ['', ''];
    }
    const [width, height] = val;
    this.width = width;
    this.height = height;
  }

  get size() {
    return [this.width, this.height];
  }

  @attr
  set border(val) {
    if(val == null) {
      this.set('border', null);
      return;
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
    this.set('border', val);
  }

  @parseValue(parseStringInt, fourValuesShortCut)
  @attr
  set padding(val) {
    this.set('padding', val);
  }

  @parseValue(parseFloat)
  @attr
  set paddingTop(val) {
    this.setAttrIndex('padding', val, 0);
  }

  get paddingTop() {
    return this.get('padding')[0];
  }

  @parseValue(parseFloat)
  @attr
  set paddingRight(val) {
    this.setAttrIndex('padding', val, 1);
  }

  get paddingRight() {
    return this.get('padding')[1];
  }


  @parseValue(parseFloat)
  @attr
  set paddingBottom(val) {
    this.setAttrIndex('padding', val, 2);
  }

  get paddingBottom() {
    return this.get('padding')[2];
  }


  @parseValue(parseFloat)
  @attr
  set paddingLeft(val) {
    this.setAttrIndex('padding', val, 3);
  }

  get paddingLeft() {
    return this.get('padding')[3];
  }

  @parseValue(parseFloat)
  @attr
  set borderRadius(val) {
    this.set('borderRadius', val);
  }

  @attr
  set boxSizing(val) {
    this.set('boxSizing', val);
  }

  @parseValue(parseFloat)
  @attr
  set dashOffset(val) {
    this.set('dashOffset', val);
  }

  // transform attributes
  @parseValue(parseStringTransform)
  @attr
  @cachable
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
      this.set('transformMatrix', val);
      this.set('transform', `matrix(${val})`);
    } else {
      this.set('transformMatrix', [1, 0, 0, 1, 0, 0]);
      const transformStr = [];

      Object.entries(val).forEach(([key, value]) => {
        if(key === 'matrix' && Array.isArray(value)) {
          this.set('transformMatrix', new Matrix(value).m);
        } else {
          this[key] = value;
        }
        transformStr.push(`${key}(${value})`);
      });

      this.set('transform', transformStr.join(' '));
    }
  }

  @parseValue(parseStringFloat)
  @attr
  @cachable
  set transformOrigin(val) {
    this.set('transformOrigin', val);
  }

  @parseValue(parseFloat)
  @attr
  @cachable
  set rotate(val) {
    const delta = this.get('rotate') - val;
    this.set('rotate', val);
    const transform = new Matrix(this.get('transformMatrix')).rotate(-delta);
    this.set('transformMatrix', transform.m);
  }

  @parseValue(parseStringFloat, oneOrTwoValues)
  @attr
  @cachable
  set scale(val) {
    val = oneOrTwoValues(val).map((v) => {
      if(Math.abs(v) > 0.001) {
        return v;
      }
      return 1 / v > 0 ? 0.001 : -0.001;
    });
    const oldVal = this.get('scale') || [1, 1];
    const delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
    this.set('scale', val);

    const offsetAngle = this.get('offsetAngle');
    if(offsetAngle) {
      this.rotate -= offsetAngle;
    }

    const transform = new Matrix(this.get('transformMatrix'));
    transform.scale(...delta);
    this.set('transformMatrix', transform.m);

    if(offsetAngle) {
      this.rotate += offsetAngle;
    }
  }

  @attr
  @cachable
  set translate(val) {
    const oldVal = this.get('translate') || [0, 0];
    const delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
    this.set('translate', val);
    const transform = new Matrix(this.get('transformMatrix'));
    transform.translate(...delta);
    this.set('transformMatrix', transform.m);
  }

  @attr
  @cachable
  set skew(val) {
    const oldVal = this.get('skew') || [0, 0];
    const invm = new Matrix().skew(...oldVal).inverse();
    this.set('skew', val);
    const transform = new Matrix(this.get('transformMatrix'));
    transform.multiply(invm).skew(...val);
    this.set('transformMatrix', transform.m);
  }

  @parseValue(parseInt)
  @attr
  @cachable
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
  set gradients(val) {
    this.set('gradients', val);
  }

  resetOffset() {
    let offsetPath = this.get('offsetPath');
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

  @attr
  @cachable
  set offsetPath(val) {
    const offsetPath = new SvgPath(val);

    this.set('offsetPath', offsetPath.d);
    this.saveObj('offsetPath', offsetPath);
    this.resetOffset();
  }

  @parseValue(parseFloat)
  @attr
  @cachable
  set offsetDistance(val) {
    this.set('offsetDistance', val);
    this.resetOffset();
  }

  @attr
  @cachable
  set offsetRotate(val) {
    if(typeof val === 'string' && val !== 'auto' && val !== 'reverse') {
      val = parseFloat(val);
    }
    this.set('offsetRotate', val);
    this.resetOffset();
  }

  @attr
  @cachable
  set filter(val) {
    this.set('filter', val);
  }

  @attr
  @cachable
  set shadow(val) {
    this.set('shadow', val);
  }

  @attr
  @cachable
  set position(val) {
    this.clearLayout();
    this.set('position', val);
  }

  @parseValue(parseStringInt, fourValuesShortCut)
  @attr
  @cachable
  set margin(val) {
    this.clearLayout();
    this.set('margin', val);
  }

  @parseValue(parseFloat)
  @attr
  set marginTop(val) {
    this.setAttrIndex('margin', val, 0);
  }

  get marginTop() {
    return this.get('margin')[0];
  }

  @parseValue(parseFloat)
  @attr
  set marginRight(val) {
    this.setAttrIndex('margin', val, 1);
  }

  get marginRight() {
    return this.get('margin')[1];
  }

  @parseValue(parseFloat)
  @attr
  set marginBottom(val) {
    this.setAttrIndex('margin', val, 2);
  }

  get marginBottom() {
    return this.get('margin')[2];
  }

  @parseValue(parseFloat)
  @attr
  set marginLeft(val) {
    this.setAttrIndex('margin', val, 3);
  }

  get marginLeft() {
    return this.get('margin')[3];
  }

  /*
    {
      src: image | url,
      display: 'none' | 'repeatX' | 'repeatY' | 'repeat' | 'stretch' | 'center' | '.9',
      offset: [x, y],
      clip9: [paddingTop, paddingRight, paddingBottom, paddingLeft],
    }
  */
  @attr
  set bgimage(val) {
    if(val && val.clip9) val.clip9 = fourValuesShortCut(val.clip9);
    if(val && !val.image && this.subject.loadBgImage) {
      val = this.subject.loadBgImage(val);
    }
    this.set('bgimage', val);
  }

  @attr
  set clipOverflow(val) {
    this.set('clipOverflow', !!val);
  }
}