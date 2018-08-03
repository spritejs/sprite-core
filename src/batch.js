import {cacheContextPool} from './helpers/render';

const _batch = Symbol('batch');

export default class Batch {
  constructor(layer) {
    this.layer = layer;
    this[_batch] = new Set();
    this.cache = null;
  }

  get baseNode() {
    const batchNodes = [...this[_batch]];
    let baseNode = batchNodes[0],
      zOrder = Infinity,
      zIndex = Infinity;

    for(let i = 0; i < batchNodes.length; i++) {
      const node = batchNodes[i];
      if(zIndex > node.zIndex) {
        zIndex = node.zIndex;
        zOrder = node.zOrder;
        baseNode = node;
      } else if(zIndex === node.zIndex && zOrder > node.zOrder) {
        zOrder = node.zOrder;
        baseNode = node;
      }
    }
    return baseNode;
  }

  add(...nodes) {
    nodes.forEach((node) => {
      if(!node.layer || node.layer !== this.layer) {
        /* istanbul ignore next  */
        throw new Error('Batch node must append to this layer first!');
      }
      if(node[_batch]) {
        /* istanbul ignore next  */
        throw new Error('Node already batched!');
      }
      const that = this;
      Object.defineProperty(node, 'cache', {
        configurable: true,
        get() {
          return that.cache;
        },
        set(context) {
          if(that.baseNode === this) {
            if(that.cache && context !== that.cache) {
              cacheContextPool.put(that.cache);
            }
            that.cache = context;
          } else if(context == null) {
            throw new Error('Cannot set non-cachable attributes to batch members.Use batch.baseNode.attr(...)');
          }
        },
      });
      Object.defineProperty(node, 'cachePriority', {
        configurable: true,
        get() {
          return Infinity;
        },
      });
      node[_batch] = this;
      this[_batch].add(node);
    });
  }

  remove(...nodes) {
    nodes.forEach((node) => {
      if(this[_batch].has(node)) {
        delete node[_batch];
        delete node.cache;
        this[_batch].delete(node);
      }
    });
  }
}