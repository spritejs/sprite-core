
import {boxIntersect, boxEqual, boxToRect} from 'sprite-utils'

// export function isSpriteDirty(sprite, dirtyEls, isUpdateEl = false) {
//   for(let i = 0; i < dirtyEls.length; i++) {
//     const dirtyEl = dirtyEls[i]
//     const box1 = dirtyEl.renderBox,
//       box2 = sprite.renderBox,
//       box3 = dirtyEl.lastRenderBox

//     if(boxIntersect(box1, box2) || isUpdateEl && box3 && boxIntersect(box3, box2)) {
//       return true
//     }
//   }
//   return false
// }

export function clearDirtyRect({shadowContext, outputContext}, box, width, height) {
  box = box.map((b, i) => { return i < 2 ? b - 1 : b + 1 })
  const dirtyBox = boxIntersect(box, [0, 0, width, height])

  if(dirtyBox) {
    const dirtyRect = boxToRect(dirtyBox)

    if(shadowContext) shadowContext.rect(...dirtyRect)
    outputContext.rect(...dirtyRect)
  }
}

export function clearDirtyRects({shadowContext, outputContext}, dirtyEls, isUpdateEl = false) {
  const {width, height} = outputContext.canvas

  for(let i = 0; i < dirtyEls.length; i++) {
    const dirtyEl = dirtyEls[i]
    const box = dirtyEl.renderBox

    clearDirtyRect({shadowContext, outputContext}, box, width, height)

    if(isUpdateEl) {
      const lastRenderBox = dirtyEl.lastRenderBox
      if(lastRenderBox && !boxEqual(lastRenderBox, box)) {
        clearDirtyRect({shadowContext, outputContext}, lastRenderBox, width, height)
      }
    }
  }
}