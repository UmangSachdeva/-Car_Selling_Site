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
import io from "socket.io-client";
import { useContext, useEffect } from "react";
import shopContext from "./Context/shopContext";
import ChatSpace from "./Components/Messages/ChatSpace";

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

    return () => {
      socket.off("message-received");
    };
  });

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route element={<Home />} path="/"></Route>
        {user && <Route element={<ChatSpace />} path="/messages"></Route>}
      </Routes>
      {location.pathname !== "/messages" && <Footer />}

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
