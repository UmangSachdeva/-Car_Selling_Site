import Home from "./Components/Home";
import "./App.css";
import "animate.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ShopState from "./Context/ShopState";
import io from "socket.io-client";
import { useState, useContext } from "react";
import ChatBox from "./Components/Messages/ChatBox";
import shopContext from "./Context/shopContext";
import ChatSpace from "./Components/Messages/ChatSpace";

const socket = io.connect("http://localhost:9000");

function App() {
  const location = useLocation();
  const context = useContext(shopContext);
  const { user } = context;
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route element={<Home />} path="/"></Route>
        {user && (
          <Route
            element={<ChatSpace socket={socket} />}
            path="/messages"
          ></Route>
        )}
      </Routes>
      {location.pathname !== "/messages" && <Footer />}

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
