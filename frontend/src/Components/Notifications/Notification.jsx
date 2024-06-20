import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import shopContext from "../../Context/shopContext";
import { NotificationsNone, NotificationsRounded } from "@mui/icons-material";
import { formatDistanceToNow, subDays } from "date-fns";
import { addMessages } from "../../Features/messages/messageSlice";
import { AnimatePresence, motion } from "framer-motion";

function Notification() {
  const context = useContext(shopContext);

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

  const [isDeleted, setIsDeleted] = useState(notification.length);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseAccount2 = () => {
    setAnchorEl2(null);
  };

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
    <>
      <IconButton
        onClick={handleClick2}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open2 ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? "true" : undefined}
      >
        {notification.length === 0 ? (
          <NotificationsNone sx={{ color: "#212529", width: 30, height: 30 }} />
        ) : (
          <Badge badgeContent={notification.length} color="primary">
            <NotificationsRounded
              sx={{ color: "#212529", width: 30, height: 30 }}
            />
          </Badge>
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl2}
        id="account-menu"
        open={open2}
        onClose={handleCloseAccount2}
        // onClick={handleCloseAccount2}
        PaperProps={{
          elevation: 0,
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
        <div className="flex flex-col gap-2 p-4 max-h-[80vh] overflow-hidden overflow-y-scroll no-scrollbar">
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
            <motion.span className="menu-title min-h-[72px] flex items-center">
              No Notifications
            </motion.span>
          )}

          <AnimatePresence className="flex flex-col gap-2" mode="popLayout">
            {notification.map((noti, index) => (
              <motion.div
                key={noti?._id}
                initial={{ opacity: 0, x: -400, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 200, scale: 1.2 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <MenuItem
                  onClick={() => {
                    // setSelectedChat(noti.chat);
                    // setNotification(notification.filter((n) => n !== noti));
                    deleteNotification(index);
                    // nav("/messages");
                  }}
                  className="flex flex-col gap-2 transition-opacity bg-white rounded-lg oultine outline-black outline-2 hover:outline hover:outline-black "
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
                  <p className="w-full line-clamp-3">{noti?.message}</p>
                </MenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Menu>
    </>
  );
}

export default Notification;
