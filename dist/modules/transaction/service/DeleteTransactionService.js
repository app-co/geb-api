"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteTransactionService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _ITransactionRespository = require("../repositories/ITransactionRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteTransactionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaTransaction')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ITransactionRespository.ITransactionRepository === "undefined" ? Object : _ITransactionRespository.ITransactionRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteTransactionService {
  constructor(transactionRepository, cache) {
    this.transactionRepository = transactionRepository;
    this.cache = cache;
  }

  async execute({
    id
  }) {
    const transaction = await this.transactionRepository.findTransactionById(id);

    if (!transaction) {
      throw new _AppError.Err('transação nao encontrada');
    }

    await this.transactionRepository.delete(transaction.id);
    await this.cache.invalidate('transaction');
    await this.cache.invalidatePrefix('transaction-prestador');
    await this.cache.invalidatePrefix('transaction-consumidor');
    await this.cache.invalidate('orderTransaction');
    await this.cache.invalidatePrefix(`order-transaction-consumidor`);
    await this.cache.invalidatePrefix('order-transaction-prestador');
    await this.cache.invalidatePrefix('individualPonts');
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.DeleteTransactionService = DeleteTransactionService;