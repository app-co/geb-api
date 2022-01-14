import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Presenca } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

@injectable()
export class ClassificationPresensa {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute(): Promise<any[]> {
      const list = await this.userRepository.findAll();

      return list;
   }
}
