export const typeCheck = (type: string) => {
  let tickerNumber;
  if (type.length === 6) {
    tickerNumber = type.slice(-2);
  } else {
    tickerNumber = type.slice(-1);
  }

  if (Number(tickerNumber) === 11) {
    return "Fii";
  }
  return "Ação";
};
