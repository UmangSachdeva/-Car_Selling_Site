const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    f_name: {
      type: String,
      require: [true, "User must have a First Name"],
    },
    l_name: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "User must have unique email address"],
      require: [true, "User should have an email address"],
      validate: [validator.isEmail, "User should have a valid email"],
    },
    profile_name: {
      type: String,
      unique: [true, "Profile name must be unique"],
      requrie: [true, "User must have a profile name"],
    },
    password: {
      type: String,
      minLength: [8, "Password should be minimum 8 characters"],
      requried: [true, "User must have a password"],
      select: false,
    },
    passwordConfirm: {
      select: false,
      type: String,
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "passwords does not match",
      },
      require: [true, "User should confirm password"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      select: false,
      default: "user",
    },
    
  },
  {
    timestamps: true,
  }
);

// Encrypt Password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const encodedPassword = await bcrypt.hash(this.password, 12);
  this.password = encodedPassword;
  this.passwordConfirm = undefined;
  next();
});

// Verifying the password
UserSchema.methods.verifyPassword = async function (userPassword, password) {
  return await bcrypt.compare(userPassword, password);
};

const user = mongoose.model("users", UserSchema);

module.exports = user;
