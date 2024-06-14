import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../../Redux/api";
import { useSelector } from "react-redux";

const initialState = {
    chats: [],
    loading: false,
};

export const chatSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        connectChat: (products, action) => {
            products.loading = true;
        },
        chatReqRecieved: (products, action) => {
            products.success = true;
            products.loading = false;
        },
        chatReqFailed: (products, action) => {
            products.error = action.payload;
            products.loading = false;
        },
        resetChat: (state, action) => {
            state.success = false;
            state.error = false;
            state.loading = false;
        }

    },
});

export default chatSlice.reducer;

export const {
    connectChat, chatReqFailed, chatReqRecieved, resetChat
} = chatSlice.actions;

export const connetBuyers = (slug, body) => (dispatch) => {
    let url = "/chats/" + slug;



    return dispatch(
        apiCallBegan({
            url,
            method: 'POST',
            data: body,
            onStart: connectChat.type,
            onSuccess: chatReqRecieved.type,
            onError: chatReqFailed.type,
        })
    );
};
