"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _Auth = require("../../../../shared/midle/Auth");

var _csvParse = require("csv-parse");

var _express = require("express");

var _fs = _interopRequireDefault(require("fs"));

var _multer = _interopRequireDefault(require("multer"));

var _PostController = require("../controller/PostController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const post = (0, _express.Router)();
exports.post = post;
const controller = new _PostController.PostController();
const postUpload = (0, _multer.default)(_upload.default);
const up = (0, _multer.default)({
  dest: './tmp'
});
post.post('/csv', up.single('csv'), (req, res) => {
  const {
    file
  } = req;
  return new Promise((resolve, reject) => {
    const dt = [];

    const stream = _fs.default.createReadStream(file.path);

    const parseFile = (0, _csvParse.parse)({
      delimiter: ';'
    });
    stream.pipe(parseFile);
    parseFile.on('data', line => {
      const [Nota, Dt_programação, MO, cidade, TLE] = line;
      dt.push({
        Nota,
        Dt_programação,
        MO,
        cidade,
        TLE
      });
    }).on('end', () => {
      resolve(res.json(dt));
    }).on('error', err => {
      reject(err);
    });
  });
});
post.post('/csv-estera', up.single('csv'), (req, res) => {
  const dt = [];
  const {
    file
  } = req;
  return new Promise((resolve, reject) => {
    const stream = _fs.default.createReadStream(file.path);

    const parseFile = (0, _csvParse.parse)({
      delimiter: ';'
    });
    stream.pipe(parseFile);
    parseFile.on('data', line => {
      const [Nota, Tipo, Descricao_da_nota, TAM, Depart, Divisão, Bop, Cidade, Distribuidora, Fábrica, Status, Código, Texto_cod_medida, Texto_das_medidas, Dt_Criação, Dt_programação, Local_inst, Lati, Long, Alimentador, Conjunto_elétrico, Qtde_clientes, CHI_max, Obra_livre, Nota_pai, Possui_DI, Num_DI, Possui_viab, Data_viab, Dt_Empreita, Mês_empreita, Ano_empreita, Km, MO, CAPEX, equipe] = line;
      dt.push({
        Nota,
        Tipo,
        Descricao_da_nota,
        TAM,
        Depart,
        Divisão,
        Bop,
        cidade: Cidade,
        Distribuidora,
        Fábrica,
        Status,
        Código,
        Texto_cod_medida,
        TLE: Texto_das_medidas,
        Dt_Criação,
        Dt_programação,
        Local_inst,
        Lati,
        Long,
        Alimentador,
        Conjunto_elétrico,
        Qtde_clientes,
        CHI_max,
        Obra_livre,
        Nota_pai,
        Possui_DI,
        Num_DI,
        Possui_viab,
        Data_viab,
        Dt_Empreita,
        Mês_empreita,
        Ano_empreita,
        Km,
        MO,
        CAPEX,
        equipe
      });
    }).on('end', () => {
      resolve(res.json(dt));
    }).on('error', err => {
      reject(err);
    });
  });
});
post.use(_Auth.Auth);
post.post('/', controller.create);
post.post('/like', controller.like);
post.get('/', controller.listAllPosts);