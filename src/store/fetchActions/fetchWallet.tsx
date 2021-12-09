import { api } from "services/axios";
import { AppDispatch } from "store/store";
import { loadingActions } from "store/ducks/loading";

import toast from "react-hot-toast";
import Toast from "components/Toast";
import { cashFlowActions } from "store/ducks/cashFlow";
import { TableDataRvProps } from "components/Table/RvTable";
import { AxiosResponse } from "axios";
import { TableDataRfProps } from "components/Table/RfTable";

type WalletProps = {
  companyName: string;
  formattedPrice: string;
  qtd: number;
  tickerName: string;
  tickerType: string;
  _id: string;
};

type FixedIncomeWalletProps = {
  currentPorcentage: number;
  idealPorcentage: number;
  name: string;
  shouldBuyPrice: number;
  status: string;
  totalPrice: number;
  _id: string;
};

type UserWalletProps = {
  msg: string;
  userWallet: {
    id: string;
    wallet: WalletProps[];
    walletFixedIncome: FixedIncomeWalletProps[];
  };
};

type ResponseProps = {
  msg: string;
};

type WalletEditProps = {
  wallet: TableDataRvProps[];
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
      getAndUpdateFixedIncomeList,
    } = cashFlowActions;

    dispatch(startLoading("getWalletLoading"));
    try {
      const response = await api.get<UserWalletProps>(`/wallet/get`);
      if (response.status === 201) {
        toast.custom(<Toast title={response.data.msg} type="info" />, {
          position: "top-right",
        });
      }

      if (response.data.userWallet) {
        dispatch(
          getAndUpdateVariableIncomeList(response.data.userWallet.wallet)
        );

        dispatch(
          getAndUpdateFixedIncomeList(
            response.data.userWallet.walletFixedIncome
          )
        );
        dispatch(updateFixedIncome());
        dispatch(updateVariableIncome());
        dispatch(updateTotalIncome());
        dispatch(updateVariableIncomeList());
        dispatch(updateFixedIncomeList());
      }

      return response.data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Ocorreu um erro inesperado 1";
      toast.custom(<Toast title={errorMessage} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("getWalletLoading"));
    }
  };
};

export const addFixedIncomeToUserWallet = (newValue: TableDataRfProps) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("addWalletLoading"));
    try {
      const res: AxiosResponse = await api.post(
        `/walletFixedIncome/add`,
        newValue
      );
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
      dispatch(finishLoading("addWalletLoading"));
    }
  };
};

export const editFixedIncomeWallet = (
  walletFixedIncome: TableDataRfProps[]
) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("editWalletLoading"));
    try {
      const res: AxiosResponse = await api.put(`/walletFixedIncome/update`, {
        walletFixedIncome,
      });
      const { msg } = res.data as ResponseProps;
      dispatch(fetchUserWallet());
      toast.custom(<Toast title={msg} type="success" />, {
        position: "top-right",
      });

      return res.data as WalletEditProps;
    } catch (error) {
      let message = "Ocorreu um erro inesperado";
      if (error.response) {
        message = error.response.data.msg[0].msg;
      }

      toast.custom(<Toast title={message} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("editWalletLoading"));
    }
  };
};

export const removeItemFromFixedIncomeWallet = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("removeWalletLoading"));
    try {
      const res = await api.delete(`/walletFixedIncome/remove/${id}`);
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

export const addVariableIncomeToUserWallet = (newValue: TableDataRvProps) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("addWalletLoading"));
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
      dispatch(finishLoading("addWalletLoading"));
    }
  };
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
