"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProfi = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateProfi = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateProfi {
  constructor(userRepository, cache) {
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute({
    fk_id_user,
    whats,
    workName,
    CNPJ,
    CPF,
    email,
    ramo,
    enquadramento,
    logo,
    avatar
  }) {
    console.log(fk_id_user);
    const user = await this.userRepository.findById(fk_id_user);
    const profile = await this.userRepository.findByIdProfile(fk_id_user);

    if (profile) {
      throw new _AppError.Err('profile ja criado');
    }

    if (!user) {
      throw new _AppError.Err('Usuário não encontrado');
    }

    const create = await this.userRepository.createProfile({
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      enquadramento,
      ramo,
      fk_id_user,
      logo,
      avatar
    });
    await this.cache.invalidate('users');
    await this.cache.invalidate('profile');
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateProfi = CreateProfi;