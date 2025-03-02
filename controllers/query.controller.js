const prisma = require("../config/prisma");
const { getSummaryOfQueriesFromGemini } = require("../utils/gemini.utility");

const raiseQuery = async (req, res) => {
  try {
    const { id } = req.student;
    const { description } = req.body;

    const query = await prisma.query.create({
      data: {
        studentId: id,
        description,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Query raised successfully", query });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getQueries = async (req, res) => {
  try {
    const queries = await prisma.query.findMany({
      include: {
        student: {
          select: {
            id: true,
            fullName: true,
            primaryEmail: true,
            primaryMobileNumber: true,
            universityPRN: true,
            pictRegistrationId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message: "Queries fetched successfully",
      queries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getSummaryOfQueries = async (req, res) => {
  try {
    const queries = await prisma.query.findMany({
      orderBy: { createdAt: "desc" },
    });

    const response = await getSummaryOfQueriesFromGemini(queries);

    res.status(200).json({
      success: true,
      message: "Summary of Queries fetched successfully",
      summary: response.summary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;

    const query = await prisma.query.findUnique({ where: { id } });
    if (!query) {
      return res
        .status(404)
        .json({ success: false, message: "Query not found" });
    }

    await prisma.query.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Query deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { raiseQuery, getQueries, getSummaryOfQueries, deleteQuery };
