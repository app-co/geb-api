"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = void 0;
require("dotenv/config");
var _zod = require("zod");
/* eslint-disable no-underscore-dangle */

const envSche = _zod.z.object({
  NODE_ENV: _zod.z.enum(['dev', 'test', 'prd']).default('dev'),
  PORT: _zod.z.coerce.number().default(3333),
  DATABASE_URL: _zod.z.string(),
  ONE_SIGNAL_KEY: _zod.z.string(),
  ONE_SIGNAL_APP_ID: _zod.z.string(),
  REDIS_HOST: _zod.z.string(),
  REDIS_PORT: _zod.z.coerce.number()
});
const _env = envSche.safeParse(process.env);
if (_env.success === false) {
  console.error('Invalid environment', _env.error.format());
  throw new Error('Invalid environment');
}
const env = exports.env = _env.data;