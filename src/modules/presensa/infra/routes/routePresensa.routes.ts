import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { PresensaController } from '../controllers/PresencaController';

const RoutePresensa = Router();
const controler = new PresensaController();

RoutePresensa.post('/', Auth, controler.create);
RoutePresensa.patch('/update', Auth, controler.update);
RoutePresensa.get('/', Auth, controler.list);
RoutePresensa.get('/all', Auth, controler.listAll);
RoutePresensa.get('/rank', Auth, controler.rank);

export { RoutePresensa };
