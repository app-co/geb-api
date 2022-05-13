"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListConsumoService = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IConsumoRepository = require("../repositories/IConsumoRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListConsumoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConsumo')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IConsumoRepository.IConsumoRepository === "undefined" ? Object : _IConsumoRepository.IConsumoRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListConsumoService {
  constructor(consumoRepository) {
    this.consumoRepository = consumoRepository;
  }

  async execute() {
    const findConsumidor = await this.consumoRepository.listAll();

    if (!findConsumidor) {
      throw new _AppError.Err('nenhum consumo disponivel');
    }

    return findConsumidor;
  }

}) || _class) || _class) || _class) || _class);
exports.ListConsumoService = ListConsumoService;