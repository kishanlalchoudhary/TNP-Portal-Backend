const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  logoutStudent,
  getUnverifiedStudents,
  getStudent,
  verifyStudent,
  deleteStudent,
} = require("../controllers/student.controller");
const { adminAuthMiddleware } = require("../middlewares/admin_auth.middleware");
const {
  studentAuthMiddleware,
} = require("../middlewares/student_auth.middleware");
const { uploadMiddleware } = require("../middlewares/upload.middleware");
const {
  validateStudentMiddleware,
} = require("../middlewares/validate_student.middleware");

router.post(
  "/",
  uploadMiddleware("students").fields([
    { name: "documents", maxCount: 1 },
    { name: "amcat_result", maxCount: 1 },
    { name: "be_receipt", maxCount: 1 },
  ]),
  validateStudentMiddleware,
  registerStudent
);
router.post("/login", loginStudent);
router.post("/logout", studentAuthMiddleware, logoutStudent);
router.get("/unverified", adminAuthMiddleware, getUnverifiedStudents);
router.get("/:id", adminAuthMiddleware, getStudent);
router.post("/:id/verify", adminAuthMiddleware, verifyStudent);
router.delete("/:id", adminAuthMiddleware, deleteStudent);

module.exports = router;
