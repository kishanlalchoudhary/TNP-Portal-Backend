const express = require("express");
const router = express.Router();
const {
  createNotice,
  getNotices,
  deleteNotice,
} = require("../controllers/notice.controller");
const { adminAuthMiddleware } = require("../middlewares/admin_auth.middleware");
const {
  validateNoticeMiddleware,
} = require("../middlewares/validate_notice.middleware");
const {
  studentAuthMiddleware,
} = require("../middlewares/student_auth.middleware");

router.post("/", adminAuthMiddleware, validateNoticeMiddleware, createNotice);
router.get("/", studentAuthMiddleware, getNotices);
router.get("/admin", adminAuthMiddleware, getNotices);
router.delete("/:id", adminAuthMiddleware, deleteNotice);

module.exports = router;
