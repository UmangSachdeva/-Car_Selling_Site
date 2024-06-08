import axios from "axios";

export const connectSeller = async (id) => {
  return await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/chats/`, {
    userId: id,
  });
};
