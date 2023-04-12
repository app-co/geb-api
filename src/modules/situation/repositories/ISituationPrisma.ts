import { SituationUser } from '@prisma/client';

import { ISituationDto } from '../dtos';

export interface starPont {
   value: number;
}

export interface ISituationPrisma {
   update(data: ISituationDto): Promise<SituationUser>;
}
