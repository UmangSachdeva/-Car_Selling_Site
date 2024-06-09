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
const errorHandler = require("./Controller/errorController");
const carRoutes = require("./Routes/carRoutes");
const ratingsRoute = require("./Routes/ratingsRoutes");

app.use(bodyParser.json());
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(xss());
app.use(mongoSanitize());

app.use(errorHandler);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/cars", carRoutes);
app.use("/api/v1/ratings", ratingsRoute);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "/frontend", "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend", "dist", "index.html")),
    function (err) {
      if (err) {
        res.status(500).send({
          err,
        });
      }
    };
});

module.exports = app;
