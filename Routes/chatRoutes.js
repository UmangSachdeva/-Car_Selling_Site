const express = require("express");
const router = express.Router();
const chatController = require("../Controller/chatController");
const authController = require("../Controller/authController");

router
  .route("/")
  .get(authController.verifyMe, chatController.getChats)


router.route("/:slug").post(authController.verifyMe, chatController.createChat);

module.exports = router;
