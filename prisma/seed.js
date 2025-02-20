const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: "john.doe@example.com" },
    });

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash("JohnDoe", 10);

    const admin = await prisma.admin.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: hashedPassword,
      },
    });

    console.log("Admin created:", admin);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
