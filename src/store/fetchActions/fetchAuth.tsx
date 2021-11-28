import { api } from "services/axios";
import { AppDispatch } from "store/store";
import { loadingActions } from "store/ducks/loading";
import { setToken, setRefreshToken } from "services/localStorageService";

import toast from "react-hot-toast";
import Toast from "components/Toast";

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
      const res = await api.post<unknown>(`/auth/signin`, formValues);
      const { token, refreshToken } = res.data as ResponseTokenProps;
      setToken(token);
      setRefreshToken(refreshToken);

      return res.data;
    } catch (err) {
      toast.custom(<Toast title={err?.response?.data?.msg} type="warning" />, {
        position: "top-right",
      });
      return false;
    } finally {
      dispatch(finishLoading("getTokenLoading"));
    }
  };
};
