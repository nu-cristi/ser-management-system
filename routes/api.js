const express = require("express");
const router = express.Router();
const { getUsers,
        createUser,
        deleteUser,
        updateUser,
      } = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);


module.exports = router;