const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Performs a Read operation, returning a list containing objects of all the users from the database.
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // Returns an "OK" status after the users are found then parses the object to a json format.
  } catch (error) {
    res.status(400).json({ message: error.message }); // Returns a "Bad Request" status then parses the error message to a json format.
  }

  next();
};

//Performs a Create operation by building a user object with the data passed by the client, adding it to the database.
const registerUser = async (req, res, next) => {
  const { email, username, password } = req.body; // Deconstructs the object received from the request body.
  const hashPassword = await bcrypt.hash(password, 10);
  // Adds user to the database.
  try {
    const newUser = await User.create({
      email,
      username,
      password: hashPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

  next();
};

// Performs a Read operation, to compare the data introduced by the user with what exists in the database
//  in order to log the user in.
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Verifies if the user didn't introduce an email or a password and returns a Bad Request status.
  if (!email || !password) {
    return res.status(400).json({
      message: "Fields cannot be empty",
    });
  }

  try {
    const user = await User.findOne({ email }); // Searches the database for the matching entry.
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // Compares passwords
      bcrypt.compare(password, user.password, async (err, data) => {
        if (data) {
          // Creates a jwt token with the .env key.
          const token = await jwt.sign(
            { id: user._id },
            process.env.TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );
          if (token)
            // Sends token and username to the frontend for authorization
            return res.json({
              token: token,
              username: user.username,
            });
        } else {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// Performs a Delete operation by comparing an id with the ids of the objects in the database.
// When a match is found, the corresponding object is removed.
const deleteUser = async (req, res, next) => {
  const { id } = req.body;

  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });

  next();
};

// Performs an Update operation by comparing a parameter id with the ids of the objects in the database.
// When a match is found, the already existing information is replaced with the data that is sent along with the request.
const updateUser = async (req, res, next) => {
  const { data } = req.body;

  const userUpdate = await User.findByIdAndUpdate(data.id, { ...data });
  if (!userUpdate) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(userUpdate);

  next();
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
};
