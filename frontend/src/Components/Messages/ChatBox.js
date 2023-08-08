import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input, FormControl, TextField } from "@mui/material";

import { io } from "socket.io-client";
import shopContext from "../../Context/shopContext";
import SingleMessage from "./SingleMessage";

let socket;
let selectedChatCompare;

function ChatBox({ username, setUsername, room, setRoom }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const context = useContext(shopContext);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [isSocketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { selectedChat, user } = context;
  const [typing, setTyping] = useState(false);
  const [timeout, setTimeoutTyping] = useState();

  const typingHandler = (e) => {
    let typingTimeout;
    setMessage(e.target.value);

    if (!isSocketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    if (timeout) {
      clearTimeout(timeout);
    }
    typingTimeout = setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat);
        setTyping(false);
      }
    }, 3000);
    setTimeoutTyping(typingTimeout);
  };

  const fetchMessages = () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/message/64cfc76e6d39e1dfe14a69a3`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((results) => {
          setMessages(results.data.data);
          socket.emit("join-chat", "64cfc76e6d39e1dfe14a69a3");
        });
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/message`,
        {
          message: message,
          chatId: selectedChat,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setMessage("");
        setMessages([...messages, res.data.data]);
        socket.emit("new-message", res.data.data);
      })
      .catch((err) => {
        toast.error(`Cannot send the message`);
      });
  };

  useEffect(() => {
    socket = io.connect(process.env.REACT_APP_SOCKET_URL);
    const userData = JSON.parse(localStorage.getItem("user"));
    socket.emit("setup", userData);

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
    socket.on("connected", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageReceived.chat._id
      ) {
        setFetchAgain(!fetchAgain);
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <>
      <div className="chat-topic-head">
        <p>Chat Topic</p>
        <span>Umang Sachdeva | Delhi, India</span>
      </div>
      <SingleMessage messages={messages} isTyping={isTyping} />

      <form id="form" action="" onSubmit={sendMessage}>
        <input
          id="input"
          autocomplete="off"
          value={message}
          onChange={typingHandler}
        />
        <button>Send</button>
      </form>
    </>
  );
}

export default ChatBox;
