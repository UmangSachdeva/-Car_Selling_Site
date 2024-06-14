const Chat = require("../Schema/Chat");
const User = require("../Schema/User");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/AppError");
const Car = require("../Schema/Car");
const Message = require("../Schema/Message")

exports.createChat = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const { offer } = req.body;

    const message = `Hi, I want to make an offer for ${offer}`



    const post = await Car.findOne({ slug })
    if (!post) {
      throw new Error("No Post found");
    }

    const user = await User.findById(post.posted_by);


    if (!user) {
      throw new Error("No User found");
    }

    if (req.user.id == user._id) {
      throw new Error("User cannot chat with themselves");
    }

    let chat = await Chat.find({
      isGroupChat: false,
      $and: [{ users: req.user.id }, { users: user._id }, { chatName: post.name + " " + post.model }],
    })
      .populate({ path: "users" })
      .populate("latestMessages");



    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "profile_name email _id",
    });

    if (chat.length > 0) {
      res.send(chat[0]);
    } else {
      const createChat = await Chat.create({
        chatName: post.name + " " + post.model,
        users: [req.user.id, user._id],
      });

      const fullChat = await Chat.findOne({ _id: createChat._id });

      let newMessage = {
        sender: req.user.id,
        message: message,
        chat: createChat._id,
      };

      let msg = await Message.create(newMessage);
      msg = await msg.populate({
        path: "sender",
        select: "email profile_name _id",
      });
      msg = await msg.populate({ path: "chat", select: "users _id" });
      msg = await User.populate(msg, {
        path: "chat.users",
        select: "profile_name email _id",
      });

      await Chat.findByIdAndUpdate(
        createChat._id,
        { latestMessages: msg },
        { new: true }
      );

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
