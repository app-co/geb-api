"use strict";

var _PostRepository = require("../../modules/*/posts/repositories/PostRepository");

var _UsersRespository = require("../../modules/*/users/repositories/UsersRespository");

var _S3Storage = require("../*/StorageProvider/implementations/S3Storage");

var _tsyringe = require("tsyringe");

var _ConsumoRepository = require("../../modules/consumo/repositories/ConsumoRepository");

var _PresençaRepository = require("../../modules/presensa/repositories/Presen\xE7aRepository");

var _TransactionRepository = require("../../modules/transaction/repositories/TransactionRepository");

// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };
_tsyringe.container.registerSingleton('PrismaUser', _UsersRespository.UsersRespository);

_tsyringe.container.registerSingleton('PrismaPost', _PostRepository.PostRepository);

_tsyringe.container.registerSingleton('PrismaConsumo', _ConsumoRepository.ConsumoRepository);

_tsyringe.container.registerSingleton('PrismaTransaction', _TransactionRepository.TransactionRepository);

_tsyringe.container.registerSingleton('Storage', _S3Storage.S3Storage);

_tsyringe.container.registerSingleton('Presenca', _PresençaRepository.PresencaRepository);