import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { RelationshipController } from '../controllers/relationship-controller';

const relationship = Router();
const controler = new RelationshipController();

relationship.use(Auth);
relationship.put('/relation-update', controler.update);
relationship.post('/relation-create', controler.create);
relationship.delete('/relation-delete', controler.delete);
relationship.get('/relation', controler.listAll);
relationship.get('/relation/:membro_id', controler.listByMembro);
relationship.get('/relation/selfe', controler.listByUserId);
relationship.post('/relation/data', controler.data);

export { relationship };
