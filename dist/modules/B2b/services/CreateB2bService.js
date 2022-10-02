"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateB2b = void 0;

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IB2bRepository = require("../repositories/IB2bRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateB2b = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaB2b')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IB2bRepository.IB2bRepository === "undefined" ? Object : _IB2bRepository.IB2bRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateB2b {
  constructor(b2bRepository, userRepository, cache) {
    this.b2bRepository = b2bRepository;
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute({
    send_id,
    recevid_id,
    send_name,
    recevid_name,
    appointment,
    assunto,
    validate
  }) {
    const sendUser = await this.userRepository.findById(send_id);
    const recevidUser = await this.userRepository.findById(recevid_id); // if (!sendUser) {
    //    throw new Err('usuário não encontrado');
    // }
    // if (!recevidUser) {
    //    throw new Err('usuário não encontrado');
    // }
    // if (sendUser.id === recevid_id) {
    //    throw new Err('você não pode fazer b2b com você mesmo');
    // }

    const create = await this.b2bRepository.create({
      send_id,
      send_name,
      recevid_id,
      recevid_name,
      appointment,
      validate,
      assunto
    });
    await this.cache.invalidate('b2b');
    await this.cache.invalidatePrefix('b2bSend');
    await this.cache.invalidatePrefix('b2bReci');
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateB2b = CreateB2b;