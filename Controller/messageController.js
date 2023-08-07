const Message = require("../Schema/Message");
const User = require("../Schema/User");
const Chat = require("../Schema/Chat");

exports.sendMessage = async (req, res, next) => {
  try {
    const { message, chatId } = req.body;

    if (!message || !chatId) {
      throw new Error("Please provide the required field");
    }

    let newMessage = {
      sender: req.user.id,
      message: message,
      chat: chatId,
    };

    let msg = await Message.create(newMessage);
    msg = await User.populate(msg, {
      path: "chat.users",
      select: "profile_name email _id",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: msg }, { new: true });

    res.status(200).json({ status: "success", data: msg });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
      err,
    });
  }
};

exports.allMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const getMessage = await Message.find({
      chat: chatId,
    }).populate({ path: "sender", select: "-password -__v -f_name -l_name" });

    res.status(200).json({
      status: "success",
      results: getMessage.length,
      data: getMessage,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
      err,
    });
  }
};
