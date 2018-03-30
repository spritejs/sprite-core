const nodeTypes = new Map()

export function registerNodeType(type, Class, isQuerable = false) {
  Object.defineProperty(Class.prototype, 'nodeType', {
    get() {
      return type
    },
  })
  nodeTypes.set(type, Class)
  if(isQuerable && !Class.prototype.ownerDocument) {
    Object.defineProperty(Class.prototype, 'ownerDocument', {
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
    })
    Object.assign(Class.prototype, {
      namespaceURI: `http://spritejs.org/${type}`,
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
        *, nodeType, checker
      */
      querySelector(selector) {
        const children = this.children

        if(!selector || selector === '*') {
          return children[0]
        } else if(typeof selector === 'string') {
          // querySelector('nodeType')
          // querySelector('#id')
          // querySelector(':name')

          if(selector.startsWith('#')) {
            return this.getElementById(selector.slice(1))
          }
          if(selector.startsWith(':')) {
            const name = selector.slice(1)

            for(let i = 0; i < children.length; i++) {
              const child = children[i]
              if(child.name === name) {
                return child
              }
            }
            return null
          }
          const nodeType = getNodeType(selector)
          if(nodeType) {
            for(let i = 0; i < children.length; i++) {
              const child = children[i]
              if(child instanceof nodeType) {
                return child
              }
            }
            return null
          }
          return null
        }
        for(let i = 0; i < children.length; i++) {
          const child = children[i]
          const sel = Object.entries(selector)
          for(let j = 0; j < sel.length; j++) {
            const [type, checker] = sel[j]
            const nodeType = getNodeType(type)
            if(nodeType && child instanceof nodeType && checker.call(this, child)) {
              return child
            }
          }
        }
        return null
      },
      querySelectorAll(selector) {
        if(!selector || selector === '*') {
          return this.children
        } else if(typeof selector === 'string') {
          if(selector.startsWith('#')) {
            const sprite = this.getElementById(selector.slice(1))
            return sprite ? [sprite] : []
          }
          if(selector.startsWith(':')) {
            return this.getElementsByName(selector.slice(1))
          }
          const nodeType = getNodeType(selector)
          if(nodeType) {
            return this.children.filter(child => child instanceof nodeType)
          }
          return null
        }
        return this.children.filter((child) => {
          const sel = Object.entries(selector)
          for(let i = 0; i < sel.length; i++) {
            const [type, checker] = sel[i]
            const nodeType = getNodeType(type)
            if(!nodeType || !(child instanceof nodeType)) {
              return false
            }
            if(!checker.call(this, child)) {
              return false
            }
          }
          return true
        })
      },
    })
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
