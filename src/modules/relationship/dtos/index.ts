/* eslint-disable @typescript-eslint/ban-types */

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
   objto: object;
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
