import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import {
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import shopContext from "../../Context/shopContext";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  minHeight: "76px",
  color: "grey",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "26%",
  top: "88px",
  paddingBottom: "60px",
  zIndex: 0,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  top: "88px",
  zIndex: 1,
  paddingBottom: "60px",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "relative",
  height: "100%",
  width: "100%",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function ChatHeads() {
  const [chats, setChats] = useState();
  const [user, setUser] = useState();
  const { selectedChat, setSelectedChat, fetchAgain } = useContext(shopContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        "@media (max-width: 460px)": {
          width: 40,
          height: 40,
          fontSize: 20,
        },
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
    <>
      {window.innerWidth > 786 && (
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
      )}
      {window.innerWidth < 786 && (
        <>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{ justifyContent: open ? "flex-end" : "center" }}>
              {open ? (
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon sx={{ color: "black" }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    ml: 0,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuOutlinedIcon
                    sx={{ color: "black", width: 40, height: 40 }}
                  />
                </IconButton>
              )}
            </DrawerHeader>
            <Divider />
            <List>
              {user &&
                chats?.map((item, index) => {
                  const chatWith =
                    item.users[0]._id === user._id
                      ? item.users[1]
                      : item.users[0];
                  return (
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{
                        display: "block",
                        backgroundColor:
                          selectedChat?._id === item._id ? "#FFF1C8" : "",
                      }}
                    >
                      <ListItemButton
                        onClick={() => setSelectedChat(item)}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            justifyContent: "center",
                          }}
                        >
                          <div className="user-avatar">
                            <Avatar
                              {...stringAvatar(
                                chatWith.f_name + " " + chatWith.l_name
                              )}
                            />
                          </div>
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            opacity: open ? 1 : 0,
                            color: "black",
                          }}
                        >
                          <div className="user-details">
                            <span className="user-name">
                              {chatWith.f_name + " " + chatWith.l_name}
                            </span>

                            <span className="spec-unit">
                              for {item.chatName}
                            </span>
                          </div>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </Drawer>
        </>
      )}
    </>
  );
}

export default ChatHeads;
