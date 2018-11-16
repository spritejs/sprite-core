import {isMatched} from './selector';

const cssWhat = require('css-what');
const cssRules = [];

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
  computeStyle(el) {
    if(!el.layer) return {};
    cssRules.forEach((rule) => {
      const {selector, attributes} = rule;
      if(isMatched(el, selector)) {
        el.attr(attributes);
      }
    });
  },
};
