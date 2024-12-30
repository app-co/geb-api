export function removeStringCaracters(value: string) {
  const number = value.replace(/[^\d]/g, '');
  let currency = number;

  if (number.length === 2) {
    currency = `${number}00`;
  }

  if (number.length === 3) {
    currency = `${number}0`;
  }

  return parseInt(currency, 10);
}

export function calculatorPorcent(valor: number) {
  const resul = valor.toLocaleString('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return resul;
}

export function validarCPF(value: string) {
  const cpf = value.replace(/[^\d]/g, '');

  // Verifica se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Calcula o primeiro dígito verificador do CPF
  let soma = 0;
  for (let i = 0; i < 9; i += i) {
    soma += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;

  // Calcula o segundo dígito verificador do CPF
  soma = 0;
  for (let i = 0; i < 10; i += i) {
    soma += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica se os dígitos verificadores são válidos
  if (
    parseInt(cpf.charAt(9), 10) !== digito1 ||
    parseInt(cpf.charAt(10), 10) !== digito2
  ) {
    return false;
  }

  return true;
}
