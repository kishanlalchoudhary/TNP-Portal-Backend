const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: "kisanchoudhary000@gmail.com" },
    });

    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash("kishanlalchoudhary", 10);

    const admin = await prisma.admin.create({
      data: {
        first_name: "Kishanlal",
        last_name: "Choudhary",
        email: "kisanchoudhary000@gmail.com",
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
