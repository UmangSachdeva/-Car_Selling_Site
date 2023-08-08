import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="contain">
        <div className="row">
          <div className="col-6 col-sm-auto col">
            <ScrollAnimation animateIn="animate__fadeIn">
              <h1 className="font-type-1">Pages</h1>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/">Rental</a>
                </li>
                <li>
                  <a href="/">FAQ</a>
                </li>
                <li>
                  <a href="/">Features</a>
                </li>
              </ul>
            </ScrollAnimation>
          </div>
          <div className="col-6 col-sm-auto col">
            <ScrollAnimation animateIn="animate__fadeIn">
              <h1 className="font-type-1">Resources</h1>
              <ul>
                <li>
                  <a href="/">Installation Manual</a>
                </li>
                <li>
                  <a href="/">Release Note</a>
                </li>
                <li>
                  <a href="/">Community Help</a>
                </li>
              </ul>
            </ScrollAnimation>
          </div>
          <div className="col-6 col-sm-auto col">
            <ScrollAnimation animateIn="animate__fadeIn">
              <h1 className="font-type-1">Company</h1>
              <ul>
                <li>
                  <a href="/">About Us</a>
                </li>
                <li>
                  <a href="/">Careerp</a>
                </li>
                <li>
                  <a href="/">Press </a>
                </li>
                <li>
                  <a href="/">Support</a>
                </li>
              </ul>
            </ScrollAnimation>
          </div>
          <div className="col-6 col-sm-auto col">
            <ScrollAnimation animateIn="animate__fadeIn">
              <h1 className="font-type-1">Product</h1>
              <ul>
                <li>
                  <a href="/">Demo</a>
                </li>
                <li>
                  <a href="/">Security</a>
                </li>
                <li>
                  <a href="/">FAQ</a>
                </li>
                <li>
                  <a href="/">Features</a>
                </li>
              </ul>
            </ScrollAnimation>
          </div>
        </div>
        <div className="row">
          <hr />
          <div className="col social">
            <div className="clearfix d-flex">
              <a
                href="/"
                style={{
                  marginRight: "117px",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                All rights reserverd @ 2023 RentYourCar
              </a>
              <a
                href="/"
                style={{
                  marginRight: "168px",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Terms and Conditions
              </a>
              <a href="/" style={{ textDecoration: "none", color: "white" }}>
                Privacy Policy
              </a>
            </div>

            <ul>
              <li>
                <a href="https://www.facebook.com/rerahousing">
                  <i class="bi bi-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/rerahousing.in/">
                  <i class="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@rerahousingindia">
                  <i class="bi bi-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
