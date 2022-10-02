import { OrderPresenca, Presenca } from '@prisma/client';
import { IPresencaDto } from '@shared/dtos';

export interface IPresencaRespository {
   create(data: IPresencaDto): Promise<Presenca>;
   create_order(data: IPresencaDto): Promise<OrderPresenca>;

   listAllPresenseWithUserId(user_id: string): Promise<Presenca[]>;
   listAllPresenca(): Promise<Presenca[]>;

   listOrderWithUserId(user_id: string): Promise<OrderPresenca | null>;
   listOrderWithId(id: string): Promise<OrderPresenca | null>;
   listAllOrder(): Promise<OrderPresenca[]>;

   deleteOrderPresenca(id: string): Promise<OrderPresenca>;

   // update(id: string, presenca: boolean): Promise<Presenca>;
   // list(id: string): Promise<Presenca[]>;
   // listAll(): Promise<Presenca[]>;
}
