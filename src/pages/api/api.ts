import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query";

const instance = axios.create({
  baseURL: `https://api.coinpaprika.com/v1/`,
  withCredentials: false,
});

export const getAllCoins = () =>
  instance.get("coins").then((res) => res.data.slice(0, 100));

export const getCoinInfo = ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;
  if (id) {
    return instance.get(`coins/${id}`).then((res) => res.data);
  }
};
export const getCoinTicker = ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;
  if (id) {
    return instance.get(`tickers/${id}`).then((res) => res.data);
  }
};

export const getCoinHistory = ({ queryKey }: QueryFunctionContext) => {
  const [_, coinId] = queryKey;
  if (coinId) {
    return instance
      .get(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
      .then((res) => res.data);
  }
};
