const Chat = require("../Schema/Chat");
const User = require("../Schema/User");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/AppError");

exports.getChat = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error("No User found");
    }

    let chat = await Chat.find({
      isGroupChat: false,
      $and: [{ users: req.user.id }, { users: userId }],
    })
      .populate({ path: "users" })
      .populate("latestMessage");

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "profile_name email _id",
    });

    if (chat.length > 0) {
      res.send(chat[0]);
    } else {
      const createChat = await Chat.create({
        chatName: "sender",
        users: [req.user.id, userId],
      });

      const fullChat = await Chat.findOne({ _id: createChat._id });

      res.status(200).json({ status: "success", data: fullChat });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", error: err.message, err });
  }
};

exports.getChats = catchAsync(async (req, res, next) => {
  const chat = await Chat.find({
    users: { $elemMatch: { $eq: req.user.id } },
  })
    .populate("users", "-password -passwordConfirm -role -__v")
    .populate("latestMessages")
    .sort({ updatedAt: -1 });

  const user = await User.populate(chat, {
    path: "latestMessages.sender",
    select: "profile_name email _id",
  });

  res.status(200).json({ status: "success", data: user });
});
