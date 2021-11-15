export const typeCheck = (tickerType: string) => {
  switch (tickerType) {
    case "ON":
      return "Ação ON";
    case "PN":
      return "Ação PN";
    default:
      return "Fii";
  }
};
