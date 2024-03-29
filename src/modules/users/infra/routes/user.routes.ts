import upload from '@config/upload';
import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';
import multer from 'multer';

import { UserController } from '../controllers/UserController';

const user = Router();
const control = new UserController();

const img = multer(upload);

user.post('/update-pass', control.updateSenha);
user.post('/session', control.session);
user.post('/create-user', control.create);
user.post('/refresh-token', control.refreshToken);

user.use(Auth);
user.patch('/update-membro', control.updateMembro);

// user.patch('/avatar', img.single('avatar'), control.updateAvatar);
// user.patch('/logo', img.single('logo'), control.updateLogo);
user.get('/list-all-user/:hub', control.listAll);
user.delete('/delete/:membro', control.deleteUser);
user.get('/find-user-by-id', control.findUserById);

// user.put('/update', Auth, control.update);

// !! CREATE PROFILE */
user.post('/create-profile', control.createProfile);
user.put('/update-profile', control.updateProfile);
user.patch('/update-avatar', img.single('avatar'), control.updateAvatar);
user.patch('/update-logo', img.single('logo'), control.updateLogo);

//! ! LINKS
user.post('/link/create', control.createLink);

//! ! RANK GLOBAL
user.get('/global-rank', control.rank);
user.get('/global-rank-ind', control.rankIndividual);

user.get('/clear-cache', control.clearCash);

export { user };
