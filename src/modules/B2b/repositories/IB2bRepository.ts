import { B2b } from '@prisma/client';
import { IB2b } from '@shared/dtos';

export interface IB2bRepository {
   create(data: IB2b): Promise<B2b>;
   listAllB2b(): Promise<B2b[]>;

   validate(id: string): Promise<B2b>;

   findB2bBySendId(send_id: string): Promise<B2b[]>;
   findB2bByRecevidId(recived_id: string): Promise<B2b[]>;

   findById(id: string): Promise<B2b | null>;

   deleteB2bById(id: string): Promise<B2b>;
}
