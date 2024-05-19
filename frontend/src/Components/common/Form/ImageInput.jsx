import { Publish, UploadFile } from "@mui/icons-material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addImage,
  addProgress,
  updateProgress,
} from "../../../Features/form/formSlice";
import useMultipleFileUpload from "../../../hooks/useMultipleFileUpload";

function ImageInput({ name }) {
  const { register } = useFormContext();
  const dispatch = useDispatch();
  const { uploadFiles } = useMultipleFileUpload();

  const onDrop = useCallback(async (acceptedFiles) => {
    // Upload File

    console.log(acceptedFiles);
    const result = await uploadFiles(acceptedFiles[0]);
    // Add images
    console.log(result);
    dispatch(
      updateProgress({
        file: acceptedFiles[0].name,
        progress: 100,
        file_url: result.result.secure_url,
      })
    );
    dispatch(addImage(result.result.secure_url));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="p-4 border-2 border-dashed rounded-lg border-light-black w-[350px] h-[350px]">
      <div
        {...getRootProps()}
        className="flex items-center justify-center w-full h-full transition-transform"
      >
        <input {...register()} {...getInputProps()} className="w-full h-full" />
        {isDragActive ? (
          <div className="relative z-10 flex flex-col items-center gap-2 rounded-full ">
            <div className="p-4 bg-theme-yellow animate-bounce w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <Publish className="" />
            </div>

            <p className="text-lg font-bold text-dark-black">
              Drop the files here ...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <UploadFile className="w-[70px] h-[70px]" />
            <p className="text-xl font-bold">Drag file(s) here to upload</p>
            <p className="text-base text-light-black">
              Alertnatively, you can upload the file by
            </p>
            <p className="text-base font-bold cursor-pointer text-dark-black hover:underline">
              Clicking here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageInput;
