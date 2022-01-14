/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaClient, User } from '@prisma/client';

import { IUserDtos } from '../dtos/IUserDtos';
import { IUsersRepository } from './IUsersRespository';

export class UsersRespository implements IUsersRepository {
   private prisma = new PrismaClient();

   public async create(data: IUserDtos): Promise<User> {
      const user = await this.prisma.user.create({
         data: {
            nome: data.nome,
            membro: data.membro,
            adm: data.adm,
            CNPJ: data.CNPJ,
            senha: data.senha!,
            whats: data.whats,
            CPF: data.CPF,
            ramo: data.ramo,
            enquadramento: data.enquadramento,
            email: data.email,
            workName: data.workName,
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

   async findAll(): Promise<User[]> {
      const find = await this.prisma.user.findMany({
         include: { presenca: true },
      });
      return find;
   }

   async update(data: IUserDtos, id: string): Promise<User> {
      const up = await this.prisma.user.update({
         where: { id },
         data: {
            nome: data.nome,
            membro: data.membro,
            adm: data.adm,
            CNPJ: data.CNPJ,
            whats: data.whats,
            CPF: data.CPF,
            ramo: data.ramo,
            enquadramento: data.enquadramento,
            email: data.email,
            workName: data.workName,
            links: data.links,
         },
      });

      return up;
   }

   async updatePadrinho(user_id: string, padrinho: number): Promise<User> {
      const up = await this.prisma.user.update({
         where: { id: user_id },
         data: {
            padrinhQuantity: padrinho,
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
}
