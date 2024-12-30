"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppError = void 0;
class AppError {
  constructor(error, statusCode = 409) {
    this.error = void 0;
    this.statusCode = void 0;
    this.error = error;
    this.statusCode = statusCode;
  }
}
exports.AppError = AppError;