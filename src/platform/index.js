const getPoints = require('point-at-length')

export const platform = {
  isBrowser: false,
}

export function getSvgPath(d) {
  const points = getPoints(d)
  return {
    getPointAtLength(len) {
      const [x, y] = points.at(len)
      return {x, y}
    },
    getTotalLength() {
      return points.length()
    },
    getAttribute(val) {
      if(val === 'd') return d
      return null
    },
  }
}

const pointInPath = require('./point-in-path')
export {pointInPath}
