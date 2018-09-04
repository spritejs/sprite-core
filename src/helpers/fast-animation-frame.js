import {Timeline} from 'sprite-animator';

let _requestAnimationFrame,
  _cancelAnimationFrame;

if(typeof global.requestAnimationFrame === 'undefined') {
  _requestAnimationFrame = function (fn) {
    return setTimeout(() => {
      fn(Date.now());
    }, 16);
  };
  _cancelAnimationFrame = function (id) {
    return clearTimeout(id);
  };
} else {
  _requestAnimationFrame = global.requestAnimationFrame;
  _cancelAnimationFrame = global.cancelAnimationFrame;
}

const steps = new Map();
let timerId;

let currentTime = Date.now();

const requestAnimationFrame = (step) => {
  const id = Symbol('requestId');
  steps.set(id, step);

  if(timerId == null) {
    if(steps.size === 1) {
      currentTime = Date.now();
    }
    timerId = _requestAnimationFrame((t) => {
      timerId = null;
      currentTime = Date.now();
      [...steps].forEach(([id, callback]) => {
        callback(t);
        steps.delete(id);
      });
    });
  }
  return id;
};

const cancelAnimationFrame = (id) => {
  steps.delete(id);
  if(!steps.size && timerId) {
    _cancelAnimationFrame(timerId);
    timerId = null;
  }
};

const timeline = new Timeline({
  nowtime() {
    return steps.size ? currentTime : Date.now();
  },
});

export {
  requestAnimationFrame,
  cancelAnimationFrame,
  timeline,
};
