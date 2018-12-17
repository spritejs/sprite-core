import SvgPath from 'svg-path-to-canvas';

export default function createSvgPath(path) {
  if(typeof path === 'string') path = {d: path};
  const p = new SvgPath(path.d);
  if(path.transform || path.trim) {
    if(path.transform) {
      Object.entries(path.transform).forEach(([key, value]) => {
        if(!Array.isArray(value)) value = [value];
        p[key](...value);
      });
    }
    if(path.trim) {
      p.trim();
    }
  }
  return p;
}