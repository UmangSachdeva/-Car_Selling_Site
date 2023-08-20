import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import send from "../../Resources/send.png";
import io from "socket.io-client";

import shopContext from "../../Context/shopContext";
import SingleMessage from "./SingleMessage";

function ChatBox({ username, setUsername, room, setRoom }) {
  const [message, setMessage] = useState("");
  const context = useContext(shopContext);

  const {
    selectedChat,
    fetchAgain,
    setFetchAgain,
    messages,
    setMessages,
    isSocketConnected,
    isTyping,
    socket,
    user,
  } = context;
  const [typing, setTyping] = useState(false);
  const [timeout, setTimeoutTyping] = useState();

  const typingHandler = (e) => {
    let typingTimeout;
    setMessage(e.target.value);

    if (!isSocketConnected) return;

    if (!typing) {
      setTyping(true);
      console.log("typing emitted");
      socket.emit("typing", selectedChat._id);
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
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, 3000);
    setTimeoutTyping(typingTimeout);
  };

  const fetchMessages = () => {
    if (!selectedChat) return;

    try {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/message/${selectedChat._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((results) => {
          setMessages(results.data.data);
          socket.emit("join-chat", selectedChat._id);
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
          chatId: selectedChat._id,
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
    fetchMessages();
  }, [selectedChat]);

  return (
    <>
      <>
        {selectedChat ? (
          <>
            <div className="chat-topic-head">
              <p style={{ textTransform: "capitalize" }}>
                {selectedChat.chatName}
              </p>
              <span>
                {selectedChat.users[0]._id === user._id
                  ? selectedChat.users[1].profile_name
                  : selectedChat.users[0].profile_name}{" "}
                | Delhi, India
              </span>
            </div>
            <SingleMessage messages={messages} isTyping={isTyping} />
            <form
              id="form"
              action=""
              onSubmit={sendMessage}
              className="chat-box"
            >
              <input
                id="input"
                autocomplete="off"
                value={message}
                placeholder="Message..."
                className="chat-box-input"
                onChange={typingHandler}
              />
              <button className="send-btn">
                <img src={send} alt="" />
              </button>
            </form>
          </>
        ) : (
          <div className="alternate-text-container">
            <p className="alternate-text">
              Click On Chat Head to start conversation
            </p>
          </div>
        )}
      </>
    </>
  );
}

export default ChatBox;
