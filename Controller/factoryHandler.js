const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/AppError");
const ApiFeatures = require("../Utils/ApiFeatures");

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newCar = await Model.create({ ...req.body, posted_by: req.user.id });

    res.status(201).json({
      status: "success",
      data: {
        car: newCar,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Model.find({}), req.query);

    const cars = await features.query;

    res.status(200).json({
      status: "success",
      results: cars.length,
      data: {
        cars,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(204).json({
      status: "success",
    });
  });
