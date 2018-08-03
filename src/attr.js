import {Matrix} from 'sprite-math';
import {parseColorString, oneOrTwoValues, fourValuesShortCut,
  parseStringInt, parseStringFloat, parseStringTransform, parseValue, attr, deprecate} from 'sprite-utils';
import SvgPath from 'svg-path-to-canvas';

const _attr = Symbol('attr'),
  _temp = Symbol('store'),
  _subject = Symbol('subject'),
  _default = Symbol('default'),
  _props = Symbol('props');

class SpriteAttr {
  constructor(subject) {
    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this[_props] = {};

    this.setDefault({
      anchor: [0, 0],
      x: 0,
      y: 0,
      opacity: 1,
      width: '',
      height: '',
      layoutWidth: '',
      layoutHeight: '',
      bgcolor: '',
      flex: '',
      order: 0,
      position: '',
      alignSelf: '',
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
    }, {
      pos() {
        return [this.x, this.y];
      },
      size() {
        return [this.width, this.height];
      },
      linearGradients() {
        /* istanbul ignore next  */
        return this.gradients;
      },
    });
    this[_temp] = new Map(); // save non-serialized values
  }

  setDefault(attrs, props = {}) {
    Object.assign(this[_default], attrs);
    Object.assign(this[_attr], attrs);
    const _p = {};
    Object.entries(props).forEach(([prop, getter]) => {
      _p[prop] = {
        get: getter.bind(this),
      };
    });
    Object.defineProperties(this[_attr], _p);
    Object.assign(this[_props], _p);
  }

  saveObj(key, val) {
    this[_temp].set(key, val);
    this.__updateTag = true;
  }

  loadObj(key) {
    return this[_temp].get(key);
  }

  quietSet(key, val) {
    this[_attr][key] = val;
  }

  set(key, val) {
    if(val == null) {
      val = this[_default][key];
    }
    if(typeof val === 'object') {
      const oldVal = this[_attr][key];
      if(oldVal !== val && JSON.stringify(val) === JSON.stringify(oldVal)) {
        return;
      }
    }
    this[_attr][key] = val;
    this.__updateTag = true;
    // auto reflow
    if(key === 'width' || key === 'height'
      || key === 'layoutWidth' || key === 'layoutHeight'
      || key === 'display'
      || key === 'anchor'
      || key === 'border'
      || key === 'padding'
      || key === 'boxSizing'
      || key === 'margin'
      || key === 'flex') {
      this.__reflowTag = true;
    }
  }

  get(key) {
    return this[_attr][key];
  }

  get attrs() {
    const ret = {};
    this.__attributeNames.forEach((key) => {
      if(key in this[_props]) {
        Object.defineProperty(ret, key, this[_props][key]);
      } else if(key !== 'x' && key !== 'y' && key !== 'width' && key !== 'height') {
        ret[key] = this[key];
      } else {
        ret[key] = this.get(key);
      }
    });
    return ret;
  }

  clearCache() {
    this.__clearCacheTag = true;
    return this;
  }

  clearFlow() {
    this.__reflowTag = true;
    return this;
  }

  merge(attrs) {
    if(typeof attrs === 'string') {
      attrs = JSON.parse(attrs);
    }
    Object.entries(attrs).forEach(([key, value]) => {
      if(this[_default][key] !== value) {
        if(key !== 'offsetPath'
          && key !== 'offsetDistance'
          && key !== 'offsetRotate'
          && key !== 'offsetAngle'
          && key !== 'offsetPoint') {
          this[key] = value;
        } else if(key === 'offsetPath') {
          const offsetPath = new SvgPath(value);
          this.set('offsetPath', offsetPath.d);
          this.saveObj('offsetPath', offsetPath);
        } else {
          this.set(key, value);
        }
      }
    });

    return this;
  }

  serialize() {
    const attrs = this.attrs;
    delete attrs.id;
    const offsetAngle = this.get('offsetAngle');
    if(offsetAngle != null) attrs.offsetAngle = offsetAngle;
    const offsetPoint = this.get('offsetPoint');
    if(offsetPoint != null) attrs.offsetPoint = offsetPoint;
    return JSON.stringify(attrs);
  }

  get subject() {
    return this[_subject];
  }

  /* ------------------- define attributes ----------------------- */
  @attr
  set id(val) {
    return this.quietSet('id', String(val));
  }

  @attr
  set name(val) {
    return this.quietSet('name', String(val));
  }

  @parseValue(parseStringFloat, oneOrTwoValues)
  @attr
  set anchor(val) {
    this.set('anchor', val);
  }

  @attr
  set display(val) {
    this.clearCache();
    this.set('display', val);
  }

  @parseValue(parseFloat)
  @attr
  set x(val) {
    if(this.subject.hasLayout) {
      this.set('layoutX', val);
    } else {
      this.set('x', val);
    }
  }

  get x() {
    if(this.subject.hasLayout) {
      const layoutX = this.get('layoutX');
      return layoutX !== '' ? layoutX : this.get('x');
    }
    return this.get('x');
  }

  @parseValue(parseFloat)
  @attr
  set y(val) {
    if(this.subject.hasLayout) {
      this.set('layoutY', val);
    } else {
      this.set('y', val);
    }
  }

  get y() {
    if(this.subject.hasLayout) {
      const layoutY = this.get('layoutY');
      return layoutY !== '' ? layoutY : this.get('y');
    }
    return this.get('y');
  }

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

  @parseValue(parseColorString)
  @attr
  set bgcolor(val) {
    this.clearCache();
    this.set('bgcolor', val);
  }

  @attr
  set opacity(val) {
    this.set('opacity', val);
  }

  @parseValue((val) => { return val ? parseFloat(val) : val })
  @attr
  set width(val) {
    this.clearCache();
    this.set('width', val);
  }

  @parseValue((val) => { return val ? parseFloat(val) : val })
  @attr
  set height(val) {
    this.clearCache();
    this.set('height', val);
  }

  @parseValue((val) => { return val ? parseFloat(val) : val })
  @attr
  set layoutWidth(val) {
    this.clearCache();
    this.set('layoutWidth', val);
  }

  @parseValue((val) => { return val ? parseFloat(val) : val })
  @attr
  set layoutHeight(val) {
    this.clearCache();
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

  @attr
  set border(val) {
    this.clearCache();
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
    this.clearCache();
    this.set('padding', val);
  }

  @parseValue(parseFloat)
  @attr
  set borderRadius(val) {
    this.clearCache();
    this.set('borderRadius', val);
  }

  @attr
  set boxSizing(val) {
    this.clearCache();
    this.set('boxSizing', val);
  }

  @parseValue(parseFloat)
  @attr
  set dashOffset(val) {
    this.clearCache();
    this.set('dashOffset', val);
  }

  // transform attributes
  @parseValue(parseStringTransform)
  @attr
  set transform(val) {
    /*
      rotate: 0,
      scale: [1, 1],
      translate: [0, 0],
      skew: [0, 0],
      matrix: [1,0,0,1,0,0],
     */
    Object.assign(this[_attr], {
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

  @attr
  set transformOrigin(val) {
    this.set('transformOrigin', val);
  }

  @parseValue(parseFloat)
  @attr
  set rotate(val) {
    const delta = this.get('rotate') - val;
    this.set('rotate', val);
    const transform = new Matrix(this.get('transformMatrix')).rotate(-delta);
    this.set('transformMatrix', transform.m);
  }

  @parseValue(parseStringFloat, oneOrTwoValues)
  @attr
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
  set translate(val) {
    const oldVal = this.get('translate') || [0, 0];
    const delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
    this.set('translate', val);
    const transform = new Matrix(this.get('transformMatrix'));
    transform.translate(...delta);
    this.set('transformMatrix', transform.m);
  }

  @attr
  set skew(val) {
    const oldVal = this.get('skew') || [0, 0];
    const invm = new Matrix().skew(...oldVal).inverse();
    this.set('skew', val);
    const transform = new Matrix(this.get('transformMatrix'));
    transform.multiply(invm).skew(...val);
    this.set('transformMatrix', transform.m);
  }

  @attr
  set zIndex(val) {
    this.set('zIndex', val);
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
  @deprecate('Instead use attr.gradients.')
  @attr
  set linearGradients(val) /* istanbul ignore next  */ {
    this.gradients = val;
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
    this.clearCache();
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
  set offsetPath(val) {
    const offsetPath = new SvgPath(val);

    this.set('offsetPath', offsetPath.d);
    this.saveObj('offsetPath', offsetPath);
    this.resetOffset();
  }

  @parseValue(parseFloat)
  @attr
  set offsetDistance(val) {
    this.set('offsetDistance', val);
    this.resetOffset();
  }

  @attr
  set offsetRotate(val) {
    if(typeof val === 'string' && val !== 'auto' && val !== 'reverse') {
      val = parseFloat(val);
    }
    this.set('offsetRotate', val);
    this.resetOffset();
  }

  @attr
  set filter(val) {
    this.set('filter', val);
  }

  @attr
  set shadow(val) {
    this.set('shadow', val);
  }

  @parseValue(parseFloat)
  @attr
  set flex(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('flex', val);
  }

  @attr
  set order(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('order', val);
  }

  @attr
  set position(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('position', val);
  }

  @attr
  set alignSelf(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('alignSelf', val);
  }

  @attr
  set margin(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('margin', val);
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
    this.clearCache();
    if(val && val.clip9) val.clip9 = fourValuesShortCut(val.clip9);
    if(val && !val.image && this.subject.loadBgImage) {
      val = this.subject.loadBgImage(val);
    }
    this.set('bgimage', val);
  }
}

export default SpriteAttr;
