import React from "react";
import carImg from "../../Resources/car-img.png";
import speed from "../../Resources/speed.png";
import engine from "../../Resources/engine.png";
import brake from "../../Resources/brake.png";
import star from "../../Resources/star.png";
import { Tilt } from "react-tilt";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../Utils/motion";

function ProductCard({ index, data }) {
  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="mobile:w-full"
    >
      <div className="transition-transform cursor-pointer parallax-effect product-card hover:outline hover:outline-black hover:scale-105 mobile:w-full">
        <div className="w-[367px] h-[247px] product-carousel mobile:w-full mobile:object-cover">
          <img src={data.images[0]} className="w-full h-full" alt="" />
        </div>
        <div className="product-card-body">
          <div className="product-card-heading">
            <div className="card-heading-text">
              <p className="capitalize">{data?.name}</p>
              <span className="capitalize">{data.type}</span>
            </div>
            <div className="card-action"></div>
          </div>

          <div className="card-features">
            <div className="feature1">
              <img src={speed} alt="" />
              <span>
                {data?.features?.speed?.value}
                {data?.features?.speed?.unit}
              </span>
            </div>
            <div className="feature1">
              <img src={engine} alt="" />
              <span>
                {" "}
                {data?.features?.engine?.value}
                {data?.features?.engine?.unit}
              </span>
            </div>
            <div className="feature1">
              <img src={brake} alt="" />
              <span>
                {data?.features?.torq?.value}
                {data?.features?.torq?.unit}
              </span>
            </div>
            <div className="feature1">
              <img src={speed} alt="" />
              <span className="capitalize">
                {data?.features?.seating?.value} {data?.features?.seating?.unit}
              </span>
            </div>
          </div>

          <div>
            <p>
              <span className="text-semibold ">Available for </span>
              {data?.days?.min} - {data?.days?.max} days
            </p>
          </div>

          <div className="flex gap-2 card-ratings-action">
            <div className="card-rating inner-element">
              <img src={star} alt="" />
              <span>{data?.avg_ratings}</span>
            </div>
            <div className="card-price">
              <span>Price</span>
              <p style={{ fontSize: "20px", marginTop: "0" }}>
                ${data?.price} <span>/{data?.price_per}</span>
              </p>
            </div>
            <Link
              to={`/car-space/${data?.slug}`}
              className="mt-[5px]"
              style={{ textDecoration: "none" }}
            >
              <div className="card-action">
                <button className="mobile:text-lg">Rent Now</button>
                <div className="shine"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
