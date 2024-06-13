import React from "react";
import Slider from "@mui/material/Slider";
import { Button, Chip, Input, Rating, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setProductQuery } from "../../Features/product/productSlice";

function FilterOptions() {
  const [value, setValue] = React.useState([0, 100]);
  const [ratings, setRatings] = React.useState(null);
  const [rentType, setRentType] = React.useState("any");
  const [price, setPrice] = React.useState({
    max: null,
    min: null,
  });
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resetFilter = () => {
    setPrice({ min: null, max: null });
    setRentType("any");
    setRatings(null);
    setValue([0, 100]);

    dispatch(setProductQuery({}));
  };

  const handleFilterApply = () => {
    dispatch(
      setProductQuery({
        ["days~min[gte]"]: value[0],
        ["days~max[lte]"]: value[1],
        [price?.min != null ? "price[gte]" : ""]: price.min,
        [price?.max != null ? "price[lte]" : ""]: price.max,
        [ratings ? "avg_ratings[gte]" : ""]: ratings,
        [rentType != "any" ? "price_per" : ""]: rentType,
      })
    );
  };

  return (
    <div
      id="filter-box"
      className="flex flex-col gap-4 p-4 border border-black shadow-lg h-fit rounded-2xl"
    >
      <div className="flex items-baseline justify-between">
        <p className="text-xl">Filter By</p>
        <p
          onClick={resetFilter}
          className="text-sm underline cursor-pointer hover:text-light-black"
        >
          Reset
        </p>
      </div>

      <div className="flex flex-col items-start gap-2">
        <label className="text-light-black">days for rent</label>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <label className="text-light-black">Price for rent</label>
        <div className="flex items-center gap-2">
          <TextField
            type="number"
            label="min. Price"
            variant="outlined"
            value={price.min}
            onChange={(e) => setPrice({ ...price, min: e.target.value })}
          />{" "}
          -
          <TextField
            type="number"
            variant="outlined"
            label="max. Price"
            value={price.max}
            onChange={(e) => setPrice({ ...price, max: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <label className="text-light-black">Ratings</label>
        <Rating
          name="simple-controlled"
          size="large"
          value={ratings}
          onChange={(event, newValue) => {
            setRatings(newValue);
          }}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <label>Rental type</label>
        <div className="flex flex-wrap gap-4">
          <Chip
            label="Any"
            onClick={() => setRentType("any")}
            className={`${
              rentType == "any" && "bg-theme-yellow text-black"
            } cursor-pointer`}
          />
          <Chip
            label="Per Day"
            onClick={() => {
              setRentType("day");
            }}
            className={`${
              rentType == "day" && "bg-theme-yellow text-black"
            } cursor-pointer`}
          />
          <Chip
            label="Per hour"
            className={`${
              rentType == "hour" && "bg-theme-yellow text-black"
            } cursor-pointer`}
            onClick={() => setRentType("hour")}
          />
          <Chip
            label="Per week"
            className={`${
              rentType == "week" && "bg-theme-yellow text-black"
            } cursor-pointer`}
            onClick={() => setRentType("week")}
          />
          <Chip
            label="Per month"
            className={`${
              rentType == "month" && "bg-theme-yellow text-black"
            } cursor-pointer`}
            onClick={() => setRentType("month")}
          />
        </div>
      </div>
      <Button
        className="text-white rounded-lg bg-light-black"
        onClick={handleFilterApply}
      >
        Apply
      </Button>
    </div>
  );
}

export default FilterOptions;
