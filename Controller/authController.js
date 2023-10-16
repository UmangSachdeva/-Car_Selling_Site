const User = require("../Schema/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const AppError = require("../Utils/AppError");
const catchAsync = require("../Utils/catchAsync");

const signToken = (id) => {
  // Signing the jwt token
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return token;
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("User Not found", 404));
  }

  const confirm = await user.verifyPassword(password, user.password);
  if (!confirm) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Sending the JWT token for verification
  const token = signToken(user._id);
  user.password = undefined;
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      profile_name: req.body.profile_name,
    });

    user.password = undefined;
    user.passwordConfirm = undefined;
    user.role = undefined;
    user.__v = undefined;

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      err,
    });
  }
};

exports.fetchMe = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("User not Found");
    }

    res.status(200).json({
      status: "success",
      user: req.user,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
      err,
    });
  }
};

exports.verifyMe = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please Login to get excess", 401)
    );
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to user does not exists", 401)
    );
  }

  req.user = currentUser;
  next();
});
