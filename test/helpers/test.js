const {createCanvas, loadImage} = require('canvas');
const drawCase = require('./drawcase');
const {BaseSprite, Sprite, Label, Path, Group, Color} = require('../../lib');

drawCase('animate-block-1-test', [600, 600], async (layer, [width, height]) => {
  const s = new Sprite();
  s.attr({
    size: [50, 50],
    pos: [300, 300],
    bgcolor: 'red',
  });

  const anim = s.animate([
    {rotate: 360},
  ], {
    delay: 500,
    duration: 2000,
  });
  layer.append(s);

  anim.timeline.playbackRate = 0;

  // console.log(anim.timeline.currentTime);
  for(let i = 0; i < 8; i++) {
    anim.timeline.currentTime = i * 250;
    await layer.prepareRender(); // eslint-disable-line no-await-in-loop
    // console.log(i * 250);
    const ss = s.cloneNode();
    ss.attr({
      bgcolor: `rgba(${i * 30}, ${(8 - i) * 30}, 128, 0.5)`,
    });
    console.log(anim.timeline.currentTime, ss.attr('rotate'));
    layer.append(ss);
  }
  await layer.prepareRender();
});
