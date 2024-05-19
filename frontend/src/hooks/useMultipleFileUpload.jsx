import { useState } from "react";
import axiosPrivate from "../axios_config/axiosPrivate";
import { useDispatch } from "react-redux";
import { addProgress, updateProgress } from "../Features/form/formSlice";

const useMultipleFileUpload = () => {
  const dispatch = useDispatch();

  const [uploads, setUploads] = useState([]);

  const uploadFiles = async (file) => {
    dispatch(addProgress({ file: file.name, progress: 0 }));

    const formData = new FormData();
    console.log(file);
    formData.append("image", file);

    try {
      const response = await axiosPrivate.post("/cars/upload", formData, {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          dispatch(
            updateProgress({ file: file.name, progress: percentCompleted })
          );
        },
      });

      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  return { uploads, uploadFiles };
};

export default useMultipleFileUpload;
