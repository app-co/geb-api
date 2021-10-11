import { PrismaClient, User } from '@prisma/client';

import { IUserDtos } from '../dtos/IUserDtos';
import { IUsersRepository } from './IUsersRespository';

export class UsersRespository implements IUsersRepository {
   private prisma = new PrismaClient();

   public async create(data: IUserDtos): Promise<User> {
      const user = await this.prisma.user.create({
         data: {
            nome: data.nome,
            sobrenome: data.sobrenome,
            membro: data.membro,
            senha: data.senha,
            workName: data.workName,
            whats: data.whats,
            CNPJ: data.CNPJ,
            adm: data.adm,
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
      const find = await this.prisma.user.findMany();
      return find;
   }

   async update(data: IUserDtos, id: string): Promise<User> {
      const up = await this.prisma.user.update({
         where: { id },
         data: {
            nome: data.nome,
            sobrenome: data.sobrenome,
            membro: data.membro,
            adm: data.adm,
            CNPJ: data.CNPJ,
            senha: data.senha,
            whats: data.whats,
            workName: data.workName,
         },
      });

      return up;
   }
}
