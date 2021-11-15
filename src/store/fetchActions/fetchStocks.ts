import { api } from "services/axios";
import { Stock } from "utils/types";
import { AppDispatch } from "store/store";
import { loadingActions } from "store/ducks/loading";

import toast from "react-hot-toast";

export const getAllStocks = () => {
  return async (dispatch: AppDispatch) => {
    const { loadingStatus } = loadingActions;
    dispatch(loadingStatus({ name: "getAllStocksLoading", value: true }));
    try {
      const res = await api.get<Stock[]>(`/stock`);
      return res;
    } catch (err) {
      console.log(err.response);
    }
    dispatch(loadingStatus({ name: "getAllStocksLoading", value: false }));
  };
};

export const getDetailStock = (tickerName: string) => {
  return async (dispatch: AppDispatch) => {
    const { loadingStatus } = loadingActions;
    dispatch(loadingStatus({ name: "getDetailStockLoading", value: true }));
    try {
      const res = await api.get<Stock>(`/stock/${tickerName}`);
      return res.data;
    } catch (err) {
      toast.error(err.response.data.error);
    }
    dispatch(loadingStatus({ name: "getDetailStockLoading", value: false }));
  };
};
