"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListPresensaService = void 0;

var _tsyringe = require("tsyringe");

var _IPresençaRepository = require("../repositories/IPresen\xE7aRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let ListPresensaService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('Presenca')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPresençaRepository.IPresencaRespository === "undefined" ? Object : _IPresençaRepository.IPresencaRespository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListPresensaService {
  constructor(presencaRepository) {
    this.presencaRepository = presencaRepository;
  }

  async execute(user_id) {
    const liset = await this.presencaRepository.list(user_id);
    return liset;
  }

}) || _class) || _class) || _class) || _class);
exports.ListPresensaService = ListPresensaService;