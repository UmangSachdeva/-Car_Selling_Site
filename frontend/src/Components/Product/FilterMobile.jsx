import React from "react";
import FilterOptions from "./FilterOptions";

function FilterMobile({ open }) {
  if (!open) {
    return <></>;
  }

  return (
    <div className="w-[92vw] absolute left-[4%] z-20 bg-light-yellow rounded-2xl">
      <FilterOptions />
    </div>
  );
}

export default FilterMobile;
