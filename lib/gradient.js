"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.createLinearGradients = createLinearGradients;
exports.createRadialGradient = createRadialGradient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gradientBox(angle, rect) {
  var _rect = (0, _slicedToArray3.default)(rect, 4),
      x = _rect[0],
      y = _rect[1],
      w = _rect[2],
      h = _rect[3];

  angle %= 360;
  if (angle < 0) {
    angle += 360;
  }

  if (angle >= 0 && angle < 90) {
    var tan = Math.tan(Math.PI * angle / 180);

    var d = tan * w;

    if (d <= h) {
      return [x, y, x + w, y + d];
    }
    d = h / tan;
    return [x, y, x + d, y + h];
  } else if (angle >= 90 && angle < 180) {
    var _tan = Math.tan(Math.PI * (angle - 90) / 180);

    var _d = _tan * h;

    if (_d <= w) {
      return [x + w, y, x + w - _d, y + h];
    }
    _d = w / _tan;
    return [x + w, y, x, y + _d];
  } else if (angle >= 180 && angle < 270) {
    var _tan2 = Math.tan(Math.PI * (angle - 180) / 180);

    var _d2 = _tan2 * w;

    if (_d2 <= h) {
      return [x + w, y + h, x, y + h - _d2];
    }
    _d2 = h / _tan2;
    return [x + w, y + h, x + w - _d2, y];
  } else if (angle >= 270 && angle < 360) {
    var _tan3 = Math.tan(Math.PI * (angle - 270) / 180);

    var _d3 = _tan3 * h;

    if (_d3 <= w) {
      return [x, y + h, x + _d3, y];
    }
    _d3 = w / _tan3;
    return [x, y + h, x + w, y + h - _d3];
  }

  return [x, y, x + w, y + h];
}

function createLinearGradients(context, rect, linearGradients) {
  var colors = linearGradients.colors,
      direction = linearGradients.direction,
      vector = linearGradients.vector,
      _rect2 = (0, _slicedToArray3.default)(rect, 4),
      x = _rect2[0],
      y = _rect2[1],
      w = _rect2[2],
      h = _rect2[3];

  var x0 = void 0,
      y0 = void 0,
      x1 = void 0,
      y1 = void 0;

  if (direction != null) {
    var _gradientBox = gradientBox(direction, [x, y, w, h]);

    var _gradientBox2 = (0, _slicedToArray3.default)(_gradientBox, 4);

    x0 = _gradientBox2[0];
    y0 = _gradientBox2[1];
    x1 = _gradientBox2[2];
    y1 = _gradientBox2[3];
  } else if (vector) {
    var _vector = (0, _slicedToArray3.default)(vector, 4);

    x0 = _vector[0];
    y0 = _vector[1];
    x1 = _vector[2];
    y1 = _vector[3];
  }

  var gradient = context.createLinearGradient(x0, y0, x1, y1);

  colors.forEach(function (o) {
    gradient.addColorStop(o.offset, o.color);
  });

  return gradient;
}

function createRadialGradient(context, rect, linearGradients) {
  // TODO
  return null;
}