import { api } from "services/axios";
import { AppDispatch } from "store/store";
import { loadingActions } from "store/ducks/loading";

import toast from "react-hot-toast";
import Toast from "components/Toast";
import { cashFlowActions } from "store/ducks/cashFlow";
import { TableDataRvProps } from "components/Table/RvTable";

type WalletProps = {
  companyName: string;
  formattedPrice: string;
  qtd: number;
  tickerName: string;
  tickerType: string;
  _id: string;
};

type UserWalletProps = {
  msg: string;
  userWallet: {
    id: string;
    wallet: WalletProps[];
  };
};

export const fetchUserWallet = () => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;
    const { getAndUpdateVariableIncomeList, updateVariableIncomeList } =
      cashFlowActions;

    dispatch(startLoading("getWalletLoading"));
    try {
      const res = await api.get<UserWalletProps>(`/wallet/get`);

      dispatch(getAndUpdateVariableIncomeList(res.data.userWallet.wallet));
      dispatch(updateVariableIncomeList());
      return res.data;
    } catch (err) {
      toast.custom(<Toast title={err?.response?.data?.msg} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("getWalletLoading"));
    }
  };
};

export const addVariableIncomeToUserWallet = (newValue: TableDataRvProps) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("postWalletLoading"));
    try {
      const res = await api.post<unknown>(`/wallet/add`, newValue);

      dispatch(fetchUserWallet());

      return res.data;
    } catch (err) {
      toast.custom(<Toast title={err?.response?.data?.msg} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("postWalletLoading"));
    }
  };
};

export const editVariableIncomeWallet = (wallet: TableDataRvProps[]) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("editWalletLoading"));
    try {
      const res = await api.put<unknown>(`/wallet/update`, { wallet });

      dispatch(fetchUserWallet());

      return res.data;
    } catch (err) {
      toast.custom(<Toast title={err?.response?.data?.msg} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("editWalletLoading"));
    }
  };
};

export const removeItemFromVariableIncomeWallet = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("removeWalletLoading"));
    try {
      const res = await api.delete(`/wallet/remove/${id}`);

      dispatch(fetchUserWallet());

      return res;
    } catch (err) {
      toast.custom(<Toast title={err?.response?.data?.msg} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("removeWalletLoading"));
    }
  };
};
