import React from "react";
import ImageInput from "../common/Form/ImageInput";
import PreviewImages from "./PreviewImages";
import Dropdown from "../common/Form/Dropdown";
import Input from "../common/Form/Input";
import { useSelector } from "react-redux";
import { Publish } from "@mui/icons-material";

function StepOne() {
  const images = useSelector((state) => state?.formRed?.form?.progress);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-start justify-center gap-4">
        {images.length > 3 ? (
          <ImageInput name="example-image" />
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-2 rounded-full ">
            <div className="p-4 bg-theme-yellow animate-bounce w-[50px] h-[50px] rounded-full flex justify-center items-center">
              <Publish className="" />
            </div>

            <p className="text-lg font-bold text-dark-black">
              Drop the files here ...
            </p>
          </div>
        )}
        <PreviewImages />
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
            "Luxary",
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
            options={[
              "per day",
              "per week",
              "per month",
              "per year",
              "per hour",
            ]}
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
