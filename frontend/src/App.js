import Home from "./Components/Home";
import "./App.css";
import "animate.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ShopState from "./Context/ShopState";

function App() {
  return (
    <div className="App">
      <ShopState>
        <NavBar />
        <Router>
          <Routes>
            <Route element={<Home />} path="/"></Route>
          </Routes>
        </Router>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Footer />
      </ShopState>
    </div>
  );
}

export default App;
