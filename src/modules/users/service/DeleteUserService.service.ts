import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { PrismaClient } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IRes {
   message: string;
}
@injectable()
export class DeleteUserService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute(membro: string): Promise<IRes> {
      const find = await this.userRepository.findByMembro(membro);

      if (!find) {
         throw new Err('Usuário não encontrado');
      }

      if (!find.adm) {
         throw new Err('Vocẽ nao é um user ADM');
      }

      const { user } = new PrismaClient();

      await user.delete({
         where: { membro },
      });

      return { message: 'user deletado' };
   }
}
