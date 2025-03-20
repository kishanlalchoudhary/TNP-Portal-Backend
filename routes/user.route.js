const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  deleteUser,
  loginUser,
} = require("../controllers/user.controller");

router.post("/users", createUser);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.post("/users/login", loginUser);

module.exports = router;
