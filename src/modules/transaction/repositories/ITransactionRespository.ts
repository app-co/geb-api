/* eslint-disable import/no-extraneous-dependencies */
import { IOrderTransaction, ITransaction } from '@shared/dtos';

import { Transaction } from '.prisma/client';

export interface ITransactionRepository {
   create(data: ITransaction): Promise<Transaction>;
   findByConsumidor(id: string): Promise<Transaction[]>;
   findByPrestador(id: string): Promise<Transaction[]>;
   listAllTransaction(): Promise<Transaction[]>;
   findTransactionById(id: string): Promise<Transaction | null>;
   delete(id: string): Promise<void>;
}
