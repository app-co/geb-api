import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { RelationshipController } from '../controllers/relationship-controller';

const relationship = Router();
const controler = new RelationshipController();

relationship.use(Auth);
relationship.post('/relation/data', controler.data);
relationship.post('/relation-create', controler.create);

relationship.put('/relation-update', controler.update);
relationship.delete('/relation-delete/:id', controler.delete);

relationship.get('/relation', controler.listAll);
relationship.get('/relation/prestador', controler.listByPrestador);
relationship.get('/relation/client', controler.listByClient);

export { relationship };
