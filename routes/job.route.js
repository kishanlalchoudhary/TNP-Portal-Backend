const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  getActiveJobs,
  getInactiveJobs,
  getJob,
  deleteJob,
  applyToJob,
  getAppliedStudents,
  downloadAppliedStudentsCSV,
} = require("../controllers/job.controller");
const { adminAuthMiddleware } = require("../middlewares/admin_auth.middleware");
const { uploadMiddleware } = require("../middlewares/upload.middleware");
const {
  validateJobMiddleware,
} = require("../middlewares/validate_job.middleware");
const {
  studentAuthMiddleware,
} = require("../middlewares/student_auth.middleware");

router.post(
  "/",
  adminAuthMiddleware,
  uploadMiddleware("jobs").fields([
    { name: "company_logo", maxCount: 1 },
    { name: "company_jd", maxCount: 1 },
  ]),
  validateJobMiddleware,
  createJob
);
router.get("/", adminAuthMiddleware, getJobs);
router.get("/active", studentAuthMiddleware, getActiveJobs);
router.get("/inactive", studentAuthMiddleware, getInactiveJobs);
router.get("/:id", studentAuthMiddleware, getJob);
router.delete("/:id", adminAuthMiddleware, deleteJob);
router.post("/:id/apply", studentAuthMiddleware, applyToJob);
router.get("/:id/applied-students", adminAuthMiddleware, getAppliedStudents);
router.get(
  "/:id/applied-students/csv",
  adminAuthMiddleware,
  downloadAppliedStudentsCSV
);

module.exports = router;
