import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, action) => {
      const messages = [...state.messages, action.payload];

      state.messages = messages;
    },
    setMessagesGlobal: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessages, setMessagesGlobal } = messageSlice.actions;

export default messageSlice.reducer;
