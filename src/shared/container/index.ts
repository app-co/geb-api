import { B2bRepository } from '@modules/B2b/repositories/B2bRepository';
import { IB2bRepository } from '@modules/B2b/repositories/IB2bRepository';
import { IIndicationRepository } from '@modules/indication/infra/repositories/IIndicationRepository';
import { IndicationRepository } from '@modules/indication/infra/repositories/IndicationRepository';
import { IPostsRepository } from '@modules/posts/repositories/IPostRepositoty';
import { PostRepository } from '@modules/posts/repositories/PostRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';
import { DiskStorageProvider } from '@shared/StorageProvider/implementations/DiskStorageProvider';
import { S3Storage } from '@shared/StorageProvider/implementations/S3Storage';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { container } from 'tsyringe';

import { ConsumoRepository } from '../../modules/consumo/repositories/ConsumoRepository';
import { IConsumoRepository } from '../../modules/consumo/repositories/IConsumoRepository';
import { IPresencaRespository } from '../../modules/presensa/repositories/IPresençaRepository';
import { PresencaRepository } from '../../modules/presensa/repositories/PresençaRepository';
import { ITransactionRepository } from '../../modules/transaction/repositories/ITransactionRespository';
import { TransactionRepository } from '../../modules/transaction/repositories/TransactionRepository';

// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };

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
