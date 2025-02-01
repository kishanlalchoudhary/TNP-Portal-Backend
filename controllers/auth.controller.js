const config = require("../config/env");
const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
      },
      config.jwtSecretKey,
      {
        expiresIn: "1d",
      }
    );

    await prisma.adminToken.create({
      data: {
        token,
        adminId: admin.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    res.status(200).json({
      message: "Login successful",
      admin: {
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const adminLogout = async (req, res) => {
  try {
    const { token } = req;
    await prisma.adminToken.delete({ where: { token } });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
};
