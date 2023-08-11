const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    latestMessages: {
      type: mongoose.Types.ObjectId,
      ref: "message",
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// schema.pre("save", function (next) {
//   this.populate({ path: "users latestMessage chat" });

//   next();
// });

const Chat = mongoose.model("chat", schema);

module.exports = Chat;
