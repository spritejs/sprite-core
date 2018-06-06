import querySelectorLimits from './helpers/selector'

const nodeTypes = new Map()

/* istanbul ignore next  */
const ownerDocumentDescriptor = {
  get() {
    const that = this
    return {
      createElementNS(uri, name) {
        const sprite = createNode(name)
        if(sprite) {
          return that.appendChild(sprite)
        }
        return null
      },
    }
  },
}

const elementProto = {
  getElementById(id) {
    const children = this.children
    for(let i = 0; i < children.length; i++) {
      const child = children[i]
      if(child.id === id) {
        return child
      }
    }
    return null
  },
  getElementsByName(name) {
    return this.children.filter(c => c.name === name)
  },
  /*
    d3-friendly
    *, nodeType, #id, :name, {nodeType: checker}
  */
  querySelector(selector) {
    const children = this.children

    let ret = null

    if(!selector || selector === '*') {
      ret = children[0]
    } else if(typeof selector === 'string') {
      // querySelector('nodeType')
      // querySelector('#id')
      // querySelector(':name')
      if(selector.startsWith('#')) {
        ret = this.getElementById(selector.slice(1))
      } else if(selector.startsWith(':')) {
        const name = selector.slice(1)
        const nodeList = querySelectorLimits(children, c => c.name === name, 1)
        if(nodeList.length) ret = nodeList[0]
      } else {
        const nodeType = getNodeType(selector)
        if(nodeType) {
          const nodeList = querySelectorLimits(children, c => c instanceof nodeType, 1)
          if(nodeList.length) ret = nodeList[0]
        }
      }
    } else {
      /*
        {
          nodeType: () => {...},   //checker
        }
      */
      const nodeList = querySelectorLimits(children, (child) => {
        return Object.entries(selector).some(([type, checker]) => {
          const nodeType = getNodeType(type)
          return nodeType && child instanceof nodeType && checker.call(this, child)
        })
      }, 1)
      if(nodeList.length) ret = nodeList[0]
    }
    return ret
  },
  querySelectorAll(selector) {
    let ret = []
    const children = this.children

    if(!selector || selector === '*') {
      ret = [...children]
    } else if(typeof selector === 'string') {
      if(selector.startsWith('#')) {
        const sprite = this.getElementById(selector.slice(1))
        ret = sprite ? [sprite] : []
      }
      if(selector.startsWith(':')) {
        ret = this.getElementsByName(selector.slice(1))
      }
      const nodeType = getNodeType(selector)
      if(nodeType) {
        ret = querySelectorLimits(children, c => c instanceof nodeType)
      }
    } else {
      ret = querySelectorLimits(children, (child) => {
        return Object.entries(selector).some(([type, checker]) => {
          const nodeType = getNodeType(type)
          if(!nodeType || !(child instanceof nodeType)) {
            return false
          }
          return checker.call(this, child)
        })
      })
    }
    return ret
  },
}

export function registerNodeType(type, Class, isQuerable = false) {
  Object.defineProperty(Class.prototype, 'nodeType', {
    get() {
      return type
    },
  })
  nodeTypes.set(type, Class)
  if(isQuerable && !Class.prototype.ownerDocument) {
    Object.defineProperty(Class.prototype, 'ownerDocument', ownerDocumentDescriptor)
    Class.prototype.namespaceURI = `http://spritejs.org/${type}`
    Object.assign(Class.prototype, elementProto)
  }
}

export function createNode(type, ...args) {
  const Class = nodeTypes.get(type)
  if(Class) {
    return new Class(...args)
  }
  return null
}

function getNodeType(type) {
  return nodeTypes.get(type)
}
