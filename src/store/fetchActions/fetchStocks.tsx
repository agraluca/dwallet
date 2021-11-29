import { api } from "services/axios";
import { Stock } from "utils/types";
import { AppDispatch } from "store/store";
import { loadingActions } from "store/ducks/loading";

import toast from "react-hot-toast";
import Toast from "components/Toast";

export const getDetailStock = (tickerName: string) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;
    dispatch(startLoading("getDetailStockLoading"));
    try {
      const res = await api.get<Stock>(`/stock/${tickerName}`);
      return res.data;
    } catch (err) {
      toast.custom(<Toast title={err.response.data.error} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("getDetailStockLoading"));
    }
  };
};
