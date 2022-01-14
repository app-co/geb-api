"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserService = void 0;

var _AppError = require("../../../shared/*/errors/AppError");

var _tsyringe = require("tsyringe");

var _client = require(".prisma/client");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let DeleteUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(membro) {
    const find = await this.userRepository.findByMembro(membro);

    if (!find) {
      throw new _AppError.Err('Usuário não encontrado');
    }

    if (!find.adm) {
      throw new _AppError.Err('Vocẽ nao é um user ADM');
    }

    const {
      user
    } = new _client.PrismaClient();
    await user.delete({
      where: {
        membro
      }
    });
    return {
      message: 'user deletado'
    };
  }

}) || _class) || _class) || _class) || _class);
exports.DeleteUserService = DeleteUserService;