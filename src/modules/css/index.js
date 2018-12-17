import BaseNode from '../../core/basenode';
import Layer from '../../core/layer';
import stylesheet from './stylesheet';

Layer.prototype.fromDocumentCSS = function () {
  stylesheet.fromDocumentCSS();
};

BaseNode.prototype.restyle = function () {
  stylesheet.computeStyle(this);
};

export default stylesheet;
