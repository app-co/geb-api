import { Prisma, Donate } from '@prisma/client';

import { IPropsDonate } from '../models/DonatePrismaRepository';

export interface IDonateRepository {
   create(data: IPropsDonate): Promise<Donate>;
   findById(id: string): Promise<Donate | null>;
   listMany(): Promise<Donate[]>;
   delete(id: string): Promise<void>;
   validate(id: string): Promise<Donate>;
}
