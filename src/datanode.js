import BaseSprite from './basesprite';
import {registerNodeType} from './nodetype';

class DataAttr extends BaseSprite.Attr {
  constructor(subject) {
    super(subject);
    this.setDefault({
      display: 'none',
    });
  }
}

class DataNode extends BaseSprite {
  static Attr = DataAttr;
}

registerNodeType('data', DataNode, true);

export default DataNode;
