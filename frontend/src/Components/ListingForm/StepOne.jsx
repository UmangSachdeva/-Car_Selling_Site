import React from "react";
import ImageInput from "../common/Form/ImageInput";
import PreviewImages from "./PreviewImages";
import Dropdown from "../common/Form/Dropdown";
import Input from "../common/Form/Input";

function StepOne() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-start justify-center gap-4">
        <ImageInput name="example-image" />
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
