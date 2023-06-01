"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateStar = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IStarRespository = require("../repositories/IStarRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateStar = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaStar')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IStarRespository.IStarRepository === "undefined" ? Object : _IStarRespository.IStarRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateStar {
  constructor(starRepo, cache) {
    this.starRepo = starRepo;
    this.cache = cache;
  }

  async execute({
    fk_id_user,
    star,
    valiador
  }) {
    const create = await this.starRepo.create({
      fk_id_user,
      star,
      valiador
    });
    await this.cache.invalidate('users');
    await this.cache.invalidatePrefix(`individualPonts`);
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateStar = CreateStar;