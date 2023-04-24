const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creates database schema for a user object.
const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      // "validator" is a custom validator provided by mongoose. 
      // In this case the validation is declared by passing a function 
        // that uses regex to verify if a given email meets the standard requirements.
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
