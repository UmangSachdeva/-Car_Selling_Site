import axiosPrivate from "../../axios_config/axiosPrivate";

export const addForm = async (data) => {
  try {
    return await axiosPrivate.post(`/cars`, data);
  } catch (err) {
    console.log(err);
  }
};
