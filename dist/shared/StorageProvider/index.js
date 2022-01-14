"use strict";

var _upload = _interopRequireDefault(require("../../config/*/upload"));

var _tsyringe = require("tsyringe");

var _DiskStorageProvider = _interopRequireDefault(require("./implementations/DiskStorageProvider"));

var _S3Provider = _interopRequireDefault(require("./implementations/S3Provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  disk: _DiskStorageProvider.default,
  s3: _S3Provider.default
};

_tsyringe.container.registerInstance('StorageProvider', new providers[_upload.default.driver]());