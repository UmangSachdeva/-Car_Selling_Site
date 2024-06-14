import axios from "axios";
import * as actions from "../api";
import axiosPrivate from "../../axios_config/axiosPrivate";

const api =
  ({ dispatch }) =>
    (next) =>
      async (action) => {
        if (action.type !== actions.apiCallBegan.type) return next(action);

        const { url, method, data, onStart, onSuccess, onError } = action.payload;

        if (onStart) dispatch({ type: onStart });

        next(action);

        try {
          const response = await axiosPrivate.request({
            baseURL: import.meta.env.VITE_APP_BASE_URL,
            url,
            method,
            data,
          });

 

          // General
          dispatch(actions.apiCallSucess(response.data));
          // Specific
          if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
        } catch (error) {
          // General
          dispatch(actions.apiCallFailed(error?.response?.data?.message));
          // Specific

          if (onError) dispatch({ type: onError, payload: error?.response?.data?.message });
        }
      };

export default api;
