import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { OrderPresenca, Presenca } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { pontos } from 'utils/pontos';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

interface Props {
   nome: string;
   pontuacao: number;
   quantidade: number;
}

@injectable()
export class GlobalPontsPresencaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute(): Promise<Props[]> {
      const liset = await this.presencaRepository.listAllOrder();
      const listAllUser = await this.userRepository.listAllUser();
      const lisAllPresencaUser =
         await this.presencaRepository.listAllPresenca();

      const global = listAllUser.map(user => {
         const userPresenca = lisAllPresencaUser.filter(
            h => h.user_id === user.id,
         );

         const qnt = userPresenca.length;

         return {
            nome: user.nome,
            pontuacao: qnt * pontos.presenca,
            quantidade: qnt,
         };
      });

      return global;
   }
}
