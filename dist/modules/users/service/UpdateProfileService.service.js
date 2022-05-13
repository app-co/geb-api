"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateProfileService = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let UpdateProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateProfileService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    nome,
    membro,
    whats,
    workName,
    CNPJ,
    CPF,
    email,
    links,
    ramo,
    enquadramento,
    adm,
    id
  }) {
    const findMembro = await this.userRepository.findByMembro(membro);
    const findId = await this.userRepository.findById(id);

    if (findMembro && (findId === null || findId === void 0 ? void 0 : findId.membro) !== membro) {
      throw new _AppError.Err('Esse membro já está cadastrado');
    }

    const user = await this.userRepository.update({
      nome,
      membro,
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      links,
      ramo,
      enquadramento,
      adm
    }, id);
    return user;
  }

}) || _class) || _class) || _class) || _class);
exports.UpdateProfileService = UpdateProfileService;