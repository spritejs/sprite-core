export default function querySelectorLimits(elements, functor, limits = Infinity) {
  const nodeList = []
  for(let i = 0; i < elements.length; i++) {
    const node = elements[i]
    if(functor(node)) {
      nodeList.push(node)
      if(limits === nodeList.length) {
        break
      }
    }
  }
  return nodeList
}
