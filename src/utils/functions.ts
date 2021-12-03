import { TableDataRfProps } from "components/Table/RfTable";
import { TableDataRvProps } from "components/Table/RvTable/index";

type OverLimitData = TableDataRfProps | TableDataRvProps;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function alreadyExistsInList<T>(name: string, field: string, list: T[]) {
  const exists = list.filter(
    (item: any) => item[field].toUpperCase() === name.toUpperCase()
  );

  return exists.length > 0;
}

export function hasOverLimit(
  data: OverLimitData[],
  limit: number,
  valueToCompare?: number
) {
  const hasOverIdealPercentage = data.slice().reduce((acc, item) => {
    acc += item.idealPorcentage;

    return acc;
  }, 0);

  if (valueToCompare) {
    return hasOverIdealPercentage + valueToCompare > limit;
  }

  return hasOverIdealPercentage > limit;
}

export function existZeroValueInIdealPercentage(data: OverLimitData[]) {
  const existsIdealPercentageZeroValue = data.reduce((acc, item) => {
    if (Number(item.idealPorcentage) === 0) {
      acc = true;
    }

    return acc;
  }, false);

  return existsIdealPercentageZeroValue;
}
