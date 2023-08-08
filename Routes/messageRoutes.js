const express = require("express");
const router = express.Router();
const messageController = require("../Controller/messageController");
const authController = require("../Controller/authController");

router
  .route("/:chatId")
  .get(authController.verifyMe, messageController.allMessages);
router.route("/").post(authController.verifyMe, messageController.sendMessage);

module.exports = router;
