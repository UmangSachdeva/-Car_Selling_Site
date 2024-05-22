import axiosPrivate from "../../axios_config/axiosPrivate";
import { toast } from "react-hot-toast";

export const addForm = async (data) => {
  const toastIdSignup = toast.loading("Adding your car..");
  try {
    const ans = await axiosPrivate.post(`/cars`, data);

    toast.success("Car added successfully", {
      id: toastIdSignup,
    });

    return ans;
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong", {
      id: toastIdSignup,
    });
  }
};
