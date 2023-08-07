const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/authRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/message", messageRoutes);

module.exports = app;
