import { OrderTransaction } from '@prisma/client';
import { IOrderTransaction } from '@shared/dtos';

import { Consumo } from '.prisma/client';

export interface IConsumoRepository {
   create(data: IOrderTransaction): Promise<OrderTransaction>;
   findOrderPrestador(prestador_id: string): Promise<OrderTransaction[]>;
   findOrderConsumidor(consumidor_id: string): Promise<OrderTransaction[]>;
   findAllOrder(): Promise<OrderTransaction[]>;
   findOrderById(id: string): Promise<OrderTransaction | null>;
   deleteOrder(id: string): Promise<void>;
   listAll(): Promise<Consumo[]>;
}
