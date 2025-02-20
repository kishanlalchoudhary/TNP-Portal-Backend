const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminLogout,
  createAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");
const { adminAuthMiddleware } = require("../middlewares/admin_auth.middleware");
const {
  validateAdminMiddleware,
} = require("../middlewares/validate_admin.middleware");

router.post("/login", adminLogin);
router.post("/logout", adminAuthMiddleware, adminLogout);
router.post("/", adminAuthMiddleware, validateAdminMiddleware, createAdmin);
router.delete("/:id", adminAuthMiddleware, deleteAdmin);

module.exports = router;
