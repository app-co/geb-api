import { string } from "zod";

export const _convertionType: { [key: number]: string } = {
  1: 'COMPRA',
  2: 'VENDA',
  3: 'B2B',
  4: 'INDICAÇÃO',
  5: 'PRESENÇA',
  6: 'DONATIVOS',
  7: 'CONVITES',
  8: 'PADRINHO',
  9: 'CORRIDAS',
}

export const _pontos: { [key: number]: number } = {
  1: 10,
  2: 10,
  3: 20,
  4: 15,
  5: 10,
  6: 10,
  7: 10,
  8: 35,
  9: 10,
};
