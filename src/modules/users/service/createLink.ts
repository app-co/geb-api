/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Links, Profile } from '@prisma/client';
import { IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   user_id: string;
   nome: string;
   link: string;
}

@injectable()
export class CreateLink {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ user_id, nome, link }: Props): Promise<Links> {
      const user = await this.userRepository.findById(user_id);
      const findLinks = await this.userRepository.findLinkByUserId(user_id);

      const fin = findLinks.find(h => {
         if (h.nome.includes(nome)) {
            return h;
         }
      });

      if (fin) {
         throw new Err('Você ja tem um link com o mesmo nome');
      }

      if (!user) {
         throw new Err('Usuário não encontrado');
      }

      const create = await this.userRepository.createLink({
         user_id,
         nome,
         link,
      });

      return create;
   }
}
