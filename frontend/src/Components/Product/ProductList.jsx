import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProductList } from "../../api/product/getProductList";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../Features/product/productSlice";
import LoadingPic from "../../Resources/gif/1488.gif";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.productRed?.products);
  const query = useSelector((state) => state?.productRed?.query);
  const loading = useSelector((state) => state?.productRed?.loading);

  useEffect(() => {
    dispatch(loadProducts(query || {}));
  }, [dispatch, query]);

  if (loading) {
    return <img src={LoadingPic} />;
  }

  return (
    <>
      {products?.data?.cars?.map((product, index) => (
        <ProductCard data={product} index={index} key={index} />
      ))}
    </>
  );
}

export default ProductList;
