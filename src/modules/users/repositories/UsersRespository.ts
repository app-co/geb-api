/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Prisma, prisma, PrismaClient, Profile, User } from '@prisma/client';
import { IProfileDto, IUserDtos } from '@shared/dtos';

import { IUsersRepository } from './IUsersRespository';

export class UsersRespository implements IUsersRepository {
   private prisma = new PrismaClient();

   public async create(data: IUserDtos): Promise<User> {
      const user = await this.prisma.user.create({
         data: {
            nome: data.nome,
            membro: data.membro,
            adm: data.adm,
            senha: data.senha!,
         },
      });

      return user;
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
      });

      return find;
   }

   async listAllUser(): Promise<User[]> {
      const find = await this.prisma.user.findMany({
         include: { presenca: true },
      });
      return find;
   }

   //* *PROFILE  */

   async updateProfile(data: IProfileDto, id: string): Promise<Profile> {
      const up = await this.prisma.profile.update({
         where: { id },
         data: {
            user_id: data.user_id,
            whats: data.whats,
            workName: data.workName,
            CNPJ: data.CNPJ,
            CPF: data.CPF,
            ramo: data.ramo,
            enquadramento: data.enquadramento,
            email: data.email,
            links: [],
         },
      });

      return up;
   }

   async findByIdProfile(id: string): Promise<Profile | null> {
      const find = await this.prisma.profile.findFirst({
         where: { user_id: id },
      });

      return find;
   }

   async createProfile(
      data: IProfileDto,
      whatsApp: string,
      insta: string,
      web: string,
      face: string,
   ): Promise<Profile> {
      const links = [{ whatsApp, insta, web, face }] as Prisma.JsonArray;
      const create = await this.prisma.profile.create({
         data: {
            user_id: data.user_id,
            whats: data.whats,
            workName: data.workName,
            CNPJ: data.CNPJ,
            CPF: data.CPF,
            ramo: data.ramo,
            enquadramento: data.enquadramento,
            email: data.email,
            links,
         },
      });

      return create;
   }

   async updateSenha(senha: string, id: string): Promise<User> {
      const user = await this.prisma.user.update({
         where: { id },
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

   async updateToken(id: string, token: string): Promise<User> {
      const up = await this.prisma.user.update({
         where: { id },
         data: {
            token,
         },
      });

      return up;
   }

   async deleteUser(user_id: string): Promise<User> {
      const user = await this.prisma.user.delete({
         where: { id: user_id },
      });

      return user;
   }
}
