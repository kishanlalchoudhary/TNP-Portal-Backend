const express = require("express");
const router = express.Router();
const { createAdmin, deleteAdmin } = require("../controllers/admin.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

router.post("/", isAdmin, createAdmin);
router.delete("/:id", isAdmin, deleteAdmin);

module.exports = router;
