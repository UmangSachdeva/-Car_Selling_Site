import React, { useContext, useEffect, useRef, useState } from "react";
import ChatHeads from "./ChatHeads";
import axios from "axios";
import { toast } from "react-hot-toast";

import io from "socket.io-client";
import shopContext from "../../Context/shopContext";

const socket = io("http://localhost:9000");
let selectedChatCompare;

function ChatBox({ username, setUsername, room, setRoom }) {
  const [messages, setMessages] = useState([]);
  const scrollContainerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [socketConnected, setSocketConnected] = useState();
  const context = useContext(shopContext);
  const { selectedChat, user } = context;

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

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
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
        socket.emit("new-message", res.data.data);
        setMessages([...messages, res.data.data]);
        fetchMessages();
      })
      .catch((err) => {
        toast.error(`Cannot send the message`);
      });
  };

  useEffect(() => {
    fetchMessages();
    socket.emit("setup", user);

    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // notification
        // if (!notification.includes(newMessageReceived)) {
        //   setNotification([newMessageReceived, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      <div className="chat-topic-head">
        <p>Chat Topic</p>
        <span>Umang Sachdeva | Delhi, India</span>
      </div>
      <div className="message-container">
        <ul id="messages">
          {messages.map((msg, index) => {
            return (
              <li
                className={`message-box ${
                  msg.sender._id === user._id ? "sender" : "receiver"
                }`}
                key={index}
              >
                {msg.message}
              </li>
            );
          })}
        </ul>
        <div ref={scrollContainerRef}></div>
      </div>
      <form id="form" action="" onSubmit={sendMessage}>
        <input
          id="input"
          autocomplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
        {/* <button>Join Room</button> */}
      </form>
    </>
  );
}

export default ChatBox;
