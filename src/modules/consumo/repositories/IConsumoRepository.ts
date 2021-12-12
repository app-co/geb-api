import { Consumo } from '.prisma/client';

import { IConsumoDto } from '../Dtos/IConsumoDtos';

export interface IConsumoRepository {
   create(data: IConsumoDto): Promise<Consumo>;
   listByConsumo(user_id: string): Promise<Consumo[]>;
   listAll(): Promise<Consumo[]>;
}
