import axios from "axios";

export const getReviews = (id) => {
  return axios.get(`${import.meta.env.REACT_APP_BASE_URL}/ratings/:id`);
};
