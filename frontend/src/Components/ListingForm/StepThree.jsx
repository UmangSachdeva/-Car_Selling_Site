import React from "react";
import Input from "../common/Form/Input";
import Dropdown from "../common/Form/Dropdown";
import RichTextEditor from "../common/Form/RichTextEditor";
import SpecialCards from "./SpecialCards";

function StepThree() {
  return (
    <div>
      {" "}
      <div className="flex flex-col w-full gap-4">
        <Input label="Milage" name="milage" />
        <Input label="Transmission" name="transmission" />
        <Input label="Fuel Type" name="fuel_type" />
        <Input label="Seating Capacity" name="seating_capacity" />
        <RichTextEditor name="features" />
        <SpecialCards />
      </div>
    </div>
  );
}

export default StepThree;
