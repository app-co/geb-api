"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rolesMeddle = rolesMeddle;
/* eslint-disable consistent-return */

function rolesMeddle(roleType) {
  return (req, res) => {
    const {
      role
    } = req.user;
    if (role !== roleType) {
      return res.status(401).send({
        message: 'Apenas admin podem acessar essa rota'
      });
    }
  };
}