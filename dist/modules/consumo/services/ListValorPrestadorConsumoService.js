"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListValorPrestadorConsumoService = void 0;

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _AppError = require("../../../shared/errors/AppError");

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _IConsumoRepository = require("../repositories/IConsumoRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let ListValorPrestadorConsumoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConsumo')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IConsumoRepository.IConsumoRepository === "undefined" ? Object : _IConsumoRepository.IConsumoRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListValorPrestadorConsumoService {
  constructor(consumoRepository, userRepository) {
    this.consumoRepository = consumoRepository;
    this.userRepository = userRepository;
  }

  async execute() {
    const findConsumo = await this.consumoRepository.listAll();
    const finAllUser = await this.userRepository.findAll();

    if (!findConsumo) {
      throw new _AppError.Err('nenhum consumo disponivel');
    }

    const data = finAllUser.map(user => {
      const filtroConsumo = findConsumo.filter(h => {
        if (h.presstador_id === user.id) {
          return h;
        }
      });
      const filtroData = filtroConsumo.find(h => h.presstador_id === user.id);
      const dataF = filtroData === null || filtroData === void 0 ? void 0 : filtroData.created_at;
      const valor = filtroConsumo.reduce((acc, item) => {
        return acc + Number(item.valor);
      }, 0);
      return {
        id: user.id,
        nome: user.nome,
        workName: user.workName,
        total: valor,
        data: dataF
      };
    });
    data.sort(function (a, b) {
      return Number(b.total) - Number(a.total);
    });
    const consumo = data.map(h => {
      if (!h.data) {
        return;
      }

      const dataFormatad = (0, _dateFns.format)(new Date(h.data), 'dd/MM/yyyy');
      return { ...h,
        data: dataFormatad
      };
    });
    const nu = consumo.filter(h => {
      return h !== undefined;
    });
    return nu;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ListValorPrestadorConsumoService = ListValorPrestadorConsumoService;