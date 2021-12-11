export const typeCheck = (tickerType: string) => {
  switch (tickerType) {
    case "ON":
      return "Ação Ordinária";
    case "PN":
      return "Ação Preferêncial";
    case "UNT":
      return "Ação UNIT";
    case "DRN":
      return "BDR";
    default:
      return "Fundo Imobiliário";
  }
};
