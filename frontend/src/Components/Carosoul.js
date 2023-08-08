import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../Resources/car-rover.png";
import img2 from "../Resources/car-bmw.png";
import img3 from "../Resources/car-jeep.png";
import SpeedIcon from "@mui/icons-material/Speed";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useInView } from "react-intersection-observer";
import ScrollAnimation from "react-animate-on-scroll";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

function Carosoul() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef();

  const { ref: intersectionRef, inView } = useInView({
    triggerOnce: true, // Only trigger once when the element comes into view
  });

  const settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "15%",
    beforeChange: (current, next) => {
      setActiveSlide(next);
      const currentSlide = document.querySelectorAll(`.speed-active`);
      currentSlide.forEach((item) => {
        item.classList.remove("animate__animated");
        item.classList.remove("animate__fadeInDown");
      });
      const currentBuyBox = document.querySelectorAll(`.buy-box-active`);
      currentBuyBox.forEach((item) => {
        // item.classList.add("animate__animated");
        item.classList.remove("animate__fadeIn");
      });
    },
    afterChange: (current) => {
      const currentSlide = document.querySelectorAll(`.speed-active`);
      const currentBuyBox = document.querySelectorAll(`.buy-box-active`);
      currentBuyBox.forEach((item) => {
        // item.classList.add("animate__animated");
        item.classList.add("animate__fadeIn");
      });
      currentSlide.forEach((item) => {
        item.classList.add("animate__animated");
        item.classList.add("animate__fadeInDown");
        item.classList.add("animate__fast");
      });
    },

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const currentSlide = document.querySelectorAll(`.speed-active`);
    currentSlide.forEach((item) => {
      item.classList.add("animate__animated");
      item.classList.add("animate__fadeInDown");
    });
    const currentBuyBox = document.querySelectorAll(`.buy-box-active`);
    currentBuyBox.forEach((item) => {
      // item.classList.add("animate__animated");
      item.classList.add("animate__fadeIn");
    });
  }, []);

  const slides = [
    {
      id: 1,
      image: img,
      background: "linear-gradient(0deg, #a4a9a3, #e2e7e1, transparent)",
      speed: "221",
      transmission: "8",
      seats: "4",
      fuel: "16",
      price: "256",
    },
    {
      id: 2,
      image: img2,
      speed: "260",
      transmission: "6",
      seats: "4",
      fuel: "20",
      price: "50",
      background:
        "linear-gradient(0deg, #9d1501, #ff6646, #ffb4a3, transparent)", // Customize the background color for slide 2
    },
    {
      id: 3,
      image: img3,
      speed: "200",
      transmission: "6",
      seats: "4",
      fuel: "15",
      price: "400",
      background:
        "linear-gradient(0deg, #ff8e04, #ffc17a, #ffe3bd, transparent)", // Customize the background color for slide 3
    },
    // Add more slides as needed
  ];

  return (
    <div>
      <div
        style={{
          background: slides[activeSlide]?.background,
          transition: "background 0.1s ease",
          position: "relative",
        }}
      >
        <h2
          className="heading-2 font-type-1"
          style={{
            position: "absolute",
            top: "5%",
            left: "26%",
          }}
        >
          Pick Your Dream Car Today
        </h2>
        <Slider {...settings} ref={sliderRef}>
          {/* <div className="image-container">
            <img src={img} alt="Slide 1" />
          </div>
          <div className="image-container">
            <img src={img2} alt="Slide 2" />
          </div>
          <div className="image-container">
            <img src={img3} alt="Slide 3" style={{ width: "85%" }} />
          </div> */}
          {slides.map((slide, index) => (
            <div className="slide-container">
              <div key={slide.id} className="image-container">
                <img src={slide.image} alt={`Slide ${slide.id}`} />
              </div>

              <div className={`specifications-container`}>
                <div className="specifictaions">
                  <ScrollAnimation animateIn="animate__fadeInDown">
                    <div
                      className={`speed${
                        activeSlide === slide.id - 1 ? "-active" : ""
                      }`}
                    >
                      <div className="icons">
                        <SpeedIcon
                          sx={{
                            fontSize: "61px",
                            color: "black",
                            padding: "8px",
                            borderRadius: "50%",
                            background: "white",
                            "@media (max-width: 728px)": {
                              fontSize: "40px",
                              width: "fit-content",
                              padding: 0,
                            },
                          }}
                        />
                      </div>{" "}
                      <p className="spec-value font-type-1">
                        {slide.speed} <span className="spec-unit">m/s</span>
                      </p>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animateIn="animate__fadeInDown">
                    <div
                      className={`speed${
                        activeSlide === slide.id - 1 ? "-active" : ""
                      }`}
                    >
                      <div className="icons">
                        <DirectionsCarIcon
                          sx={{
                            fontSize: "61px",
                            color: "black",
                            padding: "8px",
                            borderRadius: "50%",
                            background: "white",
                            "@media (max-width: 728px)": {
                              fontSize: "40px",
                              width: "fit-content",
                              padding: 0,
                            },
                          }}
                        />
                      </div>{" "}
                      <p className="spec-value font-type-1">
                        {slide.transmission}{" "}
                        <span className="spec-unit">speed</span>
                      </p>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animateIn="animate__fadeInDown">
                    <div
                      className={`speed${
                        activeSlide === slide.id - 1 ? "-active " : ""
                      }`}
                    >
                      <div className="icons">
                        <AirlineSeatReclineExtraIcon
                          sx={{
                            fontSize: "61px",
                            color: "black",
                            padding: "8px",
                            borderRadius: "50%",
                            background: "white",
                            "@media (max-width: 728px)": {
                              fontSize: "40px",
                              width: "fit-content",
                              padding: 0,
                            },
                          }}
                        />
                      </div>{" "}
                      <p className="spec-value font-type-1">
                        {slide.seats} <span className="spec-unit">seats</span>
                      </p>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation animateIn="animate__fadeInDown">
                    <div
                      className={`speed${
                        activeSlide === slide.id - 1 ? "-active" : ""
                      }`}
                    >
                      <div className="icons">
                        <LocalGasStationIcon
                          sx={{
                            fontSize: "61px",
                            color: "black",
                            padding: "8px",
                            borderRadius: "50%",
                            background: "white",
                            "@media (max-width: 728px)": {
                              fontSize: "40px",
                              width: "fit-content",
                              padding: 0,
                            },
                          }}
                        />
                      </div>{" "}
                      <p className="spec-value font-type-1">
                        {slide.fuel} <span className="spec-unit">L</span>
                      </p>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>

              <div
                className={`buy-box${
                  activeSlide === slide.id - 1 ? "-active " : ""
                } d-flex`}
              >
                <div className="price-tag d-flex ">
                  <div className="tag">
                    <SellOutlinedIcon
                      sx={{
                        fontSize: "40px",
                        "@media (max-width: 728px)": {
                          fontSize: "24px",
                        },
                      }}
                    />
                  </div>
                  <div className="price">
                    <span>${slide.price}</span>{" "}
                    <span className="perday"> /Day</span>
                  </div>
                </div>
                <div className="actions w-100">
                  <div className="action-btn rent">
                    <button className="rent-btn">Rent</button>
                  </div>
                  <div className="action-btn view Details">
                    <button className="view-btn">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carosoul;
