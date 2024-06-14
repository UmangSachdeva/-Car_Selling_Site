import axios from "axios";

export const getReviews = (id) => {
  return axios.get(`${import.meta.env.VITE_APP_BASE_URL}/ratings/${id}`);
};
