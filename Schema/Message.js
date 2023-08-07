const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    message: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "chat",
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.pre("save", function (next) {
  this.populate({ path: "sender chat", select: "profile_name users" });

  next();
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
