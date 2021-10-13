import { Router } from 'express';

import { transaction } from './transaction.routes';

const TransactionRoute = Router();

TransactionRoute.use('/transaction', transaction);

export { TransactionRoute };
