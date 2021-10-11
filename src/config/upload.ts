import crypt from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadsConfg {
   driver: 's3' | 'disk';
   tmpFolder: string;
   UploadFolder: string;

   multer: {
      storage: StorageEngine;
   };

   config: {
      disk: {
         storage: {};
      };
      aws: {
         bucket: string;
      };
   };
}
export default {
   driver: process.env.STORAGE_DRIVER,

   tmpFolder,
   UploadFolder: path.resolve(tmpFolder, 'uploads'),

   multer: {
      storage: multer.diskStorage({
         destination: tmpFolder,
         filename(request, file, callback) {
            const fileHash = crypt.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
         },
      }),
   },

   config: {
      disk: {},
      aws: {
         bucket: process.env.AWS_BUCKET,
      },
   },
} as IUploadsConfg;
