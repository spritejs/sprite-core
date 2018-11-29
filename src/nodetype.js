import {querySelector, querySelectorAll} from './selector';

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

const elementProto = {
  getElementById(id) {
    return querySelector(`#${id}`, this);
  },
  getElementsByName(name) {
    return querySelectorAll(`[name="${name}"]`, this);
  },
  getElementsByClassName(className) {
    return querySelectorAll(`.${className}`, this);
  },
  getElementsByTagName(tagName) {
    return querySelectorAll(tagName, this);
  },
  /*
    d3-friendly
    *, nodeType, #id, :name, {nodeType: checker}
  */
  querySelector(selector) {
    return querySelector(selector, this);
  },
  querySelectorAll(selector) {
    return querySelectorAll(selector, this);
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
  Object.defineProperty(Class.prototype, 'nodeName', {
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

export function isValidNodeType(type) {
  return !!getNodeType(type);
}
