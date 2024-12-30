"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRedis = makeRedis;
var _redisProvider = _interopRequireDefault(require("./redis-provider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function makeRedis() {
  return new _redisProvider.default();
}