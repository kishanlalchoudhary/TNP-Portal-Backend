const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  getJob,
  deleteJob,
} = require("../controllers/job.controller");
const { adminAuthMiddleware } = require("../middlewares/admin_auth.middleware");
const { uploadMiddleware } = require("../middlewares/upload.middleware");
const {
  validateJobMiddleware,
} = require("../middlewares/validate_job.middleware");

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
router.get("/", getJobs);
router.get("/:id", getJob);
router.delete("/:id", adminAuthMiddleware, deleteJob);

module.exports = router;
