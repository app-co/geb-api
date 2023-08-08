/* eslint-disable @typescript-eslint/ban-types */

import { String } from 'aws-sdk/clients/cloudtrail';

type T =
   | 'B2B'
   | 'CONSUMO_IN'
   | 'CONSUMO_OUT'
   | 'PADRINHO'
   | 'INDICATION'
   | 'DONATE'
   | 'INVIT'
   | 'PRESENCA';

export interface IRelashionship {
   id?: string;
   objto: {
      token: string;
      description: string;
      send_name: string;
      quemIndicaou_name: string;
      client_name: string;
      phone_number_client: string;
      consumidor_name: string;
      valor: number;
      user_id: string;
      avatar: string;
      user_name: string;
      name_convidado: string;
   };
   fk_user_id: string;
   situation: boolean;
   prestador_id: string;
   client_id?: string;
   ponts: number;
   type: T;
}

export interface IRelashionshipUpdate {
   id: string;
   objto?: object;
   fk_user_id?: string;
   situation?: boolean;
   prestador_id?: string;
   client_id?: string;
   ponts?: number;
   type?: T;
}
