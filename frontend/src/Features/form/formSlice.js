import { createSlice } from "@reduxjs/toolkit";
import useMultipleFileUpload from "../../hooks/useMultipleFileUpload";

const initialState = {
  form: {
    images: [],
    progress: [],
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.form.images.push(action.payload);
    },
    addProgress: (state, action) => {
      const currData = [...state.form.progress];

      currData.push(action.payload);

      state.form.progress = currData;
    },

    updateProgress: (state, action) => {
      const currData = [...state.form.progress];

      const updatedData = currData.map((upload) =>
        upload.file === action.payload.file
          ? { ...upload, progress: action.payload.progress, ...action.payload }
          : upload
      );

      state.form.progress = updatedData;
    },
    removeImage: (state, action) => {
      const filteredImages = state.form.images.filter(
        (img, index) => index !== action.payload
      );

      state.form.images = filteredImages;
    },
  },
});

export const { addImage, removeImage, addProgress, updateProgress } =
  formSlice.actions;

export default formSlice.reducer;
