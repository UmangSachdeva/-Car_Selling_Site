import React, { useEffect, useState } from "react";
import FilterOptions from "./FilterOptions";
import ProductList from "./ProductList";
import FilterMobile from "./FilterMobile";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Chip } from "@mui/material";
import { setProductQuery } from "../../Features/product/productSlice";
import { vehicles } from "../../constants/VehicleCategory";

function ProductPage() {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state?.productRed?.products);
  const query = useSelector((state) => state?.productRed?.query);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("-createdAt");
  const [keyword, setKeyword] = useState("");
  const [vehicleType, setVehicleType] = useState("any");

  // const handleBargain = async () => {
  //   await connectSeller();
  // };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = () => {
    let newQuery = { ...query };

    newQuery = Object.keys(newQuery).filter((objectKey) => {
      objectKey != "car_type";
    });

    dispatch(
      setProductQuery({
        ...newQuery,
        search: keyword,
        [vehicleType != "any" ? "car_type" : ""]: vehicleType,
      })
    );
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    dispatch(setProductQuery({ ...query, sort: sort }));
  };

  const handleScroll = debounce(() => {
    const filterOptions = document.querySelector(".filter-options-container");
    const rect = filterOptions.getBoundingClientRect();
    const offset = 0; // You can adjust this offset as needed
    const footer = document.querySelector(".footer");
    const footerRect = footer.getBoundingClientRect();

    if (rect.top - offset <= 0 && rect.bottom + offset < footerRect.top) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="px-4 product-search-container mobile:py-4">
        <div className="search-component mobile:w-full">
          <select
            name=""
            className="mobile:w-[30%] mobile:p-0"
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
            id=""
          >
            <option value="any">Any</option>
            {vehicles.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>

          <input
            placeholder="Search you dream car"
            type="text"
            name=""
            onChange={(e) => setKeyword(e.target.value)}
            id=""
          />

          <button className="search-btn mobile:w-[30%]" onClick={handleSearch}>
            {window.innerWidth < 450 ? (
              <div className="mobile:text-[20px] mobile:mt-[8px]">
                <ion-icon name="search-outline"></ion-icon>
              </div>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-12 py-8 mobile:py-6 mobile:px-4">
        <p className="text-xl font-bold">
          {products?.results} Results
          {/* for{" "}
          <span className="text-theme-yellow">“car”</span> */}
        </p>

        {window.innerWidth < 450 ? (
          <button
            className="flex items-center gap-1 p-2 border border-black rounded"
            onClick={() => setOpen(!open)}
          >
            <ion-icon name="filter-outline"></ion-icon> Filters
          </button>
        ) : (
          <button className="flex items-center gap-1 p-2 ">
            <p className="mr-4">Sort By:</p>
            <div className="flex flex-wrap gap-4">
              <Chip
                label="Latest to Oldest"
                onClick={() => {
                  handleSortChange("-createdAt");
                }}
                className={`${
                  sortBy == "-createdAt" && "bg-theme-yellow text-black"
                } cursor-pointer`}
              />
              <Chip
                label="Oldest to Latest"
                onClick={() => {
                  handleSortChange("createdAt");
                }}
                className={`${
                  sortBy == "createdAt" && "bg-theme-yellow text-black"
                } cursor-pointer`}
              />
              <Chip
                label="Price: Low to High"
                className={`${
                  sortBy == "price" && "bg-theme-yellow text-black"
                } cursor-pointer`}
                onClick={() => {
                  handleSortChange("price");
                }}
              />
              <Chip
                label="Price: High to Low"
                className={`${
                  sortBy == "-price" && "bg-theme-yellow text-black"
                } cursor-pointer`}
                onClick={() => {
                  handleSortChange("-price");
                }}
              />
              <Chip
                label="Rating: Low to High"
                className={`${
                  sortBy == "avg_ratings" && "bg-theme-yellow text-black"
                } cursor-pointer`}
                onClick={() => {
                  handleSortChange("avg_ratings");
                }}
              />
              <Chip
                label="Rating: High to Low"
                className={`${
                  sortBy == "-avg_ratings" && "bg-theme-yellow text-black"
                } cursor-pointer`}
                onClick={() => {
                  handleSortChange("-avg_ratings");
                }}
              />
            </div>
          </button>
        )}
      </div>

      <FilterMobile open={open} />

      <div className="mobile:px-4 product-listing-container">
        <div
          className={`filter-options-container mobile:hidden ${
            isSticky ? "sticky" : ""
          }`}
        >
          <FilterOptions />
        </div>

        <div className="products-list-container mobile:w-full">
          <ProductList />
        </div>
      </div>
    </motion.div>
  );
}

export default ProductPage;
