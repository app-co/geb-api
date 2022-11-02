/* eslint-disable @typescript-eslint/no-non-null-assertion */
import upload from '@config/upload';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { S3 } from 'aws-sdk';
import fs from 'fs';
import mine from 'mime';
import { resolve } from 'path';

export class S3Storage implements IStorageProvider {
   private client: S3;

   constructor() {
      this.client = new S3({
         region: 'sa-east-1',
      });
   }

   async saveFile(file: string, folder: string): Promise<string> {
      const originalName = resolve(upload.tmpFolder, file);
      const fileContent = await fs.promises.readFile(originalName);

      const ContentType = mine.getType(originalName)!;

      await this.client
         .putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType,
         })
         .promise();

      await fs.promises.unlink(originalName);

      return file;
   }

   async deleteFile(file: string, folder: string): Promise<void> {
      await this.client
         .deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
         })
         .promise();
   }
}
