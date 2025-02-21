const registerStudent = {
  tags: ["Students"],
  description: "Register Student",
  operationId: "RegisterStudent",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            full_name: { type: "string", example: "John Doe" },
            primary_email: {
              type: "string",
              format: "email",
              example: "john.doe@example.com",
            },
            alternate_email: {
              type: "string",
              format: "email",
              example: "john.alternate@example.com",
            },
            primary_mobile_number: { type: "string", example: "+919876543210" },
            alternate_mobile_number: {
              type: "string",
              example: "+919812345678",
            },
            date_of_birth: {
              type: "string",
              format: "date-time",
              example: "2025-03-01T23:59:59.999Z",
            },
            gender: {
              type: "string",
              enum: ["Male", "Female", "Other"],
              example: "Male",
            },
            current_address: { type: "string", example: "123 Main St, Pune" },
            permanent_address: {
              type: "string",
              example: "456 Elm St, Mumbai",
            },
            city: { type: "string", example: "Pune" },
            state: { type: "string", example: "Maharashtra" },
            branch: {
              type: "string",
              enum: ["CE", "IT", "ENTC"],
              example: "CE",
            },
            division: { type: "string", example: "BE-1" },
            roll_number: { type: "integer", example: 41113 },
            university_prn: { type: "string", example: "72278549G" },
            pict_registration_id: { type: "string", example: "C2K21106773" },
            percentage_10th: {
              type: "number",
              example: 90.5,
              minimum: -1,
              maximum: 100,
            },
            board_10th: { type: "string", example: "CBSE" },
            passing_year_10th: { type: "integer", example: 2016 },
            no_of_gap_years_after_10th: { type: "integer", example: 0 },
            reason_of_gap_after_10th: { type: "string", example: "N/A" },
            after_10th_appeared_for: {
              type: "string",
              enum: ["12th", "Diploma"],
              example: "12th",
            },
            percentage_12th: {
              type: "number",
              example: 85.2,
              minimum: -1,
              maximum: 100,
            },
            board_12th: { type: "string", example: "Maharashtra State Board" },
            passing_year_12th: { type: "integer", example: 2018 },
            no_of_gap_years_after_12th: { type: "integer", example: 0 },
            reason_of_gap_after_12th: { type: "string", example: "N/A" },
            percentage_diploma: {
              type: "number",
              example: 88.0,
              minimum: -1,
              maximum: 100,
            },
            university_of_diploma: { type: "string", example: "MSBTE" },
            passing_year_diploma: { type: "integer", example: 2019 },
            no_of_gap_years_after_diploma: { type: "integer", example: 0 },
            reason_of_gap_after_diploma: { type: "string", example: "N/A" },
            percentile_cet: {
              type: "number",
              example: 95.0,
              minimum: -1,
              maximum: 100,
            },
            percentile_jee: {
              type: "number",
              example: 90.0,
              minimum: -1,
              maximum: 100,
            },
            college_started_year: { type: "integer", example: 2019 },
            sgpa_fe_sem_1: {
              type: "number",
              example: 8.5,
              minimum: -1,
              maximum: 10,
            },
            sgpa_fe_sem_2: {
              type: "number",
              example: 8.7,
              minimum: -1,
              maximum: 10,
            },
            sgpa_se_sem_1: {
              type: "number",
              example: 8.8,
              minimum: -1,
              maximum: 10,
            },
            sgpa_se_sem_2: {
              type: "number",
              example: 9.0,
              minimum: -1,
              maximum: 10,
            },
            sgpa_te_sem_1: {
              type: "number",
              example: 9.1,
              minimum: -1,
              maximum: 10,
            },
            sgpa_te_sem_2: {
              type: "number",
              example: 9.2,
              minimum: -1,
              maximum: 10,
            },
            active_backlogs: { type: "integer", example: 0 },
            active_backlog_semesters: {
              type: "array",
              items: { type: "string" },
              example: ["SE-SEM-2", "TE-SEM-1"],
            },
            passive_backlogs: { type: "integer", example: 0 },
            year_down: { type: "string", example: "No" },
            aadhar_number: { type: "string", example: "123456789012" },
            pan_number: { type: "string", example: "ABCDE1234F" },
            passport_number: { type: "string", example: "A1234567" },
            citizenship: { type: "string", example: "Indian" },
            automata_score: {
              type: "number",
              example: 70.0,
              minimum: -1,
              maximum: 100,
            },
            elq_score: {
              type: "number",
              example: 50.0,
              minimum: -1,
              maximum: 100,
            },
            documents: { type: "string", format: "binary" },
            amcat_result: { type: "string", format: "binary" },
            be_receipt: { type: "string", format: "binary" },
            password: { type: "string", example: "JohnDoe" },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const loginStudent = {
  tags: ["Students"],
  description: "Login Student",
  operationId: "LoginStudent",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            pict_registration_id: {
              type: "string",
              example: "C2K21106773",
            },
            password: {
              type: "string",
              example: "JohnDoe",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {},
};

const logoutStudent = {
  tags: ["Students"],
  description: "Logout Student",
  operationId: "LogoutStudent",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const getUnverifiedStudents = {
  tags: ["Students"],
  description: "Get Unverified Students",
  operationId: "GetUnverifiedStudents",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const getVerifiedStudents = {
  tags: ["Students"],
  description: "Get Verified Students",
  operationId: "GetVerifiedStudents",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const getStudent = {
  tags: ["Students"],
  description: "Get Student",
  operationId: "GetStudent",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "Student Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const verifyStudent = {
  tags: ["Students"],
  description: "Verify Student",
  operationId: "VerifyStudent",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "Student Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const deleteStudent = {
  tags: ["Students"],
  description: "Student Admin",
  operationId: "StudentAdmin",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "Student Id",
      schema: {
        type: "string",
        example: "cm6lqlr0k0000vp0vzd0t3nzh",
      },
    },
  ],
  responses: {},
};

const getProfile = {
  tags: ["Students"],
  description: "Get Profile",
  operationId: "GetProfile",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

const appliedJobs = {
  tags: ["Students"],
  description: "Applied Jobs",
  operationId: "AppliedJobs",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {},
};

module.exports = {
  registerStudent,
  loginStudent,
  logoutStudent,
  getUnverifiedStudents,
  getVerifiedStudents,
  getStudent,
  verifyStudent,
  deleteStudent,
  getProfile,
  appliedJobs,
};
