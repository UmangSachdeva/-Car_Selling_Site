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

exports.getAll = (Model, props) =>
  catchAsync(async (req, res, next) => {


    const features = new ApiFeatures(Model.find({}), req.query)
      .sort()
      .filter()
      .search(props);
    // .pagiantion();

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

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "Success",
      data: {
        data: doc,
      },
    });
  });
