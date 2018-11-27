'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _selector = require('./selector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssWhat = require('css-what');

var cssRules = [];
var keyFrames = {};

var relatedAttributes = new _set2.default();

var _matchedSelectors = (0, _symbol2.default)('matchedSelectors');
var _transitions = (0, _symbol2.default)('transitions');
var _animation = (0, _symbol2.default)('animation');

function parseTransitionValue(values) {
  if (typeof values === 'string') values = values.trim().split(/\s*,\s*/g);
  var ret = [];
  for (var i = 0; i < values.length; i++) {
    var value = values[i].toString();
    if (value === 'initial') {
      value = 0;
    } else if (/ms$/.test(value)) {
      value = parseFloat(value) / 1000;
    } else {
      value = parseFloat(value);
    }
    ret.push(value);
  }
  return ret;
}

function toPxValue(value, defaultWidth) {
  // eslint-disable-line complexity
  if (typeof value === 'string') {
    var matched = value.match(/^([\d.]+)(px|pt|pc|in|cm|mm|em|ex|rem|q|vw|vh|vmax|vmin)$/);
    if (matched) {
      // console.log(matched);
      var v = parseFloat(matched[1]);
      var unit = matched[2];
      if (unit === 'px') {
        value = v;
      } else if (unit === 'pt') {
        value = v / 0.75;
      } else if (unit === 'pc') {
        value = v * 16;
      } else if (unit === 'in') {
        value = v * 96;
      } else if (unit === 'cm') {
        value = v * 96.0 / 2.54;
      } else if (unit === 'mm') {
        value = v * 96.0 / 25.4;
      } else if (unit === 'em' || unit === 'rem' || unit === 'ex') {
        if (!defaultWidth && typeof getComputedStyle === 'function' && typeof document !== 'undefined') {
          var root = getComputedStyle(document.documentElement).fontSize;
          defaultWidth = toPxValue(root, 16);
        }
        value = v * defaultWidth;
        if (unit === 'ex') value /= 2;
      } else if (unit === 'q') {
        value = v * 96.0 / 25.4 / 4;
      } else if (unit === 'vw') {
        if (typeof document !== 'undefined') {
          var width = document.documentElement.clientWidth;
          value = width * v / 100;
        }
      } else if (unit === 'vh') {
        if (typeof document !== 'undefined') {
          var height = document.documentElement.clientHeight;
          value = height * v / 100;
        }
      } else if (unit === 'vmax' || unit === 'vmin') {
        if (typeof document !== 'undefined') {
          var _width = document.documentElement.clientWidth;
          var _height = document.documentElement.clientHeight;
          if (unit === 'vmax') {
            value = Math.max(_width, _height) * v / 100;
          } else {
            value = Math.min(_width, _height) * v / 100;
          }
        }
      }
    } else {
      var _v = Number(value);
      if (!(0, _isNan2.default)(_v)) {
        value = _v;
      }
    }
  }
  return value;
}

var CSSGetter = {
  opacity: true,
  width: true,
  height: true,
  backgroundColor: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  order: true,
  position: true,
  alignSelf: true,
  transform: true,
  transformOrigin: true,
  borderTopWidth: true,
  borderRightWidth: true,
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderTopColor: true,
  borderRightColor: true,
  borderBottomColor: true,
  borderLeftColor: true,
  borderTopStyle: true,
  borderRightStyle: true,
  borderBottomStyle: true,
  borderLeftStyle: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderBottomRightRadius: true,
  borderBottomLeftRadius: true,
  boxSizing: true,
  display: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  zIndex: true,
  font: true,
  fontSize: true,
  fontFamily: true,
  fontStyle: true,
  fontVariantCaps: true,
  fontWeight: true,
  color: true,
  textAlign: true,
  lineHeight: true,
  lineBreak: true,
  wordBreak: true,
  letterSpacing: true,
  textIndent: true,
  transitionDuration: parseTransitionValue,
  transitionTimingFunction: function transitionTimingFunction(values) {
    if (typeof values === 'string') values = values.trim().split(/\s*,\s*/g);
    var ret = [];
    for (var i = 0; i < values.length; i++) {
      var value = values[i].toString();
      if (value === 'initial') value = 'ease';
      ret.push(value);
    }
    return ret;
  },

  transitionDelay: parseTransitionValue,
  transitionProperty: true,
  animationDuration: function animationDuration(value) {
    value = value.toString();
    if (value === 'initial') {
      value = 0;
    } else if (/ms$/.test(value)) {
      value = parseFloat(value);
    } else {
      value = parseFloat(value) * 1000;
    }
    return value;
  },
  animationTimingFunction: function animationTimingFunction(value) {
    value = value.toString();
    return value !== 'initial' ? value : 'ease';
  },
  animationDelay: function animationDelay(value) {
    value = value.toString();
    if (value === 'initial') {
      value = 0;
    } else if (/ms$/.test(value)) {
      value = parseFloat(value);
    } else {
      value = parseFloat(value) * 1000;
    }
    return value;
  },
  animationIterationCount: function animationIterationCount(value) {
    value = value.toString();
    if (value === 'initial') return 1;
    if (value === 'infinity') return Infinity;
    return parseFloat(value);
  },
  animationDirection: function animationDirection(value) {
    value = value.toString();
    return value !== 'initial' ? value : 'normal';
  },
  animationFillMode: function animationFillMode(value) {
    value = value.toString();
    if (value === 'initial' || value === 'none') value = 'auto';
    return value;
  },

  animationPlayState: true,
  animationName: true
};

function parseRuleAttrs(rule) {
  var styleAttrs = void 0;
  var isStyleMap = !!rule.styleMap;
  if (!isStyleMap) {
    if (!rule.style) return;

    var props = [].concat((0, _toConsumableArray3.default)(rule.style)).map(function (key) {
      return [key, rule.style[key]];
    }).filter(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return value != null;
    });

    var matched = rule.cssText.match(/--sprite-[\w-]+\s*:\s*.+?(;|$)/img);
    if (matched) {
      matched.forEach(function (rule) {
        var _rule$split = rule.split(':'),
            _rule$split2 = (0, _slicedToArray3.default)(_rule$split, 2),
            key = _rule$split2[0],
            value = _rule$split2[1];

        props.push([key, value.trim().replace(/;$/, '')]);
      });
    }
    var isIgnore = props['--sprite-ignore'];
    if (isIgnore && isIgnore !== 'false' && isIgnore !== '0') {
      return;
    }

    styleAttrs = props;
  }
  if (rule.styleMap && rule.styleMap.has('--sprite-ignore')) {
    var _isIgnore = rule.styleMap.get('--sprite-ignore')[0].trim();
    if (_isIgnore !== 'false' && _isIgnore !== '0' && _isIgnore !== '') {
      return;
    }
  }
  if (rule.styleMap) {
    styleAttrs = [].concat((0, _toConsumableArray3.default)(rule.styleMap));
  }
  var attrs = {},
      reserved = {};
  var border = null;
  var transition = null;
  var gradient = {};

  styleAttrs.forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    // eslint-disable-line complexity
    if (key === '--sprite-transition') {
      throw new Error('Not support --sprite-transition, instead use transition.');
    }
    if (key === '--sprite-animation') {
      throw new Error('Not support --sprite-animation, instead use animation.');
    }
    if (key.indexOf('--sprite-') === 0) {
      key = key.replace('--sprite-', '');
      key = toCamel(key);
      if (isStyleMap) value = value[0][0].trim();
      if (key === 'gradient') {
        // --sprite-gradient: bgcolor,color vector(0, 150, 150, 0) 0,#fff 0.5,rgba(33, 33, 77, 0.7) 1,rgba(128, 45, 88, 0.5)
        var _matched = value.match(/(.+?)vector\((.+?)\)(.+)/);
        if (_matched) {
          var properties = _matched[1].trim().split(/\s*,\s*/g),
              vector = _matched[2].split(',').map(function (s) {
            return Number(s.trim());
          }),
              colors = _matched[3].trim().split(/\s+/).map(function (s) {
            var m = s.match(/^([\d.]+),(.*)/);
            if (m) {
              return { offset: Number(m[1].trim()), color: m[2].trim() };
            }
            return null;
          }).filter(function (c) {
            return c != null;
          });
          properties.forEach(function (prop) {
            gradient[prop] = { vector: vector, colors: colors };
          });
        }
      } else if (key === 'borderStyle') {
        border = border || { width: 1, color: 'rgba(0,0,0,0)' };
        border.style = value;
      } else if (key === 'borderWidth') {
        border = border || { width: 1, color: 'rgba(0,0,0,0)' };
        border.width = toPxValue(value);
      } else if (key === 'borderColor') {
        border = border || { width: 1, color: 'rgba(0,0,0,0)' };
        border.color = value;
      } else if (key === 'border') {
        var values = value.split(/\s+/);

        var _values = (0, _slicedToArray3.default)(values, 3),
            style = _values[0],
            width = _values[1],
            color = _values[2];

        border = border || {};
        border.style = style;
        border.width = toPxValue(width);
        border.color = color;
      } else {
        if (key !== 'fontSize' && typeof value === 'string') {
          if (/,/.test(value)) {
            var _values2 = value.split(',');
            value = _values2.map(function (v) {
              return toPxValue(v.trim());
            });
          } else {
            value = toPxValue(value);
          }
        }
        reserved[key] = value;
      }
    } else {
      key = toCamel(key);
      if (key in CSSGetter) {
        if (typeof CSSGetter[key] === 'function') {
          value = CSSGetter[key](value);
        } else {
          if (isStyleMap) {
            value = value[0].toString();
          }
          if (key !== 'fontSize') {
            value = toPxValue(value);
          }
        }
        if (/^animation/.test(key)) {
          attrs.animation = attrs.animation || {};
          attrs.animation[key] = value;
          return;
        }

        if (value === 'initial') return;
        if (key === 'backgroundColor') key = 'bgcolor';
        if (key === 'fontVariantCaps') key = 'fontVariant';
        if (key === 'lineHeight' && value === 'normal') value = '';

        if (/^border/.test(key)) {
          key = key.replace(/^border(Top|Right|Bottom|Left)/, '').toLowerCase();
          if (key === 'width') value = toPxValue(value);
          if (/radius$/.test(key)) {
            attrs.borderRadius = toPxValue(value);
          } else {
            border = border || {};
            border[key] = value;
          }
        } else if (key === 'transitionDelay') {
          transition = transition || {};
          transition.delay = value;
        } else if (key === 'transitionDuration') {
          transition = transition || {};
          transition.duration = value;
        } else if (key === 'transitionTimingFunction') {
          transition = transition || {};
          transition.easing = value;
        } else if (key === 'transitionProperty') {
          transition = transition || {};
          transition.properties = value;
        } else {
          attrs[key] = value;
        }
      }
    }
  });
  if (border) {
    (0, _assign2.default)(attrs, { border: border });
  }
  (0, _assign2.default)(attrs, reserved, gradient);
  if (transition) {
    transition.properties = transition.properties || 'all';
    transition.delay = transition.delay || [0];
    transition.duration = transition.duration || [0];
    transition.easing = transition.easing || ['ease'];
    attrs.transitions = [];
    var properties = transition.properties.split(',').map(function (p) {
      return p.trim();
    });
    properties.forEach(function (key, i) {
      var _attrs = null;
      if (key.indexOf('--sprite-') === 0) {
        key = key.replace('--sprite-', '');
      }
      key = toCamel(key);
      if (key !== 'borderRadius' && /^border/.test(key)) {
        key = 'border';
      }
      if (key === 'backgroundColor' || key === 'background') key = 'bgcolor';
      if (key === 'fontVariantCaps') key = 'fontVariant';
      if (key === 'all') {
        _attrs = (0, _assign2.default)({}, attrs);
        delete _attrs.transitions;
        delete _attrs.animation;
      } else if (key in attrs) {
        _attrs = (0, _defineProperty3.default)({}, key, attrs[key]);
      }
      if (_attrs) {
        attrs.transitions.push({
          easing: transition.easing[i],
          attrs: _attrs,
          delay: transition.delay[i],
          duration: transition.duration[i] });
      }
    });
  }
  if ('fontSize' in attrs || 'fontFamily' in attrs || 'fontStyle' in attrs || 'fontVariant' in attrs || 'fontWeight' in attrs) {
    // for font inherit
    var parseFont = require('./helpers/parse-font');
    var font = attrs.font || 'normal normal normal 16px Arial';

    var _parseFont = parseFont(font),
        style = _parseFont.style,
        variant = _parseFont.variant,
        weight = _parseFont.weight,
        family = _parseFont.family,
        size = _parseFont.size,
        unit = _parseFont.unit;

    attrs.font = (attrs.fontStyle || style) + ' ' + (attrs.fontVariant || variant) + ' ' + (attrs.fontWeight || weight) + ' ' + (attrs.fontSize || size + unit) + ' ' + (attrs.fontFamily || family);

    delete attrs.fontSize;
    delete attrs.fontFamily;
    delete attrs.fontVariant;
    delete attrs.fontWeight;
    delete attrs.fontStyle;
  }
  return attrs;
}

function parseFrames(rule) {
  var rules = rule.cssRules || rule.rules;
  if (rules && rules.length > 0) {
    var frames = [];
    for (var i = 0; i < rules.length; i++) {
      var _rule = rules[i];
      var offset = parseFloat(_rule.keyText) / 100;
      var frame = parseRuleAttrs(_rule);
      frame.offset = offset;
      frames.push(frame);
    }
    return frames;
  }
}

function toCamel(str) {
  return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
    return $1 + $2.toUpperCase();
  });
}

function resolveToken(token) {
  // eslint-disable-line complexity
  var ret = '',
      priority = 0,
      valid = true;

  if (token.type === 'tag') {
    ret = token.name;
    priority = 1;
  } else if (token.type === 'universal') {
    ret = '*';
    priority = 0;
  } else if (token.type === 'pseudo') {
    var data = token.data;
    if (data != null) {
      if (token.name !== 'not') {
        ret = ':' + token.name + '(' + token.data + ')';
      } else {
        data.forEach(function (rules) {
          rules.forEach(function (token) {
            var r = resolveToken(token);
            ret += r.token;
            valid = r.valid;
          });
        });
      }
    } else {
      ret = ':' + token.name;
    }
    // not support yet
    valid = token.name !== 'hover' && token.name !== 'active' && token.name !== 'focus' && token.name !== 'link' && token.name !== 'visited' && token.name !== 'lang';
    priority = token.name !== 'not' ? 1000 : 0;
  } else if (token.type === 'pseudo-element') {
    ret = '::' + token.name;
    priority = 1;
    valid = false; // pseudo-element not support
  } else if (token.type === 'attribute') {
    var name = token.name,
        action = token.action,
        value = token.value;


    relatedAttributes.add(name);

    if (action === 'exists') {
      ret = '[' + name + ']';
    } else if (action === 'equals') {
      if (name === 'id') {
        ret = '#' + value;
      } else {
        ret = '[' + name + '="' + value + '"]';
      }
    } else if (action === 'not') {
      ret = '[' + name + '!="' + value + '"]';
    } else if (action === 'start') {
      ret = '[' + name + '^="' + value + '"]';
    } else if (action === 'end') {
      ret = '[' + name + '$="' + value + '"]';
    } else if (action === 'element') {
      if (name === 'class') {
        ret = '.' + value;
      } else {
        ret = '[' + name + '~="' + value + '"]';
      }
    } else if (action === 'any') {
      ret = '[' + name + '*="' + value + '"]';
    } else if (action === 'hyphen') {
      ret = '[' + name + '|="' + value + '"]';
    }
    if (name === 'id' && action === 'equals') {
      priority = 1000000;
    } else {
      priority = 1000;
    }
  } else if (token.type === 'child') {
    ret = '>';
    priority = 0;
  } else if (token.type === 'parent') {
    ret = '<';
    priority = 0;
  } else if (token.type === 'sibling') {
    ret = '~';
    priority = 0;
  } else if (token.type === 'adjacent') {
    ret = '+';
    priority = 0;
  } else if (token.type === 'descendant') {
    ret = ' ';
    priority = 0;
  } else {
    throw new Error('unknown token!', token);
  }
  return { token: ret, priority: priority, valid: valid };
}

var order = 0;

exports.default = {
  add: function add(rules) {
    var fromDoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    (0, _entries2.default)(rules).forEach(function (_ref5) {
      var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
          rule = _ref6[0],
          attributes = _ref6[1];

      var selectors = cssWhat(rule);
      for (var i = 0; i < selectors.length; i++) {
        var selector = selectors[i];
        var tokens = selector.map(function (token) {
          return resolveToken(token);
        }).filter(function (token) {
          return token.valid;
        });

        var r = tokens.reduce(function (a, b) {
          a.priority += b.priority;
          a.tokens.push(b.token);
          return a;
        }, { tokens: [], priority: 0 });

        var selectorStr = r.tokens.join('');

        try {
          var compiled = (0, _selector.compile)(selectorStr);

          var _rule2 = {
            selector: selectorStr,
            compiled: compiled,
            priority: r.priority,
            attributes: attributes,
            order: order++,
            fromDoc: fromDoc
          };
          cssRules.push(_rule2);
        } catch (ex) {
          console.warn(ex.message);
        }
      }
    });
    cssRules.sort(function (a, b) {
      var d = a.priority - b.priority;
      return d !== 0 ? d : a.order - b.order;
    });
  },
  fromDocumentCSS: function fromDocumentCSS() {
    cssRules = cssRules.filter(function (r) {
      return !r.fromDoc;
    });
    if (typeof document === 'undefined') return;
    var stylesheets = document.styleSheets;
    if (stylesheets) {
      var styleRules = {};
      for (var i = 0; i < stylesheets.length; i++) {
        var rules = null;
        try {
          rules = stylesheets[i].cssRules || stylesheets[i].rules;
        } catch (ex) {
          rules = null;
        }

        if (!rules) continue; // eslint-disable-line no-continue
        for (var j = 0; j < rules.length; j++) {
          var rule = rules[j];
          var selectorText = rule.selectorText;

          if (rule.type !== 1 && rule.type !== 7) {
            // is not style rule or keyframesrule
            continue; // eslint-disable-line no-continue
          }

          if (rule.type === 7) {
            var frames = parseFrames(rule);
            keyFrames[rule.name] = frames;
            continue; // eslint-disable-line no-continue
          }

          var attrs = parseRuleAttrs(rule);

          if (attrs) {
            styleRules[selectorText] = styleRules[selectorText] || {};
            (0, _assign2.default)(styleRules[selectorText], attrs);
          }
        }
      }
      this.add(styleRules, true);
    }
  },
  computeStyle: function computeStyle(el) {
    if (!el.layer || !el.attributes) return {};
    var attrs = {};
    var selectors = [];
    var transitions = [];
    cssRules.forEach(function (rule) {
      var compiled = rule.compiled,
          selector = rule.selector,
          attributes = rule.attributes;

      if ((0, _selector.isMatched)(el, compiled)) {
        (0, _assign2.default)(attrs, attributes);
        // console.log(JSON.stringify(attrs.transitions));
        if (attrs.transitions) {
          transitions.push.apply(transitions, (0, _toConsumableArray3.default)(attrs.transitions));
          attrs.transitions.forEach(function (t) {
            (0, _keys2.default)(t.attrs).forEach(function (k) {
              // if(k in attrs) delete attrs[k];
              el.attributes.__getStyleTag = true;
              if (el.attributes[k]) {
                attrs[k] = el.attributes[k];
              }
              el.attributes.__getStyleTag = false;
              // console.log(el.attributes.style[k]);
            });
          });
          delete attrs.transitions;
        }
        selectors.push(selector);
      }
    });
    var matchedSelectors = selectors.join();
    if (el[_matchedSelectors] !== matchedSelectors) {
      // console.log(transitions);
      if (attrs.animation) {
        var animation = attrs.animation;
        var delay = animation.animationDelay,
            direction = animation.animationDirection,
            duration = animation.animationDuration,
            fill = animation.animationFillMode,
            iterations = animation.animationIterationCount,
            name = animation.animationName,
            playState = animation.animationPlayState,
            easing = animation.animationTimingFunction;

        var frames = keyFrames[name];
        if (frames) {
          if (el[_animation]) {
            el[_animation].cancel();
          }
          el[_animation] = el.animate(frames, { duration: duration, delay: delay, fill: fill, iterations: iterations, easing: easing, direction: direction });
          el.setReleaseKey(_animation);
          if (playState !== 'running') el[_animation].pause();
        } else {
          console.warn('Unknow animation: ' + name);
        }
        delete attrs.animation;
      }

      if (el[_transitions]) {
        el[_transitions].forEach(function (t) {
          t.cancel(true);
          el.attributes.__styleTag = true;
          el.attr(t.__attrs);
          el.attributes.__styleTag = false;
        });
        delete el[_transitions];
      }

      if (transitions.length > 0) {
        el[_transitions] = [];
        el.setReleaseKey(_transitions);
        _promise2.default.all(transitions.map(function (t) {
          var attrs = t.attrs,
              delay = t.delay,
              duration = t.duration,
              easing = t.easing;

          var transition = el.transition({ duration: duration, delay: delay }, easing, true);
          transition.__attrs = attrs;
          el[_transitions].push(transition);
          return transition.attr((0, _assign2.default)({}, attrs));
        })).then(function () {
          el.dispatchEvent('transitionend', {}, true, true);
        });
      }
      el.dispatchEvent('stylechange', { oldSelectors: el[_matchedSelectors], newSelectors: matchedSelectors }, true, true);
      el[_matchedSelectors] = matchedSelectors;
      el.attributes.clearStyle();
      el.attributes.__styleTag = true;
      el.attr(attrs);
      el.attributes.__styleTag = false;
      // if(el.forceUpdate) el.forceUpdate();
    }
  },

  get relatedAttributes() {
    return relatedAttributes;
  },
  get cssRules() {
    return cssRules;
  }
};