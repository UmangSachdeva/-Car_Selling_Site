import { Box, Menu, MenuItem } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import shopContext from "../../Context/shopContext";
import { useDispatch } from "react-redux";
import { addMessages } from "../../Features/messages/messageSlice";
import { formatDistanceToNow } from "date-fns";
import { useSwipeable } from "react-swipeable";
import NoData from "../../Resources/no-data.png";

const SwipabelCard = ({ noti, deleteNotification, index }) => {
  const [position, setPosition] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const resetPosition = () => {
    setPosition(0);
    setOpacity(1);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setIsSwiping(true);
      setPosition(eventData.deltaX);
      setOpacity(1 - Math.abs(eventData.deltaX) / 200);
    },
    onSwipedLeft: (eventData) => handleSwipeEnd(eventData),
    onSwipedRight: (eventData) => handleSwipeEnd(eventData),
    onSwiped: () => {
      setIsSwiping(false);
    },
  });

  const handleSwipeEnd = (eventData) => {
    console.log(Math.abs(eventData.absX));
    console.log(Math.abs(eventData.absX) > window.innerWidth / 2);
    if (Math.abs(eventData.absX) > window.innerWidth / 2) {
      setTimeout(() => deleteNotification(index), 300);
    } else {
      resetPosition();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        {...handlers}
        //   initial={{ opacity: 0, x: -400, scale: 0.5 }}
        //   animate={{ opacity: 1, x: 0, scale: 1 }}
        //   exit={{ opacity: 0, x: 200, scale: 1.2 }}
        //   transition={{ duration: 0.6, type: "spring" }}
        initial={{ x: 0, opacity: 1 }}
        animate={{
          x: isSwiping ? position : 0,
          opacity: isSwiping ? opacity : 1,
        }}
        exit={{ x: position > 0 ? 1000 : -1000, opacity: 0 }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <MenuItem
          onClick={() => {
            // setSelectedChat(noti.chat);
            // setNotification(notification.filter((n) => n !== noti));
            deleteNotification(index);
            // nav("/messages");
          }}
          className="flex flex-col gap-2 transition-opacity bg-white rounded-lg outline-2 outline "
        >
          <p className="flex items-baseline justify-between w-full gap-2 text-xl font-bold">
            <span className="break-words line-clamp-[100px]">
              {noti?.sender.profile_name}
            </span>
            <span className="text-sm text-light-black">
              {formatDistanceToNow(new Date(noti?.createdAt), {
                addSuffix: true,
              })}
            </span>
          </p>
          <p className="w-full text-left line-clamp-3">{noti?.message}</p>
        </MenuItem>
      </motion.div>
    </AnimatePresence>
  );
};

function NotificationMobile() {
  const context = useContext(shopContext);
  const dispatch = useDispatch();

  const {
    socket,
    setSelectedChat,
    fetchAgain,
    setMessages,
    setFetchAgain,
    messages,
    selectedChat,
    notification,
    setNotification,
  } = context;

  const deleteNotification = (index) => {
    const temp = notification;
    temp.splice(index, 1);
    setNotification([...temp]);
  };

  const clearNotifications = () => {
    setNotification([]);
  };

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);

          setFetchAgain(!fetchAgain);
        } else {
          setFetchAgain(!fetchAgain);
        }
      } else {
        // setFetchAgain(!fetchAgain);
        dispatch(addMessages(newMessageReceived));
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <Box
      id="account-menu"
      // onClick={handleCloseAccount2}
      PaperProps={{
        elevation: 0,
        minHeight: "344px",
        sx: {
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "400px",
          backgroundColor: "#eeeeee",
          overflow: "visible",
          borderRadius: "10px",
          paddingX: "10px",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
    >
      <div className="flex flex-col h-full gap-2 p-4 overflow-hidden overflow-y-scroll no-scrollbar min-h-[80vh]">
        <div className="flex items-baseline justify-between">
          <p className="text-xl">Notifications</p>
          <p
            className="text-sm underline cursor-pointer"
            onClick={clearNotifications}
          >
            Clear all
          </p>
        </div>

        {notification.length === 0 && (
          <motion.span className="flex flex-col items-center menu-title h-[342px]">
            <img className="object-contain" src={NoData} />
          </motion.span>
        )}

        <AnimatePresence className="flex flex-col gap-2" mode="popLayout">
          {notification.map((noti, index) => (
            <SwipabelCard
              key={noti?._id}
              noti={noti}
              deleteNotification={deleteNotification}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </Box>
  );
}

export default NotificationMobile;
