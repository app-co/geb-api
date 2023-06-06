import { Convidado } from '@prisma/client';
import { IConvidadoDto } from '@shared/dtos';

export interface starPont {
   value: number;
}

export interface IConvidadoPrisma {
   create(data: IConvidadoDto): Promise<Convidado>;
   listAll(): Promise<Convidado[]>;
   delete(id: string): Promise<void>;
   update(id: string): Promise<Convidado>;
}
