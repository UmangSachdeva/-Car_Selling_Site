import axios from "axios";

export const getProductList = () => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/cars/`);
};

export const getProductBySlug = (id) => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/cars/${id}`);
};
