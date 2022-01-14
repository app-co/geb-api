"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTransactionService = void 0;

var _tsyringe = require("tsyringe");

var _ITransactionRespository = require("../repositories/ITransactionRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateTransactionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaTransaction')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ITransactionRespository.ITransactionRepository === "undefined" ? Object : _ITransactionRespository.ITransactionRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateTransactionService {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute({
    consumidor_id,
    valor,
    descricao,
    prestador_id,
    nome
  }) {
    const create = this.transactionRepository.create({
      consumidor_id,
      prestador_id,
      valor,
      descricao,
      nome
    });
    return create;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateTransactionService = CreateTransactionService;