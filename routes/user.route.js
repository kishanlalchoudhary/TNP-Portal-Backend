const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  loginAndGetUser,
  deleteUser,
} = require("../controllers/user.controller");

router.post("/", createUser);
router.get("/", getUsers);
router.post("/login-and-get-user", loginAndGetUser);
router.delete("/:id", deleteUser);

module.exports = router;
