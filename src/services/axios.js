import axios from "axios";
import { getToken } from "./localStorageService";

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
