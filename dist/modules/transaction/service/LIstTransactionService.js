"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListTransactionService = void 0;

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _tsyringe = require("tsyringe");

var _ITransactionRespository = require("../repositories/ITransactionRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let ListTransactionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaTransaction')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ITransactionRespository.ITransactionRepository === "undefined" ? Object : _ITransactionRespository.ITransactionRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListTransactionService {
  constructor(transactionRepository, userRepository) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
  }

  async execute({
    id
  }) {
    const find = await this.transactionRepository.findByPrestador(id); // const consumidor = await this.userRepository.findById(consumidor_id);
    // if (!consumidor) {
    //    throw new Err('consumidor nao encontrado');
    // }
    // console.log(find);
    // if (!find) {
    //    throw new Err('transação nao encontrada');
    // }

    return find;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ListTransactionService = ListTransactionService;