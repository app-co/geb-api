import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { ConvidadoController } from '../controller';

const guest = Router();
const controler = new ConvidadoController();

guest.use(Auth);
guest.post('/create-guest', controler.create);
guest.get('/', controler.listAll);
guest.delete('/:id', controler.delete);
guest.put('/up-guest/:id', controler.update);

export { guest };
