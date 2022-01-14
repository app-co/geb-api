"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiskStorageProvider = void 0;

var _upload = _interopRequireDefault(require("../../../config/*/upload"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-empty */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
class DiskStorageProvider {
  // TODO SALVAR ARQUIVO
  async saveFile(file, folder) {
    await _fs.default.promises.rename(_path.default.resolve(_upload.default.tmpFolder, file), _path.default.resolve(`${_upload.default.tmpFolder}/${folder}`, file));
    return file;
  } // TODO DELETAR ARQUIVO


  async deleteFile(file, folder) {
    const filename = _path.default.resolve(`${_upload.default.tmpFolder}/${folder}`, file);

    try {
      await _fs.default.promises.stat(filename);
    } catch (error) {}

    await _fs.default.promises.unlink(filename);
  }

}

exports.DiskStorageProvider = DiskStorageProvider;