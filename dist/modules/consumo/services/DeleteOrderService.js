"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteOrderService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IConsumoRepository = require("../repositories/IConsumoRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConsumo')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IConsumoRepository.IConsumoRepository === "undefined" ? Object : _IConsumoRepository.IConsumoRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteOrderService {
  constructor(orderRespository, cache) {
    this.orderRespository = orderRespository;
    this.cache = cache;
  }

  async execute({
    id
  }) {
    const user = await this.orderRespository.deleteOrder(id);
    await this.cache.invalidate('orderTransaction');
    await this.cache.invalidatePrefix(`order-transaction-consumidor`);
    await this.cache.invalidatePrefix('order-transaction-prestador');
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.DeleteOrderService = DeleteOrderService;