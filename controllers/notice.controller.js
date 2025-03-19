const prisma = require("../config/prisma");

const createNotice = async (req, res) => {
  try {
    const { title, description } = req.body;

    await prisma.notice.create({
      data: {
        title,
        description,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Notice created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getNotices = async (req, res) => {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Notices fetched successfully",
        notices,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await prisma.notice.findUnique({ where: { id } });
    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }

    await prisma.notice.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  createNotice,
  getNotices,
  deleteNotice,
};
