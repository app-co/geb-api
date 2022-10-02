"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = Auth;

var _auth = _interopRequireDefault(require("../../config/auth"));

var _AppError = require("../errors/AppError");

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function Auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new _AppError.Err('falta o token');
  }

  const [, token] = authHeader.split(' ');

  try {
    const {
      secret
    } = _auth.default.jwt;
    const decode = (0, _jsonwebtoken.verify)(token, secret);
    const {
      sub
    } = decode;
    req.user = {
      id: sub
    };
    return next();
  } catch (err) {
    throw new _AppError.Err('token invalido');
  }
}