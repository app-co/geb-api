"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePresencaService = void 0;

var _AppError = require("../../../shared/*/errors/AppError");

var _tsyringe = require("tsyringe");

var _IPresençaRepository = require("../repositories/IPresen\xE7aRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreatePresencaService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('Presenca')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPresençaRepository.IPresencaRespository === "undefined" ? Object : _IPresençaRepository.IPresencaRespository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatePresencaService {
  constructor(presencaRepository) {
    this.presencaRepository = presencaRepository;
  }

  async execute({
    user_id
  }) {
    const find = await this.presencaRepository.list(user_id);
    const created = find.find(h => {
      const dataN = new Date(Date.now()).getHours();
      const dataCreatd = h.createdAt.getHours();

      if (dataCreatd === dataN) {
        return h;
      }
    });

    if (created) {
      throw new _AppError.Err('Você ja enviou uma solicitaçao de presença');
    }

    const create = await this.presencaRepository.create({
      user_id
    });
    return create;
  }

}) || _class) || _class) || _class) || _class);
exports.CreatePresencaService = CreatePresencaService;