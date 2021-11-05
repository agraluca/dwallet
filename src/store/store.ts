import { configureStore } from "@reduxjs/toolkit";
import { cashFlowReducer } from "./ducks/cashFlow";

export const store = configureStore({
  reducer: { cashFlow: cashFlowReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
