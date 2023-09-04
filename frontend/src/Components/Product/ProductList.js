import React from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  return (
    <>
      <ProductCard index={0} />
      <ProductCard index={1} />
      <ProductCard index={2} />
      <ProductCard index={3} />
    </>
  );
}

export default ProductList;
