const mongoose = require("mongoose");
const Car = require("./Car");

const schema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      max: [5, "Rating cannot exceed 5"],
      min: [1, "Rating cannot go below 1"],
    },
    message: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User should be logged in"],
      ref: "users",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Post Id missing"],
    },
  },
  { timestamps: true }
);

schema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "-name -passwordChangedAt -__v",
  });

  next();
});

schema.statics.calcAverage = async function (postId) {
  const stats = await this.aggregate([
    {
      $match: {
        postId: postId,
      },
    },
    {
      $group: {
        _id: "$car",
        total_rating: { $sum: 1 },
        avg_rating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Car.findByIdAndUpdate(postId, {
      total_ratings: stats[0].total_rating,
      avg_ratings: stats[0].avg_rating,
    });
  } else {
    await Car.findByIdAndUpdate(postId, {
      total_ratings: 0,
      avg_ratings: 4.5,
    });
  }
};

schema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();

  next();
});

schema.post("save", function () {
  this.constructor.calcAverage(this.postId);
});

schema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverage(this.r.postId);
});

const Ratings = mongoose.model("rating", schema);

module.exports = Ratings;
