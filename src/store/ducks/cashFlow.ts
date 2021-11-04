import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  totalIncome: 0,
  variableIncome: 0,
  fixedIncome: 0,
  variableIncomeList: [
    {
      stock: "WEGE3",
      type: "Ação",
      price: 10,
      idealPorcentage: 10,
      currentPorcentage: 0,
      stockAmount: 1,
      shouldBuyAmount: 0,
      status: "Segurar",
    },
    {
      stock: "ITUB3",
      type: "Ação",
      price: 15.5,
      idealPorcentage: 8,
      currentPorcentage: 8,
      stockAmount: 10,
      shouldBuyAmount: 0,
      status: "Segurar",
    },
  ],
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
      state.totalIncome =
        Number(state.fixedIncome) + Number(state.variableIncome);
    },
    updateVariableIncomeList: (state) => {
      state.variableIncomeList = state.variableIncomeList.map((data) => {
        const currentPorcentage = (
          ((Number(data.price) * Number(data.stockAmount)) /
            ((state.totalIncome * state.variableIncome) / state.totalIncome)) *
          100
        ).toFixed(2);

        const status = Number(currentPorcentage) < Number(data.idealPorcentage);

        const result1 =
          Number(data.idealPorcentage / 100) * state.variableIncome;
        const result2 = Number(data.price) * Number(data.stockAmount);
        const result3 =
          (1 - Number(data.idealPorcentage / 100)) * Number(data.price);

        return {
          stock: data.stock,
          type: data.type,
          price: Number(data.price),
          idealPorcentage: Number(data.idealPorcentage),
          currentPorcentage: Number(currentPorcentage),
          stockAmount: Number(data.stockAmount),
          shouldBuyAmount: status
            ? Math.ceil((result1 - result2) / result3)
            : 0,
          //  ((%ideal * totalRv) - (preco * qtd)) / (1-%ideal) * preco
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

        const result1 =
          Number(data.idealPorcentage / 100) * state.fixedIncome -
          Number(data.totalPrice);
        const result2 = 1 - Number(data.idealPorcentage / 100);

        return {
          name: data.name,
          idealPorcentage: Number(data.idealPorcentage),
          currentPorcentage: Number(currentPorcentage),
          totalPrice: Number(data.totalPrice),
          shouldBuyPrice: status ? Math.ceil(result1 / result2) : 0,
          status: status ? "Comprar" : "Segurar",
        };
      });
    },
    reset: () => initialState,
    addNewValueToVariableIncomeList: (
      state,
      action: PayloadAction<VariableIncomeListProps>
    ) => {
      state.variableIncomeList = [...state.variableIncomeList, action.payload];
    },
    addNewValueToFixedIncomeList: (
      state,
      action: PayloadAction<FixedIncomeListProps>
    ) => {
      state.fixedIncomeList = [...state.fixedIncomeList, action.payload];
    },
    editVariableIncomeList: (
      state,
      action: PayloadAction<VariableIncomeListProps[]>
    ) => {
      state.variableIncomeList = [...action.payload];
    },
  },
});

export const cashFlowReducer = cashFlowSlice.reducer;
export const cashFlowActions = cashFlowSlice.actions;
