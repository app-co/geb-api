"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteIndicationService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IIndicationRepository = require("../repositories/IIndicationRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteIndicationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaIndication')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IIndicationRepository.IIndicationRepository === "undefined" ? Object : _IIndicationRepository.IIndicationRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteIndicationService {
  constructor(indRepository, cache) {
    this.indRepository = indRepository;
    this.cache = cache;
  }

  async execute(id) {
    const find = await this.indRepository.findById(id);

    if (!find) {
      throw new _AppError.Err('indicação não encontrada');
    }

    const del = await this.indRepository.delete(id);
    await this.cache.invalidate(`indication`);
    await this.cache.invalidatePrefix(`indication-indicado`);
    await this.cache.invalidatePrefix('indiQuem');
    return del;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.DeleteIndicationService = DeleteIndicationService;