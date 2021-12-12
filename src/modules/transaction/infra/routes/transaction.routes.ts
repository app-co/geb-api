import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { TransactionControler } from '../controller/TransactionController';

const transaction = Router();
const controler = new TransactionControler();

transaction.post('/', Auth, controler.create);
transaction.get('/list', Auth, controler.find);
transaction.delete('/del/:id', Auth, controler.del);

export { transaction };
