"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateConvidadoService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IConvidadoPrisma = require("../repositories/IConvidadoPrisma");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateConvidadoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaConvidado')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IConvidadoPrisma.IConvidadoPrisma === "undefined" ? Object : _IConvidadoPrisma.IConvidadoPrisma, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateConvidadoService {
  constructor(convidadoRepo, cache) {
    this.convidadoRepo = convidadoRepo;
    this.cache = cache;
  }

  async exec(id, approved) {
    const up = await this.convidadoRepo.update(id, approved);
    await this.cache.invalidate('convidado');
    return up;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateConvidadoService = UpdateConvidadoService;