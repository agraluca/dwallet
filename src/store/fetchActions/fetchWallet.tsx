import { api } from "services/axios";
import { AppDispatch } from "store/store";
import { loadingActions } from "store/ducks/loading";

import toast from "react-hot-toast";
import Toast from "components/Toast";
import { cashFlowActions } from "store/ducks/cashFlow";
import { TableDataRvProps } from "components/Table/RvTable";
import { AxiosResponse } from "axios";

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

type ResponseProps = {
  msg: string;
};

export const fetchUserWallet = () => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;
    const {
      getAndUpdateVariableIncomeList,
      updateVariableIncomeList,
      updateFixedIncome,
      updateVariableIncome,
      updateTotalIncome,
      updateFixedIncomeList,
    } = cashFlowActions;

    dispatch(startLoading("getWalletLoading"));
    try {
      const res = await api.get<UserWalletProps>(`/wallet/get`);

      dispatch(getAndUpdateVariableIncomeList(res.data.userWallet.wallet));
      dispatch(updateFixedIncome());
      dispatch(updateVariableIncome());
      dispatch(updateTotalIncome());
      dispatch(updateVariableIncomeList());
      dispatch(updateFixedIncomeList());

      return res.data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Ocorreu um erro inesperado";
      toast.custom(<Toast title={errorMessage} type="warning" />, {
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
      const res: AxiosResponse = await api.post(`/wallet/add`, newValue);
      const { msg } = res.data as ResponseProps;
      dispatch(fetchUserWallet());
      toast.custom(<Toast title={msg} type="success" />, {
        position: "top-right",
      });

      return res.data as TableDataRvProps;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Ocorreu um erro inesperado";
      toast.custom(<Toast title={errorMessage} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("postWalletLoading"));
    }
  };
};

type WalletEditProps = {
  wallet: TableDataRvProps[];
};

export const editVariableIncomeWallet = (wallet: TableDataRvProps[]) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("editWalletLoading"));
    try {
      const res: AxiosResponse = await api.put(`/wallet/update`, {
        wallet,
      });
      const { msg } = res.data as ResponseProps;
      dispatch(fetchUserWallet());
      toast.custom(<Toast title={msg} type="success" />, {
        position: "top-right",
      });

      return res.data as WalletEditProps;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Ocorreu um erro inesperado";
      toast.custom(<Toast title={errorMessage} type="warning" />, {
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
      const { msg } = res.data as ResponseProps;
      dispatch(fetchUserWallet());

      toast.custom(<Toast title={msg} type="success" />, {
        position: "top-right",
      });

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
