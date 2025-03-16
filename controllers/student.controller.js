const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const config = require("../config/env");
const jwt = require("jsonwebtoken");
const { calculateCGPA } = require("../utils/student.utility");
const { sendStudentVerifiedEmail } = require("../utils/email.utility");

const registerStudent = async (req, res) => {
  try {
    const existingStudent = await prisma.student.findUnique({
      where: { pictRegistrationId: req.body.pict_registration_id },
    });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this pict registration id already exists",
      });
    }

    const hashed_password = await bcrypt.hash(req.body.password, config.salt);

    const student = await prisma.student.create({
      data: {
        fullName: req.body.full_name,
        primaryEmail: req.body.primary_email,
        alternateEmail: req.body.alternate_email,
        primaryMobileNumber: req.body.primary_mobile_number,
        alternateMobileNumber: req.body.alternate_mobile_number,
        dateOfBirth: new Date(req.body.date_of_birth),
        gender: req.body.gender,
        currentAddress: req.body.current_address,
        permanentAddress: req.body.permanent_address,
        city: req.body.city,
        state: req.body.state,
        branch: req.body.branch,
        division: req.body.division,
        rollNumber: parseInt(req.body.roll_number),
        universityPRN: req.body.university_prn,
        pictRegistrationId: req.body.pict_registration_id,
        percentage10th: parseFloat(req.body.percentage_10th),
        board10th: req.body.board_10th,
        passingYear10th: parseInt(req.body.passing_year_10th),
        noOfGapYearsAfter10th: parseInt(req.body.no_of_gap_years_after_10th),
        reasonOfGapAfter10th: req.body.reason_of_gap_after_10th,
        after10thAppearedFor: req.body.after_10th_appeared_for,
        percentage12th: parseFloat(req.body.percentage_12th),
        board12th: req.body.board_12th,
        passingYear12th: parseInt(req.body.passing_year_12th),
        noOfGapYearsAfter12th: parseInt(req.body.no_of_gap_years_after_12th),
        reasonOfGapAfter12th: req.body.reason_of_gap_after_12th,
        percentageDiploma: parseFloat(req.body.percentage_diploma),
        universityOfDiploma: req.body.university_of_diploma,
        passingYearDiploma: parseInt(req.body.passing_year_diploma),
        noOfGapYearsAfterDiploma: parseInt(
          req.body.no_of_gap_years_after_diploma
        ),
        reasonOfGapAfterDiploma: req.body.reason_of_gap_after_diploma,
        percentileCet: parseFloat(req.body.percentile_cet),
        percentileJee: parseFloat(req.body.percentile_jee),
        collegeStartedYear: parseInt(req.body.college_started_year),
        sgpaFeSem1: parseFloat(req.body.sgpa_fe_sem_1),
        sgpaFeSem2: parseFloat(req.body.sgpa_fe_sem_2),
        sgpaSeSem1: parseFloat(req.body.sgpa_se_sem_1),
        sgpaSeSem2: parseFloat(req.body.sgpa_se_sem_2),
        sgpaTeSem1: parseFloat(req.body.sgpa_te_sem_1),
        sgpaTeSem2: parseFloat(req.body.sgpa_te_sem_2),
        activeBacklogs: parseInt(req.body.active_backlogs),
        activeBacklogSemesters: req.body.active_backlog_semesters
          ? req.body.active_backlog_semesters.split(",")
          : [],
        passiveBacklogs: parseInt(req.body.passive_backlogs),
        yearDown: req.body.year_down,
        aadharNumber: req.body.aadhar_number,
        panNumber: req.body.pan_number,
        passportNumber: req.body.passport_number,
        citizenship: req.body.citizenship,
        automataScore: parseFloat(req.body.automata_score),
        elqScore: parseFloat(req.body.elq_score),
        documentsURL: req.files["documents"][0].path,
        amcatResultURL: req.files["amcat_result"][0].path,
        beReceiptURL: req.files["be_receipt"][0].path,
        password: hashed_password,
      },
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { pict_registration_id, password } = req.body;

    if (!pict_registration_id || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing pict registration id or password",
      });
    }

    const student = await prisma.student.findUnique({
      where: { pictRegistrationId: pict_registration_id },
    });
    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid pict registration id or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid pict registration id or password",
      });
    }

    if (!student.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Verification pending" });
    }

    const token = jwt.sign(
      {
        id: student.id,
        fullName: student.fullName,
        pictRegistrationId: student.pictRegistrationId,
        universityPRN: student.universityPRN,
        isVerified: student.isVerified,
      },
      config.jwtSecretKey,
      {
        expiresIn: "1d",
      }
    );

    await prisma.studentToken.create({
      data: {
        token,
        studentId: student.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      student: {
        id: student.id,
        fullName: student.fullName,
        pictRegistrationId: student.pictRegistrationId,
        universityPRN: student.universityPRN,
        isVerified: student.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const logoutStudent = async (req, res) => {
  try {
    const { token } = req;

    await prisma.studentToken.delete({ where: { token } });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getUnverifiedStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: { isVerified: false },
      select: {
        id: true,
        fullName: true,
        pictRegistrationId: true,
        universityPRN: true,
      },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({
      success: true,
      message: "Unverified students fetched successfully",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getVerifiedStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: { isVerified: true },
      select: {
        id: true,
        fullName: true,
        pictRegistrationId: true,
        universityPRN: true,
      },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({
      success: true,
      message: "Verified students fetched successfully",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    delete student.password;
    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const verifyStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    if (student.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Student is already verified" });
    }

    const cgpa = calculateCGPA(student);

    await prisma.student.update({
      where: { id },
      data: { isVerified: true, cgpa },
    });

    await sendStudentVerifiedEmail({ email: student.primaryEmail });

    res
      .status(200)
      .json({ success: true, message: "Student verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    await prisma.student.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.student;

    const student = await prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        primaryEmail: true,
        primaryMobileNumber: true,
        dateOfBirth: true,
        gender: true,
        branch: true,
        division: true,
        rollNumber: true,
        universityPRN: true,
        pictRegistrationId: true,
        percentage10th: true,
        after10thAppearedFor: true,
        percentage12th: true,
        percentageDiploma: true,
        sgpaFeSem1: true,
        sgpaFeSem2: true,
        sgpaSeSem1: true,
        sgpaSeSem2: true,
        sgpaTeSem1: true,
        sgpaTeSem2: true,
        sgpaBeSem1: true,
        sgpaBeSem2: true,
        aadharNumber: true,
        panNumber: true,
        passportNumber: true,
        automataScore: true,
        elqScore: true,
        cgpa: true,
        isPlaced: true,
        isDreamPlaced: true,
      },
      include: {
        placedJob: {
          select: {
            id: true,
            companyLogoURL: true,
            companyName: true,
            jobRole: true,
            jobLocation: true,
            companyPackage: true,
            dreamCompany: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const { id } = req.student;

    const jobs = await prisma.job.findMany({
      where: {
        applications: {
          some: {
            studentId: id,
          },
        },
      },
      select: {
        id: true,
        companyLogoURL: true,
        companyName: true,
        companyPackage: true,
        dreamCompany: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Applied Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


const getStudentNotifications = async (req, res) => {
  try {
    const { id } = req.student; 

    const notifications = await prisma.notification.findMany({
      where: {
        students: {
          some: {
            id
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      notifications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  logoutStudent,
  getUnverifiedStudents,
  getVerifiedStudents,
  getStudent,
  verifyStudent,
  deleteStudent,
  getProfile,
  getAppliedJobs,
  getStudentNotifications
};
