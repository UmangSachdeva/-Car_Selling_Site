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
  },
});

export const { addAuth } = authSlice.actions;

export default authSlice.reducer;
