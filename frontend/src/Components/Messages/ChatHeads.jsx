import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { toast } from "react-hot-toast";
import MenuIcon from "@mui/icons-material/Menu";
// import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../Resources/logo-no-background.png";
import {
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import shopContext from "../../Context/shopContext";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "26%",
  top: "60px",
  paddingBottom: "60px",
  zIndex: 0,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  top: "60px",
  zIndex: 1,
  paddingBottom: "60px",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   position: "relative",
//   height: "100%",
//   width: "100%",
//   // ...(open && {
//   //   ...openedMixin(theme),
//   //   "& .MuiDrawer-paper": openedMixin(theme),
//   // }),
//   // ...(!open && {
//   //   ...closedMixin(theme),
//   //   "& .MuiDrawer-paper": closedMixin(theme),
//   // }),
// }));

function ChatHeads() {
  const [chats, setChats] = useState();
  const [user, setUser] = useState();
  const { selectedChat, setSelectedChat, fetchAgain, loading, setLoading } =
    useContext(shopContext);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fetchChats = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/chats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setChats(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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
          width: 45,
          height: 45,
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
          {loading && (
            <div className={`chat-head-container `}>
              <div className="user-avatar">
                <Skeleton variant="circular" width={80} height={80} />
              </div>
              <div className="user-details" style={{ width: "100%" }}>
                <span className="user-name">
                  <Skeleton variant="h4" sx={{ width: "100%" }} />
                </span>

                <span className="spec-unit">
                  <Skeleton variant="text" sx={{ width: "100%" }} />
                </span>

                <p className="last_message">
                  <Skeleton variant="text" sx={{ width: "100%" }} />
                </p>
              </div>
            </div>
          )}
          {!loading &&
            chats?.map((item, index) => {
              const chatWith =
                item.users[0]?._id === user?._id
                  ? item?.users[1]
                  : item?.users[0];

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
                      {...stringAvatar(
                        chatWith?.f_name + " " + chatWith?.l_name
                      )}
                    />
                  </div>
                  <div className="user-details">
                    <span className="user-name">
                      {chatWith?.f_name + " " + chatWith?.l_name}
                    </span>
                    <br />
                    <span className="spec-unit">for {item?.chatName}</span>
                    <br />
                    {item?.latestMessages && (
                      <p className="last_message">
                        {item?.latestMessages?.sender?.profile_name}:{" "}
                        <span className="spec-unit">
                          {item?.latestMessages?.message}
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
          <AppBar
            position="fixed"
            open={open}
            className="bg-[#fffcf5] h-[60px]"
          >
            <Toolbar>
              <IconButton
                className="z-20"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon className="text-black" />
              </IconButton>
              <div
                className="heading font-type-1"
                style={{
                  fontWeight: 700,
                  fontSize: 28,
                  marginTop: "14px",
                  position: `${
                    location.pathname === "/messages" ? "fixed" : ""
                  }`,
                  width: "100%",
                }}
              >
                <img
                  style={{ width: "50%" }}
                  src={logo}
                  alt=""
                  className="m-auto"
                />
              </div>
            </Toolbar>
          </AppBar>
          <Drawer variant="persistent" open={open}>
            <DrawerHeader
              sx={{
                justifyContent: open ? "flex-end" : "center",
                minHeight: "60px",
              }}
            >
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
              {loading && (
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                  }}
                >
                  <ListItemButton
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
                        <Skeleton variant="circular" width={45} height={45} />
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
                          <Skeleton variant="h4" sx={{ width: "100%" }} />
                        </span>

                        <span className="spec-unit">
                          {" "}
                          <Skeleton variant="text" sx={{ width: "100%" }} />
                        </span>
                      </div>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              )}
              {!loading &&
                user &&
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
