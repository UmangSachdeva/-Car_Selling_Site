import React from "react";
import "../Styles/SearchBar.css";

function SearchBar() {
  const toggleActiveBtn = () => {
    const carBtn = document.getElementById("car-toggle");
    const busBtn = document.getElementById("bus-toggle");

    carBtn.classList.toggle("active-btn");
    busBtn.classList.toggle("active-btn");
  };

  return (
    <div>
      {window.innerWidth > 768 && (
        <div className="search-container">
          <div className="selection-box-container">
            <div className="selection-box">
              <div
                id="car-toggle"
                className="for-car active-btn w-100 rounded-0"
                onClick={toggleActiveBtn}
              >
                <span className="car">Car</span>
              </div>
              <div
                id="bus-toggle"
                className="for-bus w-100 rounded-0"
                onClick={toggleActiveBtn}
              >
                <span className="bus">Bus</span>
              </div>
            </div>
          </div>

          <div className="search-box-container">
            <div className="search-box">
              <div className="location select-boxes border-right w-100">
                <span className="subheading">Pick Up & Return Location</span>
                <div className="select-container">
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option defaultValue>Select Pick Up and Return</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div className="start-date select-boxes border-right w-100">
                <span className="subheading">Start Date</span>
                <div className="select-container">
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option defaultValue>Select a starting Date</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div className="end-date select-boxes w-100">
                <span className="subheading">End Date</span>
                <div className="select-container">
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option defaultValue>Select a Ending Date</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div className="btn-search">
                <button type="button" className="btn btn-dark">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {window.innerWidth <= 768 && (
        <>
          <div className="search-container-mobile">
            <div className="search-input-mobile">
              <select className="location-dropdown-search" name="" id="">
                <option value="delhi">Delhi</option>
                <option value="haryana">Haryana</option>
                <option value="manipur">Manipur</option>
                <option value="uttar_pradesh">Uttar Pradesh</option>
              </select>
              <div className="vl"></div>
              <input
                type="text"
                name="search"
                id="keyword"
                placeholder="Search Model"
              />
              <button
                type="button"
                className="btn btn-dark search-button-mobile"
              >
                {" "}
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchBar;
