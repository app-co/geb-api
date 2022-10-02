"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLink = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateLink = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateLink {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    user_id,
    nome,
    link
  }) {
    const user = await this.userRepository.findById(user_id);
    const findLinks = await this.userRepository.findLinkByUserId(user_id);
    const fin = findLinks.find(h => {
      if (h.nome.includes(nome)) {
        return h;
      }
    });

    if (fin) {
      throw new _AppError.Err('Você ja tem um link com o mesmo nome');
    }

    if (!user) {
      throw new _AppError.Err('Usuário não encontrado');
    }

    const create = await this.userRepository.createLink({
      user_id,
      nome,
      link
    });
    return create;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateLink = CreateLink;