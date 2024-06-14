import axios from "axios";
import axiosPrivate from "../../axios_config/axiosPrivate";
import { useDispatch } from "react-redux";
import { setReviews } from "../../Features/reviews/reviewsSlice";
import toast from "react-hot-toast";

export const submitReview = async (data) => {
    const toastId = toast.loading("Submiting your review..");

    try {
        const ans = await axiosPrivate.post(`/ratings/${data.postId}`, data);

        toast.success("review submitted successfully", {
            id: toastId,
        });

        return ans;
    } catch (err) {

        toast.error(err?.response?.data?.message, {
            id: toastId,
        });
    }
}