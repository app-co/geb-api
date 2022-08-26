/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { OrderTransaction } from '@prisma/client';
import { IOrderTransaction } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

interface Props {
   valor: number;
   descricao: string;
   prestador_id: string;
   consumidor_id: string;
}

@injectable()
export class CreateOrderTransaction {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({
      prestador_id,
      valor,
      descricao,
      consumidor_id,
   }: Props): Promise<OrderTransaction> {
      const findUser = await this.userRepository.findById(consumidor_id);

      const findPrestaor = await this.userRepository.findById(prestador_id);

      if (!findPrestaor) {
         throw new Err('Prestador não encontrado');
      }

      if (!findUser) {
         throw new Err('Consumidor não encontrado');
      }

      if (findUser.id === prestador_id) {
         throw new Err('Você nao pode realizar uma orderm para você mesmo');
      }

      const consumo = await this.consumoRepository.create({
         consumidor_name: findUser.nome,
         consumidor_id,
         prestador_name: findPrestaor.nome,
         prestador_id,
         descricao,
         valor,
      });

      return consumo;
   }
}
