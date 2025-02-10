const prisma = require("../config/prisma");
const { deleteFileFromCloudinary } = require("../utils/cloudinary.utility");
const folderName = "jobs";

const createJob = async (req, res) => {
  try {
    const {
      company_name,
      company_desc,
      company_website_url,
      job_role,
      job_location,
      selection_process,
      company_package,
      dream_company,
      eligible_branches,
      cgpa,
      automata_score,
      elq_score,
      percentage_10th,
      percentage_12th,
      application_deadline,
    } = req.body;

    if (
      !company_name ||
      !company_desc ||
      !company_website_url ||
      !job_role ||
      !job_location ||
      !selection_process ||
      !company_package ||
      !dream_company ||
      !cgpa ||
      !automata_score ||
      !elq_score ||
      !percentage_10th ||
      !percentage_12th ||
      !application_deadline
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files["company_logo"] || !req.files["company_jd"]) {
      return res.status(400).json({ message: "Missing required documents" });
    }

    const companyLogoURL = req.files["company_logo"][0].path;
    const companyJdURL = req.files["company_jd"][0].path;
    const companyPackage = parseFloat(company_package);
    const cgpaScore = parseFloat(cgpa);
    const automataScore = parseFloat(automata_score);
    const elqScore = parseFloat(elq_score);
    const percentage10th = parseFloat(percentage_10th);
    const percentage12th = parseFloat(percentage_12th);
    const eligibleBranches = eligible_branches
      ? eligible_branches.split(",")
      : [];

    if (cgpa < 0 || cgpa > 10) {
      return res.status(400).json({ message: "CGPA must be between 0 and 10" });
    }

    if (automata_score < 0 || automata_score > 100) {
      return res
        .status(400)
        .json({ message: "Automata score must be between 0 and 100" });
    }

    if (elq_score < 0 || elq_score > 100) {
      return res
        .status(400)
        .json({ message: "ELQ score must be between 0 and 10" });
    }

    if (percentage_10th < 0 || percentage_10th > 100) {
      return res
        .status(400)
        .json({ message: "10th Percentage must be between 0 and 10" });
    }

    if (percentage_12th < 0 || percentage_12th > 100) {
      return res
        .status(400)
        .json({ message: "12th Percentage must be between 0 and 10" });
    }

    const job = await prisma.job.create({
      data: {
        companyName: company_name,
        companyDesc: company_desc,
        companyWebsiteURL: company_website_url,
        jobRole: job_role,
        jobLocation: job_location,
        selectionProcess: selection_process,
        companyLogoURL,
        companyJdURL,
        companyPackage,
        dreamCompany: dream_company,
        eligibleBranches,
        cgpa: cgpaScore,
        automataScore,
        elqScore,
        percentage10th,
        percentage12th,
        applicationDeadline: new Date(application_deadline),
      },
    });

    return res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getJobs = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ message: "Invalid page or limit values" });
    }

    const skip = (page - 1) * limit;

    const jobs = await prisma.job.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalJobs = await prisma.job.count();

    return res.status(200).json({
      message: "Jobs fetched successfully",
      pagination: {
        page,
        limit,
        totalJobs,
        totalPages: Math.ceil(totalJobs / limit),
      },
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job fetched successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await deleteFileFromCloudinary(job.companyLogoURL, folderName);
    await deleteFileFromCloudinary(job.companyJdURL, folderName);

    await prisma.job.delete({ where: { id } });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  deleteJob,
};
