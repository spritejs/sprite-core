"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("./attr");

var flexLayout = _interopRequireWildcard(require("./flex"));

var _group = _interopRequireDefault(require("../../core/group"));

_group.default.applyLayout('flex', flexLayout);