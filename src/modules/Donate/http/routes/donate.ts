import { Router } from 'express';

import { DonateController } from '../controller/DonateController';

const donate = Router();
const control = new DonateController();

donate.post('/create', control.create);
donate.get('/:id/', control.findById);
donate.delete('/:id/', control.delete);
donate.put('/approved/:id/', control.approved);
donate.get('/', control.listMany);

export { donate };
