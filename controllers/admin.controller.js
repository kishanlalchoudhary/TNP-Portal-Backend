const config = require("../config/env");
const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, config.salt);

    const admin = await prisma.admin.create({
      data: { first_name, last_name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await prisma.admin.delete({ where: { id } });

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createAdmin,
  deleteAdmin,
};
