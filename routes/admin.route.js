const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminLogout,
  createAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

router.post("/login", adminLogin);
router.post("/logout", isAdmin, adminLogout);
router.post("/", isAdmin, createAdmin);
router.delete("/:id", isAdmin, deleteAdmin);

module.exports = router;
