const mongoose = require("mongoose");
const User = require("../models/users");

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
  const newUser = new User({ email, username, password });
  // Adds user to the database.
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  
  next();
};

const loginUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  
};

// Performs a Delete operation by comparing a parameter id with the ids of the objects in the database.
// When a match is found, the corresponding object is removed.
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully" });

  next();
};

// Performs an Update operation by comparing a parameter id with the ids of the objects in the database.
// When a match is found, the already existing information is replaced with the data that is sent along with the request.
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found" });
  }

  const userUpdate = await User.findByIdAndUpdate(id, { ...user });
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
