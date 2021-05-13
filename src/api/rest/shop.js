import axios from "../interceptor";

export const getShops = () => {
  return axios("shop/all");
};
