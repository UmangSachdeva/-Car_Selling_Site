import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function ProductCarousel({ images, data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div
      id="carouselExampleCaptions"
      class="carousel slide vertical"
      data-bs-ride="false"
    >
      <div class="carousel-indicators">
        {images?.map((item, index) => (
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={`${index}`}
            class={`${index === 0 ? "active" : ""}`}
            aria-current="true"
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="button-list">
        <button>Rent now</button>
        <button>Bargin</button>
      </div>
      <div class="carousel-caption d-none d-md-block">
        <h5>
          {data?.name} | {data?.model}
        </h5>
        <p>
          Rent Now at ${data?.price}/{data?.price_per}
        </p>
      </div>
      <div class="carousel-inner">
        {images?.map((image, index) => (
          <div class={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={image} class="d-block w-100" alt="..." />
          </div>
        ))}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ProductCarousel;
