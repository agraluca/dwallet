/* eslint-disable @typescript-eslint/no-explicit-any */
export function alreadyExistsInList<T>(name: string, field: string, list: T[]) {
  const exists = list.filter(
    (item: any) => item[field].toUpperCase() === name.toUpperCase()
  );

  return exists.length > 0;
}
