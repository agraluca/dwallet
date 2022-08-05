export const typeCheck = (tickerType: string) => {
  switch (tickerType) {
    case "ON":
      return "Ação Ordinária";
    case "PN":
      return "Ação Preferêncial";
    case "UNT":
      return "Ação UNIT";
    case "DR1":
    case "DRN":
      return "BDR";
    case "CI":
    case "DRE":
      return "ETF";
    default:
      return "Fundo Imobiliário";
  }
};
