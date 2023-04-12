import { Prisma, Links, midia } from '@prisma/client';
import { ILikeDto, ILinkDto } from '@shared/dtos';

export interface ILinksRepository {
   create(data: ILinkDto): Promise<midia>;
   findByName(name: string): Promise<midia | null>;

   listByUser(user_id: string): Promise<midia[]>;
}
