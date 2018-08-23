const nodeTypes = new Map();

/* istanbul ignore next  */
const ownerDocumentDescriptor = {
  get() {
    const that = this;
    return {
      createElementNS(uri, name) {
        const sprite = createNode(name);
        if(sprite) {
          return that.appendChild(sprite);
        }
        return null;
      },
    };
  },
};

function getAllSubNodes(parent) {
  const children = parent.children;
  return children.reduce((list, child) => {
    if(child.children) {
      return [...list, child, ...getAllSubNodes(child)];
    }
    return [...list, child];
  }, []);
}

function querySelectorLimits(node, functor, limits = Infinity) {
  const nodeList = [];
  const elements = getAllSubNodes(node);
  for(let i = 0; i < elements.length; i++) {
    const node = elements[i];
    if(functor(node)) {
      nodeList.push(node);
      if(limits === nodeList.length) {
        break;
      }
    }
  }
  return nodeList;
}

const elementProto = {
  getElementById(id) {
    const children = getAllSubNodes(this);
    for(let i = 0; i < children.length; i++) {
      const child = children[i];
      if(child.id === id) {
        return child;
      }
    }
    return null;
  },
  getElementsByName(name) {
    return getAllSubNodes(this).filter(c => c.name === name);
  },
  /*
    d3-friendly
    *, nodeType, #id, :name, {nodeType: checker}
  */
  querySelector(selector) {
    let ret = null;

    if(!selector || selector === '*') {
      ret = this.children[0];
    } else if(typeof selector === 'string') {
      // querySelector('nodeType')
      // querySelector('#id')
      // querySelector(':name')
      if(selector.startsWith('#')) {
        ret = this.getElementById(selector.slice(1));
      } else if(selector.startsWith(':')) {
        const name = selector.slice(1);
        const nodeList = querySelectorLimits(this, c => c.name === name, 1);
        if(nodeList.length) ret = nodeList[0];
      } else {
        const nodeType = getNodeType(selector);
        if(nodeType) {
          const nodeList = querySelectorLimits(this, c => c instanceof nodeType, 1);
          if(nodeList.length) ret = nodeList[0];
        }
      }
    } else {
      /*
        {
          nodeType: () => {...},   //checker
        }
      */
      const nodeList = querySelectorLimits(this, (child) => {
        return Object.entries(selector).some(([type, checker]) => {
          const nodeType = getNodeType(type);
          return nodeType && child instanceof nodeType && checker.call(this, child);
        });
      }, 1);
      if(nodeList.length) ret = nodeList[0];
    }
    return ret;
  },
  querySelectorAll(selector) {
    let ret = [];

    if(!selector || selector === '*') {
      ret = getAllSubNodes(this);
    } else if(typeof selector === 'string') {
      if(selector.startsWith('#')) {
        const sprite = this.getElementById(selector.slice(1));
        ret = sprite ? [sprite] : [];
      }
      if(selector.startsWith(':')) {
        ret = this.getElementsByName(selector.slice(1));
      }
      const nodeType = getNodeType(selector);
      if(nodeType) {
        ret = querySelectorLimits(this, c => c instanceof nodeType);
      }
    } else {
      ret = querySelectorLimits(this, (child) => {
        return Object.entries(selector).some(([type, checker]) => {
          const nodeType = getNodeType(type);
          if(!nodeType || !(child instanceof nodeType)) {
            return false;
          }
          return checker.call(this, child);
        });
      });
    }
    return ret;
  },
};

export function registerNodeType(type, Class, isQuerable = false) {
  const nodeType = type.toLowerCase();
  const tagName = type.toUpperCase();
  Object.defineProperty(Class.prototype, 'nodeType', {
    get() {
      return nodeType;
    },
  });
  // friendly to snabbdom
  Object.defineProperty(Class.prototype, 'tagName', {
    get() {
      return tagName;
    },
  });
  nodeTypes.set(nodeType, Class);
  if(isQuerable && !Class.prototype.ownerDocument) {
    Object.defineProperty(Class.prototype, 'ownerDocument', ownerDocumentDescriptor);
    Class.prototype.namespaceURI = `http://spritejs.org/${type}`;
    Object.assign(Class.prototype, elementProto);
  }
}

export function createNode(type, ...args) {
  const Class = getNodeType(type);
  if(Class) {
    return new Class(...args);
  }
  return null;
}

export function createElement(type, attrs, content) {
  const Node = typeof type === 'string' ? getNodeType(type) : type;

  if(!Node) return null;

  const sprite = new Node(typeof content === 'string' ? content : undefined);

  if(attrs !== null) {
    sprite.attr(attrs);
  }

  if(typeof content === 'object' && sprite.append) {
    if(content instanceof Array) {
      sprite.append(...content);
    } else {
      sprite.append(content);
    }
  }
  return sprite;
}

function getNodeType(type) {
  return nodeTypes.get(type.toLowerCase());
}
