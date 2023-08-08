import React, { useEffect, useState } from "react";
import axios from "axios";
import shopContext from "./shopContext";

const ShopState = (props) => {
  const [loginState, setLoginState] = useState(false);
  const [selectedChat, setSelectedChat] = useState("64cfc76e6d39e1dfe14a69a3");
  const [user, setUser] = useState({});

  const fetchMe = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUser(res.data.user);
      });
  };

  const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchMe();
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
      }}
    >
      {props.children}
    </shopContext.Provider>
  );
};

export default ShopState;
