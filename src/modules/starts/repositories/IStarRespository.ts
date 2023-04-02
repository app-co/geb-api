import { Stars } from '@prisma/client';
import { IStarDto } from '@shared/dtos';

export interface starPont {
   value: number;
}

export interface IStarRepository {
   create(data: IStarDto): Promise<Stars>;
   listByUser_id(id: string): Promise<Stars[]>;
}
