import upload from '@config/upload';
import { container } from 'tsyringe';

import { DiskStorageProvider } from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProviders';

const providers = {
   disk: DiskStorageProvider,
   s3: DiskStorageProvider,
};

container.registerInstance<IStorageProvider>(
   'StorageProvider',
   new providers[upload.driver](),
);
