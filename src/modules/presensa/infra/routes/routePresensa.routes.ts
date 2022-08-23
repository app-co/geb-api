import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { PresensaController } from '../controllers/PresencaController';

const RoutePresensa = Router();
const controler = new PresensaController();

RoutePresensa.post('/create-order-presenca', Auth, controler.createOrder);
RoutePresensa.post('/create-presenca', Auth, controler.create);

RoutePresensa.get('/list-all-order-presenca', Auth, controler.listAllOrder);
RoutePresensa.get(
   '/list-all-presenca-user/',
   Auth,
   controler.listAllPresecaUser,
);

RoutePresensa.get('/rank-presenca', Auth, controler.rank);
// RoutePresensa.patch('/update', Auth, controler.update);
// RoutePresensa.get('/', Auth, controler.list);
// RoutePresensa.get('/all', Auth, controler.listAll);

export { RoutePresensa };
