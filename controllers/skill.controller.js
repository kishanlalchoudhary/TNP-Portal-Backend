const prisma = require("../config/prisma");
const { deleteFileFromCloudinary } = require("../utils/cloudinary.utility");
const model = require("../config/gemini");

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
    const skill = "DBMS";
    const prompt = `Generate an array of 3 easy and 3 easy-to-medium level interview questions on ${skill}, suitable for a fresher-level interview. Ensure the questions are relevant to real-world applications and commonly asked in technical interviews. Each question should be concise, unambiguous, and answerable within 250 words. Strictly output only the questions in the following format:

    { "questions" : [
      {
        "question": "Question 1"
      },
      {
        "question": "Question 2"
      },
      {
        "question": "Question 3"
      },
      {
        "question": "Question 4"
      },
      {
        "question": "Question 5"
      },
      {
        "question": "Question 6"
      }
  ]}`;

    const response = await model.invoke(prompt);
    const textResponse = response.content;

    // Extract valid JSON
    let questions = null;
    const jsonMatch = textResponse.match(/\[.*\]/s);
    if (jsonMatch) {
      const jsonData = JSON.parse(jsonMatch[0]);
      questions = jsonData;
      console.log(jsonData);
    } else {
      console.error("Invalid JSON format received");
    }
    res.status(200).json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const evaluateAnswers = async (req, res) => {};

module.exports = {
  addSkill,
  getSkills,
  removeSkill,
  getQuestions,
  evaluateAnswers,
};
