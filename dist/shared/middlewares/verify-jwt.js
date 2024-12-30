"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = Auth;
/* eslint-disable consistent-return */

async function Auth(req, res) {
  try {
    await req.jwtVerify();
  } catch (err) {
    return res.status(401).send({
      error: 'Seu token expirou, faça o login novamente'
    });
  }
}