/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
   DadosFire,
   Links,
   Padrinho,
   PrismaClient,
   Profile,
   SituationUser,
   User,
} from '@prisma/client';
import {
   ILinkDto,
   IMembro,
   IPadrinhoDto,
   IProfileDto,
   ISituationUser,
   IUserDtos,
} from '@shared/dtos';

import { IUsersRepository } from './IUsersRespository';

export class UsersRespository implements IUsersRepository {
   private prisma = new PrismaClient();

   public async create(
      data: IUserDtos,
      apadrinhado: boolean,
      firstLogin: boolean,
      inativo: boolean,
   ): Promise<User> {
      const user = await this.prisma.user.create({
         data: {
            nome: data.nome,
            membro: data.membro,
            adm: data.adm,
            senha: data.senha!,
            situation: {
               create: {
                  apadrinhado,
                  firstLogin,
                  inativo,
               },
            },
            region: {
               create: {
                  city: 'BOTUCATU',
               },
            },

            profile: {
               create: {
                  whats: 'whats',
                  workName: 'workName',
                  CNPJ: 'CNPJ',
                  CPF: 'CPF',
                  ramo: 'ramo',
                  enquadramento: 'enquadramento',
                  email: 'email',
               },
            },
         },
      });

      return user;
   }

   public async updateMembro(data: IMembro): Promise<User> {
      const us = this.prisma.user.update({
         where: { id: data.id },
         data: {
            nome: data.nome,
            membro: data.membro,
            senha: data.senha,
            adm: data.adm,
            token: data.token,
         },
      });

      return us;
   }

   async findByMembro(membro: string): Promise<User | null> {
      const find = await this.prisma.user.findUnique({
         where: { membro },
      });

      return find;
   }

   async findById(user_id: string): Promise<User | null> {
      const find = await this.prisma.user.findUnique({
         where: { id: user_id },
         include: {
            profile: true,
            region: true,
            situation: true,
            Stars: true,
            midia: true,
         },
      });

      return find;
   }

   async listAllUser(): Promise<User[]> {
      const find = await this.prisma.user.findMany({
         include: {
            situation: true,
            profile: true,
            region: true,
            DadosFire: true,
            Stars: true,
            midia: true,
         },
      });
      return find;
   }

   async updateToken(id: string, token: string): Promise<User> {
      const up = await this.prisma.user.update({
         where: { id },
         data: {
            token,
         },
      });

      return up;
   }

   async deleteUser(membro: string): Promise<User> {
      const user = await this.prisma.user.delete({
         where: { membro },
      });

      return user;
   }

   //! !  LINKS

   // !!PROFILE  */

   async updateProfile(data: IProfileDto): Promise<Profile> {
      const up = await this.prisma.profile.update({
         where: { id: data.id },
         data: {
            whats: data.whats,
            workName: data.workName,
            CNPJ: data.CNPJ,
            CPF: data.CPF,
            ramo: data.ramo,
            enquadramento: data.enquadramento,
            email: data.email,
            avatar: data.avatar,
            logotipo: data.logo,
            avatarPath: data.avatarPath,
            logoPath: data.logoPath,
         },
      });

      return up;
   }

   async findByIdProfile(id: string): Promise<Profile | null> {
      const find = await this.prisma.profile.findFirst({
         where: { fk_id_user: id },
      });

      return find;
   }

   async createProfile(data: IProfileDto): Promise<Profile> {
      const create = await this.prisma.profile.create({
         data: {
            whats: data.whats,
            workName: data.workName,
            CNPJ: data.CNPJ,
            CPF: data.CPF,
            ramo: data.ramo,
            enquadramento: data.enquadramento,
            email: data.email,
            logotipo: data.logo,
            avatar: data.avatar,
            fk_id_user: data.fk_id_user,
         },
      });

      return create;
   }

   async findProfileByUserId(fk_id_user: string): Promise<Profile | null> {
      const find = await this.prisma.profile.findFirst({
         where: { fk_id_user },
      });

      return find;
   }

   async findAllProfile(): Promise<Profile[]> {
      const fi = await this.prisma.profile.findMany();
      return fi;
   }

   async updateSenha(senha: string, membro: string): Promise<User> {
      const user = await this.prisma.user.update({
         where: { membro },
         data: {
            senha,
         },
      });

      return user;
   }

   async updateUser(data: IUserDtos, id: string): Promise<User> {
      const up = await this.prisma.user.update({
         where: { id },
         data: {
            nome: data.nome,
            membro: data.membro,
            adm: data.adm,
            senha: data.senha,
         },
      });

      return up;
   }

   // !! SITUATION

   async updateSituation(data: ISituationUser): Promise<SituationUser> {
      const up = await this.prisma.situationUser.update({
         where: { id: data.id },
         data: {
            fk_id_user: data.fk_id_user,
            apadrinhado: data.apadrinhado,
            firstLogin: data.firstLogin,
            inativo: data.inativo,
         },
      });

      return up;
   }

   async findSituation(id: string): Promise<SituationUser | null> {
      const fin = await this.prisma.situationUser.findFirst({
         where: { fk_id_user: id },
      });

      return fin;
   }

   async listAllSituation(): Promise<SituationUser[]> {
      const l = await this.prisma.situationUser.findMany();

      return l;
   }

   // !! PADRINHO

   async createPadrinho(data: IPadrinhoDto): Promise<Padrinho> {
      const cre = await this.prisma.padrinho.create({
         data: {
            apadrinhado_id: data.apadrinhado_id,
            apadrinhado_name: data.apadrinhado_name,
            user_id: data.user_id,
            qnt: data.qnt,
         },
      });

      return cre;
   }

   async findPadrinhoById(id: string): Promise<Padrinho | null> {
      const find = await this.prisma.padrinho.findUnique({
         where: { id },
      });

      return find;
   }

   async findPadrinhoByUserId(user_id: string): Promise<Padrinho | null> {
      const find = await this.prisma.padrinho.findFirst({
         where: { user_id },
      });

      return find;
   }

   async listAllPadrinho(): Promise<Padrinho[]> {
      const all = await this.prisma.padrinho.findMany();
      return all;
   }

   async deletePadrinho(id: string): Promise<void> {
      await this.prisma.padrinho.delete({
         where: { id },
      });
   }

   //! ! DADOS FIRE

   async listAllDataFire(): Promise<DadosFire[]> {
      const fire = this.prisma.dadosFire.findMany();

      return fire;
   }
}
