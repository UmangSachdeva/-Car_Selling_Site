import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import messageReducer from "../Features/messages/messageSlice";
import reviewsReducer from "../Features/reviews/reviewsSlice";
import formReducer from "../Features/form/formSlice";
import chatReducer from "../Features/chat/chatSlice"
// import { getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import api from "./middleware/api";
import productSlice from "../Features/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messageRed: messageReducer,
    reviewsRed: reviewsReducer,
    formRed: formReducer,
    productRed: productSlice,
    chatRed: chatReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});

export default store;
