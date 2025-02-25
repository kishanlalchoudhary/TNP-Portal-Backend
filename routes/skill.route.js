const express = require("express");
const router = express.Router();
const {
  addSkill,
  getSkills,
  removeSkill,
  getQuestions,
  evaluateAnswers,
} = require("../controllers/skill.controller");
const { adminAuthMiddleware } = require("../middlewares/admin_auth.middleware");
const {
  studentAuthMiddleware,
} = require("../middlewares/student_auth.middleware");
const { uploadMiddleware } = require("../middlewares/upload.middleware");
const {
  validateSkillMiddleware,
} = require("../middlewares/validate_skill.middleware");

router.post(
  "/",
  adminAuthMiddleware,
  uploadMiddleware("skills").fields([{ name: "logo", maxCount: 1 }]),
  validateSkillMiddleware,
  addSkill
);
router.get("/", studentAuthMiddleware, getSkills);
router.delete("/:id", adminAuthMiddleware, removeSkill);
router.get("/:id/questions", studentAuthMiddleware, getQuestions);
router.post("/:id/evaluations", studentAuthMiddleware, evaluateAnswers);

module.exports = router;
