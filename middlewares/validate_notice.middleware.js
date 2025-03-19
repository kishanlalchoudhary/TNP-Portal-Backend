const { body, validationResult } = require("express-validator");

const validateNoticeMiddleware = [
  body("title").notEmpty().withMessage("title is required"),
  body("description").notEmpty().withMessage("description is required"),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Notice validation failed",
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

module.exports = { validateNoticeMiddleware };
