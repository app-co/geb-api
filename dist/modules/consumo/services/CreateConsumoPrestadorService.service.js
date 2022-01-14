"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateConsumoPrestadorService = void 0;

var _tsyringe = require("tsyringe");

var _IConsumoRepository = require("../repositories/IConsumoRepository");

var _dec, _dec2, _dec3, _dec4, _class;

// interface Props {
//    prestador_id: string;
//    consumidor_id: string;
//    valor: string;
//    type: string;
// }
let CreateConsumoPrestadorService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConsumo')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IConsumoRepository.IConsumoRepository === "undefined" ? Object : _IConsumoRepository.IConsumoRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateConsumoPrestadorService {
  constructor(consumoRepository) {
    this.consumoRepository = consumoRepository;
  }

  async execute(data) {
    const consumo = await this.consumoRepository.create({
      type: data.type,
      prestador_id: data.prestador_id,
      descricao: data.descricao,
      valor: data.valor
    });
    return consumo;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateConsumoPrestadorService = CreateConsumoPrestadorService;