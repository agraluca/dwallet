export const formatNumberToBrlCurrency = (number: number | string) => {
  const formatedNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number));
  return formatedNumber;
};

export const formatNumberToPercent = (number: number | string) => {
  const formatedNumber = new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(number));
  return formatedNumber;
};
