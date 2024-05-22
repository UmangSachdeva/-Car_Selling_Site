import * as yup from "yup";
import { array, date, object, string, number } from "yup";

export const listingSchema = {
  stepOne: yup.object().shape({
    name: yup.string().required("Name of car is required"),
    model: yup.string().required("Model is required"),
    company_name: yup.string().required("Company name is required"),
    car_type: yup
      .string()
      .oneOf([
        "SUV",
        "Van",
        "Sedan",
        "Truck",
        "Hatchback",
        "Sports Car",
        "Hypercar",
        "Luxury",
      ])
      .required("Car Type is required"),
    price: yup.number().required("Price of the car cannot be null"),
    images: yup
      .array()
      .of(yup.string().url("Please upload a valid URL"))
      .min(1, "At least one image is required")
      .required("Images are required"),
    pricing_type: yup.string().required("required"),
    price_per: yup
      .string()
      .oneOf(["day", "month", "week", "hour"])
      .default("day"),

    days: yup.object().shape({
      min: yup.number().required("Minimum days to rent is required"),
      max: yup
        .number()
        .required("Maximum days to rent is required")
        .test(
          "min-max-validation",
          "Minimum days should be smaller than Maximum days",
          function (value) {
            return this.parent.min <= value;
          }
        ),
    }),
  }),
  stepTwo: object().shape({
    location: yup.object().shape({
      coordinates: yup.array().of(yup.number()),
      address: yup.string().required("Location is required"),
      description: yup.string(),
    }),
  }),
  stepThree: object().shape({
    clutch: yup.object().shape({
      description: yup
        .string()
        .required("Enter the details for clutch")
        .max(80, "Maximum characters should be 80"),
    }),
    tyre: yup.object().shape({
      description: yup
        .string()
        .required("Enter the details for tyre")
        .max(80, "Maximum characters should be 80"),
    }),
    engine: yup.object().shape({
      description: yup
        .string()
        .required("Enter the details for engine")
        .max(80, "Maximum characters should be 80"),
    }),
    gearbox: yup.object().shape({
      description: yup
        .string()
        .required("Enter the details for gearbox")
        .max(80, "Maximum characters should be 80"),
    }),

    car_description: yup
      .string()
      .required("Enter the description for your car"),

    features: yup.object().shape({
      speed: yup.object().shape({
        value: yup.number().required("Speed Value is required"),
        unit: yup.string(),
      }),
      engine: yup.object().shape({
        value: yup.number().required("Engine Value is required"),
        unit: yup.string(),
      }),
      torq: yup.object().shape({
        value: yup.number().required("Torq Value is required"),
        unit: yup.string(),
      }),
      seating: yup.object().shape({
        value: yup.number().required("Seating Value is required"),
        unit: yup.string(),
      }),
    }),
  }),
};
