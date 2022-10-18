import { PrismaClient, User } from '@prisma/client';
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
   id: string;
   apadrinhado?: boolean;
   firstLogin?: boolean;
   inativo?: boolean;
   qntPadrinho?: number;
   qntIndication?: number;
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
      id,
      apadrinhado,
      firstLogin,
      inativo,
      qntIndication,
      qntPadrinho,
   }: Props): Promise<User> {
      const prisma = new PrismaClient();
      const find = await this.userRepository.findByMembro(membro);
      const findById = await this.userRepository.findById(id);

      console.log(id);

      if (find) {
         throw new Err('Esse membro já está cadastrado');
      }

      if (findById) {
         throw new Err('Esse membro já está cadastrado');
      }

      const has = await hash(senha, 8);
      const data = { nome, membro, senha: has, adm, id };

      const user = await this.userRepository.create(
         data,
         apadrinhado,
         firstLogin,
         inativo,
         qntIndication,
         qntPadrinho,
      );

      await this.cache.invalidate('users');
      await this.cache.invalidatePrefix(`individualPonts`);

      return user;
   }
}
