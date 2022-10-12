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

user.use(Auth);

// user.patch('/avatar', img.single('avatar'), control.updateAvatar);
// user.patch('/logo', img.single('logo'), control.updateLogo);
user.get('/list-all-user', control.listAll);
user.delete('/delete/:membro', control.deleteUser);
user.get('/find-user-by-id', control.findUserById);

// user.put('/update', Auth, control.update);

// !! CREATE PROFILE */
user.post('/create-profile', control.createProfile);
user.put('/update-profile', control.updateProfile);

//! ! LINKS
user.post('/link/create', control.createLink);

//! ! RANK GLOBAL
user.get('/global-rank', control.rank);
user.get('/global-rank-ind', control.rankIndividual);

//! ! PADRINHO
user.post('/create-padrinho', control.createPadrinho);

// user.get('/find', Auth, control.findUnicUser);
// user.put('/upToken', Auth, control.updateToken);
// user.put('/update-padrinho', Auth, control.updatePadrinho);

// user.put('/update-senha', Auth, control.updateSenhaUser);

export { user };
