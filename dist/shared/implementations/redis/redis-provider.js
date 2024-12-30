"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ioredis = _interopRequireDefault(require("ioredis"));
var _env = require("../../../env");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable prettier/prettier */

const options = {
  host: _env.env.REDIS_HOST,
  port: Number(_env.env.REDIS_PORT)
};
class RedisCacheProvider {
  constructor() {
    this.client = void 0;
    this.client = new _ioredis.default(options);
  }
  async save(key, value) {
    await this.client.set(key, JSON.stringify(value));
  }
  async recover(key) {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const parseData = JSON.parse(data);
    return parseData;
  }
  async removeAll() {
    await this.client.flushall();
  }
  async invalidate(key) {
    await this.client.del(key);
  }
  async invalidatePrefix(prefix) {
    const keys = await this.client.keys(`${prefix}:*`);
    const pipeline = this.client.pipeline();
    keys.forEach(key => {
      pipeline.del(key);
    });
    await pipeline.exec();
  }
}
exports.default = RedisCacheProvider;