"use strict";

var _B2bRepository = require("../../modules/B2b/repositories/B2bRepository");

var _prisma = require("../../modules/convidado/repositories/prisma");

var _IndicationRepository = require("../../modules/indication/infra/repositories/IndicationRepository");

var _LinksPrismaRepository = require("../../modules/Links/repositories/models/LinksPrismaRepository");

var _PostRepository = require("../../modules/posts/repositories/PostRepository");

var _prisma2 = require("../../modules/situation/repositories/prisma");

var _prisma3 = require("../../modules/starts/repositories/prisma");

var _UsersRespository = require("../../modules/users/repositories/UsersRespository");

var _S3Storage = require("../StorageProvider/implementations/S3Storage");

var _tsyringe = require("tsyringe");

var _ConsumoRepository = require("../../modules/consumo/repositories/ConsumoRepository");

var _PresençaRepository = require("../../modules/presensa/repositories/Presen\xE7aRepository");

var _TransactionRepository = require("../../modules/transaction/repositories/TransactionRepository");

var _RedisCachProvider = _interopRequireDefault(require("./providers/implementations/RedisCachProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };
const prividers = {
  redis: _RedisCachProvider.default
};

_tsyringe.container.registerSingleton('Cache', prividers.redis);

_tsyringe.container.registerSingleton('PrismaUser', _UsersRespository.UsersRespository);

_tsyringe.container.registerSingleton('PrismaPost', _PostRepository.PostRepository);

_tsyringe.container.registerSingleton('PrismaConsumo', _ConsumoRepository.ConsumoRepository);

_tsyringe.container.registerSingleton('PrismaTransaction', _TransactionRepository.TransactionRepository);

_tsyringe.container.registerSingleton('Storage', _S3Storage.S3Storage);

_tsyringe.container.registerSingleton('Presenca', _PresençaRepository.PresencaRepository);

_tsyringe.container.registerSingleton('PrismaB2b', _B2bRepository.B2bRepository);

_tsyringe.container.registerSingleton('PrismaIndication', _IndicationRepository.IndicationRepository);

_tsyringe.container.registerSingleton('PrismaStar', _prisma3.StarPrisma);

_tsyringe.container.registerSingleton('PrismaConvidado', _prisma.ConvidadoPrisma);

_tsyringe.container.registerSingleton('PrismaSituation', _prisma2.SituationPrisma);

_tsyringe.container.registerSingleton('Link', _LinksPrismaRepository.LinksPrismaRepository);