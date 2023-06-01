"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateSituationService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _ISituationPrisma = require("../repositories/ISituationPrisma");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateSituationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaSituation')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ISituationPrisma.ISituationPrisma === "undefined" ? Object : _ISituationPrisma.ISituationPrisma, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateSituationService {
  constructor(situationRepo, cache) {
    this.situationRepo = situationRepo;
    this.cache = cache;
  }

  async execute({
    firstLogin,
    apadrinhado,
    fk_id_user,
    logado,
    id,
    inativo
  }) {
    const create = await this.situationRepo.update({
      firstLogin,
      apadrinhado,
      id,
      fk_id_user,
      logado,
      inativo
    });
    await this.cache.invalidate('users');
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateSituationService = UpdateSituationService;