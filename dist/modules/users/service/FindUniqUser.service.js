"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUniqUser = void 0;

var _AppError = require("../../../shared/*/errors/AppError");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let FindUniqUser = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindUniqUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    id
  }) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new _AppError.Err('usuario nao encontrado');
    }

    const awsUrl = process.env.AWS_URL;
    const links = user.links.map(h => {
      return {
        nome: 'whats',
        link: h
      };
    });
    const users = { ...user,
      avatarUrl: `${awsUrl}/avatar/${user.avatar}`,
      logoUrl: `${awsUrl}/logo/${user.logotipo}`
    };
    return users;
  }

}) || _class) || _class) || _class) || _class);
exports.FindUniqUser = FindUniqUser;