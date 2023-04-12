import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { SituationController } from '../controller';

const situation = Router();
const controler = new SituationController();

situation.use(Auth);
situation.put('/update-situation', controler.update);

export { situation };
