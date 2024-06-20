import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
  IconButton,
  Divider,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Toaster } from "react-hot-toast";

import {
  CarRental,
  CarRentalRounded,
  DirectionsCarFilled,
  DirectionsCarFilledOutlined,
  Home,
  Logout,
  PaidRounded,
  Settings,
} from "@mui/icons-material";
import logo from "../Resources/logo-no-background.png";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidRoundedIcon from "@mui/icons-material/ForumOutlined";
import CarRentalRoundedIcon from "@mui/icons-material/CarRentalOutlined";
import LoginIcon from "@mui/icons-material/Login";
import Login from "./Auth/Login";
import { useDispatch } from "react-redux";
import { addAuth, removeAuth } from "../Features/Auth/authSlice";
import axios from "axios";
import shopContext from "../Context/shopContext";
import io from "socket.io-client";
import { useLocation, useNavigate, NavLink, Link } from "react-router-dom";
import axiosPrivate from "../axios_config/axiosPrivate";
import Notification from "./Notifications/Notification";

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
    selectedPage,
    setSelectedChat,
    loggedIn,
    setSelectedPage,
    setLoggedIn,
  } = context;
  const nav = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const [login, setLogin] = useState(false);
  const open = Boolean(anchorEl);

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setLogin(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorEl(null);
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
    dispatch(removeAuth({}));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
      axiosPrivate
        .get(`/auth/me`)
        .then((res) => {
          dispatch(addAuth(res.data.user));
          setLoggedIn(res.data.user);
        })
        .catch((err) => {});
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    socket = io.connect(import.meta.env.VITE_APP_SOCKET_URL);
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    checkMe();
  }, [loginState]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, [window.innerWidth]);

  return (
    <div>
      {isMobile ? (
        <Toaster position="top-center" reverseOrder={false} />
      ) : (
        <Toaster position="bottom-right" reverseOrder={false} />
      )}
      <Login showCmd={login} handleClose={handleClose} />
      {!isMobile && (
        <nav className="bg-transparent navbar navbar-expand">
          <div className="container-fluid">
            <motion.div
              className="navbar-brand font-type-1"
              whileHover={{
                scale: 1.2,
                rotate: -5,
                transition: { duration: 0.5 },
              }}
            >
              <NavLink to="/">
                <img src={logo} alt="" />
              </NavLink>
            </motion.div>

            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  How it works?
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/car-space">
                  Car List
                </NavLink>
              </li>

              {loggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${
                      location.pathname === "/messages" ? "active" : ""
                    }`}
                    to="/messages"
                  >
                    Messages
                  </NavLink>
                </li>
              )}
            </ul>
            {!loggedIn && (
              <button
                onClick={() => setLogin(true)}
                type="button"
                className="btn btn-warning btn-navbar bg-theme-yellow"
              >
                Get Started
              </button>
            )}
            {loggedIn && (
              <div className="profile-part">
                <div className="login-info">
                  <Notification />
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
                      {...stringAvatar(loggedIn.f_name + " " + loggedIn.l_name)}
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
                        minWidth: "200px",
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
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      sx={{ color: "black" }}
                      // LinkComponent={Link}
                      onClick={() => nav("/list-your-car")}
                    >
                      <ListItemIcon>
                        <DirectionsCarFilled fontSize="small" />
                      </ListItemIcon>
                      <span>List Your Car</span>
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
        </nav>
      )}
      {isMobile && (
        <>
          <div className="my-4 application-name">
            <div
              className="heading font-type-1"
              style={{
                fontWeight: 700,
                fontSize: 28,
                marginTop: "14px",
                position: `${location.pathname === "/messages" ? "fixed" : ""}`,
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
          </div>
          <BottomNavigation
            sx={{
              height: "80px",
              borderRadius: 0,
              "& .Mui-selected": {
                "& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label": {},
              },

              "& .MuiBottomNavigationAction-label": {
                color: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "#eeeeee",
              },
            }}
            showLabels
            value={selectedPage}
            onChange={(event, newValue) => {
              setSelectedPage(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              value="home"
              icon={<HomeIcon sx={{ width: 40, height: 40 }} />}
              onClick={() => nav("/")}
            />
            <BottomNavigationAction
              label="Catalog"
              onClick={() => nav("/car-space")}
              value="catalog"
              icon={<CarRentalRoundedIcon sx={{ width: 40, height: 40 }} />}
            />
            <BottomNavigationAction
              label="Messages"
              onClick={() => nav("/messages")}
              value="message"
              icon={<PaidRoundedIcon sx={{ width: 40, height: 40 }} />}
            />

            {loggedIn ? (
              <BottomNavigationAction
                // value="account"
                label="Account"
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
                  minWidth: "200px",
                  bottom: "74px !important",
                  top: "auto !important",
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
              <MenuItem onClick={() => nav("/your-notifications")}>
                <ListItemIcon>
                  <NotificationsNoneRoundedIcon fontSize="small" />
                </ListItemIcon>
                <span className="menu-title">Notifications</span>
              </MenuItem>
              <MenuItem onClick={() => nav("/list-your-car")}>
                <ListItemIcon>
                  <DirectionsCarFilled fontSize="small" />
                </ListItemIcon>
                <span className="menu-title">List your Car</span>
              </MenuItem>
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
