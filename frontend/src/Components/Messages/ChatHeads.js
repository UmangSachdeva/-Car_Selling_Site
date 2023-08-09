import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function ChatHeads() {
  const [chats, setChats] = useState();
  const [user, setUser] = useState();

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

  const getSender = (loggedUser, users) => {
    console.log(loggedUser);
    return users[0]._id === loggedUser._id
      ? users[1].f_name + " " + users[1].l_name
      : users[0].f_name + " " + users[0].l_name;
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    fetchChats();
  }, []);

  return (
    <div>
      {user &&
        chats?.map((item, index) => {
          return <span>{getSender(user, item.users)}</span>;
        })}
    </div>
  );
}

export default ChatHeads;
