/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Padrinho, Profile } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IProfileDto, IPadrinhoDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IProps {
   id: string;
}

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
      console.log(find);

      if (!find) {
         throw new Err('membro not found');
      }

      if (find?.apadrinhado) {
         throw new Err('Este membro já está apadrinhado');
      }

      await this.userRepository.updateSituation({
         id: find?.id,
         firstLogin: find.firstLogin,
         apadrinhado: true,
         inativo: find.inativo,
      });

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

   async listAll(): Promise<Padrinho[]> {
      const list = await this.userRepository.listAllPadrinho();

      return list;
   }

   async listByPadrinho({ id }: IProps): Promise<Padrinho[]> {
      const list = await this.userRepository.findPadrinhoByUserId(id);

      if (!list) {
         throw new Err('Padrinho not found');
      }

      return list;
   }

   async delele({ id }: IProps): Promise<Padrinho> {
      const list = await this.userRepository.findPadrinhoById(id);

      if (!list) {
         throw new Err('Padrinho not found');
      }
      await this.userRepository.deletePadrinho(id);

      return list;
   }
}
