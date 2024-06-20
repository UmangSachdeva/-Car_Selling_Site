import { useContext, useEffect, lazy, Suspense } from "react";
import "./App.css";
import shopContext from "./Context/shopContext";
import "animate.css";
import { Routes, Route, useLocation } from "react-router-dom";
import io from "socket.io-client";
import ProductDetails from "./Components/Product/ProductDetails";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addMessages } from "./Features/messages/messageSlice";

const NavBar = lazy(() => import("./Components/NavBar"));
const AppLoader = lazy(() => import("./Components/AppLoader"));
const Footer = lazy(() => import("./Components/Footer"));
const ChatSpace = lazy(() => import("./Components/Messages/ChatSpace"));
const Home = lazy(() => import("./Components/Home"));
const ProductPage = lazy(() => import("./Components/Product/ProductPage"));
const ListingForm = lazy(() => import("./Components/ListingForm/ListingForm"));
const Notification = lazy(() =>
  import("./Components/Notifications/NotificationMobile")
);
// import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";
// import ChatSpace from "./Components/Messages/ChatSpace";
// import Home from "./Components/Home";
// import ProductPage from "./Components/Product/ProductPage";

let socket;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const context = useContext(shopContext);
  const { user, setSocket, setIsTyping, setSocketConnected } = context;

  useEffect(() => {
    socket = io(import.meta.env.VITE_APP_SOCKET_URL);

    setSocket(socket);
    const userData = JSON.parse(localStorage.getItem("user"));
    socket.emit("setup", userData);

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stop-typing", () => setIsTyping(false));

    socket.on("connected", () => {
      console.log("Connected");
      setSocketConnected(true);
    });
  }, [user]);

  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<AppLoader />}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route element={<Home />} path="/"></Route>
            {user && <Route element={<ChatSpace />} path="/messages"></Route>}
            <Route path="/car-space" element={<ProductPage />} />
            <Route path="/car-space/:id" element={<ProductDetails />} />
            <Route path="/list-your-car" element={<ListingForm />} />
            <Route path="/your-notifications" element={<Notification />} />
          </Routes>
        </AnimatePresence>
        {location.pathname !== "/messages" && <Footer />}
      </Suspense>
    </div>
  );
}

export default App;
