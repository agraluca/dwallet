import { createContext, ReactNode, useEffect, useState } from "react";

export type TableDataRvProps = {
  stock: string;
  type: string;
  price: number;
  idealPorcentage: number;
  currentPorcentage: number;
  stockAmount: number;
  shouldBuyAmount: number;
  status: string;
};

export type TableDataRfProps = {
  name: string;
  idealPorcentage: number;
  currentPorcentage: number;
  totalPrice: number;
  shouldBuyPrice: number;
  status: string;
};

export type CashFlowProps = {
  total: number;
  rf: number;
  rv: number;
  tableDataRv: TableDataRvProps[];
  setTableDataRv: (value: TableDataRvProps[]) => void;
  tableDataRf: TableDataRfProps[];
  setTableDataRf: (value: TableDataRfProps[]) => void;
};

const cashFlowInitialValues = {
  total: 0,
  rf: 0,
  rv: 0,
  tableDataRv: [],
  setTableDataRv: () => null,
  tableDataRf: [],
  setTableDataRf: () => null,
};

export const CashFlowContext = createContext<CashFlowProps>(
  cashFlowInitialValues
);

export type CashFlowProviderProps = {
  children: ReactNode;
};

export function CashFlowProvider({ children }: CashFlowProviderProps) {
  const [total, setTotal] = useState(0);
  const [rf, setRf] = useState(0);
  const [rv, setRv] = useState(0);
  const [tableDataRv, setTableDataRv] = useState<TableDataRvProps[]>([
    {
      stock: "ABEV3",
      type: "Ação",
      price: 15,
      idealPorcentage: 8,
      currentPorcentage: 8,
      stockAmount: 10,
      shouldBuyAmount: 0,
      status: "Segurar",
    },
  ]);

  const [tableDataRf, setTableDataRf] = useState<TableDataRfProps[]>([
    {
      name: "CDB",
      idealPorcentage: 10,
      currentPorcentage: 10,
      totalPrice: 100,
      shouldBuyPrice: 0,
      status: "Segurar",
    },
  ]);

  useEffect(() => {
    setRv(
      tableDataRv?.reduce((acc, curr) => {
        acc += curr.price * curr.stockAmount;
        return acc;
      }, 0)
    );

    setRf(
      tableDataRf?.reduce((acc, curr) => {
        acc += curr.totalPrice;
        return acc;
      }, 0)
    );

    setTotal(rf + rv);
  }, [rf, rv, tableDataRf, tableDataRv, total]);

  useEffect(() => {
    console.log(rv);
    const updatedTableDataRv = tableDataRv.map((data) => {
      const currentPorcentage = (
        ((Number(data.price) * Number(data.stockAmount)) /
          ((total * rv) / total)) *
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
    setTableDataRv(updatedTableDataRv);

    const updatedTableDataRf = tableDataRf.map((data) => {
      const currentPorcentage = (
        (Number(data.totalPrice) / ((total * rf) / total)) *
        100
      ).toFixed(2);
      const status = Number(currentPorcentage) < Number(data.idealPorcentage);
      return {
        name: data.name,
        idealPorcentage: Number(data.idealPorcentage),
        currentPorcentage: Number(currentPorcentage),
        totalPrice: Number(data.totalPrice),
        shouldBuyPrice: status
          ? (Number(data.idealPorcentage) * Number(data.totalPrice)) /
              Number(currentPorcentage) -
            Number(data.totalPrice)
          : 0,
        status: status ? "Comprar" : "Segurar",
      };
    });
    setTableDataRf(updatedTableDataRf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, tableDataRv.length, tableDataRf.length]);

  return (
    <CashFlowContext.Provider
      value={{
        total,
        rf,
        rv,
        tableDataRv,
        setTableDataRv,
        tableDataRf,
        setTableDataRf,
      }}
    >
      {children}
    </CashFlowContext.Provider>
  );
}
