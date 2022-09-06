import { Indication } from '@prisma/client';
import { IIndicationDto } from '@shared/dtos';

export interface IIndicationRepository {
   create(data: IIndicationDto): Promise<Indication>;
   findByIndicado(id: string): Promise<Indication[]>;
   findByQuemIndicou(id: string): Promise<Indication[]>;
   findById(id: string): Promise<Indication | null>;

   listAll(): Promise<Indication[]>;

   delete(id: string): Promise<Indication>;
   validate(id: string): Promise<Indication>;
}
