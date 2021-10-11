export const formatNumberToBrlCurrency = (number: number | string) => {
  const formatedNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number));
  return formatedNumber;
};
