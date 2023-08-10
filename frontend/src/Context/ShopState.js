import React, { useEffect, useState } from "react";
import axios from "axios";
import shopContext from "./shopContext";

const ShopState = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(true);
  const [notification, setNotification] = useState([]);
  const [socket, setSocket] = useState();
  const [isTyping, setIsTyping] = useState(false);
  const [isSocketConnected, setSocketConnected] = useState(false);

  const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <shopContext.Provider
      value={{
        loginState,
        setLoginState,
        selectedChat,
        setSelectedChat,
        user,
        isSameUser,
        fetchAgain,
        setFetchAgain,
        notification,
        setNotification,
        messages,
        setMessages,
        socket,
        setSocket,
        isTyping,
        setIsTyping,
        isSocketConnected,
        setSocketConnected,
      }}
    >
      {props.children}
    </shopContext.Provider>
  );
};

export default ShopState;
