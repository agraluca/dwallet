import { combineReducers } from "@reduxjs/toolkit";
import { cashFlowReducer } from "./ducks/cashFlow";
export const rootReducer = combineReducers({ cashFlow: cashFlowReducer });
