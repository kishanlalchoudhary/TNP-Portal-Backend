const { body, validationResult } = require("express-validator");

const validateAdminMiddleware = [
  body("first_name").notEmpty().withMessage("first name is required"),
  body("last_name").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("password").notEmpty().withMessage("password is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Admin validation failed",
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

module.exports = { validateAdminMiddleware };
