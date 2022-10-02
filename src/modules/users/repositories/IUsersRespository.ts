import { Links, Profile, SituationUser, User } from '@prisma/client';
import { ILinkDto, IProfileDto, IUserDtos, ISituationUser } from '@shared/dtos';

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
   updateUser(data: IUserDtos, id: string): Promise<User>;
   updateToken(id: string, token: string): Promise<User>;
   updateSenha(senha: string, id: string): Promise<User>;
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

   // ! SITUATION

   updateSituation(data: ISituationUser): Promise<SituationUser>;
}
