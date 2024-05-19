import React from "react";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Img } from "react-image";
import ImageIcon from "@mui/icons-material/Image";
import { removeImage } from "../../Features/form/formSlice";
import { CircularProgress } from "@mui/material";

function PreviewImages() {
  const images = useSelector((state) => state?.formRed?.form?.progress);
  const dispatch = useDispatch();

  const deleteImage = (index) => {
    dispatch(removeImage(index));
  };

  return (
    <>
      <div className="grid w-[360px] gap-2 grid-cols-3 grid-row-3 overflow-hidden max-h-[350px] overflow-y-scroll">
        {images?.length <= 0 && (
          <div className="w-full h-[100px] flex justify-center items-center border border-1 border-light-black rounded-lg">
            <ImageIcon className="w-[40px] h-[40px] text-dark-black" />
          </div>
        )}

        {images?.map((img, inx) => {
          if (!img.file_url) {
            return (
              <div className="w-full h-[100px] border border-light-black rounded-lg relative group cursor-pointer flex items-center text-2xl text-light-black font-semibold">
                {img?.progress < 100 ? (
                  <p className="w-full text-center">{img?.progress}</p>
                ) : (
                  <CircularProgress className="w-full text-center" />
                )}
              </div>
            );
          } else {
            return (
              <div
                className="w-full h-[100px] bg-light-black rounded-lg relative group cursor-pointer flex items-center justify-center"
                key={img.file}
              >
                <div onClick={() => deleteImage(inx)}>
                  <Delete className="absolute left-0 right-0 z-10 h-full m-auto text-white transition-opacity opacity-0 group-hover:opacity-100" />
                  <Img
                    loader={
                      <CircularProgress className="text-center text-white" />
                    }
                    className="z-20 object-contain w-full h-full rounded-lg group-hover:brightness-50"
                    alt="img"
                    src={img?.file_url}
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default PreviewImages;
