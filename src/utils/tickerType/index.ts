export const typeCheck = (tickerType: string) => {
  switch (tickerType) {
    case "ON":
      return "Ação ON";
    case "PN":
      return "Ação PN";
    case "UNT":
      return "Ação UNIT";
    case "DRN":
      return "BDR";
    default:
      return "Fii";
  }
};
