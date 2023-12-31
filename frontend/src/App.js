import { useContext, useEffect, lazy, Suspense } from "react";
import "./App.css";
import shopContext from "./Context/shopContext";
import "animate.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import io from "socket.io-client";
import ProductDetails from "./Components/Product/ProductDetails";
import { AnimatePresence } from "framer-motion";

const NavBar = lazy(() => import("./Components/NavBar"));
const AppLoader = lazy(() => import("./Components/AppLoader"));
const Footer = lazy(() => import("./Components/Footer"));
const ChatSpace = lazy(() => import("./Components/Messages/ChatSpace"));
const Home = lazy(() => import("./Components/Home"));
const ProductPage = lazy(() => import("./Components/Product/ProductPage"));
// import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";
// import ChatSpace from "./Components/Messages/ChatSpace";
// import Home from "./Components/Home";
// import ProductPage from "./Components/Product/ProductPage";

let socket;

function App() {
  const location = useLocation();
  const context = useContext(shopContext);
  const {
    user,
    setSocket,
    setIsTyping,
    setSocketConnected,
    notification,
    setNotification,
    fetchAgain,
    setMessages,
    setFetchAgain,
    messages,
    selectedChat,
  } = context;

  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_URL);
    console.log(process.env.REACT_APP_SOCKET_URL);
    setSocket(socket);
    const userData = JSON.parse(localStorage.getItem("user"));
    socket.emit("setup", userData);

    socket.on("typing", () => {
      console.log("typing start");
      setIsTyping(true);
    });
    socket.on("stop-typing", () => setIsTyping(false));
    socket.on("connected", () => {
      console.log("socket connected");
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
        setFetchAgain(!fetchAgain);
      } else {
        setFetchAgain(!fetchAgain);
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<AppLoader />}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route element={<Home />} path="/"></Route>
            {user && <Route element={<ChatSpace />} path="/messages"></Route>}
            <Route path="/car-space" element={<ProductPage />} />
            <Route
              path="/car-space/aston-martin"
              element={<ProductDetails />}
            />
          </Routes>
        </AnimatePresence>
        {location.pathname !== "/messages" && <Footer />}
        
      </Suspense>
    </div>
  );
}

export default App;
