"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRelationship = makeRelationship;

var _B2bRepository = require("../../../B2b/repositories/B2bRepository");

var _ConsumoRepository = require("../../../consumo/repositories/ConsumoRepository");

var _prisma = require("../../../convidado/repositories/prisma");

var _DonatePrismaRepository = require("../../../Donate/repositories/models/DonatePrismaRepository");

var _IndicationRepository = require("../../../indication/infra/repositories/IndicationRepository");

var _PresençaRepository = require("../../../presensa/repositories/Presen\xE7aRepository");

var _prismaRelationship = require("../../repositories/prisma-relationship");

var _TransactionRepository = require("../../../transaction/repositories/TransactionRepository");

var _UsersRespository = require("../../../users/repositories/UsersRespository");

var _useCaseRelationship = require("../use-case-relationship");

function makeRelationship() {
  const repo = new _prismaRelationship.PrismaRelationship();
  const repoUser = new _UsersRespository.UsersRespository();
  const b2b = new _B2bRepository.B2bRepository();
  const ind = new _IndicationRepository.IndicationRepository();
  const donate = new _DonatePrismaRepository.DonatePrismaRepository();
  const order = new _ConsumoRepository.ConsumoRepository();
  const trans = new _TransactionRepository.TransactionRepository();
  const invit = new _prisma.ConvidadoPrisma();
  const pres = new _PresençaRepository.PresencaRepository();
  const make = new _useCaseRelationship.UseCasesRelationship(repo, repoUser, b2b, ind, donate, order, trans, invit, pres);
  return make;
}