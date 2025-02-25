const { body, validationResult } = require("express-validator");
const { deleteFileFromCloudinary } = require("../utils/cloudinary.utility");

const validateSkillMiddleware = [
  body("name").notEmpty().withMessage("name is required"),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!req.files["logo"]) {
      errors.errors.push({
        msg: "logo is required",
      });
    }

    if (!errors.isEmpty()) {
      try {
        if (req.files["logo"]) {
          await deleteFileFromCloudinary(req.files["logo"][0].path);
        }
      } catch (error) {
        console.error(error);
      }

      return res.status(400).json({
        success: false,
        message: "Skill validation failed",
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

module.exports = { validateSkillMiddleware };
