"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.make = make;
var _redisProvider = _interopRequireDefault(require("../../shared/implementations/redis/redis-provider"));
var _service = require("../user/service");
var _service2 = require("./service");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function make() {
  const redis = new _redisProvider.default();
  const user = new _service.UserService(redis);
  const sv = new _service2.RelationshipService(redis, user);
  return sv;
}