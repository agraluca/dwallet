import { createContext, ReactNode, useEffect, useState } from "react";

export type TableDataProps = {
  stock: string;
  type: string;
  price: number;
  idealPorcentage: number;
  currentPorcentage: number;
  stockAmount: number;
  shouldBuyAmount: number;
  status: string;
};

export type CashFlowProps = {
  total: number;
  rf: number;
  rv: number;
  tableData: TableDataProps[];
  setTableData: (value: TableDataProps[]) => void;
};

const cashFlowInitialValues = {
  total: 0,
  rf: 0,
  rv: 0,
  tableData: [],
  setTableData: () => null,
};

export const CashFlowContext = createContext<CashFlowProps>(
  cashFlowInitialValues
);

export type CashFlowProviderProps = {
  children: ReactNode;
};

export function CashFlowProvider({ children }: CashFlowProviderProps) {
  const [total, setTotal] = useState(0);
  const [rf] = useState(0);
  const [rv, setRv] = useState(0);
  const [tableData, setTableData] = useState<TableDataProps[]>([
    {
      stock: "ABEV3",
      type: "Ação",
      price: 15,
      idealPorcentage: 8,
      currentPorcentage: 8,
      stockAmount: 11,
      shouldBuyAmount: 0,
      status: "Segurar",
    },
  ]);

  useEffect(() => {
    setRv(
      tableData?.reduce((acc, curr) => {
        acc += curr.price * curr.stockAmount;
        return acc;
      }, 0)
    );

    setTotal(rf + rv);
  }, [rf, rv, tableData, total]);

  useEffect(() => {
    const updatedTableData = tableData.map((data) => {
      const currentPorcentage = (
        ((Number(data.price) * Number(data.stockAmount)) / total) *
        100
      ).toFixed(2);
      const status = Number(currentPorcentage) < Number(data.idealPorcentage);
      return {
        stock: data.stock,
        type: data.type,
        price: Number(data.price),
        idealPorcentage: Number(data.idealPorcentage),
        currentPorcentage: Number(currentPorcentage),
        stockAmount: Number(data.stockAmount),
        shouldBuyAmount: status
          ? Math.ceil(
              (Number(data.idealPorcentage) * Number(data.stockAmount)) /
                Number(currentPorcentage) -
                Number(data.stockAmount)
            )
          : 0,
        status: status ? "Comprar" : "Segurar",
      };
    });
    setTableData(updatedTableData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, tableData.length]);

  return (
    <CashFlowContext.Provider
      value={{ total, rf, rv, tableData, setTableData }}
    >
      {children}
    </CashFlowContext.Provider>
  );
}
