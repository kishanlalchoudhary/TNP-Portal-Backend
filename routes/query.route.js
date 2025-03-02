const express = require("express");
const router = express.Router();
const {
  raiseQuery,
  getQueries,
  getSummaryOfQueries,
  deleteQuery,
} = require("../controllers/query.controller");
const {
  studentAuthMiddleware,
} = require("../middlewares/student_auth.middleware");
const {
  validateQueryMiddleware,
} = require("../middlewares/validate_query.middleware");
const { adminAuthMiddleware } = require("../middlewares/admin_auth.middleware");

router.post("/", studentAuthMiddleware, validateQueryMiddleware, raiseQuery);
router.get("/", adminAuthMiddleware, getQueries);
router.get("/summary", adminAuthMiddleware, getSummaryOfQueries);
router.delete("/:id", adminAuthMiddleware, deleteQuery);

module.exports = router;
