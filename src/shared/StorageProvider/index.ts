import upload from '@config/upload';
import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StoreageProvider from './implementations/S3Provider';
import IStorageProvider from './models/IStorageProviders';

const providers = {
   disk: DiskStorageProvider,
   s3: S3StoreageProvider,
};

container.registerInstance<IStorageProvider>(
   'StorageProvider',
   new providers[upload.driver](),
);
