import { Box, Grow } from "@mui/material";
import React, { useDebugValue } from "react";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import ImageIcon from "@mui/icons-material/Image";
import { removeImage } from "../../Features/form/formSlice";

function PreviewImages() {
  const images = useSelector((state) => state?.formRed?.form?.images);
  const dispatch = useDispatch();

  const deleteImage = (index) => {
    dispatch(removeImage(index));
  };

  return (
    <>
      <TransitionGroup className="grid w-[360px] gap-2 grid-cols-3 grid-row-3 overflow-hidden max-h-[350px] overflow-y-scroll">
        {images?.length <= 0 && (
          <div className="w-full h-[100px] flex justify-center items-center border border-1 border-light-black rounded-lg">
            <ImageIcon className="w-[40px] h-[40px] text-dark-black" />
          </div>
        )}
        {images?.map((img, inx) => (
          <Grow
            className="w-full h-[100px] bg-light-black rounded-lg relative group cursor-pointer"
            key={img?.path}
          >
            <div onClick={() => deleteImage(inx)}>
              <Delete className="absolute left-0 right-0 z-10 h-full m-auto text-white transition-opacity opacity-0 group-hover:opacity-100" />
              <img
                className="z-20 object-contain w-full h-full rounded-lg group-hover:brightness-50"
                alt="img"
                src={URL.createObjectURL(img)}
              />
            </div>
          </Grow>
        ))}
      </TransitionGroup>
    </>
  );
}

export default PreviewImages;
