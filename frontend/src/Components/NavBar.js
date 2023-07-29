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
} from "@mui/material";

import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import CarRentalRoundedIcon from "@mui/icons-material/CarRentalRounded";
import Login from "./Auth/Login";
import axios from "axios";
import shopContext from "../Context/shopContext";

function NavBar() {
  const [selectedPage, setSelectedPage] = useState("home");
  const context = useContext(shopContext);
  const { loginState, setLoginState } = context;
  const [anchorEl, setAnchorEl] = useState(null);
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const open = Boolean(anchorEl);

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
    localStorage.removeItem("token");
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
    checkMe();
  }, [loginState]);
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
                  <a className="nav-link active" aria-current="page" href="/">
                    How it works?
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Car Locations
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Pricing
                  </a>
                </li>
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
                <div className="login-info">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar {...stringAvatar(loggedIn.profile_name)} />
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
              )}
            </div>
          </div>
        </nav>
      )}
      {window.innerWidth <= 768 && (
        <BottomNavigation
          value={selectedPage}
          onChange={(event, newValue) => {
            setSelectedPage(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Buy"
            value="buy"
            icon={<PaidRoundedIcon />}
          />
          <BottomNavigationAction
            label="Rent"
            value="rent"
            icon={<CarRentalRoundedIcon />}
          />
          {loggedIn && (
            <BottomNavigationAction
              value="account"
              icon={
                <Avatar
                  sx={{ width: 10, height: 10 }}
                  {...stringAvatar(loggedIn.profile_name)}
                />
              }
            />
          )}
          {!loggedIn && (
            <BottomNavigationAction
              value="account"
              label="Account"
              icon={<AccountCircleIcon />}
            />
          )}
        </BottomNavigation>
      )}
    </div>
  );
}

export default NavBar;
