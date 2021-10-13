import { Router } from 'express';

import { consumo } from './consumo.routes';

const ConsumoRoute = Router();

ConsumoRoute.use('/consumo', consumo);

export { ConsumoRoute };
