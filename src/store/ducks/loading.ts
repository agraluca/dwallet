import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingProps = {
  getAllStocksLoading: boolean;
  getWalletLoading: boolean;
  removeWalletLoading: boolean;
  editWalletLoading: boolean;
  addWalletLoading: boolean;
  getDetailStockLoading: boolean;
  getTokenLoading: boolean;
  registerUserLoading: boolean;
};

type LoadingActionProps = keyof LoadingProps;

const initialState: LoadingProps = {
  getAllStocksLoading: false,
  getWalletLoading: false,
  removeWalletLoading: false,
  editWalletLoading: false,
  addWalletLoading: false,
  getDetailStockLoading: false,
  getTokenLoading: false,
  registerUserLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<LoadingActionProps>) => {
      return (state = {
        ...state,
        [action.payload]: true,
      });
    },
    finishLoading: (state, action: PayloadAction<LoadingActionProps>) => {
      return (state = {
        ...state,
        [action.payload]: false,
      });
    },
  },
});

export const loadingReducer = loadingSlice.reducer;
export const loadingActions = loadingSlice.actions;
