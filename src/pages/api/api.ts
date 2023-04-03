import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.coinpaprika.com/v1/`,
  withCredentials: false,
});

export const getAllCoins = () =>
  instance.get("coins").then((res) => res.data.slice(0, 100));
