const { body, validationResult } = require("express-validator");
const { deleteFileFromCloudinary } = require("../utils/cloudinary.utility");

const validateJobMiddleware = [
  body("company_name").notEmpty().withMessage("company name is required"),
  body("company_desc")
    .notEmpty()
    .withMessage("company description is required"),
  body("company_website_url")
    .notEmpty()
    .withMessage("company website url is required"),
  body("job_role").notEmpty().withMessage("job role is required"),
  body("job_location").notEmpty().withMessage("job location is required"),
  body("selection_process")
    .notEmpty()
    .withMessage("selection process is required"),
  body("company_package")
    .notEmpty()
    .withMessage("company package is required")
    .isFloat({ min: 0 })
    .withMessage("company package must be positive float number"),
  body("dream_company")
    .notEmpty()
    .withMessage("dream company status is required")
    .isIn(["Yes", "No"])
    .withMessage("invalid dream company status value"),
  body("cgpa")
    .notEmpty()
    .withMessage("cgpa is required")
    .isFloat({ min: -1, max: 10 })
    .withMessage("cgpa must be between 0 and 100"),
  body("automata_score")
    .notEmpty()
    .withMessage("automata score is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("automata score must be between 0 and 100"),
  body("elq_score")
    .notEmpty()
    .withMessage("elq score is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("elq score must be between 0 and 100"),
  body("percentage_10th")
    .notEmpty()
    .withMessage("10th percentage is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("10th percentage must be between 0 and 100"),
  body("percentage_12th")
    .notEmpty()
    .withMessage("12th percentage is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("12th percentage must be between 0 and 100"),
  body("percentage_diploma")
    .notEmpty()
    .withMessage("diploma percentage is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("diploma percentage must be between 0 and 100"),
  body("active_backlogs")
    .notEmpty()
    .withMessage("no of active backlogs is required")
    .isInt({ min: 0 })
    .withMessage("no of active backlogs must be an integer"),
  body("passive_backlogs")
    .notEmpty()
    .withMessage("no of passive backlogs is required")
    .isInt({ min: 0 })
    .withMessage("no of passive backlogs must be an integer"),
  body("application_deadline")
    .notEmpty()
    .withMessage("application deadline is required"),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!req.files["company_logo"]) {
      errors.errors.push({
        msg: "company logo is required",
      });
    }

    if (!req.files["company_jd"]) {
      errors.errors.push({
        msg: "company jd is required",
      });
    }

    if (!errors.isEmpty()) {
      try {
        await deleteFileFromCloudinary(req.files["company_logo"][0].path);
        await deleteFileFromCloudinary(req.files["company_jd"][0].path);
      } catch (error) {
        console.error(error);
      }

      return res.status(400).json({
        success: false,
        message: "Job validation failed",
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

module.exports = { validateJobMiddleware };
