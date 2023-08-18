import { React, useContext, useState } from "react";
import { Modal, Box } from "@mui/material";
import signupPic from "../../Resources/signup.gif";
import axios from "axios";
import { toast } from "react-hot-toast";
import shopContext from "../../Context/shopContext";

function Login({ showCmd, handleClose }) {
  const context = useContext(shopContext);
  const { setLoginState } = context;
  const [login, setLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [signupDetails, setSignupDetails] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    profile_name: "",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "#FFFCF5",
    boxShadow: 24,
    borderRadius: "28px",
  };

  const handleInput = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggle = (target) => {
    if (target === "signup") {
      setLogin(false);
      document
        .getElementById("container")
        .classList.remove("right-panel-active");
    } else {
      setLogin(true);
      document.getElementById("container").classList.add("right-panel-active");
    }
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    const toastIdSignup = toast.loading("Signing you in....");
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, signupDetails)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setLoginState(true);
        toast.success("Signup successfull", {
          id: toastIdSignup,
        });
        handleClose();
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          id: toastIdSignup,
        });
      });
  };

  const handleInputSignup = (e) => {
    setSignupDetails({
      ...signupDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loggin you in....");
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, loginDetails)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setLoginState(true);
        toast.success("Logged in successfully", {
          id: toastId,
        });
        handleClose();
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          id: toastId,
        });
      });
  };

  return (
    <div>
      {window.innerWidth > 768 && (
        <Modal
          open={showCmd}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
        >
          <Box sx={style}>
            <div className="close-container" onClick={handleClose}>
              <div className="leftright signup close-symbol"></div>
              <div className="rightleft signup close-symbol"></div>
              <label className="close">close</label>
            </div>
            <div className="container" id="container">
              <div className="right-content content_login form-container sign-in-container">
                <form action="" className="login__form">
                  <h2 className="heading">
                    Welcome Back,
                    <br /> Log In
                  </h2>

                  <input
                    value={loginDetails.email}
                    className="form__input"
                    type="email"
                    name="email"
                    id=""
                    onChange={handleInput}
                    placeholder="Email"
                    required
                  />
                  <input
                    value={loginDetails.password}
                    className="form__input"
                    type="password"
                    name="password"
                    onChange={handleInput}
                    id=""
                    minlength="8"
                    placeholder="Password"
                    required
                  />

                  <div className="extra-links input__box">
                    <a href="/#">forgot password?</a>
                    <a href="/#" onClick={() => handleToggle("login")}>
                      Signup ?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="form__submit"
                    onClick={(e) => handleSubmit(e, "login")}
                  >
                    Log In
                  </button>
                </form>
              </div>
              <div className="left-content content_signup form-container sign-up-container">
                <form action="" className="login__form">
                  <h2 className="heading">
                    Start your journey,
                    <br /> Sign up
                  </h2>
                  <div className="input__box">
                    <input
                      type="text"
                      value={signupDetails.f_name}
                      name="f_name"
                      className="form__input"
                      placeholder="First Name"
                      onChange={handleInputSignup}
                      required
                    />
                    <input
                      type="text"
                      value={signupDetails.l_name}
                      className="form__input"
                      name="l_name"
                      onChange={handleInputSignup}
                      placeholder="Last Name"
                    />
                  </div>

                  <input
                    value={signupDetails.email}
                    className="form__input"
                    type="email"
                    name="email"
                    id=""
                    onChange={handleInputSignup}
                    placeholder="Email"
                    required
                  />

                  <input
                    value={signupDetails.profile_name}
                    className="form__input"
                    type="text"
                    name="profile_name"
                    id=""
                    onChange={handleInputSignup}
                    placeholder="Username"
                    required
                  />
                  <input
                    value={signupDetails.password}
                    className="form__input"
                    type="password"
                    name="password"
                    onChange={handleInputSignup}
                    id=""
                    minlength="8"
                    placeholder="Password"
                    required
                  />

                  <input
                    value={loginDetails.passwordConfirm}
                    className="form__input"
                    type="password"
                    name="passwordConfirm"
                    onChange={handleInputSignup}
                    id=""
                    minlength="8"
                    placeholder="Confirm Password"
                    required
                  />

                  <div className="extra-links input__box">
                    <a href="/#" onClick={() => handleToggle("signup")}>
                      Log in?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="form__submit"
                    onClick={handleSubmitSignup}
                  >
                    Sign up
                  </button>
                </form>
              </div>
              <div className="overlay-container">
                <div className="overlay">
                  <div className="left-content overlay-panel content_login overlay-left">
                    <img src={signupPic} alt="" />
                  </div>

                  <div className="right-content overlay-panel content_signup overlay-right">
                    <img
                      src="https://res.cloudinary.com/dzoujuxn4/image/upload/v1692355624/login_wctrwl.gif"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      )}
      {window.innerWidth < 768 && (
        <Modal
          open={showCmd}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "97%",
              height: "fit-content",
              bgcolor: "#FFFCF5",
              boxShadow: 24,
              borderRadius: "28px 28px 0px 0px",
            }}
          >
            <div className="close-container" onClick={handleClose}>
              <div
                className="leftright signup close-symbol"
                style={{ backgroundColor: "#FFC107" }}
              ></div>
              <div
                className="rightleft signup close-symbol"
                style={{ backgroundColor: "#FFC107" }}
              ></div>
              <label className="close">close</label>
            </div>

            <div className="container" id="container">
              {login ? (
                <div className="">
                  <form
                    action=""
                    className="login__form"
                    style={{ padding: "17px" }}
                  >
                    <h2 className="heading">
                      Welcome Back,
                      <br /> Log In
                    </h2>

                    <input
                      value={loginDetails.email}
                      className="form__input"
                      type="email"
                      name="email"
                      id=""
                      onChange={handleInput}
                      placeholder="Email"
                      required
                    />
                    <input
                      value={loginDetails.password}
                      className="form__input"
                      type="password"
                      name="password"
                      onChange={handleInput}
                      id=""
                      minlength="8"
                      placeholder="Password"
                      required
                    />

                    <div className="extra-links input__box">
                      <a href="/#">forgot password?</a>
                      <a href="/#" onClick={() => setLogin(false)}>
                        Signup ?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="form__submit"
                      onClick={(e) => handleSubmit(e, "login")}
                    >
                      Log In
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <form action="" className="login__form">
                    <h2 className="heading">
                      Start your journey,
                      <br /> Sign up
                    </h2>
                    <div className="input__box">
                      <input
                        type="text"
                        value={signupDetails.f_name}
                        name="f_name"
                        className="form__input"
                        placeholder="First Name"
                        onChange={handleInputSignup}
                        required
                      />
                      <input
                        type="text"
                        value={signupDetails.l_name}
                        className="form__input"
                        name="l_name"
                        onChange={handleInputSignup}
                        placeholder="Last Name"
                      />
                    </div>

                    <input
                      value={signupDetails.email}
                      className="form__input"
                      type="email"
                      name="email"
                      id=""
                      onChange={handleInputSignup}
                      placeholder="Email"
                      required
                    />

                    <input
                      value={signupDetails.profile_name}
                      className="form__input"
                      type="text"
                      name="profile_name"
                      id=""
                      onChange={handleInputSignup}
                      placeholder="Username"
                      required
                    />
                    <input
                      value={signupDetails.password}
                      className="form__input"
                      type="password"
                      name="password"
                      onChange={handleInputSignup}
                      id=""
                      minlength="8"
                      placeholder="Password"
                      required
                    />

                    <input
                      value={loginDetails.passwordConfirm}
                      className="form__input"
                      type="password"
                      name="passwordConfirm"
                      onChange={handleInputSignup}
                      id=""
                      minlength="8"
                      placeholder="Confirm Password"
                      required
                    />

                    <div className="extra-links input__box">
                      <a href="/#" onClick={() => setLogin(true)}>
                        Log in?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="form__submit"
                      onClick={handleSubmitSignup}
                    >
                      Sign up
                    </button>
                  </form>
                </div>
              )}
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default Login;
