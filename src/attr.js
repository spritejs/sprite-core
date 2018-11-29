import {Matrix} from 'sprite-math';
import SvgPath from 'svg-path-to-canvas';
import {parseColorString, oneOrTwoValues, fourValuesShortCut,
  parseStringInt, parseStringFloat, parseStringTransform,
  parseValue, attr, deprecate, relative, cachable, sortOrderedSprites} from './utils';
import stylesheet from './stylesheet';

const _attr = Symbol('attr'),
  _style = Symbol('style'),
  _temp = Symbol('store'),
  _subject = Symbol('subject'),
  _default = Symbol('default');

class SpriteAttr {
  constructor(subject) {
    this[_subject] = subject;
    this[_default] = {};
    this[_attr] = {};
    this[_style] = {};

    this[_temp] = new Map(); // save non-serialized values

    Object.defineProperty(this, '__attributesSet', {
      value: new Set(),
    });
    Object.defineProperty(this, '__styleTag', {
      writable: true,
      value: false,
    });
    Object.defineProperty(this, '__updateTag', {
      writable: true,
      value: false,
    });
    Object.defineProperty(this, '__reflowTag', {
      writable: true,
      value: false,
    });

    this.setDefault({
      state: 'default',
      states: {},
      actions: {
        'beforeEnter:': {
          duration: 300,
          easing: 'ease-in',
        },
        'beforeExit:': {
          duration: 300,
          easing: 'ease-out',
        },
        'hide:': {
          duration: 300,
          easing: 'ease-in',
        },
        ':hide': {
          duration: 300,
          easing: 'ease-out',
        },
        'hide:beforeShow': 'none',
        'beforeShow:': {
          duration: 300,
          easing: 'ease-in',
        },
      },
      enterMode: 'normal',
      exitMode: 'normal',
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
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
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
    });
  }

  setDefault(attrs) {
    Object.assign(this[_default], attrs);
    Object.assign(this[_attr], attrs);
  }

  saveObj(key, val) {
    this[_temp].set(key, val);
    this.__updateTag = true;
  }

  loadObj(key) {
    return this[_temp].get(key);
  }

  quietSet(key, val) {
    if(!this.__styleTag && val != null) {
      this.__attributesSet.add(key);
    }
    if(!this.__styleTag && val == null) {
      val = this[_default][key];
      if(this.__attributesSet.has(key)) {
        this.__attributesSet.delete(key);
      }
    }
    const oldVal = this[_attr][key];
    this[_attr][key] = val;
    if(oldVal !== val && stylesheet.relatedAttributes.has(key)) {
      this.subject.updateStyles();
    }
  }

  clearStyle() {
    this[_style] = {};
  }

  get style() {
    return this[_style];
  }

  set(key, val) {
    if(!this.__styleTag && val != null) {
      this.__attributesSet.add(key);
    }
    if(!this.__styleTag && val == null) {
      val = this[_default][key];
      if(this.__attributesSet.has(key)) {
        this.__attributesSet.delete(key);
      }
    }
    if(this.__styleTag) {
      if(val != null) {
        this[_style][key] = val;
      } else {
        delete this[_style][key];
      }
    }
    const oldVal = this[_attr][key];
    if(typeof val === 'object') {
      if(oldVal !== val && JSON.stringify(val) === JSON.stringify(oldVal)) {
        return;
      }
    } else if(oldVal === val) {
      return;
    }
    if(!this.__styleTag) {
      this[_attr][key] = val;
      if(stylesheet.relatedAttributes.has(key)) {
        this.subject.updateStyles();
      }
    }
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
      || key === 'flexBasis'
      || key === 'flex') {
      this.__reflowTag = true;
    }
  }

  get(key) {
    if(this.__getStyleTag || this[_style][key] != null && !this.__attributesSet.has(key)) {
      return this[_style][key];
    }
    return this[_attr][key];
  }

  get attrs() {
    const ret = {};
    [...this.__attributeNames].forEach((key) => {
      ret[key] = this[key];
    });
    [...this.__attributesSet].forEach((key) => {
      ret[key] = this[key];
    });
    Object.entries(this).forEach(([key, value]) => {
      if(key.indexOf('__') !== 0) {
        ret[key] = value;
      }
    });
    return ret;
  }

  @deprecate('You can remove this call.')
  clearCache() {
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
    const ret = {};
    [...this.__attributesSet].forEach((key) => {
      if(key !== 'id') {
        ret[key] = this[key];
      }
    });
    Object.entries(this).forEach(([key, value]) => {
      if(key.indexOf('__') !== 0) {
        ret[key] = value;
      }
    });
    const offsetAngle = this.get('offsetAngle');
    if(offsetAngle != null) ret.offsetAngle = offsetAngle;
    const offsetPoint = this.get('offsetPoint');
    if(offsetPoint != null) ret.offsetPoint = offsetPoint;
    return JSON.stringify(ret);
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

  @attr
  set class(val) {
    return this.quietSet('class', String(val));
  }

  @attr
  set enableCache(val) {
    return this.set('enableCache', val);
  }

  @parseValue(parseStringFloat, oneOrTwoValues)
  @attr
  @cachable
  set anchor(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('anchor', val);
  }

  @attr
  set display(val) {
    this.set('display', val);
  }

  @attr
  @relative('width')
  @cachable
  set layoutX(val) {
    this.set('layoutX', val);
  }

  @attr
  @relative('height')
  @cachable
  set layoutY(val) {
    this.set('layoutY', val);
  }

  @attr
  @relative('width')
  @cachable
  set x(val) {
    this.set('x', val);
  }

  @attr
  @relative('height')
  @cachable
  set y(val) {
    this.set('y', val);
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

  get pos() {
    return [this.x, this.y];
  }

  @parseValue(parseColorString)
  @attr
  set bgcolor(val) {
    this.set('bgcolor', val);
  }

  @parseValue(parseFloat)
  @attr
  @cachable
  set opacity(val) {
    this.set('opacity', val);
  }

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
    if(val == null) val = 0;
    const margin = this.get('padding');
    margin[0] = val;
    this.set('padding', margin);
  }

  get paddingTop() {
    return this.get('margin')[0];
  }

  @parseValue(parseFloat)
  @attr
  set paddingRight(val) {
    if(val == null) val = 0;
    const margin = this.get('padding');
    margin[1] = val;
    this.set('padding', margin);
  }

  get paddingRight() {
    return this.get('margin')[1];
  }


  @parseValue(parseFloat)
  @attr
  set paddingBottom(val) {
    if(val == null) val = 0;
    const margin = this.get('padding');
    margin[2] = val;
    this.set('padding', margin);
  }

  get paddingBottom() {
    return this.get('margin')[2];
  }


  @parseValue(parseFloat)
  @attr
  set paddingLeft(val) {
    if(val == null) val = 0;
    const margin = this.get('padding');
    margin[3] = val;
    this.set('padding', margin);
  }

  get paddingLeft() {
    return this.get('margin')[3];
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

  @parseValue(parseFloat)
  @attr
  set flexGrow(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('flexGrow', val);
  }

  @parseValue(parseFloat)
  @attr
  set flexShrink(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('flexShrink', val);
  }

  @attr
  set flexBasis(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    if(val && val !== 'auto') {
      val = parseFloat(val);
    }
    this.set('flexBasis', val);
  }

  @attr
  set flex(val) {
    if(val != null && val !== 'initial') {
      if(val === 'auto') {
        this.flexGrow = 1;
        this.flexShrink = 1;
        this.flexBasis = 'auto';
      } else if(val === 'none') {
        this.flexGrow = 0;
        this.flexShrink = 0;
        this.flexBasis = 'auto';
      } else if(typeof val === 'string') {
        const values = val.trim().split(/\s+/);
        this.flexGrow = values[0];
        this.flexShrink = values[1];
        this.flexBasis = values[2];
      } else {
        this.flexGrow = val;
        this.flexShrink = 1;
        this.flexBasis = 'auto';
      }
    } else {
      this.flexGrow = 0;
      this.flexShrink = 1;
      this.flexBasis = 'auto';
    }
  }

  get flex() {
    return `${this.flexGrow} ${this.flexShrink} ${this.flexBasis}`;
  }

  @parseValue(parseInt)
  @attr
  @cachable
  set order(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('order', val);
  }

  @attr
  @cachable
  set position(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('position', val);
  }

  @attr
  @cachable
  set alignSelf(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('alignSelf', val);
  }

  @parseValue(parseStringInt, fourValuesShortCut)
  @attr
  @cachable
  set margin(val) {
    if(this.subject.hasLayout) this.subject.parent.clearLayout();
    this.set('margin', val);
  }

  @parseValue(parseFloat)
  @attr
  set marginTop(val) {
    if(val == null) val = 0;
    const margin = this.get('margin');
    margin[0] = val;
    this.set('margin', margin);
  }

  get marginTop() {
    return this.get('margin')[0];
  }

  @parseValue(parseFloat)
  @attr
  set marginRight(val) {
    if(val == null) val = 0;
    const margin = this.get('margin');
    margin[1] = val;
    this.set('margin', margin);
  }

  get marginRight() {
    return this.get('margin')[1];
  }

  @parseValue(parseFloat)
  @attr
  set marginBottom(val) {
    if(val == null) val = 0;
    const margin = this.get('margin');
    margin[2] = val;
    this.set('margin', margin);
  }

  get marginBottom() {
    return this.get('margin')[2];
  }

  @parseValue(parseFloat)
  @attr
  set marginLeft(val) {
    if(val == null) val = 0;
    const margin = this.get('margin');
    margin[3] = val;
    this.set('margin', margin);
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
  set states(val) {
    val = Object.assign({}, val);
    const states = this.get('states');
    // recover __default
    Object.entries(states).forEach(([key, value]) => {
      if(value.__default && !(key in val)) {
        val[key] = value;
      }
    });
    this.quietSet('states', val);
  }

  @attr
  set actions(val) {
    if(Array.isArray(val)) {
      const value = {};
      val.forEach((v) => {
        let key;
        let action = v.action;
        if(!action) {
          action = Object.assign({}, v);
          delete action.from;
          delete action.to;
          delete action.both;
        }
        if(v.both) {
          if(!Array.isArray(v.both)) {
            v.both = [v.both];
          }
          if(v.both.length > 1) {
            key = v.both.join(':');
            value[key] = Object.assign({}, action);
            key = v.both.reverse().join(':');
            value[key] = Object.assign({}, action);
          } else {
            value[`${v.both[0]}:`] = Object.assign({}, action);
            value[`:${v.both[0]}`] = Object.assign({}, action);
          }
        } else {
          key = `${v.from || ''}:${v.to || ''}`;
          value[key] = Object.assign({}, action);
        }
      });
      val = value;
    }
    const defaultVal = this[_default].actions;
    val = Object.assign({}, defaultVal, val);
    this.quietSet('actions', val);
  }

  @attr
  set state(val) {
    if(val == null) val = 'default';
    const oldState = this.state;
    if(oldState !== val) {
      this.quietSet('state', val);
      const states = this.states;

      let action = null;
      const toState = states[val] || {};
      const subject = this.subject;
      if(!subject.__ignoreAction && subject.layer) {
        const fromState = states[oldState],
          actions = this.actions;
        action = actions[`${oldState}:${val}`] || actions[`:${val}`] || actions[`${oldState}:`];
        if(!action || action === 'none') action = {duration: 0};

        const animation = subject.changeState(fromState, toState, action);
        const tag = Symbol('tag');
        animation.tag = tag;
        if(animation.__reversed) {
          subject.dispatchEvent(`state-to-${oldState}`, {
            from: val,
            to: oldState,
            action: animation.__reversed,
            cancelled: true,
            animation}, true, true);
        }
        subject.dispatchEvent(`state-from-${oldState}`, {from: oldState, to: val, action, animation}, true, true);
        animation.finished.then(() => {
          if(animation.tag === tag) {
            subject.dispatchEvent(`state-to-${val}`, {from: oldState, to: val, action, animation}, true, true);
          }
        });
        if(oldState === 'afterExit') {
          animation.finish();
        }
      } else {
        subject.dispatchEvent(`state-from-${oldState}`, {from: oldState, to: val}, true, true);
        if(toState) subject.attr(toState);
        subject.dispatchEvent(`state-to-${val}`, {from: oldState, to: val}, true, true);
      }
    }
  }

  @attr
  set enterMode(val) {
    this.set('enterMode', val);
  }

  @attr
  set exitMode(val) {
    this.set('exitMode', val);
  }
}

export default SpriteAttr;
