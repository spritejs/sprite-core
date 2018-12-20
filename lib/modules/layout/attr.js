"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _baseattr = _interopRequireDefault(require("../../core/baseattr"));

var _utils = require("../../utils");

/*
  BaseAttr.addAttributes({
    flexGrow: {
      decorators: [],
      value: ...,
      set: ...,
      get: ...,
    },
  });
*/
var relayout = true,
    reflow = true,
    cache = true;

_baseattr.default.addAttributes({
  flexGrow: {
    decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
      relayout: relayout
    })],
    value: 0
  },
  flexShrink: {
    decorators: [(0, _utils.parseValue)(parseFloat), (0, _utils.attr)({
      relayout: relayout
    })],
    value: 1
  },
  flexBasis: {
    decorators: [(0, _utils.attr)({
      relayout: relayout,
      reflow: reflow
    })],
    value: 'auto'
  },
  order: {
    decorators: [(0, _utils.parseValue)(parseInt), (0, _utils.attr)({
      cache: cache,
      relayout: relayout
    })],
    value: 0
  },
  alignSelf: {
    decorators: [(0, _utils.attr)({
      cache: cache,
      relayout: relayout
    })],
    value: ''
  },
  flex: {
    set: function set(val) {
      this.clearFlow();

      if (val != null && val !== 'initial') {
        if (val === 'auto') {
          this.flexGrow = 1;
          this.flexShrink = 1;
          this.flexBasis = 'auto';
        } else if (val === 'none') {
          this.flexGrow = 0;
          this.flexShrink = 0;
          this.flexBasis = 'auto';
        } else if (typeof val === 'string') {
          var values = val.trim().split(/\s+/);
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
    },
    get: function get() {
      return "".concat(this.flexGrow, " ").concat(this.flexShrink, " ").concat(this.flexBasis);
    }
  }
});