"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllOrderService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IConsumoRepository = require("../repositories/IConsumoRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConsumo')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IConsumoRepository.IConsumoRepository === "undefined" ? Object : _IConsumoRepository.IConsumoRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListAllOrderService {
  constructor(consumoRepository, cache) {
    this.consumoRepository = consumoRepository;
    this.cache = cache;
  }

  async execute() {
    let find = await this.cache.recover('orderTransaction');

    if (!find) {
      find = await this.consumoRepository.findAllOrder();
      await this.cache.save('orderTransaction', find);
      console.log('passou pelo banco');
    }

    return find;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ListAllOrderService = ListAllOrderService;