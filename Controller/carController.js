const factory = require("./factoryHandler");
const Car = require("../Schema/Car");

exports.createCar = factory.createOne(Car);

exports.getAllCars = factory.getAll(Car);

exports.updateCar = factory.updateOne(Car);
