import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  auth: { id: 1, user: {} },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      const auth = {
        id: nanoid(),
        user: action.payload,
      };

      state.auth = auth;
    },
    removeAuth: (state, action) => {
      state.auth = initialState;
    },
  },
});

export const { addAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
