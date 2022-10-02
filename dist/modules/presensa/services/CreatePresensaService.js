"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePresencaService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IPresençaRepository = require("../repositories/IPresen\xE7aRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePresencaService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('Presenca')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPresençaRepository.IPresencaRespository === "undefined" ? Object : _IPresençaRepository.IPresencaRespository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreatePresencaService {
  constructor(presencaRepository, cache) {
    this.presencaRepository = presencaRepository;
    this.cache = cache;
  }

  async execute({
    user_id,
    nome,
    presenca
  }) {
    const find = await this.presencaRepository.listOrderWithUserId(user_id);

    if (!find) {
      throw new _AppError.Err('Não há orderm de presença para validar');
    }

    if (find) {
      await this.presencaRepository.deleteOrderPresenca(find.id);
    }

    const create = await this.presencaRepository.create({
      user_id,
      nome,
      presenca
    });
    await this.cache.invalidate('orderPresenca');
    await this.cache.invalidatePrefix('orderPresenca');
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreatePresencaService = CreatePresencaService;