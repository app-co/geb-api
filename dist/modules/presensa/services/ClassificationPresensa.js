"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClassificationPresensa = void 0;

var _IUsersRespository = require("../../*/users/repositories/IUsersRespository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let ClassificationPresensa = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ClassificationPresensa {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    const list = await this.userRepository.findAll();
    return list;
  }

}) || _class) || _class) || _class) || _class);
exports.ClassificationPresensa = ClassificationPresensa;