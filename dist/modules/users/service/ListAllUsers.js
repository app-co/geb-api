"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllUser = void 0;

var _IStarRespository = require("../../starts/repositories/IStarRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllUser = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaStar')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _IStarRespository.IStarRepository === "undefined" ? Object : _IStarRespository.IStarRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListAllUser {
  constructor(userRepository, starRepo, cache) {
    this.userRepository = userRepository;
    this.starRepo = starRepo;
    this.cache = cache;
  }

  async execute() {
    let users = await this.cache.recover('users');

    if (!users) {
      users = await this.userRepository.listAllUser();
      await this.cache.save(`users`, users);
      console.log('banco list all users');
    }

    return users;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ListAllUser = ListAllUser;