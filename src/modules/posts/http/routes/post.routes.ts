/* eslint-disable @typescript-eslint/no-non-null-assertion */
import upload from '@config/upload';
import { Auth } from '@shared/midle/Auth';
import { parse } from 'csv-parse';
import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';

import { PostController } from '../controller/PostController';

const post = Router();
const controller = new PostController();
const postUpload = multer(upload);

const up = multer({
   dest: './tmp',
});

post.post('/csv', up.single('csv'), (req, res) => {
   const { file } = req;
   return new Promise((resolve, reject) => {
      const dt: any[] = [];
      const stream = fs.createReadStream(file!.path);
      const parseFile = parse({ delimiter: ';' });

      stream.pipe(parseFile);

      parseFile
         .on('data', line => {
            const [Nota, Dt_programação, MO, cidade, TLE] = line;
            dt.push({
               Nota,
               Dt_programação,
               MO,
               cidade,
               TLE,
            });
         })
         .on('end', () => {
            resolve(res.json(dt));
         })
         .on('error', err => {
            reject(err);
         });
   });
});

post.use(Auth);

post.post('/', controller.create);
post.post('/like', controller.like);
post.get('/', controller.listAllPosts);

export { post };
