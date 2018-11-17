import {isMatched} from './selector';

const cssWhat = require('css-what');
const cssRules = [];

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
  borderRadius: true,
  boxSizing: true,
  display: true,
  padding: true,
  margin: true,
  zIndex: true,
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
};

function toCamel(str) {
  return str.replace(/([^-])(?:-+([^-]))/g, ($0, $1, $2) => {
    return $1 + $2.toUpperCase();
  });
}

function resolveToken(token) {
  let ret = '',
    priority = 0;

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
            ret += resolveToken(token).token;
          });
        });
      }
    } else {
      ret = `:${token.name}`;
    }
    priority = token.name !== 'not' ? 1000 : 0;
  } else if(token.type === 'pseudo-element') {
    ret = `::${token.name}`;
    priority = 1;
  } else if(token.type === 'attribute') {
    const {name, action, value} = token;

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
  return {token: ret, priority};
}

let order = 0;

export default {
  add(rules) {
    Object.entries(rules).forEach(([rule, attributes]) => {
      const selectors = cssWhat(rule);
      for(let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];
        const tokens = selector.map((token) => {
          return resolveToken(token);
        });
        const r = tokens.reduce((a, b) => {
          a.priority += b.priority;
          a.tokens.push(b.token);
          return a;
        }, {tokens: [], priority: 0});
        const rule = {
          selector: r.tokens.join(''),
          priority: r.priority,
          attributes,
          order: order++,
        };
        cssRules.push(rule);
      }
    });
    cssRules.sort((a, b) => {
      const d = a.priority - b.priority;
      return d !== 0 ? d : a.order - b.order;
    });
  },
  fromDocumentCSS() {
    if(typeof document === 'undefined') return;
    const stylesheets = document.styleSheets;
    if(stylesheets) {
      const styleRules = {};
      for(let i = 0; i < stylesheets.length; i++) {
        const rules = stylesheets[i].cssRules || stylesheets[i].rules;
        for(let j = 0; j < rules.length; j++) {
          const rule = rules[j];
          const selectorText = rule.selectorText;
          const styleAttrs = [...rule.styleMap];
          const attrs = {},
            reserved = {};
          let border = null;
          styleAttrs.forEach(([key, value]) => {
            if(key.indexOf('--sprite-') === 0) {
              key = key.replace('--sprite-', '');
              key = toCamel(key);
              if(key === 'borderStyle') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.style = value;
              }
              if(key === 'borderWidth') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.width = parseFloat(value);
              }
              if(key === 'borderColor') {
                border = border || {width: 1, color: 'rgba(0,0,0,0)'};
                border.color = value;
              }
              value = value[0][0].trim().replace(/px$/, '');
              reserved[key] = value;
            } else {
              key = toCamel(key);
              if(key in CSSGetter) {
                if(typeof CSSGetter[key] === 'function') {
                  value = CSSGetter[key](value);
                } else {
                  value = value[0].toString().replace(/px$/, '');
                }
                if(key === 'backgroundColor') key = 'bgcolor';
                if(key === 'fontVariantCaps') key = 'fontVariant';
                if(key !== 'borderRadius' && /^border/.test(key)) {
                  key = key.replace(/^border(Top|Right|Bottom|Left)/, '').toLowerCase();
                  if(key === 'color' && value === 'initial') value = 'rgba(0,0,0,0)';
                  if(key === 'width') value = parseFloat(value);
                  border = border || {};
                  border[key] = value;
                } else {
                  attrs[key] = value;
                }
              }
            }
          });
          styleRules[selectorText] = styleRules[selectorText] || {};
          Object.assign(styleRules[selectorText], attrs, {border}, reserved);
        }
      }
      // console.log(styleRules);
      this.add(styleRules);
    }
  },
  computeStyle(el) {
    if(!el.layer || !el.attributes) return {};
    const attrs = {};
    cssRules.forEach((rule) => {
      const {selector, attributes} = rule;
      if(isMatched(el, selector)) {
        Object.assign(attrs, attributes);
      }
    });
    Object.assign(attrs, el.style);
    el.attributes.clearStyle();
    el.attributes.__styleTag = true;
    el.attr(attrs);
    el.attributes.__styleTag = false;
  },
};
