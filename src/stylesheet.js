import {isMatched, compile} from './selector';

const cssWhat = require('css-what');

let cssRules = [];
const relatedAttributes = new Set();

const _matchedSelectors = Symbol('matchedSelectors');
const _transitions = Symbol('transitions');

function parseTransitionValue(values) {
  if(typeof values === 'string') values = values.trim().split(/\s*,\s*/g);
  const ret = [];
  for(let i = 0; i < values.length; i++) {
    let value = values[i].toString();
    if(value === 'initial') {
      value = 0;
    } else if(/ms$/.test(value)) {
      value = parseFloat(value) / 1000;
    } else {
      value = parseFloat(value);
    }
    ret.push(value);
  }
  return ret;
}

function toPxValue(value, defaultWidth) {
  if(typeof value === 'string') {
    const matched = value.match(/^([\d.]+)(px|pt|pc|in|cm|mm|em|ex|rem|q|vw|vh|vmax|vmin)$/);
    if(matched) {
      // console.log(matched);
      const v = parseFloat(matched[1]);
      const unit = matched[2];
      if(unit === 'px') {
        value = v;
      } else if(unit === 'pt') {
        value = v / 0.75;
      } else if(unit === 'pc') {
        value = v * 16;
      } else if(unit === 'in') {
        value = v * 96;
      } else if(unit === 'cm') {
        value = v * 96.0 / 2.54;
      } else if(unit === 'mm') {
        value = v * 96.0 / 25.4;
      } else if(unit === 'em' || unit === 'rem' || unit === 'ex') {
        if(!defaultWidth && typeof getComputedStyle === 'function' && typeof document !== 'undefined') {
          const root = getComputedStyle(document.documentElement).fontSize;
          defaultWidth = toPxValue(root, 16);
        }
        value = v * defaultWidth;
        if(unit === 'ex') value /= 2;
      } else if(unit === 'q') {
        value = v * 96.0 / 25.4 / 4;
      } else if(unit === 'vw') {
        if(typeof document !== 'undefined') {
          const width = document.documentElement.clientWidth;
          value = width * v / 100;
        }
      } else if(unit === 'vh') {
        if(typeof document !== 'undefined') {
          const height = document.documentElement.clientHeight;
          value = height * v / 100;
        }
      } else if(unit === 'vmax' || unit === 'vmin') {
        if(typeof document !== 'undefined') {
          const width = document.documentElement.clientWidth;
          const height = document.documentElement.clientHeight;
          if(unit === 'vmax') {
            value = Math.max(width, height) * v / 100;
          } else {
            value = Math.min(width, height) * v / 100;
          }
        }
      }
    }
  }
  return value;
}

const CSSGetter = {
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
  transitionTimingFunction(values) {
    if(typeof values === 'string') values = values.trim().split(/\s*,\s*/g);
    const ret = [];
    for(let i = 0; i < values.length; i++) {
      let value = values[i].toString();
      if(value === 'initial') value = 'ease';
      ret.push(value);
    }
    return ret;
  },
  transitionDelay: parseTransitionValue,
  transitionProperty: true,
};

function toCamel(str) {
  return str.replace(/([^-])(?:-+([^-]))/g, ($0, $1, $2) => {
    return $1 + $2.toUpperCase();
  });
}

function applyValue(key, value, values) {
  if(/Top$/.test(key)) values[0] = value;
  if(/Right$/.test(key)) values[1] = value;
  if(/Bottom$/.test(key)) values[2] = value;
  if(/Left$/.test(key)) values[3] = value;
}

function resolveToken(token) { // eslint-disable-line complexity
  let ret = '',
    priority = 0,
    valid = true;

  if(token.type === 'tag') {
    ret = token.name;
    priority = 1;
  } else if(token.type === 'universal') {
    ret = '*';
    priority = 0;
  } else if(token.type === 'pseudo') {
    const data = token.data;
    if(data != null) {
      if(token.name !== 'not') {
        ret = `:${token.name}(${token.data})`;
      } else {
        data.forEach((rules) => {
          rules.forEach((token) => {
            const r = resolveToken(token);
            ret += r.token;
            valid = r.valid;
          });
        });
      }
    } else {
      ret = `:${token.name}`;
    }
    // not support yet
    valid = token.name !== 'hover'
      && token.name !== 'active'
      && token.name !== 'focus'
      && token.name !== 'link'
      && token.name !== 'visited'
      && token.name !== 'lang';
    priority = token.name !== 'not' ? 1000 : 0;
  } else if(token.type === 'pseudo-element') {
    ret = `::${token.name}`;
    priority = 1;
    valid = false; // pseudo-element not support
  } else if(token.type === 'attribute') {
    const {name, action, value} = token;

    relatedAttributes.add(name);

    if(action === 'exists') {
      ret = `[${name}]`;
    } else if(action === 'equals') {
      if(name === 'id') {
        ret = `#${value}`;
      } else {
        ret = `[${name}="${value}"]`;
      }
    } else if(action === 'not') {
      ret = `[${name}!="${value}"]`;
    } else if(action === 'start') {
      ret = `[${name}^="${value}"]`;
    } else if(action === 'end') {
      ret = `[${name}$="${value}"]`;
    } else if(action === 'element') {
      if(name === 'class') {
        ret = `.${value}`;
      } else {
        ret = `[${name}~="${value}"]`;
      }
    } else if(action === 'any') {
      ret = `[${name}*="${value}"]`;
    } else if(action === 'hyphen') {
      ret = `[${name}|="${value}"]`;
    }
    if(name === 'id' && action === 'equals') {
      priority = 1000000;
    } else {
      priority = 1000;
    }
  } else if(token.type === 'child') {
    ret = '>';
    priority = 0;
  } else if(token.type === 'parent') {
    ret = '<';
    priority = 0;
  } else if(token.type === 'sibling') {
    ret = '~';
    priority = 0;
  } else if(token.type === 'adjacent') {
    ret = '+';
    priority = 0;
  } else if(token.type === 'descendant') {
    ret = ' ';
    priority = 0;
  } else {
    throw new Error('unknown token!', token);
  }
  return {token: ret, priority, valid};
}

let order = 0;

export default {
  add(rules, fromDoc = false) {
    Object.entries(rules).forEach(([rule, attributes]) => {
      const selectors = cssWhat(rule);
      for(let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];
        const tokens = selector.map((token) => {
          return resolveToken(token);
        }).filter(token => token.valid);

        const r = tokens.reduce((a, b) => {
          a.priority += b.priority;
          a.tokens.push(b.token);
          return a;
        }, {tokens: [], priority: 0});

        const selectorStr = r.tokens.join('');

        try {
          const compiled = compile(selectorStr);

          const rule = {
            selector: selectorStr,
            compiled,
            priority: r.priority,
            attributes,
            order: order++,
            fromDoc,
          };
          cssRules.push(rule);
        } catch (ex) {
          console.warn(ex.message);
        }
      }
    });
    cssRules.sort((a, b) => {
      const d = a.priority - b.priority;
      return d !== 0 ? d : a.order - b.order;
    });
  },
  fromDocumentCSS() {
    cssRules = cssRules.filter(r => !r.fromDoc);
    if(typeof document === 'undefined') return;
    const stylesheets = document.styleSheets;
    if(stylesheets) {
      const styleRules = {};
      for(let i = 0; i < stylesheets.length; i++) {
        let rules = null;
        try {
          rules = stylesheets[i].cssRules || stylesheets[i].rules;
        } catch (ex) {
          rules = null;
        }

        if(!rules) continue; // eslint-disable-line no-continue
        for(let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          const selectorText = rule.selectorText;
          const isStyleMap = !!rule.styleMap;
          let styleAttrs;

          if(!isStyleMap) { // eslint-disable-line no-continue
            if(!rule.style) continue; // eslint-disable-line no-continue

            const props = [...rule.style].map((key) => {
              return [key, rule.style[key]];
            }).filter(([key, value]) => value != null);

            const matched = rule.cssText.match(/--sprite-[\w-]+\s*:\s*.+?(;|$)/img);
            if(matched) {
              matched.forEach((rule) => {
                const [key, value] = rule.split(':');
                props.push([key, value.trim().replace(/;$/, '')]);
              });
            }
            const isIgnore = props['--sprite-ignore'];
            if(isIgnore && isIgnore !== 'false' && isIgnore !== '0') {
              continue; // eslint-disable-line no-continue
            }

            styleAttrs = props;
          }
          if(rule.styleMap && rule.styleMap.has('--sprite-ignore')) {
            const isIgnore = rule.styleMap.get('--sprite-ignore')[0].trim();
            if(isIgnore !== 'false' && isIgnore !== '0' && isIgnore !== '') {
              continue; // eslint-disable-line no-continue
            }
          }
          if(rule.styleMap) {
            styleAttrs = [...rule.styleMap];
          }
          const attrs = {},
            reserved = {};
          let border = null;
          let transition = null;
          const gradient = {};

          styleAttrs.forEach(([key, value]) => { // eslint-disable-line complexity
            if(key.indexOf('--sprite-') === 0) {
              key = key.replace('--sprite-', '');
              key = toCamel(key);
              if(isStyleMap) value = value[0][0].trim();
              if(/^margin\w+/.test(key)) {
                reserved.margin = reserved.margin || [0, 0, 0, 0];
                applyValue(key, toPxValue(value), reserved.margin);
              } else if(/^padding\w+/.test(key)) {
                reserved.padding = reserved.padding || [0, 0, 0, 0];
                applyValue(key, toPxValue(value), reserved.padding);
              } else if(key === 'gradient') {
                // --sprite-gradient: bgcolor,color vector(0, 150, 150, 0) 0 #fff,0.5 rgba(33, 33, 77, 0.7),1 rgba(128, 45, 88, 0.5)
                const matched = value.match(/(.+?)vector\((.+?)\)(.+)/);
                if(matched) {
                  const properties = matched[1].trim().split(/\s*,\s*/g),
                    vector = matched[2].split(',').map(s => Number(s.trim())),
                    colors = matched[3].trim().split(/\s+/).map(
                      (s) => {
                        const [offset, color] = s.split(',');
                        return {offset: Number(offset.trim()), color: color.trim()};
                      }
                    );
                  properties.forEach((prop) => {
                    gradient[prop] = {vector, colors};
                  });
                }
              } else if(key === 'borderStyle') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.style = value;
              } else if(key === 'borderWidth') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.width = toPxValue(value);
              } else if(key === 'borderColor') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.color = value;
              } else if(key === 'border') {
                const values = value.split(/\s+/);
                const [style, width, color] = values;
                border = border || {};
                border.style = style;
                border.width = toPxValue(width);
                border.color = color;
              } else {
                if(key !== 'fontSize') {
                  if(/,/.test(value)) {
                    const values = value.split(',');
                    value = values.map(v => toPxValue(v.trim()));
                  } else {
                    value = toPxValue(value);
                  }
                }
                reserved[key] = value;
              }
            } else {
              key = toCamel(key);
              if(key in CSSGetter) {
                if(typeof CSSGetter[key] === 'function') {
                  value = CSSGetter[key](value);
                } else {
                  if(isStyleMap) {
                    value = value[0].toString();
                  }
                  if(key !== 'fontSize') {
                    value = toPxValue(value);
                  }
                }

                if(value === 'initial') return;
                if(key === 'backgroundColor') key = 'bgcolor';
                if(key === 'fontVariantCaps') key = 'fontVariant';
                if(key === 'lineHeight' && value === 'normal') value = '';

                if(/^margin\w+/.test(key)) {
                  attrs.margin = attrs.margin || [0, 0, 0, 0];
                  applyValue(key, toPxValue(value), attrs.margin);
                } else if(/^padding\w+/.test(key)) {
                  attrs.padding = attrs.padding || [0, 0, 0, 0];
                  applyValue(key, toPxValue(value), attrs.padding);
                } else if(/^border/.test(key)) {
                  key = key.replace(/^border(Top|Right|Bottom|Left)/, '').toLowerCase();
                  if(key === 'width') value = toPxValue(value);
                  if(/radius$/.test(key)) {
                    attrs.borderRadius = toPxValue(value);
                  } else {
                    border = border || {};
                    border[key] = value;
                  }
                } else if(key === 'transitionDelay') {
                  transition = transition || {};
                  transition.delay = value;
                } else if(key === 'transitionDuration') {
                  transition = transition || {};
                  transition.duration = value;
                } else if(key === 'transitionTimingFunction') {
                  transition = transition || {};
                  transition.easing = value;
                } else if(key === 'transitionProperty') {
                  transition = transition || {};
                  transition.properties = value;
                } else {
                  attrs[key] = value;
                }
              }
            }
          });
          if(border) {
            Object.assign(attrs, {border});
          }
          Object.assign(attrs, reserved, gradient);
          styleRules[selectorText] = styleRules[selectorText] || {};
          if(transition) {
            transition.properties = transition.properties || 'all';
            transition.delay = transition.delay || [0];
            transition.duration = transition.duration || [0];
            transition.easing = transition.easing || ['ease'];
            attrs.transitions = [];
            const properties = transition.properties.split(',').map(p => p.trim());
            properties.forEach((key, i) => {
              let _attrs = null;
              if(key.indexOf('--sprite-') === 0) {
                key = key.replace('--sprite-', '');
              }
              key = toCamel(key);
              if(key !== 'borderRadius' && /^border/.test(key)) {
                key = 'border';
              }
              if(key === 'backgroundColor' || key === 'background') key = 'bgcolor';
              if(key === 'fontVariantCaps') key = 'fontVariant';
              if(key === 'all') {
                _attrs = Object.assign({}, attrs);
                delete _attrs.transitions;
              } else if(key in attrs) {
                _attrs = {[key]: attrs[key]};
              }
              if(_attrs) {
                attrs.transitions.push({
                  easing: transition.easing[i],
                  attrs: _attrs,
                  delay: transition.delay[i],
                  duration: transition.duration[i]});
              }
            });
          }
          Object.assign(styleRules[selectorText], attrs);
        }
      }
      // console.log(styleRules);
      this.add(styleRules, true);
    }
  },
  computeStyle(el) {
    if(!el.layer || !el.attributes) return {};
    const attrs = {};
    const selectors = [];
    const transitions = [];
    cssRules.forEach((rule) => {
      const {compiled, selector, attributes} = rule;
      if(isMatched(el, compiled)) {
        Object.assign(attrs, attributes);
        // console.log(JSON.stringify(attrs.transitions));
        if(attrs.transitions) {
          transitions.push(...attrs.transitions);
          attrs.transitions.forEach((t) => {
            Object.keys(t.attrs).forEach((k) => {
              // if(k in attrs) delete attrs[k];
              el.attributes.__getStyleTag = true;
              attrs[k] = el.attributes[k];
              el.attributes.__getStyleTag = false;
              // console.log(el.attributes.style[k]);
            });
          });
          delete attrs.transitions;
        }
        selectors.push(selector);
      }
    });
    const matchedSelectors = selectors.join();
    if(el[_matchedSelectors] !== matchedSelectors) {
      // console.log(transitions);
      if(el[_transitions]) {
        el[_transitions].forEach((t) => {
          t.cancel(true);
          el.attributes.__styleTag = true;
          el.attr(t.__attrs);
          el.attributes.__styleTag = false;
        });
        delete el[_transitions];
      }

      if(transitions.length > 0) {
        el[_transitions] = [];
        Promise.all(transitions.map((t) => {
          const {attrs, delay, duration, easing} = t;
          const transition = el.transition({duration, delay}, easing, true);
          transition.__attrs = attrs;
          el[_transitions].push(transition);
          return transition.attr(Object.assign({}, attrs));
        })).then(() => {
          el.dispatchEvent('transitionend', {}, true, true);
        });
      }
      el.dispatchEvent('stylechange', {oldSelectors: el[_matchedSelectors], newSelectors: matchedSelectors},
        true, true);
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
  },
};
