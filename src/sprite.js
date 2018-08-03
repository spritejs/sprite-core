import {attr, flow, setDeprecation} from 'sprite-utils';
import BaseSprite from './basesprite';
import filters from './filters';

import {registerNodeType} from './nodetype';
import {cacheContextPool} from './helpers/render';

const _texturesCache = Symbol('_texturesCache');
const _images = Symbol('_images');

class TextureAttr extends BaseSprite.Attr {
  constructor(subject) {
    super(subject);
    this.setDefault({
      textures: [],
    });
  }

  /*
    {
      image: ...,  //texture resource
      srcRect: ..., //texture clip
      rect: ....,  //texture in sprite offset
      filter: ...  //texture filters
    }
   */
  @attr
  set textures(textures) {
    if(!Array.isArray(textures)) {
      textures = [textures];
    }

    textures = textures.map((texture) => {
      if(!texture.image) {
        texture = {image: texture};
      }
      return texture;
    });

    this.loadTextures(textures);
    this.set('textures', textures);
  }

  loadTextures(textures) {
    const subject = this.subject;

    // adaptive textures
    let width = 0,
      height = 0;

    subject.images = textures.map((texture) => {
      const {image, rect, srcRect} = texture;
      let w,
        h;
      if(rect) {
        w = rect[2] + rect[0];
        h = rect[3] + rect[1];
      } else if(srcRect) {
        w = srcRect[2];
        h = srcRect[3];
      } else {
        w = image.width;
        h = image.height;
      }
      if(width < w) {
        width = w;
      }
      if(height < h) {
        height = h;
      }
      delete texture.image;
      return image;
    });
    const texturesSize = subject.texturesSize;
    if(!texturesSize || texturesSize[0] !== width || texturesSize[1] !== height) {
      const attrSize = subject.attrSize;
      if(attrSize[0] === '' || attrSize[1] === '') {
        subject.reflow();
      }
    }
    subject.texturesSize = [width, height];
    return textures;
  }
}

export default class Sprite extends BaseSprite {
  static Attr = TextureAttr

  /**
    new Sprite({
      attr: {
        ...
      },
      attributeChangedCallback: function(prop, oldValue, newValue){

      }
    })
   */
  constructor(attr) {
    if(attr && attr.constructor !== Object) {
      attr = {textures: [attr]};
    }
    super();
    this[_texturesCache] = new Map();
    if(attr) {
      this.attr(attr);
    }
  }

  cloneNode() {
    const node = super.cloneNode();
    if(this.images) {
      node.textures = this.textures.map((texture, i) => {
        texture.image = this.images[i];
        return texture;
      });
    }
    return node;
  }

  set images(images) {
    this[_images] = images;
  }

  get images() {
    return this[_images];
  }

  set textures(textures) {
    this.attr('textures', textures);
  }

  get textures() {
    return this.attr('textures');
  }

  // override to adapt textures' size
  @flow
  get contentSize() {
    const [width, height] = this.attrSize;
    const boxSize = this.texturesSize || [0, 0];

    let [w, h] = [width, height];

    if(width === '') {
      w = boxSize[0] | 0;
      if(height !== '' && boxSize[1]) {
        w *= height / boxSize[1];
      }
    }
    if(height === '') {
      h = boxSize[1] | 0;
      if(width !== '' && boxSize[0]) {
        h *= width / boxSize[0];
      }
    }

    return [w, h];
  }

  pointCollision(evt) {
    if(super.pointCollision(evt)) {
      const textures = this.textures;

      if(textures) {
        let {offsetX, offsetY} = evt;
        evt.targetTextures = [];

        const [anchorX, anchorY] = this.attr('anchor'),
          [width, height] = this.contentSize;

        offsetX += width * anchorX;
        offsetY += height * anchorY;

        textures.forEach((texture) => {
          const [x, y, w, h] = texture.rect || [0, 0, ...this.innerSize];
          if(offsetX >= x && offsetX - x < w
             && offsetY >= y && offsetY - y < h) {
            // touched textures
            evt.targetTextures.push(texture);
          }
        });
      }
      return true;
    }
    return false;
  }

  set cache(context) {
    if(context == null) {
      cacheContextPool.put(...this[_texturesCache].values());
      this[_texturesCache].clear();
      return;
    }
    const key = JSON.stringify(this.textures),
      cacheMap = this[_texturesCache];

    if(!cacheMap.has(key)) {
      cacheMap.set(key, context);
    }
  }

  get cache() {
    const key = JSON.stringify(this.textures),
      cacheMap = this[_texturesCache];
    if(cacheMap.has(key)) {
      return cacheMap.get(key);
    }
    return null;
  }

  render(t, drawingContext) {
    super.render(t, drawingContext);
    const bg = this.attr('bgcolor') || this.attr('gradients').bgcolor;
    if(!bg && this.textures.length <= 1) {
      this.cachePriority = 0;
    }
    const textures = this.textures;
    let cliped = false;
    if(this.images && this.images.length) {
      textures.forEach((texture, i) => {
        const img = this.images[i];
        const [w, h] = this.contentSize;
        const rect = texture.rect || [0, 0, w, h];
        const srcRect = texture.srcRect;

        if(!cliped && texture.rect && (rect[2] - rect[0] > w || rect[3] - rect[1] > h)) {
          cliped = true;
          drawingContext.beginPath();
          drawingContext.rect(0, 0, w, h);
          drawingContext.clip();
        }

        drawingContext.save();

        if(texture.filter) {
          setDeprecation('texture.filter', 'Instead use sprite.attr({filter}).');
          const imgRect = srcRect ? [0, 0, srcRect[2], srcRect[3]] : [0, 0, img.width, img.height];

          const sx = rect[2] / imgRect[2],
            sy = rect[3] / imgRect[3];

          drawingContext.filter = filters.compile(texture.filter);

          if(srcRect) {
            drawingContext.drawImage(img, ...srcRect, sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * srcRect[2], sy * srcRect[3]);
          } else {
            drawingContext.drawImage(img, sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * img.width, sy * img.height);
          }
        } else if(srcRect) {
          drawingContext.drawImage(img, ...srcRect, ...rect);
        } else {
          drawingContext.drawImage(img, ...rect);
        }

        drawingContext.restore();
      });
    }
  }
}

registerNodeType('sprite', Sprite);
