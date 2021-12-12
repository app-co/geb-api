/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Err } from '@shared/errors/AppError';
import { format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { Consumo } from '.prisma/client';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

interface Props {
   user_id: string;
}

@injectable()
export class ListValorPrestadorConsumoService {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute(): Promise<any> {
      const findConsumo = await this.consumoRepository.listAll();
      const finAllUser = await this.userRepository.findAll();

      if (!findConsumo) {
         throw new Err('nenhum consumo disponivel');
      }

      const data = finAllUser.map(user => {
         const filtroConsumo = findConsumo.filter(h => {
            if (h.presstador_id === user.id) {
               return h;
            }
         });

         const filtroData = filtroConsumo.find(
            h => h.presstador_id === user.id,
         )!;

         const dataF = filtroData?.created_at;

         const valor = filtroConsumo.reduce((acc, item) => {
            return acc + Number(item.valor);
         }, 0);

         return {
            id: user.id,
            nome: user.nome,
            workName: user.workName,
            total: valor,
            data: dataF,
         };
      });

      data.sort(function (a, b) {
         return Number(b.total) - Number(a.total);
      });

      const consumo = data.map(h => {
         if (!h.data) {
            return;
         }
         const dataFormatad = format(new Date(h.data), 'dd/MM/yyyy');

         return {
            ...h,
            data: dataFormatad,
         };
      });

      const nu = consumo.filter(h => {
         return h !== undefined;
      });

      return nu;
   }
}
