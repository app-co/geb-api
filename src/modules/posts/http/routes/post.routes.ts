import upload from '@config/upload';
import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';
import multer from 'multer';

import { PostController } from '../controller/PostController';

const post = Router();
const controller = new PostController();
const postUpload = multer(upload);

post.patch('/', Auth, postUpload.single('image'), controller.create);
post.patch('/like/:image_id', controller.like);
post.get('/', controller.listAllPosts);

export { post };
