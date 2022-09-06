import { Profile, User } from '@prisma/client';
import { IProfileDto, IUserDtos } from '@shared/dtos';

export interface IUsersRepository {
   create(data: IUserDtos): Promise<User>;
   findByMembro(membro: string): Promise<User | null>;
   findById(user_id: string): Promise<User | null>;
   listAllUser(): Promise<User[]>;
   updateUser(data: IUserDtos, id: string): Promise<User>;
   updateToken(id: string, token: string): Promise<User>;

   //* *PROFILE */

   createProfile(
      data: IProfileDto,
      whatsApp: string,
      web: string,
      insta: string,
      face: string,
   ): Promise<Profile>;
   findByIdProfile(id: string): Promise<Profile | null>;
   // updatePadrinho(user_id: string, padrinho: number): Promise<User>;
   updateSenha(senha: string, id: string): Promise<User>;
   deleteUser(user_id: string): Promise<User>;
}
