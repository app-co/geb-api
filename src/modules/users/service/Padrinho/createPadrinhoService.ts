/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Padrinho, Profile } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IProfileDto, IPadrinhoDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreatePadrinhoService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({
      user_id,
      apadrinhado_name,
      apadrinhado_id,
      qnt,
   }: IPadrinhoDto): Promise<any> {
      const find = await this.userRepository.findSituation(apadrinhado_id);
      const al = await this.userRepository.listAllPadrinho();

      if (find) {
         await this.userRepository.updateSituation({
            id: find.id,
            firstLogin: find.firstLogin,
            apadrinhado: !find.apadrinhado,
            inativo: find.inativo,
         });
      }

      const create = await this.userRepository.createPadrinho({
         user_id,
         apadrinhado_id,
         apadrinhado_name,
         qnt,
      });
      await this.cache.invalidate('users');

      await this.cache.invalidate('profile');

      await this.cache.invalidatePrefix(`individualPonts`);
      await this.cache.invalidate('padrinho');

      return create;
   }
}
