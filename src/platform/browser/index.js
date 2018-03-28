export const platform = {
  isBrowser: true,
}

export function getSvgPath(d) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', d)
  return path
}
