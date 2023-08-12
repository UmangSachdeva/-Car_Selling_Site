import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
  IconButton,
  Divider,
  Badge,
} from "@mui/material";

import { Logout, Settings } from "@mui/icons-material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidRoundedIcon from "@mui/icons-material/ForumOutlined";
import CarRentalRoundedIcon from "@mui/icons-material/CarRentalOutlined";
import LoginIcon from "@mui/icons-material/Login";
import Login from "./Auth/Login";
import axios from "axios";
import shopContext from "../Context/shopContext";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";

let selectedChatCompare;
let socket;

function NavBar() {
  const context = useContext(shopContext);
  const {
    setLoginState,
    loginState,
    selectedChat,
    notification,
    setNotification,
    setSelectedChat,
    loggedIn,
    setLoggedIn,
    selectedPage,
    setSelectedPage,
  } = context;
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [login, setLogin] = useState(false);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const location = useLocation();

  const handleClose = () => setLogin(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAnchorEl(null);
  };
  const handleCloseAccount2 = () => {
    setAnchorEl2(null);
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

  const handleLogout = () => {
    setLoginState(false);
    setLoggedIn(false);
    localStorage.removeItem("token");
    nav("/");
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.charAt(0).toUpperCase()}`,
    };
  };

  const checkMe = () => {
    if (localStorage.getItem("token")) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoggedIn(res.data.user);
        });
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    socket = io.connect(process.env.REACT_APP_SOCKET_URL);
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    checkMe();
  }, [loginState]);

  useEffect(() => {}, [window.innerWidth]);

  return (
    <div>
      <Login showCmd={login} handleClose={handleClose} />
      {window.innerWidth > 768 && (
        <nav className="navbar navbar-expand-lg bg-transparent">
          <div className="container-fluid">
            <motion.a
              className="navbar-brand font-type-1"
              whileHover={{
                scale: 1.2,
                rotate: -5,
                transition: { duration: 0.5 },
              }}
              href="/"
            >
              CAR RENTAL
            </motion.a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    href="/"
                  >
                    How it works?
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Pricing
                  </a>
                </li>

                {loggedIn && (
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        location.pathname === "/messages" ? "active" : ""
                      }`}
                      href="/messages"
                    >
                      Messages
                    </a>
                  </li>
                )}
              </ul>
              {!loggedIn && (
                <button
                  onClick={() => setLogin(true)}
                  type="button"
                  className="btn btn-warning btn-navbar"
                >
                  Get Started
                </button>
              )}
              {loggedIn && (
                <div className="profile-part">
                  <div className="login-info">
                    <IconButton
                      onClick={handleClick2}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open2 ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open2 ? "true" : undefined}
                    >
                      {notification.length === 0 ? (
                        <NotificationsNoneRoundedIcon
                          sx={{ color: "#212529", width: 30, height: 30 }}
                        />
                      ) : (
                        <Badge
                          badgeContent={notification.length}
                          color="primary"
                        >
                          <NotificationsRoundedIcon
                            sx={{ color: "#212529", width: 30, height: 30 }}
                          />
                        </Badge>
                      )}
                    </IconButton>

                    {notification.length === 0 ? (
                      <Menu
                        anchorEl={anchorEl2}
                        id="account-menu"
                        open={open2}
                        onClose={handleCloseAccount2}
                        onClick={handleCloseAccount2}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              color: "black",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
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
                        <MenuItem onClick={handleClose}>
                          <span className="menu-title">No Notifications</span>
                        </MenuItem>
                      </Menu>
                    ) : (
                      <Menu
                        anchorEl={anchorEl2}
                        id="account-menu"
                        open={open2}
                        onClose={handleCloseAccount2}
                        onClick={handleCloseAccount2}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              color: "black",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
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
                        {notification.map((noti, index) => (
                          <MenuItem
                            onClick={() => {
                              setSelectedChat(noti.chat);
                              setNotification(
                                notification.filter((n) => n !== noti)
                              );
                              nav("/messages");
                            }}
                            key={index}
                          >
                            <span className="menu-title">
                              New Message From {noti?.sender.profile_name}
                            </span>
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </div>
                  <div className="login-info">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        {...stringAvatar(
                          loggedIn.f_name + " " + loggedIn.l_name
                        )}
                      />
                    </IconButton>
                    <span>{loggedIn.profile_name}</span>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleCloseAccount}
                      onClick={handleCloseAccount}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            color: "black",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        <span className="menu-title">Setting</span>
                        Settings
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout} sx={{ color: "black" }}>
                        <ListItemIcon>
                          <Logout sx={{ color: "#ff7730" }} fontSize="small" />
                        </ListItemIcon>
                        <span className="Logout">Logout</span>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
      {window.innerWidth <= 768 && (
        <>
          <div className="application-name">
            <div
              className="heading font-type-1"
              style={{ fontWeight: 700, fontSize: 28, marginTop: "14px" }}
            >
              CAR CENTRAL
            </div>
          </div>
          <BottomNavigation
            sx={{ height: "80px", borderRadius: 0 }}
            showLabels
            value={selectedPage}
            onChange={(event, newValue) => {
              setSelectedPage(newValue);
            }}
          >
            <BottomNavigationAction
              label="HOME"
              value="home"
              icon={<HomeIcon sx={{ width: 40, height: 40 }} />}
              onClick={() => nav("/")}
            />
            <BottomNavigationAction
              label="CATALOG"
              value="catalog"
              icon={<CarRentalRoundedIcon sx={{ width: 40, height: 40 }} />}
            />
            <BottomNavigationAction
              label="MESSAGES"
              onClick={() => nav("/messages")}
              value="message"
              icon={<PaidRoundedIcon sx={{ width: 40, height: 40 }} />}
            />

            {loggedIn ? (
              <BottomNavigationAction
                value="account"
                label="ACCOUNT"
                onClick={handleClick}
                icon={
                  <Avatar
                    sx={{ width: 10, height: 10 }}
                    {...stringAvatar(loggedIn.profile_name)}
                  />
                }
              />
            ) : (
              <BottomNavigationAction
                value="account"
                label="LOGIN"
                onClick={() => setLogin(true)}
                icon={<LoginIcon sx={{ width: 40, height: 40 }} />}
              />
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleCloseAccount}
              onClick={handleCloseAccount}
              PaperProps={{
                elevation: 0,
                sx: {
                  top: "630px !important",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    bottom: -10,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    color: "black",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <span className="menu-title">Setting</span>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: "black" }}>
                <ListItemIcon>
                  <Logout sx={{ color: "#ff7730" }} fontSize="small" />
                </ListItemIcon>
                <span className="Logout">Logout</span>
              </MenuItem>
            </Menu>
          </BottomNavigation>
        </>
      )}
    </div>
  );
}

export default NavBar;
