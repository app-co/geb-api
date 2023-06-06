import { Prisma, Donate } from '@prisma/client';

export interface IDonateRepository {
   create(data: Prisma.DonateCreateInput): Promise<Donate>;
   findById(id: string): Promise<Donate | null>;
   listMany(): Promise<Donate[]>;
   delete(id: string): Promise<void>;
   validate(id: string): Promise<Donate>;
}
