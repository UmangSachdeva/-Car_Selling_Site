import React, { useContext, useEffect, useRef } from "react";
import "../Styles/Home.css";
import { motion } from "framer-motion";

import Header from "./Header";
import Carosoul from "./Carosoul";
import Banner from "./Banner";
import shopContext from "../Context/shopContext";
function Home() {
  const ref = useRef(null);
  const context = useContext(shopContext);
  const { setSelectedPage } = context;

  useEffect(() => {
    setSelectedPage("home");
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ overflow: "hidden" }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div id="page1">
        <Header />
      </div>

      <div id="page2">
        <Carosoul />
      </div>

      <div id="page3">
        <Banner />
      </div>
    </motion.div>
  );
}

export default Home;
