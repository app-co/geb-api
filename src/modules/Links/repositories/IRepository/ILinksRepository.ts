import { Prisma, Links } from '@prisma/client';
import { ILikeDto, ILinkDto } from '@shared/dtos';

export interface ILinksRepository {
   create(data: ILinkDto): Promise<Links>;
   findByName(name: string): Promise<Links | null>;

   listByUser(user_id: string): Promise<Links[]>;
}
