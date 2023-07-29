const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/authRoutes");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);

module.exports = app;
