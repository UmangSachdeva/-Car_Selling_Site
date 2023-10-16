const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const { nanoid } = require("nanoid");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    model: {
      type: String,
    },
    company_name: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "suv",
        "van",
        "hatchback",
        "convertable",
        "luxary",
        "race",
        "modified",
      ],
      required: [true, "Car Type is required"],
    },
    price: {
      type: Number,
      required: [true, "Price of the car cannot be null"],
    },
    price_per: {
      type: String,
      default: "day",
      enum: ["day", "month", "week", "hour"],
    },
    posted_by: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: [true, "Post must belong to a user"],
    },
    days: {
      min: {
        type: Number,
        required: [true, "Mininum days to rent is required"],
      },
      max: {
        type: Number,
        required: [true, "Maximum days to rent is required"],
        validate: {
          validator: function (el) {
            return this.days.min <= el;
          },
          message: "Minimum days should be smaller than Maximum days",
        },
      },
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      cordinates: [Number],
      address: String,
      description: String,
    },
    status: {
      type: String,
      enum: ["booked", "processing", "paused", "on-rent"],
      default: "on-rent",
    },
    slug: { type: String, unique: true },
    images: [
      {
        type: String,
        validate: [validator.isURL, "Please upload a valid url"],
      },
    ],
    clutch: {
      description: {
        required: [true, "Enter the details for clutch"],
        type: String,
        maxLength: [80, "Maximum characters should be 80"],
      },
    },
    tyre: {
      description: {
        required: [true, "Enter the details for tyre"],
        type: String,
        maxLength: [80, "Maximum characters should be 80"],
      },
    },
    engine: {
      description: {
        required: [true, "Enter the details for engine"],
        type: String,
        maxLength: [80, "Maximum characters should be 80"],
      },
    },
    gearbox: {
      description: {
        required: [true, "Enter the details for gearbox"],
        type: String,
        maxLength: [80, "Maximum characters should be 80"],
      },
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  const id = await nanoid(5);
  this.slug = slugify(this.name + " " + id, { lower: true });

  next();
});

const Car = mongoose.model("car", schema);

module.exports = Car;
