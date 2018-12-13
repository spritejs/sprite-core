"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _set2 = _interopRequireDefault(require("@babel/runtime/helpers/set"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _utils = require("./utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _filters = _interopRequireDefault(require("./filters"));

var _class, _class2, _class3, _temp;

var _texturesCache = Symbol('_texturesCache');

var _images = Symbol('_images');

var TextureAttr = (_class =
/*#__PURE__*/
function (_BaseSprite$Attr) {
  (0, _inherits2.default)(TextureAttr, _BaseSprite$Attr);

  function TextureAttr(subject) {
    var _this;

    (0, _classCallCheck2.default)(this, TextureAttr);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TextureAttr).call(this, subject));

    _this.setDefault({
      textures: [],
      enableCache: true
    });

    return _this;
  }
  /*
    {
      image: ...,  //texture resource
      srcRect: ..., //texture clip
      rect: ....,  //texture in sprite offset
      filter: ...  //texture filters
    }
   */


  (0, _createClass2.default)(TextureAttr, [{
    key: "loadTextures",
    value: function loadTextures(textures) {
      var subject = this.subject; // adaptive textures

      var width = 0,
          height = 0;
      subject.images = textures.map(function (texture) {
        var image = texture.image,
            rect = texture.rect,
            srcRect = texture.srcRect;
        var w, h;

        if (rect) {
          w = rect[2] + rect[0];
          h = rect[3] + rect[1];
        } else if (srcRect) {
          w = srcRect[2];
          h = srcRect[3];
        } else {
          w = image.width;
          h = image.height;
        }

        if (width < w) {
          width = w;
        }

        if (height < h) {
          height = h;
        }

        delete texture.image;
        return image;
      });
      var texturesSize = subject.texturesSize;

      if (!texturesSize || texturesSize[0] !== width || texturesSize[1] !== height) {
        var attrSize = subject.attrSize;

        if (attrSize[0] === '' || attrSize[1] === '') {
          subject.reflow();
          subject.clearLayout();
        }
      }

      subject.texturesSize = [width, height];
      return textures;
    }
  }, {
    key: "textures",
    set: function set(textures) {
      if (!Array.isArray(textures)) {
        textures = [textures];
      }

      textures = textures.map(function (texture) {
        if (!texture.image) {
          texture = {
            image: texture
          };
        }

        texture.__tag = (0, _utils.generateID)(texture.image); // prevent JSON.stringify ignorance

        return texture;
      });
      this.loadTextures(textures);
      this.set('textures', textures);
    }
  }]);
  return TextureAttr;
}(_basesprite.default.Attr), ((0, _applyDecoratedDescriptor2.default)(_class.prototype, "textures", [_utils.attr], Object.getOwnPropertyDescriptor(_class.prototype, "textures"), _class.prototype)), _class);
var Sprite = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_BaseSprite) {
  (0, _inherits2.default)(Sprite, _BaseSprite);

  /**
    new Sprite({
      attr: {
        ...
      },
      attributeChangedCallback: function(prop, oldValue, newValue){
       }
    })
   */
  function Sprite(attr) {
    var _this2;

    (0, _classCallCheck2.default)(this, Sprite);

    if (attr && attr.constructor !== Object) {
      attr = {
        textures: [attr]
      };
    }

    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Sprite).call(this));
    _this2[_texturesCache] = new Map();

    if (attr) {
      _this2.attr(attr);
    }

    return _this2;
  }

  (0, _createClass2.default)(Sprite, [{
    key: "cloneNode",
    value: function cloneNode() {
      var _this3 = this;

      var node = (0, _get2.default)((0, _getPrototypeOf2.default)(Sprite.prototype), "cloneNode", this).call(this);

      if (this.images) {
        node.textures = this.textures.map(function (texture, i) {
          texture.image = _this3.images[i];
          return texture;
        });
      }

      return node;
    }
  }, {
    key: "pointCollision",
    value: function pointCollision(evt) {
      var _this4 = this;

      if ((0, _get2.default)((0, _getPrototypeOf2.default)(Sprite.prototype), "pointCollision", this).call(this, evt)) {
        var textures = this.textures;

        if (textures) {
          var offsetX = evt.offsetX,
              offsetY = evt.offsetY;
          if (offsetX == null && offsetY == null) return true;
          evt.targetTextures = [];

          var _this$attr = this.attr('anchor'),
              _this$attr2 = (0, _slicedToArray2.default)(_this$attr, 2),
              anchorX = _this$attr2[0],
              anchorY = _this$attr2[1],
              _this$contentSize = (0, _slicedToArray2.default)(this.contentSize, 2),
              width = _this$contentSize[0],
              height = _this$contentSize[1];

          offsetX += width * anchorX;
          offsetY += height * anchorY;
          textures.forEach(function (texture) {
            var _ref = texture.rect || [0, 0].concat((0, _toConsumableArray2.default)(_this4.innerSize)),
                _ref2 = (0, _slicedToArray2.default)(_ref, 4),
                x = _ref2[0],
                y = _ref2[1],
                w = _ref2[2],
                h = _ref2[3];

            if (offsetX >= x && offsetX - x < w && offsetY >= y && offsetY - y < h) {
              // touched textures
              evt.targetTextures.push(texture);
            }
          });
        }

        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render(t, drawingContext) {
      var _this5 = this;

      (0, _get2.default)((0, _getPrototypeOf2.default)(Sprite.prototype), "render", this).call(this, t, drawingContext);
      var textures = this.textures;
      var cliped = !this.attr('clipOverflow');

      if (this.images && this.images.length) {
        textures.forEach(function (texture, i) {
          var img = _this5.images[i];

          var _this5$contentSize = (0, _slicedToArray2.default)(_this5.contentSize, 2),
              w = _this5$contentSize[0],
              h = _this5$contentSize[1];

          var rect = texture.rect || [0, 0, w, h];
          var srcRect = texture.srcRect;

          if (!cliped && texture.rect && (rect[2] > w || rect[3] > h)) {
            cliped = true;
            drawingContext.beginPath();
            drawingContext.rect(0, 0, w, h);
            drawingContext.clip();
          }

          drawingContext.save();

          if (texture.filter) {
            (0, _utils.setDeprecation)('texture.filter', 'Instead use sprite.attr({filter}).');
            var imgRect = srcRect ? [0, 0, srcRect[2], srcRect[3]] : [0, 0, img.width, img.height];
            var sx = rect[2] / imgRect[2],
                sy = rect[3] / imgRect[3];
            drawingContext.filter = _filters.default.compile(texture.filter);

            if (srcRect) {
              drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray2.default)(srcRect), [sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * srcRect[2], sy * srcRect[3]]));
            } else {
              drawingContext.drawImage(img, sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * img.width, sy * img.height);
            }
          } else if (srcRect) {
            drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray2.default)(srcRect), (0, _toConsumableArray2.default)(rect)));
          } else {
            drawingContext.drawImage.apply(drawingContext, [img].concat((0, _toConsumableArray2.default)(rect)));
          }

          drawingContext.restore();
        });
      }
    }
  }, {
    key: "images",
    set: function set(images) {
      this[_images] = images;
    },
    get: function get() {
      return this[_images];
    }
  }, {
    key: "textures",
    set: function set(textures) {
      this.attr('textures', textures);
    },
    get: function get() {
      return this.attr('textures');
    } // override to adapt textures' size

  }, {
    key: "contentSize",
    get: function get() {
      var _this$attrSize = (0, _slicedToArray2.default)(this.attrSize, 2),
          width = _this$attrSize[0],
          height = _this$attrSize[1];

      var boxSize = this.texturesSize || [0, 0];
      var w = width,
          h = height;

      if (width === '') {
        w = boxSize[0] | 0;

        if (height !== '' && boxSize[1]) {
          w *= height / boxSize[1];
        }
      }

      if (height === '') {
        h = boxSize[1] | 0;

        if (width !== '' && boxSize[0]) {
          h *= width / boxSize[0];
        }
      }

      return [w, h];
    }
  }, {
    key: "cache",
    get: function get() {
      var bg = this.attr('bgcolor') || this.attr('gradients').bgcolor;

      if (!bg && this.textures.length <= 1) {
        return false;
      }

      return (0, _get2.default)((0, _getPrototypeOf2.default)(Sprite.prototype), "cache", this);
    },
    set: function set(context) {
      (0, _set2.default)((0, _getPrototypeOf2.default)(Sprite.prototype), "cache", context, this, true);
    }
  }]);
  return Sprite;
}(_basesprite.default), (0, _defineProperty2.default)(_class3, "Attr", TextureAttr), _temp), ((0, _applyDecoratedDescriptor2.default)(_class2.prototype, "contentSize", [_utils.flow], Object.getOwnPropertyDescriptor(_class2.prototype, "contentSize"), _class2.prototype)), _class2);
exports.default = Sprite;