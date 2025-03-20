const { body, validationResult } = require("express-validator");

const validateUserMiddleware = [
  body("fullName").notEmpty().withMessage("full name is required"),
  body("dateOfBirth").notEmpty().withMessage("date of birth is required"),
  body("gender")
    .notEmpty()
    .withMessage("gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("invalid gender"),
  body("permanentAddress")
    .notEmpty()
    .withMessage("permanent address is required"),
  body("city").notEmpty().withMessage("city is required"),
  body("state").notEmpty().withMessage("state is required"),
  body("branch")
    .notEmpty()
    .withMessage("branch is required")
    .isIn(["CE", "IT", "ENTC"])
    .withMessage("invalid branch"),
  body("universityPRN").notEmpty().withMessage("university prn is required"),
  body("pictRegistrationId")
    .notEmpty()
    .withMessage("pict registration id is required"),
  body("percentage10th")
    .notEmpty()
    .withMessage("10th percentage is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("10th percentage must be between 0 and 100"),
  body("board10th").notEmpty().withMessage("10th board is required"),
  body("passingYear10th")
    .notEmpty()
    .withMessage("10th passing year is required")
    .isInt()
    .withMessage("10th passing year must be an integer"),
  body("noOfGapYearsAfter10th")
    .notEmpty()
    .withMessage("no of gap years after 10th is required")
    .isInt({ min: -1 })
    .withMessage("no of gap years after 10th must be an positive integer"),
  body("after10thAppearedFor")
    .notEmpty()
    .withMessage("after 10th appeared for is required")
    .isIn(["12th", "Diploma"])
    .withMessage("invalid after 10th appeared for"),
  body("percentage12th")
    .notEmpty()
    .withMessage("12th percentage is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("12th percentage must be between 0 and 100"),
  body("board12th").notEmpty().withMessage("12th Board is required"),
  body("passingYear12th")
    .notEmpty()
    .withMessage("12th passing year is required")
    .isInt()
    .withMessage("12th passing year must be an integer"),
  body("percentageDiploma")
    .notEmpty()
    .withMessage("diploma percentage is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("diploma percentage must be between 0 and 100"),
  body("universityOfDiploma")
    .notEmpty()
    .withMessage("diploma university is required"),
  body("passingYearDiploma")
    .notEmpty()
    .withMessage("diploma passing year is required")
    .isInt()
    .withMessage("diploma passing year must be an integer"),
  body("percentileCet")
    .notEmpty()
    .withMessage("cet percentile is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("cet percentile must be between 0 and 100"),
  body("percentileJee")
    .notEmpty()
    .withMessage("jee percentile is required")
    .isFloat({ min: -1, max: 100 })
    .withMessage("jee percentile must be between 0 and 100"),
  body("collegeStartedYear")
    .notEmpty()
    .withMessage("college started year is required")
    .isInt()
    .withMessage("college started year must be an integer"),
  body("aadharNumber").notEmpty().withMessage("aadhar number is required"),
  body("panNumber").notEmpty().withMessage("pan number is required"),
  body("passportNumber").notEmpty().withMessage("passport number is required"),
  body("citizenship").notEmpty().withMessage("citizenship is required"),
  body("password").notEmpty().withMessage("password is required"),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "User validation failed",
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

module.exports = { validateUserMiddleware };
