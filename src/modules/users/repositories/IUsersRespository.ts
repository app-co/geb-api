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
} from '@shared/dtos';

export interface IUsersRepository {
   create(
      data: IUserDtos,
      apadrinhado?: boolean,
      firstLogin?: boolean,
      inativo?: boolean,
      qntIndication?: number,
      qntPadrinho?: number,
   ): Promise<User>;
   findByMembro(membro: string): Promise<User | null>;
   findById(user_id: string): Promise<User | null>;
   listAllUser(): Promise<User[]>;
   updateUser(data: IUserDtos, id: string): Promise<User>;
   updateToken(id: string, token: string): Promise<User>;
   updateSenha(senha: string, membro: string): Promise<User>;
   deleteUser(membro: string): Promise<User>;

   // !! LINKS

   createLink(data: ILinkDto): Promise<Links>;
   findLinkByUserId(user_id: string): Promise<Links[]>;
   updateLink(id: string, link: string): Promise<Links>;
   deleteLink(id: string): Promise<void>;

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
   findPadrinhoByUserId(user_id: string): Promise<Padrinho | null>;
   listAllPadrinho(): Promise<Padrinho[]>;
   deletePadrinho(id: string): Promise<void>;

   //! ! DATA FIRE

   listAllDataFire(): Promise<DadosFire[]>;
}
