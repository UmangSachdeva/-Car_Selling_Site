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
        <div className="flex w-full gap-2">
          <Input label="Speed" name="features.speed.value" type="number" className="w-full" container={{ className: "w-full" }} />
          <Input label="Unit" name="features.speed.unit" className="w-full" container={{ className: "w-full" }} />
        </div>
        <div className="flex w-full gap-2">
          <Input label="Engine" name="features.engine.value" type="number" className="w-full" container={{ className: "w-full" }} />
          <Input label="Unit" name="features.engine.unit" className="w-full" container={{ className: "w-full" }} />
        </div>
        <div className="flex w-full gap-2">
          <Input label="Torq" name="features.torq.value" type="number" className="w-full" container={{ className: "w-full" }} />
          <Input label="Unit" name="features.torq.unit" className="w-full" container={{ className: "w-full" }} />
        </div>
        <div className="flex w-full gap-2">
          <Input label="Seating Capaciy" name="features.seating.value" type="number" className="w-full" container={{ className: "w-full" }} />
          <Input label="Unit" name="features.seating.unit" className="w-full" container={{ className: "w-full" }} />
        </div>


        <RichTextEditor name="car_description" />
        <SpecialCards />
      </div>
    </div>
  );
}

export default StepThree;
