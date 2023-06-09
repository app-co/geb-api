import { B2bRepository } from '@modules/B2b/repositories/B2bRepository';
import { IB2bRepository } from '@modules/B2b/repositories/IB2bRepository';
import { IConvidadoPrisma } from '@modules/convidado/repositories/IConvidadoPrisma';
import { ConvidadoPrisma } from '@modules/convidado/repositories/prisma';
import { IDonateRepository } from '@modules/Donate/repositories/IRepository/IDonateRepository';
import { DonatePrismaRepository } from '@modules/Donate/repositories/models/DonatePrismaRepository';
import { IIndicationRepository } from '@modules/indication/infra/repositories/IIndicationRepository';
import { IndicationRepository } from '@modules/indication/infra/repositories/IndicationRepository';
import { ILinksRepository } from '@modules/Links/repositories/IRepository/ILinksRepository';
import { LinksPrismaRepository } from '@modules/Links/repositories/models/LinksPrismaRepository';
import { IPostsRepository } from '@modules/posts/repositories/IPostRepositoty';
import { PostRepository } from '@modules/posts/repositories/PostRepository';
import { ISituationPrisma } from '@modules/situation/repositories/ISituationPrisma';
import { SituationPrisma } from '@modules/situation/repositories/prisma';
import { IStarRepository } from '@modules/starts/repositories/IStarRespository';
import { StarPrisma } from '@modules/starts/repositories/prisma';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';
import { S3Storage } from '@shared/StorageProvider/implementations/S3Storage';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { container } from 'tsyringe';

import { ConsumoRepository } from '../../modules/consumo/repositories/ConsumoRepository';
import { IConsumoRepository } from '../../modules/consumo/repositories/IConsumoRepository';
import { IPresencaRespository } from '../../modules/presensa/repositories/IPresençaRepository';
import { PresencaRepository } from '../../modules/presensa/repositories/PresençaRepository';
import { ITransactionRepository } from '../../modules/transaction/repositories/ITransactionRespository';
import { TransactionRepository } from '../../modules/transaction/repositories/TransactionRepository';
import RedisCacheProvider from './providers/implementations/RedisCachProvider';
import ICacheProvider from './providers/model/ICacheProvider';

// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };

const prividers = {
   redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('Cache', prividers.redis);

container.registerSingleton<IUsersRepository>('PrismaUser', UsersRespository);
container.registerSingleton<IPostsRepository>('PrismaPost', PostRepository);
container.registerSingleton<IConsumoRepository>(
   'PrismaConsumo',
   ConsumoRepository,
);
container.registerSingleton<ITransactionRepository>(
   'PrismaTransaction',
   TransactionRepository,
);

container.registerSingleton<IStorageProvider>('Storage', S3Storage);

container.registerSingleton<IPresencaRespository>(
   'Presenca',
   PresencaRepository,
);

container.registerSingleton<IB2bRepository>('PrismaB2b', B2bRepository);
container.registerSingleton<IIndicationRepository>(
   'PrismaIndication',
   IndicationRepository,
);

container.registerSingleton<IStarRepository>('PrismaStar', StarPrisma);
container.registerSingleton<IConvidadoPrisma>(
   'PrismaConvidado',
   ConvidadoPrisma,
);

container.registerSingleton<ISituationPrisma>(
   'PrismaSituation',
   SituationPrisma,
);

container.registerSingleton<ILinksRepository>('Link', LinksPrismaRepository);
container.registerSingleton<IDonateRepository>(
   'donate',
   DonatePrismaRepository,
);
