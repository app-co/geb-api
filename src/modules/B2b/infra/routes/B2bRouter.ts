import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { B2bController } from '../controllers/B2bController';

const b2b = Router();

const controller = new B2bController();

b2b.post('/create-b2b', Auth, controller.create);
b2b.put('/validate-b2b', Auth, controller.validate);

b2b.get('/list-all-b2b', Auth, controller.listAll);
b2b.get('/list-by-send/', Auth, controller.findBySend);
b2b.get('/list-by-recevid/', Auth, controller.findByRecevid);
b2b.get('/pontos-b2b', Auth, controller.pontos);

b2b.delete('/del-b2b/:id', Auth, controller.delete);

export { b2b };
