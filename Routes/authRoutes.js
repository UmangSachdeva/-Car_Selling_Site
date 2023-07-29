const User = require("../Schema/User");
const express = require("express");
const authController = require("../Controller/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/me").get(authController.verifyMe, authController.fetchMe);

module.exports = router;
