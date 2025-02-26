const prisma = require("../config/prisma");
const { deleteFileFromCloudinary } = require("../utils/cloudinary.utility");
const {
  getQuestionsFromGemini,
  evaluateQuestionsFromGemini,
} = require("../utils/gemini.utility");

const addSkill = async (req, res) => {
  try {
    const { name } = req.body;

    const existingSkill = await prisma.skill.findUnique({ where: { name } });
    if (existingSkill) {
      return res.status(400).json({
        success: false,
        message: "Skill with this name already exists",
      });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        logoURL: req.files["logo"][0].path,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Skill added successfully", skill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { name: "asc" } });

    res.status(200).json({
      success: true,
      message: "Skills fetched successfully",
      skills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const removeSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    await deleteFileFromCloudinary(skill.logoURL);

    await prisma.skill.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Skill removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getQuestions = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    const response = await getQuestionsFromGemini(skill);

    res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      questions: response.questions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const evaluateAnswers = async (req, res) => {
  try {
    const { id } = req.params;
    const { questions } = req.body;

    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    const response = await evaluateQuestionsFromGemini(skill, questions);

    res.status(200).json({
      success: true,
      message: "Evaluation for each question fetched successfully",
      evaluations: response.evaluations,
      overall_rating: response.overall_rating,
      topics_to_improve: response.topics_to_improve,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  addSkill,
  getSkills,
  removeSkill,
  getQuestions,
  evaluateAnswers,
};
