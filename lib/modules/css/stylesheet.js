"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _selector = require("../dom/selector");

var _utils = require("../../utils");

var cssWhat = require('css-what');

var cssRules = [];
var keyFrames = {};

var _matchedSelectors = Symbol('matchedSelectors');

var _transitions = Symbol('transitions');

var _animation = Symbol('animation');
/* istanbul ignore next */


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
/* istanbul ignore next */


function parseAnimationValue(value) {
  value = value.toString();

  if (value === 'initial') {
    value = 0;
  } else if (/ms$/.test(value)) {
    value = parseFloat(value);
  } else {
    value = parseFloat(value) * 1000;
  }

  return value;
}
/* istanbul ignore next */


function toPxValue(value, defaultWidth) {
  // eslint-disable-line complexity
  if (typeof value === 'string') {
    var matched = value.match(/^([\d.]+)(px|pt|pc|in|cm|mm|em|ex|rem|q|vw|vh|vmax|vmin)$/);

    if (matched) {
      // console.log(matched);
      var size = parseFloat(matched[1]);
      var unit = matched[2];
      value = (0, _utils.sizeToPixel)({
        size: size,
        unit: unit
      });
    } else {
      var _size = Number(value);

      if (!Number.isNaN(_size)) {
        value = _size;
      }
    }
  }

  return value;
}
/* istanbul ignore next */


var CSSGetter = {
  opacity: true,
  width: true,
  height: true,
  backgroundColor: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: true,
  order: true,
  flexDirection: true,
  flexWrap: true,
  justifyContent: true,
  alignItems: true,
  alignContent: true,
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
  animationDuration: parseAnimationValue,
  animationDelay: parseAnimationValue,
  animationTimingFunction: function animationTimingFunction(value) {
    value = value.toString();
    return value !== 'initial' ? value : 'ease';
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
/* istanbul ignore next */

function parseRuleAttrs(rule) {
  // eslint-disable-line complexity
  var styleAttrs;
  var isStyleMap = !!rule.styleMap;

  if (!isStyleMap) {
    if (!rule.style) return;
    var props = (0, _toConsumableArray2.default)(rule.style).map(function (key) {
      return [key, rule.style[key]];
    }).filter(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return value != null;
    });
    var matched = rule.cssText.match(/--sprite-[\w-]+\s*:\s*.+?(;|$)/img);

    if (matched) {
      matched.forEach(function (rule) {
        var _rule$split = rule.split(':'),
            _rule$split2 = (0, _slicedToArray2.default)(_rule$split, 2),
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
    styleAttrs = (0, _toConsumableArray2.default)(rule.styleMap);
  }

  var attrs = {},
      reserved = {};
  var borderRadius = null;
  var transition = null;
  var gradient = {};
  styleAttrs.forEach(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
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
              return {
                offset: Number(m[1].trim()),
                color: m[2].trim()
              };
            }

            return null;
          }).filter(function (c) {
            return c != null;
          });

          properties.forEach(function (prop) {
            gradient[prop] = {
              vector: vector,
              colors: colors
            };
          });
        }
      }

      if (key === 'border') {
        var values = value.split(/\s+/);

        var _values = (0, _slicedToArray2.default)(values, 3),
            style = _values[0],
            width = _values[1],
            color = _values[2];

        reserved.border = {
          style: style,
          width: width,
          color: color
        };
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

        if (/Radius$/.test(key)) {
          if (typeof value === 'string') {
            value = value.split(/\s+/).map(function (v) {
              return toPxValue(v);
            });
          } else {
            value = [value, value];
          }

          borderRadius = borderRadius || [0, 0, 0, 0, 0, 0, 0, 0];

          if (key === 'borderTopLeftRadius') {
            borderRadius[0] = value[0];
            borderRadius[1] = value[1];
          } else if (key === 'borderTopRightRadius') {
            borderRadius[2] = value[0];
            borderRadius[3] = value[1];
          } else if (key === 'borderBottomRightRadius') {
            borderRadius[4] = value[0];
            borderRadius[5] = value[1];
          } else if (key === 'borderBottomLeftRadius') {
            borderRadius[6] = value[0];
            borderRadius[7] = value[1];
          }
        } else if (/^border(Left|Right|Top|Bottom)\w+/.test(key)) {
          if (/Color$/.test(key)) {
            attrs.borderColor = value;
          } else if (/Style$/.test(key)) {
            attrs.borderStyle = value;
          } else if (/Width$/.test(key)) {
            attrs.borderWidth = value;
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

  if (borderRadius) {
    attrs.borderRadius = borderRadius;
  }

  Object.assign(attrs, reserved, gradient);

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
        _attrs = Object.assign({}, attrs);
        delete _attrs.transitions;
        delete _attrs.animation;
      } else if (key in attrs) {
        _attrs = (0, _defineProperty2.default)({}, key, attrs[key]);
      }

      if (_attrs) {
        attrs.transitions.push({
          easing: transition.easing[i],
          attrs: _attrs,
          delay: transition.delay[i],
          duration: transition.duration[i]
        });
      }
    });
  }

  if ('fontSize' in attrs || 'fontFamily' in attrs || 'fontStyle' in attrs || 'fontVariant' in attrs || 'fontWeight' in attrs) {
    // for font inherit
    var font = attrs.font || 'normal normal normal 16px Arial';

    var _parseFont = (0, _utils.parseFont)(font),
        style = _parseFont.style,
        variant = _parseFont.variant,
        weight = _parseFont.weight,
        family = _parseFont.family,
        size = _parseFont.size,
        unit = _parseFont.unit;

    attrs.font = "".concat(attrs.fontStyle || style, " ").concat(attrs.fontVariant || variant, " ").concat(attrs.fontWeight || weight, " ").concat(attrs.fontSize || size + unit, " ").concat(attrs.fontFamily || family);
    delete attrs.fontSize;
    delete attrs.fontFamily;
    delete attrs.fontVariant;
    delete attrs.fontWeight;
    delete attrs.fontStyle;
  }

  return attrs;
}

function parseFrames(rule)
/* istanbul ignore next */
{
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
/* istanbul ignore next */


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
      if (token.name === 'not') {
        data.forEach(function (rules) {
          rules.forEach(function (token) {
            var r = resolveToken(token);
            ret += r.token;
            valid &= r.valid;
          });
        });
        ret = ":".concat(token.name, "(").concat(ret, ")");
      } else {
        ret = ":".concat(token.name, "(").concat(token.data, ")");
      }
    } else {
      ret = ":".concat(token.name);
    }

    if (token.name === 'hover')
      /* istanbul ignore next */
      {
        _utils.relatedAttributes.add('__internal_state_hover_');
      } else if (token.name === 'active')
      /* istanbul ignore next */
      {
        _utils.relatedAttributes.add('__internal_state_active_');
      } // not support yet


    valid = token.name !== 'focus' && token.name !== 'link' && token.name !== 'visited' && token.name !== 'lang';
    priority = token.name !== 'not' ? 1000 : 0;
  } else if (token.type === 'pseudo-element')
    /* istanbul ignore next */
    {
      ret = "::".concat(token.name);
      priority = 1;
      valid = false; // pseudo-element not support
    } else if (token.type === 'attribute') {
    var name = token.name,
        action = token.action,
        value = token.value;

    _utils.relatedAttributes.add(name);

    if (action === 'exists') {
      ret = "[".concat(name, "]");
    } else if (action === 'equals') {
      if (name === 'id') {
        ret = "#".concat(value);
      } else {
        ret = "[".concat(name, "=\"").concat(value, "\"]");
      }
    } else if (action === 'not')
      /* istanbul ignore next */
      {
        throw new Error('Attribute \'not\' action is not allowed.'); // ret = `[${name}!="${value}"]`;
      } else if (action === 'start') {
      ret = "[".concat(name, "^=\"").concat(value, "\"]");
    } else if (action === 'end') {
      ret = "[".concat(name, "$=\"").concat(value, "\"]");
    } else if (action === 'element') {
      if (name === 'class') {
        ret = ".".concat(value);
      } else {
        ret = "[".concat(name, "~=\"").concat(value, "\"]");
      }
    } else if (action === 'any') {
      ret = "[".concat(name, "*=\"").concat(value, "\"]");
    } else if (action === 'hyphen') {
      ret = "[".concat(name, "|=\"").concat(value, "\"]");
    }

    if (name === 'id' && action === 'equals') {
      priority = 1000000;
    } else {
      priority = 1000;
    }
  } else if (token.type === 'child') {
    ret = '>';
    priority = 0;
  } else if (token.type === 'parent')
    /* istanbul ignore next */
    {
      throw new Error('Parent selector is not allowed.'); // ret = '<';
      // priority = 0;
    } else if (token.type === 'sibling') {
    ret = '~';
    priority = 0;
  } else if (token.type === 'adjacent') {
    ret = '+';
    priority = 0;
  } else if (token.type === 'descendant') {
    ret = ' ';
    priority = 0;
  } else
    /* istanbul ignore next */
    {
      throw new Error("Unknown token ".concat(token, "."));
    }

  return {
    token: ret,
    priority: priority,
    valid: valid
  };
}

var order = 0;
var _default = {
  add: function add(rules) {
    var fromDoc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    Object.entries(rules).forEach(function (_ref5) {
      var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
          rule = _ref6[0],
          attributes = _ref6[1];

      var selectors = cssWhat.parse(rule);

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
        }, {
          tokens: [],
          priority: 0
        });
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
        } catch (ex)
        /* istanbul ignore next */
        {
          console.warn(ex.message);
        }
      }
    });
    cssRules.sort(function (a, b) {
      var d = a.priority - b.priority;
      return d !== 0 ? d : a.order - b.order;
    });
  },
  fromDocumentCSS: function fromDocumentCSS(stylesheets, override)
  /* istanbul ignore next */
  {
    if (override) {
      cssRules = cssRules.filter(function (r) {
        return !r.fromDoc;
      });
    }

    if (typeof document === 'undefined') return;
    if (!stylesheets) stylesheets = document.styleSheets;

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
            Object.assign(styleRules[selectorText], attrs);
          }
        }
      }

      this.add(styleRules, true);
    }
  },
  computeStyle: function computeStyle(el) {
    if (!el.attributes) return {};
    el.__styleNeedUpdate = false;
    if (cssRules.length <= 0) return {};
    var attrs = {};
    var selectors = [];
    var transitions = [];
    cssRules.forEach(function (rule) {
      var compiled = rule.compiled,
          selector = rule.selector,
          attributes = rule.attributes;

      if ((0, _selector.isMatched)(el, compiled)) {
        Object.assign(attrs, attributes); // console.log(JSON.stringify(attrs.transitions));

        if (attrs.transitions)
          /* istanbul ignore next */
          {
            transitions.push.apply(transitions, (0, _toConsumableArray2.default)(attrs.transitions));
            attrs.transitions.forEach(function (t) {
              Object.keys(t.attrs).forEach(function (k) {
                // if(k in attrs) delete attrs[k];
                el.attributes.__getStyleTag = true;

                if (el.attributes[k]) {
                  attrs[k] = el.attributes[k];
                }

                el.attributes.__getStyleTag = false; // console.log(el.attributes.style[k]);
              });
            });
            delete attrs.transitions;
          }

        selectors.push(selector);
      }
    }); // if(selectors.length <= 0) return;

    var matchedSelectors = selectors.join();

    if (el[_matchedSelectors] !== matchedSelectors) {
      // console.log(transitions);

      /* istanbul ignore if */
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

          el[_animation] = el.animate(frames, {
            duration: duration,
            delay: delay,
            fill: fill,
            iterations: iterations,
            easing: easing,
            direction: direction
          });
          el.setReleaseKey(_animation);
          if (playState !== 'running') el[_animation].pause();
        } else {
          console.warn("Unknow animation: ".concat(name));
        }

        delete attrs.animation;
      }
      /* istanbul ignore if */


      if (el[_transitions]) {
        el[_transitions].forEach(function (t) {
          t.cancel(true);
          el.attributes.__styleTag = true;
          el.attr(t.__attrs);
          el.attributes.__styleTag = false;
        });

        delete el[_transitions];
      }
      /* istanbul ignore if */


      if (transitions.length > 0) {
        el[_transitions] = [];
        el.setReleaseKey(_transitions);
        Promise.all(transitions.map(function (t) {
          var attrs = t.attrs,
              delay = t.delay,
              duration = t.duration,
              easing = t.easing;
          var transition = el.transition({
            duration: duration,
            delay: delay
          }, easing, true);
          transition.__attrs = attrs;

          el[_transitions].push(transition);

          return transition.attr(Object.assign({}, attrs));
        })).then(function () {
          el.dispatchEvent('transitionend', {}, true, true);
        });
      }

      el.dispatchEvent('stylechange', {
        oldSelectors: el[_matchedSelectors],
        newSelectors: matchedSelectors
      }, true, true);
      el[_matchedSelectors] = matchedSelectors;
      el.attributes.clearStyle();
      el.attributes.__styleTag = true;
      el.attr(attrs);
      el.attributes.__styleTag = false; // if(el.forceUpdate) el.forceUpdate();
    }

    return attrs;
  },

  get relatedAttributes() {
    return _utils.relatedAttributes;
  },

  get cssRules() {
    return cssRules;
  }

};
exports.default = _default;