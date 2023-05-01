const {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

// Routes
module.exports = require("express")
  .Router()
  .get("/", getUsers)
  .post("/register", registerUser)
  .post("/login", loginUser)
  .delete("/delete", deleteUser)
  .patch("/update", updateUser);
