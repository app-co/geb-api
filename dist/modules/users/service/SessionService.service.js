"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionService = void 0;

var _auth = _interopRequireDefault(require("../../../config/*/auth"));

var _AppError = require("../../../shared/*/errors/AppError");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SessionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class SessionService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    membro,
    senha
  }) {
    const findUser = await this.userRepository.findByMembro(membro);

    if (!findUser) {
      throw new _AppError.Err('usuario nao encontrado');
    }

    const compareHash = await (0, _bcryptjs.compare)(senha, findUser.senha);

    if (!compareHash) {
      throw new _AppError.Err('senha invalida');
    }

    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: findUser.id,
      expiresIn
    });
    const awsUrl = process.env.AWS_URL;
    const avatar_url = `${awsUrl}avatar/${findUser.avatar}`;
    const logo_url = `${awsUrl}logo/${findUser.logotipo}`;
    const [nome, sobrenome] = findUser.nome.split(' ').map(String);
    const user = {
      user: {
        id: findUser.id,
        nome,
        workName: findUser.workName,
        avatar: findUser.avatar,
        avatar_url,
        logo: findUser.logotipo,
        logo_url,
        adm: findUser.adm
      },
      token
    };
    return user;
  }

}) || _class) || _class) || _class) || _class);
exports.SessionService = SessionService;