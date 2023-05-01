const { Schema, model } = require("mongoose");

// Creates database schema for a user object.
module.exports = model(
  "User",
  new Schema({
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        // "validator" is a custom validator provided by mongoose.
        // In this case the validation is declared by passing a function
        // that uses regex to verify if a given email meets the standard requirements (contains "@", contains domain).
        validator: (v) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    username: { type: String, required: true, unique: false },
    // I used to have some validation for the password but i gave up on it for development and testing purposes.
    password: {
      type: String,
      required: true,
    },
    token: { type: String },
  })
);
