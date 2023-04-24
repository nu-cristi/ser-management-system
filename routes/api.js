const express = require("express");
const router = express.Router();
const User = require("../models/users");

//Performs a Read operation
router.get("/", (req, res, next) => {
  // User.find({})
  //   .then((data)=>res.json(data))
  //   .catch(next);
  // console.log('ok');
  res.send("hello world")
});

//Performs a Create operation
router.post("/", (req, res, next) => {

});

//Performs a Delete operation
router.delete("/:id", (req, res, next) => {});

//Performs an Update operation
router.put("/", (req, res, next) => {});

module.exports = router;
