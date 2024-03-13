const factoryHandler = require("../Controller/factoryHandler");
const Ratings = require("../Schema/ratings");

exports.setPostUserIds = (req, res, next) => {
  if (!req.body.postId) req.body.tour = req.params.postId;
  if (!req.body.userId) req.body.userId = req.user.id;

  next();
};

exports.addReview = factoryHandler.createOne(Ratings);

exports.getReview = factoryHandler.getOne(Ratings);

exports.getReviewAll = factoryHandler.getAll(Ratings);

exports.updateReview = factoryHandler.updateOne(Ratings);
