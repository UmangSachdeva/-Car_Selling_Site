import React from "react";
import logo1 from "../Resources/car-logo-1.png";
import logo2 from "../Resources/car-logo-2.png";
import logo3 from "../Resources/car-logo-3.png";
import logo4 from "../Resources/car-logo-4.png";
import logo5 from "../Resources/car-logo-5.png";
import logo6 from "../Resources/car-logo-6.png";
import logo7 from "../Resources/car-logo-7.png";

function Banner() {
  return (
    <div className="mt-5 running-banner">
      <div className="banner-container d-flex">
        <div className="image">
          <img src={logo1} alt="" />
        </div>
        <div className="image">
          <img src={logo2} alt="" />
        </div>
        <div className="image">
          <img src={logo3} alt="" />
        </div>
        <div className="image">
          <img src={logo4} alt="" />
        </div>
        <div className="image">
          <img src={logo5} alt="" />
        </div>
        <div className="image">
          <img src={logo6} alt="" />
        </div>
        <div className="image">
          <img src={logo7} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
