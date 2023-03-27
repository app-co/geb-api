import { User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   nome: string;
   membro: string;
   senha: string;
   adm: boolean;
   apadrinhado?: boolean;
   firstLogin?: boolean;
   inativo?: boolean;
}

@injectable()
export class CreateUserService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({
      nome,
      membro,
      senha,
      adm,
      apadrinhado,
      firstLogin,
      inativo,
   }: Props): Promise<User> {
      const find = await this.userRepository.findByMembro(membro);

      if (find) {
         throw new Err('Esse membro já está cadastrado');
      }

      const has = await hash(senha, 8);
      const data = { nome, membro, senha: has, adm };

      const user = await this.userRepository.create(
         data,
         apadrinhado,
         firstLogin,
         inativo,
      );

      await this.cache.invalidate('users');
      await this.cache.invalidatePrefix(`individualPonts`);

      return user;
   }
}
