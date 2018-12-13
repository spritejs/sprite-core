import BaseNode from '../../basenode';
import Layer from '../../layer';
import stylesheet from './stylesheet';

Layer.prototype.fromDocumentCSS = function () {
  stylesheet.fromDocumentCSS();
};

BaseNode.prototype.restyle = function () {
  stylesheet.computeStyle(this);
};

export default stylesheet;
