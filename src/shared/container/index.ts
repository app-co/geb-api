import { IPostsRepository } from '@modules/posts/repositories/IPostRepositoty';
import { PostRepository } from '@modules/posts/repositories/PostRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';
import { DiskStorageProvider } from '@shared/StorageProvider/implementations/DiskStorageProvider';
import { S3Storage } from '@shared/StorageProvider/implementations/S3Storage';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { container } from 'tsyringe';

// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };

container.registerSingleton<IStorageProvider>('StorageProvider', S3Storage);

container.registerSingleton<IUsersRepository>('PrismaUser', UsersRespository);
container.registerSingleton<IPostsRepository>('PrismaPost', PostRepository);
