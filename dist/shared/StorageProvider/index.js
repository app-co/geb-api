"use strict";

var _upload = _interopRequireDefault(require("../../config/upload"));

var _tsyringe = require("tsyringe");

var _DiskStorageProvider = require("./implementations/DiskStorageProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  disk: _DiskStorageProvider.DiskStorageProvider,
  s3: _DiskStorageProvider.DiskStorageProvider
};

_tsyringe.container.registerInstance('StorageProvider', new providers[_upload.default.driver]());