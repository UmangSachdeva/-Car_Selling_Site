const express = require("express");
const router = express.Router();
const carController = require("../Controller/carController");
const authController = require("../Controller/authController");
const User = require("../Schema/User");

router
  .route("/")
  .get(carController.getAllCars)
  .post(authController.verifyMe, carController.createCar);

router
  .route("/:id")
  .patch(carController.updateCar)
  .get(carController.getCarBySlug);

module.exports = router;
