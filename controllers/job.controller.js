const prisma = require("../config/prisma");
const { deleteFileFromCloudinary } = require("../utils/cloudinary.utility");

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
        eligibleBranches: req.body.eligibleBranches
          ? req.body.eligible_branches.split(",")
          : [],
        cgpa: parseFloat(req.body.cgpa),
        automataScore: parseFloat(req.body.automata_score),
        elqScore: parseFloat(req.body.elq_score),
        percentage10th: parseFloat(req.body.percentage_10th),
        percentage12th: parseFloat(req.body.percentage_12th),
        applicationDeadline: new Date(application_deadline),
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
      where: {
        applicationDeadline: {
          gt: new Date(),
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message: "Active Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

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

module.exports = {
  createJob,
  getJobs,
  getJob,
  deleteJob,
};
