const prisma = require("../config/prisma");
const parser = require("json-2-csv");
const { deleteFileFromCloudinary } = require("../utils/cloudinary.utility");
const { isEligibleForJob } = require("../utils/student.utility");

const createJob = async (req, res) => {
  try {
    const job = await prisma.job.create({
      data: {
        companyName: req.body.company_name,
        companyDesc: req.body.company_desc,
        companyWebsiteURL: req.body.company_website_url,
        jobRole: req.body.job_role,
        jobLocation: req.body.job_location,
        selectionProcess: req.body.selection_process,
        companyLogoURL: req.files["company_logo"][0].path,
        companyJdURL: req.files["company_jd"][0].path,
        companyPackage: parseFloat(req.body.company_package),
        dreamCompany: req.body.dream_company,
        eligibleBranches: req.body.eligible_branches
          ? req.body.eligible_branches.split(",")
          : [],
        cgpa: parseFloat(req.body.cgpa),
        automataScore: parseFloat(req.body.automata_score),
        elqScore: parseFloat(req.body.elq_score),
        percentage10th: parseFloat(req.body.percentage_10th),
        percentage12th: parseFloat(req.body.percentage_12th),
        percentageDiploma: parseFloat(req.body.percentage_diploma),
        activeBacklogs: parseInt(req.body.active_backlogs),
        passiveBacklogs: parseInt(req.body.passive_backlogs),
        applicationDeadline: new Date(req.body.application_deadline),
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Job created successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      select: {
        id: true,
        companyLogoURL: true,
        companyName: true,
        companyPackage: true,
        dreamCompany: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getActiveJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        applicationDeadline: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        companyLogoURL: true,
        companyName: true,
        jobRole: true,
        jobLocation: true,
        companyPackage: true,
        dreamCompany: true,
        applicationDeadline: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message: "Active jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getInactiveJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        applicationDeadline: {
          lt: new Date(),
        },
      },
      select: {
        id: true,
        companyLogoURL: true,
        companyName: true,
        jobRole: true,
        jobLocation: true,
        companyPackage: true,
        dreamCompany: true,
        applicationDeadline: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message: "Inactive jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getJob = async (req, res) => {
  try {
    const { id: studentId } = req.student;
    const { id: jobId } = req.params;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    job.isEligible = isEligibleForJob(student, job);

    const application = await prisma.application.findUnique({
      where: {
        studentId_jobId: {
          studentId,
          jobId,
        },
      },
    });
    job.hasApplied = application ? true : false;

    res
      .status(200)
      .json({ success: true, message: "Job fetched successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await deleteFileFromCloudinary(job.companyLogoURL);
    await deleteFileFromCloudinary(job.companyJdURL);

    await prisma.job.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const applyToJob = async (req, res) => {
  try {
    const { id: studentId } = req.student;
    const { id: jobId } = req.params;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!isEligibleForJob(student, job)) {
      return res
        .status(400)
        .json({ success: false, message: "Not eligible to apply for job" });
    }

    const application = await prisma.application.findUnique({
      where: {
        studentId_jobId: {
          studentId,
          jobId,
        },
      },
    });
    if (application) {
      return res
        .status(400)
        .json({ success: false, message: "Already applied to job" });
    }

    await prisma.application.create({ data: { studentId, jobId } });

    res.status(200).json({
      success: true,
      message: "Applied to job successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getAppliedStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const students = await prisma.student.findMany({
      where: {
        applications: {
          some: {
            jobId: id,
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        pictRegistrationId: true,
        universityPRN: true,
        cgpa: true,
        applications: {
          where: {
            jobId: id,
          },
          select: {
            isShortlisted: true,
            isPlaced: true,
          },
        },
      },
      orderBy: {
        cgpa: "desc",
      },
    });

    const formattedStudents = students.map((student) => ({
      id: student.id,
      fullName: student.fullName,
      pictRegistrationId: student.pictRegistrationId,
      universityPRN: student.universityPRN,
      cgpa: student.cgpa,
      isShortlisted: student.applications[0]?.isShortlisted ?? false,
      isPlaced: student.applications[0]?.isPlaced ?? false,
    }));

    res.status(200).json({
      success: true,
      message: "Applied students fetched successfully",
      students: formattedStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const downloadAppliedStudentsCSV = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const students = await prisma.student.findMany({
      where: {
        applications: {
          some: {
            jobId: id,
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        primaryEmail: true,
        primaryMobileNumber: true,
        pictRegistrationId: true,
        universityPRN: true,
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
        automataScore: true,
        elqScore: true,
        cgpa: true,
      },
      orderBy: {
        cgpa: "desc",
      },
    });

    const csv = parser.json2csv(students);

    res.header("Content-Type", "text/csv");
    res.attachment(`applied_students_${job.companyName}.csv`);
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const markShortlisted = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentIds } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid studentIds. Must be a non-empty array.",
      });
    }

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await prisma.application.updateMany({
      where: {
        jobId: id,
        studentId: { in: studentIds },
      },
      data: {
        isShortlisted: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Students have been successfully marked as shortlisted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const unmarkShortlisted = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentIds } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid studentIds. Must be a non-empty array.",
      });
    }

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await prisma.application.updateMany({
      where: {
        jobId: id,
        studentId: { in: studentIds },
      },
      data: {
        isShortlisted: false,
      },
    });

    res.status(200).json({
      success: true,
      message: "Students have been successfully unmarked as shortlisted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getShortlistedStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const students = await prisma.student.findMany({
      where: {
        applications: {
          some: {
            jobId: id,
            isShortlisted: true,
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        pictRegistrationId: true,
        universityPRN: true,
        cgpa: true,
        applications: {
          where: {
            jobId: id,
          },
          select: {
            isShortlisted: true,
            isPlaced: true,
          },
        },
      },
      orderBy: {
        cgpa: "desc",
      },
    });

    const formattedStudents = students.map((student) => ({
      id: student.id,
      fullName: student.fullName,
      pictRegistrationId: student.pictRegistrationId,
      universityPRN: student.universityPRN,
      cgpa: student.cgpa,
      isShortlisted: student.applications[0]?.isShortlisted ?? false,
      isPlaced: student.applications[0]?.isPlaced ?? false,
    }));

    res.status(200).json({
      success: true,
      message: "Shortlisted students fetched successfully",
      students: formattedStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const markPlaced = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentIds } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid studentIds. Must be a non-empty array.",
      });
    }

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await prisma.application.updateMany({
      where: {
        jobId: id,
        studentId: { in: studentIds },
      },
      data: {
        isPlaced: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Students have been successfully marked as placed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const unmarkPlaced = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentIds } = req.body;

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid studentIds. Must be a non-empty array.",
      });
    }

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await prisma.application.updateMany({
      where: {
        jobId: id,
        studentId: { in: studentIds },
      },
      data: {
        isPlaced: false,
      },
    });

    res.status(200).json({
      success: true,
      message: "Students have been successfully unmarked as placed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getPlacedStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const students = await prisma.student.findMany({
      where: {
        applications: {
          some: {
            jobId: id,
            isPlaced: true,
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        pictRegistrationId: true,
        universityPRN: true,
        cgpa: true,
        applications: {
          where: {
            jobId: id,
          },
          select: {
            isShortlisted: true,
            isPlaced: true,
          },
        },
      },
      orderBy: {
        cgpa: "desc",
      },
    });

    const formattedStudents = students.map((student) => ({
      id: student.id,
      fullName: student.fullName,
      pictRegistrationId: student.pictRegistrationId,
      universityPRN: student.universityPRN,
      cgpa: student.cgpa,
      isShortlisted: student.applications[0]?.isShortlisted ?? false,
      isPlaced: student.applications[0]?.isPlaced ?? false,
    }));

    res.status(200).json({
      success: true,
      message: "Placed students fetched successfully",
      students: formattedStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getShortlistedResults = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const students = await prisma.student.findMany({
      where: {
        applications: {
          some: {
            jobId: id,
            isShortlisted: true,
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        pictRegistrationId: true,
        universityPRN: true,
        cgpa: true,
      },
      orderBy: {
        cgpa: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Shortlisted results fetched successfully",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getPlacedResults = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const students = await prisma.student.findMany({
      where: {
        applications: {
          some: {
            jobId: id,
            isPlaced: true,
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        pictRegistrationId: true,
        universityPRN: true,
        cgpa: true,
      },
      orderBy: {
        cgpa: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Placed results fetched successfully",
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  createJob,
  getJobs,
  getActiveJobs,
  getInactiveJobs,
  getJob,
  deleteJob,
  applyToJob,
  getAppliedStudents,
  downloadAppliedStudentsCSV,
  markShortlisted,
  unmarkShortlisted,
  getShortlistedStudents,
  markPlaced,
  unmarkPlaced,
  getPlacedStudents,
  getShortlistedResults,
  getPlacedResults,
};
