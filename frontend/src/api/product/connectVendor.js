import axios from "axios";

export const connectSeller = async (id) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/chats/`, {
    userId: id,
  });
};
