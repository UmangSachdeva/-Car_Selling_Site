import React, { useContext, useEffect } from "react";
import "../Styles/Home.css";

import Header from "./Header";
import Carosoul from "./Carosoul";
import Banner from "./Banner";
import shopContext from "../Context/shopContext";

function Home() {
  const context = useContext(shopContext);
  const { setSelectedPage } = context;

  useEffect(() => {
    setSelectedPage("home");
  }, []);

  return (
    <div>
      <div className="home-body">
        <h1 className="heading font-type-1">
          Rent Your <br /> Dream Car
        </h1>
      </div>

      <Header />

      <Carosoul />

      <Banner />
    </div>
  );
}

export default Home;
