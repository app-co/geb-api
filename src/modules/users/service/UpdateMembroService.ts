/* eslint-disable @typescript-eslint/no-unused-vars */
import { Profile, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IUserDtos, IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   id: string;
   nome: string;
   membro: string;
   senha?: string;
   adm: boolean;
   token?: string;
}

@injectable()
export class UpdateMembroService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({
      id,
      nome,
      membro,
      senha,
      token,
      adm,
   }: Props): Promise<User> {
      const findUser = await this.userRepository.findById(id);

      if (!findUser) {
         throw new Err('Usuário não encontrado');
      }

      let hs = senha;
      if (senha) {
         const has = await hash(senha, 8);
         hs = has;
      }

      const update = await this.userRepository.updateMembro({
         id,
         nome,
         membro,
         senha: hs,
         adm,
         token,
      });

      await this.cache.invalidate('users');

      return update;
   }
}
