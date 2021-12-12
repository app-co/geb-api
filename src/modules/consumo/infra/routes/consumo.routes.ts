import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { ConsumoController } from '../controller/ConsumoController';

const consumo = Router();
const control = new ConsumoController();

consumo.post('/pres', Auth, control.createPrestador);
consumo.post('/cons', Auth, control.createConsumidor);
consumo.get('/listAll', Auth, control.listAll);
consumo.get('/listValorP', Auth, control.listValorP);
consumo.get('/listValorC', Auth, control.listValorC);

export { consumo };
