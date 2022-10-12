"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateIndicationService = void 0;

var _IUsersRespository = require("../../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IIndicationRepository = require("../repositories/IIndicationRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ValidateIndicationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaIndication')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IIndicationRepository.IIndicationRepository === "undefined" ? Object : _IIndicationRepository.IIndicationRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ValidateIndicationService {
  constructor(indicationRepo, userRepository, cache) {
    this.indicationRepo = indicationRepo;
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute({
    indicado_id,
    indication_id
  }) {
    const find = await this.indicationRepo.findById(indication_id);

    if (!find) {
      throw new _AppError.Err('Indicação não encontrada');
    }

    if (find.indicado_id !== indicado_id) {
      throw new _AppError.Err('você não tem atorização para validar');
    }

    if (find.validate === true) {
      throw new _AppError.Err('Indicação ja validada');
    }

    const up = await this.indicationRepo.validate(find.id);
    await this.cache.invalidate(`indication`);
    await this.cache.invalidatePrefix(`indication-indicado`);
    await this.cache.invalidatePrefix('indiQuem');
    await this.cache.invalidatePrefix('individualPonts');
    return up;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ValidateIndicationService = ValidateIndicationService;