import BaseSprite from './basesprite';
import {registerNodeType} from './nodetype';

class EmptyAttr {
  constructor(node) {
    this.subject = node;
  }

  get attrs() {
    const attrs = Object.assign({}, this);
    delete attrs.subject;
    return attrs;
  }

  serialize() {
    const attrs = this.attrs;
    delete attrs.id;
    return JSON.stringify(attrs);
  }

  merge(attrs) {
    if(typeof attrs === 'string') {
      attrs = JSON.parse(attrs);
    }
    return Object.assign(this, attrs);
  }
}

class DataNode extends BaseSprite {
  static Attr = EmptyAttr;

  isVisible() {
    return false;
  }

  draw() {
    //  empty;
  }
}

registerNodeType('data', DataNode, true);

export default DataNode;
