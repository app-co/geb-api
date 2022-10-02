import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { PresensaController } from '../controllers/PresencaController';

const RoutePresensa = Router();
const controler = new PresensaController();

RoutePresensa.use(Auth);

RoutePresensa.post('/create-order-presenca', controler.createOrder);
RoutePresensa.post('/create-presenca', controler.create);

RoutePresensa.get('/list-all-order-presenca', controler.listAllOrder);
RoutePresensa.get(
   '/list-all-presenca-user/',

   controler.listAllPresecaUser,
);

RoutePresensa.delete('/delete-order/:id', controler.delte);

RoutePresensa.get('/rank-presenca', controler.rank);
// RoutePresensa.patch('/update', Auth, controler.update);
// RoutePresensa.get('/', Auth, controler.list);
// RoutePresensa.get('/all', Auth, controler.listAll);

export { RoutePresensa };
