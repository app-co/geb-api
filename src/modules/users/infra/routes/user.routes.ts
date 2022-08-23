import upload from '@config/upload';
import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';
import multer from 'multer';

import { UserController } from '../controllers/UserController';

const user = Router();
const control = new UserController();

const img = multer(upload);

user.post('/create-user', control.create);
user.post('/session', control.session);

// user.patch('/avatar', img.single('avatar'), control.updateAvatar);
// user.patch('/logo', img.single('logo'), control.updateLogo);
// user.get('/', Auth, control.findAll);
// user.put('/update', Auth, control.update);

// user.get('/find', Auth, control.findUnicUser);
// user.put('/upToken', Auth, control.updateToken);
// user.put('/update-padrinho', Auth, control.updatePadrinho);

// user.put('/update-senha', Auth, control.updateSenhaUser);
// user.delete('/delete/:user_id', Auth, control.deleteUser);

export { user };
