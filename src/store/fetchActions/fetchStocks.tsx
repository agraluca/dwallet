import { api } from "services/axios";
import { Stock } from "utils/types";
import { AppDispatch } from "store/store";
import { loadingActions } from "store/ducks/loading";

import toast from "react-hot-toast";
import Toast from "components/Toast";

export const getAllStocks = () => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("getAllStocksLoading"));
    try {
      const res = await api.get<Stock[]>(`/stock`);
      return res;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Ocorreu um erro inesperado";
      toast.custom(<Toast title={errorMessage} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("getAllStocksLoading"));
    }
  };
};

export const getDetailStock = (tickerName: string) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;
    dispatch(startLoading("getDetailStockLoading"));
    try {
      const res = await api.get<Stock>(`/stock/${tickerName}`);
      return res.data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Ocorreu um erro inesperado";

      toast.custom(<Toast title={errorMessage} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("getDetailStockLoading"));
    }
  };
};
