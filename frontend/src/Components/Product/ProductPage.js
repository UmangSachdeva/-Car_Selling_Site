import React, { useEffect, useState } from "react";
import FilterOptions from "./FilterOptions";
import ProductList from "./ProductList";
import FilterMobile from "./FilterMobile";
import { motion } from "framer-motion";

function ProductPage() {
  const [isSticky, setIsSticky] = useState(false);
  const [open, setOpen] = useState(false);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
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
          <select name="" className="mobile:w-[30%] mobile:p-0" id="">
            <option value="delhi">Delhi</option>
            <option value="delhi">Delhi</option>
            <option value="delhi">Delhi</option>
            <option value="delhi">Delhi</option>
          </select>

          <input placeholder="Search you dream car" type="text" name="" id="" />

          <button className="search-btn mobile:w-[30%]">
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
          20 - 1000 Results for <span className="text-theme-yellow">“car”</span>
        </p>

        {window.innerWidth < 450 ? (
          <button
            className="flex items-center gap-1 p-2 border border-black rounded"
            onClick={() => setOpen(!open)}
          >
            <ion-icon name="filter-outline"></ion-icon> Filters
          </button>
        ) : (
          <button className="flex items-center gap-1 p-2 border border-black rounded">
            <ion-icon name="filter-outline"></ion-icon> Sort
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
