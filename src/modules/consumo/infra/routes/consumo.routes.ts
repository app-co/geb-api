import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { ConsumoController } from '../controller/ConsumoController';

const consumo = Router();
const control = new ConsumoController();

consumo.post('/', Auth, control.create);
consumo.get('/list', Auth, control.list);

export { consumo };
