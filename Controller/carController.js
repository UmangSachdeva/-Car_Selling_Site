const factory = require("./factoryHandler");
const Car = require("../Schema/Car");
const catchAsync = require("../Utils/catchAsync");

exports.createCar = factory.createOne(Car);

exports.getAllCars = factory.getAll(Car);

exports.updateCar = factory.updateOne(Car);

exports.getCarBySlug = catchAsync(async (req, res) => {
  const car = await Car.findOne({ slug: req.params.id });

  res.status(200).json({
    status: "success",
    data: car,
  });
});
