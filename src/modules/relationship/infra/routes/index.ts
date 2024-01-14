/* eslint-disable prettier/prettier */
import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { RelationshipController } from '../controllers/relationship-controller';

const relationship = Router();
const controler = new RelationshipController();

relationship.use(Auth);
relationship.post('/relation/data', controler.data);
relationship.post('/relation-create/', controler.create);

relationship.put('/relation-update', controler.update);
relationship.delete('/relation-delete/:id', controler.delete);

relationship.get('/relation', controler.listAll);
relationship.get('/relation/prestador', controler.listByPrestador);
relationship.get('/relation/client', controler.listByClient);
relationship.get('/relation/extrato-peding', controler.extratoPeding);
relationship.get('/relation/extrato-valid', controler.extratoValid);
relationship.get('/relation/extrato-valid/:id', controler.extratoPainelValid);
relationship.get(
  '/relation/extrato-pedding/:id',
  controler.extratoPainelPedding,
);
relationship.get('/relation/metric', controler.metric);

export { relationship };
