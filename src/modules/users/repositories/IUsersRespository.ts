import { DadosFire, Profile, SituationUser, User } from '@prisma/client';
import {
   IMembro,
   IProfileDto,
   ISituationUser,
   IUserDtos,
   IUserUpdate,
} from '@shared/dtos';

export interface IUsersRepository {
   create(
      data: IUserDtos,
      apadrinhado?: boolean,
      firstLogin?: boolean,
      inativo?: boolean,
   ): Promise<User>;
   findByMembro(membro: string): Promise<User | null>;
   findById(user_id: string): Promise<IUserDtos | null>;
   listAllUser(): Promise<User[]>;
   updateUser(data: IUserUpdate): Promise<User>;
   updateToken(id: string, token: string): Promise<User>;
   updateSenha(senha: string, membro: string): Promise<User>;
   deleteUser(membro: string): Promise<User>;
   updateMembro(data: IMembro): Promise<User>;

   //! ! PROFILE */

   createProfile(data: IProfileDto): Promise<Profile>;
   findByIdProfile(id: string): Promise<Profile | null>;
   findAllProfile(): Promise<Profile[]>;
   findProfileByUserId(user_id: string): Promise<Profile | null>;
   updateProfile(data: IProfileDto): Promise<Profile>;

   // ! SITUATION

   updateSituation(data: ISituationUser): Promise<SituationUser>;
   findSituation(id: string): Promise<SituationUser | null>;
   listAllSituation(): Promise<SituationUser[]>;

   //! ! DATA FIRE
   listAllDataFire(): Promise<DadosFire[]>;
}
