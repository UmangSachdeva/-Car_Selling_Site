const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT;

const DATABASE =
  process.env.NODE_ENV == "production"
    ? process.env.MONGODBPRODUCTION.replace("<PASSWORD>", process.env.PASSWORD)
    : process.env.MONGODBURI;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB 👋");
  });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(port, () => {
  console.log("Server running on port 9000 ✅⚡");
});

// Socket Setup
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    console.log("setup", userData);
    socket.emit("connected");
  });

  socket.on("typing", (room) => {
    // console.log(room);
    socket.in(room).emit("typing");
  });
  socket.on("stop-typing", (room) => {
    socket.in(room).emit("stop-typing");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
  });

  socket.on("new-message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log(`chat.users not defined`);
    // console.log(chat);
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      // console.log("sent to", user._id);
      socket.to(user._id).emit("message-received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
