import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import LazyLoad from "react-lazy-load";
import aventedor from "../Resources/aventedor.png";
import image1 from "../Resources/image1.webp";
import image2 from "../Resources/image2.webp";
import aventedorCompress from "../Resources/compress/aventedor-min.png";
import arrow from "../Resources/arrow.png";
import car from "../Resources/car.webp";
import suv from "../Resources/suv.webp";
import electric from "../Resources/electric.webp";
import van from "../Resources/van.webp";
import "../Styles/Header.css";
import Card from "./Card";
import ScrollAnimation from "react-animate-on-scroll";
import { fadeIn } from "./Utils/motion";

function Header() {
  return (
    <div>
      <div className="home-body">
        <h1 className="heading font-type-1">
          Rent Your <br /> Dream Car
        </h1>
      </div>

      <div className="header" id="header">
        <div id="page1">
          <SearchBar />

          <div className="header-image">
            <img fetchpriority="high" src={aventedorCompress} alt="" />
            <ScrollAnimation animateIn="animate__fadeInRight">
              <div className="colored-road"></div>
            </ScrollAnimation>
          </div>
        </div>

        <section
          className="information d-flex justify-content-between align-items-center"
          id="page2"
        >
          <ScrollAnimation animateIn="animate__fadeInRight" animateOnce>
            <div className="text" variants={fadeIn("top")}>
              <h1 className="heading-2 font-type-1">PREMIUM CAR RENTAL</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officia quasi deserunt error dolore est. Velit labore
                consequatur incidunt amet mollitia? Ducimus voluptatibus nihil
                at, laborum recusandae laboriosam sapiente facilis? Minus. lorem
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, cumque!
              </p>
              <button type="button" class="btn btn-dark float-start">
                See all our Cars
              </button>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="animate__fadeInRight" animateOnce>
            <div className="image-container">
              <LazyLoad offset={150}>
                <img loading="lazy" src={image1} alt="" />
              </LazyLoad>
            </div>
          </ScrollAnimation>
        </section>

        <div
          className="banner-details d-flex justify-content-between"
          id="page3"
        >
          <div className="image-container-banner">
            <LazyLoad offset={150}>
              <img loading="lazy" src={image2} alt="" className="w-100" />
            </LazyLoad>
          </div>

          <span className="align-self-center our-numbers">
            <ScrollAnimation animateIn="animate__pulse">
              OUR NUMBERS{" "}
            </ScrollAnimation>
          </span>

          <div className="arrow align-self-end">
            <LazyLoad offset={150}>
              <img loading="lazy" src={arrow} alt="" />
            </LazyLoad>
          </div>

          <div className="details-number d-flex justify-content-evenly justify-content-evenly w-50 align-self-end">
            <ScrollAnimation
              animateIn="animate__fadeInDown"
              animateOnce
            >
              <div className="number">
                <h3 className="font-type-1 figure">45M+</h3>
                <span>Total Capital raised</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="animate__fadeInDown animate__delay-2s"
              animateOnce
            >
              <div className="number">
                <h3 className="font-type-1 figure">5M+</h3>
                <span>Happy Customers</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation
              animateIn="animate__fadeInDown animate__delay-3s"
              animateOnce
            >
              <div className="number">
                <h3 className="font-type-1 figure">300</h3>
                <span>Customers Feedback</span>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        <section className="vehicle-selector " id="page4">
          <ScrollAnimation
            animateIn="animate__fadeInDown"
            animateOnce
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
    </div>
  );
}

export default Header;
