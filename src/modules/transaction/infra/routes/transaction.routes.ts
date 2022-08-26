import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { TransactionControler } from '../controller/TransactionController';

const transaction = Router();
const controler = new TransactionControler();

transaction.post('/create-transaction', Auth, controler.create);

transaction.get('/find-transaction/:id', Auth, controler.findById);
transaction.get('/list-all-transaction', Auth, controler.listAll);

transaction.get('/list-by-prestador', Auth, controler.findByPrestador);
transaction.get('/list-by-consumidor', Auth, controler.findByConsumidor);
transaction.get('/ponts-transaction', Auth, controler.pontos);

transaction.delete('/delete-transaction/:id', Auth, controler.del);

export { transaction };
