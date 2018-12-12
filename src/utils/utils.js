const colorString = require('color-string');

class Color {
  constructor(color) {
    if(typeof color === 'string') {
      const {model, value} = colorString.get(color || 'rgba(0,0,0,1)');
      this.model = model;
      this.value = value;
    } else {
      this.model = color.model;
      this.value = color.value;
    }
  }

  toString() {
    const [a, b, c, d] = this.value;
    const model = this.model;

    if(model === 'rgb') {
      return `${model}a(${a},${b},${c},${d})`;
    }
    return `${model}a(${a},${b}%,${c}%,${d})`;
  }

  get str() {
    return String(this);
  }
}

export {Color};

export function parseColor(color) {
  return new Color(color);
}

export function parseColorString(color) {
  if(color && typeof color === 'string' && color !== 'inherit') {
    return parseColor(color).toString();
  }
  return color;
}

export function parseStringTransform(str) {
  if(typeof str !== 'string') return str;

  const rules = str.match(/(?:^|\s)+((?:scale|rotate|translate|skew|matrix)\([^()]+\))/g);
  const ret = {};
  if(rules) {
    rules.forEach((rule) => {
      const matched = rule.match(/(scale|rotate|translate|skew|matrix)\(([^()]+)\)/);
      const [, m, v] = matched;

      if(m === 'rotate') {
        ret[m] = parseStringFloat(v)[0];
      } else {
        ret[m] = parseStringFloat(v);
      }
    });
  }

  return ret;
}

export function parseValuesString(str, parser) {
  if(typeof str === 'string' && str !== '' && str !== 'inherit') {
    const values = str.split(/[\s,]+/g);
    return values.map((v) => {
      const ret = parser ? parser(v) : v;
      return Number.isNaN(ret) ? v : ret;
    });
  }
  return str;
}

export function praseString(str) {
  return parseValuesString(str);
}

export function parseStringInt(str) {
  return parseValuesString(str, parseInt);
}

export function parseStringFloat(str) {
  return parseValuesString(str, (v) => {
    if(v === 'center') return 0.5;
    if(v === 'left' || v === 'top') return 0;
    if(v === 'right' || v === 'bottom') return 1;
    return parseFloat(v);
  });
}

export function oneOrTwoValues(val) {
  if(!Array.isArray(val)) {
    return [val, val];
  } if(val.length === 1) {
    return [val[0], val[0]];
  }
  return val;
}

export function fourValuesShortCut(val) {
  if(!Array.isArray(val)) {
    return [val, val, val, val];
  } if(val.length === 1) {
    return [val[0], val[0], val[0], val[0]];
  } if(val.length === 2) {
    return [val[0], val[1], val[0], val[1]];
  }
  return [...val, 0, 0, 0, 0].slice(0, 4);
}

export function rectVertices(rect) {
  const [x, y, w, h] = rect;

  return [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
}

export function appendUnit(value, defaultUnit = 'px') {
  if(value === '') {
    return value;
  }
  if(typeof value === 'string' && Number.isNaN(Number(value))) {
    return value;
  }
  return value + defaultUnit;
}

export function sortOrderedSprites(sprites, reversed = false) {
  return [...sprites].sort((a, b) => {
    if(reversed) [a, b] = [b, a];
    if(a.zIndex === b.zIndex) {
      return a.zOrder - b.zOrder;
    }
    return a.zIndex - b.zIndex;
  });
}

const noticed = new Set();
export function notice(msg, level = 'warn') {
  if(typeof console !== 'undefined' && !noticed.has(msg)) {
    console[level](msg); // eslint-disable-line no-console
    noticed.add(msg);
  }
}

const IDMap = new WeakMap();
export function generateID(obj) {
  if(IDMap.has(obj)) {
    return IDMap.get(obj);
  }
  const id = Math.random().toString(36).slice(2);
  IDMap.set(obj, id);
  return id;
}
