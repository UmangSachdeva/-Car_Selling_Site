import React from "react";
import engine from "../../Resources/engine-png.png";
import clutch from "../../Resources/clutch.png";
import gearbox from "../../Resources/gearbox.png";
import tyre from "../../Resources/tyre.png";
import { Tilt } from "react-tilt";

function DetailsCard({ cardFor, description }) {
  return (
    <Tilt
      className="parallax-effect detail-card"
      options={{ max: 20, speed: 200, axis: "x" }}
    >
      <div className="card-container">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="100%"
          id="blobSvg"
          style={{ opacity: 1 }}
          filter="blur(1.2px)"
        >
          {" "}
          <defs>
            {" "}
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              {" "}
              <stop
                offset="0%"
                style={{ stopColor: "rgb(255, 193, 7)" }}
              ></stop>{" "}
              <stop
                offset="100%"
                style={{ stopColor: "rgb(255, 193, 7)" }}
              ></stop>{" "}
            </linearGradient>{" "}
          </defs>{" "}
          <path id="blob" fill="url(#gradient)" style={{ opacity: 1 }}>
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="M421.63508,307.39005Q364.7801,364.7801,307.39005,427.43403Q250,490.08796,191.6822,428.36178Q133.3644,366.6356,70.9089,308.3178Q8.4534,250,54.21728,174.99058Q99.98115,99.98115,174.99058,81.49686Q250,63.01257,330.66021,75.84607Q411.32042,88.67958,444.90524,169.33979Q478.49006,250,421.63508,307.39005Z;M395.5,320Q390,390,320,400Q250,410,172,408Q94,406,59,328Q24,250,70.5,183.5Q117,117,183.5,108Q250,99,335,89.5Q420,80,410.5,165Q401,250,395.5,320Z;M418.08664,320.33435Q390.6687,390.6687,320.33435,427.91946Q250,465.17023,188.27506,419.31005Q126.55013,373.44987,106.38448,311.72494Q86.21883,250,84.09726,165.98785Q81.9757,81.9757,165.98785,53.98938Q250,26.00305,311.1687,76.83282Q372.3374,127.6626,408.92099,188.8313Q445.50458,250,418.08664,320.33435Z;M449.05134,329.9003Q409.80059,409.80059,329.9003,451.15995Q250,492.5193,162.89881,458.36084Q75.79762,424.20238,65.04837,337.10119Q54.29911,250,85.74629,183.59673Q117.19347,117.19347,183.59673,88.1905Q250,59.18753,328.8549,75.73886Q407.7098,92.2902,448.00594,171.1451Q488.30208,250,449.05134,329.9003Z;M421.63508,307.39005Q364.7801,364.7801,307.39005,427.43403Q250,490.08796,191.6822,428.36178Q133.3644,366.6356,70.9089,308.3178Q8.4534,250,54.21728,174.99058Q99.98115,99.98115,174.99058,81.49686Q250,63.01257,330.66021,75.84607Q411.32042,88.67958,444.90524,169.33979Q478.49006,250,421.63508,307.39005Z"
            ></animate>
          </path>
        </svg>
        <div className="card-head">
          <span>{cardFor}</span>
        </div>
        <div className="card-img">
          {cardFor === "clutch" && <img src={clutch} alt="" />}
          {cardFor === "engine" && <img src={engine} alt="" />}
          {cardFor === "gearbox" && <img src={gearbox} alt="" />}
          {cardFor === "tyre" && <img src={tyre} alt="" />}
        </div>

        <div className="card-body">
          <p className="description">{description}</p>
        </div>
      </div>
    </Tilt>
  );
}

export default DetailsCard;
