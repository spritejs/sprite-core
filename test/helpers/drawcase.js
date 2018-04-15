const drawSprites = require('./drawsprites')
const fs = require('fs')

module.exports = async function (caseId, size, handler) {
  const sprites = await handler(size)
  const canvas = drawSprites(sprites, ...size)
  fs.writeFileSync(`../img/${caseId}.png`, canvas.toBuffer())
}
