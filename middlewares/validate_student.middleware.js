const { body, validationResult } = require("express-validator");
const { deleteFileFromCloudinary } = require("../utils/cloudinary.utility");

const validateStudentMiddleware = [
  body("full_name").notEmpty().withMessage("full name is required"),
  body("primary_email")
    .notEmpty()
    .withMessage("primary email is required")
    .isEmail()
    .withMessage("invalid primary email"),
  body("alternate_email")
    .notEmpty()
    .withMessage("alternate email is required")
    .isEmail()
    .withMessage("invalid alternate email"),
  body("primary_mobile_number")
    .notEmpty()
    .withMessage("mobile number is required"),
  body("alternate_mobile_number")
    .notEmpty()
    .withMessage("alternate mobile number is required"),
  body("date_of_birth").notEmpty().withMessage("date of birth is required"),
  body("gender")
    .notEmpty()
    .withMessage("gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("invalid gender"),
  body("current_address").notEmpty().withMessage("current address is required"),
  body("permanent_address")
    .notEmpty()
    .withMessage("permanent address is required"),
  body("city").notEmpty().withMessage("city is required"),
  body("state").notEmpty().withMessage("state is required"),
  body("branch")
    .notEmpty()
    .withMessage("branch is required")
    .isIn(["CE", "IT", "ENTC"])
    .withMessage("invalid branch"),
  body("division").notEmpty().withMessage("division is required"),
  body("roll_number")
    .notEmpty()
    .withMessage("roll number is required")
    .isInt({ min: 0 })
    .withMessage("roll number must be an positive integer"),
  body("university_prn").notEmpty().withMessage("university prn is required"),
  body("pict_registration_id")
    .notEmpty()
    .withMessage("pict registration id is required"),
  body("percentage_10th")
    .notEmpty()
    .withMessage("10th percentage is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("10th percentage must be between 0 and 100"),
  body("board_10th").notEmpty().withMessage("10th board is required"),
  body("passing_year_10th")
    .notEmpty()
    .withMessage("10th passing year is required")
    .isInt()
    .withMessage("10th passing year must be an integer"),
  body("no_of_gap_years_after_10th")
    .notEmpty()
    .withMessage("no of gap years after 10th is required")
    .isInt({ min: 0 })
    .withMessage("no of gap years after 10th must be an positive integer"),
  body("after_10th_appeared_for")
    .notEmpty()
    .withMessage("after 10th appeared for is required")
    .isIn(["12th", "Diploma"])
    .withMessage("invalid after 10th appeared for"),
  body("percentage_12th")
    .notEmpty()
    .withMessage("12th percentage is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("12th percentage must be between 0 and 100"),
  body("board_12th").notEmpty().withMessage("12th Board is required"),
  body("passing_year_12th")
    .notEmpty()
    .withMessage("12th passing year is required")
    .isInt()
    .withMessage("12th passing year must be an integer"),
  body("percentage_diploma")
    .notEmpty()
    .withMessage("diploma percentage is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("diploma percentage must be between 0 and 100"),
  body("university_of_diploma")
    .notEmpty()
    .withMessage("diploma university is required"),
  body("passing_year_diploma")
    .notEmpty()
    .withMessage("diploma passing year is required")
    .isInt()
    .withMessage("diploma passing year must be an integer"),
  body("percentile_cet")
    .notEmpty()
    .withMessage("cet percentile is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("cet percentile must be between 0 and 100"),
  body("percentile_jee")
    .notEmpty()
    .withMessage("jee percentile is required")
    .isFloat({ min: 0, max: 100 })
    .withMessage("jee percentile must be between 0 and 100"),
  body("college_started_year")
    .notEmpty()
    .withMessage("college started year is required")
    .isInt()
    .withMessage("college started year must be an integer"),
  body("sgpa_fe_sem_1")
    .notEmpty()
    .withMessage("fe sem 1 sgpa is required")
    .isFloat({ min: 0, max: 10 })
    .withMessage("invalid fe sem 1 sgpa"),
  body("sgpa_fe_sem_2")
    .notEmpty()
    .withMessage("fe sem 2 sgpa is required")
    .isFloat({ min: 0, max: 10 })
    .withMessage("invalid fe sem 2 sgpa"),
  body("sgpa_se_sem_1")
    .notEmpty()
    .withMessage("se sem 1 sgpa is required")
    .isFloat({ min: 0, max: 10 })
    .withMessage("invalid se sem 1 sgpa"),
  body("sgpa_se_sem_2")
    .notEmpty()
    .withMessage("se sem 2 sgpa is required")
    .isFloat({ min: 0, max: 10 })
    .withMessage("invalid se sem 2 sgpa"),
  body("sgpa_te_sem_1")
    .notEmpty()
    .withMessage("te sem 1 sgpa is required")
    .isFloat({ min: 0, max: 10 })
    .withMessage("invalid te sem 1 sgpa"),
  body("sgpa_te_sem_2")
    .notEmpty()
    .withMessage("te sem 2 sgpa is required")
    .isFloat({ min: 0, max: 10 })
    .withMessage("invalid te sem 2 sgpa"),
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
  body("year_down")
    .notEmpty()
    .withMessage("year down status is required")
    .isIn(["Yes", "No"])
    .withMessage("invalid year down value"),
  body("aadhar_number").notEmpty().withMessage("aadhar number is required"),
  body("pan_number").notEmpty().withMessage("pan number is required"),
  body("passport_number").notEmpty().withMessage("passport number is required"),
  body("citizenship").notEmpty().withMessage("citizenship is required"),
  body("password").notEmpty().withMessage("password is required"),

  async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!req.files["documents"]) {
      errors.errors.push({
        msg: "documents pdf is required",
      });
    }

    if (!req.files["amcat_result"]) {
      errors.errors.push({
        msg: "amcat result pdf is required",
      });
    }

    if (!req.files["be_receipt"]) {
      errors.errors.push({
        msg: "be receipt pdf is required",
      });
    }

    if (!errors.isEmpty()) {
      try {
        await deleteFileFromCloudinary(req.files["documents"][0].path);
        await deleteFileFromCloudinary(req.files["amcat_result"][0].path);
        await deleteFileFromCloudinary(req.files["be_receipt"][0].path);
      } catch (error) {
        console.error(error);
      }

      return res.status(400).json({
        message: "Student validation failed",
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

module.exports = { validateStudentMiddleware };
