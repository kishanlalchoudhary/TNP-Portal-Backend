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
  markShortlisted,
  getShortlistedStudents,
  markPlaced,
  getPlacedStudents,
  getShortlistedResults,
  getPlacedResults,
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
router.get("/inactive/admin", adminAuthMiddleware, getInactiveJobs);
router.get("/:id", studentAuthMiddleware, getJob);
router.delete("/:id", adminAuthMiddleware, deleteJob);
router.post("/:id/apply", studentAuthMiddleware, applyToJob);
router.get("/:id/applied-students", adminAuthMiddleware, getAppliedStudents);
router.get(
  "/:id/applied-students/csv",
  adminAuthMiddleware,
  downloadAppliedStudentsCSV
);
router.post("/:id/mark-shortlisted", adminAuthMiddleware, markShortlisted);
router.get(
  "/:id/shortlisted-students",
  adminAuthMiddleware,
  getShortlistedStudents
);
router.post("/:id/mark-placed", adminAuthMiddleware, markPlaced);
router.get("/:id/placed-students", adminAuthMiddleware, getPlacedStudents);
router.get(
  "/:id/shortlisted-results",
  studentAuthMiddleware,
  getShortlistedResults
);
router.get("/:id/placed-results", studentAuthMiddleware, getPlacedResults);

module.exports = router;
