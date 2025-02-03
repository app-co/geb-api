/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
export function _toPorcent(value: number): string | undefined {
  if (!value) return;

  const per = value.toLocaleString('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return per;
}
