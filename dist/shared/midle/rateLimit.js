"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _AppError = require("../errors/AppError");

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _redis = _interopRequireDefault(require("redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1
});

async function rateLimiter(req, res, next) {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new _AppError.Err('Muitas requisições', 429);
  }
}