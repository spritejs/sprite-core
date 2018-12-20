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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _decorate2 = _interopRequireDefault(require("@babel/runtime/helpers/decorate"));

var _utils = require("../utils");

var _basesprite = _interopRequireDefault(require("./basesprite"));

var _filters = _interopRequireDefault(require("./filters"));

var _texturesCache = Symbol('_texturesCache');

var _images = Symbol('_images');

var TextureAttr = (0, _decorate2.default)(null, function (_initialize, _BaseSprite$Attr) {
  var TextureAttr =
  /*#__PURE__*/
  function (_BaseSprite$Attr2) {
    (0, _inherits2.default)(TextureAttr, _BaseSprite$Attr2);

    function TextureAttr() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, TextureAttr);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TextureAttr)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _initialize((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      return _this;
    }

    return TextureAttr;
  }(_BaseSprite$Attr);

  return {
    F: TextureAttr,
    d: [{
      kind: "field",
      decorators: [_utils.attr],
      key: "enableCache",
      value: function value() {
        return true;
      }
    }, {
      kind: "set",
      decorators: [(0, _utils.attr)({
        value: []
      })],
      key: "textures",
      value: function value(textures) {
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
    }, {
      kind: "method",
      key: "loadTextures",
      value: function value(textures) {
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
    }]
  };
}, _basesprite.default.Attr);
var Sprite = (0, _decorate2.default)(null, function (_initialize2, _BaseSprite) {
  var Sprite =
  /*#__PURE__*/
  function (_BaseSprite2) {
    (0, _inherits2.default)(Sprite, _BaseSprite2);

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

      _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(Sprite).call(this));

      _initialize2((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)));

      _this2[_texturesCache] = new Map();

      if (attr) {
        _this2.attr(attr);
      }

      return _this2;
    }

    return Sprite;
  }(_BaseSprite);

  return {
    F: Sprite,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",
      value: function value() {
        return TextureAttr;
      }
    }, {
      kind: "method",
      key: "cloneNode",
      value: function value() {
        var _this3 = this;

        var node = (0, _get2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "cloneNode", this).call(this);

        if (this.images) {
          node.textures = this.textures.map(function (texture, i) {
            texture.image = _this3.images[i];
            return texture;
          });
        }

        return node;
      }
    }, {
      kind: "set",
      key: "images",
      value: function value(images) {
        this[_images] = images;
      }
    }, {
      kind: "get",
      key: "images",
      value: function value() {
        return this[_images];
      }
    }, {
      kind: "set",
      key: "textures",
      value: function value(textures) {
        this.attr('textures', textures);
      }
    }, {
      kind: "get",
      key: "textures",
      value: function value() {
        return this.attr('textures');
      }
    }, {
      kind: "get",
      decorators: [_utils.flow],
      key: "contentSize",
      value: function value() {
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
      kind: "method",
      key: "pointCollision",
      value: function value(evt) {
        var _this4 = this;

        if ((0, _get2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "pointCollision", this).call(this, evt)) {
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
      kind: "get",
      key: "cache",
      value: function value() {
        var bg = this.attr('bgcolor') || this.attr('gradients').bgcolor;

        if (!bg && this.textures.length <= 1) {
          return false;
        }

        return (0, _get2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "cache", this);
      }
    }, {
      kind: "set",
      key: "cache",
      value: function value(context) {
        (0, _set2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "cache", context, this, true);
      }
    }, {
      kind: "method",
      key: "render",
      value: function value(t, drawingContext) {
        var _this5 = this;

        (0, _get2.default)((0, _getPrototypeOf3.default)(Sprite.prototype), "render", this).call(this, t, drawingContext);
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
    }]
  };
}, _basesprite.default);
exports.default = Sprite;