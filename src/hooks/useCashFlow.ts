import { useContext } from "react";
import { CashFlowContext } from "contexts";

export const useCashFlow = () => useContext(CashFlowContext);
