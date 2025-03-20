const createUser = {
  tags: ["Users"],
  description: "Create User",
  operationId: "CreateUser",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            fullName: { type: "string", example: "Atharva Sadanand Litake" },
            dateOfBirth: {
              type: "string",
              format: "date-time",
              example: "2003-03-24T00:00:00.000Z",
            },
            gender: { type: "string", example: "Male" },
            permanentAddress: {
              type: "string",
              example: "C-503, Kimaya Society, Bibvewadi, Pune - 411037",
            },
            city: { type: "string", example: "Pune" },
            state: { type: "string", example: "Maharashtra" },
            branch: { type: "string", example: "CE" },
            universityPRN: { type: "string", example: "72278822D" },
            pictRegistrationId: { type: "string", example: "C2K21106776" },
            percentage10th: { type: "number", example: 93.4 },
            board10th: { type: "string", example: "SSC" },
            passingYear10th: { type: "integer", example: 2019 },
            noOfGapYearsAfter10th: { type: "integer", example: 0 },
            reasonOfGapAfter10th: { type: "string", example: "N/A" },
            after10thAppearedFor: { type: "string", example: "12th" },
            percentage12th: { type: "number", example: 96 },
            board12th: { type: "string", example: "SSC" },
            passingYear12th: { type: "integer", example: 2021 },
            noOfGapYearsAfter12th: { type: "integer", example: 0 },
            reasonOfGapAfter12th: { type: "string", example: "N/A" },
            percentageDiploma: { type: "number", example: -1 },
            universityOfDiploma: { type: "string", example: "N/A" },
            passingYearDiploma: { type: "integer", example: -1 },
            noOfGapYearsAfterDiploma: { type: "integer", example: 0 },
            reasonOfGapAfterDiploma: { type: "string", example: "N/A" },
            percentileCet: { type: "number", example: 99.34 },
            percentileJee: { type: "number", example: 96.7 },
            collegeStartedYear: { type: "integer", example: 2021 },
            aadharNumber: { type: "string", example: "123456789000" },
            panNumber: { type: "string", example: "ABCD12345A" },
            passportNumber: { type: "string", example: "ABCD1234" },
            citizenship: { type: "string", example: "Indian" },
            password: { type: "string", example: "atharva@24" },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const getUsers = {
  tags: ["Users"],
  description: "Get Users",
  operationId: "GetUsers",
  responses: {},
};

const deleteUser = {
  tags: ["Users"],
  description: "Delete User",
  operationId: "DeleteUser",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "User Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const loginAndGetUser = {
  tags: ["Users"],
  description: "User Login",
  operationId: "LoginAndGetUser",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            pictRegistrationId: { type: "string", example: "C2K21106776" },
            password: { type: "string", example: "atharva@24" },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  loginAndGetUser,
};
