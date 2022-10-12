"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateOrderTransactionService = void 0;

var _IConsumoRepository = require("../../consumo/repositories/IConsumoRepository");

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _ITransactionRespository = require("../repositories/ITransactionRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ValidateOrderTransactionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaTransaction')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConsumo')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _ITransactionRespository.ITransactionRepository === "undefined" ? Object : _ITransactionRespository.ITransactionRepository, typeof _IConsumoRepository.IConsumoRepository === "undefined" ? Object : _IConsumoRepository.IConsumoRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class ValidateOrderTransactionService {
  constructor(transactionRepository, orderRepository, userRepository, cache) {
    this.transactionRepository = transactionRepository;
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute({
    consumidor_id,
    consumidor_name,
    descricao,
    prestador_id,
    prestador_name,
    valor,
    order_id,
    user_id
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.Err('Prestador não encontrado');
    }

    let dados = {
      consumidor_id,
      consumidor_name,
      prestador_name,
      prestador_id,
      valor,
      descricao
    };

    if (order_id) {
      const findP = await this.orderRepository.findOrderById(order_id);

      if (!findP) {
        throw new _AppError.Err('Ordem não encontrada');
      }

      if (user.id !== findP.prestador_id) {
        throw new _AppError.Err('Você não tem acesso a essa order', 401);
      }

      dados = findP;
      await this.orderRepository.deleteOrder(findP.id);
    }

    const create = this.transactionRepository.create(dados);
    await this.cache.invalidate('transaction');
    await this.cache.invalidatePrefix('transaction-prestador');
    await this.cache.invalidatePrefix('transaction-consumidor');
    await this.cache.invalidate('orderTransaction');
    await this.cache.invalidatePrefix(`order-transaction-consumidor`);
    await this.cache.invalidatePrefix('order-transaction-prestador');
    await this.cache.invalidatePrefix(`individualPonts`);
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ValidateOrderTransactionService = ValidateOrderTransactionService;