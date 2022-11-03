"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S3Storage = void 0;

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _awsSdk = require("aws-sdk");

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class S3Storage {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.S3({
      region: 'sa-east-1'
    });
  }

  async saveFile(file, folder) {
    const originalName = (0, _path.resolve)(_upload.default.tmpFolder, file);
    const fileContent = await _fs.default.promises.readFile(originalName);

    const ContentType = _mime.default.getType(originalName);

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();
    await _fs.default.promises.unlink(originalName);
    return file;
  }

  async deleteFile(file, folder) {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file
    }).promise();
  }

}

exports.S3Storage = S3Storage;