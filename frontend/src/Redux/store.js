import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import messageReducer from "../Features/messages/messageSlice";
import reviewsReducer from "../Features/reviews/reviewsSlice";
import formReducer from "../Features/form/formSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messageRed: messageReducer,
    reviewsRed: reviewsReducer,
    formRed: formReducer,
  },
});

export default store;
