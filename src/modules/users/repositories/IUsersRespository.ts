import {
   DadosFire,
   Links,
   Padrinho,
   Profile,
   SituationUser,
   User,
} from '@prisma/client';
import {
   ILinkDto,
   IProfileDto,
   IUserDtos,
   ISituationUser,
   IPadrinhoDto,
   IMembro,
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
   findById(user_id: string): Promise<User | null>;
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

   //! ! PADRINHO
   createPadrinho(data: IPadrinhoDto): Promise<Padrinho>;
   findPadrinhoById(id: string): Promise<Padrinho | null>;
   findPadrinhoByUserId(user_id: string): Promise<Padrinho[]>;
   listAllPadrinho(): Promise<Padrinho[]>;
   deletePadrinho(id: string): Promise<void>;

   //! ! DATA FIRE
   listAllDataFire(): Promise<DadosFire[]>;
}
