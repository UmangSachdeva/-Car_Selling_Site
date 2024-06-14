import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import Details from "./Details";
import Feedback from "./Feedback";
import { getProductBySlug } from "../../api/product/getProductList";
import ProductBanner from "./ProductBanner";

function ProductDetails() {
  const [product, setProduct] = useState();
  const params = useParams();

  const scrollContainerRef = useRef(null);

  const scrollToView = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getProductDetails = async () => {
    const prod = await getProductBySlug(params.id);

    setProduct(prod?.data?.data);
  };

  useEffect(() => {
    scrollToView();
    getProductDetails();
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div ref={scrollContainerRef}>
        <ProductCarousel data={product} images={product?.images} />
      </div>

      <div className="product_details_body mobile:px-2">
        <Details data={product} />

        <Feedback />

        <ProductBanner />
      </div>
    </motion.div>
  );
}

export default ProductDetails;
