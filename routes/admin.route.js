const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminLogout,
  createAdmin,
  deleteAdmin,
  createNotification,
  deleteNotification
} = require("../controllers/admin.controller");
const { adminAuthMiddleware } = require("../middlewares/admin_auth.middleware");
const {
  validateAdminMiddleware,
} = require("../middlewares/validate_admin.middleware");

router.post("/", adminAuthMiddleware, validateAdminMiddleware, createAdmin);
router.post("/login", adminLogin);
router.post("/logout", adminAuthMiddleware, adminLogout);
router.delete("/:id", adminAuthMiddleware, deleteAdmin);
router.post("/create-notification", adminAuthMiddleware, createNotification);
router.delete("/delete-notification/:id", adminAuthMiddleware, deleteNotification);

module.exports = router;
