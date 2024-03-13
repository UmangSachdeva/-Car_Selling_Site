import axios from "axios";

export const getProductList = () => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/cars/`);
};

export const getProductBySlug = (id) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/cars/${id}`);
};
