const factoryHandler = require("../Controller/factoryHandler");
const Ratings = require("../Schema/ratings");
const Cars = require("../Schema/Car");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/AppError");

exports.setPostUserIds = (req, res, next) => {
  if (!req.body.postId) req.body.tour = req.params.postId;
  if (!req.body.userId) req.body.userId = req.user.id;

  next();
};



exports.addReview = catchAsync(async (req, res, next) => {


  const post = await Cars.findOne({ slug: req.params.id });



  const ratings = await Ratings.find({ $and: [{ postId: post._id }, { userId: req.user.id }] })
  if (ratings.length != 0) {
    return next(new AppError("Rating already exists", 403))
  }

  const newCar = await Ratings.create({ ...req.body, userId: req.user.id, postId: post._id });

  res.status(201).json({
    status: "success",
    data: {
      car: newCar,
    },
  });
});;

exports.getReview = catchAsync(async (req, res, next) => {

  const post = await Cars.findOne({ slug: req.params.id })

  let query = Ratings.find({ postId: post._id }).populate("userId postId");


  const doc = await query;

  if (!doc) {
    next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    results: doc.length,
    data:
      doc,
  });
});;

exports.getReviewAll = factoryHandler.getAll(Ratings);

exports.updateReview = factoryHandler.updateOne(Ratings);
