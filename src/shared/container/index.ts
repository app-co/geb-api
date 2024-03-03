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

container.registerSingleton<IStorageProvider>('Storage', S3Storage);

container.registerSingleton<IIndicationRepository>(
   'PrismaIndication',
   IndicationRepository,
);

container.registerSingleton<IStarRepository>('PrismaStar', StarPrisma);

container.registerSingleton<ISituationPrisma>(
   'PrismaSituation',
   SituationPrisma,
);

container.registerSingleton<ILinksRepository>('Link', LinksPrismaRepository);
