const express = require("express");
const router = express.Router();
const chatController = require("../Controller/chatController");
const authController = require("../Controller/authController");

router
  .route("/")
  .get(authController.verifyMe, chatController.getChats)
  .post(authController.verifyMe, chatController.getChat);

module.exports = router;
