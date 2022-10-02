"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindTransactionById = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _ITransactionRespository = require("../repositories/ITransactionRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let FindTransactionById = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaTransaction')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ITransactionRespository.ITransactionRepository === "undefined" ? Object : _ITransactionRespository.ITransactionRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindTransactionById {
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute({
    id
  }) {
    const find = await this.transactionRepository.findTransactionById(id);

    if (!find) {
      throw new _AppError.Err('transação nao encontrada');
    }

    return find;
  }

}) || _class) || _class) || _class) || _class);
exports.FindTransactionById = FindTransactionById;