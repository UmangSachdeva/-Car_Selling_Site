import axios from "axios";

// Create a new Axios instance with default configuration
const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosPrivate;
