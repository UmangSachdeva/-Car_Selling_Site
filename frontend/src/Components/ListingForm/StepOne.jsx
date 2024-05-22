import React, { useEffect } from "react";
import ImageInput from "../common/Form/ImageInput";
import PreviewImages from "./PreviewImages";
import Dropdown from "../common/Form/Dropdown";
import Input from "../common/Form/Input";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Publish, UploadFile } from "@mui/icons-material";
import { Img } from "react-image";
import { CircularProgress } from "@mui/material";
import { removeImage } from "../../Features/form/formSlice";
import { get, useFormContext } from "react-hook-form";

const limit = 3;

function StepOne() {
  const { setValue, formState: { errors } } = useFormContext();
  const imageArr = useSelector((state) => state?.formRed?.form?.images)
  const images = useSelector((state) => state?.formRed?.form?.progress);
  const dispatch = useDispatch();

  const error = get(errors, "images")

  const deleteImage = (index) => {
    dispatch(removeImage(index));
  };

  useEffect(() => {
    setValue("images", imageArr)
  }, [imageArr])

  console.log(errors);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-start justify-center gap-4">
        <p className="text-xs text-left capitalize text-[#d32f2f] mx-[14px] mt-[3px]">{error?.message}</p>

        {images.length <= limit ? (
          <ImageInput limit={limit} name="example-image" />
        ) : (
          <>
            {!images[limit]?.file_url ? (
              <div className="h-[350px] w-[350px] border border-light-black rounded-lg relative group cursor-pointer flex items-center text-2xl text-light-black font-semibold justify-center">
                {images[limit]?.progress < 100 ? (
                  <p className="w-full text-center">
                    {images[limit]?.progress}
                  </p>
                ) : (
                  <CircularProgress className="text-center text-light-black" />
                )}
              </div>
            ) : (
              <div
                className="w-[350px] h-[350px] bg-light-black rounded-lg relative group cursor-pointer flex items-center justify-center"
                key={images[1]?.file}
              >
                <div onClick={() => deleteImage(limit)}>
                  <Delete className="absolute top-0 left-0 right-0 z-10 h-full m-auto text-white transition-opacity opacity-0 group-hover:opacity-100" />
                  <Img
                    loader={
                      <CircularProgress className="text-center text-white" />
                    }
                    className="z-20 object-contain w-full h-[350px] rounded-lg group-hover:brightness-50"
                    alt="img"
                    src={images[limit]?.file_url}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <PreviewImages limit={limit} />
      </div>
      <div className="flex flex-col w-full gap-4">
        <Input label="Name" name="name" />
        <Input label="Model" name="model" />
        <Input label="Company Name" name="company_name" />
        <Dropdown
          options={[
            "SUV",
            "Van",
            "Sedan",
            "Truck",
            "Hatchback",
            "Sports Car",
            "Hypercar",
            "Luxury",
          ]}
          label="Car type"
          name="car_type"
        />
        <div className="flex w-full gap-2">
          <Dropdown
            className="w-full text-left text-dark-black"
            options={["Rupees", "Dollars"]}
            label="Currency"
            name="pricing_type"
          />
          <Input
            container={{
              className: "w-full",
            }}
            label="price"
            name="price"
          />
          <Dropdown
            options={["day", "month", "week", "hour"]}
            name="price_per"
            label="Price Per"
            className="w-full text-left"
          />
        </div>
        <div className="flex w-full gap-2">
          <Input
            container={{
              className: "w-full",
            }}
            label="Max. Rent Duration"
            name="days.max"
          />
          <Input
            container={{
              className: "w-full",
            }}
            label="Min. Rent Duration"
            name="days.min"
          />
        </div>
      </div>
    </div>
  );
}

export default StepOne;
