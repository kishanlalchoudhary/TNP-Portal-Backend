const config = require("../config/env");
const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
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
      success: true,
      message: "Login successful",
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const adminLogout = async (req, res) => {
  try {
    const { token } = req;

    await prisma.adminToken.delete({ where: { token } });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const hashed_password = await bcrypt.hash(password, config.salt);

    const admin = await prisma.admin.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        password: hashed_password,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "Admin created successfully", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    await prisma.admin.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


const createNotification = async (req, res) => {
  try {
    const { title, description, studentIds } = req.body;

    // Create the notification
    const notification = await prisma.notification.create({
      data: {
        title,
        description,
        students: {
          connect: studentIds.map(id => ({ id }))
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({
      where: { id }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    await prisma.notification.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
  createAdmin,
  deleteAdmin,
  createNotification,
  deleteNotification
};

const createNotification = async (req, res) => {
  try {
    const { title, description, studentIds } = req.body;

    // Create the notification
    const notification = await prisma.notification.create({
      data: {
        title,
        description,
        students: {
          connect: studentIds.map(id => ({ id }))
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

