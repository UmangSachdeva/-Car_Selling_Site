import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    images: [],
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addImage: (state, action) => {
      const prevImages = [...state.form.images, ...action.payload] || [];

      state.form.images = prevImages;
    },
    removeImage: (state, action) => {
      const filteredImages = state.form.images.filter(
        (img, index) => index !== action.payload
      );

      state.form.images = filteredImages;
    },
  },
});

export const { addImage, removeImage } = formSlice.actions;

export default formSlice.reducer;
