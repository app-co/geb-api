import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { ConsumoController } from '../controller/ConsumoController';

const consumo = Router();
const control = new ConsumoController();

consumo.post('/order-transaction', Auth, control.createOrder);

consumo.get('/find-order-prestador', Auth, control.findOrderPrestador);
consumo.get('/find-order-consumidor', Auth, control.findOrderConsumidor);
consumo.get('/find-all-order', Auth, control.findAllOrder);

consumo.delete('/delete-order/:id', Auth, control.deleteOrder);

// consumo.post('/cons', Auth, control.createConsumidor);
// consumo.get('/listAll', Auth, control.listAll);
// consumo.get('/listValorP', Auth, control.listValorP);
// consumo.get('/listValorC', Auth, control.listValorC);

export { consumo };
