import { IRelationship } from '@modules/relationship/dtos';

export type TClassification = {
   id: string;
   ponts: number;
   rank: number;
   segment: string;
};

export type IMetricUser = {
   totalPonts: number;
   totalVendas: number;
   totalCompras: number;
   totalPresence: number;
   classification: TClassification[];
   satisfiedPorcentege: number;
   satisfiedPresence: number;
   IdealPresence: number;
   getVendas: IRelationship[];
   getCompras: IRelationship[];
   currencyVendas: string;
   currencyCompras: string;
   totalPendente: number;
   handshak: number;
};
