const getPoints = require('point-at-length')

export const platform = {
  isBrowser: false,
}

export function getSvgPath(d) {
  const points = getPoints(d)
  return {
    getPointAtLength(len) {
      return points.at(len)
    },
    getTotalLength() {
      return points.length()
    },
  }
}

const pointInPath = require('./point-in-path')
export {pointInPath}
