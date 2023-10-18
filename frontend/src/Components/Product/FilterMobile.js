import React from "react";

function FilterMobile({ open }) {
  if (!open) {
    return <></>;
  }

  return (
    <div className="w-[92vw] h-[80vh] border-black border rounded absolute left-[4%] z-20 bg-white"></div>
  );
}

export default FilterMobile;
