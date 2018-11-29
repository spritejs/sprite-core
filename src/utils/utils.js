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

const parseColor = (color) => {
  return new Color(color);
};

function parseColorString(color) {
  if(color && typeof color === 'string' && color !== 'inherit') {
    return parseColor(color).toString();
  }
  return color;
}

function parseStringTransform(str) {
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

function parseValuesString(str, parser) {
  if(typeof str === 'string' && str !== '') {
    const values = str.split(/[\s,]+/g);
    return values.map((v) => {
      const ret = parser ? parser(v) : v;
      return Number.isNaN(ret) ? v : ret;
    });
  }
  return str;
}

function praseString(str) {
  return parseValuesString(str);
}

function parseStringInt(str) {
  return parseValuesString(str, parseInt);
}

function parseStringFloat(str) {
  return parseValuesString(str, (v) => {
    if(v === 'center') return 0.5;
    if(v === 'left' || v === 'top') return 0;
    if(v === 'right' || v === 'bottom') return 1;
    return parseFloat(v);
  });
}

function oneOrTwoValues(val) {
  if(!Array.isArray(val)) {
    return [val, val];
  } if(val.length === 1) {
    return [val[0], val[0]];
  }
  return val;
}

function fourValuesShortCut(val) {
  if(!Array.isArray(val)) {
    return [val, val, val, val];
  } if(val.length === 1) {
    return [val[0], val[0], val[0], val[0]];
  } if(val.length === 2) {
    return [val[0], val[1], val[0], val[1]];
  }
  return [...val, 0, 0, 0, 0].slice(0, 4);
}

function boxIntersect(box1, box2) {
  // left, top, right, buttom
  const [l1, t1, r1, b1] = [box1[0], box1[1],
      box1[2], box1[3]],
    [l2, t2, r2, b2] = [box2[0], box2[1],
      box2[2], box2[3]];

  const t = Math.max(t1, t2),
    r = Math.min(r1, r2),
    b = Math.min(b1, b2),
    l = Math.max(l1, l2);

  if(b >= t && r >= l) {
    return [l, t, r, b];
  }
  return null;
}

function boxToRect(box) {
  return [box[0], box[1], box[2] - box[0], box[3] - box[1]];
}

function boxEqual(box1, box2) {
  return box1[0] === box2[0]
         && box1[1] === box2[1]
         && box1[2] === box2[2]
         && box1[3] === box2[3];
}

function rectToBox(rect) {
  return [rect[0], rect[1], rect[0] + rect[2], rect[1] + rect[3]];
}

function rectVertices(rect) {
  const [x1, y1, x2, y2] = rectToBox(rect);

  return [
    [x1, y1],
    [x2, y1],
    [x2, y2],
    [x1, y2],
  ];
}

function boxUnion(box1, box2) {
  if(!box1) return box2;
  if(!box2) return box1;

  return [Math.min(box1[0], box2[0]),
    Math.min(box1[1], box2[1]),
    Math.max(box1[2], box2[2]),
    Math.max(box1[3], box2[3])];
}

function appendUnit(value, defaultUnit = 'px') {
  if(value === '') {
    return value;
  }
  if(typeof value === 'string' && Number.isNaN(Number(value))) {
    return value;
  }
  return value + defaultUnit;
}

function sortOrderedSprites(sprites, reversed = false) {
  return [...sprites].sort((a, b) => {
    if(reversed) [a, b] = [b, a];
    if(a.zIndex === b.zIndex) {
      return a.zOrder - b.zOrder;
    }
    return a.zIndex - b.zIndex;
  });
}

const noticed = new Set();
function notice(msg, level = 'warn') {
  if(typeof console !== 'undefined' && !noticed.has(msg)) {
    console[level](msg); // eslint-disable-line no-console
    noticed.add(msg);
  }
}

const IDMap = new WeakMap();
function generateID(obj) {
  if(IDMap.has(obj)) {
    return IDMap.get(obj);
  }
  const id = Math.random().toString(36).slice(2);
  IDMap.set(obj, id);
  return id;
}

export {
  appendUnit,
  boxEqual,
  boxIntersect,
  boxToRect,
  boxUnion,
  fourValuesShortCut,
  notice,
  oneOrTwoValues,
  parseColor,
  parseColorString,
  praseString,
  parseStringFloat,
  parseStringInt,
  parseStringTransform,
  rectToBox,
  rectVertices,
  sortOrderedSprites,
  generateID,
};
