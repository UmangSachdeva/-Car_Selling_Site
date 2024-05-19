const express = require("express");
const router = express.Router();
const carController = require("../Controller/carController");
const authController = require("../Controller/authController");
const User = require("../Schema/User");
const multer = require("multer");

// Configure multer for file upload
const storage = multer.diskStorage({});
const upload = multer({ storage });

router
  .route("/upload")
  .post(
    authController.verifyMe,
    upload.single("image"),
    carController.uploadFile
  );

router
  .route("/")
  .get(carController.getAllCars)
  .post(authController.verifyMe, carController.createCar);

router
  .route("/:id")
  .patch(carController.updateCar)
  .get(carController.getCarBySlug);

module.exports = router;
