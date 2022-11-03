"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindOrderConsumidor = void 0;

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IConsumoRepository = require("../repositories/IConsumoRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FindOrderConsumidor = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConsumo')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IConsumoRepository.IConsumoRepository === "undefined" ? Object : _IConsumoRepository.IConsumoRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class FindOrderConsumidor {
  constructor(consumoRepository, userRepository, cache) {
    this.consumoRepository = consumoRepository;
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute(consumidor_id) {
    let find = await this.cache.recover(`order-transaction-consumidor:${consumidor_id}`);

    if (!find) {
      find = await this.consumoRepository.findOrderConsumidor(consumidor_id);
      await this.cache.save(`order-transaction-consumidor:${consumidor_id}`, find);
    }

    return find;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.FindOrderConsumidor = FindOrderConsumidor;