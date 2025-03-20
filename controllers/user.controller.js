const config = require("../config/env");
const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      permanentAddress,
      city,
      state,
      branch,
      universityPRN,
      pictRegistrationId,
      percentage10th,
      board10th,
      passingYear10th,
      noOfGapYearsAfter10th,
      reasonOfGapAfter10th,
      after10thAppearedFor,
      percentage12th,
      board12th,
      passingYear12th,
      noOfGapYearsAfter12th,
      reasonOfGapAfter12th,
      percentageDiploma,
      universityOfDiploma,
      passingYearDiploma,
      noOfGapYearsAfterDiploma,
      reasonOfGapAfterDiploma,
      percentileCet,
      percentileJee,
      collegeStartedYear,
      aadharNumber,
      panNumber,
      passportNumber,
      citizenship,
      password,
    } = req.body;

    if (
      !fullName ||
      !dateOfBirth ||
      !gender ||
      !permanentAddress ||
      !city ||
      !state ||
      !branch ||
      !universityPRN ||
      !pictRegistrationId ||
      !percentage10th ||
      !board10th ||
      !passingYear10th ||
      !noOfGapYearsAfter10th ||
      !reasonOfGapAfter10th ||
      !after10thAppearedFor ||
      !percentage12th ||
      !board12th ||
      !passingYear12th ||
      !noOfGapYearsAfter12th ||
      !reasonOfGapAfter12th ||
      !percentageDiploma ||
      !universityOfDiploma ||
      !passingYearDiploma ||
      !noOfGapYearsAfterDiploma ||
      !reasonOfGapAfterDiploma ||
      !percentileCet ||
      !percentileJee ||
      !collegeStartedYear ||
      !aadharNumber ||
      !panNumber ||
      !passportNumber ||
      !citizenship ||
      !password
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const hashed_password = await bcrypt.hash(password, config.salt);

    const query = await prisma.user.create({
      data: {
        fullName,
        dateOfBirth,
        gender,
        permanentAddress,
        city,
        state,
        branch,
        universityPRN,
        pictRegistrationId,
        percentage10th,
        board10th,
        passingYear10th,
        noOfGapYearsAfter10th,
        reasonOfGapAfter10th,
        after10thAppearedFor,
        percentage12th,
        board12th,
        passingYear12th,
        noOfGapYearsAfter12th,
        reasonOfGapAfter12th,
        percentageDiploma,
        universityOfDiploma,
        passingYearDiploma,
        noOfGapYearsAfterDiploma,
        reasonOfGapAfterDiploma,
        percentileCet,
        percentileJee,
        collegeStartedYear,
        aadharNumber,
        panNumber,
        passportNumber,
        citizenship,
        password: hashed_password,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully", query });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await prisma.user.delete({ where: { id } });

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { pictRegistrationId, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { pictRegistrationId },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { createUser, getUsers, deleteUser, loginUser };
