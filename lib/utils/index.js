"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "parseFont", {
  enumerable: true,
  get: function get() {
    return _parseFont.default;
  }
});
Object.defineProperty(exports, "createSvgPath", {
  enumerable: true,
  get: function get() {
    return _svgpath.default;
  }
});
Object.defineProperty(exports, "notice", {
  enumerable: true,
  get: function get() {
    return _utils.notice;
  }
});
Object.defineProperty(exports, "Color", {
  enumerable: true,
  get: function get() {
    return _utils.Color;
  }
});
Object.defineProperty(exports, "parseColor", {
  enumerable: true,
  get: function get() {
    return _utils.parseColor;
  }
});
Object.defineProperty(exports, "oneOrTwoValues", {
  enumerable: true,
  get: function get() {
    return _utils.oneOrTwoValues;
  }
});
Object.defineProperty(exports, "praseString", {
  enumerable: true,
  get: function get() {
    return _utils.praseString;
  }
});
Object.defineProperty(exports, "parseStringInt", {
  enumerable: true,
  get: function get() {
    return _utils.parseStringInt;
  }
});
Object.defineProperty(exports, "parseStringFloat", {
  enumerable: true,
  get: function get() {
    return _utils.parseStringFloat;
  }
});
Object.defineProperty(exports, "parseColorString", {
  enumerable: true,
  get: function get() {
    return _utils.parseColorString;
  }
});
Object.defineProperty(exports, "fourValuesShortCut", {
  enumerable: true,
  get: function get() {
    return _utils.fourValuesShortCut;
  }
});
Object.defineProperty(exports, "eightValuesShortCut", {
  enumerable: true,
  get: function get() {
    return _utils.eightValuesShortCut;
  }
});
Object.defineProperty(exports, "parseStringTransform", {
  enumerable: true,
  get: function get() {
    return _utils.parseStringTransform;
  }
});
Object.defineProperty(exports, "rectVertices", {
  enumerable: true,
  get: function get() {
    return _utils.rectVertices;
  }
});
Object.defineProperty(exports, "appendUnit", {
  enumerable: true,
  get: function get() {
    return _utils.appendUnit;
  }
});
Object.defineProperty(exports, "sortOrderedSprites", {
  enumerable: true,
  get: function get() {
    return _utils.sortOrderedSprites;
  }
});
Object.defineProperty(exports, "generateID", {
  enumerable: true,
  get: function get() {
    return _utils.generateID;
  }
});
Object.defineProperty(exports, "sizeToPixel", {
  enumerable: true,
  get: function get() {
    return _utils.sizeToPixel;
  }
});
Object.defineProperty(exports, "attr", {
  enumerable: true,
  get: function get() {
    return _decorators.attr;
  }
});
Object.defineProperty(exports, "flow", {
  enumerable: true,
  get: function get() {
    return _decorators.flow;
  }
});
Object.defineProperty(exports, "absolute", {
  enumerable: true,
  get: function get() {
    return _decorators.absolute;
  }
});
Object.defineProperty(exports, "inherit", {
  enumerable: true,
  get: function get() {
    return _decorators.inherit;
  }
});
Object.defineProperty(exports, "inheritAttributes", {
  enumerable: true,
  get: function get() {
    return _decorators.inheritAttributes;
  }
});
Object.defineProperty(exports, "setDeprecation", {
  enumerable: true,
  get: function get() {
    return _decorators.setDeprecation;
  }
});
Object.defineProperty(exports, "deprecate", {
  enumerable: true,
  get: function get() {
    return _decorators.deprecate;
  }
});
Object.defineProperty(exports, "parseValue", {
  enumerable: true,
  get: function get() {
    return _decorators.parseValue;
  }
});
Object.defineProperty(exports, "relative", {
  enumerable: true,
  get: function get() {
    return _decorators.relative;
  }
});
Object.defineProperty(exports, "cachable", {
  enumerable: true,
  get: function get() {
    return _decorators.cachable;
  }
});
Object.defineProperty(exports, "composit", {
  enumerable: true,
  get: function get() {
    return _decorators.composit;
  }
});
Object.defineProperty(exports, "decorators", {
  enumerable: true,
  get: function get() {
    return _decorators.decorators;
  }
});
Object.defineProperty(exports, "attributeNames", {
  enumerable: true,
  get: function get() {
    return _store.attributeNames;
  }
});
Object.defineProperty(exports, "relatedAttributes", {
  enumerable: true,
  get: function get() {
    return _store.relatedAttributes;
  }
});
Object.defineProperty(exports, "findColor", {
  enumerable: true,
  get: function get() {
    return _render.findColor;
  }
});
Object.defineProperty(exports, "cacheContextPool", {
  enumerable: true,
  get: function get() {
    return _render.cacheContextPool;
  }
});
Object.defineProperty(exports, "drawRadiusBox", {
  enumerable: true,
  get: function get() {
    return _render.drawRadiusBox;
  }
});

var _parseFont = _interopRequireDefault(require("./parse-font"));

var _svgpath = _interopRequireDefault(require("./svgpath"));

var _utils = require("./utils");

var _decorators = require("./decorators");

var _store = require("./store");

var _render = require("./render");