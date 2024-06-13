const factory = require("./factoryHandler");
const Car = require("../Schema/Car");
const catchAsync = require("../Utils/catchAsync");
const async = require("async");

const cloudinary = require("cloudinary").v2;

// Route to handle image upload
exports.uploadFile = catchAsync(async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads", // Optional folder in Cloudinary
    });

    // Image uploaded successfully
    res.status(200).json({ message: "Upload successful", result: result });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while uploading the images.",
      err: error,
    });
  }
});

exports.createCar = factory.createOne(Car);

exports.getAllCars = factory.getAll(Car, ["name", "model"]);

exports.updateCar = factory.updateOne(Car);

exports.getCarBySlug = catchAsync(async (req, res) => {
  const car = await Car.findOne({ slug: req.params.id });

  res.status(200).json({
    status: "success",
    data: car,
  });
});
