"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateSenha = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let UpdateSenha = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateSenha {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    membro,
    senha
  }) {
    const find = await this.userRepository.findByMembro(membro);

    if (!find) {
      throw new _AppError.Err('Membro nao encontrado');
    }

    const has = await (0, _bcryptjs.hash)(senha, 8);
    const data = {
      nome: find.nome,
      membro,
      senha: has,
      adm: find.adm
    };
    const user = await this.userRepository.updateUser(data, find.id);
    return user;
  }

}) || _class) || _class) || _class) || _class);
exports.UpdateSenha = UpdateSenha;