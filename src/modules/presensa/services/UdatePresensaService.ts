import { Presenca } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IPresencaDto } from '../Dtos/IPresençaDto';
import { IPresencaRespository } from '../repositories/IPresençaRepository';

type IProps = {
   id: string;
   presenca: boolean;
};

@injectable()
export class UpdatePresensaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,
   ) {}

   async execute({ id, presenca }: IProps): Promise<Presenca> {
      const up = await this.presencaRepository.update(id, presenca);

      return up;
   }
}
