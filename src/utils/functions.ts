import { TableDataRfProps } from "components/Table/RfTable";
import { TableDataRvProps } from "components/Table/RvTable/index";

type OverLimiteData = TableDataRfProps | TableDataRvProps;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function alreadyExistsInList<T>(name: string, field: string, list: T[]) {
  const exists = list.filter(
    (item: any) => item[field].toUpperCase() === name.toUpperCase()
  );

  return exists.length > 0;
}

export function hasOverLimit(
  data: OverLimiteData[],
  valueToCompare: number,
  limit: number
) {
  const hasOverIdealPercentage = data.slice().reduce((acc, item) => {
    acc += item.idealPorcentage;

    return acc;
  }, 0);

  return hasOverIdealPercentage + valueToCompare > limit;
}
