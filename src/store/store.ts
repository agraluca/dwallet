import { configureStore } from "@reduxjs/toolkit";
import { cashFlowReducer } from "./ducks/cashFlow";
import { loadingReducer } from "./ducks/loading";

export const store = configureStore({
  reducer: { cashFlow: cashFlowReducer, loading: loadingReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
