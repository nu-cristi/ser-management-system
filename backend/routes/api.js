const express = require("express");
const router = express.Router();
const { getUsers,
        registerUser,
        loginUser,
        deleteUser,
        updateUser,        
      } = require("../controllers/users");

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);
router.patch("/update", updateUser);


module.exports = router;