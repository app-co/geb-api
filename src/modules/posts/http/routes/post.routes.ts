import upload from '@config/upload';
import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';
import multer from 'multer';

import { PostController } from '../controller/PostController';

const post = Router();
const controller = new PostController();
const postUpload = multer(upload);

post.use(Auth);

post.post('/', controller.create);
post.post('/like', controller.like);
post.get('/', controller.listAllPosts);

export { post };
