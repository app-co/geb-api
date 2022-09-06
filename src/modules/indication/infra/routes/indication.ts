import { Router } from 'express';

import { IndicationController } from '../controllers/IndicationController';

const ind = Router();
const contro = new IndicationController();

ind.post('/create-indication', contro.create);
ind.put('/validate-indication', contro.validate);

ind.get('/list-all-indication', contro.listAll);
ind.get('/pontos-indication', contro.pontos);
ind.get('/list-by-indication', contro.listIndicado);
ind.get('/list-by-who-ind-indication', contro.quemInd);
ind.delete('/del-indication/:id', contro.del);

export { ind };
