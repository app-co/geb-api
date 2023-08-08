import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   membro: string;
   senha?: string;
}

@injectable()
export class UpdateSenha {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ membro, senha }: Props): Promise<User> {
      const find = await this.userRepository.findByMembro(membro);

      if (!find) {
         throw new Err('Membro nao encontrado');
      }

      let data = null;

      if (senha) {
         const has = await hash(senha, 8);
         data = {
            id: find.id,
            nome: find.nome,
            membro,
            senha: has,
            adm: find.adm,
         };
      } else {
         data = {
            id: find.id,
            nome: find.nome,
            membro,
            adm: find.adm,
         };
      }

      const user = await this.userRepository.updateUser(data);

      return user;
   }
}
