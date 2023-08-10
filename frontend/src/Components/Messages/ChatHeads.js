import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Avatar } from "@mui/material";
import shopContext from "../../Context/shopContext";

function ChatHeads() {
  const [chats, setChats] = useState();
  const [user, setUser] = useState();
  const { selectedChat, setSelectedChat, fetchAgain } = useContext(shopContext);

  const fetchChats = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/chats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setChats(res.data.data);
      })
      .catch((err) => {
        toast.error("Cannot Fetch Chats");
      });
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        width: 70,
        height: 70,
        fontSize: 30,
        bgcolor: stringToColor(name),
      },
      children: `${name.charAt(0).toUpperCase()}`,
    };
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  useEffect(() => {
    console.log(selectedChat);
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    fetchChats();
  }, [fetchAgain]);

  return (
    <div>
      <h3 className="chat-head-heading">Messages</h3>
      {user &&
        chats?.map((item, index) => {
          const chatWith =
            item.users[0]._id === user._id ? item.users[1] : item.users[0];
          return (
            <div
              className={`chat-head-container ${
                selectedChat?._id === item._id ? "selected" : ""
              }`}
              key={index}
              onClick={() => setSelectedChat(item)}
            >
              <div className="user-avatar">
                <Avatar
                  {...stringAvatar(chatWith.f_name + " " + chatWith.l_name)}
                />
              </div>
              <div className="user-details">
                <span className="user-name">
                  {chatWith.f_name + " " + chatWith.l_name}
                </span>
                <br />
                <span className="spec-unit">for {item.chatName}</span>
                <br />
                {item?.latestMessages && (
                  <p className="last_message">
                    {item.latestMessages.sender.profile_name}:{" "}
                    <span className="spec-unit">
                      {item.latestMessages.message}
                    </span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ChatHeads;
