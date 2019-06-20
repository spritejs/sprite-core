// export function drawRadiusBox(context, {x, y, w, h, r}) {
//   // avoid radius larger than width or height
//   r = Math.min(r, Math.floor(Math.min(w, h) / 2));
//   // avoid radius is negative
//   r = Math.max(r, 0);

//   context.beginPath();
//   context.moveTo(x + r, y);
//   context.arcTo(x + w, y, x + w, y + h, r);
//   context.arcTo(x + w, y + h, x, y + h, r);
//   context.arcTo(x, y + h, x, y, r);
//   context.arcTo(x, y, x + w, y, r);
//   context.closePath();
// }

function drawEllipseBorder(ctx, x, y, w, h, pos = 'leftTop') {
  const kappa = 0.5522848,
    ox = (w / 2) * kappa, // control point offset horizontal
    oy = (h / 2) * kappa, // control point offset vertical
    xe = x + w, // x-end
    ye = y + h, // y-end
    xm = x + w / 2, // x-middle
    ym = y + h / 2; // y-middle

  if(pos === 'leftTop') {
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  } else if(pos === 'rightTop') {
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  } else if(pos === 'rightBottom') {
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  } else if(pos === 'leftBottom') {
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  }
}

export function drawRadiusBox(context, [x, y, w, h], radius) {
  if(!radius) {
    context.beginPath();
    context.rect(x, y, w, h);
  } else {
    if(!radius) radius = [0, 0, 0, 0, 0, 0, 0, 0];
    if(typeof radius === 'number') radius = Array(8).fill(radius);

    const [tl0, tl1, tr0, tr1, br0, br1, bl0, bl1] = radius.map((r, i) => {
      if(i % 2) return Math.min(r, h / 2);
      return Math.min(r, w / 2);
    });

    context.beginPath();
    context.moveTo(x, y + tl1);
    drawEllipseBorder(context, x, y, tl0 * 2, tl1 * 2, 'leftTop');
    context.lineTo(x + w - tr0, y);
    drawEllipseBorder(context, x + w - tr0 * 2, y, tr0 * 2, tr1 * 2, 'rightTop');
    context.lineTo(x + w, y + h - br1);
    drawEllipseBorder(context, x + w - br0 * 2, y + h - br1 * 2, br0 * 2, br1 * 2, 'rightBottom');
    context.lineTo(x + bl0, y + h);
    drawEllipseBorder(context, x, y + h - bl1 * 2, bl0 * 2, bl1 * 2, 'leftBottom');
    context.closePath();
  }
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
    const tan = Math.tan((Math.PI * angle) / 180);

    let d = tan * w;

    if(d <= h) {
      ret = [x, y, x + w, y + d];
    } else {
      d = h / tan;
      ret = [x, y, x + d, y + h];
    }
  } else if(angle >= 90 && angle < 180) {
    const tan = Math.tan((Math.PI * (angle - 90)) / 180);

    let d = tan * h;

    if(d <= w) {
      ret = [x + w, y, x + w - d, y + h];
    } else {
      d = w / tan;
      ret = [x + w, y, x, y + d];
    }
  } else if(angle >= 180 && angle < 270) {
    const tan = Math.tan((Math.PI * (angle - 180)) / 180);

    let d = tan * w;

    if(d <= h) {
      ret = [x + w, y + h, x, y + h - d];
    } else {
      d = h / tan;
      ret = [x + w, y + h, x + w - d, y];
    }
  } else if(angle >= 270 && angle < 360) {
    const tan = Math.tan((Math.PI * (angle - 270)) / 180);

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
  contextReady = [],
  maxPollSize = 50;

export const cacheContextPool = {
  get(context) {
    if(contextReady.length > 0) {
      return contextReady.pop();
    }

    const canvas = context.canvas;
    if(!canvas || !canvas.cloneNode) {
      return;
    }
    const copied = canvas.cloneNode();
    return copied.getContext('2d');
  },
  flush() {
    contextReady.push(...contextPool);
    contextPool.length = 0;
  },
  put(...contexts) {
    let size = this.size;
    contexts.every((context) => {
      const ret = size++ < maxPollSize;
      if(ret) {
        context.canvas.width = 0;
        context.canvas.height = 0;
        contextPool.push(context);
      }
      return ret;
    });
  },
  get size() {
    return contextPool.length + contextReady.length;
  },
};
