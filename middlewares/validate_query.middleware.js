const { body, validationResult } = require("express-validator");

const validateQueryMiddleware = [
  body("description").notEmpty().withMessage("description is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Query validation failed",
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

module.exports = { validateQueryMiddleware };
