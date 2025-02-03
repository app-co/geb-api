/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import { number } from 'zod';

export function _toCurrency(amount: number) {
  if (!number) return;
  const vl = Number(amount.toFixed(2));
  const price = vl.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return price;
}
