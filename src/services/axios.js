import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = window.localStorage("token");

    if (token) {
      config.headers["Authorization"] = "Bearer " + JSON.parse(token);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
