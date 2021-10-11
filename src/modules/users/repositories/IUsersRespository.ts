import { User } from '@prisma/client';

import { IUserDtos } from '../dtos/IUserDtos';

export interface IUsersRepository {
   create(data: IUserDtos): Promise<User>;
   findByMembro(membro: string): Promise<User | null>;
   findById(user_id: string): Promise<User | null>;
   findAll(): Promise<User[]>;
   update(data: IUserDtos, id: string): Promise<User>;
}
