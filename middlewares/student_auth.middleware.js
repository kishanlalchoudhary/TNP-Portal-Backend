const config = require("../config/env");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const studentAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, config.jwtSecretKey);

    const storedToken = await prisma.studentToken.findUnique({
      where: { token },
    });

    if (!storedToken) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized: Invalid or expired token",
        });
    }

    if (!decoded.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Verification pending" });
    }

    req.student = decoded;
    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  studentAuthMiddleware,
};
