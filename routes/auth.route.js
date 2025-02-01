const express = require("express");
const router = express.Router();
const { adminLogin, adminLogout } = require("../controllers/auth.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

router.post("/admin/login", adminLogin);
router.post("/admin/logout", isAdmin, adminLogout);

module.exports = router;
