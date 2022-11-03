"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindProfile = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let FindProfile = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindProfile {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    user_id
  }) {
    const findId = await this.userRepository.findProfileByUserId(user_id);

    if (!findId) {
      throw new _AppError.Err('profile nao encontrado');
    }

    return findId;
  }

}) || _class) || _class) || _class) || _class);
exports.FindProfile = FindProfile;