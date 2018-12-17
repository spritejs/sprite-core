const installed = new WeakMap();
const _merged = Symbol('merged');

let target = null;
export default function use(plugin, options = null, merge = true) {
  if(!target) {
    target = Object.assign({}, this);
    target.__spritejs = this;
    // target.use = use.bind(target);
    target.use = function (plugin, options = null, merge = false) {
      return use.call(target, plugin, options, merge);
    };
  }
  if(typeof options === 'boolean') {
    merge = options;
    options = null;
  }
  if(installed.has(plugin)) {
    const ret = installed.get(plugin);
    if(merge && !ret[_merged]) {
      Object.assign(target, ret);
      ret[_merged] = true;
    }
    return ret;
  }
  const install = plugin.install || plugin;
  const ret = install.call(plugin, target, options) || {};
  installed.set(plugin, ret);
  if(merge) {
    Object.assign(target.__spritejs, ret);
    ret[_merged] = true;
  }
  return ret;
}
