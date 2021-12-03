import { api } from "services/axios";
import { AppDispatch } from "store/store";
import { loadingActions } from "store/ducks/loading";
import { setToken, setRefreshToken } from "services/localStorageService";
import { AxiosResponse } from "axios";

import toast from "react-hot-toast";
import Toast from "components/Toast";
import { setCookies } from "services/cookiesService";

type FormValuesProps = {
  email: string;
  password: string;
};

type ResponseTokenProps = {
  msg: string;
  token: string;
  refreshToken: string;
};

export const fetchToken = (formValues: FormValuesProps) => {
  return async (dispatch: AppDispatch) => {
    const { startLoading, finishLoading } = loadingActions;

    dispatch(startLoading("getTokenLoading"));
    try {
      const res: AxiosResponse = await api.post(`/auth/signin`, formValues);
      const { token, refreshToken } = res.data as ResponseTokenProps;
      setToken(token);
      setRefreshToken(refreshToken);
      setCookies(token, refreshToken);

      return res.data;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || "Ocorreu um erro inesperado";
      toast.custom(<Toast title={errorMessage} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("getTokenLoading"));
    }
  };
};
