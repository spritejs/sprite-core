module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sprite_timeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return sprite_timeline__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Effects", function() { return _effect__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Easings", function() { return _easing__WEBPACK_IMPORTED_MODULE_2__["Easings"]; });

/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return _animator__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const _nowtime = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createNowTime"])();

const defaultOptions = {
  originTime: 0,
  playbackRate: 1.0
};

const _timeMark = Symbol('timeMark'),
      _playbackRate = Symbol('playbackRate'),
      _timers = Symbol('timers'),
      _originTime = Symbol('originTime'),
      _setTimer = Symbol('setTimer'),
      _parent = Symbol('parent');

class Timeline {
  constructor(options, parent) {
    if (options instanceof Timeline) {
      parent = options;
      options = {};
    }

    options = Object.assign({}, defaultOptions, options);

    if (parent) {
      this[_parent] = parent;
    }

    const nowtime = options.nowtime || _nowtime;

    if (!parent) {
      const createTime = nowtime();
      Object.defineProperty(this, 'globalTime', {
        get() {
          return nowtime() - createTime;
        }

      });
    } else {
      Object.defineProperty(this, 'globalTime', {
        get() {
          return parent.currentTime;
        }

      });
    } // timeMark records the reference points on timeline
    // Each time we change the playbackRate or currentTime or entropy
    // A new timeMark will be generated
    // timeMark sorted by entropy
    // If you reset entropy, all the timeMarks behind the new entropy
    // should be dropped


    this[_timeMark] = [{
      globalTime: this.globalTime,
      localTime: -options.originTime,
      entropy: -options.originTime,
      playbackRate: options.playbackRate,
      globalEntropy: 0
    }];

    if (this[_parent]) {
      this[_timeMark][0].globalEntropy = this[_parent].entropy;
    }

    this[_originTime] = options.originTime;
    this[_playbackRate] = options.playbackRate;
    this[_timers] = new Map();
  }

  get parent() {
    return this[_parent];
  }

  get lastTimeMark() {
    return this[_timeMark][this[_timeMark].length - 1];
  }

  markTime({
    time = this.currentTime,
    entropy = this.entropy,
    playbackRate = this.playbackRate
  } = {}) {
    const timeMark = {
      globalTime: this.globalTime,
      localTime: time,
      entropy,
      playbackRate,
      globalEntropy: this.globalEntropy
    };

    this[_timeMark].push(timeMark);
  }

  get currentTime() {
    const {
      localTime,
      globalTime
    } = this.lastTimeMark;
    return localTime + (this.globalTime - globalTime) * this.playbackRate;
  }

  set currentTime(time) {
    const from = this.currentTime,
          to = time,
          timers = this[_timers];
    this.markTime({
      time
    });
    [...timers].forEach(([id, timer]) => {
      if (!timers.has(id)) return; // Need check because it maybe clearTimeout by former handler().

      const {
        isEntropy,
        delay,
        heading
      } = timer.time,
            {
        handler,
        startTime
      } = timer;

      if (!isEntropy) {
        const endTime = startTime + delay;

        if (delay === 0 || heading !== false && (to - from) * delay <= 0 || from <= endTime && endTime <= to || from >= endTime && endTime >= to) {
          handler();
          this.clearTimeout(id);
        }
      } else if (delay === 0) {
        handler();
        this.clearTimeout(id);
      }
    });
    this.updateTimers();
  } // Both currentTime and entropy should be influenced by playbackRate.
  // If current playbackRate is negative, the currentTime should go backwards
  // while the entropy remain to go forwards.
  // Both of the initial values is set to -originTime


  get entropy() {
    const {
      entropy,
      globalEntropy
    } = this.lastTimeMark;
    return entropy + Math.abs((this.globalEntropy - globalEntropy) * this.playbackRate);
  }

  get globalEntropy() {
    return this[_parent] ? this[_parent].entropy : this.globalTime;
  } // get globalTime() {
  //   if(this[_parent]) {
  //     return this[_parent].currentTime;
  //   }
  //   return nowtime();
  // }
  // change entropy will NOT cause currentTime changing but may influence the pass
  // and the future of the timeline. (It may change the result of seek***Time)
  // While entropy is set, all the marks behind will be droped


  set entropy(entropy) {
    if (this.entropy > entropy) {
      const idx = this.seekTimeMark(entropy);
      this[_timeMark].length = idx + 1;
    }

    this.markTime({
      entropy
    });
    this.updateTimers();
  }

  fork(options) {
    return new Timeline(options, this);
  }

  seekGlobalTime(seekEntropy) {
    const idx = this.seekTimeMark(seekEntropy),
          timeMark = this[_timeMark][idx];
    const {
      entropy,
      playbackRate,
      globalTime
    } = timeMark;
    return globalTime + (seekEntropy - entropy) / Math.abs(playbackRate);
  }

  seekLocalTime(seekEntropy) {
    const idx = this.seekTimeMark(seekEntropy),
          timeMark = this[_timeMark][idx];
    const {
      localTime,
      entropy,
      playbackRate
    } = timeMark;

    if (playbackRate > 0) {
      return localTime + (seekEntropy - entropy);
    }

    return localTime - (seekEntropy - entropy);
  }

  seekTimeMark(entropy) {
    const timeMark = this[_timeMark];
    let l = 0,
        r = timeMark.length - 1;

    if (entropy <= timeMark[l].entropy) {
      return l;
    }

    if (entropy >= timeMark[r].entropy) {
      return r;
    }

    let m = Math.floor((l + r) / 2); // binary search

    while (m > l && m < r) {
      if (entropy === timeMark[m].entropy) {
        return m;
      }

      if (entropy < timeMark[m].entropy) {
        r = m;
      } else if (entropy > timeMark[m].entropy) {
        l = m;
      }

      m = Math.floor((l + r) / 2);
    }

    return l;
  }

  get playbackRate() {
    return this[_playbackRate];
  }

  set playbackRate(rate) {
    if (rate !== this.playbackRate) {
      this.markTime({
        playbackRate: rate
      });
      this[_playbackRate] = rate;
      this.updateTimers();
    }
  }

  get paused() {
    if (this.playbackRate === 0) return true;
    let parent = this.parent;

    while (parent) {
      if (parent.playbackRate === 0) return true;
      parent = parent.parent;
    }

    return false;
  }

  updateTimers() {
    const timers = [...this[_timers]];
    timers.forEach(([id, timer]) => {
      this[_setTimer](timer.handler, timer.time, id);
    });
  }

  clearTimeout(id) {
    const timer = this[_timers].get(id);

    if (timer && timer.timerID != null) {
      if (this[_parent]) {
        this[_parent].clearTimeout(timer.timerID);
      } else {
        clearTimeout(timer.timerID);
      }
    }

    this[_timers].delete(id);
  }

  clearInterval(id) {
    return this.clearTimeout(id);
  }

  clear() {
    // clear all running timers
    const timers = this[_timers];
    [...timers.keys()].forEach(id => {
      this.clearTimeout(id);
    });
  }
  /*
    setTimeout(func, {delay: 100, isEntropy: true})
    setTimeout(func, {entropy: 100})
    setTimeout(func, 100})
   */


  setTimeout(handler, time = {
    delay: 0
  }) {
    return this[_setTimer](handler, time);
  }

  setInterval(handler, time = {
    delay: 0
  }) {
    const that = this;

    const id = this[_setTimer](function step() {
      // reset timer before handler cause we may clearTimeout in handler()
      that[_setTimer](step, time, id);

      handler();
    }, time);

    return id;
  }

  [_setTimer](handler, time, id = Symbol('timerID')) {
    time = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["formatDelay"])(time);

    const timer = this[_timers].get(id);

    let delay,
        timerID = null,
        startTime,
        startEntropy;

    if (timer) {
      this.clearTimeout(id);

      if (time.isEntropy) {
        delay = (time.delay - (this.entropy - timer.startEntropy)) / Math.abs(this.playbackRate);
      } else {
        delay = (time.delay - (this.currentTime - timer.startTime)) / this.playbackRate;
      }

      startTime = timer.startTime;
      startEntropy = timer.startEntropy;
    } else {
      delay = time.delay / (time.isEntropy ? Math.abs(this.playbackRate) : this.playbackRate);
      startTime = this.currentTime;
      startEntropy = this.entropy;
    }

    const parent = this[_parent],
          globalTimeout = parent ? parent.setTimeout.bind(parent) : setTimeout;
    const heading = time.heading; // console.log(heading, parent, delay)

    if (!parent && heading === false && delay < 0) {
      delay = Infinity;
    } // if playbackRate is zero, delay will be infinity.
    // For wxapp bugs, cannot use Number.isFinite yet.


    if (isFinite(delay) || parent) {
      // eslint-disable-line no-restricted-globals
      delay = Math.ceil(delay);

      if (globalTimeout !== setTimeout) {
        delay = {
          delay,
          heading
        };
      }

      timerID = globalTimeout(() => {
        this[_timers].delete(id);

        handler();
      }, delay);
    }

    this[_timers].set(id, {
      timerID,
      handler,
      time,
      startTime,
      startEntropy
    });

    return id;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Timeline);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNowTime", function() { return createNowTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDelay", function() { return formatDelay; });
function createNowTime(syncLocker = true) {
  let nowtime = null;

  if (Date.now) {
    nowtime = Date.now;
  } else {
    nowtime = () => new Date().getTime();
  }

  return nowtime;
}
/*
  delay = 100 -> delay = {delay: 100}
  delay = {entropy: 100} -> delay = {delay: 100, isEntropy: true}
 */

function formatDelay(delay) {
  if (typeof delay === 'number') {
    delay = {
      delay
    };
  } else if ('entropy' in delay) {
    delay = {
      delay: delay.entropy,
      isEntropy: true
    };
  }

  return delay;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  // s - startFrame, e - endFrame
  default(from, to, p, s, e) {
    if (typeof from === 'number' && typeof to === 'number') {
      return from + (p - s) / (e - s) * (to - from);
    }

    if (p - s > e - p) {
      return to;
    }

    return from;
  }

});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Easings", function() { return Easings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseEasing", function() { return parseEasing; });
const BezierEasing = __webpack_require__(6);

const bezierFuncCache = new Map();

function getBezierEasing(...value) {
  let easing = bezierFuncCache.get(value);

  if (easing) {
    return easing;
  }

  easing = BezierEasing(...value);
  bezierFuncCache.set(value, easing);
  return easing;
}

function getStepsEasing(step, pos = 'end') {
  return function (p, frames) {
    for (let i = 1; i < frames.length; i++) {
      const {
        offset
      } = frames[i];

      if (p <= offset) {
        const start = frames[i - 1].offset,
              end = offset;
        const fp = (p - start) / (end - start),
              d = 1 / step;
        let t = fp / d;

        if (pos === 'end') {
          t = Math.floor(t);
        } else {
          t = Math.ceil(t);
        }

        return d * t * (end - start) + start;
      }
    }

    return 0;
  };
}

function parseEasingStr(easingStr) {
  let pattern = /^cubic-bezier\((.*)\)/,
      matched = easingStr.match(pattern);

  if (matched) {
    let value = matched[1].trim();
    value = value.split(',').map(v => parseFloat(v.trim()));
    return getBezierEasing(...value);
  }

  pattern = /^steps\((.*)\)/;
  matched = easingStr.match(pattern);

  if (matched) {
    let value = matched[1].trim();
    value = value.split(',').map(v => v.trim());
    const [step, pos] = value;
    return getStepsEasing(parseInt(step, 10), pos);
  }

  return easingStr;
}

const Easings = {
  linear(p) {
    return p;
  },

  ease: getBezierEasing(0.25, 0.1, 0.25, 1),
  'ease-in': getBezierEasing(0.42, 0, 1, 1),
  'ease-out': getBezierEasing(0, 0, 0.58, 1),
  'ease-in-out': getBezierEasing(0.42, 0, 0.58, 1),
  // 'step-start': function(p, frames){
  //   let ret = 0
  //   for(let i = 0; i < frames.length; i++){
  //     const {offset} = frames[i]
  //     ret = offset
  //     if(p < offset){
  //       break
  //     }
  //   }
  //   return ret
  // },
  // 'step-end': function(p, frames){
  //   let ret = 0
  //   for(let i = 0; i < frames.length; i++){
  //     const {offset} = frames[i]
  //     if(p < offset){
  //       break
  //     }
  //     ret = offset
  //   }
  //   return ret
  // }
  'step-start': getStepsEasing(1, 'start'),
  'step-end': getStepsEasing(1, 'end')
};

function parseEasing(easing) {
  if (typeof easing === 'string') {
    if (!Easings[easing]) {
      easing = parseEasingStr(easing);
    } else {
      // load default Easing
      easing = Easings[easing];
    }
  } else if (easing.type === 'cubic-bezier') {
    easing = getBezierEasing(...easing.value);
  } else if (easing.type === 'steps') {
    easing = getStepsEasing(easing.step, easing.pos);
  }

  return easing;
}



/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sprite_timeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




const _timing = Symbol('timing'),
      _keyframes = Symbol('keyframes'),
      _initState = Symbol('initState'),
      _readyDefer = Symbol('readyDefer'),
      _finishedDefer = Symbol('finishedDefer'),
      _effects = Symbol('effects'),
      _activeReadyTimer = Symbol('activeReadyTimer'),
      _activeFinishTimer = Symbol('activeFinishTimer'),
      _removeDefer = Symbol('removeDefer');
/**
  easing: {
    type: 'cubic-bezier',
    value: [...]
  }
  easing: {
    type: 'steps',
    step: 1,
    pos: 'end'
  }
 */


const defaultTiming = {
  delay: 0,
  endDelay: 0,
  fill: 'auto',
  iterations: 1.0,
  playbackRate: 1.0,
  direction: 'normal',
  easing: 'linear',
  effect: null
};
/**
  animation: play --> delay --> effect --> endDelay
  playState: idle --> pending --> running --> pending --> finished
 */

/* harmony default export */ __webpack_exports__["default"] = (class {
  constructor(initState, keyframes, timing) {
    if (Array.isArray(initState)) {
      // 如果 initState 缺省，默认 keyframes 的第一帧为 initState
      [initState, keyframes, timing] = [initState[0], initState, keyframes];
    }

    if (typeof timing === 'number') {
      timing = {
        duration: timing
      };
    }

    this[_timing] = Object.assign({}, defaultTiming, timing);
    this[_timing].easing = Object(_easing__WEBPACK_IMPORTED_MODULE_2__["parseEasing"])(this[_timing].easing);
    this[_keyframes] = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["calculateFramesOffset"])(keyframes);
    const lastFrame = this[_keyframes][this[_keyframes].length - 1];
    this[_initState] = {}; // 初始状态

    Object.keys(lastFrame).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(initState, key)) {
        if (key !== 'easing' && key !== 'offset') {
          this[_initState][key] = initState[key];
        }
      }
    }); // 补齐参数

    this[_keyframes] = this[_keyframes].map(frame => {
      return Object.assign({}, this[_initState], frame);
    });

    if (this[_keyframes][0].offset !== 0) {
      // 要补第一帧
      this[_keyframes].unshift(Object.assign({}, this[_initState], {
        offset: 0
      }));
    }

    if (lastFrame.offset < 1) {
      // 要补最后一帧
      this[_keyframes].push(Object.assign({}, lastFrame, {
        offset: 1
      }));
    }

    this[_effects] = {};
    this.timeline = null; // idle, no effect
  }

  get playbackRate() {
    return this[_timing].playbackRate;
  }

  set playbackRate(rate) {
    if (this.timeline) {
      this.timeline.playbackRate = rate;
    }

    this[_timing].playbackRate = rate;
  }

  get playState() {
    const timeline = this.timeline,
          {
      iterations,
      duration,
      endDelay
    } = this[_timing];
    let state = 'running';

    if (timeline == null) {
      state = 'idle';
    } else if (timeline.paused) {
      state = 'paused';
    } else if (timeline.currentTime < 0) {
      // 开始 pending
      state = 'pending';
    } else {
      const ed = timeline.currentTime - iterations * duration;

      if (ed > 0 && ed < endDelay) {
        // 结束 pending
        state = 'pending';
      } else if (ed >= endDelay) {
        state = 'finished';
      }
    }

    return state;
  }

  get progress() {
    if (!this.timeline) return 0;
    const {
      duration,
      iterations
    } = this[_timing];
    const timeline = this.timeline,
          playState = this.playState;
    let p;

    if (playState === 'idle') {
      p = 0;
    } else if (playState === 'paused' && timeline.currentTime < 0) {
      p = 0;
    } else if (playState === 'pending') {
      if (timeline.currentTime < 0) {
        p = 0;
      } else {
        const time = timeline.seekLocalTime(iterations * duration);
        p = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["periodicity"])(time, duration)[1] / duration;
      }
    } else if (playState === 'running' || playState === 'paused') {
      p = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["periodicity"])(timeline.currentTime, duration)[1] / duration;
    }

    if (playState === 'finished') {
      p = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["periodicity"])(iterations, 1)[1];
    }

    return p;
  }

  get frame() {
    const playState = this.playState,
          initState = this[_initState],
          {
      fill
    } = this[_timing];

    if (playState === 'idle') {
      return initState;
    }

    const {
      currentTime
    } = this.timeline,
          keyframes = this[_keyframes].slice(0);

    const {
      p,
      inverted
    } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getProgress"])(this.timeline, this[_timing], this.progress);
    let frameState = initState;

    if (currentTime < 0 && playState === 'pending') {
      // 在开始前 delay 阶段
      if (fill === 'backwards' || fill === 'both') {
        frameState = inverted ? keyframes[keyframes.length - 1] : keyframes[0];
      }
    } else if (playState !== 'pending' && playState !== 'finished' || fill === 'forwards' || fill === 'both') {
      // 不在 endDelay 或结束状态，或 forwards
      frameState = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getCurrentFrame"])(this[_timing], keyframes, this[_effects], p);
    }

    return frameState;
  }

  get timing() {
    return this[_timing];
  }

  pause() {
    this.timeline.playbackRate = 0;
  }

  set baseTimeline(timeline) {
    this[_timing].timeline = timeline;
  }

  get baseTimeline() {
    return this[_timing].timeline;
  }

  [_activeReadyTimer]() {
    if (this[_readyDefer] && !this[_readyDefer].timerID) {
      if (this.timeline.currentTime < 0) {
        this[_readyDefer].timerID = this.timeline.setTimeout(() => {
          this[_readyDefer].resolve();

          delete this[_readyDefer];
        }, {
          delay: -this.timeline.currentTime,
          heading: false
        });
      } else {
        this[_readyDefer].timerID = this.timeline.setTimeout(() => {
          this[_readyDefer].resolve();

          delete this[_readyDefer];
        }, {
          delay: 0,
          isEntropy: true
        });
      }
    }
  }

  [_activeFinishTimer]() {
    const {
      duration,
      iterations,
      endDelay
    } = this[_timing];
    const delay = Math.ceil(duration * iterations + endDelay - this.timeline.currentTime) + 1;

    if (this[_finishedDefer] && !this[_finishedDefer].timerID) {
      this[_finishedDefer].timerID = this.timeline.setTimeout(() => {
        this[_finishedDefer].resolve();

        this[_removeDefer](_readyDefer);

        this[_removeDefer](_finishedDefer);
      }, {
        delay,
        heading: false
      });
      this[_finishedDefer].reverseTimerID = this.timeline.setTimeout(() => {
        this[_finishedDefer].resolve();

        this[_removeDefer](_readyDefer);

        this[_removeDefer](_finishedDefer);

        this.timeline = null;
      }, {
        delay: -this[_timing].delay - 1,
        heading: false
      });
    }
  }

  play() {
    if (this.playState === 'finished') {
      this.cancel();
    }

    if (this.playState === 'idle') {
      if (this.playbackRate <= 0) {
        return;
      }

      const {
        delay,
        playbackRate,
        timeline
      } = this[_timing];
      this.timeline = new sprite_timeline__WEBPACK_IMPORTED_MODULE_0__["default"]({
        originTime: delay,
        playbackRate
      }, timeline);

      this[_activeReadyTimer]();

      this[_activeFinishTimer]();
    } else if (this.playState === 'paused') {
      this.timeline.playbackRate = this.playbackRate;

      this[_activeReadyTimer]();
    }
  }

  [_removeDefer](deferID) {
    const defered = this[deferID],
          {
      timeline
    } = this;

    if (defered && timeline) {
      timeline.clearTimeout(defered.timerID);

      if (defered.reverseTimerID) {
        timeline.clearTimeout(defered.reverseTimerID);
      }
    }

    delete this[deferID];
  }

  cancel() {
    this[_removeDefer](_readyDefer);

    this[_removeDefer](_finishedDefer);

    this.timeline = null;
  }

  finish() {
    if (this.timeline) {
      this.timeline.currentTime = Infinity / this.playbackRate;
    }

    this[_removeDefer](_readyDefer);

    this[_removeDefer](_finishedDefer);
  }

  applyEffects(effects) {
    return Object.assign(this[_effects], effects);
  }

  get ready() {
    if (this[_readyDefer]) {
      return this[_readyDefer].promise;
    }

    if (this.timeline && this.timeline.currentTime >= 0) {
      if (this.playState !== 'paused') {
        return Promise.resolve();
      }
    }

    this[_readyDefer] = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["defer"])();

    if (this.timeline) {
      // 已经在 pending 状态
      this[_activeReadyTimer]();
    }

    if (this[_readyDefer]) {
      return this[_readyDefer].promise;
    }

    return Promise.resolve();
  }

  get finished() {
    if (this.playState === 'finished') {
      return Promise.resolve();
    }

    if (!this[_finishedDefer]) {
      this[_finishedDefer] = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["defer"])();

      if (this.timeline) {
        this[_activeFinishTimer]();
      }
    }

    return this[_finishedDefer].promise;
  }

});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defer", function() { return defer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "periodicity", function() { return periodicity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateFramesOffset", function() { return calculateFramesOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProgress", function() { return getProgress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentFrame", function() { return getCurrentFrame; });
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


function defer() {
  const ret = {};
  ret.promise = new Promise((resolve, reject) => {
    ret.resolve = resolve;
    ret.reject = reject;
  });
  return ret;
}
function periodicity(val, dur) {
  let t = Math.floor(val / dur);
  let v = val - t * dur;

  if (v === 0 && t > 0) {
    v = dur;
    t--;
  }

  return [t, v];
}
function calculateFramesOffset(keyframes) {
  keyframes = keyframes.slice(0);
  const firstFrame = keyframes[0],
        lastFrame = keyframes[keyframes.length - 1];
  lastFrame.offset = lastFrame.offset || 1;
  firstFrame.offset = firstFrame.offset || 0;
  let offset = 0,
      offsetFrom = -1;

  for (let i = 0; i < keyframes.length; i++) {
    const frame = keyframes[i];

    if (frame.offset != null) {
      const dis = i - offsetFrom;

      if (dis > 1) {
        const delta = (frame.offset - offset) / dis;

        for (let j = 0; j < dis - 1; j++) {
          keyframes[offsetFrom + j + 1].offset = offset + delta * (j + 1);
        }
      }

      offset = frame.offset;
      offsetFrom = i;
    }

    if (frame.easing != null) {
      frame.easing = Object(_easing__WEBPACK_IMPORTED_MODULE_0__["parseEasing"])(frame.easing);
    }

    if (i > 0) {
      const hasEasing = keyframes[i].easing != null; // 如果中间某个属性没有了，需要从前一帧复制过来

      keyframes[i] = Object.assign({}, keyframes[i - 1], keyframes[i]);

      if (!hasEasing) {
        // easing 不能复制
        delete keyframes[i].easing;
      }
    }
  }

  return keyframes;
}
function getProgress(timeline, timing, p) {
  const {
    currentTime
  } = timeline,
        {
    direction,
    duration
  } = timing;
  let inverted = false;

  if (direction === 'reverse') {
    p = 1 - p;
    inverted = true;
  } else if (direction === 'alternate' || direction === 'alternate-reverse') {
    let period = Math.floor(currentTime / duration);
    if (p === 1) period--; // period = Math.max(0, period)

    if (period % 2 ^ direction === 'alternate-reverse') {
      p = 1 - p;
      inverted = true;
    }
  }

  return {
    p,
    inverted
  };
}

function calculateFrame(previousFrame, nextFrame, effects, p) {
  const ret = {};
  Object.entries(nextFrame).forEach(([key, value]) => {
    if (key !== 'offset' && key !== 'easing') {
      const effect = effects[key] || effects.default;
      const v = effect(previousFrame[key], value, p, previousFrame.offset, nextFrame.offset);

      if (v != null) {
        ret[key] = v;
      }
    }
  });
  return ret;
}

function getCurrentFrame(timing, keyframes, effects, p) {
  const {
    easing,
    effect
  } = timing;

  if (!effect) {
    // timing.effect 会覆盖掉 Effects 和 animator.applyEffects 中定义的 effects
    effects = Object.assign({}, effects, _effect__WEBPACK_IMPORTED_MODULE_1__["default"]);
  }

  let ret = {};
  p = easing(p, keyframes);

  for (let i = 1; i < keyframes.length; i++) {
    const frame = keyframes[i],
          offset = frame.offset;

    if (offset >= p || i === keyframes.length - 1) {
      const previousFrame = keyframes[i - 1],
            previousOffset = previousFrame.offset,
            easing = previousFrame.easing;
      let ep = p;

      if (easing) {
        const d = offset - previousOffset;
        ep = easing((p - previousOffset) / d) * d + previousOffset;
      }

      if (effect) {
        ret = effect(previousFrame, frame, ep, previousOffset, offset);
      } else {
        ret = calculateFrame(previousFrame, frame, effects, ep);
      }

      break;
    }
  }

  return ret;
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sprite_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _parse_svg_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _abs_svg_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _normalize_svg_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var _is_svg_path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);







const _initialPath = Symbol('initialPath');

const _path = Symbol('path');

const _bounds = Symbol('bounds');

const _savedPaths = Symbol('savedPaths');

const _renderProps = Symbol('renderProps');

const _beginPath = Symbol('beginPath');

class SvgPath {
  constructor(d) {
    if (!Object(_is_svg_path__WEBPACK_IMPORTED_MODULE_5__["default"])(d)) {
      throw new Error('Not an SVG path!');
    }

    this[_initialPath] = Object(_abs_svg_path__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_parse_svg_path__WEBPACK_IMPORTED_MODULE_2__["default"])(d));
    this[_path] = Object(_normalize_svg_path__WEBPACK_IMPORTED_MODULE_4__["default"])(this[_initialPath]);
    this[_bounds] = null;
    this[_savedPaths] = [];
    this[_renderProps] = {};
    this[_beginPath] = false;
  }

  save() {
    this[_savedPaths].push({
      path: this[_path],
      bounds: this[_bounds],
      renderProps: Object.assign({}, this[_renderProps])
    });

    return this;
  }

  restore() {
    if (this[_savedPaths].length) {
      const {
        path,
        bounds,
        renderProps
      } = this[_savedPaths].pop();

      this[_path] = path;
      this[_bounds] = bounds;
      this[_renderProps] = renderProps;
    }

    return this;
  }

  get bounds() {
    if (!this[_bounds]) {
      const path = this[_path];
      this[_bounds] = [0, 0, 0, 0];

      if (path.length) {
        const bounds = [Infinity, Infinity, -Infinity, -Infinity];

        for (let i = 0, l = path.length; i < l; i++) {
          const points = path[i].slice(1);

          for (let j = 0; j < points.length; j += 2) {
            if (points[j + 0] < bounds[0]) bounds[0] = points[j + 0];
            if (points[j + 1] < bounds[1]) bounds[1] = points[j + 1];
            if (points[j + 0] > bounds[2]) bounds[2] = points[j + 0];
            if (points[j + 1] > bounds[3]) bounds[3] = points[j + 1];
          }
        }

        this[_bounds] = bounds;
      }
    }

    return this[_bounds];
  }

  get size() {
    const bounds = this.bounds;
    return [bounds[2] - bounds[0], bounds[3] - bounds[1]];
  }

  get center() {
    const [x0, y0, x1, y1] = this.bounds;
    return [(x0 + x1) / 2, (y0 + y1) / 2];
  }

  get d() {
    let path = this[_path].map(p => {
      const [c, ...points] = p;
      return c + points.join();
    }).join('');

    if (this.isClosed) {
      path += 'Z';
    }

    return path;
  }

  get path() {
    return this[_path];
  }

  get isClosed() {
    const part = this[_initialPath][this[_initialPath].length - 1];
    return part && part[0] === 'Z';
  }

  isPointInPath(x, y) {
    return Object(_platform__WEBPACK_IMPORTED_MODULE_1__["isPointInPath"])(this, x, y);
  }

  isPointInStroke(x, y, {
    lineWidth = 1,
    lineCap = 'butt',
    lineJoin = 'miter'
  }) {
    if (_platform__WEBPACK_IMPORTED_MODULE_1__["isPointInStroke"]) {
      return Object(_platform__WEBPACK_IMPORTED_MODULE_1__["isPointInStroke"])(this, x, y, {
        lineWidth,
        lineCap,
        lineJoin
      });
    } // node-canvas return undefined

  }

  getPointAtLength(len) {
    return Object(_platform__WEBPACK_IMPORTED_MODULE_1__["getPointAtLength"])(this.d, len);
  }

  getTotalLength() {
    return Object(_platform__WEBPACK_IMPORTED_MODULE_1__["getTotalLength"])(this.d);
  }

  transform(...args) {
    this[_bounds] = null;
    const m = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Matrix"](args);
    const commands = this[_path];
    this[_path] = commands.map(c => {
      const [cmd, ...args] = c;
      const transformed = [cmd];

      for (let i = 0; i < args.length; i += 2) {
        const x0 = args[i],
              y0 = args[i + 1];
        const [x, y] = m.transformPoint(x0, y0);
        transformed.push(x, y);
      }

      return transformed;
    });
    return this;
  }

  translate(x, y) {
    const m = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Matrix"]().translate(x, y);
    return this.transform(...m.m);
  }

  rotate(deg) {
    const m = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Matrix"]().rotate(deg);
    return this.transform(...m.m);
  }

  scale(sx, sy) {
    if (sy == null) sy = sx;
    const m = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Matrix"]().scale(sx, sy);
    return this.transform(...m.m);
  }

  skew(degX, degY) {
    const m = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Matrix"]().skew(degX, degY);
    return this.transform(...m.m);
  }

  trim() {
    const [x, y] = this.bounds;
    this.translate(-x, -y);
    return this;
  }

  beginPath() {
    this[_beginPath] = true;
    return this;
  }

  to(context) {
    const commands = this[_path];
    const renderProps = this[_renderProps];

    if (commands.length) {
      if (this[_beginPath]) {
        context.beginPath();
      }

      commands.forEach(c => {
        const [cmd, ...args] = c;

        if (cmd === 'M') {
          context.moveTo(...args);
        } else {
          context.bezierCurveTo(...args);
        }
      });

      if (this.isClosed) {
        context.closePath();
      }
    }

    Object.assign(context, renderProps);
    return {
      stroke() {
        context.stroke();
        return this;
      },

      fill() {
        context.fill();
        return this;
      }

    };
  }

  strokeStyle(value) {
    this[_renderProps].strokeStyle = value;
    return this;
  }

  fillStyle(value) {
    this[_renderProps].fillStyle = value;
    return this;
  }

  lineWidth(value) {
    this[_renderProps].lineWidth = value;
    return this;
  }

  lineCap(value) {
    this[_renderProps].lineCap = value;
    return this;
  }

  lineJoin(value) {
    this[_renderProps].lineJoin = value;
    return this;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SvgPath);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Matrix", function() { return _matrix__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return _vector__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// from https://github.com/chrisaljoudi/transformatrix.js

/**
  default:
          (1, 0, 0)
          (0, 1, 0)
 */
const Matrix = function (m) {
  m = m || [1, 0, 0, 1, 0, 0];
  this.m = [m[0], m[1], m[2], m[3], m[4], m[5]];
};

Matrix.prototype.unit = function () {
  this.m = [1, 0, 0, 1, 0, 0];
  return this;
};

Matrix.prototype.multiply = function (m) {
  const m1 = this.m;
  let m2;

  if (m instanceof Matrix) {
    m2 = m.m;
  } else {
    m2 = m;
  }

  const m11 = m1[0] * m2[0] + m1[2] * m2[1],
        m12 = m1[1] * m2[0] + m1[3] * m2[1],
        m21 = m1[0] * m2[2] + m1[2] * m2[3],
        m22 = m1[1] * m2[2] + m1[3] * m2[3];
  const dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
        dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
  m1[0] = m11;
  m1[1] = m12;
  m1[2] = m21;
  m1[3] = m22;
  m1[4] = dx;
  m1[5] = dy;
  return this;
};

Matrix.prototype.inverse = function () {
  const inv = new Matrix(this.m),
        invm = inv.m;
  const d = 1 / (invm[0] * invm[3] - invm[1] * invm[2]),
        m0 = invm[3] * d,
        m1 = -invm[1] * d,
        m2 = -invm[2] * d,
        m3 = invm[0] * d,
        m4 = d * (invm[2] * invm[5] - invm[3] * invm[4]),
        m5 = d * (invm[1] * invm[4] - invm[0] * invm[5]);
  invm[0] = m0;
  invm[1] = m1;
  invm[2] = m2;
  invm[3] = m3;
  invm[4] = m4;
  invm[5] = m5;
  return inv;
};
/**
  (1, 0, sx)
  (0, 1, sy)
 * */


Matrix.prototype.translate = function (x, y) {
  return this.multiply([1, 0, 0, 1, x, y]);
};
/**
    (cos, -sin, 0)
    (sin, cos, 0)
 */


Matrix.prototype.rotate = function (deg) {
  const rad = deg * Math.PI / 180,
        c = Math.cos(rad),
        s = Math.sin(rad);
  return this.multiply([c, s, -s, c, 0, 0]);
};
/**
    (1, tx, 0)
    (ty, 1, 0)
 */


Matrix.prototype.skew = function (degX, degY) {
  degY |= 0;
  const radX = degX * Math.PI / 180,
        radY = degY * Math.PI / 180;
  const tx = Math.tan(radX),
        ty = Math.tan(radY);
  return this.multiply([1, ty, tx, 1, 0, 0]);
};
/**
  (sx, 0, 0)
  (0, sy, 0)
 */


Matrix.prototype.scale = function (sx, sy) {
  return this.multiply([sx, 0, 0, sy, 0, 0]);
};

Matrix.prototype.transformPoint = function (px, py) {
  const x = px,
        y = py;
  px = x * this.m[0] + y * this.m[2] + this.m[4];
  py = x * this.m[1] + y * this.m[3] + this.m[5];
  return [px, py];
};

Matrix.prototype.transformVector = function (px, py) {
  const x = px,
        y = py;
  px = x * this.m[0] + y * this.m[2];
  py = x * this.m[1] + y * this.m[3];
  return [px, py];
};

/* harmony default export */ __webpack_exports__["default"] = (Matrix);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Vector {
  constructor(p1, p2 = [0, 0, 0]) {
    let [x1, y1, z1] = p1,
        [x2, y2, z2] = p2;
    z1 = z1 || 0;
    z2 = z2 || 0;
    this.x = x1 - x2;
    this.y = y1 - y2;
    this.z = z1 - z2;
  }

  get length() {
    const {
      x,
      y,
      z
    } = this;
    return Math.sqrt(x * x + y * y + z * z);
  }

  unit() {
    const length = this.length;
    return new Vector([this.x / length, this.y / length, this.z / length]);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    const x1 = this.x,
          y1 = this.y,
          z1 = this.z,
          x2 = v.x,
          y2 = v.y,
          z2 = v.z;
    return new Vector([y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - x2 * y1]);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Vector);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPointAtLength", function() { return getPointAtLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTotalLength", function() { return getTotalLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPointInPath", function() { return isPointInPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPointInStroke", function() { return isPointInStroke; });
function createSvgPath(d) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  return path;
}

function getPointAtLength(d, len) {
  const path = createSvgPath(d);
  const {
    x,
    y
  } = path.getPointAtLength(len);
  return [x, y];
}
function getTotalLength(d, len) {
  const path = createSvgPath(d);
  return path.getTotalLength(len);
}
let context = null;
function isPointInPath({
  d
}, x, y) {
  if (!context) context = document.createElement('canvas').getContext('2d');
  const path = new Path2D(d);
  return context.isPointInPath(path, x, y);
}
function isPointInStroke({
  d
}, x, y, {
  lineWidth = 1,
  lineCap = 'butt',
  lineJoin = 'miter'
}) {
  if (!context) context = document.createElement('canvas').getContext('2d');

  if (context.isPointInStroke) {
    context.save();
    context.lineWidth = lineWidth;
    context.lineCap = lineCap;
    context.lineJoin = lineJoin;
    const path = new Path2D(d);
    const ret = context.isPointInStroke(path, x, y);
    context.restore();
    return ret;
  }
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parse; });
// https://github.com/jkroso/parse-svg-path

/**
 * expected argument lengths
 * @type {Object}
 */

/* eslint-disable */
var length = {
  a: 7,
  c: 6,
  h: 1,
  l: 2,
  m: 2,
  q: 4,
  s: 4,
  t: 2,
  v: 1,
  z: 0
  /**
   * segment pattern
   * @type {RegExp}
   */

};
var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

function parse(path) {
  var data = [];
  path.replace(segment, function (_, command, args) {
    var type = command.toLowerCase();
    args = parseValues(args); // overloaded moveTo

    if (type == 'm' && args.length > 2) {
      data.push([command].concat(args.splice(0, 2)));
      type = 'l';
      command = command == 'm' ? 'l' : 'L';
    }

    while (true) {
      if (args.length == length[type]) {
        args.unshift(command);
        return data.push(args);
      }

      if (args.length < length[type]) throw new Error('malformed path data');
      data.push([command].concat(args.splice(0, length[type])));
    }
  });
  return data;
}
var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

function parseValues(args) {
  var numbers = args.match(number);
  return numbers ? numbers.map(Number) : [];
}
/* eslint-enable */

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return absolutize; });
// https://github.com/jkroso/abs-svg-path

/**
 * redefine `path` with absolute coordinates
 *
 * @param {Array} path
 * @return {Array}
 */

/* eslint-disable */
function absolutize(path) {
  var startX = 0;
  var startY = 0;
  var x = 0;
  var y = 0;
  return path.map(function (seg) {
    seg = seg.slice();
    var type = seg[0];
    var command = type.toUpperCase(); // is relative

    if (type != command) {
      seg[0] = command;

      switch (type) {
        case 'a':
          seg[6] += x;
          seg[7] += y;
          break;

        case 'v':
          seg[1] += y;
          break;

        case 'h':
          seg[1] += x;
          break;

        default:
          for (var i = 1; i < seg.length;) {
            seg[i++] += x;
            seg[i++] += y;
          }

      }
    } // update cursor state


    switch (command) {
      case 'Z':
        x = startX;
        y = startY;
        break;

      case 'H':
        x = seg[1];
        break;

      case 'V':
        y = seg[1];
        break;

      case 'M':
        x = startX = seg[1];
        y = startY = seg[2];
        break;

      default:
        x = seg[seg.length - 2];
        y = seg[seg.length - 1];
    }

    return seg;
  });
}
/* eslint-enable */

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalize; });
/* harmony import */ var _a2c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
// https://github.com/jkroso/normalize-svg-path

/* eslint-disable */

function normalize(path) {
  // init state
  var prev;
  var result = [];
  var bezierX = 0;
  var bezierY = 0;
  var startX = 0;
  var startY = 0;
  var quadX = null;
  var quadY = null;
  var x = 0;
  var y = 0;

  for (var i = 0, len = path.length; i < len; i++) {
    var seg = path[i];
    var command = seg[0];

    switch (command) {
      case 'M':
        startX = seg[1];
        startY = seg[2];
        break;

      case 'A':
        var curves = Object(_a2c__WEBPACK_IMPORTED_MODULE_0__["default"])(x, y, seg[6], seg[7], seg[4], seg[5], seg[1], seg[2], seg[3]);
        if (!curves.length) continue;
        curves = curves.map(curve => {
          const [x0, y0, x1, y1, x2, y2, x, y] = curve;
          return {
            x1,
            y1,
            x2,
            y2,
            x,
            y
          };
        });

        for (var j = 0, c; j < curves.length; j++) {
          c = curves[j];
          seg = ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y];
          if (j < curves.length - 1) result.push(seg);
        }

        break;

      case 'S':
        // default control point
        var cx = x;
        var cy = y;

        if (prev == 'C' || prev == 'S') {
          cx += cx - bezierX; // reflect the previous command's control

          cy += cy - bezierY; // point relative to the current point
        }

        seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]];
        break;

      case 'T':
        if (prev == 'Q' || prev == 'T') {
          quadX = x * 2 - quadX; // as with 'S' reflect previous control point

          quadY = y * 2 - quadY;
        } else {
          quadX = x;
          quadY = y;
        }

        seg = quadratic(x, y, quadX, quadY, seg[1], seg[2]);
        break;

      case 'Q':
        quadX = seg[1];
        quadY = seg[2];
        seg = quadratic(x, y, seg[1], seg[2], seg[3], seg[4]);
        break;

      case 'L':
        seg = line(x, y, seg[1], seg[2]);
        break;

      case 'H':
        seg = line(x, y, seg[1], y);
        break;

      case 'V':
        seg = line(x, y, x, seg[1]);
        break;

      case 'Z':
        seg = line(x, y, startX, startY);
        break;
    } // update state


    prev = command;
    x = seg[seg.length - 2];
    y = seg[seg.length - 1];

    if (seg.length > 4) {
      bezierX = seg[seg.length - 4];
      bezierY = seg[seg.length - 3];
    } else {
      bezierX = x;
      bezierY = y;
    }

    result.push(seg);
  }

  return result;
}

function line(x1, y1, x2, y2) {
  return ['C', x1, y1, x2, y2, x2, y2];
}

function quadratic(x1, y1, cx, cy, x2, y2) {
  return ['C', x1 / 3 + 2 / 3 * cx, y1 / 3 + 2 / 3 * cy, x2 / 3 + 2 / 3 * cx, y2 / 3 + 2 / 3 * cy, x2, y2];
}
/* eslint-enable */

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return a2c; });
// https://github.com/colinmeinke/svg-arc-to-cubic-bezier
//
// Convert an arc to a sequence of cubic bézier curves
//
const TAU = Math.PI * 2;
/* eslint-disable space-infix-ops */
// Calculate an angle between two unit vectors
//
// Since we measure angle between radii of circular arcs,
// we can use simplified math (without length normalization)
//

function unit_vector_angle(ux, uy, vx, vy) {
  const sign = ux * vy - uy * vx < 0 ? -1 : 1;
  let dot = ux * vx + uy * vy; // Add this to work with arbitrary vectors:
  // dot /= Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
  // rounding errors, e.g. -1.0000000000000002 can screw up this

  if (dot > 1.0) {
    dot = 1.0;
  }

  if (dot < -1.0) {
    dot = -1.0;
  }

  return sign * Math.acos(dot);
} // Convert from endpoint to center parameterization,
// see http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
//
// Return [cx, cy, theta1, delta_theta]
//


function get_arc_center(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi) {
  // Step 1.
  //
  // Moving an ellipse so origin will be the middlepoint between our two
  // points. After that, rotate it to line up ellipse axes with coordinate
  // axes.
  //
  const x1p = cos_phi * (x1 - x2) / 2 + sin_phi * (y1 - y2) / 2;
  const y1p = -sin_phi * (x1 - x2) / 2 + cos_phi * (y1 - y2) / 2;
  const rx_sq = rx * rx;
  const ry_sq = ry * ry;
  const x1p_sq = x1p * x1p;
  const y1p_sq = y1p * y1p; // Step 2.
  //
  // Compute coordinates of the centre of this ellipse (cx', cy')
  // in the new coordinate system.
  //

  let radicant = rx_sq * ry_sq - rx_sq * y1p_sq - ry_sq * x1p_sq;

  if (radicant < 0) {
    // due to rounding errors it might be e.g. -1.3877787807814457e-17
    radicant = 0;
  }

  radicant /= rx_sq * y1p_sq + ry_sq * x1p_sq;
  radicant = Math.sqrt(radicant) * (fa === fs ? -1 : 1);
  const cxp = radicant * rx / ry * y1p;
  const cyp = radicant * -ry / rx * x1p; // Step 3.
  //
  // Transform back to get centre coordinates (cx, cy) in the original
  // coordinate system.
  //

  const cx = cos_phi * cxp - sin_phi * cyp + (x1 + x2) / 2;
  const cy = sin_phi * cxp + cos_phi * cyp + (y1 + y2) / 2; // Step 4.
  //
  // Compute angles (theta1, delta_theta).
  //

  const v1x = (x1p - cxp) / rx;
  const v1y = (y1p - cyp) / ry;
  const v2x = (-x1p - cxp) / rx;
  const v2y = (-y1p - cyp) / ry;
  const theta1 = unit_vector_angle(1, 0, v1x, v1y);
  let delta_theta = unit_vector_angle(v1x, v1y, v2x, v2y);

  if (fs === 0 && delta_theta > 0) {
    delta_theta -= TAU;
  }

  if (fs === 1 && delta_theta < 0) {
    delta_theta += TAU;
  }

  return [cx, cy, theta1, delta_theta];
} //
// Approximate one unit arc segment with bézier curves,
// see http://math.stackexchange.com/questions/873224
//


function approximate_unit_arc(theta1, delta_theta) {
  const alpha = 4 / 3 * Math.tan(delta_theta / 4);
  const x1 = Math.cos(theta1);
  const y1 = Math.sin(theta1);
  const x2 = Math.cos(theta1 + delta_theta);
  const y2 = Math.sin(theta1 + delta_theta);
  return [x1, y1, x1 - y1 * alpha, y1 + x1 * alpha, x2 + y2 * alpha, y2 - x2 * alpha, x2, y2];
}

function a2c(x1, y1, x2, y2, fa, fs, rx, ry, phi) {
  const sin_phi = Math.sin(phi * TAU / 360);
  const cos_phi = Math.cos(phi * TAU / 360); // Make sure radii are valid
  //

  const x1p = cos_phi * (x1 - x2) / 2 + sin_phi * (y1 - y2) / 2;
  const y1p = -sin_phi * (x1 - x2) / 2 + cos_phi * (y1 - y2) / 2;

  if (x1p === 0 && y1p === 0) {
    // we're asked to draw line to itself
    return [];
  }

  if (rx === 0 || ry === 0) {
    // one of the radii is zero
    return [];
  } // Compensate out-of-range radii
  //


  rx = Math.abs(rx);
  ry = Math.abs(ry);
  const lambda = x1p * x1p / (rx * rx) + y1p * y1p / (ry * ry);

  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  } // Get center parameters (cx, cy, theta1, delta_theta)
  //


  const cc = get_arc_center(x1, y1, x2, y2, fa, fs, rx, ry, sin_phi, cos_phi);
  const result = [];
  let theta1 = cc[2];
  let delta_theta = cc[3]; // Split an arc to multiple segments, so each segment
  // will be less than τ/4 (= 90°)
  //

  const segments = Math.max(Math.ceil(Math.abs(delta_theta) / (TAU / 4)), 1);
  delta_theta /= segments;

  for (let i = 0; i < segments; i++) {
    result.push(approximate_unit_arc(theta1, delta_theta));
    theta1 += delta_theta;
  } // We have a bezier approximation of a unit circle,
  // now need to transform back to the original ellipse
  //


  return result.map(curve => {
    for (let i = 0; i < curve.length; i += 2) {
      let x = curve[i + 0];
      let y = curve[i + 1]; // scale

      x *= rx;
      y *= ry; // rotate

      const xp = cos_phi * x - sin_phi * y;
      const yp = sin_phi * x + cos_phi * y; // translate

      curve[i + 0] = xp + cc[0];
      curve[i + 1] = yp + cc[1];
    }

    return curve;
  });
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isPath; });
// https://github.com/dy/is-svg-path
function isPath(str) {
  if (typeof str !== 'string') return false;
  str = str.trim(); // https://www.w3.org/TR/SVG/paths.html#PathDataBNF

  if (/^[mzlhvcsqta]\s*[-+.0-9][^mlhvzcsqta]+/i.test(str) && /[\dz]$/i.test(str) && str.length > 4) return true;
  return false;
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parse_font__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseFont", function() { return _parse_font__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _svgpath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSvgPath", function() { return _svgpath__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendUnit", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["appendUnit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["Color"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fourValuesShortCut", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["fourValuesShortCut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eightValuesShortCut", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["eightValuesShortCut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notice", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["notice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oneOrTwoValues", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["oneOrTwoValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseColor", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["parseColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseColorString", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["parseColorString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "praseString", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["praseString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseStringFloat", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["parseStringFloat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseStringInt", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["parseStringInt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseStringTransform", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["parseStringTransform"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rectVertices", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["rectVertices"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortOrderedSprites", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["sortOrderedSprites"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateID", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["generateID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sizeToPixel", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["sizeToPixel"]; });

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cachable", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["cachable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "composit", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["composit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "attr", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["attr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecate", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["deprecate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flow", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["flow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "absolute", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["absolute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "relative", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["relative"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inherit", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["inherit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inheritAttributes", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["inheritAttributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseValue", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["parseValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setDeprecation", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["setDeprecation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decorators", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["decorators"]; });

/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "attributeNames", function() { return _store__WEBPACK_IMPORTED_MODULE_4__["attributeNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "relatedAttributes", function() { return _store__WEBPACK_IMPORTED_MODULE_4__["relatedAttributes"]; });

/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findColor", function() { return _render__WEBPACK_IMPORTED_MODULE_5__["findColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cacheContextPool", function() { return _render__WEBPACK_IMPORTED_MODULE_5__["cacheContextPool"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawRadiusBox", function() { return _render__WEBPACK_IMPORTED_MODULE_5__["drawRadiusBox"]; });









/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseFont; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
// borrow from node-canvas (https://github.com/Automattic/node-canvas)

/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00',
      styles = 'italic|oblique',
      variants = 'small-caps',
      stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded',
      units = 'px|pt|pc|in|cm|mm|em|ex|rem|q|vw|vh|vmax|vmin|%',
      string = '\'([^\']+)\'|"([^"]+)"|([\\w-]|[\u4e00-\u9fa5])+'; // [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop

const weightRe = new RegExp(`(${weights}) +`, 'i');
const styleRe = new RegExp(`(${styles}) +`, 'i');
const variantRe = new RegExp(`(${variants}) +`, 'i');
const stretchRe = new RegExp(`(${stretches}) +`, 'i');
/* eslint-disable prefer-template */

const sizeFamilyRe = new RegExp('([\\d\\.]+)(' + units + ') *' + '((?:' + string + ')( *, *(?:' + string + '))*)');
/* eslint-enable prefer-template */

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

function parseFont(str, defaultHeight) {
  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str);
  if (!sizeFamily) return; // invalid
  // Default values and required properties

  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/ *, */g, ',')
  }; // Stop search at `sizeFamily.index`

  const substr = str.substring(0, sizeFamily.index); // Optional, unordered properties.

  const weight = weightRe.exec(substr),
        style = styleRe.exec(substr),
        variant = variantRe.exec(substr),
        stretch = stretchRe.exec(substr);
  if (weight) font.weight = weight[1];
  if (style) font.style = style[1];
  if (variant) font.variant = variant[1];
  if (stretch) font.stretch = stretch[1];
  font.size0 = font.size;
  font.size = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sizeToPixel"])({
    size: font.size0,
    unit: font.unit
  }, defaultHeight);

  if (font.unit === 'vw' || font.unit === 'vh') {
    if (typeof document !== 'undefined' && document.documentElement) {
      const {
        clientWidth,
        clientHeight
      } = document.documentElement;
      const val = font.unit === 'vw' ? clientWidth : clientHeight;
      font.size = val * font.size / 100;
    }
  }

  return font;
}
/* eslint-enable */

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseColor", function() { return parseColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseColorString", function() { return parseColorString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseStringTransform", function() { return parseStringTransform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseValuesString", function() { return parseValuesString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "praseString", function() { return praseString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseStringInt", function() { return parseStringInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseStringFloat", function() { return parseStringFloat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oneOrTwoValues", function() { return oneOrTwoValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fourValuesShortCut", function() { return fourValuesShortCut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eightValuesShortCut", function() { return eightValuesShortCut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rectVertices", function() { return rectVertices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendUnit", function() { return appendUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortOrderedSprites", function() { return sortOrderedSprites; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notice", function() { return notice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateID", function() { return generateID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeToPixel", function() { return sizeToPixel; });
const colorString = __webpack_require__(22);

class Color {
  constructor(color) {
    if (typeof color === 'string') {
      const {
        model,
        value
      } = colorString.get(color || 'rgba(0,0,0,1)');
      this.model = model;
      this.value = value;
    } else {
      this.model = color.model;
      this.value = color.value;
    }
  }

  toString() {
    const [a, b, c, d] = this.value;
    const model = this.model;

    if (model === 'rgb') {
      return `${model}a(${a},${b},${c},${d})`;
    }

    return `${model}a(${a},${b}%,${c}%,${d})`;
  }

  get str() {
    return String(this);
  }

}


function parseColor(color) {
  return new Color(color);
}
function parseColorString(color) {
  if (color && typeof color === 'string' && color !== 'inherit') {
    return parseColor(color).toString();
  }

  return color;
}
function parseStringTransform(str) {
  if (typeof str !== 'string') return str;
  const rules = str.match(/(?:^|\s)+((?:scale|rotate|translate|skew|matrix)\([^()]+\))/g);
  const ret = {};

  if (rules) {
    rules.forEach(rule => {
      const matched = rule.match(/(scale|rotate|translate|skew|matrix)\(([^()]+)\)/);
      const [, m, v] = matched;

      if (m === 'rotate') {
        ret[m] = parseStringFloat(v)[0];
      } else {
        ret[m] = parseStringFloat(v);
      }
    });
  }

  return ret;
}
function parseValuesString(str, parser) {
  if (typeof str === 'string' && str !== '' && str !== 'inherit') {
    const values = str.split(/[\s,]+/g);
    return values.map(v => {
      const ret = parser ? parser(v) : v;
      return Number.isNaN(ret) ? v : ret;
    });
  }

  return str;
}
function praseString(str) {
  return parseValuesString(str);
}
function parseStringInt(str) {
  return parseValuesString(str, parseInt);
}
function parseStringFloat(str) {
  return parseValuesString(str, v => {
    if (v === 'center') return 0.5;
    if (v === 'left' || v === 'top') return 0;
    if (v === 'right' || v === 'bottom') return 1;
    return parseFloat(v);
  });
}
function oneOrTwoValues(val) {
  if (!Array.isArray(val)) {
    return [val, val];
  }

  if (val.length === 1) {
    return [val[0], val[0]];
  }

  return val;
}
function fourValuesShortCut(val) {
  if (!Array.isArray(val)) {
    return [val, val, val, val];
  }

  if (val.length === 1) {
    return [val[0], val[0], val[0], val[0]];
  }

  if (val.length === 2) {
    return [val[0], val[1], val[0], val[1]];
  }

  return [...val, 0, 0, 0, 0].slice(0, 4);
}
function eightValuesShortCut(val) {
  if (!Array.isArray(val)) {
    return [val, val, val, val, val, val, val, val];
  }

  if (val.length === 1) {
    return eightValuesShortCut(val[0]);
  }

  if (val.length === 2) {
    return [val[0], val[1], val[0], val[1], val[0], val[1], val[0], val[1]];
  }

  if (val.length === 4) {
    return [val[0], val[1], val[2], val[3], val[0], val[1], val[2], val[3]];
  }

  return [...val, 0, 0, 0, 0, 0, 0, 0, 0].slice(0, 8);
}
function rectVertices(rect) {
  const [x, y, w, h] = rect;
  return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
}
function appendUnit(value, defaultUnit = 'px') {
  if (value === '') {
    return value;
  }

  if (typeof value === 'string' && Number.isNaN(Number(value))) {
    return value;
  }

  return value + defaultUnit;
}
function sortOrderedSprites(sprites, reversed = false) {
  return [...sprites].sort((a, b) => {
    if (reversed) [a, b] = [b, a];

    if (a.zIndex === b.zIndex) {
      return a.zOrder - b.zOrder;
    }

    return a.zIndex - b.zIndex;
  });
}
const noticed = new Set();
function notice(msg, level = 'warn') {
  if (typeof console !== 'undefined' && !noticed.has(msg)) {
    console[level](msg); // eslint-disable-line no-console

    noticed.add(msg);
  }
}
const IDMap = new WeakMap();
function generateID(obj) {
  if (IDMap.has(obj)) {
    return IDMap.get(obj);
  }

  const id = Math.random().toString(36).slice(2);
  IDMap.set(obj, id);
  return id;
}
function sizeToPixel(value, defaultWidth) {
  // eslint-disable-line complexity
  if (typeof value === 'string') {
    const matched = value.trim().match(/^([\d.]+)(px|pt|pc|in|cm|mm|em|ex|rem|q|vw|vh|vmax|vmin|%)$/);

    if (matched) {
      value = {
        size: parseFloat(matched[1]),
        unit: matched[2]
      };
    } else {
      value = {
        size: parseInt(value, 10),
        unit: 'px'
      };
    }
  }

  let {
    size,
    unit
  } = value;

  if (unit === 'pt') {
    size /= 0.75;
  } else if (unit === 'pc') {
    size *= 16;
  } else if (unit === 'in') {
    size *= 96;
  } else if (unit === 'cm') {
    size *= 96.0 / 2.54;
  } else if (unit === 'mm') {
    size *= 96.0 / 25.4;
  } else if (unit === 'em' || unit === 'rem' || unit === 'ex') {
    if (!defaultWidth && typeof getComputedStyle === 'function' && typeof document !== 'undefined') {
      const root = getComputedStyle(document.documentElement).fontSize;
      defaultWidth = sizeToPixel(root, 16);
    }

    size *= defaultWidth;
    if (unit === 'ex') size /= 2;
  } else if (unit === 'q') {
    size *= 96.0 / 25.4 / 4;
  } else if (unit === 'vw' || unit === 'vh') {
    if (typeof document !== 'undefined') {
      const val = unit === 'vw' ? document.documentElement.clientWidth : document.documentElement.clientHeight;
      size *= val / 100;
    }
  } else if (unit === 'vmax' || unit === 'vmin') {
    if (typeof document !== 'undefined') {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;

      if (unit === 'vmax') {
        size *= Math.max(width, height) / 100;
      } else {
        size *= Math.min(width, height) / 100;
      }
    }
  }

  return size;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(23);
var swizzle = __webpack_require__(24);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(25);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createSvgPath; });
/* harmony import */ var svg_path_to_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

function createSvgPath(path) {
  if (typeof path === 'string') path = {
    d: path
  };
  const p = new svg_path_to_canvas__WEBPACK_IMPORTED_MODULE_0__["default"](path.d);

  if (path.transform || path.trim) {
    if (path.transform) {
      Object.entries(path.transform).forEach(([key, value]) => {
        if (!Array.isArray(value)) value = [value];
        p[key](...value);
      });
    }

    if (path.trim) {
      p.trim();
    }
  }

  return p;
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attr", function() { return attr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "composit", function() { return composit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cachable", function() { return cachable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inheritAttributes", function() { return inheritAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inherit", function() { return inherit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "relative", function() { return relative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flow", function() { return flow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "absolute", function() { return absolute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDeprecation", function() { return setDeprecation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deprecate", function() { return deprecate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseValue", function() { return parseValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decorators", function() { return decorators; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);



const _attrAbsolute = Symbol('attrAbsolute');
/* eslint-disable prefer-rest-params */


function polyfillLegacy(target, key, descriptor) {
  return {
    target,
    key,
    descriptor
  };
}

function getPV(subject, relative) {
  let parent = subject.parent;
  let pv = null;

  if (parent) {
    let attrSize = parent.attrSize;

    if (attrSize) {
      const attrV = relative === 'pw' ? attrSize[0] : attrSize[1];

      while (attrSize && attrV === '') {
        // flexible value
        parent = parent.parent;
        attrSize = parent.attrSize;
      }
    }

    if (relative === 'pw') {
      pv = attrSize ? parent.contentSize[0] : parent.resolution[0];
    } else if (relative === 'ph') {
      pv = attrSize ? parent.contentSize[1] : parent.resolution[1];
    }
  }

  return pv;
}

function attr(options) {
  let cache = false,
      reflow = false,
      relayout = false,
      quiet = false,
      value = null,
      extra = null;

  const decorator = function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    const {
      key,
      kind
    } = elementDescriptor;
    _store__WEBPACK_IMPORTED_MODULE_1__["attributeNames"].add(key);

    if (quiet && (cache || reflow || relayout)) {
      throw new Error(`${key}: quietSet cannot enable cache or reflow or relayout`);
    } // let _symbolKey = key;


    let defaultValue = value != null ? value : elementDescriptor.value;
    const relativeType = elementDescriptor.descriptor.__relative;
    const inheritValue = elementDescriptor.descriptor.__inherit;
    const composit = elementDescriptor.descriptor.__composit;

    if (kind === 'field') {
      defaultValue = elementDescriptor.initializer ? elementDescriptor.initializer() : value; // _symbolKey = Symbol(key);

      const setter = quiet ? function (val) {
        this.quietSet(key, val);
      } : function (val) {
        this.set(key, val);
      };
      elementDescriptor = {
        kind: 'method',
        key,
        placement: 'prototype',
        descriptor: {
          configurable: true,
          enumerable: true,
          set: setter,

          get() {
            return this.get(key);
          }

        }
      };
    }

    if (relativeType) {
      elementDescriptor = applyRative(elementDescriptor, relativeType);
    }

    if (inheritValue) {
      elementDescriptor = applyInherit(elementDescriptor, inheritValue.defaultValue);
    }

    const descriptor = elementDescriptor.descriptor;
    let _getter = descriptor.get;

    if (!_getter) {
      _getter = function () {
        const ret = this.get(key);
        return ret != null ? ret : this.getDefaultValue(key, defaultValue);
      };
    }

    if (composit) {
      if (cache || reflow || relayout || quiet || value || extra) {
        throw new Error('Cannot apply state to composit attribute.');
      }

      descriptor.get = _getter;
    } else if (!relativeType && !inheritValue) {
      descriptor.get = function () {
        const ret = _getter.call(this);

        return ret != null ? ret : this.getDefaultValue(key, defaultValue);
      };
    } else if (relativeType) {
      // enable set default to user defined getter
      descriptor.get = function () {
        let ret = _getter.call(this);

        const subject = this.subject;

        if (ret == null) {
          ret = this.getDefaultValue(key, defaultValue);
        } else if (ret.relative) {
          const relative = ret.relative.trim();

          if (relative === 'pw' || relative === 'ph') {
            const pv = getPV(subject, relative);

            if (pv !== ret.pv) {
              this[key] = ret.rv;
              return this[key];
            }

            subject.cache = null;

            if (subject[_attrAbsolute]) {
              return pv * ret.v;
            }

            return ret.rv;
          }

          if (relative === 'rw' || relative === 'rh') {
            const layer = subject.layer;
            let pv = null;

            if (layer) {
              if (relative === 'rw') {
                pv = layer.resolution[0];
              } else if (relative === 'rh') {
                pv = layer.resolution[1];
              }
            }

            if (pv !== ret.pv) {
              this[key] = ret.rv;
              return this[key];
            }

            subject.cache = null;

            if (subject[_attrAbsolute]) {
              return pv * ret.v;
            }

            return ret.rv;
          }
        }

        return ret;
      };
    } else {
      // enable set default to user defined getter
      descriptor.get = function () {
        let ret = _getter.call(this);

        const subject = this.subject;

        if (ret == null) {
          ret = this.getDefaultValue(key, defaultValue);
        }

        if (ret === 'inherit') {
          let value = null;
          let parent = subject.parent;

          while (parent && parent.attr) {
            value = parent.attr(key);
            if (value != null) break;
            parent = parent.parent;
          }

          return value != null ? value : this.__inheritDefaults[key];
        }

        return ret;
      };
    }

    if (!composit) {
      const _setter = descriptor.set;

      const _clearCache = !(descriptor.__cachable || cache);

      descriptor.set = function (val) {
        const subject = this.subject;
        this.__updateTag = false;
        this.__reflowTag = reflow;
        this.__clearLayout = relayout;

        if (!this.__styleTag && val != null && this.__attributesSet) {
          this.__attributesSet.add(key);
        }

        if (!this.__styleTag && val == null && this.__attributesSet) {
          if (this.__attributesSet.has(key)) {
            this.__attributesSet.delete(key);
          }
        }

        _setter.call(this, val);

        if (subject && !this.__quietTag && this.__updateTag) {
          let clearLayout = this.__clearLayout;

          if (this.__reflowTag) {
            // reflow must before clearLayout because boxOffsetSize is also flowed.
            subject.reflow();
          }

          if (subject.hasLayout) {
            const offsetSize = subject.boxOffsetSize,
                  layoutSize = subject.__lastLayout;
            clearLayout |= !layoutSize || offsetSize[0] !== layoutSize[0] || offsetSize[1] !== layoutSize[1];
            subject.__lastLayout = offsetSize;
          }

          if (clearLayout) subject.clearLayout();
          subject.forceUpdate(_clearCache);
        }

        if (this.__updateTag) {
          if (_store__WEBPACK_IMPORTED_MODULE_1__["relatedAttributes"].has(key)) {
            subject.updateStyles();
          }

          if (extra) {
            this[extra](key, val);
          }
        }
      }; // delete this.__reflowTag;
      // delete this.__updateTag;

    }

    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };

  if (options.descriptor) {
    return decorator(options);
  }

  if (arguments.length === 3) {
    return decorator.apply(this, arguments);
  }

  quiet = !!options.quiet;
  cache = !!options.cache;
  reflow = !!options.reflow;
  relayout = !!options.relayout;
  value = options.value;
  extra = options.extra;
  return decorator;
}
function composit(struct) {
  return function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    const {
      kind,
      key
    } = elementDescriptor;

    if (kind !== 'field') {
      throw new Error(`Invalid composit attribute ${key}`);
    }

    elementDescriptor.kind = 'method';
    let set, get;

    if (typeof struct === 'string') {
      set = function (val) {
        this[struct] = val;
      };

      get = function () {
        return this[struct];
      };
    } else if (Array.isArray(struct)) {
      set = function (val) {
        struct.forEach((key, i) => {
          this[key] = val != null ? val[i] : null;
        });
      };

      get = function () {
        return struct.map(key => this[key]);
      };
    } else {
      struct = Object.entries(struct);

      set = function (val) {
        struct.forEach(([prop, key]) => {
          this[key] = val != null ? val[prop] : null;
        });
      };

      get = function () {
        const ret = {};
        struct.forEach(([prop, key]) => {
          ret[prop] = this[key];
        });
        return ret;
      };
    }

    elementDescriptor.descriptor = {
      get,
      set,
      __composit: true
    };
    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
} // after attr

function cachable(elementDescriptor) {
  if (arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }

  const {
    descriptor
  } = elementDescriptor;
  descriptor.__cachable = true;
  if (arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
}
const inheritAttributes = new Set(); // after attr

function inherit(defaultValue = '') {
  return function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    const {
      descriptor
    } = elementDescriptor;
    descriptor.__inherit = {
      defaultValue
    };
    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
}

function applyInherit(elementDescriptor, defaultValue) {
  const {
    key,
    finisher,
    target
  } = elementDescriptor;
  inheritAttributes.add(key);

  if (target) {
    if (!target.hasOwnProperty('__inheritDefaults')) {
      // eslint-disable-line no-prototype-builtins
      target.__inheritDefaults = Object.create(target.__inheritDefaults || null);
    }

    target.__inheritDefaults[key] = defaultValue;
    return elementDescriptor;
  }

  return { ...elementDescriptor,

    finisher(klass) {
      if (finisher) finisher(klass);
      const {
        prototype: proto
      } = klass;

      if (!proto.hasOwnProperty('__inheritDefaults')) {
        // eslint-disable-line no-prototype-builtins
        proto.__inheritDefaults = Object.create(proto.__inheritDefaults || null);
      }

      proto.__inheritDefaults[key] = defaultValue;
    }

  };
} // after attr
// relative -> width | height


function relative(type = 'width') {
  return function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    const {
      descriptor
    } = elementDescriptor;
    descriptor.__relative = type;
    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
}

function applyRative(elementDescriptor, type) {
  const {
    descriptor
  } = elementDescriptor;
  const setter = descriptor.set;

  descriptor.set = function (val) {
    if (typeof val === 'string') {
      val = val.trim();

      if (val.slice(-1) === '%') {
        const relative = type === 'width' ? 'pw' : 'ph';
        const pv = getPV(this.subject, relative);
        val = {
          relative,
          pv,
          v: parseFloat(val) / 100,
          rv: val
        };
      } else {
        const relative = val.slice(-2);

        if (relative === 'rw' || relative === 'rh') {
          let pv = null;
          const layer = this.subject.layer;

          if (layer) {
            pv = layer.resolution[relative === 'rw' ? 0 : 1];
          }

          val = {
            relative,
            pv,
            v: parseFloat(val) / 100,
            rv: val
          };
        } else {
          val = val ? parseFloat(val) : val;
        }
      }
    }

    setter.call(this, val);
  };

  return elementDescriptor;
}

function flow(elementDescriptor) {
  if (arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }

  const {
    descriptor,
    key
  } = elementDescriptor;

  if (descriptor.get) {
    const _getter = descriptor.get;

    descriptor.get = function () {
      let ret = this.flow(key);

      if (ret === undefined) {
        ret = _getter.call(this);
        this.flow(key, ret);
      }

      return ret;
    };
  }

  if (arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
} // set tag force to get absolute value from relative attributes

function absolute(elementDescriptor) {
  if (arguments.length === 3) {
    elementDescriptor = polyfillLegacy.apply(this, arguments);
  }

  const {
    descriptor
  } = elementDescriptor;

  if (descriptor.get) {
    const _getter = descriptor.get;

    descriptor.get = function () {
      this[_attrAbsolute] = true;

      const ret = _getter.call(this);

      this[_attrAbsolute] = false;
      return ret;
    };
  }

  if (arguments.length === 3) return elementDescriptor.descriptor;
  return elementDescriptor;
}
function setDeprecation(apiName, msg = '') {
  msg = `[Deprecation] ${apiName} has been deprecated.${msg}`;
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["notice"])(msg);
}
function deprecate(msg, apiName = '') {
  const decorator = function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    const {
      descriptor,
      key
    } = elementDescriptor;
    apiName = apiName || `Method ${key}`;

    if (typeof descriptor.value === 'function') {
      const func = descriptor.value;

      descriptor.value = function (...args) {
        setDeprecation(apiName, msg);
        return func.apply(this, args);
      };
    }

    if (descriptor.set) {
      const setter = descriptor.set;

      descriptor.set = function (val) {
        setDeprecation(apiName, msg);
        return setter.call(this, val);
      };
    }

    if (descriptor.get) {
      const getter = descriptor.get;

      descriptor.get = function () {
        setDeprecation(apiName, msg);
        return getter.call(this);
      };
    }

    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };

  if (msg.descriptor) {
    return decorator(msg);
  }

  if (arguments.length === 3) {
    return decorator.apply(this, arguments);
  }

  return decorator;
} // before attr

function parseValue(...parsers) {
  return function (elementDescriptor) {
    if (arguments.length === 3) {
      elementDescriptor = polyfillLegacy.apply(this, arguments);
    }

    const {
      descriptor
    } = elementDescriptor;
    const setter = descriptor.set;

    descriptor.set = function (val) {
      if (val != null && val !== '' && val !== 'inherit') {
        val = parsers.reduce((v, parser) => parser(v), val);
      }

      setter.call(this, val);
    };

    if (arguments.length === 3) return elementDescriptor.descriptor;
    return elementDescriptor;
  };
} // return a function to apply any decorators to a descriptor

function decorators(...funcs) {
  return function (key, value, descriptor) {
    let elementDescriptor;

    if (!descriptor) {
      elementDescriptor = key;
    } else {
      elementDescriptor = {
        key,
        descriptor,
        value
      };
    }

    const ret = funcs.reduceRight(function (a, b) {
      return b.call(this, a);
    }, elementDescriptor);
    return ret && ret.descriptor;
  };
}
/* eslint-enable prefer-rest-params */

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attributeNames", function() { return attributeNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "relatedAttributes", function() { return relatedAttributes; });
const attributeNames = new Set();
const relatedAttributes = new Set();

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawRadiusBox", function() { return drawRadiusBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findColor", function() { return findColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cacheContextPool", function() { return cacheContextPool; });
// export function drawRadiusBox(context, {x, y, w, h, r}) {
//   // avoid radius larger than width or height
//   r = Math.min(r, Math.floor(Math.min(w, h) / 2));
//   // avoid radius is negative
//   r = Math.max(r, 0);
//   context.beginPath();
//   context.moveTo(x + r, y);
//   context.arcTo(x + w, y, x + w, y + h, r);
//   context.arcTo(x + w, y + h, x, y + h, r);
//   context.arcTo(x, y + h, x, y, r);
//   context.arcTo(x, y, x + w, y, r);
//   context.closePath();
// }
function drawEllipseBorder(ctx, x, y, w, h, pos = 'leftTop') {
  const kappa = 0.5522848,
        ox = w / 2 * kappa,
        // control point offset horizontal
  oy = h / 2 * kappa,
        // control point offset vertical
  xe = x + w,
        // x-end
  ye = y + h,
        // y-end
  xm = x + w / 2,
        // x-middle
  ym = y + h / 2; // y-middle

  if (pos === 'leftTop') {
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  } else if (pos === 'rightTop') {
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  } else if (pos === 'rightBottom') {
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  } else if (pos === 'leftBottom') {
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  }
}

function drawRadiusBox(context, [x, y, w, h], radius) {
  if (!radius) {
    context.beginPath();
    context.rect(x, y, w, h);
  } else {
    if (!radius) radius = [0, 0, 0, 0, 0, 0, 0, 0];
    if (typeof radius === 'number') radius = Array(8).fill(radius);
    const [tl0, tl1, tr0, tr1, br0, br1, bl0, bl1] = radius.map((r, i) => {
      if (i % 2) return Math.min(r, h / 2);
      return Math.min(r, w / 2);
    });
    context.beginPath();
    context.moveTo(x, y + tl1);
    drawEllipseBorder(context, x, y, tl0 * 2, tl1 * 2, 'leftTop');
    context.lineTo(x + w - tr0, y);
    drawEllipseBorder(context, x + w - tr0 * 2, y, tr0 * 2, tr1 * 2, 'rightTop');
    context.lineTo(x + w, y + h - br1);
    drawEllipseBorder(context, x + w - br0 * 2, y + h - br1 * 2, br0 * 2, br1 * 2, 'rightBottom');
    context.lineTo(x + bl0, y + h);
    drawEllipseBorder(context, x, y + h - bl1 * 2, bl0 * 2, bl1 * 2, 'leftBottom');
    context.closePath();
  }
}
/* istanbul ignore next  */

function gradientBox(angle, rect) {
  const [x, y, w, h] = rect;
  angle %= 360;

  if (angle < 0) {
    angle += 360;
  }

  let ret = [x, y, x + w, y + h];

  if (angle >= 0 && angle < 90) {
    const tan = Math.tan(Math.PI * angle / 180);
    let d = tan * w;

    if (d <= h) {
      ret = [x, y, x + w, y + d];
    } else {
      d = h / tan;
      ret = [x, y, x + d, y + h];
    }
  } else if (angle >= 90 && angle < 180) {
    const tan = Math.tan(Math.PI * (angle - 90) / 180);
    let d = tan * h;

    if (d <= w) {
      ret = [x + w, y, x + w - d, y + h];
    } else {
      d = w / tan;
      ret = [x + w, y, x, y + d];
    }
  } else if (angle >= 180 && angle < 270) {
    const tan = Math.tan(Math.PI * (angle - 180) / 180);
    let d = tan * w;

    if (d <= h) {
      ret = [x + w, y + h, x, y + h - d];
    } else {
      d = h / tan;
      ret = [x + w, y + h, x + w - d, y];
    }
  } else if (angle >= 270 && angle < 360) {
    const tan = Math.tan(Math.PI * (angle - 270) / 180);
    let d = tan * h;

    if (d <= w) {
      ret = [x, y + h, x + d, y];
    } else {
      d = w / tan;
      ret = [x, y + h, x + w, y + h - d];
    }
  }

  return ret;
}

function findColor(context, sprite, prop) {
  const gradients = sprite.attr('gradients') || {};
  let color = prop === 'border' ? sprite.attr(prop).color : sprite.attr(prop),
      gradient;

  if (gradients[prop]) {
    /* istanbul ignore next */
    gradient = gradients[prop];
  } else if (typeof color !== 'string') {
    gradient = color;
  }

  if (gradient) {
    let {
      colors,
      vector,
      direction,
      rect
    } = gradient;
    /* istanbul ignore if  */

    if (direction != null) {
      if (prop === 'border') {
        rect = rect || [0, 0, ...sprite.outerSize];
      } else {
        const {
          width: borderWidth
        } = sprite.attr('border');
        rect = rect || [borderWidth, borderWidth, ...sprite.innerSize];
      }

      vector = gradientBox(direction, rect);
    }

    if (vector.length === 4) {
      color = context.createLinearGradient(...vector);
    } else if (vector.length === 6) {
      color = context.createRadialGradient(...vector);
    }
    /* istanbul ignore next  */
    else if (vector.length === 3) {
        // for wxapp
        color = context.createCircularGradient(...vector);
      }
      /* istanbul ignore next  */
      else {
          throw Error('Invalid gradient vector!');
        }

    colors.forEach(o => {
      color.addColorStop(o.offset, o.color);
    });
  }

  return color;
}
const contextPool = [],
      contextReady = [],
      maxPollSize = 50;
const cacheContextPool = {
  get(context) {
    if (contextReady.length > 0) {
      return contextReady.pop();
    }

    const canvas = context.canvas;

    if (!canvas || !canvas.cloneNode) {
      return;
    }

    const copied = canvas.cloneNode();
    return copied.getContext('2d');
  },

  flush() {
    contextReady.push(...contextPool);
    contextPool.length = 0;
  },

  put(...contexts) {
    let size = this.size;
    contexts.every(context => {
      const ret = size++ < maxPollSize;

      if (ret) {
        context.canvas.width = 0;
        context.canvas.height = 0;
        contextPool.push(context);
      }

      return ret;
    });
  },

  get size() {
    return contextPool.length + contextReady.length;
  }

};

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseSprite; });
/* harmony import */ var sprite_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var sprite_animator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _baseattr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
/* harmony import */ var _basenode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33);
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34);
function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








const _animations = Symbol('animations'),
      _cachePriority = Symbol('cachePriority'),
      _effects = Symbol('effects'),
      _flow = Symbol('flow'),
      _releaseKeys = Symbol('releaseKeys');

const CACHE_PRIORITY_THRESHOLDS = 6; // const CACHE_PRIORITY_THRESHOLDS = 0; // disable cache_priority, for canvas drawing bug...

let BaseSprite = _decorate(null, function (_initialize, _BaseNode) {
  class BaseSprite extends _BaseNode {
    /**
      new Sprite({
        attr: {
          ...
        }
      })
     */
    constructor(attrs) {
      super(attrs);

      _initialize(this);

      this[_animations] = new Set();
      this[_cachePriority] = 0;
      this[_flow] = {};
      this[_releaseKeys] = new Set();
    }

  }

  return {
    F: BaseSprite,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",

      value() {
        return _baseattr__WEBPACK_IMPORTED_MODULE_3__["default"];
      }

    }, {
      kind: "method",
      static: true,
      key: "setAttributeEffects",

      value(effects = {}) {
        if (this.prototype[_effects] == null) {
          this.prototype[_effects] = effects;
        }

        Object.assign(this.prototype[_effects], effects);
      }

    }, {
      kind: "method",
      static: true,
      key: "addAttributes",

      value(attrs = {}) {
        return this.Attr.addAttributes(attrs);
      }

    }, {
      kind: "method",
      static: true,
      key: "defineAttributes",

      value(attrs, effects) {
        this.Attr = class extends this.Attr {
          constructor(subject) {
            super(subject);

            if (attrs.init) {
              attrs.init.call(this, this, subject);
            }
          }

        };
        if (attrs) this.addAttributes(attrs);
        if (effects) this.setAttributeEffects(effects);
        return this.Attr;
      }

    }, {
      kind: "get",
      key: "effects",

      value() {
        return this[_effects];
      }

    }, {
      kind: "method",
      key: "setReleaseKey",

      value(key) {
        this[_releaseKeys].add(key);
      }

    }, {
      kind: "method",
      key: "reflow",

      value() {
        this[_flow] = {};
      }

    }, {
      kind: "method",
      key: "flow",

      value(prop, value) {
        if (value === undefined) {
          return this[_flow][prop];
        }

        this[_flow][prop] = value;
      }

    }, {
      kind: "get",
      key: "hasLayout",

      value() {
        if (this.attr('position') === 'absolute') return false;

        if (this.parent && this.parent.relayout) {
          const display = this.parent.attr('display');
          return display !== '' && display !== 'static';
        }

        return false;
      }

    }, {
      kind: "set",
      key: "zIndex",

      value(val) {
        this.attr('zIndex', val);
      }

    }, {
      kind: "get",
      key: "zIndex",

      value() {
        return this.attr('zIndex');
      }

    }, {
      kind: "get",
      key: "isVirtual",

      value() {
        return false;
      }

    }, {
      kind: "method",
      key: "isVisible",

      value() {
        if (!this.parent) return false;
        const display = this.attr('display');

        if (display === 'none') {
          return false;
        }

        const opacity = this.attr('opacity');

        if (opacity <= 0) {
          return false;
        }

        if (this.isVirtual) return true;
        const [width, height] = this.offsetSize;

        if (width <= 0 || height <= 0) {
          return false;
        }

        if (this.parent.isVisible) {
          return this.parent.isVisible();
        }

        return true;
      }

    }, {
      kind: "get",
      key: "transform",

      value() {
        const transform = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Matrix"](this.attr('transformMatrix'));
        const transformOrigin = this.attr('transformOrigin');

        if (transformOrigin) {
          const t = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Matrix"]();
          t.translate(...transformOrigin);
          t.multiply(transform);
          t.translate(...transformOrigin.map(v => -v));
          return t;
        }

        return transform;
      }

    }, {
      kind: "method",
      key: "connect",

      value(parent, zOrder = 0) {
        if (parent && typeof parent.stroke === 'function') {
          // directly connect to canvas2d context
          const node = new _basenode__WEBPACK_IMPORTED_MODULE_4__["default"]();
          node.context = parent;
          node.timeline = new sprite_animator__WEBPACK_IMPORTED_MODULE_1__["Timeline"]();

          node.update = function () {
            const currentTime = this.timeline.currentTime;
            node.dispatchEvent('update', {
              target: this,
              timeline: this.timeline,
              renderTime: currentTime
            }, true, true);
          };

          parent = node;
        }

        const ret = _get(_getPrototypeOf(BaseSprite.prototype), "connect", this).call(this, parent, zOrder);

        Object.defineProperty(this, 'context', {
          get: () => parent.cache || parent.context,
          configurable: true
        });

        this[_animations].forEach(animation => {
          if (parent.layer) {
            animation.baseTimeline = parent.layer.timeline;
          }

          animation.play();
          animation.finished.then(() => {
            this[_animations].delete(animation);
          });
        });

        if (this.hasLayout) this.clearLayout();
        this.reflow();
        return ret;
      }

    }, {
      kind: "method",
      key: "disconnect",

      value(parent) {
        this[_animations].forEach(animation => animation.cancel());

        if (this.cache) {
          this.cache = null;
        }

        if (this.hasLayout) this.clearLayout();
        this.reflow();

        const ret = _get(_getPrototypeOf(BaseSprite.prototype), "disconnect", this).call(this, parent);

        delete this.context;
        [...this[_releaseKeys]].forEach(key => delete this[key]);
        return ret;
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_2__["absolute"]],
      key: "xy",

      value() {
        let x, y;

        if (this.hasLayout) {
          x = this.attr('layoutX');
          y = this.attr('layoutY');
        } else {
          [x, y] = this.attr('pos');
        }

        return [x, y];
      }

    }, {
      kind: "get",
      key: "animations",

      value() {
        return this[_animations];
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_2__["absolute"], _utils__WEBPACK_IMPORTED_MODULE_2__["flow"]],
      key: "attrSize",

      value() {
        let [width, height] = this.attr('size');
        const isBorderBox = this.attr('boxSizing') === 'border-box';

        if (this.hasLayout) {
          const layoutWidth = this.attr('layoutWidth'),
                layoutHeight = this.attr('layoutHeight');
          [width, height] = [layoutWidth !== '' ? layoutWidth : width, layoutHeight !== '' ? layoutHeight : height];
        }

        if (isBorderBox) {
          const borderWidth = this.attr('border').width,
                [paddingTop, paddingRight, paddingBottom, paddingLeft] = this.attr('padding');

          if (width !== '') {
            width = Math.max(0, width - 2 * borderWidth - paddingLeft - paddingRight);
          }

          if (height !== '') {
            height = Math.max(0, height - 2 * borderWidth - paddingTop - paddingBottom);
          }
        }

        return [width, height];
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_2__["absolute"], _utils__WEBPACK_IMPORTED_MODULE_2__["flow"]],
      key: "boxOffsetSize",

      value() {
        // get original boxSize, without layout
        if (this.isVirtual) return [0, 0];
        const [width, height] = this.attr('size');
        const [top, right, bottom, left] = this.attr('padding');
        const {
          width: borderWidth
        } = this.attr('border'),
              lw = borderWidth * 2;
        return [left + (width | 0) + right + lw, top + (height | 0) + bottom + lw];
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_2__["flow"]],
      key: "contentSize",

      value() {
        if (this.isVirtual) return [0, 0];
        const [width, height] = this.attrSize;
        return [width | 0, height | 0];
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_2__["flow"]],
      key: "clientSize",

      value() {
        const [top, right, bottom, left] = this.attr('padding'),
              [width, height] = this.contentSize;
        return [left + width + right, top + height + bottom];
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_2__["flow"]],
      key: "offsetSize",

      value() {
        const {
          width: borderWidth
        } = this.attr('border'),
              [width, height] = this.clientSize;
        return [width + 2 * borderWidth, height + 2 * borderWidth];
      }

    }, {
      kind: "get",
      key: "layoutSize",

      value() {
        const size = this.offsetSize;
        const [top, right, bottom, left] = this.attr('margin');
        return [left + size[0] + right, top + size[1] + bottom];
      }

    }, {
      kind: "get",
      key: "innerSize",

      value() {
        return this.contentSize;
      }

    }, {
      kind: "get",
      key: "outerSize",

      value() {
        return this.offsetSize;
      }

    }, {
      kind: "method",
      key: "getParentXY",

      value(lx = 0, ly = 0) {
        const layer = this.layer;
        if (!layer) return [0, 0];
        const parents = [];
        let target = this.parent;

        while (target && target !== layer) {
          parents.push(target);
          target = target.parent;
        }

        parents.reverse();
        let parentX = lx,
            parentY = ly;
        parents.forEach(node => {
          const scrollLeft = node.attr('scrollLeft'),
                scrollTop = node.attr('scrollTop'),
                borderWidth = node.attr('border').width,
                padding = node.attr('padding');
          [parentX, parentY] = node.pointToOffset(parentX, parentY);
          parentX = parentX - node.originalRect[0] - borderWidth - padding[3] + scrollLeft;
          parentY = parentY - node.originalRect[1] - borderWidth - padding[0] + scrollTop;
        });
        return [parentX, parentY];
      }

    }, {
      kind: "method",
      key: "getLayerXY",

      value(dx = 0, dy = 0) {
        const layer = this.layer;
        if (!layer) return [0, 0];
        let target = this;
        let [x, y] = [dx, dy];

        while (target && target !== layer) {
          [x, y] = target.offsetToPoint(x, y);
          const parent = target.parent;

          if (parent !== layer) {
            const borderWidth = parent.attr('border').width;
            const padding = parent.attr('padding'),
                  scrollLeft = parent.attr('scrollLeft') || 0,
                  scrollTop = parent.attr('scrollTop') || 0; // const parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft
            // const parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop

            x = x + parent.originalRect[0] + borderWidth + padding[3] - scrollLeft;
            y = y + parent.originalRect[1] + borderWidth + padding[0] - scrollTop;
          }

          target = parent;
        }

        return [x, y];
      }

    }, {
      kind: "get",
      key: "boundingRect",

      value() {
        const transform = this.transform;
        let [ox, oy, width, height] = this.originalRect;

        if (this.hasLayout) {
          const margin = this.attr('margin');
          width += margin[1];
          height += margin[2];
        }

        const vertexs = [[ox, oy], [width + ox, oy], [ox, height + oy], [width + ox, height + oy]];
        const transformed = vertexs.map(v => {
          return transform.transformPoint(v[0], v[1]);
        });
        const vx = transformed.map(v => v[0]),
              vy = transformed.map(v => v[1]);
        const minX = Math.min(...vx),
              minY = Math.min(...vy),
              maxX = Math.max(...vx),
              maxY = Math.max(...vy);
        return [...[minX, minY], ...[maxX - minX, maxY - minY]];
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_2__["flow"]],
      key: "originalRect",

      value() {
        const [width, height] = this.offsetSize,
              [anchorX, anchorY] = this.attr('anchor');
        const rect = [-anchorX * width, -anchorY * height, width, height];

        if (this.hasLayout) {
          const margin = this.attr('margin');
          rect[0] += margin[3];
          rect[1] += margin[0];
        }

        return rect;
      }

    }, {
      kind: "get",
      key: "originalRenderRect",

      value() {
        const bound = this.originalRect,
              pos = this.xy;
        return [pos[0] + bound[0], pos[1] + bound[1], bound[2], bound[3]];
      }

    }, {
      kind: "get",
      key: "renderBox",

      value() {
        const bound = this.boundingRect,
              pos = this.xy;
        return [pos[0] + bound[0], pos[1] + bound[1], pos[0] + bound[0] + bound[2], pos[1] + bound[1] + bound[3]];
      }

    }, {
      kind: "get",
      key: "renderRect",

      value() {
        const [x0, y0, x1, y1] = this.renderBox;
        return [x0, y0, x1 - x0, y1 - y0];
      }

    }, {
      kind: "get",
      key: "vertices",

      value() {
        const vertices = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["rectVertices"])(this.originalRect),
              transform = this.transform,
              [x0, y0] = this.xy;
        return vertices.map(v => {
          const [x, y] = transform.transformPoint(v[0], v[1]);
          return [x0 + x, y0 + y];
        });
      }

    }, {
      kind: "set",
      key: "cache",

      value(context) {
        if (context == null) {
          this[_cachePriority] = 0;

          if (this.parent && this.parent.cache) {
            this.parent.cache = null;
          }
        }

        if (this.cacheContext && context !== this.cacheContext) {
          _utils__WEBPACK_IMPORTED_MODULE_2__["cacheContextPool"].put(this.cacheContext);
        }

        this.cacheContext = context;
      }

    }, {
      kind: "get",
      key: "cache",

      value() {
        if (this[_cachePriority] >= CACHE_PRIORITY_THRESHOLDS) {
          return this.cacheContext;
        }

        if (this.cacheContext) {
          this.cache = null;
        }

        return false;
      }

    }, {
      kind: "method",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_2__["deprecate"])('Instead use sprite.cache = null')],
      key: "clearCache",

      value() {
        this.cache = null;
      }

    }, {
      kind: "method",
      key: "appendTo",

      value(parent) {
        parent.appendChild(this);
      }

    }, {
      kind: "method",
      key: "forceUpdate",

      value(clearCache = false) {
        if (clearCache) {
          this.cache = null;
        }

        _get(_getPrototypeOf(BaseSprite.prototype), "forceUpdate", this).call(this);
      }

    }, {
      kind: "method",
      key: "pointToOffset",

      value(x, y) {
        const [x0, y0] = this.xy;
        const [dx, dy] = [x - x0, y - y0];
        const transform = this.transform;
        return transform.inverse().transformPoint(dx, dy);
      }

    }, {
      kind: "method",
      key: "offsetToPoint",

      value(dx, dy) {
        const transform = this.transform;
        const [x0, y0] = this.xy;
        const [x, y] = transform.transformPoint(dx, dy);
        return [x + x0, y + y0];
      }

    }, {
      kind: "method",
      key: "getOffsetXY",

      value(evt) {
        let parentX, parentY;

        if (evt.parentX != null) {
          // group
          parentX = evt.parentX;
          parentY = evt.parentY;
        } else {
          parentX = evt.layerX;
          parentY = evt.layerY;
        }

        if (parentX != null && parentY != null) {
          return this.pointToOffset(parentX, parentY);
        }
      }

    }, {
      kind: "method",
      key: "dispatchEvent",

      value(type, evt, collisionState = false, swallow = false, useCapturePhase = null) {
        if (collisionState) {
          const offsetXY = this.getOffsetXY(evt);

          if (offsetXY) {
            evt.offsetX = offsetXY[0];
            evt.offsetY = offsetXY[1];
          }
        }

        return _get(_getPrototypeOf(BaseSprite.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow, useCapturePhase);
      }

    }, {
      kind: "method",
      key: "pointCollision",

      value(evt) {
        /* istanbul ignore if */
        if (!this.isVisible()) {
          return false;
        }

        const offsetXY = this.getOffsetXY(evt);
        if (!offsetXY) return true;
        let [nx, ny] = offsetXY;
        evt.offsetX = nx;
        evt.offsetY = ny;
        const [ox, oy, ow, oh] = this.originalRect;

        if (nx >= ox && nx - ox < ow && ny >= oy && ny - oy < oh) {
          if (this.context && this.context.isPointInPath) {
            const borderWidth = this.attr('border').width,
                  borderRadius = this.attr('borderRadius');

            if (borderWidth || borderRadius) {
              const [width, height] = this.outerSize;
              const [x, y, w, h, r] = [0, 0, width, height, borderRadius];
              Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drawRadiusBox"])(this.context, [x, y, w, h], r);

              if (this.layer && this.layer.offset) {
                nx += this.layer.offset[0];
                ny += this.layer.offset[1];
              }

              return this.context.isPointInPath(nx - ox, ny - oy);
            }
          }

          return true;
        }
      }

    }, {
      kind: "method",
      key: "OBBCollision",

      value(sprite) {
        // vertices: [p1, p2, p3, p4]
        const [p11, p12, p13] = this.vertices,
              [p21, p22, p23] = sprite.vertices;
        const a1 = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Vector"](p12, p11).unit(),
              a2 = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Vector"](p13, p12).unit(),
              a3 = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Vector"](p22, p21).unit(),
              a4 = new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Vector"](p23, p22).unit(); // The projection of the axis of a vertex in a certain direction

        function verticesProjection(vertices, axis) {
          const [p1, p2, p3, p4] = vertices.map(v => axis.dot(new sprite_math__WEBPACK_IMPORTED_MODULE_0__["Vector"](v)));
          return [Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4)];
        }

        function projectionIntersect(p1, p2) {
          const m1 = (p1[0] + p1[1]) / 2,
                l1 = Math.abs(p1[1] - p1[0]),
                m2 = (p2[0] + p2[1]) / 2,
                l2 = Math.abs(p2[1] - p2[0]);
          return Math.abs(m2 - m1) <= (l1 + l2) / 2;
        }

        return projectionIntersect(verticesProjection(this.vertices, a1), verticesProjection(sprite.vertices, a1)) && projectionIntersect(verticesProjection(this.vertices, a2), verticesProjection(sprite.vertices, a2)) && projectionIntersect(verticesProjection(this.vertices, a3), verticesProjection(sprite.vertices, a3)) && projectionIntersect(verticesProjection(this.vertices, a4), verticesProjection(sprite.vertices, a4));
      }

    }, {
      kind: "method",
      key: "relayout",

      value() {}

    }, {
      kind: "method",
      key: "draw",

      value(t, drawingContext = this.context) {
        // eslint-disable-line complexity
        _get(_getPrototypeOf(BaseSprite.prototype), "draw", this).call(this, t, drawingContext);

        if (!this.isVisible()) {
          return;
        }

        const bound = this.originalRect;
        let cachableContext = !this.isVirtual && this.cache;
        const filter = this.attr('filter'),
              shadow = this.attr('shadow'),
              clipOverflow = this.attr('clipOverflow'),
              enableCache = this.attr('enableCache') === true || this.attr('enableCache') === 'auto' && !this.__labelCount && clipOverflow || shadow || filter;
        const ratio = this.layer ? this.layer.displayRatio || 1.0 : 1.0;

        if (enableCache && (shadow || filter || cachableContext !== false) && !cachableContext) {
          cachableContext = _utils__WEBPACK_IMPORTED_MODULE_2__["cacheContextPool"].get(drawingContext);

          if (cachableContext) {
            // +2 to solve 1px problem
            cachableContext.canvas.width = Math.ceil(bound[2] * ratio) + 2;
            cachableContext.canvas.height = Math.ceil(bound[3] * ratio) + 2;
          }
        }

        const evtArgs = {
          context: drawingContext,
          cacheContext: cachableContext,
          target: this,
          renderTime: t,
          fromCache: !!this.cache
        };
        drawingContext.save();
        drawingContext.translate(...this.xy);
        drawingContext.transform(...this.transform.m); // fix for wxapp

        const alpha = drawingContext.globalAlpha != null ? drawingContext.globalAlpha : 1;
        drawingContext.globalAlpha = alpha * this.attr('opacity');

        if (!cachableContext) {
          drawingContext.translate(bound[0], bound[1]);
        } else {
          cachableContext.save(); // solve 1px problem

          cachableContext.translate(bound[0] - Math.floor(bound[0]) + 1, bound[1] - Math.floor(bound[1]) + 1);

          if (ratio !== 1.0) {
            cachableContext.scale(ratio, ratio);
          }
        }

        this.dispatchEvent('beforedraw', evtArgs, true, true);

        if (cachableContext) {
          // set cache before render for group
          if (!this.cache) {
            this.cache = cachableContext;
            this.render(t, cachableContext);
          }
        } else {
          this.render(t, drawingContext);
        }

        if ((shadow || filter) && !cachableContext) {
          console.warn('No cachable context. Shadows and filters have been ignored.');
        }

        if (!clipOverflow && cachableContext) {
          console.warn('Clip overflow is ignored because of cache enabled.');
        }

        if (cachableContext && cachableContext.canvas.width > 0 && cachableContext.canvas.height > 0) {
          if (filter) {
            drawingContext.filter = _filters__WEBPACK_IMPORTED_MODULE_5__["default"].compile(filter);
          }

          if (shadow) {
            let {
              blur,
              color,
              offset
            } = shadow;
            blur = blur || 1;
            color = color || 'rgba(0,0,0,1)';
            drawingContext.shadowBlur = blur;
            drawingContext.shadowColor = color;

            if (offset) {
              drawingContext.shadowOffsetX = offset[0];
              drawingContext.shadowOffsetY = offset[1];
            }
          }

          drawingContext.drawImage(cachableContext.canvas, Math.floor(bound[0]) - 1, Math.floor(bound[1]) - 1, bound[2] + 2, bound[3] + 2);
        }

        this.dispatchEvent('afterdraw', evtArgs, true, true);

        if (cachableContext) {
          cachableContext.restore();
        }

        drawingContext.restore();
        this[_cachePriority]++;
        return drawingContext;
      }

    }, {
      kind: "get",
      key: "needRender",

      value() {
        if (this.isVirtual) return false;
        const [offsetWidth, offsetHeight] = this.offsetSize;
        if (offsetWidth <= 0 || offsetHeight <= 0) return false;
        const border = this.attr('border');

        if (border.width <= 0 && this.attr('borderRadius') <= 0 && !this.attr('bgcolor') && !this.attr('gradients').bgcolor && !this.attr('bgimage')) {
          return false; // don't need to render
        }

        return true;
      }

    }, {
      kind: "method",
      key: "show",

      value() {
        this.attr('display', this.__originalDisplay || '');
        return this;
      }

    }, {
      kind: "method",
      key: "hide",

      value() {
        const display = this.attr('display');

        if (display !== 'none') {
          this.__originalDisplay = display;
          this.attr('display', 'none');
        }

        return this;
      }

    }, {
      kind: "method",
      key: "render",

      value(t, drawingContext) {
        const border = this.attr('border'),
              borderRadius = this.attr('borderRadius'),
              padding = this.attr('padding'),
              [offsetWidth, offsetHeight] = this.offsetSize,
              [clientWidth, clientHeight] = this.clientSize;

        if (!this.needRender) {
          drawingContext.translate(padding[3], padding[0]);
          return false;
        }

        const borderWidth = border.width;
        let borderStyle = border.style; // draw border

        if (borderWidth) {
          drawingContext.lineWidth = borderWidth;
          const [x, y, w, h, r] = [borderWidth / 2, borderWidth / 2, offsetWidth - borderWidth, offsetHeight - borderWidth, borderRadius];
          Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drawRadiusBox"])(drawingContext, [x, y, w, h], r);
          drawingContext.save();

          if (borderStyle && borderStyle !== 'solid') {
            const dashOffset = this.attr('dashOffset');
            drawingContext.lineDashOffset = dashOffset;

            if (borderStyle === 'dashed') {
              borderStyle = [borderWidth * 3, borderWidth * 3];
            }

            drawingContext.setLineDash(borderStyle);
          }

          drawingContext.strokeStyle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["findColor"])(drawingContext, this, 'border');
          drawingContext.stroke();
          drawingContext.restore();
        } // draw bgcolor


        const bgcolor = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["findColor"])(drawingContext, this, 'bgcolor');
        const bgimage = this.attr('bgimage');

        if (!this.cacheContext || borderWidth || borderRadius || bgcolor || bgimage && bgimage.display !== 'none') {
          let [x, y, w, h, r] = [borderWidth, borderWidth, clientWidth, clientHeight, borderRadius];

          if (Array.isArray(r)) {
            r = r.map(r => r - borderWidth / 2);
          }

          Object(_utils__WEBPACK_IMPORTED_MODULE_2__["drawRadiusBox"])(drawingContext, [x, y, w, h], r);

          if (bgcolor) {
            drawingContext.fillStyle = bgcolor;
            drawingContext.fill();
          } // clip is expensive, we should only perform clip when it has to.


          if (bgimage && bgimage.display !== 'none' || borderRadius && (this.nodeType !== 'sprite' || this.textures && this.textures.length)) {
            drawingContext.clip();
          }

          if (bgimage && bgimage.image && bgimage.display !== 'none') {
            drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
          }
        }

        drawingContext.translate(borderWidth + padding[3], borderWidth + padding[0]);
        return true;
      }

    }]
  };
}, _basenode__WEBPACK_IMPORTED_MODULE_4__["default"]);



function drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  const w = image.width,
        h = image.height;
  const [top, right, bottom, left] = clip9 || [16, 16, 16, 16];
  const leftTop = [0, 0, left, top],
        rightTop = [w - right, 0, right, top],
        rightBottom = [w - right, h - bottom, right, bottom],
        leftBottom = [0, h - bottom, left, bottom];
  const boxRight = offsetWidth - right - borderWidth,
        boxBottom = offsetHeight - borderWidth - bottom; // draw .9 cross

  const midWidth = w - left - right,
        midHeight = h - top - bottom;

  if (midWidth > 0) {
    let midBoxWidth = clientWidth - left - right + 2;
    let leftOffset = borderWidth + left - 1;

    while (midBoxWidth > 0) {
      const ww = Math.min(midBoxWidth, midWidth) + 1;
      const topPiece = [left - 1, 0, ww, top],
            bottomPiece = [left - 1, h - bottom, ww, bottom];
      drawingContext.drawImage(image, ...topPiece, leftOffset, borderWidth, ww, top);
      drawingContext.drawImage(image, ...bottomPiece, leftOffset, boxBottom, ww, bottom);
      midBoxWidth -= midWidth;

      if (midBoxWidth > 0) {
        leftOffset += midWidth;
      }
    }
  }

  if (midHeight > 0) {
    let midBoxHeight = clientHeight - top - bottom + 2;
    let topOffset = borderWidth + top - 1;

    while (midBoxHeight > 0) {
      const hh = Math.min(midBoxHeight, midHeight) + 1;
      const leftPiece = [0, top - 1, left, hh],
            rightPiece = [w - right, top - 1, right, hh];
      drawingContext.drawImage(image, ...leftPiece, borderWidth, topOffset, left, hh);
      drawingContext.drawImage(image, ...rightPiece, boxRight, topOffset, right, hh);
      midBoxHeight -= midHeight;

      if (midBoxHeight > 0) {
        topOffset += midHeight;
      }
    }
  }

  if (midHeight && midWidth > 0) {
    let midBoxWidth = clientWidth - left - right + 2;
    let leftOffset = borderWidth + left - 1;

    while (midBoxWidth > 0) {
      let midBoxHeight = clientHeight - top - bottom + 2;
      let topOffset = borderWidth + top - 1;

      while (midBoxHeight > 0) {
        const ww = Math.min(midBoxWidth, midWidth) + 1,
              hh = Math.min(midBoxHeight, midHeight) + 1;
        const midPiece = [left - 1, top - 1, ww, hh];
        drawingContext.drawImage(image, ...midPiece, leftOffset, topOffset, ww, hh);
        midBoxHeight -= midWidth;

        if (midBoxHeight > 0) {
          topOffset += midHeight;
        }
      }

      midBoxWidth -= midWidth;

      if (midBoxWidth > 0) {
        leftOffset += midWidth;
      }
    }
  } // draw four corners


  drawingContext.drawImage(image, ...leftTop, borderWidth, borderWidth, left, top);
  drawingContext.drawImage(image, ...rightTop, boxRight, borderWidth, right, top);
  drawingContext.drawImage(image, ...rightBottom, boxRight, boxBottom, left, bottom);
  drawingContext.drawImage(image, ...leftBottom, borderWidth, boxBottom, left, bottom);
}

function drawBgImage(drawingContext, bgimage, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight) {
  const {
    image,
    display,
    clip9
  } = bgimage;

  if (display === '.9') {
    drawDot9Image(drawingContext, image, clip9, borderWidth, offsetWidth, offsetHeight, clientWidth, clientHeight);
  } else {
    let offset = bgimage.offset || [0, 0],
        w = image.width,
        h = image.height;

    if (display === 'center') {
      offset = [(clientWidth - w) * 0.5, (clientHeight - h) * 0.5];
    } else if (display === 'stretch') {
      w = clientWidth - offset[0];
      h = clientHeight - offset[1];
    }

    drawingContext.drawImage(image, borderWidth + offset[0], borderWidth + offset[1], w, h);

    if (w > 0 && (display === 'repeat' || display === 'repeatX')) {
      let cw = clientWidth - borderWidth - offset[0] - w;

      while (cw > borderWidth) {
        drawingContext.drawImage(image, clientWidth - cw, borderWidth + offset[1], w, h);

        if (h > 0 && display === 'repeat') {
          let ch = clientHeight - borderWidth - offset[1] - h;

          while (ch > borderWidth) {
            drawingContext.drawImage(image, clientWidth - cw, clientHeight - ch, w, h);
            ch -= h;
          }
        }

        cw -= w;
      }
    }

    if (h > 0 && (display === 'repeat' || display === 'repeatY')) {
      let ch = clientHeight - borderWidth - offset[1] - h;

      while (ch > borderWidth) {
        drawingContext.drawImage(image, borderWidth + offset[0], clientHeight - ch, w, h);
        ch -= h;
      }
    }
  }
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SpriteAttr; });
/* harmony import */ var svg_path_to_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var sprite_math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _attr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





const cache = true,
      reflow = true,
      relayout = true;

function parseBorderValue(val) {
  if (val == null) {
    return null;
  }

  if (typeof val === 'number' || typeof val === 'string') {
    val = {
      width: parseFloat(val)
    };
  } else if (Array.isArray(val)) {
    val = {
      width: parseFloat(val[0]),
      color: Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseColorString"])(val[1] || '#000')
    };
  } else {
    val.width = parseFloat(val.width);
    val.color = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseColorString"])(val.color || '#000');
  }

  val = Object.assign({
    width: 1,
    color: Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseColorString"])('#000'),
    style: 'solid'
  }, val);
  return val;
}

let SpriteAttr = _decorate(null, function (_initialize, _NodeAttr) {
  class SpriteAttr extends _NodeAttr {
    constructor(subject) {
      super(subject);

      _initialize(this);

      Object.defineProperty(this, '__reflowTag', {
        writable: true,
        value: false
      });
    }

  }

  return {
    F: SpriteAttr,
    d: [{
      kind: "method",
      key: "clearFlow",

      value() {
        this.__reflowTag = true;
        return this;
      }

    }, {
      kind: "method",
      key: "set",

      value(key, value, isQuiet = false) {
        _get(_getPrototypeOf(SpriteAttr.prototype), "set", this).call(this, key, value, isQuiet); // auto reflow


        if (key === 'margin') {
          this.__reflowTag = true;
        }
      }

    }, {
      kind: "method",
      key: "merge",

      value(attrs) {
        if (typeof attrs === 'string') {
          attrs = JSON.parse(attrs);
        }

        Object.entries(attrs).forEach(([key, value]) => {
          if (key !== 'offsetPath' && key !== 'offsetDistance' && key !== 'offsetRotate' && key !== 'offsetAngle' && key !== 'offsetPoint') {
            // this[key] = value;
            this.subject.attr(key, value);
          } else if (key === 'offsetPath') {
            const offsetPath = new svg_path_to_canvas__WEBPACK_IMPORTED_MODULE_0__["default"](value);
            this.set('offsetPath', offsetPath.d);
            this.saveObj('offsetPath', offsetPath);
          } else {
            this.set(key, value);
          }
        });
        return this;
      }

    }, {
      kind: "method",
      key: "serialize",

      value() {
        const attrs = this.getAttributes();
        delete attrs.id;
        const offsetAngle = this.get('offsetAngle');
        if (offsetAngle != null) attrs.offsetAngle = offsetAngle;
        const offsetPoint = this.get('offsetPoint');
        if (offsetPoint != null) attrs.offsetPoint = offsetPoint;
        return JSON.stringify(attrs);
      }

    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_3__["attr"]],
      key: "enableCache",

      value() {
        return false;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringFloat"], _utils__WEBPACK_IMPORTED_MODULE_3__["oneOrTwoValues"]), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        relayout,
        reflow
      })],
      key: "anchor",

      value() {
        return [0, 0];
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "display",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["relative"])('width')],
      key: "layoutX",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["relative"])('height')],
      key: "layoutY",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["relative"])('width')],
      key: "x",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["relative"])('height')],
      key: "y",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringInt"]), _utils__WEBPACK_IMPORTED_MODULE_3__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_3__["composit"])(['x', 'y'])],
      key: "pos",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseColorString"]), _utils__WEBPACK_IMPORTED_MODULE_3__["attr"]],
      key: "bgcolor",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      })],
      key: "opacity",

      value() {
        return 1;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["relative"])('width')],
      key: "width",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["relative"])('height')],
      key: "height",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["relative"])('width')],
      key: "layoutWidth",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["relative"])('height')],
      key: "layoutHeight",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringInt"]), _utils__WEBPACK_IMPORTED_MODULE_3__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_3__["composit"])(['width', 'height'])],
      key: "size",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseInt), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "borderWidth",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "borderColor",

      value() {
        return 'rgba(0,0,0,0)';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "borderStyle",

      value() {
        return 'solid';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseBorderValue), _utils__WEBPACK_IMPORTED_MODULE_3__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_3__["composit"])({
        width: 'borderWidth',
        color: 'borderColor',
        style: 'borderStyle'
      })],
      key: "border",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "paddingTop",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "paddingRight",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "paddingBottom",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "paddingLeft",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringInt"], _utils__WEBPACK_IMPORTED_MODULE_3__["fourValuesShortCut"]), _utils__WEBPACK_IMPORTED_MODULE_3__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_3__["composit"])(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'])],
      key: "padding",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringFloat"], _utils__WEBPACK_IMPORTED_MODULE_3__["eightValuesShortCut"]), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "borderRadius",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow
      })],
      key: "boxSizing",

      value() {
        return 'content-box';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), _utils__WEBPACK_IMPORTED_MODULE_3__["attr"]],
      key: "dashOffset",

      value() {
        return 0;
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringTransform"]), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        value: 'matrix(1,0,0,1,0,0)'
      })],
      key: "transform",

      value(val) {
        /*
          rotate: 0,
          scale: [1, 1],
          translate: [0, 0],
          skew: [0, 0],
          matrix: [1,0,0,1,0,0],
         */
        Object.assign(this.__attr, {
          rotate: 0,
          scale: [1, 1],
          translate: [0, 0],
          skew: [0, 0]
        });

        if (Array.isArray(val)) {
          this.transformMatrix = val;
          this.set('transform', `matrix(${val})`);
        } else {
          this.transformMatrix = [1, 0, 0, 1, 0, 0];
          const transformStr = [];
          Object.entries(val).forEach(([key, value]) => {
            if (key === 'matrix' && Array.isArray(value)) {
              this.transformMatrix = new sprite_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"](value).m;
            } else {
              this[key] = value;
            }

            transformStr.push(`${key}(${value})`);
          });
          this.set('transform', transformStr.join(' '));
        }
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringFloat"]), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      })],
      key: "transformOrigin",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      })],
      key: "transformMatrix",

      value() {
        return [1, 0, 0, 1, 0, 0];
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        value: 0
      })],
      key: "rotate",

      value(val) {
        const delta = this.rotate - val;
        this.set('rotate', val);
        const transform = new sprite_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.transformMatrix).rotate(-delta);
        this.transformMatrix = transform.m;
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringFloat"], _utils__WEBPACK_IMPORTED_MODULE_3__["oneOrTwoValues"]), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        value: [1, 1]
      })],
      key: "scale",

      value(val) {
        val = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["oneOrTwoValues"])(val).map(v => {
          if (Math.abs(v) > 0.001) {
            return v;
          }

          return 1 / v > 0 ? 0.001 : -0.001;
        });
        const oldVal = this.scale || [1, 1];
        const delta = [val[0] / oldVal[0], val[1] / oldVal[1]];
        this.set('scale', val);
        const offsetAngle = this.get('offsetAngle');

        if (offsetAngle) {
          this.rotate -= offsetAngle;
        }

        const transform = new sprite_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.transformMatrix);
        transform.scale(...delta);
        this.transformMatrix = transform.m;

        if (offsetAngle) {
          this.rotate += offsetAngle;
        }
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        value: [0, 0]
      })],
      key: "translate",

      value(val) {
        const oldVal = this.translate || [0, 0];
        const delta = [val[0] - oldVal[0], val[1] - oldVal[1]];
        this.set('translate', val);
        const transform = new sprite_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.transformMatrix);
        transform.translate(...delta);
        this.transformMatrix = transform.m;
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        value: [0, 0]
      })],
      key: "skew",

      value(val) {
        const oldVal = this.skew || [0, 0];
        const invm = new sprite_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"]().skew(...oldVal).inverse();
        this.set('skew', val);
        const transform = new sprite_math__WEBPACK_IMPORTED_MODULE_1__["Matrix"](this.transformMatrix);
        transform.multiply(invm).skew(...val);
        this.transformMatrix = transform.m;
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseInt), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        value: 0
      })],
      key: "zIndex",

      value(val) {
        this.set('zIndex', val);
        const subject = this.subject;

        if (subject.parent) {
          subject.parent.sortedChildNodes = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["sortOrderedSprites"])(subject.parent.childNodes);
        }
      }

    }, {
      kind: "set",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_3__["attr"]],
      key: "linearGradients",

      value(val)
      /* istanbul ignore next  */
      {
        this.gradients = val;
      }

    }, {
      kind: "get",
      key: "linearGradients",

      value() {
        return this.gradients;
      }

    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_3__["attr"]],
      key: "gradients",

      value() {
        return {};
      }

    }, {
      kind: "method",
      key: "resetOffset",

      value() {
        let offsetPath = this.offsetPath;
        const dis = this.offsetDistance;

        if (offsetPath) {
          const pathObj = this.loadObj('offsetPath');

          if (pathObj) {
            offsetPath = pathObj;
          } else {
            offsetPath = new svg_path_to_canvas__WEBPACK_IMPORTED_MODULE_0__["default"](offsetPath);
            this.saveObj('offsetPath', offsetPath);
          }
        }

        if (offsetPath != null) {
          let len = dis * offsetPath.getTotalLength();
          const [x, y] = offsetPath.getPointAtLength(len);
          let angle = this.offsetRotate;

          if (angle === 'auto' || angle === 'reverse') {
            if (angle === 'reverse' && len === 0) {
              len = 1;
            }

            const [x1, y1] = offsetPath.getPointAtLength(angle === 'auto' ? len + 1 : len - 1);

            if (x1 === x && y1 === y) {
              // last point
              angle = this.get('offsetAngle');
            } else {
              angle = 180 * Math.atan2(y1 - y, x1 - x) / Math.PI;
            }

            if (this.offsetRotate === 'reverse') {
              angle = -angle;
            }
          }

          const offsetAngle = this.get('offsetAngle');

          if (offsetAngle) {
            this.rotate -= offsetAngle;
          }

          this.set('offsetAngle', angle);
          this.rotate += angle;
          const offsetPoint = this.get('offsetPoint');

          if (offsetPoint) {
            this.pos = [this.x - offsetPoint[0], this.y - offsetPoint[1]];
          }

          this.set('offsetPoint', [x, y]);
          this.pos = [this.x + x, this.y + y];
        }
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      })],
      key: "offsetPath",

      value(val) {
        const offsetPath = new svg_path_to_canvas__WEBPACK_IMPORTED_MODULE_0__["default"](val);
        this.set('offsetPath', offsetPath.d);
        this.saveObj('offsetPath', offsetPath);
        this.resetOffset();
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        value: 0
      })],
      key: "offsetDistance",

      value(val) {
        this.set('offsetDistance', val);
        this.resetOffset();
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        value: 'auto'
      })],
      key: "offsetRotate",

      value(val) {
        if (typeof val === 'string' && val !== 'auto' && val !== 'reverse') {
          val = parseFloat(val);
        }

        this.set('offsetRotate', val);
        this.resetOffset();
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      })],
      key: "filter",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache
      })],
      key: "shadow",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        cache,
        relayout
      })],
      key: "position",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow,
        relayout,
        cache
      })],
      key: "marginTop",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow,
        relayout,
        cache
      })],
      key: "marginRight",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow,
        relayout,
        cache
      })],
      key: "marginBottom",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        reflow,
        relayout,
        cache
      })],
      key: "marginLeft",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_3__["parseStringInt"], _utils__WEBPACK_IMPORTED_MODULE_3__["fourValuesShortCut"]), _utils__WEBPACK_IMPORTED_MODULE_3__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_3__["composit"])(['marginTop', 'marginRight', 'marginBottom', 'marginLeft'])],
      key: "margin",
      value: void 0
    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_3__["attr"])({
        value: ''
      })],
      key: "bgimage",

      value(val) {
        if (val && val.clip9) val.clip9 = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["fourValuesShortCut"])(val.clip9);

        if (val && !val.image && this.subject.loadBgImage) {
          val = this.subject.loadBgImage(val);
        }

        this.set('bgimage', val);
      }

    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_3__["attr"]],
      key: "clipOverflow",

      value() {
        return true;
      }

    }]
  };
}, _attr__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Attr; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



const _attr = Symbol('attr'),
      _style = Symbol('style'),
      _temp = Symbol('store'),
      _subject = Symbol('subject'),
      _default = Symbol('default');

let Attr = _decorate(null, function (_initialize) {
  class Attr {
    constructor(subject) {
      _initialize(this);

      this[_subject] = subject;
      this[_default] = {};
      this[_attr] = {};
      this[_style] = {};
      this.__cached = {};
      if (!subject.updateStyles) subject.updateStyles = () => {};
      this[_temp] = new Map(); // save non-serialized values

      Object.defineProperty(this, '__attributesSet', {
        value: new Set()
      });
      Object.defineProperty(this, '__styleTag', {
        writable: true,
        value: false
      });
      Object.defineProperty(this, '__updateTag', {
        writable: true,
        value: false
      });
    }

  }

  return {
    F: Attr,
    d: [{
      kind: "field",
      static: true,
      key: "relatedAttributes",

      value() {
        return _utils__WEBPACK_IMPORTED_MODULE_0__["relatedAttributes"];
      }

    }, {
      kind: "field",
      static: true,
      key: "attributeNames",

      value() {
        return _utils__WEBPACK_IMPORTED_MODULE_0__["attributeNames"];
      }

    }, {
      kind: "method",
      static: true,
      key: "addAttributes",

      value(attrs) {
        const descriptors = {};
        Object.entries(attrs).forEach(([key, v]) => {
          if (typeof v === 'function') {
            const _setter = v;
            v = {
              set(val) {
                _setter(this, val);
              }

            };
          }

          let {
            decorators: wrappers,
            value,
            get,
            set
          } = v;
          wrappers = wrappers || [_utils__WEBPACK_IMPORTED_MODULE_0__["attr"]];

          if (set == null) {
            set = function (val) {
              this.set(key, val);
            };
          }

          if (get == null) {
            get = function () {
              return this.get(key);
            };
          }

          const $decorator = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["decorators"])(...wrappers);
          descriptors[key] = $decorator(key, value, {
            set,
            get
          });
        });
        Object.defineProperties(this.prototype, descriptors);
      }

    }, {
      kind: "get",
      key: "__attr",

      value() {
        return this[_attr];
      }

    }, {
      kind: "method",
      key: "setDefault",

      value(attrs) {
        Object.assign(this[_default], attrs);
      }

    }, {
      kind: "method",
      key: "getDefaultValue",

      value(key, defaultValue) {
        if (key in this[_default]) return this[_default][key];
        return defaultValue;
      }

    }, {
      kind: "method",
      key: "saveObj",

      value(key, val) {
        this[_temp].set(key, val);

        this.__updateTag = true;
      }

    }, {
      kind: "method",
      key: "loadObj",

      value(key) {
        return this[_temp].get(key);
      }

    }, {
      kind: "method",
      key: "quietSet",

      value(key, val) {
        this.set(key, val, true);
      }

    }, {
      kind: "method",
      key: "clearStyle",

      value() {
        this[_style] = {};
      }

    }, {
      kind: "method",
      key: "clearLayout",

      value() {
        this.__clearLayout = true;
        return this;
      }

    }, {
      kind: "get",
      key: "style",

      value() {
        return this[_style];
      }

    }, {
      kind: "method",
      key: "set",

      value(key, val, isQuiet = false) {
        this.__quietTag = isQuiet;
        let oldVal;

        if (isQuiet && key.length > 5 && key.indexOf('data-') === 0) {
          const dataKey = key.slice(5);
          oldVal = this.subject.data(dataKey);
          this.subject.data(dataKey, val);
        } else if (this.__styleTag) {
          oldVal = this[_style][key];

          if (val != null) {
            this[_style][key] = val;
          } else {
            delete this[_style][key];
          }
        } else {
          oldVal = this[_attr][key];
        }

        if (val && typeof val === 'object') {
          if (oldVal !== val && JSON.stringify(val) === JSON.stringify(oldVal)) {
            return false;
          }
        } else if (oldVal === val) {
          return false;
        }

        if (!this.__styleTag) {
          this[_attr][key] = val;
        }

        this.__updateTag = true;
        return true;
      }

    }, {
      kind: "method",
      key: "get",

      value(key) {
        if (key.length > 5 && key.indexOf('data-') === 0) {
          return this.subject.data(key.slice(5));
        }

        if (this.__getStyleTag || this[_style][key] != null && !this.__attributesSet.has(key)) {
          return this[_style][key];
        }

        return this[_attr][key];
      }

    }, {
      kind: "method",
      key: "getAttributes",

      value(includeDefault = false) {
        const ret = {};

        if (includeDefault) {
          [..._utils__WEBPACK_IMPORTED_MODULE_0__["attributeNames"]].forEach(key => {
            if (key in this) {
              ret[key] = this[key];
            }
          });
        }

        [...this.__attributesSet].forEach(key => {
          if (key.indexOf('__internal') !== 0) {
            ret[key] = this[key];
          }
        });
        Object.entries(this).forEach(([key, value]) => {
          if (key.indexOf('__') !== 0) {
            ret[key] = value;
          }
        });
        return ret;
      }

    }, {
      kind: "get",
      key: "attrs",

      value() {
        return this.getAttributes(true);
      }

    }, {
      kind: "method",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["deprecate"])('You can remove this call.')],
      key: "clearCache",

      value() {
        return this;
      }

    }, {
      kind: "method",
      key: "merge",

      value(attrs) {
        if (typeof attrs === 'string') {
          attrs = JSON.parse(attrs);
        }

        Object.entries(attrs).forEach(([key, value]) => {
          this.subject.attr(key, value);
        });
        return this;
      }

    }, {
      kind: "method",
      key: "serialize",

      value() {
        const attrs = this.getAttributes();
        delete attrs.id;
        return JSON.stringify(attrs);
      }

    }, {
      kind: "get",
      key: "subject",

      value() {
        return this[_subject];
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(String), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        quiet: true
      })],
      key: "id",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(String), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        quiet: true
      })],
      key: "name",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(String), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        quiet: true
      })],
      key: "class",
      value: void 0
    }]
  };
});



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseNode; });
/* harmony import */ var _attr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import stylesheet from './stylesheet';



function createAttribute(attr, key) {
  Object.defineProperty(attr, key, {
    enumerable: false,
    configurable: true,

    set(value) {
      if (!this.__styleTag && value != null) {
        this.__attributesSet.add(key);
      }

      if (!this.__styleTag && value == null) {
        if (this.__attributesSet.has(key)) {
          this.__attributesSet.delete(key);
        }
      }

      this.quietSet(key, value);
      const subject = this.subject; // fixed color inherit
      // if(key === 'color') {
      //   subject.attr('fillColor', value);
      // }
      // fixed font inherit

      if (key === 'fontSize' || key === 'fontFamily' || key === 'fontStyle' || key === 'fontVariant' || key === 'fontWeight') {
        const font = this.get('font') || 'normal normal normal 16px Arial';
        const parsed = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(font);
        parsed.fontSize = parsed.size + parsed.unit;

        if (key === 'fontSize' && (typeof value === 'number' || /[\d.]$/.test(value))) {
          value += 'px';
        }

        parsed[key] = value;
        const {
          style,
          variant,
          weight,
          family,
          fontSize
        } = parsed;
        subject.attr('font', `${style} ${variant} ${weight} ${fontSize} ${family}`);
      }

      if ((key === 'font' || key === 'lineHeight' || key === 'lineBreak' || key === 'wordBreak' || key === 'letterSpacing' || key === 'textIndent') && subject.querySelectorAll) {
        const children = subject.querySelectorAll('*');
        children.forEach(node => {
          if (node.retypesetting) node.retypesetting();
        });
      }

      if (_utils__WEBPACK_IMPORTED_MODULE_1__["inheritAttributes"].has(key)) {
        subject.forceUpdate();
      }
    },

    get() {
      const ret = this.get(key);
      return ret != null ? ret : this.getDefaultValue(key);
    }

  });
}

const _eventHandlers = Symbol('eventHandlers'),
      _collisionState = Symbol('collisionState'),
      _data = Symbol('data'),
      _mouseCapture = Symbol('mouseCapture');

const _attr = Symbol('attr');

class BaseNode {
  constructor(attrs) {
    this[_eventHandlers] = {};
    this[_data] = {};
    this[_attr] = new this.constructor.Attr(this);

    if (attrs) {
      this.attr(attrs);
    }
  }

  serialize() {
    const nodeType = this.nodeType,
          attrs = this[_attr].serialize(),
          dataset = JSON.stringify(this.dataset),
          id = this.id;

    return {
      nodeType,
      attrs,
      dataset,
      id
    };
  }

  clearLayout() {
    if (this.hasLayout) {
      this.parent.clearLayout();
    }
  }

  merge(attrs) {
    this[_attr].merge(attrs);
  }

  cloneNode() {
    const node = new this.constructor();
    node.merge(this[_attr].serialize());
    node.data(this.dataset);
    const bgimage = this.attr('bgimage');

    if (bgimage && bgimage.image) {
      node.attr('bgimage', null);
      node.attr('bgimage', Object.assign({}, bgimage));
    }

    return node;
  }

  attr(props, val) {
    const setVal = (key, value) => {
      if (!(key in this[_attr])) {
        createAttribute(this[_attr], key);
      }

      this[_attr][key] = value;
    };

    if (typeof props === 'object') {
      Object.entries(props).forEach(([prop, value]) => {
        this.attr(prop, value);
      });
      return this;
    }

    if (typeof props === 'string') {
      if (val !== undefined) {
        if (props === 'attrs') {
          if (Array.isArray(val)) {
            val = Object.assign({}, ...val);
          }

          Object.entries(val).forEach(([prop, value]) => {
            this.attr(prop, value);
          });
          return this;
        }

        if (props === 'style') {
          if (Array.isArray(val)) {
            val = Object.assign({}, ...val);
          }

          Object.entries(val).forEach(([prop, value]) => {
            this.style[prop] = value;
          });
          return this;
        }

        if (typeof val === 'function') {
          val = val(this.attr(props));
        }

        if (val && typeof val.then === 'function') {
          return val.then(res => {
            setVal(props, res);
          });
        }

        setVal(props, val);
        return this;
      }

      if (!(props in this[_attr])) {
        createAttribute(this[_attr], props);
      }

      return this[_attr][props];
    }

    return this[_attr].attrs;
  }

  get __attr() {
    return this[_attr];
  }

  forceUpdate(clearCache) {
    const parent = this.parent;

    if (parent) {
      this.parent.update(this);
    }
  }

  restyle() {// stylesheet.computeStyle(this);
  }

  draw() {
    const styleNeedUpdate = this.__styleNeedUpdate;

    if (styleNeedUpdate) {
      this.restyle();

      if (this.querySelectorAll) {
        const children = this.querySelectorAll('*');
        children.forEach(child => child.restyle());
      }

      if (styleNeedUpdate === 'siblings') {
        if (this.parent) {
          const children = this.parent.children;
          const index = children.indexOf(this);
          const len = children.length;

          for (let i = index + 1; i < len; i++) {
            const node = children[i];
            node.restyle();

            if (node.querySelectorAll) {
              const nodes = node.querySelectorAll('*');
              nodes.forEach(child => child.restyle());
            }
          }
        }
      }
    }
  }

  get layer() {
    return this.parent && this.parent.layer;
  }

  data(props, val) {
    const setVal = (key, value) => {
      this[_data][key] = value;

      if (this.attr) {
        const attrKey = `data-${key}`; // this.attr(attrKey, value);

        if (_attr__WEBPACK_IMPORTED_MODULE_0__["default"].relatedAttributes.has(attrKey)) {
          this.updateStyles();
        }
      }

      if (value == null) {
        delete this[_data][key];
      }
    };

    if (typeof props === 'object') {
      Object.entries(props).forEach(([prop, value]) => {
        this.data(prop, value);
      });
      return this;
    }

    if (typeof props === 'string') {
      if (val !== undefined) {
        if (typeof val === 'function') {
          val = val(this[_data][props]);
        }

        if (val && typeof val.then === 'function') {
          return val.then(res => {
            setVal(props, res);
          });
        }

        setVal(props, val);
        return this;
      }

      return this[_data][props];
    }

    return this[_data];
  }

  updateStyles(nextSibling = false) {
    // append to parent & reset name or class or id auto updateStyles
    this.__styleNeedUpdate = nextSibling ? 'siblings' : 'children';
    this.forceUpdate(true);
  }

  get dataset() {
    return this[_data];
  }

  getEventHandlers(type) {
    return type != null ? this[_eventHandlers][type] || [] : this[_eventHandlers];
  }

  on(type, handler, useCapture = false) {
    if (Array.isArray(type)) {
      type.forEach(t => this.on(t, handler));
    } else {
      this[_eventHandlers][type] = this[_eventHandlers][type] || [];

      this[_eventHandlers][type].push({
        handler,
        useCapture
      });
    }

    return this;
  }

  once(type, handler, useCapture = false) {
    if (Array.isArray(type)) {
      type.forEach(t => this.once(t, handler));
    } else {
      this.on(type, function f(...args) {
        this.off(type, f);
        return handler.apply(this, args);
      });
    }

    return this;
  }

  off(type, handler) {
    if (Array.isArray(type)) {
      type.forEach(t => this.off(t, handler));
    } else if (handler && this[_eventHandlers][type]) {
      const handlers = this[_eventHandlers][type];

      if (handlers) {
        for (let i = 0; i < handlers.length; i++) {
          const {
            handler: _handler
          } = handlers[i];

          if (_handler === handler) {
            this[_eventHandlers][type].splice(i, 1);

            break;
          }
        }
      }
    } else {
      delete this[_eventHandlers][type];
    }

    return this;
  }

  remove(exit = true) {
    if (!this.parent) return null;
    return this.parent.removeChild(this, exit);
  }

  pointCollision(evt) {
    throw Error('you must override this method');
  }

  setMouseCapture() {
    this[_mouseCapture] = true;
  }

  releaseMouseCapture() {
    this[_mouseCapture] = false;
  }

  isCaptured(evt) {
    return (evt.type === 'mousemove' || evt.type === 'mousedown' || evt.type === 'mouseup') && this[_mouseCapture];
  }

  dispatchEvent(type, evt, collisionState = false, swallow = false, useCapturePhase = null) {
    // eslint-disable-line complexity
    let handlers = this.getEventHandlers(type);
    if (this.children && useCapturePhase === true) handlers = handlers.filter(handler => handler.useCapture);
    if (this.children && useCapturePhase === false) handlers = handlers.filter(handler => !handler.useCapture);
    evt.returnValue = true;

    if (swallow && handlers.length === 0) {
      return;
    }

    if (!evt.stopDispatch) {
      evt.stopDispatch = () => {
        evt.terminated = true;
      };
    }

    if (!evt.stopPropagation) {
      evt.stopPropagation = () => {
        evt.cancelBubble = true;
      };
    }

    if (!evt.preventDefault) {
      evt.preventDefault = () => {
        evt.returnValue = false;
      };
    }

    if (evt.type !== type) {
      if (evt.type) {
        evt.originalType = evt.type;
      }

      evt.type = type;
    }

    let isCollision = collisionState || this.pointCollision(evt);
    const captured = this.isCaptured(evt);

    if (this[_collisionState] && type === 'mouseleave') {
      // dispatched from group
      evt.target = this;
      this[_collisionState] = false;
      isCollision = true;
      this.attr('__internal_state_hover_', null);
    }

    if (!evt.terminated && (isCollision || captured)) {
      if (!evt.target) evt.target = this;
      const identifier = evt.identifier;

      if (identifier != null) {
        if (type === 'touchstart') {
          const layer = this.layer;
          layer.touchedTargets[identifier] = layer.touchedTargets[identifier] || [];
          layer.touchedTargets[identifier].push(this);
        }

        if (/^touch/.test(type)) {
          const touches = Array.from(evt.originalEvent.touches),
                layer = this.layer;
          evt.targetTouches = [];
          touches.forEach(touch => {
            const identifier = touch.identifier;

            if (layer.touchedTargets[identifier] && layer.touchedTargets[identifier].indexOf(this) >= 0) {
              evt.targetTouches.push(touch);
            }
          });
        }
      }

      if (type === 'mousedown' || type === 'touchstart') {
        this.attr('__internal_state_active_', 'active');
      } else if (type === 'mouseup' || type === 'touchend') {
        this.attr('__internal_state_active_', null);
      }

      [...handlers].forEach(handler => handler.handler.call(this, evt));

      if (!this[_collisionState] && isCollision && type === 'mousemove') {
        const _evt = Object.assign({}, evt);

        _evt.type = 'mouseenter';
        delete _evt.target;
        _evt.terminated = false;
        this.dispatchEvent('mouseenter', _evt, true, true);
        this.attr('__internal_state_hover_', 'hover');
        this[_collisionState] = true;
      }
    }

    if (this[_collisionState] && !isCollision && type === 'mousemove') {
      const _evt = Object.assign({}, evt);

      _evt.type = 'mouseleave';
      delete _evt.target;
      _evt.terminated = false;
      this.dispatchEvent('mouseleave', _evt);
      this.attr('__internal_state_hover_', null); // this[_collisionState] = false;
    }

    return isCollision;
  } // called when layer appendChild


  connect(parent, zOrder = 0) {
    if (this.parent) {
      // throw new Error('This node belongs to another parent node! Remove it first...')
      this.remove();
    }

    Object.defineProperty(this, 'zOrder', {
      value: zOrder,
      writable: false,
      configurable: true
    });
    Object.defineProperty(this, 'parent', {
      get: () => parent,
      configurable: true
    });
    this.dispatchEvent('append', {
      parent,
      zOrder
    }, true, true);
    parent.dispatchEvent('appendChild', {
      child: this,
      zOrder
    }, true, true);

    if (this.layer) {
      this.updateStyles(true);
    }

    return this;
  } // override to recycling resources


  disconnect(parent) {
    if (!this.parent || parent !== this.parent) {
      throw new Error('Invalid node to disconnect');
    }

    if (this.layer) {
      const nextSibling = this.nextElementSilbing;
      if (nextSibling) nextSibling.updateStyles(true);
    }

    const zOrder = this.zOrder;
    delete this.zOrder;
    delete this.parent;
    delete this.isDirty;
    this.dispatchEvent('remove', {
      parent,
      zOrder
    }, true, true);
    parent.dispatchEvent('removeChild', {
      child: this,
      zOrder
    }, true, true);
    return this;
  }

  enter() {
    // override to do atction after connection, can return a promise
    return this;
  }

  exit() {
    // override to do atction before disconnection, can return a promise
    return this;
  }

  set id(val) {
    this.attr('id', val);
  }

  get id() {
    return this.attr('id');
  }

  set name(val) {
    this.attr('name', val);
  }

  get name() {
    return this.attr('name');
  }

  set className(val) {
    this.attr('class', val);
  }

  get className() {
    return this.attr('class');
  }

}

_defineProperty(BaseNode, "Attr", _attr__WEBPACK_IMPORTED_MODULE_0__["default"]);

_defineProperty(BaseNode, "inheritAttributes", _utils__WEBPACK_IMPORTED_MODULE_1__["inheritAttributes"]);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
// http://www.runoob.com/cssref/css3-pr-filter.html

/* harmony default export */ __webpack_exports__["default"] = ({
  blur(px) {
    return `blur(${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["appendUnit"])(px)})`;
  },

  brightness(percent) {
    return `brightness(${percent})`;
  },

  contrast(percent) {
    return `contrast(${percent})`;
  },

  dropShadow([offsetX, offsetY, shadowRadius, color]) {
    return `drop-shadow(${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["appendUnit"])(offsetX)} ${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["appendUnit"])(offsetY)} ${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["appendUnit"])(shadowRadius)} ${color})`;
  },

  grayscale(percent) {
    return `grayscale(${percent})`;
  },

  hueRotate(value) {
    return `hue-rotate(${Object(_utils__WEBPACK_IMPORTED_MODULE_0__["appendUnit"])(value, 'deg')})`;
  },

  invert(percent) {
    return `invert(${percent})`;
  },

  opacity(percent) {
    return `opacity(${percent})`;
  },

  saturate(percent) {
    return `saturate(${percent})`;
  },

  sepia(percent) {
    return `sepia(${percent})`;
  },

  url(path) {
    return `url(${path})`;
  },

  compile(filter = {}) {
    return Object.entries(filter).reduce((accumulator, curVal) => {
      return accumulator.concat(this[curVal[0]](curVal[1]));
    }, []).join(' ');
  }

});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sprite; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _basesprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





const _texturesCache = Symbol('_texturesCache');

const _images = Symbol('_images');

let TextureAttr = _decorate(null, function (_initialize, _BaseSprite$Attr) {
  class TextureAttr extends _BaseSprite$Attr {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: TextureAttr,
    d: [{
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["attr"]],
      key: "enableCache",

      value() {
        return true;
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        value: []
      })],
      key: "textures",

      value(textures) {
        if (!Array.isArray(textures)) {
          textures = [textures];
        }

        textures = textures.map(texture => {
          if (!texture.image) {
            texture = {
              image: texture
            };
          }

          texture.__tag = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["generateID"])(texture.image); // prevent JSON.stringify ignorance

          return texture;
        });
        this.loadTextures(textures);
        this.set('textures', textures);
      }

    }, {
      kind: "method",
      key: "loadTextures",

      value(textures) {
        const subject = this.subject; // adaptive textures

        let width = 0,
            height = 0;
        subject.images = textures.map(texture => {
          const {
            image,
            rect,
            srcRect
          } = texture;
          let w, h;

          if (rect) {
            w = rect[2] + rect[0];
            h = rect[3] + rect[1];
          } else if (srcRect) {
            w = srcRect[2];
            h = srcRect[3];
          } else {
            w = image.width;
            h = image.height;
          }

          if (width < w) {
            width = w;
          }

          if (height < h) {
            height = h;
          }

          delete texture.image;
          return image;
        });
        const texturesSize = subject.texturesSize;

        if (!texturesSize || texturesSize[0] !== width || texturesSize[1] !== height) {
          const attrSize = subject.attrSize;

          if (attrSize[0] === '' || attrSize[1] === '') {
            subject.reflow();
            subject.clearLayout();
          }
        }

        subject.texturesSize = [width, height];
        return textures;
      }

    }]
  };
}, _basesprite__WEBPACK_IMPORTED_MODULE_1__["default"].Attr);

let Sprite = _decorate(null, function (_initialize2, _BaseSprite) {
  class Sprite extends _BaseSprite {
    /**
      new Sprite({
        attr: {
          ...
        },
        attributeChangedCallback: function(prop, oldValue, newValue){
         }
      })
     */
    constructor(attr) {
      if (attr && attr.constructor !== Object) {
        attr = {
          textures: [attr]
        };
      }

      super();

      _initialize2(this);

      this[_texturesCache] = new Map();

      if (attr) {
        this.attr(attr);
      }
    }

  }

  return {
    F: Sprite,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",

      value() {
        return TextureAttr;
      }

    }, {
      kind: "method",
      key: "cloneNode",

      value() {
        const node = _get(_getPrototypeOf(Sprite.prototype), "cloneNode", this).call(this);

        if (this.images) {
          node.textures = this.textures.map((texture, i) => {
            texture.image = this.images[i];
            return texture;
          });
        }

        return node;
      }

    }, {
      kind: "set",
      key: "images",

      value(images) {
        this[_images] = images;
      }

    }, {
      kind: "get",
      key: "images",

      value() {
        return this[_images];
      }

    }, {
      kind: "set",
      key: "textures",

      value(textures) {
        this.attr('textures', textures);
      }

    }, {
      kind: "get",
      key: "textures",

      value() {
        return this.attr('textures');
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["flow"]],
      key: "contentSize",

      value() {
        const [width, height] = this.attrSize;
        const boxSize = this.texturesSize || [0, 0];
        let [w, h] = [width, height];

        if (width === '') {
          w = boxSize[0] | 0;

          if (height !== '' && boxSize[1]) {
            w *= height / boxSize[1];
          }
        }

        if (height === '') {
          h = boxSize[1] | 0;

          if (width !== '' && boxSize[0]) {
            h *= width / boxSize[0];
          }
        }

        return [w, h];
      }

    }, {
      kind: "method",
      key: "pointCollision",

      value(evt) {
        if (_get(_getPrototypeOf(Sprite.prototype), "pointCollision", this).call(this, evt)) {
          const textures = this.textures;

          if (textures) {
            let {
              offsetX,
              offsetY
            } = evt;
            if (offsetX == null && offsetY == null) return true;
            evt.targetTextures = [];
            const [anchorX, anchorY] = this.attr('anchor'),
                  [width, height] = this.contentSize;
            offsetX += width * anchorX;
            offsetY += height * anchorY;
            textures.forEach(texture => {
              const [x, y, w, h] = texture.rect || [0, 0, ...this.innerSize];

              if (offsetX >= x && offsetX - x < w && offsetY >= y && offsetY - y < h) {
                // touched textures
                evt.targetTextures.push(texture);
              }
            });
          }

          return true;
        }

        return false;
      }

    }, {
      kind: "get",
      key: "cache",

      value() {
        const bg = this.attr('bgcolor') || this.attr('gradients').bgcolor;

        if (!bg && this.textures.length <= 1) {
          return false;
        }

        return _get(_getPrototypeOf(Sprite.prototype), "cache", this);
      }

    }, {
      kind: "set",
      key: "cache",

      value(context) {
        _set(_getPrototypeOf(Sprite.prototype), "cache", context, this, true);
      }

    }, {
      kind: "method",
      key: "render",

      value(t, drawingContext) {
        _get(_getPrototypeOf(Sprite.prototype), "render", this).call(this, t, drawingContext);

        const textures = this.textures;
        let cliped = !this.attr('clipOverflow');

        if (this.images && this.images.length) {
          textures.forEach((texture, i) => {
            const img = this.images[i];
            const [w, h] = this.contentSize;
            const rect = texture.rect || [0, 0, w, h];
            const srcRect = texture.srcRect;

            if (!cliped && texture.rect && (rect[2] > w || rect[3] > h)) {
              cliped = true;
              drawingContext.beginPath();
              drawingContext.rect(0, 0, w, h);
              drawingContext.clip();
            }

            drawingContext.save();

            if (texture.filter) {
              Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setDeprecation"])('texture.filter', 'Instead use sprite.attr({filter}).');
              const imgRect = srcRect ? [0, 0, srcRect[2], srcRect[3]] : [0, 0, img.width, img.height];
              const sx = rect[2] / imgRect[2],
                    sy = rect[3] / imgRect[3];
              drawingContext.filter = _filters__WEBPACK_IMPORTED_MODULE_2__["default"].compile(texture.filter);

              if (srcRect) {
                drawingContext.drawImage(img, ...srcRect, sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * srcRect[2], sy * srcRect[3]);
              } else {
                drawingContext.drawImage(img, sx * imgRect[0] + rect[0], sy * imgRect[1] + rect[1], sx * img.width, sy * img.height);
              }
            } else if (srcRect) {
              drawingContext.drawImage(img, ...srcRect, ...rect);
            } else {
              drawingContext.drawImage(img, ...rect);
            }

            drawingContext.restore();
          });
        }
      }

    }]
  };
}, _basesprite__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Label; });
/* harmony import */ var css_line_break__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var css_line_break__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(css_line_break__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _basesprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






const _boxSize = Symbol('boxSize'),
      _outputText = Symbol('outputText');

const measureText = (node, text, font, lineHeight = '') => {
  const ctx = node.context;

  if (!ctx) {
    return [0, 0];
  }

  ctx.save();
  ctx.font = font;
  let {
    width
  } = ctx.measureText(text);
  ctx.restore();
  const letterSpacing = node.attr('letterSpacing');

  if (letterSpacing) {
    width += letterSpacing * (text.length - 1);
  }

  const {
    size
  } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(font);
  const height = lineHeight || size * 1.2;
  return [width, height].map(Math.round);
};

function calculTextboxSize(node) {
  if (!node.context) return '';
  const text = node.text,
        font = node.attr('font'),
        lineHeight = node.attr('lineHeight'),
        textIndent = node.attr('textIndent');
  let lines = [];
  let width = 0,
      height = 0;
  node[_outputText] = text;
  const lineBreak = node.attr('lineBreak'),
        textboxWidth = node.hasLayout ? node.attr('layoutWidth') : node.attr('width');

  if (lineBreak !== '' && textboxWidth !== '') {
    const wordBreak = node.attr('wordBreak');
    text.split(/\n/).forEach(line => {
      const breaker = Object(css_line_break__WEBPACK_IMPORTED_MODULE_0__["LineBreaker"])(line, {
        lineBreak,
        wordBreak
      });
      const words = [];
      let bk = breaker.next();

      while (!bk.done) {
        words.push(bk.value.slice());
        bk = breaker.next();
      }

      let l = '';
      words.forEach(word => {
        if (!l) {
          l = word;
        } else {
          const ll = `${l}${word}`;
          const [w] = measureText(node, ll, font);

          if (w > (lines.length === 0 ? textboxWidth - textIndent : textboxWidth)) {
            lines.push(l);
            l = word;
          } else {
            l = ll;
          }
        }
      });
      lines.push(l);
    }); // lines = node[_outputText].split(/\n/)

    node[_outputText] = lines.join('\n');
  } else {
    lines = text.split(/\n/);
  }

  lines.forEach((line, idx) => {
    let [w, h] = measureText(node, line, font, lineHeight);
    if (idx === 0) w += textIndent;
    width = Math.max(width, w);
    height += h;
  });
  const boxSize = node[_boxSize];

  if (!boxSize || boxSize[0] !== width || boxSize[1] !== height) {
    const attrSize = node.attrSize;

    if (attrSize[0] === '' || attrSize[1] === '') {
      node.reflow();
      node.clearLayout();
    }
  }

  node[_boxSize] = [width, height];
}

function setFontPart(font, part) {
  const {
    style,
    variant,
    weight,
    size0,
    unit,
    family
  } = Object.assign(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(font), part);
  return `${style} ${variant} ${weight} ${size0}${unit} ${family}`;
}

let LabelSpriteAttr = _decorate(null, function (_initialize, _BaseSprite$Attr) {
  class LabelSpriteAttr extends _BaseSprite$Attr {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: LabelSpriteAttr,
    d: [{
      kind: "method",
      key: "retypesetting",

      value() {
        this.subject.retypesetting();
      }

    }, {
      kind: "method",
      key: "widthRetypeseting",

      value() {
        if (this.lineBreak !== '') this.subject.retypesetting();else this.subject.reflow();
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseValue"])(String), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'retypesetting'
      })],
      key: "text",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'retypesetting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])('normal normal normal 16px Arial')],
      key: "font",

      value() {
        return 'inherit';
      }

    }, {
      kind: "set",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_1__["attr"]],
      key: "fontSize",

      value(val) {
        if (val == null) val = '16px';
        let unit = 'px';

        if (typeof val === 'string') {
          const unitReg = /^([\d.]+)(\w+)/;
          const matches = val.match(unitReg);

          if (!matches) {
            return null;
          }

          val = parseFloat(matches[1]);
          unit = matches[2];
        }

        this.font = setFontPart(this.font, {
          size0: val,
          unit
        });
      }

    }, {
      kind: "get",
      key: "fontSize",

      value() {
        const font = this.font;
        const {
          size0,
          unit
        } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(font);
        return `${size0}${unit}`;
      }

    }, {
      kind: "set",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_1__["attr"]],
      key: "fontFamily",

      value(val) {
        if (val == null) val = 'Arial';
        this.font = setFontPart(this.font, {
          family: val
        });
      }

    }, {
      kind: "get",
      key: "fontFamily",

      value() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(this.font).family;
      }

    }, {
      kind: "set",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_1__["attr"]],
      key: "fontStyle",

      value(val) {
        if (val == null) val = 'normal';
        this.font = setFontPart(this.font, {
          style: val
        });
      }

    }, {
      kind: "get",
      key: "fontStyle",

      value() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(this.font).style;
      }

    }, {
      kind: "set",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_1__["attr"]],
      key: "fontVariant",

      value(val) {
        if (val == null) val = 'normal';
        this.font = setFontPart(this.font, {
          variant: val
        });
      }

    }, {
      kind: "get",
      key: "fontVariant",

      value() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(this.font).variant;
      }

    }, {
      kind: "set",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_1__["attr"]],
      key: "fontWeight",

      value(val) {
        if (val == null) val = 'normal';
        this.font = setFontPart(this.font, {
          weight: val
        });
      }

    }, {
      kind: "get",
      key: "fontWeight",

      value() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(this.font).weight;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'retypesetting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])('')],
      key: "lineHeight",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'retypesetting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])('left')],
      key: "textAlign",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_1__["parseColorString"]), _utils__WEBPACK_IMPORTED_MODULE_1__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])('')],
      key: "strokeColor",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseValue"])(parseFloat), _utils__WEBPACK_IMPORTED_MODULE_1__["attr"]],
      key: "strokeWidth",

      value() {
        return 1;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_1__["parseColorString"]), _utils__WEBPACK_IMPORTED_MODULE_1__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])('')],
      key: "color",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_1__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_1__["composit"])('color')],
      key: "fillColor",
      value: void 0
    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_1__["attr"]],
      key: "flexible",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'retypesetting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])('')],
      key: "lineBreak",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'retypesetting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])('')],
      key: "wordBreak",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'retypesetting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])(0)],
      key: "letterSpacing",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'retypesetting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["inherit"])(0)],
      key: "textIndent",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'widthRetypeseting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["relative"])('width')],
      key: "width",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_1__["attr"])({
        extra: 'widthRetypeseting'
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_1__["relative"])('width')],
      key: "layoutWidth",

      value() {
        return '';
      }

    }]
  };
}, _basesprite__WEBPACK_IMPORTED_MODULE_2__["default"].Attr);

let Label = _decorate(null, function (_initialize2, _BaseSprite) {
  class Label extends _BaseSprite {
    constructor(attr) {
      if (typeof attr !== 'object') {
        attr = {
          text: String(attr)
        };
      }

      super(attr);

      _initialize2(this);
    }

  }

  return {
    F: Label,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",

      value() {
        return LabelSpriteAttr;
      }

    }, {
      kind: "set",
      key: "text",

      value(val) {
        this.attr('text', val);
      }

    }, {
      kind: "get",
      key: "text",

      value() {
        return this.attr('text');
      }

    }, {
      kind: "get",
      key: "textboxSize",

      value() {
        if (!this[_boxSize]) calculTextboxSize(this);
        return this[_boxSize];
      }

    }, {
      kind: "get",
      key: "flexibleFont",

      value() {
        const font = this.attr('font');
        if (this.attr('width') === '' && this.attr('layoutWidth') === '') return font;
        const textboxSize = this.textboxSize,
              contentSize = this.contentSize;
        let {
          style,
          variant,
          weight,
          size,
          family
        } = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseFont"])(font);
        size *= contentSize[0] / textboxSize[0];
        return `${style} ${variant} ${weight} ${Math.floor(size)}px "${family}"`;
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_1__["flow"]],
      key: "contentSize",

      value() {
        let [width, height] = this.attrSize;

        if (width === '' || height === '') {
          const textboxSize = this.textboxSize;
          if (!textboxSize) return [0, 0];
          width = width || textboxSize[0];
          height = height || textboxSize[1];
        }

        if (this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
          height = Math.ceil(height * width / this.textboxSize[0]);
        }

        return [width, height];
      }

    }, {
      kind: "method",
      key: "connect",

      value(parent, zOrder = 0) {
        const ret = _get(_getPrototypeOf(Label.prototype), "connect", this).call(this, parent, zOrder);

        let _p = parent;

        while (_p && _p.__labelCount != null) {
          ++_p.__labelCount;
          _p = _p.parent;
        }

        return ret;
      }

    }, {
      kind: "method",
      key: "disconnect",

      value(parent) {
        const ret = _get(_getPrototypeOf(Label.prototype), "disconnect", this).call(this, parent);

        let _p = parent;

        while (_p && _p.__labelCount != null) {
          --_p.__labelCount;
          _p = _p.parent;
        }

        return ret;
      }

    }, {
      kind: "method",
      key: "retypesetting",

      value() {
        // calculTextboxSize(this);
        this[_boxSize] = false;
        this[_outputText] = null;
        this.reflow();
        this.forceUpdate(true);
      }

    }, {
      kind: "method",
      key: "restyle",

      value() {
        _get(_getPrototypeOf(Label.prototype), "restyle", this).call(this);

        this.retypesetting();
      }

    }, {
      kind: "method",
      key: "render",

      value(t, drawingContext) {
        _get(_getPrototypeOf(Label.prototype), "render", this).call(this, t, drawingContext);

        const textAlign = this.attr('textAlign'),
              flexible = this.attr('flexible'),
              font = flexible ? this.flexibleFont : this.attr('font'),
              strokeWidth = this.attr('strokeWidth'),
              lineHeight = this.attr('lineHeight');
        let text = this.text;

        if (text) {
          const [w, h] = this.contentSize;
          if (!this[_outputText]) calculTextboxSize(this);
          text = this[_outputText] || this.text;

          if ((this.textboxSize[0] > w || this.textboxSize[1] > h) && this.attr('clipOverflow')) {
            drawingContext.beginPath();
            drawingContext.rect(0, 0, w, h);
            drawingContext.clip();
          }

          drawingContext.font = font;
          const lines = text.split(/\n/);
          drawingContext.textBaseline = 'top';
          const align = textAlign;
          drawingContext.textBaseline = 'middle';
          const strokeColor = Object(_utils_render__WEBPACK_IMPORTED_MODULE_3__["findColor"])(drawingContext, this, 'strokeColor');

          if (strokeColor) {
            drawingContext.strokeStyle = strokeColor;
          }

          let fillColor = Object(_utils_render__WEBPACK_IMPORTED_MODULE_3__["findColor"])(drawingContext, this, 'fillColor');

          if (!strokeColor && !fillColor) {
            fillColor = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["parseColorString"])('black');
          }

          if (fillColor) {
            drawingContext.fillStyle = fillColor;
          }

          drawingContext.lineWidth = strokeWidth;
          let top = 0;
          const width = this.contentSize[0];
          const letterSpacing = this.attr('letterSpacing'),
                textIndent = this.attr('textIndent');
          lines.forEach((line, idx) => {
            const [w, h] = measureText(this, line, font, lineHeight);
            let left = 0;

            if (align === 'center') {
              left = (width - w) / 2;
            } else if (align === 'right') {
              left = width - w;
            }

            let indent = 0;

            if (textIndent && idx === 0 && align !== 'right') {
              indent = textIndent;
            }

            if (letterSpacing) {
              let l = left;
              [...line].forEach((letter, i) => {
                if (idx === 0 && i === 0) {
                  l += indent;
                }

                if (fillColor) {
                  drawingContext.fillText(letter, l, top + h / 2);
                }

                if (strokeColor) {
                  drawingContext.strokeText(letter, l, top + h / 2);
                }

                l += measureText(this, letter, font)[0] + letterSpacing;
              });
            } else {
              if (fillColor) {
                drawingContext.fillText(line, left + indent, top + h / 2);
              }

              if (strokeColor) {
                drawingContext.strokeText(line, left + indent, top + h / 2);
              }
            }

            top += h;
          });
        }
      }

    }]
  };
}, _basesprite__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Util = __webpack_require__(38);

Object.defineProperty(exports, 'toCodePoints', {
  enumerable: true,
  get: function get() {
    return _Util.toCodePoints;
  }
});
Object.defineProperty(exports, 'fromCodePoint', {
  enumerable: true,
  get: function get() {
    return _Util.fromCodePoint;
  }
});

var _LineBreak = __webpack_require__(39);

Object.defineProperty(exports, 'LineBreaker', {
  enumerable: true,
  get: function get() {
    return _LineBreak.LineBreaker;
  }
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var toCodePoints = exports.toCodePoints = function toCodePoints(str) {
    var codePoints = [];
    var i = 0;
    var length = str.length;
    while (i < length) {
        var value = str.charCodeAt(i++);
        if (value >= 0xd800 && value <= 0xdbff && i < length) {
            var extra = str.charCodeAt(i++);
            if ((extra & 0xfc00) === 0xdc00) {
                codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
            } else {
                codePoints.push(value);
                i--;
            }
        } else {
            codePoints.push(value);
        }
    }
    return codePoints;
};

var fromCodePoint = exports.fromCodePoint = function fromCodePoint() {
    if (String.fromCodePoint) {
        return String.fromCodePoint.apply(String, arguments);
    }

    var length = arguments.length;
    if (!length) {
        return '';
    }

    var codeUnits = [];

    var index = -1;
    var result = '';
    while (++index < length) {
        var codePoint = arguments.length <= index ? undefined : arguments[index];
        if (codePoint <= 0xffff) {
            codeUnits.push(codePoint);
        } else {
            codePoint -= 0x10000;
            codeUnits.push((codePoint >> 10) + 0xd800, codePoint % 0x400 + 0xdc00);
        }
        if (index + 1 === length || codeUnits.length > 0x4000) {
            result += String.fromCharCode.apply(String, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}

var decode = exports.decode = function decode(base64) {
    var bufferLength = base64.length * 0.75,
        len = base64.length,
        i = void 0,
        p = 0,
        encoded1 = void 0,
        encoded2 = void 0,
        encoded3 = void 0,
        encoded4 = void 0;

    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined' && typeof Uint8Array.prototype.slice !== 'undefined' ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
    var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return buffer;
};

var polyUint16Array = exports.polyUint16Array = function polyUint16Array(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var _i = 0; _i < length; _i += 2) {
        bytes.push(buffer[_i + 1] << 8 | buffer[_i]);
    }
    return bytes;
};

var polyUint32Array = exports.polyUint32Array = function polyUint32Array(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var _i2 = 0; _i2 < length; _i2 += 4) {
        bytes.push(buffer[_i2 + 3] << 24 | buffer[_i2 + 2] << 16 | buffer[_i2 + 1] << 8 | buffer[_i2]);
    }
    return bytes;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LineBreaker = exports.inlineBreakOpportunities = exports.lineBreakAtIndex = exports.codePointsToCharacterClasses = exports.UnicodeTrie = exports.BREAK_ALLOWED = exports.BREAK_NOT_ALLOWED = exports.BREAK_MANDATORY = exports.classes = exports.LETTER_NUMBER_MODIFIER = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Trie = __webpack_require__(40);

var _linebreakTrie = __webpack_require__(41);

var _linebreakTrie2 = _interopRequireDefault(_linebreakTrie);

var _Util = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LETTER_NUMBER_MODIFIER = exports.LETTER_NUMBER_MODIFIER = 50;

// Non-tailorable Line Breaking Classes
var BK = 1; //  Cause a line break (after)
var CR = 2; //  Cause a line break (after), except between CR and LF
var LF = 3; //  Cause a line break (after)
var CM = 4; //  Prohibit a line break between the character and the preceding character
var NL = 5; //  Cause a line break (after)
var SG = 6; //  Do not occur in well-formed text
var WJ = 7; //  Prohibit line breaks before and after
var ZW = 8; //  Provide a break opportunity
var GL = 9; //  Prohibit line breaks before and after
var SP = 10; // Enable indirect line breaks
var ZWJ = 11; // Prohibit line breaks within joiner sequences
// Break Opportunities
var B2 = 12; //  Provide a line break opportunity before and after the character
var BA = 13; //  Generally provide a line break opportunity after the character
var BB = 14; //  Generally provide a line break opportunity before the character
var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
var CB = 16; //   Provide a line break opportunity contingent on additional information
// Characters Prohibiting Certain Breaks
var CL = 17; //  Prohibit line breaks before
var CP = 18; //  Prohibit line breaks before
var EX = 19; //  Prohibit line breaks before
var IN = 20; //  Allow only indirect line breaks between pairs
var NS = 21; //  Allow only indirect line breaks before
var OP = 22; //  Prohibit line breaks after
var QU = 23; //  Act like they are both opening and closing
// Numeric Context
var IS = 24; //  Prevent breaks after any and before numeric
var NU = 25; //  Form numeric expressions for line breaking purposes
var PO = 26; //  Do not break following a numeric expression
var PR = 27; //  Do not break in front of a numeric expression
var SY = 28; //  Prevent a break before; and allow a break after
// Other Characters
var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
var EB = 32; //  Do not break from following Emoji Modifier
var EM = 33; //  Do not break from preceding Emoji Base
var H2 = 34; //  Form Korean syllable blocks
var H3 = 35; //  Form Korean syllable blocks
var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
var ID = 37; //  Break before or after; except in some numeric context
var JL = 38; //  Form Korean syllable blocks
var JV = 39; //  Form Korean syllable blocks
var JT = 40; //  Form Korean syllable blocks
var RI = 41; //  Keep pairs together. For pairs; break before and after other classes
var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions

var classes = exports.classes = {
    BK: BK,
    CR: CR,
    LF: LF,
    CM: CM,
    NL: NL,
    SG: SG,
    WJ: WJ,
    ZW: ZW,
    GL: GL,
    SP: SP,
    ZWJ: ZWJ,
    B2: B2,
    BA: BA,
    BB: BB,
    HY: HY,
    CB: CB,
    CL: CL,
    CP: CP,
    EX: EX,
    IN: IN,
    NS: NS,
    OP: OP,
    QU: QU,
    IS: IS,
    NU: NU,
    PO: PO,
    PR: PR,
    SY: SY,
    AI: AI,
    AL: AL,
    CJ: CJ,
    EB: EB,
    EM: EM,
    H2: H2,
    H3: H3,
    HL: HL,
    ID: ID,
    JL: JL,
    JV: JV,
    JT: JT,
    RI: RI,
    SA: SA,
    XX: XX
};

var BREAK_MANDATORY = exports.BREAK_MANDATORY = '!';
var BREAK_NOT_ALLOWED = exports.BREAK_NOT_ALLOWED = '×';
var BREAK_ALLOWED = exports.BREAK_ALLOWED = '÷';
var UnicodeTrie = exports.UnicodeTrie = (0, _Trie.createTrieFromBase64)(_linebreakTrie2.default);

var ALPHABETICS = [AL, HL];
var HARD_LINE_BREAKS = [BK, CR, LF, NL];
var SPACE = [SP, ZW];
var PREFIX_POSTFIX = [PR, PO];
var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE);
var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
var HYPHEN = [HY, BA];

var codePointsToCharacterClasses = exports.codePointsToCharacterClasses = function codePointsToCharacterClasses(codePoints) {
    var lineBreak = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'strict';

    var types = [];
    var indicies = [];
    var categories = [];
    codePoints.forEach(function (codePoint, index) {
        var classType = UnicodeTrie.get(codePoint);
        if (classType > LETTER_NUMBER_MODIFIER) {
            categories.push(true);
            classType -= LETTER_NUMBER_MODIFIER;
        } else {
            categories.push(false);
        }

        if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
            // U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
            if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
                indicies.push(index);
                return types.push(CB);
            }
        }

        if (classType === CM || classType === ZWJ) {
            // LB10 Treat any remaining combining mark or ZWJ as AL.
            if (index === 0) {
                indicies.push(index);
                return types.push(AL);
            }

            // LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
            // the base character in all of the following rules. Treat ZWJ as if it were CM.
            var prev = types[index - 1];
            if (LINE_BREAKS.indexOf(prev) === -1) {
                indicies.push(indicies[index - 1]);
                return types.push(prev);
            }
            indicies.push(index);
            return types.push(AL);
        }

        indicies.push(index);

        if (classType === CJ) {
            return types.push(lineBreak === 'strict' ? NS : ID);
        }

        if (classType === SA) {
            return types.push(AL);
        }

        if (classType === AI) {
            return types.push(AL);
        }

        // For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
        // and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
        // to take into account the actual line breaking properties for these characters.
        if (classType === XX) {
            if (codePoint >= 0x20000 && codePoint <= 0x2fffd || codePoint >= 0x30000 && codePoint <= 0x3fffd) {
                return types.push(ID);
            } else {
                return types.push(AL);
            }
        }

        types.push(classType);
    });

    return [indicies, types, categories];
};

var isAdjacentWithSpaceIgnored = function isAdjacentWithSpaceIgnored(a, b, currentIndex, classTypes) {
    var current = classTypes[currentIndex];
    if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
        var i = currentIndex;
        while (i <= classTypes.length) {
            i++;
            var next = classTypes[i];

            if (next === b) {
                return true;
            }

            if (next !== SP) {
                break;
            }
        }
    }

    if (current === SP) {
        var _i = currentIndex;

        while (_i > 0) {
            _i--;
            var prev = classTypes[_i];

            if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
                var n = currentIndex;
                while (n <= classTypes.length) {
                    n++;
                    var _next = classTypes[n];

                    if (_next === b) {
                        return true;
                    }

                    if (_next !== SP) {
                        break;
                    }
                }
            }

            if (prev !== SP) {
                break;
            }
        }
    }
    return false;
};

var previousNonSpaceClassType = function previousNonSpaceClassType(currentIndex, classTypes) {
    var i = currentIndex;
    while (i >= 0) {
        var type = classTypes[i];
        if (type === SP) {
            i--;
        } else {
            return type;
        }
    }
    return 0;
};

var _lineBreakAtIndex = function _lineBreakAtIndex(codePoints, classTypes, indicies, index, forbiddenBreaks) {
    if (indicies[index] === 0) {
        return BREAK_NOT_ALLOWED;
    }

    var currentIndex = index - 1;
    if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
        return BREAK_NOT_ALLOWED;
    }

    var beforeIndex = currentIndex - 1;
    var afterIndex = currentIndex + 1;
    var current = classTypes[currentIndex];

    // LB4 Always break after hard line breaks.
    // LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
    var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
    var next = classTypes[afterIndex];

    if (current === CR && next === LF) {
        return BREAK_NOT_ALLOWED;
    }

    if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
        return BREAK_MANDATORY;
    }

    // LB6 Do not break before hard line breaks.
    if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB7 Do not break before spaces or zero width space.
    if (SPACE.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
    if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
        return BREAK_ALLOWED;
    }

    // LB8a Do not break between a zero width joiner and an ideograph, emoji base or emoji modifier.
    if (UnicodeTrie.get(codePoints[currentIndex]) === ZWJ && (next === ID || next === EB || next === EM)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB11 Do not break before or after Word joiner and related characters.
    if (current === WJ || next === WJ) {
        return BREAK_NOT_ALLOWED;
    }

    // LB12 Do not break after NBSP and related characters.
    if (current === GL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
    if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
    if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB14 Do not break after ‘[’, even after spaces.
    if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
        return BREAK_NOT_ALLOWED;
    }

    // LB15 Do not break within ‘”[’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
    if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB17 Do not break within ‘——’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED;
    }

    // LB18 Break after spaces.
    if (current === SP) {
        return BREAK_ALLOWED;
    }

    // LB19 Do not break before or after quotation marks, such as ‘ ” ’.
    if (current === QU || next === QU) {
        return BREAK_NOT_ALLOWED;
    }

    // LB20 Break before and after unresolved CB.
    if (next === CB || current === CB) {
        return BREAK_ALLOWED;
    }

    // LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
    if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
        return BREAK_NOT_ALLOWED;
    }

    // LB21a Don't break after Hebrew + Hyphen.
    if (before === HL && HYPHEN.indexOf(current) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB21b Don’t break between Solidus and Hebrew letters.
    if (current === SY && next === HL) {
        return BREAK_NOT_ALLOWED;
    }

    // LB22 Do not break between two ellipses, or between letters, numbers or exclamations and ellipsis.
    if (next === IN && ALPHABETICS.concat(IN, EX, NU, ID, EB, EM).indexOf(current) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB23 Do not break between digits and letters.
    if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
        return BREAK_NOT_ALLOWED;
    }

    // LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
    if (current === PR && [ID, EB, EM].indexOf(next) !== -1 || [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
        return BREAK_NOT_ALLOWED;
    }

    // LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
    if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 || PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB25 Do not break between the following pairs of classes relevant to numbers:
    if (
    // (PR | PO) × ( OP | HY )? NU
    [PR, PO].indexOf(current) !== -1 && (next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) ||
    // ( OP | HY ) × NU
    [OP, HY].indexOf(current) !== -1 && next === NU ||
    // NU ×	(NU | SY | IS)
    current === NU && [NU, SY, IS].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
    if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
        var prevIndex = currentIndex;
        while (prevIndex >= 0) {
            var type = classTypes[prevIndex];
            if (type === NU) {
                return BREAK_NOT_ALLOWED;
            } else if ([SY, IS].indexOf(type) !== -1) {
                prevIndex--;
            } else {
                break;
            }
        }
    }

    // NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
    if ([PR, PO].indexOf(next) !== -1) {
        var _prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
        while (_prevIndex >= 0) {
            var _type = classTypes[_prevIndex];
            if (_type === NU) {
                return BREAK_NOT_ALLOWED;
            } else if ([SY, IS].indexOf(_type) !== -1) {
                _prevIndex--;
            } else {
                break;
            }
        }
    }

    // LB26 Do not break a Korean syllable.
    if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 || [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 || [JT, H3].indexOf(current) !== -1 && next === JT) {
        return BREAK_NOT_ALLOWED;
    }

    // LB27 Treat a Korean Syllable Block the same as ID.
    if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 || KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
        return BREAK_NOT_ALLOWED;
    }

    // LB28 Do not break between alphabetics (“at”).
    if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
    if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }

    // LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
    if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP || ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
        return BREAK_NOT_ALLOWED;
    }

    // LB30a Break between two regional indicator symbols if and only if there are an even number of regional
    // indicators preceding the position of the break.
    if (current === RI && next === RI) {
        var i = indicies[currentIndex];
        var count = 1;
        while (i > 0) {
            i--;
            if (classTypes[i] === RI) {
                count++;
            } else {
                break;
            }
        }
        if (count % 2 !== 0) {
            return BREAK_NOT_ALLOWED;
        }
    }

    // LB30b Do not break between an emoji base and an emoji modifier.
    if (current === EB && next === EM) {
        return BREAK_NOT_ALLOWED;
    }

    return BREAK_ALLOWED;
};

var lineBreakAtIndex = exports.lineBreakAtIndex = function lineBreakAtIndex(codePoints, index) {
    // LB2 Never break at the start of text.
    if (index === 0) {
        return BREAK_NOT_ALLOWED;
    }

    // LB3 Always break at the end of text.
    if (index >= codePoints.length) {
        return BREAK_MANDATORY;
    }

    var _codePointsToCharacte = codePointsToCharacterClasses(codePoints),
        _codePointsToCharacte2 = _slicedToArray(_codePointsToCharacte, 2),
        indicies = _codePointsToCharacte2[0],
        classTypes = _codePointsToCharacte2[1];

    return _lineBreakAtIndex(codePoints, classTypes, indicies, index);
};

var cssFormattedClasses = function cssFormattedClasses(codePoints, options) {
    if (!options) {
        options = { lineBreak: 'normal', wordBreak: 'normal' };
    }

    var _codePointsToCharacte3 = codePointsToCharacterClasses(codePoints, options.lineBreak),
        _codePointsToCharacte4 = _slicedToArray(_codePointsToCharacte3, 3),
        indicies = _codePointsToCharacte4[0],
        classTypes = _codePointsToCharacte4[1],
        isLetterNumber = _codePointsToCharacte4[2];

    if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
        classTypes = classTypes.map(function (type) {
            return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
        });
    }

    var forbiddenBreakpoints = options.wordBreak === 'keep-all' ? isLetterNumber.map(function (isLetterNumber, i) {
        return isLetterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
    }) : null;

    return [indicies, classTypes, forbiddenBreakpoints];
};

var inlineBreakOpportunities = exports.inlineBreakOpportunities = function inlineBreakOpportunities(str, options) {
    var codePoints = (0, _Util.toCodePoints)(str);
    var output = BREAK_NOT_ALLOWED;

    var _cssFormattedClasses = cssFormattedClasses(codePoints, options),
        _cssFormattedClasses2 = _slicedToArray(_cssFormattedClasses, 3),
        indicies = _cssFormattedClasses2[0],
        classTypes = _cssFormattedClasses2[1],
        forbiddenBreakpoints = _cssFormattedClasses2[2];

    codePoints.forEach(function (codePoint, i) {
        output += (0, _Util.fromCodePoint)(codePoint) + (i >= codePoints.length - 1 ? BREAK_MANDATORY : _lineBreakAtIndex(codePoints, classTypes, indicies, i + 1, forbiddenBreakpoints));
    });

    return output;
};

var Break = function () {
    function Break(codePoints, lineBreak, start, end) {
        _classCallCheck(this, Break);

        this._codePoints = codePoints;
        this.required = lineBreak === BREAK_MANDATORY;
        this.start = start;
        this.end = end;
    }

    _createClass(Break, [{
        key: 'slice',
        value: function slice() {
            return _Util.fromCodePoint.apply(undefined, _toConsumableArray(this._codePoints.slice(this.start, this.end)));
        }
    }]);

    return Break;
}();

var LineBreaker = exports.LineBreaker = function LineBreaker(str, options) {
    var codePoints = (0, _Util.toCodePoints)(str);

    var _cssFormattedClasses3 = cssFormattedClasses(codePoints, options),
        _cssFormattedClasses4 = _slicedToArray(_cssFormattedClasses3, 3),
        indicies = _cssFormattedClasses4[0],
        classTypes = _cssFormattedClasses4[1],
        forbiddenBreakpoints = _cssFormattedClasses4[2];

    var length = codePoints.length;
    var lastEnd = 0;
    var nextIndex = 0;

    return {
        next: function next() {
            if (nextIndex >= length) {
                return { done: true };
            }
            var lineBreak = BREAK_NOT_ALLOWED;
            while (nextIndex < length && (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) === BREAK_NOT_ALLOWED) {}

            if (lineBreak !== BREAK_NOT_ALLOWED || nextIndex === length) {
                var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
                lastEnd = nextIndex;
                return { value: value, done: false };
            }

            return { done: true };
        }
    };
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trie = exports.createTrieFromBase64 = exports.UTRIE2_INDEX_2_MASK = exports.UTRIE2_INDEX_2_BLOCK_LENGTH = exports.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = exports.UTRIE2_INDEX_1_OFFSET = exports.UTRIE2_UTF8_2B_INDEX_2_LENGTH = exports.UTRIE2_UTF8_2B_INDEX_2_OFFSET = exports.UTRIE2_INDEX_2_BMP_LENGTH = exports.UTRIE2_LSCP_INDEX_2_LENGTH = exports.UTRIE2_DATA_MASK = exports.UTRIE2_DATA_BLOCK_LENGTH = exports.UTRIE2_LSCP_INDEX_2_OFFSET = exports.UTRIE2_SHIFT_1_2 = exports.UTRIE2_INDEX_SHIFT = exports.UTRIE2_SHIFT_1 = exports.UTRIE2_SHIFT_2 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(38);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Shift size for getting the index-2 table offset. */
var UTRIE2_SHIFT_2 = exports.UTRIE2_SHIFT_2 = 5;

/** Shift size for getting the index-1 table offset. */
var UTRIE2_SHIFT_1 = exports.UTRIE2_SHIFT_1 = 6 + 5;

/**
 * Shift size for shifting left the index array values.
 * Increases possible data size with 16-bit index values at the cost
 * of compactability.
 * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
 */
var UTRIE2_INDEX_SHIFT = exports.UTRIE2_INDEX_SHIFT = 2;

/**
 * Difference between the two shift sizes,
 * for getting an index-1 offset from an index-2 offset. 6=11-5
 */
var UTRIE2_SHIFT_1_2 = exports.UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;

/**
 * The part of the index-2 table for U+D800..U+DBFF stores values for
 * lead surrogate code _units_ not code _points_.
 * Values for lead surrogate code _points_ are indexed with this portion of the table.
 * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
 */
var UTRIE2_LSCP_INDEX_2_OFFSET = exports.UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;

/** Number of entries in a data block. 32=0x20 */
var UTRIE2_DATA_BLOCK_LENGTH = exports.UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
/** Mask for getting the lower bits for the in-data-block offset. */
var UTRIE2_DATA_MASK = exports.UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;

var UTRIE2_LSCP_INDEX_2_LENGTH = exports.UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
/** Count the lengths of both BMP pieces. 2080=0x820 */
var UTRIE2_INDEX_2_BMP_LENGTH = exports.UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
/**
 * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
 * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
 */
var UTRIE2_UTF8_2B_INDEX_2_OFFSET = exports.UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
var UTRIE2_UTF8_2B_INDEX_2_LENGTH = exports.UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
/**
 * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
 * Variable length, for code points up to highStart, where the last single-value range starts.
 * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
 * (For 0x100000 supplementary code points U+10000..U+10ffff.)
 *
 * The part of the index-2 table for supplementary code points starts
 * after this index-1 table.
 *
 * Both the index-1 table and the following part of the index-2 table
 * are omitted completely if there is only BMP data.
 */
var UTRIE2_INDEX_1_OFFSET = exports.UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;

/**
 * Number of index-1 entries for the BMP. 32=0x20
 * This part of the index-1 table is omitted from the serialized form.
 */
var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = exports.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;

/** Number of entries in an index-2 block. 64=0x40 */
var UTRIE2_INDEX_2_BLOCK_LENGTH = exports.UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
/** Mask for getting the lower bits for the in-index-2-block offset. */
var UTRIE2_INDEX_2_MASK = exports.UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;

var createTrieFromBase64 = exports.createTrieFromBase64 = function createTrieFromBase64(base64) {
    var buffer = (0, _Util.decode)(base64);
    var view32 = Array.isArray(buffer) ? (0, _Util.polyUint32Array)(buffer) : new Uint32Array(buffer);
    var view16 = Array.isArray(buffer) ? (0, _Util.polyUint16Array)(buffer) : new Uint16Array(buffer);
    var headerLength = 24;

    var index = view16.slice(headerLength / 2, view32[4] / 2);
    var data = view32[5] === 2 ? view16.slice((headerLength + view32[4]) / 2) : view32.slice(Math.ceil((headerLength + view32[4]) / 4));

    return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
};

var Trie = exports.Trie = function () {
    function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
        _classCallCheck(this, Trie);

        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index;
        this.data = data;
    }

    /**
     * Get the value for a code point as stored in the Trie.
     *
     * @param codePoint the code point
     * @return the value
     */


    _createClass(Trie, [{
        key: 'get',
        value: function get(codePoint) {
            var ix = void 0;
            if (codePoint >= 0) {
                if (codePoint < 0x0d800 || codePoint > 0x0dbff && codePoint <= 0x0ffff) {
                    // Ordinary BMP code point, excluding leading surrogates.
                    // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                    // 16 bit data is stored in the index array itself.
                    ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }

                if (codePoint <= 0xffff) {
                    // Lead Surrogate Code Point.  A Separate index section is stored for
                    // lead surrogate code units and code points.
                    //   The main index has the code unit data.
                    //   For this function, we need the code point data.
                    // Note: this expression could be refactored for slightly improved efficiency, but
                    //       surrogate code points will be so rare in practice that it's not worth it.
                    ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 0xd800 >> UTRIE2_SHIFT_2)];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }

                if (codePoint < this.highStart) {
                    // Supplemental code point, use two-level lookup.
                    ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                    ix = this.index[ix];
                    ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
                    ix = this.index[ix];
                    ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                    return this.data[ix];
                }
                if (codePoint <= 0x10ffff) {
                    return this.data[this.highValueIndex];
                }
            }

            // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
            return this.errorValue;
        }
    }]);

    return Trie;
}();

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = 'KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA';

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Layer; });
/* harmony import */ var sprite_animator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _helpers_fast_animation_frame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var _basenode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
/* harmony import */ var _basesprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _batch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(45);
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(46);
/* harmony import */ var _helpers_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(19);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







 // import stylesheet from './stylesheet';



const _zOrder = Symbol('zOrder'),
      _timeline = Symbol('timeline'),
      _renderDeferer = Symbol('renderDeferrer'),
      _drawTask = Symbol('drawTask'),
      _autoRender = Symbol('autoRender'),
      _adjustTimer = Symbol('adjustTimer');

let LayerAttr = _decorate(null, function (_initialize, _BaseNode$Attr) {
  class LayerAttr extends _BaseNode$Attr {
    constructor(subject) {
      super(subject);

      _initialize(this);

      this.setDefault({
        bgcolor: ''
      });
    }

  }

  return {
    F: LayerAttr,
    d: [{
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_7__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_7__["parseColorString"]), _utils__WEBPACK_IMPORTED_MODULE_7__["attr"]],
      key: "bgcolor",

      value(val) {
        this.set('bgcolor', val);
        const subject = this.subject;

        if (subject.canvas && subject.canvas.style) {
          if (val != null) {
            this.quietSet('canvasBgColor', subject.canvas.style.backgroundColor);
            subject.canvas.style.backgroundColor = val;
          } else {
            subject.canvas.style.backgroundColor = this.get('canvasBgColor');
          }
        }
      }

    }]
  };
}, _basenode__WEBPACK_IMPORTED_MODULE_2__["default"].Attr);

class Layer extends _basenode__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor({
    context,

    /* deprecated */
    evaluateFPS = false,

    /* deprecated */
    renderMode = 'repaintAll',
    autoRender = true,
    useDocumentCSS = false
  } = {}) {
    super();
    this[_autoRender] = autoRender; // renderMode: repaintAll | repaintDirty

    if (renderMode === 'repaintDirty') {
      Object(_utils__WEBPACK_IMPORTED_MODULE_7__["setDeprecation"])('renderRepaintDirty');
    }

    if (evaluateFPS !== false) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_7__["setDeprecation"])('evaluateFPS');
    }

    this.outputContext = context;
    if (context.canvas) context.canvas.layer_ = this;
    this.childNodes = [];
    this.sortedChildNodes = [];
    this[_zOrder] = 0;
    this[_timeline] = new sprite_animator__WEBPACK_IMPORTED_MODULE_0__["Timeline"](_helpers_fast_animation_frame__WEBPACK_IMPORTED_MODULE_1__["timeline"]);
    this[_renderDeferer] = null;
    this.touchedTargets = {}; // auto release

    /* istanbul ignore if  */

    if (context.canvas && context.canvas.addEventListener) {
      context.canvas.addEventListener('DOMNodeRemovedFromDocument', () => {
        this._savePlaybackRate = this.timeline.playbackRate;
        this._saveChildren = [...this.childNodes];
        this.remove(...this.childNodes);
        this.timeline.playbackRate = 0;
      });
      context.canvas.addEventListener('DOMNodeInsertedIntoDocument', () => {
        if (this._saveChildren) {
          this.timeline.playbackRate = this._savePlaybackRate;
          this.append(...this._saveChildren);
          delete this._saveChildren;
        }
      });
    }

    if (useDocumentCSS) {
      this.fromDocumentCSS();
    }
  }

  fromDocumentCSS() {// stylesheet.fromDocumentCSS();
  }

  get resolution() {
    return [this.canvas.width, this.canvas.height];
  }

  set autoRender(value) {
    this[_autoRender] = value;

    if (value) {
      this.draw();
    }
  }

  get autoRender() {
    return this[_autoRender];
  }

  get layer() {
    return this;
  }

  get children() {
    return this.childNodes.filter(child => child instanceof _basesprite__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }

  get timeline() {
    return this[_timeline];
  }

  get context() {
    return this.outputContext;
  }

  get canvas() {
    return this.outputContext && this.outputContext.canvas;
  }

  get offset() {
    return [0, 0];
  }

  clearContext(context = this.outputContext) {
    if (context.canvas) {
      const {
        width,
        height
      } = context.canvas;
      context.clearRect(0, 0, width, height);
    }
  }

  prepareRender() {
    if (!this[_renderDeferer]) {
      this[_renderDeferer] = {};
      this[_renderDeferer].promise = new Promise((resolve, reject) => {
        Object.assign(this[_renderDeferer], {
          resolve,
          reject
        });

        if (this.autoRender) {
          this[_drawTask] = Object(_helpers_fast_animation_frame__WEBPACK_IMPORTED_MODULE_1__["requestAnimationFrame"])(() => {
            delete this[_drawTask];
            this.draw();
          });
        }
      }); // .catch(ex => console.error(ex.message))
    }

    return this[_renderDeferer] ? this[_renderDeferer].promise : Promise.resolve();
  }

  forceUpdate() {
    return this.prepareRender();
  }

  restyle() {
    const bgcolor = this.style.bgcolor;
    super.restyle();

    if (bgcolor) {
      const color = this.attr('bgcolor');

      if (color !== bgcolor && this.canvas && this.canvas.style) {
        this.canvas.style = color;
      }
    }
  }

  draw(clearContext = true) {
    // if(this.__styleNeedUpdate) {
    //   stylesheet.computeStyle(this);
    // }
    super.draw();
    const renderDeferrer = this[_renderDeferer];
    this[_renderDeferer] = null;

    if (this[_drawTask]) {
      Object(_helpers_fast_animation_frame__WEBPACK_IMPORTED_MODULE_1__["cancelAnimationFrame"])(this[_drawTask]);
      delete this[_drawTask];
    }

    const currentTime = this.timeline.currentTime;
    this.repaint(currentTime, clearContext);
    super.dispatchEvent.call(this, 'update', {
      target: this,
      timeline: this.timeline,
      renderTime: currentTime
    }, true, true);

    if (renderDeferrer) {
      renderDeferrer.resolve();
    }
  }

  update(target) {
    if (target && target.isDirty) return;

    if (target) {
      target.isDirty = true;
    }

    this.prepareRender();
  }

  isVisible() {
    if (this.canvas) {
      return this.canvas.width > 0 && this.canvas.height > 0;
    }

    return true;
  }

  drawSprites(renderEls, t) {
    _utils__WEBPACK_IMPORTED_MODULE_7__["cacheContextPool"].flush();

    if (this.beforeDrawTransform) {
      this.outputContext.save();
      this.beforeDrawTransform();
    }

    for (let i = 0; i < renderEls.length; i++) {
      const child = renderEls[i],
            isDirty = child.isDirty;
      child.isDirty = false;

      if (child.parent === this) {
        child.draw(t);

        if (isDirty) {
          child.dispatchEvent('update', {
            target: child,
            renderTime: t
          }, true, true);
        }
      }
    }

    if (this.beforeDrawTransform) {
      this.outputContext.restore();
    }
  }

  repaint(t, clearContext = true) {
    const renderEls = this.sortedChildNodes;
    const outputContext = this.outputContext;
    if (clearContext) this.clearContext(outputContext);
    this.drawSprites(renderEls, t);
  }

  pointCollision(evt) {
    if (this.outputContext.canvas) {
      const {
        layerX,
        layerY
      } = evt;
      const {
        width,
        height
      } = this.outputContext.canvas;

      if (layerX == null && layerY == null || layerX >= 0 && layerY >= 0 && layerX < width && layerY < height) {
        return true;
      }

      return false;
    }
    /* istanbul ignore next  */


    return true;
  }

  dispatchEvent(type, evt, collisionState = false, swallow = false, useCapturePhase = null) {
    // eslint-disable-line complexity
    const handlers = this.getEventHandlers(type);

    if (swallow && handlers.length === 0) {
      return;
    }

    let hasCapturePhase = false;

    if (!swallow && !evt.terminated && type !== 'mouseenter') {
      let isCollision = collisionState || this.pointCollision(evt);
      const identifier = evt.identifier;

      if (identifier != null && (type === 'touchend' || type === 'touchmove')) {
        isCollision = true;
      }

      if (isCollision || type === 'mouseleave') {
        const sprites = this.sortedChildNodes.slice(0).reverse();
        const targetSprites = [];

        if (identifier != null && (type === 'touchend' || type === 'touchmove')) {
          const touches = evt.originalEvent.changedTouches;

          for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];

            if (touch.identifier === identifier) {
              const targets = this.layer.touchedTargets[identifier];

              if (targets) {
                targets.forEach(target => {
                  if (target !== this && target.layer === this) {
                    const [parentX, parentY] = target.getParentXY(evt.layerX, evt.layerY);
                    const _parent = [evt.parentX, evt.parentY];
                    evt.parentX = parentX;
                    evt.parentY = parentY;
                    target.dispatchEvent(type, evt, true, true, useCapturePhase);
                    [evt.parentX, evt.parentY] = _parent;
                  }
                });
                if (type === 'touchend') delete this.layer.touchedTargets[identifier];
              }
            }
          }
        } else {
          evt.parentX = evt.layerX;
          evt.parentY = evt.layerY;

          if (isCollision && handlers.length && handlers.some(handler => handler.useCapture)) {
            hasCapturePhase = true;
            if (!evt.target) evt.target = this.getTargetFromXY(evt.parentX, evt.parentY);
            super.dispatchEvent(type, evt, isCollision, swallow, true);
          }

          if (!hasCapturePhase || !evt.cancelBubble) {
            for (let i = 0; i < sprites.length; i++) {
              const sprite = sprites[i];
              const hit = sprite.dispatchEvent(type, evt, collisionState, swallow, useCapturePhase);

              if (hit) {
                if (evt.targetSprites) {
                  targetSprites.push(...evt.targetSprites);
                  delete evt.targetSprites;
                } // detect mouseenter/mouseleave


                targetSprites.push(sprite);
              }

              if (evt.terminated && type !== 'mousemove') {
                break;
              }
            }
          }

          delete evt.parentX;
          delete evt.parentY;
        }

        evt.targetSprites = targetSprites; // stopDispatch can only terminate event in the same level

        evt.terminated = false;
        collisionState = isCollision;
      }
    }

    evt.targetSprites = evt.targetSprites || [];

    if (evt.cancelBubble) {
      // stop bubbling
      return false;
    }

    if (hasCapturePhase) {
      return super.dispatchEvent(type, evt, collisionState, swallow, false);
    }

    if (evt.targetSprites.length > 0) {
      // bubbling
      collisionState = true;
    }

    const {
      layerX,
      layerY
    } = evt;

    if (layerX != null && layerY != null) {
      evt.offsetX = layerX + this.offset[0];
      evt.offsetY = layerY + this.offset[1];
    }

    return super.dispatchEvent(type, evt, collisionState, swallow, useCapturePhase);
  }

  group(...sprites) {
    const group = new _group__WEBPACK_IMPORTED_MODULE_5__["default"]();
    group.append(...sprites);
    this.appendChild(group);
    return group;
  }

  batch(...sprites) {
    sprites.forEach(sprite => {
      if (sprite.layer !== this) {
        this.appendChild(sprite);
      }
    });
    const batch = new _batch__WEBPACK_IMPORTED_MODULE_4__["default"](this);
    batch.add(...sprites);
    return batch;
  }

  adjust(handler, update = true)
  /* istanbul ignore next  */
  {
    if (!update) return;
    const outputContext = this.outputContext;
    const shadowContext = this.adjustContext || outputContext.canvas.cloneNode().getContext('2d');

    if (!this[_adjustTimer]) {
      this.autoRender = false;
      shadowContext.clearRect(0, 0, shadowContext.canvas.width, shadowContext.canvas.height);
      shadowContext._clearTag = false;
      shadowContext.drawImage(outputContext.canvas, 0, 0);
      this.adjustContext = shadowContext;
    } else {
      clearTimeout(this[_adjustTimer]);
    }

    this[_adjustTimer] = setTimeout(() => {
      this.autoRender = true;
      delete this[_adjustTimer];
    }, 100);

    if (shadowContext.canvas.width > 0 && shadowContext.canvas.height > 0) {
      this.clearContext(outputContext);
      outputContext.save();
      handler.call(this, outputContext);
      outputContext.drawImage(shadowContext.canvas, 0, 0);
      outputContext.restore();
    }
  }

}

_defineProperty(Layer, "Attr", LayerAttr);

Object.assign(Layer.prototype, _helpers_group__WEBPACK_IMPORTED_MODULE_6__["default"]);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return requestAnimationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return cancelAnimationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeline", function() { return timeline; });
/* harmony import */ var sprite_animator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


let _requestAnimationFrame, _cancelAnimationFrame;

if (typeof global.requestAnimationFrame === 'undefined') {
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

const requestAnimationFrame = step => {
  const id = Symbol('requestId');
  steps.set(id, step);

  if (timerId == null) {
    if (steps.size === 1) {
      currentTime = Date.now();
    }

    timerId = _requestAnimationFrame(t => {
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

const cancelAnimationFrame = id => {
  steps.delete(id);

  if (!steps.size && timerId) {
    _cancelAnimationFrame(timerId);

    timerId = null;
  }
};

const timeline = new sprite_animator__WEBPACK_IMPORTED_MODULE_0__["Timeline"]({
  nowtime() {
    return steps.size ? currentTime : Date.now();
  }

});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(44)))

/***/ }),
/* 44 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Batch; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);


const _batch = Symbol('batch');

class Batch {
  constructor(layer) {
    this.layer = layer;
    this[_batch] = new Set();
    this.cache = null;
  }

  get baseNode() {
    const batchNodes = [...this[_batch]];
    let baseNode = batchNodes[0],
        zOrder = Infinity,
        zIndex = Infinity;

    for (let i = 0; i < batchNodes.length; i++) {
      const node = batchNodes[i];

      if (zIndex > node.zIndex) {
        zIndex = node.zIndex;
        zOrder = node.zOrder;
        baseNode = node;
      } else if (zIndex === node.zIndex && zOrder > node.zOrder) {
        zOrder = node.zOrder;
        baseNode = node;
      }
    }

    return baseNode;
  }

  add(...nodes) {
    nodes.forEach(node => {
      if (!node.layer || node.layer !== this.layer) {
        /* istanbul ignore next  */
        throw new Error('Batch node must append to this layer first!');
      }

      if (node[_batch]) {
        /* istanbul ignore next  */
        throw new Error('Node already batched!');
      }

      node.attr('enableCache', true);
      const that = this;
      Object.defineProperty(node, 'cache', {
        configurable: true,

        get() {
          return that.cache;
        },

        set(context) {
          if (that.baseNode === this) {
            if (that.cache && context !== that.cache) {
              _utils__WEBPACK_IMPORTED_MODULE_0__["cacheContextPool"].put(that.cache);
            }

            that.cache = context;
          } else if (context == null) {
            throw new Error('Cannot set non-cachable attributes to batch members.Use batch.baseNode.attr(...)');
          }
        }

      });
      node[_batch] = this;

      this[_batch].add(node);
    });
  }

  remove(...nodes) {
    nodes.forEach(node => {
      if (this[_batch].has(node)) {
        delete node[_batch];
        delete node.cache;

        this[_batch].delete(node);
      }
    });
  }

}

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Group; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _basesprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var _helpers_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(47);
function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





const _zOrder = Symbol('zOrder'),
      _layoutTag = Symbol('layoutTag');

const reflow = true,
      relayout = true;

let GroupAttr = _decorate(null, function (_initialize, _BaseSprite$Attr) {
  class GroupAttr extends _BaseSprite$Attr {
    constructor(subject) {
      super(subject);

      _initialize(this);

      GroupAttr.inits.forEach(init => {
        init(this, subject);
      });
    }

  }

  return {
    F: GroupAttr,
    d: [{
      kind: "field",
      static: true,
      key: "inits",

      value() {
        return [];
      }

    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["attr"]],
      key: "enableCache",

      value() {
        return 'auto';
      }

    }, {
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        reflow,
        value: null
      })],
      key: "clip",

      value(val) {
        if (val) {
          val = typeof val === 'string' ? {
            d: val
          } : val;
          this.subject.svg = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createSvgPath"])(val);
          this.set('clip', val);
        } else {
          this.subject.svg = null;
          this.set('clip', null);
        }
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        reflow,
        relayout
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["relative"])('width')],
      key: "layoutWidth",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        reflow,
        relayout
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["relative"])('height')],
      key: "layoutHeight",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        reflow,
        relayout
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["relative"])('width')],
      key: "width",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        reflow,
        relayout
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["relative"])('height')],
      key: "height",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        relayout
      })],
      key: "display",

      value() {
        return '';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(parseFloat), _utils__WEBPACK_IMPORTED_MODULE_0__["attr"]],
      key: "scrollLeft",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(parseFloat), _utils__WEBPACK_IMPORTED_MODULE_0__["attr"]],
      key: "scrollTop",

      value() {
        return 0;
      }

    }]
  };
}, _basesprite__WEBPACK_IMPORTED_MODULE_1__["default"].Attr);

const _layout = Symbol('layout');

let Group = _decorate(null, function (_initialize2, _BaseSprite) {
  class Group extends _BaseSprite {
    constructor(attr = {}) {
      super(attr);

      _initialize2(this);

      this.childNodes = [];
      this.sortedChildNodes = [];
      this[_zOrder] = 0;
      this[_layoutTag] = false;
      this.__labelCount = 0;
    }

  }

  return {
    F: Group,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",

      value() {
        return GroupAttr;
      }

    }, {
      kind: "method",
      static: true,
      key: "applyLayout",

      value(name, layout) {
        this[_layout] = this[_layout] || {};
        const {
          attrs,
          relayout
        } = layout;

        if (attrs.init) {
          GroupAttr.inits.push(attrs.init);
        }

        Group.addAttributes(attrs);
        this[_layout][name] = relayout;
      }

    }, {
      kind: "get",
      key: "isVirtual",

      value() {
        const display = this.attr('display');
        if (display !== '' && display !== 'none') return false;
        const parent = this.parent;
        if (parent && parent instanceof Group && !parent.isVirtual) return false;
        const {
          width: borderWidth
        } = this.attr('border'),
              borderRadius = this.attr('borderRadius'),
              bgcolor = this.attr('bgcolor'),
              {
          bgcolor: bgGradient
        } = this.attr('gradients'),
              [width, height] = this.attrSize,
              [anchorX, anchorY] = this.attr('anchor'),
              bgimage = this.attr('bgimage'),
              [paddingTop, paddingRight, paddingBottom, paddingLeft] = this.attr('padding');
        return !anchorX && !anchorY && !width && !height && !borderRadius && !borderWidth && !bgcolor && !bgGradient && !bgimage && !paddingTop && !paddingRight && !paddingBottom && !paddingLeft;
      }

    }, {
      kind: "method",
      key: "connect",

      value(parent, zOrder = 0) {
        const ret = _get(_getPrototypeOf(Group.prototype), "connect", this).call(this, parent, zOrder);

        const labelCount = this.__labelCount;
        let _p = parent;

        while (_p && _p.__labelCount != null) {
          _p.__labelCount += labelCount;
          _p = _p.parent;
        }

        return ret;
      }

    }, {
      kind: "method",
      key: "disconnect",

      value(parent) {
        const ret = _get(_getPrototypeOf(Group.prototype), "disconnect", this).call(this, parent);

        const labelCount = this.__labelCount;
        let _p = parent;

        while (_p && _p.__labelCount != null) {
          _p.__labelCount -= labelCount;
          _p = _p.parent;
        }

        return ret;
      }

    }, {
      kind: "method",
      key: "scrollTo",

      value(x, y) {
        this.attr('scrollLeft', x);
        this.attr('scrollTop', y);
      }

    }, {
      kind: "method",
      key: "scrollBy",

      value(dx, dy) {
        const x = this.attr('scrollLeft'),
              y = this.attr('scrollTop');
        this.scrollTo(x + dx, y + dy);
      }

    }, {
      kind: "method",
      key: "cloneNode",

      value(deepCopy) {
        const node = _get(_getPrototypeOf(Group.prototype), "cloneNode", this).call(this);

        if (deepCopy) {
          const children = this.childNodes;
          children.forEach(child => {
            const subNode = child.cloneNode(deepCopy);
            node.append(subNode);
          });
        }

        return node;
      }

    }, {
      kind: "get",
      key: "children",

      value() {
        const children = this.childNodes || [];
        return children.filter(child => child instanceof _basesprite__WEBPACK_IMPORTED_MODULE_1__["default"]);
      }

    }, {
      kind: "method",
      key: "update",

      value(child) {
        child.isDirty = true;
        const attrSize = this.attrSize;

        if (attrSize[0] === '' || attrSize[1] === '') {
          this.reflow();
        }

        this.forceUpdate(true);
      }

    }, {
      kind: "method",
      key: "pointCollision",

      value(evt) {
        if (_get(_getPrototypeOf(Group.prototype), "pointCollision", this).call(this, evt) || this.isVirtual) {
          if (this.svg) {
            const {
              offsetX,
              offsetY
            } = evt;
            if (offsetX == null && offsetY == null) return true;
            const rect = this.originalRect;
            evt.isInClip = this.svg.isPointInPath(offsetX - rect[0], offsetY - rect[1]);
          }

          return true;
        }

        return false;
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["flow"]],
      key: "contentSize",

      value() {
        if (this.isVirtual) return [0, 0];
        let [width, height] = this.attrSize;

        if (width === '' || height === '') {
          if (this.attr('clip')) {
            const svg = this.svg;
            const bounds = svg.bounds;
            width = width || bounds[2];
            height = height || bounds[3];
          } else {
            let right, bottom;
            right = 0;
            bottom = 0;
            this.childNodes.forEach(sprite => {
              if (sprite.attr('display') !== 'none') {
                const renderBox = sprite.renderBox;

                if (renderBox) {
                  right = Math.max(right, renderBox[2]);
                  bottom = Math.max(bottom, renderBox[3]);
                }
              }
            });
            width = width || right;
            height = height || bottom;
          }
        }

        return [width, height];
      }

    }, {
      kind: "method",
      key: "dispatchEvent",

      value(type, evt, collisionState = false, swallow = false, useCapturePhase = null) {
        const handlers = this.getEventHandlers(type);

        if (swallow && handlers.length === 0) {
          return;
        }

        let hasCapturePhase = false;

        if (!swallow && !evt.terminated && type !== 'mouseenter') {
          const isCollision = collisionState || this.pointCollision(evt);

          if (isCollision || type === 'mouseleave' || !this.attr('clipOverflow')) {
            const scrollLeft = this.attr('scrollLeft'),
                  scrollTop = this.attr('scrollTop'),
                  borderWidth = this.attr('border').width,
                  padding = this.attr('padding');
            let parentX, parentY;
            if ('offsetX' in evt) parentX = evt.offsetX - this.originalRect[0] - borderWidth - padding[3] + scrollLeft;
            if ('offsetY' in evt) parentY = evt.offsetY - this.originalRect[1] - borderWidth - padding[0] + scrollTop;
            const _parentX = evt.parentX,
                  _parentY = evt.parentY;
            evt.parentX = parentX;
            evt.parentY = parentY;

            if (isCollision && handlers.length && handlers.some(handler => handler.useCapture)) {
              hasCapturePhase = true;
              if (!evt.target) evt.target = this.getTargetFromXY(parentX, parentY);

              _get(_getPrototypeOf(Group.prototype), "dispatchEvent", this).call(this, type, evt, isCollision, swallow, true);
            }

            const targetSprites = [];

            if (!hasCapturePhase || !evt.cancelBubble) {
              const sprites = this.sortedChildNodes.slice(0).reverse();

              for (let i = 0; i < sprites.length && evt.isInClip !== false; i++) {
                const sprite = sprites[i];
                const hit = sprite.dispatchEvent(type, evt, collisionState, swallow, useCapturePhase);

                if (hit) {
                  if (evt.targetSprites) {
                    targetSprites.push(...evt.targetSprites);
                    delete evt.targetSprites;
                  }

                  targetSprites.push(sprite);
                }

                if (evt.terminated && type !== 'mousemove') {
                  break;
                }
              }
            }

            evt.targetSprites = targetSprites; // stopDispatch can only terminate event in the same level

            evt.terminated = false;
            evt.parentX = _parentX;
            evt.parentY = _parentY;
            collisionState = isCollision;
          }
        }

        evt.targetSprites = evt.targetSprites || [];

        if (evt.cancelBubble) {
          // stop bubbling
          return false;
        }

        if (hasCapturePhase) {
          return _get(_getPrototypeOf(Group.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow, false);
        }

        if (evt.targetSprites.length > 0) {
          // bubbling
          collisionState = true;
        }

        return _get(_getPrototypeOf(Group.prototype), "dispatchEvent", this).call(this, type, evt, collisionState, swallow, useCapturePhase);
      }

    }, {
      kind: "method",
      key: "relayout",

      value() {
        const items = this.childNodes.filter(child => {
          if (child.hasLayout) {
            child.attr('layoutWidth', null);
            child.attr('layoutHeight', null);
            child.attr('layoutX', null);
            child.attr('layoutY', null);
          }

          if (child.relayout) {
            const display = child.attr('display');

            if (display !== '' && display !== 'static') {
              child.relayout();
            }
          }

          return child.hasLayout && child.attr('display') !== 'none';
        });
        const display = this.attr('display');
        const doLayout = Group[_layout][display];

        if (doLayout) {
          doLayout(this, items);
        }
      }

    }, {
      kind: "method",
      key: "clearLayout",

      value() {
        this[_layoutTag] = false;
        if (this.hasLayout) this.parent.clearLayout();
      }

    }, {
      kind: "method",
      key: "draw",

      value(t, drawingContext = this.context) {
        // must relayout before draw
        // prevent originalRect changing when rendering.
        const display = this.attr('display');

        if (display !== '' && display !== 'static' && !this[_layoutTag]) {
          this.relayout();
          this[_layoutTag] = true;
        }

        return _get(_getPrototypeOf(Group.prototype), "draw", this).call(this, t, drawingContext);
      }

    }, {
      kind: "method",
      key: "render",

      value(t, drawingContext) {
        const clipPath = this.attr('clip');

        if (clipPath) {
          this.svg.beginPath().to(drawingContext);
          drawingContext.clip();
        }

        if (!this.isVirtual) {
          _get(_getPrototypeOf(Group.prototype), "render", this).call(this, t, drawingContext);

          if (this.attr('clipOverflow')) {
            drawingContext.beginPath();
            drawingContext.rect(0, 0, this.contentSize[0], this.contentSize[1]);
            drawingContext.clip();
          }
        }

        drawingContext.save();
        const scrollLeft = this.attr('scrollLeft'),
              scrollTop = this.attr('scrollTop');
        drawingContext.translate(-scrollLeft, -scrollTop);
        const sprites = this.sortedChildNodes;

        for (let i = 0; i < sprites.length; i++) {
          const child = sprites[i],
                isDirty = child.isDirty;
          child.isDirty = false;
          child.draw(t, drawingContext);

          if (isDirty) {
            child.dispatchEvent('update', {
              target: child,
              renderTime: t
            }, true, true);
          }
        }

        drawingContext.restore();
      }

    }]
  };
}, _basesprite__WEBPACK_IMPORTED_MODULE_1__["default"]);


Object.assign(Group.prototype, _helpers_group__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);


const _zOrder = Symbol('zOrder');

const _removeTask = Symbol('removeTask');

/* harmony default export */ __webpack_exports__["default"] = ({
  getTargetFromXY(x, y) {
    const children = this.children;
    let target = this;
    children.some(child => {
      const evt = {
        parentX: x,
        parentY: y
      };
      const hit = child.pointCollision(evt);

      if (hit) {
        if (child.getTargetFromXY) {
          target = child.getTargetFromXY(evt.offsetX, evt.offsetY);
        } else {
          target = child;
        }
      }

      return hit;
    });
    return target;
  },

  appendChild(sprite, update = true) {
    const _append = () => {
      this[_zOrder] = this[_zOrder] || 0;
      sprite.connect(this, this[_zOrder]++);
      const children = this.childNodes;
      children.push(sprite); // quick insert

      const orderedSprites = this.sortedChildNodes || [];
      const len = orderedSprites.length;
      let i;
      let left = 0,
          right = len - 1;
      const zIndex = sprite.attr('zIndex') | 0;

      for (; i == null && left <= right;) {
        const rightSprite = orderedSprites[right];
        const leftSprite = orderedSprites[left];
        if (zIndex >= rightSprite.zIndex) i = right + 1;else if (zIndex < leftSprite.zIndex) i = left;else if (left >= right - 1) i = right;else {
          // between left & right
          const mid = Math.ceil((left + right) / 2);
          const midSprite = orderedSprites[mid];
          if (zIndex >= midSprite.zIndex) left = mid;else right = mid;
        }
      }

      if (i == null || i === len) orderedSprites.push(sprite);else orderedSprites.splice(i, 0, sprite);
      this.sortedChildNodes = orderedSprites;

      if (update) {
        sprite.forceUpdate();
      }

      if (sprite.layer) {
        return sprite.enter();
      }

      return sprite;
    };

    const _remove = this.removeChild(sprite);

    if (_remove && _remove.promise) {
      // deferred
      if (_remove.resolve) _remove.resolve();

      _remove.promise.then(() => {
        return _append();
      });

      return _remove;
    }

    return _append();
  },

  append(...sprites) {
    sprites.forEach(sprite => {
      this.appendChild(sprite);
    });
    return this;
  },

  removeChild(child) {
    if (child[_removeTask]) return child[_removeTask];
    const idx = this.childNodes.indexOf(child);

    if (idx === -1) {
      return null;
    }

    const that = this;

    function remove(sprite) {
      delete child[_removeTask]; // re-calculate index because it's async...

      const idx = that.childNodes.indexOf(child);

      if (idx === -1) {
        return null;
      }

      that.childNodes.splice(idx, 1);
      that.sortedChildNodes = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortOrderedSprites"])(that.childNodes);

      if (sprite.isVisible() || sprite.lastRenderBox) {
        sprite.forceUpdate();
      }

      sprite.disconnect(that);
      return sprite;
    }

    const action = child.exit();

    if (action.promise) {
      child[_removeTask] = action;
      action.promise.then(() => {
        return remove(child);
      });
      return action;
    }

    return remove(child);
  },

  clear() {
    const children = this.childNodes.slice(0);
    children.forEach(child => this.removeChild(child));
    return this;
  },

  remove(...args) {
    if (args.length === 0) {
      if (!this.parent) return null;
      return this.parent.removeChild(this);
    }

    args.forEach(sprite => {
      this.removeChild(sprite);
    });
    return this;
  },

  insertBefore(newchild, refchild) {
    if (refchild == null) {
      return this.appendChild(newchild);
    }

    const idx = this.childNodes.indexOf(refchild);
    const refZOrder = refchild.zOrder;

    if (idx >= 0) {
      const _insert = () => {
        for (let i = 0; i < this.childNodes.length; i++) {
          const child = this.childNodes[i],
                zOrder = child.zOrder;

          if (zOrder >= refZOrder) {
            delete child.zOrder;
            Object.defineProperty(child, 'zOrder', {
              value: zOrder + 1,
              writable: false,
              configurable: true
            });
          }
        }

        this.childNodes.splice(idx, 0, newchild);
        newchild.connect(this, refZOrder);
        this.sortedChildNodes = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sortOrderedSprites"])(this.childNodes);
        newchild.forceUpdate();
        this[_zOrder] = this[_zOrder] || 0;
        this[_zOrder]++;

        if (this.layer) {
          return newchild.enter();
        }
      };

      const _remove = this.removeChild(newchild);

      if (_remove && _remove.promise) {
        if (_remove.resolve) _remove.resolve();

        _remove.promise.then(() => _insert());

        return _remove;
      }

      return _insert();
    }

    return null;
  },

  replaceChild(newChild, oldChild) {
    Promise.resolve(this.insertBefore(newChild, oldChild)).then(() => {
      this.removeChild(oldChild);
    });
  }

});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Path; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _basesprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



const reflow = true,
      quiet = true;

let PathSpriteAttr = _decorate(null, function (_initialize, _BaseSprite$Attr) {
  class PathSpriteAttr extends _BaseSprite$Attr {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: PathSpriteAttr,
    d: [{
      kind: "set",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        reflow
      })],
      key: "path",

      value(val) {
        if (val) {
          val = typeof val === 'string' ? {
            d: val
          } : val;
          this.subject.svg = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createSvgPath"])(val);
          this.set('path', val);
        } else {
          this.subject.svg = null;
          this.set('path', null);
        }
      }

    }, {
      kind: "set",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["attr"]],
      key: "d",

      value(val) {
        if (val) {
          const path = this.path;

          if (!path) {
            this.path = {
              d: val
            };
          } else {
            this.path = Object.assign(path, {
              d: val
            });
          }
        } else {
          this.path = null;
        }
      }

    }, {
      kind: "get",
      key: "d",

      value() {
        return this.path ? this.path.d : null;
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(parseFloat), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        reflow
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inherit"])(1)],
      key: "lineWidth",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_0__["parseStringFloat"], val => {
        return typeof val === 'number' ? [val] : val;
      }), _utils__WEBPACK_IMPORTED_MODULE_0__["attr"]],
      key: "lineDash",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(parseFloat), _utils__WEBPACK_IMPORTED_MODULE_0__["attr"]],
      key: "lineDashOffset",

      value() {
        return 0;
      }

    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inherit"])('butt')],
      key: "lineCap",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inherit"])('miter')],
      key: "lineJoin",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_0__["parseColorString"]), _utils__WEBPACK_IMPORTED_MODULE_0__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inherit"])('')],
      key: "strokeColor",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(_utils__WEBPACK_IMPORTED_MODULE_0__["parseColorString"]), _utils__WEBPACK_IMPORTED_MODULE_0__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inherit"])('')],
      key: "fillColor",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        reflow
      })],
      key: "flexible",
      value: void 0
    }, {
      kind: "field",
      decorators: [Object(_utils__WEBPACK_IMPORTED_MODULE_0__["attr"])({
        quiet
      }), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["inherit"])('auto')],
      key: "bounding",

      value() {
        return 'inherit';
      }

    }, {
      kind: "field",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["attr"], Object(_utils__WEBPACK_IMPORTED_MODULE_0__["composit"])('strokeColor')],
      key: "color",
      value: void 0
    }]
  };
}, _basesprite__WEBPACK_IMPORTED_MODULE_1__["default"].Attr);

let Path = _decorate(null, function (_initialize2, _BaseSprite) {
  class Path extends _BaseSprite {
    constructor(attr) {
      if (typeof attr === 'string') {
        attr = {
          d: attr
        };
      }

      super(attr);

      _initialize2(this);
    }

  }

  return {
    F: Path,
    d: [{
      kind: "field",
      static: true,
      key: "Attr",

      value() {
        return PathSpriteAttr;
      }

    }, {
      kind: "set",
      key: "path",

      value(val) {
        this.attr('path', val);
      }

    }, {
      kind: "get",
      key: "path",

      value() {
        return this.attr('path');
      }

    }, {
      kind: "method",
      key: "getPointAtLength",

      value(length) {
        if (this.svg) {
          return this.svg.getPointAtLength(length);
        }

        return [0, 0];
      }

    }, {
      kind: "method",
      key: "getPathLength",

      value() {
        if (this.svg) {
          return this.svg.getTotalLength();
        }

        return 0;
      }

    }, {
      kind: "method",
      key: "isClosed",

      value() {
        const d = this.attr('d');

        if (d) {
          return /z$/img.test(d);
        }

        return false;
      }

    }, {
      kind: "method",
      key: "findPath",

      value(offsetX, offsetY) {
        const rect = this.originalRect;
        const pathOffset = this.pathOffset;
        const svg = this.svg;

        if (svg) {
          const x = offsetX - rect[0] - pathOffset[0],
                y = offsetY - rect[1] - pathOffset[1];
          let collision = false;

          if (this.isClosed()) {
            collision = svg.isPointInPath(x, y);
          }

          if (!collision) {
            const lineWidth = this.attr('lineWidth') + (parseFloat(this.attr('bounding')) || 0),
                  lineCap = this.attr('lineCap'),
                  lineJoin = this.attr('lineJoin');
            collision = svg.isPointInStroke(x, y, {
              lineWidth,
              lineCap,
              lineJoin
            });
          }

          if (collision) {
            return [svg];
          }
        }

        return [];
      }

    }, {
      kind: "get",
      key: "lineWidth",

      value() {
        const lineWidth = this.attr('lineWidth'),
              gradients = this.attr('gradients'),
              fillColor = this.attr('fillColor'),
              strokeColor = this.attr('strokeColor');
        const hasStrokeColor = strokeColor || gradients && gradients.strokeColor,
              hasFillColor = fillColor || gradients && gradients.fillColor;

        if (!hasStrokeColor && hasFillColor) {
          // fill: ignore stroke
          return 0;
        }

        return lineWidth;
      }

    }, {
      kind: "get",
      key: "pathOffset",

      value() {
        const lw = Math.round(this.lineWidth);
        return [lw, lw];
      }

    }, {
      kind: "get",
      key: "pathSize",

      value() {
        return this.svg ? this.svg.size : [0, 0];
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["flow"]],
      key: "contentSize",

      value() {
        if (!this.svg) return _get(_getPrototypeOf(Path.prototype), "contentSize", this);
        const bounds = this.svg.bounds;
        let [width, height] = this.attrSize;
        const pathOffset = this.pathOffset;

        if (width === '') {
          width = bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0];
        }

        if (height === '') {
          height = bounds[3] - Math.min(0, bounds[1]) + 2 * pathOffset[1];
        }

        if (this.attr('flexible') && this.attr('height') === '' && this.attr('layoutHeight') === '') {
          height = Math.ceil(height * width / (bounds[2] - Math.min(0, bounds[0]) + 2 * pathOffset[0]));
        }

        return [width, height].map(Math.ceil);
      }

    }, {
      kind: "get",
      decorators: [_utils__WEBPACK_IMPORTED_MODULE_0__["flow"]],
      key: "originalRect",

      value() {
        const svg = this.svg;

        if (svg) {
          const bounds = svg.bounds,
                offset = this.pathOffset;
          const [width, height] = this.offsetSize,
                [anchorX, anchorY] = this.attr('anchor');
          const rect = [0, 0, width, height],
                offsetX = Math.min(0, bounds[0]),
                offsetY = Math.min(0, bounds[1]);
          rect[0] = offsetX - offset[0] - anchorX * (width + offsetX - 2 * offset[0]);
          rect[1] = offsetY - offset[1] - anchorY * (height + offsetY - 2 * offset[1]);
          return rect;
        }

        return _get(_getPrototypeOf(Path.prototype), "originalRect", this);
      }

    }, {
      kind: "method",
      key: "pointCollision",

      value(evt) {
        const bounding = this.attr('bounding');

        if (_get(_getPrototypeOf(Path.prototype), "pointCollision", this).call(this, evt) || bounding !== 'auto' && bounding !== 'box' && bounding !== 'path' && bounding !== 0) {
          let {
            offsetX,
            offsetY
          } = evt;
          if (offsetX == null && offsetY == null) return true;
          const svg = this.svg;

          if (svg) {
            const bounds = svg.bounds;
            offsetX += Math.min(0, bounds[0]);
            offsetY += Math.min(0, bounds[1]);
          }

          evt.targetPaths = this.findPath(offsetX, offsetY);

          if (bounding !== 'box' && !(bounding === 'auto' && (this.attr('borderWidth') > 0 || this.attr('bgcolor') || this.attr('gradients').bgcolor))) {
            return evt.targetPaths.length > 0;
          }

          return true;
        }

        return false;
      }

    }, {
      kind: "method",
      key: "render",

      value(t, drawingContext) {
        _get(_getPrototypeOf(Path.prototype), "render", this).call(this, t, drawingContext);

        const d = this.attr('d'),
              lineWidth = this.attr('lineWidth'),
              lineCap = this.attr('lineCap'),
              lineJoin = this.attr('lineJoin'),
              lineDash = this.attr('lineDash'),
              flexible = this.attr('flexible');

        if (d) {
          const svg = this.svg;
          let [ox, oy, ow, oh] = svg.bounds;
          let [px, py] = this.pathOffset;
          const [w, h] = this.contentSize;

          if ((w < ow || h < oh) && this.attr('clipOverflow')) {
            drawingContext.beginPath();
            drawingContext.rect(0, 0, w, h);
            drawingContext.clip();
          }

          if (flexible) {
            svg.save();
            const sw = w / (ow - Math.min(0, ox) + 2 * px);
            svg.scale(sw, sw);
            ox *= sw;
            oy *= sw;
            px *= sw;
            py *= sw;
          }

          if (ox < 0 || oy < 0) {
            drawingContext.translate(-Math.min(0, ox), -Math.min(0, oy));
          }

          drawingContext.translate(px, py);
          svg.beginPath().to(drawingContext);

          if (flexible) {
            svg.restore();
          }

          drawingContext.lineWidth = lineWidth;
          drawingContext.lineCap = lineCap;
          drawingContext.lineJoin = lineJoin;

          if (lineDash != null) {
            drawingContext.setLineDash(lineDash);
            const lineDashOffset = this.attr('lineDashOffset');
            drawingContext.lineDashOffset = lineDashOffset;
          }

          const fillColor = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["findColor"])(drawingContext, this, 'fillColor');

          if (fillColor) {
            drawingContext.fillStyle = fillColor;
          }

          let strokeColor = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["findColor"])(drawingContext, this, 'strokeColor');

          if (!strokeColor && !fillColor) {
            strokeColor = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseColorString"])('black');
          }

          if (strokeColor) {
            drawingContext.strokeStyle = strokeColor;
          }

          if (fillColor) {
            drawingContext.fill();
          }

          if (strokeColor) {
            drawingContext.stroke();
          }
        }
      }

    }]
  };
}, _basesprite__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return use; });
const installed = new WeakMap();

const _merged = Symbol('merged');

let target = null;
function use(plugin, options = null, merge = true) {
  if (!target) {
    target = Object.assign({}, this);
    target.__spritejs = this; // target.use = use.bind(target);

    target.use = function (plugin, options = null, merge = false) {
      return use.call(target, plugin, options, merge);
    };
  }

  if (typeof options === 'boolean') {
    merge = options;
    options = null;
  }

  if (installed.has(plugin)) {
    const ret = installed.get(plugin);

    if (merge && !ret[_merged]) {
      Object.assign(target, ret);
      ret[_merged] = true;
    }

    return ret;
  }

  const install = plugin.install || plugin;
  const ret = install.call(plugin, target, options) || {};
  installed.set(plugin, ret);

  if (merge) {
    Object.assign(target.__spritejs, ret);
    ret[_merged] = true;
  }

  return ret;
}

/***/ }),
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony import */ var sprite_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "math", function() { return sprite_math__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _core_basesprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseSprite", function() { return _core_basesprite__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _core_sprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return _core_sprite__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _core_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return _core_label__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _core_layer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _core_layer__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _core_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(46);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return _core_group__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _core_basenode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(33);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseNode", function() { return _core_basenode__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _core_path__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(48);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Path", function() { return _core_path__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _core_batch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(45);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Batch", function() { return _core_batch__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _core_use__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(49);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "use", function() { return _core_use__WEBPACK_IMPORTED_MODULE_10__["default"]; });












const Color = _utils__WEBPACK_IMPORTED_MODULE_1__["Color"];


/***/ })
/******/ ]);