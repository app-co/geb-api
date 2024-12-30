"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _fastify = _interopRequireDefault(require("fastify"));
var _zod = require("zod");
var _cookie = _interopRequireDefault(require("@fastify/cookie"));
var _jwt = _interopRequireDefault(require("@fastify/jwt"));
var _AppError = require("./shared/app-error/AppError");
var _routes = require("./shared/routes/routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable no-underscore-dangle */

const app = exports.app = (0, _fastify.default)();
app.register(_routes.Routes);
app.register(_jwt.default, {
  secret: 'camaleao',
  cookie: {
    cookieName: 'refresh',
    signed: false
  },
  sign: {
    expiresIn: '30d'
  }
});
app.register(_cookie.default);
app.setErrorHandler((error, request, reply) => {
  console.log(error);
  if (error instanceof _zod.ZodError) {
    return reply.status(409).send({
      error: `Erro de validação: ${error.errors[0].path[0]} ${error.errors[0].message}`
    });
  }
  if (error instanceof _AppError.AppError) {
    return reply.status(error.statusCode).send(error);
  }
  return reply.status(500).send('Internal server error');
});