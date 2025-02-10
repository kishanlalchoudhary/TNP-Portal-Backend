const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  getJob,
  deleteJob,
} = require("../controllers/job.controller");
// const { isAdmin } = require("../middlewares/auth.middleware");
const { uploadMiddleware } = require("../middlewares/upload.middleware");

router.post(
  "/",
  uploadMiddleware("jobs").fields([
    { name: "company_logo" },
    { name: "company_jd" },
  ]),
  createJob
);
router.get("/", getJobs);
router.get("/:id", getJob);
router.delete("/:id", deleteJob);

module.exports = router;
