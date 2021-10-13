import { Transaction } from '.prisma/client';

import { ITransactionDto } from '../Dtos/ITransactionDto';

export interface ITransactionRepository {
   create(data: ITransactionDto): Promise<Transaction>;
   findById(id: string): Promise<Transaction | null>;
   findByConsumidor(id: string): Promise<Transaction[]>;
   findByPrestador(id: string): Promise<Transaction[]>;
   delete(id: string): Promise<void>;
}
