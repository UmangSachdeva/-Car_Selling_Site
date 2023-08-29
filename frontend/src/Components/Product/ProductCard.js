import React from "react";
import carImg from "../../Resources/car-img.png";
import speed from "../../Resources/speed.png";
import engine from "../../Resources/engine.png";
import brake from "../../Resources/brake.png";
import star from "../../Resources/star.png";
import { Tilt } from "react-tilt";

function ProductCard() {
  return (
    <Tilt
      className="parallax-effect product-card"
      options={{ max: 20, speed: 200 }}
    >
      <div className="product-carousel">
        <img src={carImg} alt="" />
      </div>
      <div className="product-card-body">
        <div className="product-card-heading">
          <div className="card-heading-text">
            <p>Aston Martin 233 fx</p>
            <span>Petrol</span>
          </div>
          <div className="card-action"></div>
        </div>

        <div className="card-features">
          <div className="feature1">
            <img src={speed} alt="" />
            <span>233kph</span>
          </div>
          <div className="feature1">
            <img src={engine} alt="" />
            <span>1200cc</span>
          </div>
          <div className="feature1">
            <img src={brake} alt="" />
            <span>233kph</span>
          </div>
          <div className="feature1">
            <img src={speed} alt="" />
            <span>233kph</span>
          </div>
        </div>

        <div className="card-ratings-action">
          <div className="card-rating inner-element">
            <img src={star} alt="" />
            <span>4.8</span>
          </div>
          <div className="card-price">
            {" "}
            <span>Price</span>{" "}
            <p style={{ fontSize: "20px", marginTop: "0" }}>
              $20 <span>/day</span>
            </p>{" "}
          </div>

          <div className="card-action">
            <button>Rent Now</button>
            <div className="shine"></div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default ProductCard;
