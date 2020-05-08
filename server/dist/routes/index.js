"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();
/* GET home page. */


router.get('/', function (req, res, next) {
  res.send('Welcome to meter reading software, User postman colletion to test API till React app is not available');
});
var _default = router;
exports["default"] = _default;