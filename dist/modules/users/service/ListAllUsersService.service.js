"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllUserService = void 0;

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListAllUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAllUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    const find = await this.userRepository.findAll();
    const awsUrl = 'https://geb.s3.us-east-2.amazonaws.com';
    const users = find.map(h => ({ ...h,
      logoUrl: h.logotipo ? `${process.env.AWS_URL}/logo/${h.logotipo}` : undefined,
      avatarUrl: h.avatar ? `${process.env.AWS_URL}/avatar/${h.avatar}` : undefined
    }));
    return users;
  }

}) || _class) || _class) || _class) || _class);
exports.ListAllUserService = ListAllUserService;