import axios from "axios";

// Create a new Axios instance with default configuration
const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,

});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");


    if (token) {
      config.headers = {
        ...(config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        })
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosPrivate;
