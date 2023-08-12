import React from "react";
import logo1 from "../Resources/car-logo-1.png";
import logo2 from "../Resources/car-logo-2.png";
import logo3 from "../Resources/car-logo-3.png";
import logo4 from "../Resources/car-logo-4.png";
import logo5 from "../Resources/car-logo-5.png";
import logo6 from "../Resources/car-logo-6.png";
import logo7 from "../Resources/car-logo-7.png";
import LazyLoad from "react-lazy-load";

function Banner() {
  return (
    <div className="mt-5 running-banner">
      <div className="banner-container d-flex">
        <div className="image">
          <LazyLoad offset={150}>
            <img loading="lazy" src={logo1} alt="" />
          </LazyLoad>
        </div>
        <div className="image">
          <LazyLoad offset={150}>
            <img loading="lazy" src={logo2} alt="" />
          </LazyLoad>
        </div>
        <div className="image">
          <LazyLoad offset={150}>
            <img loading="lazy" src={logo3} alt="" />
          </LazyLoad>
        </div>
        <div className="image">
          <LazyLoad offset={150}>
            <img loading="lazy" src={logo4} alt="" />
          </LazyLoad>
        </div>
        <div className="image">
          {" "}
          <LazyLoad offset={150}>
            <img loading="lazy" src={logo5} alt="" />
          </LazyLoad>
        </div>
        <div className="image">
          <LazyLoad offset={150}>
            <img loading="lazy" src={logo6} alt="" />
          </LazyLoad>
        </div>
        <div className="image">
          <LazyLoad offset={150}>
            <img loading="lazy" src={logo7} alt="" />
          </LazyLoad>
        </div>
      </div>
    </div>
  );
}

export default Banner;
