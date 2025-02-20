const config = require("../config/env");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, config.jwtSecretKey);

    const storedToken = await prisma.adminToken.findUnique({
      where: { token },
    });

    if (!storedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
    }

    req.admin = decoded;
    req.token = token;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = {
  adminAuthMiddleware,
};
