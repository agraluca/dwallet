export const formatNumberToBrlCurrency = (number: number) => {
  const formatedNumber = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
  return formatedNumber;
};
