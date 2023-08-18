import React, { useContext, useEffect, useRef } from "react";
import "../Styles/Home.css";

import Header from "./Header";
import gsap from "gsap";
import Carosoul from "./Carosoul";
import Banner from "./Banner";
import shopContext from "../Context/shopContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const ref = useRef(null);
  const context = useContext(shopContext);
  const { setSelectedPage } = context;

  useEffect(() => {
    setSelectedPage("home");
  }, []);

  return (
    <div ref={ref}>
      <div id="page1">
        <Header />
      </div>

      <div id="page2">
        <Carosoul />
      </div>

      <div id="page3">
        <Banner />
      </div>
    </div>
  );
}

export default Home;
