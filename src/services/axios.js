import axios from "axios";
import {
  getRefreshToken,
  getToken,
  setRefreshToken,
  setToken,
} from "./localStorageService";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + JSON.parse(token);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== "/auth/refresh" && error.response) {
      if (error.response.status === 401) {
        try {
          const refreshToken = getRefreshToken();
          const refreshResponse = await api.post("/auth/refresh", {
            refreshToken,
          });
          const { token: newToken, refreshToken: newRefreshToken } =
            refreshResponse.data;
          setToken(newToken);
          setRefreshToken(newRefreshToken);
        } catch (err) {
          console.error(err);
        }
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);