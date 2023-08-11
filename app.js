const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/authRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const path = require("path");

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend", "build", "index.html")),
      function (err) {
        if (err) {
          console.log(err.message);
          res.status(500).send({
            err,
          });
        }
      };
  });
}

module.exports = app;
