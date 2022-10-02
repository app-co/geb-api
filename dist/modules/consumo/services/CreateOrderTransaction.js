"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrderTransaction = void 0;

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IConsumoRepository = require("../repositories/IConsumoRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateOrderTransaction = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConsumo')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IConsumoRepository.IConsumoRepository === "undefined" ? Object : _IConsumoRepository.IConsumoRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateOrderTransaction {
  constructor(consumoRepository, userRepository, cache) {
    this.consumoRepository = consumoRepository;
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute({
    prestador_id,
    valor,
    descricao,
    consumidor_id,
    prestador_name,
    consumidor_name
  }) {
    const findUser = await this.userRepository.findById(consumidor_id);
    const findPrestaor = await this.userRepository.findById(prestador_id); // if (!findPrestaor) {
    //    throw new Err('Prestador não encontrado');
    // }
    // if (!findUser) {
    //    throw new Err('Consumidor não encontrado');
    // }
    // if (findUser.id === prestador_id) {
    //    throw new Err('Você nao pode realizar uma orderm para você mesmo');
    // }

    const consumo = await this.consumoRepository.create({
      consumidor_name,
      consumidor_id,
      prestador_name,
      prestador_id,
      descricao,
      valor
    });
    await this.cache.invalidate('orderTransaction');
    await this.cache.invalidatePrefix(`order-transaction-consumidor`);
    await this.cache.invalidatePrefix('order-transaction-prestador');
    return consumo;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateOrderTransaction = CreateOrderTransaction;