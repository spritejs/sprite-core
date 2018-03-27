
function gradientBox(angle, rect) {
  const [x, y, w, h] = rect

  angle %= 360
  if(angle < 0) {
    angle += 360
  }

  if(angle >= 0 && angle < 90) {
    const tan = Math.tan(Math.PI * angle / 180)

    let d = tan * w

    if(d <= h) {
      return [x, y, x + w, y + d]
    }
    d = h / tan
    return [x, y, x + d, y + h]
  } else if(angle >= 90 && angle < 180) {
    const tan = Math.tan(Math.PI * (angle - 90) / 180)

    let d = tan * h

    if(d <= w) {
      return [x + w, y, x + w - d, y + h]
    }
    d = w / tan
    return [x + w, y, x, y + d]
  } else if(angle >= 180 && angle < 270) {
    const tan = Math.tan(Math.PI * (angle - 180) / 180)

    let d = tan * w

    if(d <= h) {
      return [x + w, y + h, x, y + h - d]
    }
    d = h / tan
    return [x + w, y + h, x + w - d, y]
  } else if(angle >= 270 && angle < 360) {
    const tan = Math.tan(Math.PI * (angle - 270) / 180)

    let d = tan * h

    if(d <= w) {
      return [x, y + h, x + d, y]
    }
    d = w / tan
    return [x, y + h, x + w, y + h - d]
  }

  return [x, y, x + w, y + h]
}

export default function createGradients(context, rect, gradient) {
  const {colors, direction} = gradient,
    [x, y, w, h] = rect
  let vector = gradient.vector

  if(direction != null) {
    vector = gradientBox(direction, [x, y, w, h])
  }

  let ret
  if(vector.length === 4) {
    ret = context.createLinearGradient(...vector)
  } else if(vector.length === 6) {
    ret = context.createRadialGradient(...vector)
  } else {
    throw Error('Invalid gradient vector!')
  }

  colors.forEach((o) => {
    ret.addColorStop(o.offset, o.color)
  })

  return ret
}
