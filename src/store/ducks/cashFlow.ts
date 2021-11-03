import { createSlice /*PayloadAction */ } from "@reduxjs/toolkit";
//import type { RootState } from "../store";

interface VariableIncomeListProps {
  stock: string;
  type: string;
  price: number;
  idealPorcentage: number;
  currentPorcentage: number;
  stockAmount: number;
  shouldBuyAmount: number;
  status: string;
}

interface FixedIncomeListProps {
  name: string;
  idealPorcentage: number;
  currentPorcentage: number;
  totalPrice: number;
  shouldBuyPrice: number;
  status: string;
}

interface CashFlowProps {
  totalIncome: number;
  variableIncome: number;
  fixedIncome: number;
  variableIncomeList: VariableIncomeListProps[];
  //setTableDataRv: (value: TableDataRvProps[]) => void;
  fixedIncomeList: FixedIncomeListProps[];
  //setTableDataRf: (value: TableDataRfProps[]) => void;
}

const initialState: CashFlowProps = {
  totalIncome: 10,
  variableIncome: 0,
  fixedIncome: 0,
  variableIncomeList: [],
  fixedIncomeList: [],
};

const cashFlowSlice = createSlice({
  name: "cashFlow",
  initialState,
  reducers: {
    updateVariableIncome: (state) => {
      state.variableIncome = state.variableIncomeList.reduce((acc, curr) => {
        acc += curr.price * curr.stockAmount;
        return acc;
      }, 0);
    },
    updateFixedIncome: (state) => {
      state.fixedIncome = state.fixedIncomeList.reduce((acc, curr) => {
        acc += curr.totalPrice;
        return acc;
      }, 0);
    },
    updateTotalIncome: (state) => {
      state.totalIncome = state.fixedIncome + state.variableIncome;
    },
    updateVariableIncomeList: (state) => {
      state.variableIncomeList = state.variableIncomeList.map((data) => {
        const currentPorcentage = (
          ((Number(data.price) * Number(data.stockAmount)) /
            ((state.totalIncome * state.variableIncome) / state.totalIncome)) *
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
    },
    updateFixedIncomeList: (state) => {
      state.fixedIncomeList = state.fixedIncomeList.map((data) => {
        const currentPorcentage = (
          (Number(data.totalPrice) /
            ((state.totalIncome * state.fixedIncome) / state.totalIncome)) *
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
    },
  },
});

export const cashFlowReducer = cashFlowSlice.reducer;
export const cashFlowActions = cashFlowSlice.actions;
