import axios from "axios";
import { Stock } from "utils/types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getOneStock = (tickerName: string) => {
  return api.get<Stock>(`/stock/${tickerName}`);
};

export const getAllStocks = () => {
  return api.get<Stock[]>("/stock");
};
