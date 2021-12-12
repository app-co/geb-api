/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import upload from '@config/upload';
import fs from 'fs';
import path from 'path';

import IStorageProvider from '../models/IStorageProviders';

export class DiskStorageProvider implements IStorageProvider {
   // TODO SALVAR ARQUIVO
   async saveFile(file: string, folder: string): Promise<string> {
      await fs.promises.rename(
         path.resolve(upload.tmpFolder, file),
         path.resolve(`${upload.tmpFolder}/${folder}`, file),
      );

      return file;
   }

   // TODO DELETAR ARQUIVO
   async deleteFile(file: string, folder: string): Promise<void> {
      const filename = path.resolve(`${upload.tmpFolder}/${folder}`, file);

      try {
         await fs.promises.stat(filename);
      } catch (error) {}
      await fs.promises.unlink(filename);
   }
}
