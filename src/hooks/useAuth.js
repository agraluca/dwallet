import { useCallback, useEffect, useState } from "react";

import { removeItemFromStorage, getToken } from "services/localStorageService";
import { useRouter } from "next/dist/client/router";
import { removeCookies } from "services/cookiesService";
import jwtDecode from "jwt-decode";
import { fetchToken, registerUser } from "store/fetchActions/fetchAuth";
import { useAppDispatch } from "./useReduxHooks";

export default function useAuth() {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const token = getToken();
    const decodedToken = token && jwtDecode(token);
    setUsername(decodedToken?.name);
    setEmail(decodedToken?.email);
    setId(decodedToken?.id);
  }, []);

  const signIn = useCallback(
    async (formValues) => {
      const data = await dispatch(fetchToken(formValues));

      if (data) {
        return push("/home");
      }
    },
    [dispatch, push]
  );

  const signUp = useCallback(
    async (formValues) => {
      const data = await dispatch(registerUser(formValues));

      if (data) {
        return push("/");
      }
    },
    [dispatch, push]
  );

  const logOut = useCallback(() => {
    removeItemFromStorage("token");
    removeItemFromStorage("refresh_token");
    removeCookies();

    push("/");
  }, [push]);

  return {
    username,
    email,
    id,
    signIn,
    signUp,
    logOut,
  };
}
