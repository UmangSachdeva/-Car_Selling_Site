const factory = require("./factoryHandler");
const Car = require("../Schema/Car");
const catchAsync = require("../Utils/catchAsync");
const async = require("async");

const cloudinary = require("cloudinary").v2;

// Route to handle image upload
exports.createCar = catchAsync(async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: false,
  });

  try {
    // const { name, description } = req.body;
    const images = req.files;

    // Define concurrency level (number of simultaneous uploads)
    const concurrency = 3;

    // Use async.parallelLimit to control the concurrency
    async.parallelLimit(
      images.map((image) => {
        return (callback) => {
          cloudinary.uploader
            .upload_stream({ folder: "car_rentals" }, (error, result) => {
              if (error) {
                console.error("Error uploading image:", error);
                callback(error);
                return;
              }

              callback(null, result.secure_url);
            })
            .end(image.buffer);
        };
      }),
      concurrency,
      async (error, uploadedUrls) => {
        if (error) {
          res
            .status(500)
            .json({ error: "An error occurred while uploading the images." });
          return;
        }

        // Also upload the data recieved
        const data = await Car.create({
          ...req.body,
          images: uploadedUrls,
          posted_by: req.user._id,
        });

        // Send response with other form data (name, description) and uploaded image URLs
        res.status(200).json({
          message: "Upload successful",
          imageUrls: uploadedUrls,
        });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while uploading the images." });
  }
});

// exports.createCar = factory.createOne(Car);

exports.getAllCars = factory.getAll(Car);

exports.updateCar = factory.updateOne(Car);

exports.getCarBySlug = catchAsync(async (req, res) => {
  const car = await Car.findOne({ slug: req.params.id });

  res.status(200).json({
    status: "success",
    data: car,
  });
});
