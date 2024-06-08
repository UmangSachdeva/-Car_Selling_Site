import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProductList } from "../../api/product/getProductList";

function ProductList() {
  const [products, setProducts] = useState();

  const getProduct = async () => {
    const product = await getProductList();

    console.log(product);
    setProducts(product?.data?.data?.cars);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {products?.map((product, index) => (
        <ProductCard data={product} index={index} key={index} />
      ))}

      {/* <ProductCard index={1} />
      <ProductCard index={2} />
      <ProductCard index={3} /> */}
    </>
  );
}

export default ProductList;
