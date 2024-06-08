import React from "react";
import "../Styles/Card.css";
import ScrollAnimation from "react-animate-on-scroll";

function Card(props) {
  return (
    <div className="col-12 col-md-6">
      <ScrollAnimation animateIn="animate__fadeIn">
        <div
          className="card"
          style={{
            backgroundImage: `url(${props.image})`,
          }}
        >
          <div className="card-heading">
            {props.title} <br />
            <i
              className="bi bi-arrow-right-circle"
              style={{ fontSize: "30px" }}
            ></i>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}

export default Card;
