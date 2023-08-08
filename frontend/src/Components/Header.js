import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import aventedor from "../Resources/aventedor.png";
import image1 from "../Resources/image1.jpg";
import image2 from "../Resources/image2.jpg";
import arrow from "../Resources/arrow.png";
import car from "../Resources/car.jpg";
import suv from "../Resources/suv.jpg";
import electric from "../Resources/electric.jpg";
import van from "../Resources/van.jpg";
import "../Styles/Header.css";
import Card from "./Card";
import ScrollAnimation from "react-animate-on-scroll";

function Header() {
  return (
    <div className="header">
      <SearchBar />

      <div className="header-image">
        <img src={aventedor} alt="" />

        <ScrollAnimation animateIn="animate__fadeInRight">
          <div className="colored-road"></div>
        </ScrollAnimation>
      </div>

      <section className="information d-flex justify-content-between align-items-center">
        <ScrollAnimation animateIn="animate__fadeInDown ">
          <div className="text">
            <h1 className="heading-2 font-type-1">PREMIUM CAR RENTAL</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
              quasi deserunt error dolore est. Velit labore consequatur incidunt
              amet mollitia? Ducimus voluptatibus nihil at, laborum recusandae
              laboriosam sapiente facilis? Minus. lorem Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Accusantium, cumque!
            </p>
            <button type="button" class="btn btn-dark float-start">
              See all our Cars
            </button>
          </div>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="animate__fadeInRight"
          animateOut="animate__fadeOutRight"
        >
          <div className="image-container">
            <img src={image1} alt="" />
          </div>
        </ScrollAnimation>
      </section>
      <div className="banner-details d-flex justify-content-between">
        <div className="image-container-banner">
          <img src={image2} alt="" className="w-100" />
        </div>

        <span className="align-self-center our-numbers">
          <ScrollAnimation animateIn="animate__pulse">
            OUR NUMBERS{" "}
          </ScrollAnimation>
        </span>

        <div className="arrow align-self-end">
          <img src={arrow} alt="" />
        </div>

        <div className="details-number d-flex justify-content-evenly justify-content-evenly w-50 align-self-end">
          <ScrollAnimation
            animateIn="animate__fadeInDown"
            animateOut="animate__fadeOutUp"
          >
            <div className="number">
              <h3 className="font-type-1 figure">45M+</h3>
              <span>Total Capital raised</span>
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="animate__fadeInDown animate__delay-2s"
            animateOut="animate__fadeOutUp"
          >
            <div className="number">
              <h3 className="font-type-1 figure">5M+</h3>
              <span>Happy Customers</span>
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="animate__fadeInDown animate__delay-3s"
            animateOut="animate__fadeOutUp"
          >
            <div className="number">
              <h3 className="font-type-1 figure">300</h3>
              <span>Customers Feedback</span>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      <section className="vehicle-selector ">
        <ScrollAnimation
          animateIn="animate__fadeInDown"
          animateOut="animate__fadeOutUp"
        >
          <h1 className="heading-2 my-5 font-type-1">
            WIDE RANGE OF <br /> VEHICLES
          </h1>
        </ScrollAnimation>

        <div className="row g-4">
          <Card image={car} title="CARS" />
          <Card image={suv} title="SUVS" />
          <Card image={electric} title="ELECTRIC" />
          <Card image={van} title="VAN" />
        </div>
      </section>
    </div>
  );
}

export default Header;
