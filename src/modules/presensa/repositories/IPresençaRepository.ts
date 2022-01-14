import { Presenca } from '@prisma/client';

import { IPresencaDto } from '../Dtos/IPresençaDto';

export interface IPresencaRespository {
   create(data: IPresencaDto): Promise<Presenca>;
   update(id: string, presenca: boolean): Promise<Presenca>;
   list(id: string): Promise<Presenca[]>;
   listAll(): Promise<Presenca[]>;
}
