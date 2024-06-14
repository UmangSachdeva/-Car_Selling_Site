import React, { useEffect, useState } from "react";
import { Avatar, Rating } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getReviews } from "../../api/reviews/getReviews";
import { submitReview } from "../../api/reviews/submitReview";
import { useParams } from "react-router-dom";
import { setReviews } from "../../Features/reviews/reviewsSlice";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 50,
      height: 50,
    },
    children: `${name.charAt(0).toUpperCase()}`,
  };
};

function Feedback() {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const reviews = useSelector((state) => state?.reviewsRed?.reviews);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reload, setReload] = useState(false);

  const onReviewChange = (e) => {
    setReview(e.target.value);
  };

  const dispatch = useDispatch();

  const getReviewsFn = async () => {
    const reviews = await getReviews(params.id);
    console.log(reviews);
    dispatch(setReviews(reviews?.data?.data));
  };

  const giveFeedback = async () => {
    await submitReview({
      rating,
      message: review,
      postId: params.id,
    });

    setReload((prev) => !prev);
  };

  const onRatingChange = async (e) => {
    setRating(e.target.value);
  };

  useEffect(() => {
    getReviewsFn();
  }, [reload]);

  return (
    <section style={{ padding: "60px 0" }}>
      <div className="section-head">
        <span className="section-sub">CUSTOMER FEEDBACKS</span>

        <p className="section-main">Ratings.</p>
      </div>

      <div className="w-full py-5 border-b-2 border-black feedback-input mobile:flex-col mobile:gap-4">
        <div className="w-full gap-4 input-box">
          {user?.f_name ? (
            <Avatar {...stringAvatar(user.f_name + " " + user.l_name)} />
          ) : (
            <Avatar sx={{ bgcolor: "#212529", width: 50, height: 50 }}>
              <ion-icon name="person-outline"></ion-icon>
            </Avatar>
          )}
          <input
            className="w-full p-2 text-lg border-2 border-gray-700 rounded"
            type="text"
            placeholder="Write a review..."
            name=""
            id=""
            onChange={(e) => onReviewChange(e)}
          />
        </div>
        <div className="justify-center w-full gap-2">
          <Rating
            name="size-large"
            defaultValue={rating}
            onChange={(e) => onRatingChange(e)}
            size="large"
            style={{ fontSize: "40px" }}
          />
        </div>

        <button
          onClick={() => giveFeedback()}
          className="w-[30%] bg-zinc-800 rounded text-white hover:bg-zinc-700 duration-500 hover:drop-shadow-2xl mobile:w-full p-4"
        >
          Give Feedback
        </button>
      </div>

      {reviews?.map((usr, index) => (
        <div className="py-4 text-left w-fit" key={index}>
          <div>
            <div className="flex gap-3 align-middle">
              <Avatar
                {...stringAvatar(usr?.userId?.f_name)}
                sx={{ width: 45, height: 45 }}
              />
              <div>
                <span className="text-lg capitalize">
                  {usr?.userId?.f_name}
                </span>
                <div className="flex gap-2">
                  <span>
                    <Rating
                      name="size-large"
                      defaultValue={usr?.rating}
                      size="small"
                      readOnly
                    />
                  </span>
                  <span className="text-sm italic">24 Jun 2022</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-light-yellow ">{usr?.message}</div>
        </div>
      ))}
    </section>
  );
}

export default Feedback;
