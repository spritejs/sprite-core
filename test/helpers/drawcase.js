const fs = require('fs');
const {createCanvas} = require('canvas');
const Layer = require('../../lib/layer').default;

module.exports = async function (caseId, size, handler) {
  const canvas = createCanvas(...size);
  const context = canvas.getContext('2d');
  const layer = new Layer({context});
  await handler(layer, size);
  fs.writeFileSync(`../img/${caseId}.png`, canvas.toBuffer());
};
