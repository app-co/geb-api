import upload from '@config/upload';
import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';
import multer from 'multer';

import { UserController } from '../controllers/UserController';

const user = Router();
const control = new UserController();

const img = multer(upload);

user.post('/session', control.session);

user.post('/', control.create);
user.get('/', Auth, control.findAll);
user.put('/update', Auth, control.update);
user.delete('/del', Auth, control.delete);
user.patch('/avatar', Auth, img.single('avatar'), control.updateAvatar);
user.patch('/logo', Auth, img.single('logo'), control.updateLogo);
user.get('/find', Auth, control.findUnicUser);
user.put('/upToken', Auth, control.updateToken);

export { user };
