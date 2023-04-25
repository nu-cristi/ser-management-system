const express = require("express");
const router = express.Router();
const { getUsers,
        registerUser,
        deleteUser,
        updateUser,
        loginUser,
      } = require("../controllers/users");

router.get("/", getUsers);
router.post("/", registerUser);
router.post("/:id", loginUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);


module.exports = router;