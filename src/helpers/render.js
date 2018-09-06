export function drawRadiusBox(context, {x, y, w, h, r}) {
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

/* istanbul ignore next  */
function gradientBox(angle, rect) {
  const [x, y, w, h] = rect;

  angle %= 360;
  if(angle < 0) {
    angle += 360;
  }

  let ret = [x, y, x + w, y + h];
  if(angle >= 0 && angle < 90) {
    const tan = Math.tan(Math.PI * angle / 180);

    let d = tan * w;

    if(d <= h) {
      ret = [x, y, x + w, y + d];
    } else {
      d = h / tan;
      ret = [x, y, x + d, y + h];
    }
  } else if(angle >= 90 && angle < 180) {
    const tan = Math.tan(Math.PI * (angle - 90) / 180);

    let d = tan * h;

    if(d <= w) {
      ret = [x + w, y, x + w - d, y + h];
    } else {
      d = w / tan;
      ret = [x + w, y, x, y + d];
    }
  } else if(angle >= 180 && angle < 270) {
    const tan = Math.tan(Math.PI * (angle - 180) / 180);

    let d = tan * w;

    if(d <= h) {
      ret = [x + w, y + h, x, y + h - d];
    } else {
      d = h / tan;
      ret = [x + w, y + h, x + w - d, y];
    }
  } else if(angle >= 270 && angle < 360) {
    const tan = Math.tan(Math.PI * (angle - 270) / 180);

    let d = tan * h;

    if(d <= w) {
      ret = [x, y + h, x + d, y];
    } else {
      d = w / tan;
      ret = [x, y + h, x + w, y + h - d];
    }
  }

  return ret;
}

export function findColor(context, sprite, prop) {
  const gradients = sprite.attr('gradients') || {};
  let color = prop === 'border' ? sprite.attr(prop).color : sprite.attr(prop),
    gradient;

  if(gradients[prop]) {
    /* istanbul ignore next */
    gradient = gradients[prop];
  } else if(typeof color !== 'string') {
    gradient = color;
  }

  if(gradient) {
    let {colors, vector, direction, rect} = gradient;

    /* istanbul ignore if  */
    if(direction != null) {
      if(prop === 'border') {
        rect = rect || [0, 0, ...sprite.outerSize];
      } else {
        const {width: borderWidth} = sprite.attr('border');
        rect = rect || [borderWidth, borderWidth, ...sprite.innerSize];
      }
      vector = gradientBox(direction, rect);
    }

    if(vector.length === 4) {
      color = context.createLinearGradient(...vector);
    } else if(vector.length === 6) {
      color = context.createRadialGradient(...vector);
    } /* istanbul ignore next  */ else if(vector.length === 3) {
      // for wxapp
      color = context.createCircularGradient(...vector);
    } /* istanbul ignore next  */ else {
      throw Error('Invalid gradient vector!');
    }

    colors.forEach((o) => {
      color.addColorStop(o.offset, o.color);
    });
  }

  return color;
}

const contextPool = [],
  maxPollSize = 20;

export const cacheContextPool = {
  get(context) {
    if(contextPool.length > 0) {
      return contextPool.pop();
    }

    const canvas = context.canvas;
    if(!canvas || !canvas.cloneNode) {
      return;
    }
    const copied = canvas.cloneNode();
    return copied.getContext('2d');
  },
  put(...contexts) {
    contexts.every((context) => {
      context.canvas.width = 0;
      context.canvas.height = 0;
      contextPool.push(context);
      return contextPool.length < maxPollSize;
    });
  },
  get size() {
    return contextPool.length;
  },
};
