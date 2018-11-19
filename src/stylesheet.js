import {isMatched, compile} from './selector';

const cssWhat = require('css-what');

let cssRules = [];
const relatedAttributes = new Set();

const _matchedSelectors = Symbol('matchedSelectors');
const _transitions = Symbol('transitions');

function parseTransitionValue(values) {
  const ret = [];
  for(let i = 0; i < values.length; i++) {
    let value = values[i].toString();
    if(/ms$/.test(value)) {
      value = parseFloat(value) / 1000;
    } else {
      value = parseFloat(value);
    }
    ret.push(value);
  }
  return ret;
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
  padding: true,
  margin: true,
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
  transitionTimingFunction: true,
  transitionDelay: parseTransitionValue,
  transitionProperty: true,
};

function toCamel(str) {
  return str.replace(/([^-])(?:-+([^-]))/g, ($0, $1, $2) => {
    return $1 + $2.toUpperCase();
  });
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
          if(!rule.styleMap) continue; // eslint-disable-line no-continue
          if(rule.styleMap && rule.styleMap.has('--sprite-ignore')) {
            const isIgnore = rule.styleMap.get('--sprite-ignore')[0].trim();
            if(isIgnore !== 'false' && isIgnore !== '0' && isIgnore !== '') {
              continue; // eslint-disable-line no-continue
            }
          }
          const styleAttrs = [...rule.styleMap];
          const attrs = {},
            reserved = {};
          let border = null;
          let transition = null;
          styleAttrs.forEach(([key, value]) => { // eslint-disable-line complexity
            if(key.indexOf('--sprite-') === 0) {
              key = key.replace('--sprite-', '');
              key = toCamel(key);
              if(key === 'borderStyle') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.style = value;
              } else if(key === 'borderWidth') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.width = parseFloat(value);
              }
              if(key === 'borderColor') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.color = value;
              } else if(key === 'border') {
                const values = value[0][0].trim().split(/\s+/);
                const [style, width, color] = values;
                border = border || {};
                border.style = style;
                border.width = parseInt(width, 10);
                border.color = color;
              } else {
                if(key !== 'fontSize') {
                  value = value[0][0].trim().replace(/px$/, '');
                } else {
                  value = value[0][0].trim();
                }
                reserved[key] = value;
              }
            } else {
              key = toCamel(key);
              if(key in CSSGetter) {
                if(typeof CSSGetter[key] === 'function') {
                  value = CSSGetter[key](value);
                } else if(key !== 'fontSize') {
                  value = value[0].toString().replace(/px$/, '');
                } else {
                  value = value[0].toString();
                }
                if(key === 'backgroundColor') key = 'bgcolor';
                if(key === 'fontVariantCaps') key = 'fontVariant';
                if(key === 'lineHeight' && value === 'normal') value = '';
                if(/^border/.test(key)) {
                  key = key.replace(/^border(Top|Right|Bottom|Left)/, '').toLowerCase();
                  if(key === 'color' && value === 'initial') value = 'rgba(0,0,0,0)';
                  if(key === 'width') value = parseFloat(value);
                  if(/radius$/.test(key)) {
                    attrs.borderRadius = parseInt(value, 10);
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
          Object.assign(attrs, reserved);
          styleRules[selectorText] = styleRules[selectorText] || {};
          if(transition) {
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
              if(key === 'backgroundColor') key = 'bgcolor';
              if(key === 'fontVariantCaps') key = 'fontVariant';
              if(key === 'all') {
                _attrs = Object.assign({}, attrs);
                delete _attrs.transitions;
              } else if(key in attrs) {
                _attrs = {[key]: attrs[key]};
              }
              if(_attrs) {
                attrs.transitions.push({
                  easing: transition.easing,
                  attrs: _attrs,
                  delay: transition.delay[i],
                  duration: transition.duration[i]});
              }
            });
          }
          Object.assign(styleRules[selectorText], attrs);
          // console.log(styleRules[selectorText]);
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
              if(k in attrs) delete attrs[k];
            });
          });
          delete attrs.transitions;
        }
        selectors.push(selector);
      }
    });
    const matchedSelectors = selectors.join();
    if(el[_matchedSelectors] !== matchedSelectors) {
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
          return transition.attr(attrs);
        })).then(() => {
          el.dispatchEvent('transitionend', {}, true, true);
        });
      }
      el.dispatchEvent('stylechange', {oldSelectors: el[_matchedSelectors], newSelectors: matchedSelectors});
      el[_matchedSelectors] = matchedSelectors;
      el.attributes.clearStyle();
      el.attributes.__styleTag = true;
      el.attr(attrs);
      el.attributes.__styleTag = false;
      if(el.forceUpdate) el.forceUpdate();
    }
  },
  get relatedAttributes() {
    return relatedAttributes;
  },
};
