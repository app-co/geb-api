"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLinks = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _ILinksRepository = require("../repositories/IRepository/ILinksRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createLinks = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('Link')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ILinksRepository.ILinksRepository === "undefined" ? Object : _ILinksRepository.ILinksRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class createLinks {
  constructor(repoLinks, cache) {
    this.repoLinks = repoLinks;
    this.cache = cache;
  }

  async create({
    nome,
    link,
    fk_user_id
  }) {
    const find = await this.repoLinks.findByName(nome);

    if (find) {
      throw new _AppError.Err('Você já tem esse link');
    }

    const create = await this.repoLinks.create({
      nome,
      link,
      fk_user_id
    });
    await this.cache.invalidate('users');
    await this.cache.invalidate('links');
    return create;
  }

  async listMany(fk_user_id) {
    let list = await this.cache.recover('links');

    if (!list) {
      list = await this.repoLinks.listByUser(fk_user_id);
      await this.cache.save(`links`, list);
      console.log('banco list all links');
    }

    return list;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.createLinks = createLinks;